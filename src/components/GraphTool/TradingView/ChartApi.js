import { BehaviorSubject } from 'rxjs';
import { HISTORICAL_DATA_URL } from '../../../config/constants';
import { recentTradesObservable } from '../../../lib/bct-ws/index';

const ChartAPI = {};
export const apiDataLoadObservable = new BehaviorSubject({}); // this is only for loading bar

const getSymbol = ({ exchange, market }) => ({
    name: market.code,
    ticker: `${exchange.code}:${market.code}`,
    description: market.code,
    timezone: 'UTC',
    type: 'market',
    session: '24x7',
    minmov: 1,
    minmov2: 0,
    pricescale: 1E8,
    pointvalue: 1,
    volume_precision: 4,
    data_status: 'streaming',
    has_intraday: true,
    has_daily: true,
    supported_resolutions: ['1', '5', '15', '60', '360', '1440', 'D'],
    intraday_multipliers: ['1', '5', '15', '60', '360', '1440', 'D'],
    has_weekly_and_monthly: false,
    has_empty_bars: false,
    exchange_name: exchange.code,
    exchange: exchange.code,
    market_name: market.code,
});

const buildBar = barData => {
    return {
        close: +barData.Price,
        isLastBar: true,
        time: +new Date(barData.Timestamp),
        volume: +barData.Size,
        isBarClosed: false,
        open: +barData.Price,
    };
};

const intervalMap = period => {
    const periodMap = {
        1: '1m',
        5: '5m',
        15: '15m',
        60: '1h',
        360: '6h',
        D: '1d',
    };

    return periodMap[period];
};

const intervals = period => {
    const intervals = {
        1: 60 * 1000,
        5: 5 * 60 * 1000,
        15: 15 * 60 * 1000,
        60: 60 * 60 * 1000,
        360: 6 * 60 * 60 * 1000,
        D: 24 * 60 * 60 * 1000,
    };

    return intervals[period];
};

const getHistoryData = (tsBeg, tsEnd, interval, exchangeId, marketId) => {
    const url = HISTORICAL_DATA_URL
        .replace('@marketId', marketId)
        .replace('@tsBeg', tsBeg)
        .replace('@tsEnd', tsEnd)
        .replace('@interval', interval)
        .replace('@exchangeId', exchangeId);
    return fetch(url)
        .then(response => response.json());
};

const roundTimeByInterval = (time, interval) => +new Date(Math.trunc(time / interval) * interval);

