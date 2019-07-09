import { observable } from 'mobx';

class ArbitrageStore {
    @observable price = 0;

    constructor(instrumentStore) {
        instrumentStore.instrumentsReaction(
            async (base, quote) => {
                this.base = base;
                this.quote = quote;

                // this.fetchPrice(base, quote, 4);
            },
            true
        );
    }

    async fetchPrice(base, quote, amount) {
        // '{"symbol":"BTC-USD","amount":4}'
        fetch('https://rest.qa.bct.trade/api/arbitrage/model', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ symbol: base + '-' + quote, amount }),
        })
            .then(response => response.json())
            .then(res => {
                console.log('[res]', res);
            }).catch(err => {
                console.log('[err]', err);
            });
    }
}

export default (instrumentStore) => new ArbitrageStore(instrumentStore);
