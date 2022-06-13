const axios = require("axios");
const bsv = require("bsv");
const {PaymailClient} = require("@moneybutton/paymail-client");

const hashPuzzleScriptAsmPostfix = " OP_1 OP_PICK OP_SHA256 OP_1 OP_PICK OP_EQUAL OP_NIP OP_NIP";

class TransactionService {
  unlockRelic = async ({relicId, txId, secret, paymail}) => {
    var lockingTxData;
    let unlockingTx;

    try {
      lockingTxData = await axios.get("https://api.whatsonchain.com/v1/" +
        `bsv/main/tx/hash/${txId}`);
    } catch (err) {
      console.error("[TransactionService] Unable to fetch locking transaction: ", err.data);
      this.loggingError({relicId, txId, secret, paymail, unlockingTx});

      return false;
    }

    let outputAmount = null;
    let outputScript = null;
    let outputIndex = null;
    for (let i = 0; i < lockingTxData.data.vout.length; ++i) {
      // compare script and hashPuzzleScriptAsmPostfix
      // brittle approach:
      // script.length === hashPuzzleScriptAsmPostfix.length + 64 &&
      // script.endsWith(hashPuzzleScriptAsmPostfix)
      // this won't work if Whatsonchain, e.g., replaces 1 with OP_1
      // one day in data.vout[i].scriptPubKey.asm
      const scriptOpcodes = lockingTxData.data.vout[i].scriptPubKey.asm
        .split(" ").filter(o => o !== "");
      const expectedOpcodes = [
        "",
        ...hashPuzzleScriptAsmPostfix.split(" ").filter(o => o !== ""),
      ];
      if (scriptOpcodes.length !== expectedOpcodes.length) {
        continue;
      }
      if (scriptOpcodes[0].length !== 64) {
        continue;
      }
      const compareOpcodes = (a, b) => {
        if (["1", "OP_1", "OP_TRUE"].indexOf(a) !== -1) {
          return ["1", "OP_1", "OP_TRUE"].indexOf(b) !== -1;
        }
        if (["0", "OP_0", "OP_FALSE"].indexOf(a) !== -1) {
          return ["0", "OP_0", "OP_FALSE"].indexOf(b) !== -1;
        }
        return a === b;
      };
      let comparisonFailed = false;
      for (let j = 1; j < scriptOpcodes.length; ++j) {
        if (!compareOpcodes(scriptOpcodes[j], expectedOpcodes[j])) {
          comparisonFailed = true;
          break;
        }
      }
      if (comparisonFailed) {
        continue;
      }

      // we may check text fitness here, but we'll actually continue even
      // if the plain text is wrong, to let the blockchain (Whatsonchain)
      // check it
      // this is why we store outputScript although we could calculate it
      // ourselves
      const amount = Math.floor(
        lockingTxData.data.vout[i].value * 100000000);
      if (outputAmount === null || amount > outputAmount) {
        outputAmount = amount;
        outputScript = bsv.Script.fromHex(
          lockingTxData.data.vout[i].scriptPubKey.hex);
        outputIndex = lockingTxData.data.vout[i].n;
      }
    }
    if (outputAmount === null) {
      console.error("[TransactionService] Unable to find our output in tx:", lockingTxData);
      this.loggingError({relicId, txId, secret, paymail, unlockingTx});

      return false;
    }

    const userPaymail = paymail;
    const paymailClient = new PaymailClient();
    let fee = 546;

    const randomPrivateKey = bsv.PrivateKey.fromRandom();
    let outputScriptP2PKH;
    try {
      outputScriptP2PKH = await paymailClient.getOutputFor(userPaymail, {
        amount: outputAmount - fee,
        senderHandle: "Relica@moneybutton.com",
      }, randomPrivateKey.toString());
    } catch (e) {
      console.error("[TransactionService] Unable to get output to conduct transaction.", e);
      this.loggingError({relicId, txId, secret, paymail, unlockingTx});

      return false;
    }

    const hexedPlainText = Buffer.from(secret).toString("hex");
    const plainTextParam = bsv.Script.fromASM(hexedPlainText);
    const unlockingInput = new bsv.Transaction.Input({
      prevTxId: txId,
      script: plainTextParam,
      outputIndex,
    });
    const makeTx = fee => {
      const unlockingOutput = new bsv.Transaction.Output({
        script: outputScriptP2PKH,
        satoshis: outputAmount - fee,
      });
      const unlockingTx = new bsv.Transaction();
      unlockingTx.addInput(
        unlockingInput,
        outputScript,
        outputAmount
      );
      unlockingTx.addOutput(unlockingOutput);
      unlockingTx.fee(fee);
      return unlockingTx;
    };
    unlockingTx = makeTx(fee);

    let backoffDelay = 1000; // 1 second
    const backoffExponent = 2;
    let retriesTime = 0;
    let whatsonchainRawResult = false;

    while (retriesTime <= 2) {
      // try to send tx
      try {
        let txUnlockResponse = await axios.post(`https://api.whatsonchain.com/v1/bsv/main/tx/raw`, {
          txhex: unlockingTx.serialize(true)
        });
        whatsonchainRawResult = true;
        console.log("Unlocking success:", txUnlockResponse.data);
        break;
      } catch (err) {
        console.error(`[TransactionService] Whatsonchain error: ${JSON.stringify(err)} Retrying in ${backoffDelay / 1000} s`);
        this.loggingError({relicId, txId, secret, paymail, unlockingTx});

        if (err.response.data === "66: insufficient priority") {
          fee += 50;
          unlockingTx = makeTx(fee);
        }
      }

      await new Promise(resolve => setTimeout(resolve, backoffDelay));
      backoffDelay *= backoffExponent;
      retriesTime++;
    }

    return whatsonchainRawResult;
  }

  loggingError = ({relicId, txId, secret, paymail, unlockingTx}) => {
    console.error('[TransactionService] relicId:', relicId);
    console.error('[TransactionService] txId:', txId);
    console.error('[TransactionService] secret:', secret);
    console.error('[TransactionService] paymail:', paymail);
    console.error('[TransactionService] unlockingTx:', JSON.stringify(unlockingTx));
  }
}

module.exports = { TransactionService }
