import {
    computed, observable, autorun, action, runInAction, reaction
} from 'mobx';
import {
    scheduleVisualDOMUpdate,
    getDepthChartData
} from './utils/storeUtils';
import {
    pageIsVisible,
    getScreenInfo
} from '../utils';
import { getOrderBookDataFeed } from '../lib/ws/feed';
import { STATE_KEYS } from './ConvertStore';

const throttleMs = 500;
const requestLevels = 300;
// const maxRows = 50;


// purpose of reversedInsertionOrder is to return an exchange map whose insertion order is the stable reverse of the passed OrderBookMap
// we use reversedInsertionOrder=true for Asks
export const distinctExchangesFromOrderBook = (OrderBookMap, reversedInsertionOrder = false) => {
    const orderBookMapKeys = reversedInsertionOrder ? [...OrderBookMap.keys()].reverse() : [...OrderBookMap.keys()];

    return orderBookMapKeys.reduce(
        (acc, itemKey) => {
            const item = OrderBookMap.get(itemKey);
            const [, , exchangeStr] = item;
            exchangeStr.split(',').forEach((exchange) => {
                if (!acc.has(exchange)) acc.set(exchange, [item]);
                else acc.get(exchange).push(item);
            });
            return acc;
        },
        new Map()
    );
};

class OrderBookStore {
    @observable Asks = [];
    @observable Bids = [];
    @observable Spread = new Map();
    @observable PricesByExchangeSorted = new Map();
    @observable PricesByExchangeCCASorted = new Map();
    @observable isPricesByExchangeCCASorted = 0; // 0: default, 1: no exchanges, 2: several exchanges
    @observable MarketDepth = new Map();
    @observable base = ''; // incoming data feed's base coin
    @observable quote = ''; // incoming data feed's quote coin
    @observable isCoinPairInversed = false;
    @observable isOrderBookStop = false; // FALSE: no data stream, TRUE: data stream exists
    @observable isFetchingBestRates = false;
    @observable isDGLoaded = false;
    @observable isSymbolUpdated = true;

    symbol = '';
    __subscriptionInited = false;
    depthChartMode = false;
    orderHistoryMode = false;
    isGBExistMonitor = false;
    viewMode = '';
    spread$ = null;
    levels = 90;
    orderbookArrivedTime = 0;
    exchange = 'Global';
    convertState = null;
    exchanges = {};