ChartAPI.UDFCompatibleDatafeed = function () {
    this._configuration = undefined;

    this._protocolVersion = 2;

    this._enableLogging = true;
    this._initializationFinished = false;
    this._callbacks = {};

    this._subscribers = {};

    this._initialize();
    this.lastBarTime = null;
    this._onRealtimeCallback = null;

    recentTradesObservable
        .subscribe({
            next: ({ body: { messages:recentTrades = [] } = {} } = {}) => {
                const trades = recentTrades[0] || {};

                if (trades.ExchangeID !== 'Binance') { return; }

                const dataTicker = `${trades.ExchangeID}:${trades.Symbol}`;

                const listenerGUID = Object.keys(this._subscribers)
                    .find(listenerGUID1 => this._subscribers[listenerGUID1].symbolInfo.ticker === dataTicker);

                const subscriber = this._subscribers[listenerGUID];

                if (subscriber) {
                    this._logMessage(`${listenerGUID} lastBarTime: ${this.lastBarTime}`);
                    const listeners = subscriber.listeners;

                    const bars = trades.Trades
                        .map(buildBar)
                        .filter(bar => roundTimeByInterval(bar.time, intervals(subscriber.resolution)) >= this.lastBarTime)
                        .forEach(bar => {
                            const ts = bar.time;
                            const date = roundTimeByInterval(ts, intervals(subscriber.resolution));

                            if (!subscriber.lastBar) {
                                subscriber.lastBar = {
                                    ...bar,
                                    time: date,
                                };
                                this.lastBarTime = date;
                                return;
                            }

                            listeners
                                .forEach(listener => {
                                    if (this.lastBarTime === date) {
                                        subscriber.lastBar.close = bar.close;
                                        subscriber.lastBar.high = subscriber.lastBar.high > bar.close
                                            ? subscriber.lastBar.high
                                            : bar.close;
                                        subscriber.lastBar.low = subscriber.lastBar.low < bar.close
                                            ? subscriber.lastBar.low
                                            : bar.close;
                                        subscriber.lastBar.volume += bar.volume;

                                        listener(subscriber.lastBar);
                                    } else {
                                        subscriber.lastBar.isLastBar = false;
                                        subscriber.lastBar.isBarClosed = true;

                                        listener(subscriber.lastBar);

                                        this.lastBarTime = date;

                                        subscriber.lastBar = {
                                            ...bar,
                                            time: date,
                                        };
                                        listener({
                                            ...bar,
                                            time: date,
                                        });
                                    }
                                });
                        });

                    // let bar = buildBar(data);

                    // const ts = +new Date(bar.time);
                    // const date = roundTimeByInterval(ts, this.subscriptionIntervalMs);

                    // if (intervalMap(interval) !== this.subscriptionIntervalMs) {
                    //     this.subscriptionIntervalMs = intervalMap(interval);
                    //     subscriber.lastBarTime = roundTimeByInterval(ts, this.subscriptionIntervalMs);
                    // }

                    // const listeners = subscriber.listeners;

                    // if (!subscriber.lastBar) {
                    //     subscriber.lastBar = {
                    //         ...bar,
                    //         time: date,
                    //     };
                    //     subscriber.lastBarTime = date;
                    //     return;
                    // }

                    // listeners
                    //     .forEach(listener => {
                    //         if (bar.time - this.subscriptionIntervalMs < subscriber.lastBarTime) {
                    //             subscriber.lastBar.time = date;
                    //             subscriber.lastBar.close = bar.close;
                    //             subscriber.lastBar.high = subscriber.lastBar.high > bar.close
                    //                 ? subscriber.lastBar.high
                    //                 : bar.close;
                    //             subscriber.lastBar.low = subscriber.lastBar.low < bar.close
                    //                 ? subscriber.lastBar.low
                    //                 : bar.close;
                    //             subscriber.lastBar.volume += bar.volume;

                    //             listener(subscriber.lastBar);
                    //         } else {
                    //             subscriber.lastBar.isLastBar = false;
                    //             subscriber.lastBar.isBarClosed = true;
                    //             listener(subscriber.lastBar);
                    //             subscriber.lastBar = null;
                    //             listener({
                    //                 ...bar,
                    //                 time: date,
                    //             });
                    //         }
                    //     });
                }
            },
        });
};

ChartAPI.UDFCompatibleDatafeed.prototype.on = function (event, cb) {
    if (typeof this._callbacks[event] === 'undefined') {
        this._callbacks[event] = [];
    }

    this._callbacks[event].push(cb);
    return this;
};

ChartAPI.UDFCompatibleDatafeed.prototype._fireEvent = function (event, argument) {
    this._logMessage(`event${event}`);
    if (typeof this._callbacks[event] !== 'undefined') {
        const callbacksChain = this._callbacks[event];
        for (let i = 0; i < callbacksChain.length; ++i) {
            callbacksChain[i](argument);
        }

        this._callbacks[event] = [];
    }
};

ChartAPI.UDFCompatibleDatafeed.prototype.onInitialized = function () {
    this._logMessage('on initialized');
    this._initializationFinished = true;
    this._fireEvent('initialized');
};

ChartAPI.UDFCompatibleDatafeed.prototype._logMessage = function (message) {
    // if (this._enableLogging) {
    //     const now = new Date()
    //     if (typeof message !== 'object') {
    //         console.log(`${now.toLocaleTimeString()}.${now.getMilliseconds()}> ${message}`)
    //     } else {
    //         console.log(`${now.toLocaleTimeString()}.${now.getMilliseconds()} Object Below`)
    //         console.log(message)
    //     }
    // }
};

ChartAPI.UDFCompatibleDatafeed.prototype._initialize = function () {
    this._setupWithConfiguration(this.defaultConfiguration());
};

ChartAPI.UDFCompatibleDatafeed.prototype.onReady = function (cb) {
    const that = this;
    this._logMessage(`this.configuration ${JSON.stringify(this._configuration)}`);
    if (this._configuration) {
        setTimeout(() => {
            cb(that._configuration);
        }, 0);
    } else {
        this.on('configuration_ready', () => {
            cb(that._configuration);
        });
    }
    this._logMessage('Ready');
};

