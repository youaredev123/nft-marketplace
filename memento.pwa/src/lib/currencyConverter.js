
class CurrencyConverter {
    convertToSatoshi = async (amount, currency = 'usd') => {
        let url = `https://api.cryptonator.com/api/ticker/${currency}-bsv`;
        let response = await fetch(url);
        let data = await response.json();
    
        if (data && data.success) {
            const result = data.ticker;
            const priceOfOnebsv = result.price
            const priceInSatoshi = amount * priceOfOnebsv * 100000000;
            return priceInSatoshi;
        } else {
            return { status: 400, data: { error: "Bad Request" } };
        }
    }

    convertFromSatoshi = async (amount, currency = 'usd') => {
        let url = `https://api.cryptonator.com/api/ticker/bsv-${currency}`;
        let response = await fetch(url);
        let data = await response.json();
    
        if (data && data.success) {
            const result = data.ticker;
            const priceOfOnebsv = result.price
            const priceOfOneSatoshi = priceOfOnebsv / 100000000
            const priceInSatoshi = amount * priceOfOneSatoshi;
            return Math.round(priceInSatoshi * 100) / 100;
        } else {
            return { status: 400, data: { error: "Bad Request" } };
        }
    }

    convertListOfSatoshis = (amount, data) => {
        const result = data.ticker;
        const priceOfOnebsv = result.price
        const priceOfOneSatoshi = priceOfOnebsv / 100000000
        const priceInSatoshi = amount * priceOfOneSatoshi;
        return Math.round(priceInSatoshi * 100) / 100;
    }
}

export default new CurrencyConverter;