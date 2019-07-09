import {
    computed, observable, runInAction, reaction, action
} from 'mobx';
import {
    scheduleVisualDOMUpdate,
    updateMapStoreFromArrayForOrderBook
} from './utils/storeUtils';
import { getOrderBookBreakdowns } from '../lib/ws/feed';
import {
    pageIsVisible,
    getMaxRows,
    getScreenInfo,
    formatIntegerString,
    customDigitFormatWithNoTrim
} from '../utils';
import { ROW_HEIGHT } from '../config/constants';
import { STATE_KEYS } from './ConvertStore';

const throttleMs = 100;
// const maxRows = 50;

class OrderBookBreakDownStore {
    @observable AsksForOrderBook = new Map();
    @observable BidsForOrderBook = new Map();
    @observable base = ''; // incoming data feed's base coin
    @observable quote = ''; // incoming data feed's quote coin
    @observable isOrderBookBreakDownStop = false; // FALSE: no data stream, TRUE: data stream exists
    @observable isOrderBookDataLoaded = false;
    @observable maxOrderSize = 0;
    @observable maxOrderAmount = 0;
    @observable isRegularMarket = true;

    @computed get asksForOrderBook() {
        return this.AsksForOrderBook;
    }
    @computed get bidsForOrderBook() {
        return this.BidsForOrderBook;
    }
    @computed get orderBookCoinPair() {
        return [this.base, this.quote];
    }

    convertState = null;
    symbol = '';
    __subscriptionInited = false;
    AggregatedSummary$ = null;
    orderbookBreakDownArrivedTime = 0;
    requestLevel = 22;
    exchanges = {};

    constructor(instrumentStore, exchangesStore, convertStore, yourAccountStore, marketsStore) {

        instrumentStore.instrumentsReaction(
            (base, quote) => {
                /**
                 * Init OrderBooks ws data
                 */
                this.AsksForOrderBook.clear();
                this.BidsForOrderBook.clear();
                this.isRegularMarket = true;

                try {
                    const newPair = marketsStore.markets[`${base}-${quote}`];
                    const pair = newPair.split('-');
                    if (pair.length === 2) {
                        this.base = pair[0];
                        this.quote = pair[1];
                    } else {
                        this.base = base;
                        this.quote = quote;
                    }
                } catch(e) {
                    this.base = base;
                    this.quote = quote;
                }

                // /**
                //  *  Swap order of (base, quote) based on MarketCap
                //  */
                // // http://prntscr.com/mb3h01
                // // If Market Cap of C1/ Market Cap of C2 is less than 1 (then do nothing)
                // // If it is greater than 1 (then the market is the reverse C2>C1)
                // const portfolioData = yourAccountStore.PortfolioData;
                // let c1MarketCap = 0;
                // let c2MarketCap = 0;
                //
                // if (portfolioData && portfolioData.length > 0) {
                //     for (let i = 0; i < portfolioData.length; i++) {
                //         if (portfolioData[i] && portfolioData[i].Coin === base) {
                //             c1MarketCap = portfolioData[i].Marketcap || 0;
                //         }
                //         if (portfolioData[i] && portfolioData[i].Coin === quote) {
                //             c2MarketCap = portfolioData[i].Marketcap || 0;
                //         }
                //         if (c1MarketCap !== 0 && c2MarketCap !== 0) {
                //             break;
                //         }
                //     }
                // }
                //
                // if (base === 'BTC' && quote === 'USDT') {
                //     this.base = 'BTC';
                //     this.quote = 'USDT';
                //     this.isRegularMarket = true;
                // } else if (base === 'USDT' && quote === 'BTC') {
                //     this.base = 'BTC';
                //     this.quote = 'USDT';
                //     this.isRegularMarket = false;
                // } else if (c2MarketCap !== 0 && c1MarketCap > c2MarketCap) {
                //     this.base = quote;
                //     this.quote = base;
                //     this.isRegularMarket = false;
                // }

                if (!getScreenInfo().isMobileDevice) {
                    this.initOrderBookBreakdownSubscription(this.base, this.quote);
                }
            },
            true
        );

        reaction(
            () => {
                return {
                    exchanges: exchangesStore.exchanges,
                };
            },
            ({
                exchanges,
            }) => {
                if (!getScreenInfo().isMobileDevice) {
                    this.exchanges = exchanges;
                    this.updateOrderBookBreakdownByExchange();
                }
            }
        );

        this.loadFromStorage().then((exches) => {
            this.exchanges = exches;
        });

        reaction(
            () => {
                return {
                    convertState: convertStore.convertState,
                };
            },
            ({
                convertState,
            }) => {
                this.convertState = convertState;
            }
        );

        this.orderbookBreakDownArrivedTime = Math.round((new Date()).getTime() / 1000);

        setInterval(() => {
            if (this.__subscriptionInited) {
                const currentUnix = Math.round((new Date()).getTime() / 1000);
                const delta = currentUnix - this.orderbookBreakDownArrivedTime;
                if (delta > 5) {
                    this.isOrderBookBreakDownStop = true;
                }
            }
        }, 1000);

        this.convertState = STATE_KEYS.coinSearch;
        this.exchanges = {};

        // --- calculate asks and bids for visual UI --- //
        const innerHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        this.maxRowCount = getMaxRows(innerHeight, ROW_HEIGHT);
    }

