export const getBalance = async (address) => {
  let network = '';
  if (process.env.REACT_APP_BSV_NETWORK === 'mainnet') {
    network = 'main';
  } else {
    network = 'test';
  }
  let url = `https://api.whatsonchain.com/v1/bsv/${network}/address/${address}/balance`;
  let response = await fetch(url);
  return await response.json();
};

export const getRate = async (from = 'bsv', to = 'usd') => {
  let url = `https://api.cryptonator.com/api/ticker/${from}-${to}`;
  let response = await fetch(url);
  let data = await response.json();

  if (data && data.success) {
    return data.ticker;
  }
  return null;
};

export const converter = (balance, rate) => {
  const bsv = balance.unconfirmed >= 0 ? (balance.confirmed / 100000000) : ((balance.confirmed - Math.abs(balance.unconfirmed)) / 100000000);
  return  {
    bsv,
    usd: roundToTwo(bsv * rate.price)
  }
}

function roundToTwo(num) {
  return +(Math.round(num + "e+2")  + "e-2");
}
