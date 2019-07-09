import {RecentTrades, RecentTradesUpdate} from 'bct-ui-satori';
import once from 'lodash.once';
import {computed, observable, reaction} from "mobx"
import {shiftMapStoreFromArray} from './utils/storeUtils';
import {pageIsVisible, roundToFixedNum} from '../utils';

const throttleMs = 175;
const maxRows = 50;

const recentTradesNormalized = recentTrades => recentTrades.reduce(
    (acc, {ExchangeID, Trades=[]}) => {
        Trades.forEach(({IsBuy, Price, Size, Timestamp})=>{
            acc.push([
                ExchangeID.toUpperCase(), 
                roundToFixedNum(Price, 6), 
                roundToFixedNum(Size, 6), 
                IsBuy,
                Timestamp.split('T')[1].split('.')[0].split('Z')[0]
            ])
        });
        return acc;
    },
    []
);

class RecentTradesStore {
    @observable RecentTrades = new Map();
    __subscriptionInited = false;

    constructor(instrumentStore) {

        instrumentStore.instrumentsReaction(
            (base, quote) => {
                if (this.__subscriptionInited) RecentTradesUpdate({Symbols: [`${base}-${quote}`]});
                else this.initRecentTradesSubscription(base, quote);
            },
            true
        )
    }

    initRecentTradesSubscription = once((base, quote) => {
        
        RecentTrades({
            Symbols:[`${base}-${quote}`],
            throttleMs,
        }).subscribe({next: this.handleIncomingRecentTradesFrames.bind(this)})

        this.__subscriptionInited = true;
    })

    handleIncomingRecentTradesFrames(
        {
            body: {
                messages:recentTrades=[],
            }={},
        }={}
    ) {
        if (!pageIsVisible()) return;

        requestIdleCallback(()=>{
            requestAnimationFrame(()=>{
                requestAnimationFrame(()=>{
                    shiftMapStoreFromArray(this.RecentTrades, recentTradesNormalized(recentTrades), maxRows)
                })
            })
        }, {timeout: 100})
    }
    
    @computed get recentTrades () {
        return this.RecentTrades
    }
}

export default (instrumentStore) => {
    const store = new RecentTradesStore(instrumentStore);
    return store;
};