    loadFromStorage = () => {
        return new Promise((resolve, reject) => {
            const exchangesStr = localStorage.getItem('exchanges') || '{}';
            try {
                resolve(JSON.parse(exchangesStr) || {});
            } catch (e) {
                console.log(e);
                resolve(true);
            }
        });
    };

    updateAggregatedSummaryBooksSubscription(base, quote) {
        // this.AsksForOrderBook.clear();
        // this.BidsForOrderBook.clear();
        // this.Spread.clear();
        // AggregatedSummaryBooksUpdate({
        //     OldObservable: this.AggregatedSummary$,
        //     Symbols: [`${base}-${quote}`],
        // });
    }

    initOrderBookBreakdownSubscription = (base, quote) => {
        let exchanges = [];
        for (let property in this.exchanges) {
            if (this.exchanges[property] && this.exchanges[property].active && property !== 'Global') {
                exchanges.push(property);
            }
        }

        if (this.subscribe) this.subscribe.unsubscribe();
        this.subscribe = getOrderBookBreakdowns({
            symbol: `${base}-${quote}`,
            levels: this.requestLevel,
            throttleMs,
            exchanges,
        }).subscribe(this.handleIncomingAggregatedSummaryBooksFrames.bind(this));

        this.__subscriptionInited = true;
    };

    handleIncomingAggregatedSummaryBooksFrames(
        {
            Asks = [],
            Bids = [],
            Spread = 0,
            MidPrice = 0,
            Symbol = '',
        } = {}
    ) {
        if (!pageIsVisible() /* || this.convertState !== STATE_KEYS.coinSearch */) return;
        // --- check if data feed is exist in correct coin pair --- //
        // try {
        //     this.base = Symbol.split('-')[0];
        //     this.quote = Symbol.split('-')[1];
        // } catch (e) {
        //     this.base = '';
        //     this.quote = '';
        // }

        // --- check if data feed is coming continuously --- //
        this.orderbookBreakDownArrivedTime = Math.round((new Date()).getTime() / 1000);
        this.isOrderBookBreakDownStop = false;

        scheduleVisualDOMUpdate(() => {
            runInAction(() => {
                const asksDom = document.querySelector('#global-order-sell-book .ReactVirtualized__Table__Grid');
                const bidsDom = document.querySelector('#global-order-buy-book .ReactVirtualized__Table__Grid');
                const asksRowCount = Math.ceil((asksDom && asksDom.clientHeight && asksDom.clientHeight / ROW_HEIGHT) || this.maxRowCount);
                const bidsRowCount = Math.ceil((bidsDom && bidsDom.clientHeight && bidsDom.clientHeight / ROW_HEIGHT) || this.maxRowCount);
                this.requestLevel = Math.max(asksRowCount, bidsRowCount, 15);

                updateMapStoreFromArrayForOrderBook(this.AsksForOrderBook, Asks, asksRowCount, true);
                updateMapStoreFromArrayForOrderBook(this.BidsForOrderBook, Bids, bidsRowCount, false);
                let maxOrderSize = 0;
                let maxOrderAmount = 0;
                for (let i = 0; i < Asks.length; i++) {
                    maxOrderSize += Number(Asks[i][1]) * Number(Asks[i][0]);
                    maxOrderAmount += Number(Asks[i][1]);
                }
                this.maxOrderSize = customDigitFormatWithNoTrim(maxOrderSize) + ' ' + this.quote;
                this.maxOrderAmount = customDigitFormatWithNoTrim(maxOrderAmount) + ' ' + this.base;

                const isOrderBookDataLoaded = Asks.length > 0 && Bids.length > 0;
                if (this.isOrderBookDataLoaded !== isOrderBookDataLoaded) this.isOrderBookDataLoaded = isOrderBookDataLoaded;
            });
        });
        this.symbol = Symbol;
    }

    @action.bound updateOrderBookBreakdownByExchange() {
        let exchanges = [];
        for (let property in this.exchanges) {
            if (this.exchanges[property] && this.exchanges[property].active && property !== 'Global') {
                exchanges.push(property);
            }
        }

        if (this.subscribe) this.subscribe.unsubscribe();

        this.subscribe = getOrderBookBreakdowns({
            symbol: `${this.base}-${this.quote}`,
            levels: this.requestLevel,
            throttleMs,
            exchanges,
        }).subscribe(this.handleIncomingAggregatedSummaryBooksFrames.bind(this));
    }
}

export default (instrumentStore, exchangesStore, convertStore, yourAccountStore, marketsStore) => {
    const store = new OrderBookBreakDownStore(instrumentStore, exchangesStore, convertStore, yourAccountStore, marketsStore);
    return store;
};
