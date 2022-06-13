import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { useAccount } from "../../hooks/useAccount";
import { usePayments } from "../../hooks/usePayments";
import axios from "axios";
import bsv from "bsv";
import { PaymailClient } from '@moneybutton/paymail-client';

const Bold = styled.span`
  font-weight: bold;
`;

const Error = styled.span`
  color: red;
`;

const hashPuzzleScriptAsmPostfix = " OP_1 OP_PICK OP_SHA256 OP_1 OP_PICK OP_EQUAL OP_NIP OP_NIP";

export default () => {
  const { account, walletType } = useAccount();
  const [ plainTextToHash, setPlainTextToHash ] = useState("");
  const [ hash, setHash ] = useState("");
  const [ hashLocking, setHashLocking ] = useState("");
  const [ outputAmount, setOutputAmount ] = useState(0);
  const [ outputLoading, setOutputLoading ] = useState(false);
  const [ outputError, setOutputError ] = useState(null);
  const [ outputTxId, setOutputTxId ] = useState(null);
  const [ lockingTxId, setLockingTxId ] = useState(null);
  const [ unlockingPlainText, setUnlockingPlainText ] = useState(null);
  const [ unlockingLoading, setUnlockingLoading ] = useState(false);
  const [ unlockingError, setUnlockingError ] = useState(null);
  const [ unlockingTxId, setUnlockingTxId ] = useState(null);
  const [ unlockingAmount, setUnlockingAmount ] = useState(null);
  const [ unlockingFee, setUnlockingFee ] = useState(null);

  const { pay } = usePayments();

  const calculateHash = () => {
    setHash(bsv.crypto.Hash.sha256(Buffer.from(plainTextToHash)).toString("hex"));
  };

  const createOutputTx = useCallback(() => {
    if (!hashLocking) {
      setOutputError("Need a SHA-256 hash.");
      return;
    }
    const hashToUse = hashLocking.replaceAll(/\s+/g, '').toLowerCase();
    if (!hashToUse) {
      setOutputError("Need a SHA-256 hash.");
      return;
    }
    if (hashToUse.length !== 64) {
      setOutputError("This doesn't look like a SHA-256 hash (in hexadecimal, " +
        "with padding zeros). It should have length of 64, and this has a length of " +
        hashToUse.length + ".");
      return;
    }
    let nonHexDigit = null;
    hashToUse.split("").map(ch => {
      const c = ch.toLowerCase();
      if (
        !((c >= "0" && c <= "9") || (c >= "a" && c <= "f"))
      ) {
        nonHexDigit = ch;
      }
    });
    if (nonHexDigit !== null) {
      setOutputError(`"${nonHexDigit}" in the provided SHA-256 hash is not a hex digit.`);
      return;
    }
    if (!outputAmount) {
      setOutputError("Need an output amount.");
      return;
    }
    const outputAmountNumber = Number(outputAmount);
    if (!outputAmountNumber) {
      setOutputError(outputAmount + " doesn't look like a number.");
      return;
    }
    setOutputError(null);
    (async () => {
      setOutputLoading(true);

      const hashPuzzleScriptOpcodes = hashToUse + hashPuzzleScriptAsmPostfix;
      const satoshiAmount = {};
      pay({
        type: "SMART",
        customOutputs: [{
          script: hashPuzzleScriptOpcodes,
          amount: outputAmountNumber.toString(),
          currency: "USD",
        }],
        satoshiAmountOut: satoshiAmount,
        onPayment: paymentData => {
          setOutputLoading(false);
          setOutputTxId(paymentData.txid);
        },
        onError: errorData => {
          setOutputLoading(false);
          setOutputError("Couldn't create a transaction, error: \"" +
            errorData + "\"");
        },
        onMoneyButtonModalHide: () => {
          setOutputLoading(false);
        },
      });
    })();
  }, [hashLocking, outputAmount]);

  const createUnlockingTrx = useCallback(() => {
    if (!lockingTxId) {
      setOutputError("Need a transaction ID.");
      return;
    }
    const lockingTxIdToUse = lockingTxId.replaceAll(/\s+/g, '').toLowerCase();
    if (!lockingTxIdToUse) {
      setOutputError("Need a transaction ID.");
      return;
    }
    if (lockingTxIdToUse.length !== 64) {
      setOutputError("This doesn't look like a transaction ID. " +
        "It should have length of 64, and this has a length of " +
        lockingTxIdToUse.length + ".");
      return;
    }

    (async () => {
      setUnlockingLoading(true);
      setUnlockingError(null);

      var lockingTxData;
      try {
        lockingTxData = await axios.post("https://api.whatsonchain.com/v1/" +
          `bsv/main/tx/hash/${lockingTxIdToUse}`);
      } catch (err) {
        console.error("Unable to fetch locking transaction: ", err.data);
        setUnlockingError("Cannot load transaction with such ID. Make sure it exists.");
        setUnlockingLoading(false);
        return;
      }

      let outputAmount = null;
      let outputScript = null;
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
        }
      }
      if (outputAmount === null) {
        console.error("Unable to find our output in tx:", lockingTxData);
        setUnlockingError("Unable to find our output in this transaction.");
        setUnlockingLoading(false);
        return;
      }

      const userPaymail = account.wallets[walletType].paymail;
      const paymailClient = new PaymailClient();
      const fee = 546;

      const randomPrivateKey = bsv.PrivateKey.fromRandom();
      let outputScriptP2PKH;
      try {
        outputScriptP2PKH = await paymailClient.getOutputFor(userPaymail, {
          amount: outputAmount - fee,
          senderHandle: "jeremy@moneybutton.com",
        }, randomPrivateKey.toString());
      } catch (e) {
        console.error("Unable to get output to conduct transaction.", e);
        setUnlockingError("Unable to get output to conduct transaction.");
        setUnlockingLoading(false);
        return;
      }

      const hexedPlainText = Buffer.from(unlockingPlainText).toString("hex");
      const plainTextParam = bsv.Script.fromASM(hexedPlainText);
      const unlockingInput = new bsv.Transaction.Input({
        prevTxId: lockingTxIdToUse,
        script: plainTextParam,
      });
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

      // send tx
      let response;
      try {
        response = await axios.post(`https://api.whatsonchain.com/v1/bsv/main/tx/raw`, {
          txhex: unlockingTx.serialize()
        });
        console.error("Succeeded", response);
      } catch (err) {
        console.error("Error happened/wrong secret/already claimed: ", err);
        setUnlockingError("Whatsonchain denied us unlocking the money. " +
          "This smart contract may be already claimed, the plain text may be " +
          "incorrect, or the fee is too small.");
        setUnlockingLoading(false);
        return;
      }

      setUnlockingTxId(response.data);
      setUnlockingAmount(outputAmount - fee);
      setUnlockingFee(fee);
      setUnlockingLoading(false);
    })();
  }, [lockingTxId, unlockingPlainText]);

  if (walletType !== "moneybutton") {
    return <>This works only with MoneyButton for now.
    Switch to Money Button in settings to use this.</>;
  }

  return (<>
    <Bold>0. Hash the plain text</Bold>
    <br />
    To make a smart contract, first, you have to prepare a string
    which will be the solution, called plain text, and then calculate the SHA-256 hash of it.
    <br />
    Plain text:<br />
    <input
      type="text"
      onChange={e => setPlainTextToHash(e.target.value)} />
    <button onClick={calculateHash}>Calculate SHA-256</button>
    <br />
    {hash && <>
      The SHA-256 of this is: <input type="text" disabled={true} value={hash}/>
      <button
        onClick={() => window.navigator.clipboard.writeText(hash)}
      >Copy the SHA-256 hash to clipboard</button>
      <br />
    </>}
    <br />
    <Bold>1. Create a smart contract with this hash</Bold>
    <br />
    Put a SHA-256 hash from the step 0 (or any SHA-256 hash, really -
    they are all good) and the amount of money in USD you want to offer,
    and thus you'll create a contract.
    <br />
    SHA-256 hash:<br />
    <input
      type="text"
      onChange={e => setHashLocking(e.target.value)} />
    <br />
    Amount in USD:<br />
    <input
      type="text"
      onChange={e => setOutputAmount(e.target.value)} />
    <button onClick={createOutputTx}>Create a smart contract</button>
    <br />
    {outputLoading && (<>
      Creating output transation with smart contract...
      <br />
    </>)}
    {outputError && (<>
      <Error>{outputError}</Error>
      <br />
    </>)}
    {outputTxId && (<>
      Transaction is added to BSV blockchain!
      {' '}<a href={"https://whatsonchain.com/tx/" + outputTxId} target="_blank">
        See it on whatsonchain.
      </a>{' '}
      Its transaction ID is: <input type="text" disabled={true} value={outputTxId}/>
      If you ever lose it, you can look it up in your Money Button profile.
      <br />
    </>)}
    <br />
    <Bold>2. Unlock the smart contract</Bold>
    <br />
    Get money from contract created on step 1 with transaction ID of the smart
    contract and proper plain text answer.
    <br />
    Transaction ID to unlock:<br />
    <input
      type="text"
      onChange={e => setLockingTxId(e.target.value)} />
    <br />
    Plain text:<br />
    <input
      type="text"
      onChange={e => setUnlockingPlainText(e.target.value)} />
    <button onClick={createUnlockingTrx}>Unlock transaction</button>
    <br />
    {unlockingLoading && (<>
      Unlocking smart contract...
      <br />
    </>)}
    {unlockingError && (<>
      <Error>{unlockingError}</Error>
      <br />
    </>)}
    {unlockingTxId && (<>
      Success! You have unlocked {unlockingAmount} satoshis from the smart contract,
      and {unlockingFee} satoshis have gone as a processing fee.
      {' '}<a href={"https://whatsonchain.com/tx/" + unlockingTxId} target="_blank">
        See it on whatsonchain.
      </a>
      <br />
    </>)}
  </>);
};
