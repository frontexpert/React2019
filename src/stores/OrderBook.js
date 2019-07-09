import {AggregatedSummaryBooks, AggregatedSummaryBooksUpdate} from 'bct-ui-satori';
import {computed, observable, autorun, action, reaction} from "mobx"
import {updateMapStoreFromArray, getInnerQuartileRangeOrders, partitionBuysSells, getSellDepthData, getBuyDepthData} from './utils/storeUtils';
import partial from 'lodash.partial';
import once from 'lodash.once';
import {pageIsVisible, roundToFixedNum} from '../utils';

const throttleMs = 1000;
const maxRows = 50;

const normalizeOrderBookItems = items => items.map(
    ([price, amount, exchange]) => [
        roundToFixedNum(price, 6),
        roundToFixedNum(amount, 6),
        exchange.toUpperCase()
    ]
);

export const getDepthData = (Asks, Bids, maxItems) => {
    let allOrders = [];

    const buyKey = 'Buy';
    const sellKey = 'Sell';

    // value is [price, amount, exchange]
    let i = 0;
    for (const [, [price, size]] of Asks) {
        if (i >= maxItems) break;
        allOrders.push([Number(price), Number(size), sellKey]);
        i++;
    }

    i = 0;
    for (const [, [price, size]] of Bids) {
        if (i >= maxItems) break;
        allOrders.push([Number(price), Number(size), buyKey]);
        i++;
    }

    //gets interquartile range; needs all orders in one list
    const iqrOrders = getInnerQuartileRangeOrders(allOrders);

    //buy sell orders are separated back out
    const [buyOrders, sellOrders] = partitionBuysSells(iqrOrders, buyKey, sellKey);
    const sells = getSellDepthData(sellOrders);
    const buys = getBuyDepthData(buyOrders);


    const sellTop = sells && sells.length > 0 ? sells[0].x : 0;
    const buyTop = buys && buys.length > 0 ? buys[0].x : 0;
    const midMarket = ((sellTop + buyTop) / 2).toFixed(8);

    return [
        sells,
        buys,
        midMarket
    ]
};

class OrderBookStore {
    @observable Asks = new Map();
    @observable Bids = new Map();
    @observable Spread = new Map();
    @observable PricesByExchangeSorted = new Map();
    @observable DepthChartOrderData = new Map();

    __subscriptionInited = false;

    constructor(instrumentStore) {

        autorun(() => {
            for (let [, isSync] of this.isSyncing) {
                if (isSync) return;
            }
            this.mapBelkaOrderBookToDepthChart()
        }, {
            delay: 1000,
            onError(e) {
                console.log(e);
            },
        });

        instrumentStore.instrumentsReaction(
            (base, quote) => {
                if (this.__subscriptionInited) AggregatedSummaryBooksUpdate({Symbols: [`${base}-${quote}`]});
                else this.initAggregatedSummaryBooksSubscription(base, quote);
            },
            true
        )
    }

    initAggregatedSummaryBooksSubscription = once((base, quote) => {
        AggregatedSummaryBooks({
            Symbols:[`${base}-${quote}`],
            throttleMs,
        }).subscribe({next: this.handleIncomingAggregatedSummaryBooksFrames.bind(this)})
        this.__subscriptionInited = true;
    })

    handleIncomingAggregatedSummaryBooksFrames(
        {
            body: {
                messages: [
                    {
                        Asks=[],
                        Bids=[],
                        Spread=0,
                    }={}
                ]=[],
            }={},
        }={}
    ){
        if (!pageIsVisible()) return;
        
        this.allSyncStart();

        requestIdleCallback(() => {
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    updateMapStoreFromArray(this.Asks, normalizeOrderBookItems(Asks.reverse()), maxRows);
                    this.isSyncing.set('asks', false);
                })
            });

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    updateMapStoreFromArray(this.Bids, normalizeOrderBookItems(Bids), maxRows);
                    this.isSyncing.set('bids', false);
                })
            });

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    this.Spread.set(0, Spread);
                    this.isSyncing.set('spread', false);
                })
            });
        }, {timeout: 50})
    }
    

    /**
     *  | --------------------------|----------------------------|
     *  | Belka Order Book Item     | Depth Chart Order Book Item|
     *  | [price, amount, exchange] | {price, volume, exchange}  |
     *  | --------------------------|----------------------------|
     */
    @action.bound
    mapBelkaOrderBookToDepthChart() {
        // TODO:Review for diffing algo
        for (let [, isSync] of this.isSyncing) {
            if (isSync) return new Map();
        }

        const maxItems = 100;
        if (this.Asks.size === 0 || this.Bids.size === 0) return;

        const [sells, buys, midMarket] = getDepthData(this.Asks, this.Bids, maxItems);

        this.DepthChartOrderData.set("sells", sells);
        this.DepthChartOrderData.set("buys", buys);
        this.DepthChartOrderData.set("midMarket", midMarket);
        this.DepthChartOrderData.set("baseCur", "BTC");
        this.DepthChartOrderData.set("quoteCur", "ETH");
        this.DepthChartOrderData.set("lastTrade", 5888.8);
    }

    @observable isSyncing = new Map([
        ['asks', false],
        ['bids', false],
        ['spread', false]
    ]);

    @computed get asks() {
        return this.Asks;
    }

    @computed get pricesByExchange() {
        return this.PricesByExchangeSorted;
    }

    @computed get bids() {
        return this.Bids;
    }

    @computed get spread() {
        return this.Spread;
    }

    @computed get depthChartData() {
        return this.DepthChartOrderData;
    }

    @computed get highestBidPrice() {
        return this.Bids.has(0) ? this.Bids.get(this.Bids.size - 1)[0] : 0;
    }

    @computed get lowestAskPrice() {
        return this.Asks.has(0) ? this.Asks.get(0)[0] : 0;
    }

    @action.bound
    allSyncStart() {
        this.isSyncing.set('asks', true);
        this.isSyncing.set('bids', true);
        this.isSyncing.set('spread', true);
    }
};

const derivePricesByExchange = (store) => {
    autorun(() => {
        // short circuit if any part of store is syncing
        // TODO: figure out how to do this the mobx way
        for (let [, isSync] of store.isSyncing) {
            if (isSync) return;
        }

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                const PricesByExchange = new Map();
                const maxItems = 20;
                let i = 0;

                const mapToPriceByExchange = (price, exchange) => {
                    if (!PricesByExchange.has(exchange)) {
                        PricesByExchange.set(exchange, price);
                        store.PricesByExchangeSorted.set(i, [exchange, price]);
                        i++;
                    }
                };

                // needs to be dynamic for both Asks/Bids****
                for (let [, [price, , exchange]] of store.asks) {
                    if (i >= maxItems) break;
                    exchange.split(',').forEach(partial(mapToPriceByExchange, price))
                }

                while (i < maxItems) {
                    if (store.PricesByExchangeSorted.has(i)) {
                        store.PricesByExchangeSorted.delete(i);
                    }
                    i++;
                }
            })
        })
    }, {delay: 650})
};

export default (instrumentStore) => {
    const store = new OrderBookStore(instrumentStore);
    derivePricesByExchange(store);
    return store;
};