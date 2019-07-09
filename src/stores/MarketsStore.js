import { observable, action } from 'mobx';

class MarketsStore {
    @observable markets = {};

    constructor() {
        this.fetchMarkets();
        setInterval(this.fetchMarkets, 86400000);
    }

    fetchMarkets() {
        fetch('https://market-data.bct.trade/api/markets')
            .then(response => response.json())
            .then(res => {
                this.markets = res;
            })
            .catch(console.log);
    }
}

export default () => {
    const store = new MarketsStore();
    return store;
};