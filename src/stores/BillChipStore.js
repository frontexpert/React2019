import { observable, action, reaction } from 'mobx';

class BillChipStore {
    @observable symbol = '';
    @observable balance = 0;
    @observable position = 0;
    @observable withdrawAmount = 0;
    @observable isOpen = false;
    @observable isFirst = true;
    @observable denominations = [];
    PortfolioData = null;
    isSetDenomination = false;

    constructor(yourAccountStore) {
        this.isSetDenomination = false;
        reaction(
            () => yourAccountStore.PortfolioData,
            (PortfolioData) => {
                this.PortfolioData = PortfolioData;
                if (this.PortfolioData && !this.isSetDenomination) {
                    let denomArray = [];
                    for (let i = 0; i < this.PortfolioData.length; i++) {
                        if (this.PortfolioData[i]) {
                            const symbol = this.PortfolioData[i].Coin;
                            const price = this.PortfolioData[i].Price;
                            denomArray.push({
                                symbol,
                                deno: price === 0 ? 6 : Math.floor(Math.log10(999999 / price)),
                            });
                        }
                    }
                    this.denominations = denomArray;
                    this.isSetDenomination = true;
                }
            }
        );
    }

    @action.bound showBillChips(symbol, balance, position) {
        this.symbol = symbol;
        this.balance = balance;
        this.position = position;
        // this.isOpen = true;
        this.isFirst = false;
    }

    @action.bound onClosePopup() {
        this.symbol = '';
        this.balance = 0;
        this.position = 0;
        this.isOpen = false;
    }

    @action.bound setWithdrawAmount(amount) {
        this.withdrawAmount = amount;
    }
}

export default (yourAccountStore) => {
    const store = new BillChipStore(yourAccountStore);
    return store;
};