ChartAPI.UDFCompatibleDatafeed.prototype.defaultConfiguration = function () {
    return {
        supports_search: true,
        supports_group_request: false,
        exchanges: [
            { value: '', name: 'All Exchanges', desc: '' }
        ],
        symbolsTypes: [
            { name: 'All types', value: '' },
            { name: 'Market', value: 'bitcoin' }
        ],
        supported_resolutions: ['1', '5', '15', '60', '360', '1440', 'D'],
    };
};

ChartAPI.UDFCompatibleDatafeed.prototype._setupWithConfiguration = function (configurationData) {
    this._logMessage('_setupWithConfiguration');

    this._configuration = configurationData;

    if (!configurationData.exchanges) {
        configurationData.exchanges = [];
    }

    // @obsolete; remove in 1.5
    const supportedResolutions = configurationData.supported_resolutions || configurationData.supportedResolutions;
    configurationData.supported_resolutions = supportedResolutions;

    // @obsolete; remove in 1.5
    const symbolsTypes = configurationData.symbols_types || configurationData.symbolsTypes;
    configurationData.symbols_types = symbolsTypes;

    if (!configurationData.supports_search && !configurationData.supports_group_request) {
        throw new Error('Unsupported datafeed configuration. Must either support search, or support group request');
    }

    this.onInitialized();
    this._fireEvent('configuration_ready');
    this._logMessage(`Initialized with ${JSON.stringify(configurationData)}`);
};