    constructor(instrumentStore, viewModeStore, exchangesStore, convertStore, marketsStore) {
        autorun(() => {
            if (this.isSyncing) return;
            if (this.depthChartMode) this.deriveMarketDepth();
            this.deriveBestBidsByExchange();
        }, { delay: 0 });

        instrumentStore.instrumentsReaction(
            (base, quote) => {
                /**
                 * Init OrderBooks ws data
                 */
                this.Asks = [];
                this.Bids = [];
                this.spread$ = null;
                this.Spread.clear();
                this.isCoinPairInversed = false;

                try {
                    const newPair = marketsStore.markets[`${base}-${quote}`];
                    const pair = newPair.split('-');
                    if (pair.length === 2) {
                        this.base = pair[0];
                        this.quote = pair[1];
                        this.isCoinPairInversed = (base === this.quote) && (quote === this.base);
                    } else {
                        this.base = base;
                        this.quote = quote;
                    }
                } catch(e) {
                    this.base = base;
                    this.quote = quote;
                }

                if (!getScreenInfo().isMobileDevice) {
                    this.initOrderBooksSubscription(base, quote);
                }

                this.PricesByExchangeCCASorted.clear();
                this.isPricesByExchangeCCASorted = 0;

                base = (base || '').replace('F:', '');
                quote = (quote || '').replace('F:', '');
                const symbol = base + '-' + quote;
                this.fetchBestRates(symbol);
                const isSymbolUpdated = this.symbol === symbol;
                if (isSymbolUpdated !== this.isSymbolUpdated) this.isSymbolUpdated = isSymbolUpdated;
            },
            true
        );

        this.orderbookArrivedTime = Math.round((new Date()).getTime() / 1000);

        reaction(
            () => ({
                depthChartMode: viewModeStore.depthChartMode,
                orderHistoryMode: viewModeStore.orderHistoryMode,
                viewMode: viewModeStore.viewMode,
                isGBExistMonitor: viewModeStore.isGBExistMonitor,
            }),
            (viewMode) => {
                this.depthChartMode = viewMode.depthChartMode;
                this.orderHistoryMode = viewMode.orderHistoryMode;
                this.viewMode = viewMode.viewMode;
                this.isGBExistMonitor = viewMode.isGBExistMonitor;
            }
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
                    this.updateOrderBooksByExchange();
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

        setInterval(() => {
            if (this.__subscriptionInited) {
                const currentUnix = Math.round((new Date()).getTime() / 1000);
                const delta = currentUnix - this.orderbookArrivedTime;
                if (delta > 5) {
                    this.isOrderBookStop = true;
                }
            }
        }, 1000);

        this.convertState = STATE_KEYS.coinSearch;
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

    @computed get asks() {
        return this.Asks;
    }

    @computed get pricesByExchange() {
        return this.PricesByExchangeSorted;
    }

    @computed get pricesByExchangeCCA() {
        return this.PricesByExchangeCCASorted;
    }

    @computed get bids() {
        return this.Bids;
    }

    @computed get spread() {
        return this.Spread;
    }

    @computed get depthChartData() {
        return this.MarketDepth;
    }

    @computed get orderBookCoinPair() {
        return [this.base, this.quote];
    }

    @computed get highestBidPrice() {
        return (this.Bids && this.Bids.length > 0) ? this.Bids[0][0] : 0;
    }

    @computed get lowestAskPrice() {
        return (this.Asks && this.Asks.length > 0) ? this.Asks[0][0] : 0;
    }

    @computed get totalDistinctExchangesBidSide() {
        return this.distinctExchangesBidSide.size;
    }

    @observable syncState = new Map([
        ['asks', false],
        ['bids', false],
        ['spread', false]
    ]);

    @action.bound asksSyncComplete() {
        this.syncState.set('asks', false);
    }

    @action.bound bidsSyncComplete() {
        this.syncState.set('bids', false);
    }

    @action.bound spreadSyncComplete() {
        this.syncState.set('spread', false);
    }

    @action.bound
    allSyncStart() {
        this.syncState.set('asks', true);
        this.syncState.set('bids', true);
        this.syncState.set('spread', true);
    }

    @computed get isSyncing() {
        for (let [, isSync] of this.syncState) {
            if (isSync) return true;
        }
        return false;
    }

    @action.bound
    deriveMarketDepth() {
        const [sells, buys] = getDepthChartData(this.Asks, this.Bids, this.spread$, this.levels);
        const isDGLoaded = this.Asks.length > 10 && this.Bids.length > 10
            && sells && buys && (sells.length > 1) && (buys.length > 1);

        let midPrice = 1;
        let spreadMax = 10;
        let spreadMin = 1;
        if (isDGLoaded) {
            midPrice = (buys[buys.length - 1].x + sells[0].x) / 2;
            spreadMax = Math.min(this.Asks[this.Asks.length - 1][0] - midPrice, midPrice - this.Bids[this.Bids.length - 1][0]);
            spreadMin = Math.max(this.Asks[10][0] - midPrice, midPrice - this.Bids[10][0]);

            if (buys[buys.length - 1].x > sells[0].x) {
                const spreadArb = Math.max(midPrice - this.Asks[0][0], this.Bids[0][0] - midPrice);
                if (spreadArb >= spreadMin) {
                    spreadMin = spreadArb;
                }
            }
        }

        const symbol = this.base + '-' + this.quote;
        const isSymbolUpdated = this.symbol === symbol;
        if (isSymbolUpdated !== this.isSymbolUpdated) this.isSymbolUpdated = isSymbolUpdated;

        this.MarketDepth.set('symbol', this.symbol);
        this.MarketDepth.set('midMarket', midPrice);
        this.MarketDepth.set('spreadMax', spreadMax);
        this.MarketDepth.set('spreadMin', spreadMin);
        this.MarketDepth.set('sells', sells);
        this.MarketDepth.set('buys', buys);
        this.MarketDepth.set('lastTrade', 5888.8);
    }

    initOrderBooksSubscription = (base, quote) => {
        let exchanges = [];
        for (let property in this.exchanges) {
            if (this.exchanges[property] && this.exchanges[property].active && property !== 'Global') {
                exchanges.push(property);
            }
        }
        if (this.subscribe) this.subscribe.unsubscribe();
        this.subscribe = getOrderBookDataFeed({
            symbol: `${base}-${quote}`,
            levels: requestLevels,
            throttleMs,
            min: null,
            max: null,
            exchanges,
        }).subscribe(this.handleIncomingOrderBooksFrames.bind(this));

        this.__subscriptionInited = true;
    }

    async fetchBestRates(symbol) {
        // https://rest.qa.bct.trade/api/exchange-prices/BTC-USDT
        const url = `https://rest.qa.bct.trade/api/exchange-prices/${symbol}`;

        this.isFetchingBestRates = true;

        fetch(url)
            .then(response => response.json())
            .then(Data => {
                this.isFetchingBestRates = false;

                if (Data.ok === 1) {
                    const pricesData = Data.data;
                    if (pricesData && pricesData.prices) {
                        for (let i = 0; i < pricesData.prices.length; i++) {
                            this.PricesByExchangeCCASorted.set(i, [pricesData.prices[i].exchangeName, pricesData.prices[i].price]);
                        }

                        if (pricesData.prices.length > 0) {
                            this.isPricesByExchangeCCASorted = 2;
                        } else {
                            this.isPricesByExchangeCCASorted = 1;
                        }
                    }
                } else {
                    this.PricesByExchangeCCASorted.clear();
                    this.isPricesByExchangeCCASorted = 1;
                }
            })
            .catch(err => {
                this.isFetchingBestRates = false;
                console.log('[fetchBestRates error]', err);
            });
    }

    updateSpread = (spread) => {
        this.spread$ = spread;
        this.deriveMarketDepth();
    };

    handleIncomingOrderBooksFrames(
        {
            Asks = [],
            Bids = [],
            Spread = 0,
            MidPrice = 0,
            Symbol = '',
        } = {}
    ) {
        if (!pageIsVisible() ||
            this.convertState !== STATE_KEYS.coinSearch
        ) return;

        if (Asks.length > 1 && Asks[0][0] > Asks[Asks.length - 1][0]) Asks.reverse();
        if (Bids.length > 1 && Bids[0][0] < Bids[Bids.length - 1][0]) Bids.reverse();

        // --- check if data feed is exist in correct coin pair --- //
        // try {
        //     this.base = Symbol.split('-')[0];
        //     this.quote = Symbol.split('-')[1];
        // } catch (e) {
        //     this.base = '';
        //     this.quote = '';
        // }

        // --- check if data feed is coming continuously --- //
        this.orderbookArrivedTime = Math.round((new Date()).getTime() / 1000);
        this.isOrderBookStop = false;

        this.allSyncStart();

        scheduleVisualDOMUpdate(() => {
            runInAction(() => {
                this.Asks = Asks;
                this.Bids = Bids;
                this.asksSyncComplete();
                this.bidsSyncComplete();
                const isDGLoaded = this.Asks.length > 10 && this.Bids.length > 10;
                if (isDGLoaded !== this.isDGLoaded) this.isDGLoaded = isDGLoaded;
            });
        });

        scheduleVisualDOMUpdate(() => {
            runInAction(() => {
                this.Spread.set(0, Spread);
                this.Spread.set('midPrice', MidPrice);
                this.spreadSyncComplete();
            });
        });
        this.symbol = Symbol;
    }

    deriveBestBidsByExchange() {
        // scheduleVisualDOMUpdate(() => {
        //     const maxItems = 100;
        //     let i = -1;

        //     for (let [exchange, askItem] of this.distinctExchangesBidSide) {
        //         if (++i < maxItems) {
        //             this.PricesByExchangeSorted.set(i, [exchange, askItem[0][0]]);
        //         }
        //     }

        //     while (i < maxItems) {
        //         if (this.PricesByExchangeSorted.has(i)) {
        //             this.PricesByExchangeSorted.delete(i);
        //         }
        //         i++;
        //     }
        // });
    }

    updateOrderBooksByExchange = () => {
        let exchanges = [];
        for (let property in this.exchanges) {
            if (this.exchanges[property] && this.exchanges[property].active && property !== 'Global') {
                exchanges.push(property);
            }
        }

        if (this.subscribe) this.subscribe.unsubscribe();

        this.subscribe = getOrderBookDataFeed({
            symbol: `${this.base}-${this.quote}`,
            levels: requestLevels,
            throttleMs,
            min: null,
            max: null,
            exchanges,
        }).subscribe(this.handleIncomingOrderBooksFrames.bind(this));
    }
}

export default (instrumentStore, viewModeStore, exchangesStore, convertStore, marketsStore) => {
    const store = new OrderBookStore(instrumentStore, viewModeStore, exchangesStore, convertStore, marketsStore);
    return store;
};
