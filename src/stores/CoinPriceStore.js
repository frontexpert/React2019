import { observable } from 'mobx';

class CoinPriceStore {
    @observable price = 0;
    @observable maxAmount = 0;
    @observable arbitrageAmount = 0;
    // "ok": 1,
    // "data": {
    //     "rate": 3621.4158,
    //     "amounts": {
    //         "BTC-USDT": {
    //             "fromCoin": "BTC",
    //             "toCoin": "USDT",
    //             "maxAmount": 28.525185,
    //             "arbitrageAmount": 2.7540162
    //         },
    //         "USDT-BTC": {
    //             "fromCoin": "USDT",
    //             "toCoin": "BTC",
    //             "maxAmount": 102558.71,
    //             "arbitrageAmount": 92578.98
    //         }
    //     }
    // }

    constructor(instrumentStore) {
        instrumentStore.instrumentsReaction(
            async (base, quote) => {
                this.price = 0;
                this.fetchPrice(base, quote);
            },
            true
        );
    }

    async fetchPrice(base, quote) {
        base = (base || '').replace('F:', '');
        quote = (quote || '').replace('F:', '');
        const url = `https://rest.qa.bct.trade/api/best-conversion-rate/${base}-${quote}`;

        fetch(url)
            .then(response => response.json())
            .then(Data => {
                try {
                    this.price = Number(Data.data.rate) || 0;
                } catch(err) {
                    this.price = 0;
                }

                try {
                    this.maxAmount = Data.data.amounts[base + '-' + quote].maxAmount || 0;
                } catch(err) {
                    this.maxAmount = 0;
                }

                try {
                    this.arbitrageAmount = Data.data.amounts[base + '-' + quote].arbitrageAmount || 0;
                } catch(err) {
                    this.arbitrageAmount = 0;
                }
            })
            .catch(console.log);
    }
}

export default (instrumentStore) => new CoinPriceStore(instrumentStore);