ChartAPI.UDFCompatibleDatafeed.prototype.resolveSymbol = function (symbolName, onSymbolResolvedCallback, onResolveErrorCallback) {
    const that = this;

    this._logMessage(`Resolve Symbol - ${symbolName}`);
    if (symbolName.indexOf(':') < 0) {
        return;
    }

    if (!this._initializationFinished) {
        this.on('initialized', () => {
            that.resolveSymbol(symbolName, onSymbolResolvedCallback, onResolveErrorCallback);
        });
        return;
    }

    const splited = symbolName.split(':');

    const instrumentName = splited[1].replace(/\//, '');

    const data = {
        exchange: {
            code: splited[0],
        },
        market: {
            code: splited[1],
        },
    };

    setTimeout(() => {
        onSymbolResolvedCallback(getSymbol(data));
    }, 0);
};

const drawHistoryGraph = (bars, firstDataRequest, onDataCallback, symbolInfo, resolution, onErrorCallback) => {
    let normalizedBars;
    const url = `https://rest.qa.bct.trade/api/best-conversion-rate/${symbolInfo.name}`;
    const barsLength = bars.length;

    fetch(url)
        .then(response => response.json())
        .then(Data => {
            let price = 0;
            let average1 = 0;
            let average2 = 0;

            try {
                price = Data.data.rate || 0;
            } catch(err) {
                price = 0;
            }

            try {
                average1 = (bars[barsLength - 1].low + bars[barsLength - 1].high) / 2;
                average2 = (1 / bars[barsLength - 1].low + 1 / bars[barsLength - 1].high) / 2;
            } catch (e) {
                average1 = 0;
                average2 = 0;
            }

            if (Math.abs(average1 - price) > Math.abs(average2 - price)) {
                normalizedBars = bars
                    .map((b, i) => ({
                        close: 1 / (+b.cls),
                        isLastBar: i === bars.length - 1,
                        time: +new Date(b.time),
                        volume: 1 / (+b.vol),
                        isBarClosed: true,
                        open: 1 / (+b.opn),
                        high: 1 / (+b.high),
                        low: 1 / (+b.low),
                    }));
            } else {
                normalizedBars = bars
                    .map((b, i) => ({
                        close: +b.cls,
                        isLastBar: i === bars.length - 1,
                        time: +new Date(b.time),
                        volume: +b.vol,
                        isBarClosed: true,
                        open: +b.opn,
                        high: +b.high,
                        low: +b.low,
                    }));
            }

            if (firstDataRequest) {
                // TODO handle correct
                try {
                    this.lastBarTime = roundTimeByInterval(normalizedBars[normalizedBars.length - 1].time, intervals(resolution));
                } catch (e) {
                    // console.log(e);
                }
            }
            apiDataLoadObservable.next({
                apiLoaded: true,
            });
            return onDataCallback(normalizedBars, { noData: !normalizedBars.length });
        })
        .catch(err => onErrorCallback());
};

const drawHistoryGraphWithMultiply = (bars, firstDataRequest, onDataCallback, symbolInfo, resolution, onErrorCallback) => {
    // console.log('[symbolInfo111]', symbolInfo);
    const coin1 = symbolInfo.name.split('-')[0] || '';
    const coin2 = symbolInfo.name.split('-')[1] || '';

    let normalizedBars;
    fetch(`https://rest.qa.bct.trade/api/best-conversion-rate/${coin1}-ETH`)
        .then(response => response.json())
        .then(Data => {
            let rateY = 0;
            try {
                rateY = Data.data.rate || 0;
            } catch(err) {
                rateY = 0;
            }

            fetch(`https://rest.qa.bct.trade/api/best-conversion-rate/${coin2}-BTC`)
                .then(response => response.json())
                .then(Data => {
                    let rateZ = 0;
                    try {
                        rateZ = Data.data.rate || 0;
                    } catch(err) {
                        rateZ = 0;
                    }

                    const rate = rateZ !== 0 ? rateY / rateZ : 0;

                    normalizedBars = bars
                        .map((b, i) => ({
                            close: (+b.cls) * rate,
                            isLastBar: i === bars.length - 1,
                            time: +new Date(b.time),
                            volume: (+b.vol) * rate,
                            isBarClosed: true,
                            open: (+b.opn) * rate,
                            high: (+b.high) * rate,
                            low: (+b.low) * rate,
                        }));

                    if (firstDataRequest) {
                        // TODO handle correct
                        try {
                            this.lastBarTime = roundTimeByInterval(normalizedBars[normalizedBars.length - 1].time, intervals(resolution));
                        } catch (e) {
                            console.log(e);
                        }
                    }
                    apiDataLoadObservable.next({
                        apiLoaded: true,
                    });
                    return onDataCallback(normalizedBars, { noData: !normalizedBars.length });
                })
                .catch(err => onErrorCallback());
        })
        .catch(err => onErrorCallback());
};

ChartAPI.UDFCompatibleDatafeed.prototype.getBars = function (symbolInfo, resolution, rangeStartDate, rangeEndDate, onDataCallback, onErrorCallback, firstDataRequest) {
    this._logMessage(`getBars ${symbolInfo.ticker}`);
    const { exchange, market_name: marketName } = symbolInfo;

    apiDataLoadObservable.next({
        apiLoaded: false,
    });

    getHistoryData(rangeStartDate * 1000, rangeEndDate * 1000, intervalMap(resolution), (exchange || '').toLowerCase(), marketName)
        .then(bars => {
            if (bars.length > 0) {
                return drawHistoryGraph(bars, firstDataRequest, onDataCallback, symbolInfo, resolution, onErrorCallback);
            }

            // --- use ETH-BTC market for no data coins --- //
            getHistoryData(rangeStartDate * 1000, rangeEndDate * 1000, intervalMap(resolution), (exchange || '').toLowerCase(), 'ETH-BTC')
                .then(bars => {
                    return  drawHistoryGraphWithMultiply(bars, firstDataRequest, onDataCallback, symbolInfo, resolution, onErrorCallback);
                })
                .catch(err => onErrorCallback());
        })
        .catch(err => onErrorCallback());
};


ChartAPI.UDFCompatibleDatafeed.prototype.subscribeBars = function (symbolInfo, resolution, onRealtimeCallback, listenerGUID) {
    this._logMessage(`subscribeBars ${listenerGUID}`);

    if (typeof this._subscribers[listenerGUID] === 'undefined') {
        this._subscribers[listenerGUID] = {
            symbolInfo,
            resolution,
            lastBarTime: null,
            lastBar: null,
            listeners: [],
        };
    }

    this._subscribers[listenerGUID].listeners.push(onRealtimeCallback);
};

ChartAPI.UDFCompatibleDatafeed.prototype.unsubscribeBars = function (listenerGUID) {
    this._logMessage(`unsubscribeBars ${listenerGUID}`);

    delete this._subscribers[listenerGUID];
};

export default ChartAPI;
