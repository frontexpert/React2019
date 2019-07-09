/* global AlphaPoint, window, AP_API */

/*
 This class implements interaction with UDF-compatible datafeed.

 See UDF protocol reference at
 https://github.com/tradingview/charting_library/wiki/UDF
 */
// import Rx from 'rx-lite';

const ChartAPI = {};

const getSymbol = ({exchange, market, OMSId, coinAPISymbol}) => ({
    name: exchange.code,
    ticker: `${exchange.code}:${market.code}`,
    description: `${exchange.code}:${market.code}`,
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
    supported_resolutions: ['1', '5', '15', '60', '360', 'D'],
    intraday_multipliers: ['1', '5', '15', '60', '360', 'D'],
    has_weekly_and_monthly: false,
    has_empty_bars: true,
    exchange_name: exchange.code,
    exchange_id: exchange.id,
    market_id: market.id,
    coinAPISymbol,
    OMSId,
});

const buildBar = barData => {
    return {
        close: +barData.price,
        isLastBar: true,
        time: +new Date(barData.timestamp),
        volume: +barData.quantity,
        isBarClosed: false,
        open: +barData.price,
    }
}

const intervalMap = period => {
    const periodMap = {
        "1": 60 * 1000,
        "5": 5 * 60 * 1000,
        "15": 15 * 60 * 1000,
        "60": 60 * 60 * 1000,
        "360": 6 * 60 * 60 * 1000,
        "D": 24 * 60 * 60 * 1000,
    };

    return periodMap[period];
}

const roundTimeByInterval = (time, interval) => +new Date(Math.trunc(time / interval) * interval);

const getPreviousSymbol = () => {
    const exchanges = AlphaPoint.exchanges.value;
    const instruments = AlphaPoint.instruments.value;
    const selectedExchangeIds = AlphaPoint.exchangesChange.value;
    const selectedInstrumentId = AlphaPoint.instrumentChange.value;

    let defaultExchangeId = selectedExchangeIds
        .find(exchangeId => AlphaPoint.config.mostValuebleExchnagesId.includes(exchangeId)) || selectedExchangeIds[0];
    let prevExchange = exchanges.find(ex => ex.id === defaultExchangeId);
    let prevInstrument = instruments.find(inst => inst.InstrumentId === selectedInstrumentId);
    let defaultExchange = exchanges.find(exchange => exchange.id === defaultExchangeId);
    let market = [prevInstrument.Product1Symbol, prevInstrument.Product2Symbol].join('/');

    return `${defaultExchange.name}:${market}`;
};

ChartAPI.UDFCompatibleDatafeed = function () {
    this._configuration = undefined;

    this._protocolVersion = 2;

    this._enableLogging = AlphaPoint.config.chart.debug;
    this._initializationFinished = false;
    this._callbacks = {};

    this._subscribers = {};

    this._rxHistorySubscribers = [];

    this._initialize();
    this._subscriptionIntervalMs = 60 * 1000;
    this._onRealtimeCallback = null;

    Rx.Observable.combineLatest(
        AlphaPoint.coinAPITrades,
        AlphaPoint.logs.chartIntervalChanged
    )
        .filter(([data, interval]) => data)
        .subscribe(([data, interval]) => {
            const dataTicker = `${data.exchange}:${data.label}`;

            const listenerGUID = Object.keys(this._subscribers)
                .find(listenerGUID1 => this._subscribers[listenerGUID1].symbolInfo.ticker === dataTicker);

            const subscriber = this._subscribers[listenerGUID];

            if (subscriber) {
                this._logMessage(`${listenerGUID} lastBarTime: ${subscriber.lastBarTime}`);

                let bar = buildBar(data);
                const ts = +new Date(bar.time);
                const date = roundTimeByInterval(ts, this._subscriptionIntervalMs);
                if (intervalMap(interval) !== this._subscriptionIntervalMs) {
                    this._subscriptionIntervalMs = intervalMap(interval);
                    subscriber.lastBarTime = roundTimeByInterval(ts, this._subscriptionIntervalMs);
                }

                const listeners = subscriber.listeners;

                if (!subscriber.lastBar) {
                    subscriber.lastBar = {
                        bar: bar,
                        time: date,
                    };
                    subscriber.lastBarTime = date;
                    return;
                }

                listeners
                    .forEach(listener => {
                        if (bar.time - this._subscriptionIntervalMs < subscriber.lastBarTime) {
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
                            subscriber.lastBar = null;
                            listener({
                                bar: bar,
                                time: date,
                            });
                        }
                    });
            }
        });
};

ChartAPI.UDFCompatibleDatafeed.prototype.on = function (event, cb) {
    if (!this._callbacks.hasOwnProperty(event)) {
        this._callbacks[event] = [];
    }

    this._callbacks[event].push(cb);
    return this;
};

ChartAPI.UDFCompatibleDatafeed.prototype._fireEvent = function (event, argument) {
    this._logMessage(`event${event}`);
    if (this._callbacks.hasOwnProperty(event)) {
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
    if (this._enableLogging) {
        const now = new Date()
        if (typeof message != "object") {
            console.log(`${now.toLocaleTimeString()}.${now.getMilliseconds()}> ${message}`)
        } else {
            console.log(`${now.toLocaleTimeString()}.${now.getMilliseconds()} Object Below`)
            console.log(message)
        }
    }
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
            { value: '', name: 'All Exchanges', desc: '' },
        ],
        symbolsTypes: [
            { name: 'All types', value: '' },
            { name: 'Market', value: 'bitcoin' },
        ],
        supported_resolutions: ['1', '5', '15', '60', '360', 'D'],
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

// ================================================================================================================
// The functions set below is the implementation of JavaScript API.


// BEWARE: this function does not consider symbol's exchange
ChartAPI.UDFCompatibleDatafeed.prototype.resolveSymbol = function (symbolName, onSymbolResolvedCallback, onResolveErrorCallback) {
    const that = this;
    this._logMessage(`Resolve Symbol - ${symbolName}`);

    if (symbolName.indexOf(':') < 0) {
        this.resolveSymbol(getPreviousSymbol(), onSymbolResolvedCallback, onResolveErrorCallback);
        return;
    }

    if (!this._initializationFinished) {
        this.on('initialized', () => {
            that.resolveSymbol(symbolName, onSymbolResolvedCallback, onResolveErrorCallback);
        });
        return;
    }

    const splited = symbolName.split(':');

    const exchanges = AlphaPoint.exchanges.value;
    const instruments = AlphaPoint.instruments.value;

    const instrumentName = splited[1].replace(/\//,'');

    const exchange = exchanges.find(exchange => exchange.name === splited[0]);
    const instrument = instruments.find(instr => instr.Symbol === instrumentName);

    if (instrument && instrument) {
        const data = {
            exchange: {
                code: splited[0],
                id: exchange.id,
            },
            market: {
                code: splited[1],
                id: instrument.InstrumentId,
            },
            OMSId: instrument.OMSId,
            coinAPISymbol: `${exchange.name}_SPOT_${instrument.Product1Symbol}_${instrument.Product2Symbol}`,
        };

        setTimeout(() => {
            onSymbolResolvedCallback(getSymbol(data));
        }, 0);
    } else {
        this.resolveSymbol(getPreviousSymbol(), onSymbolResolvedCallback, onResolveErrorCallback);
    }
};

ChartAPI.UDFCompatibleDatafeed.prototype.getBars = function (symbolInfo, resolution, rangeStartDate, rangeEndDate, onDataCallback, onErrorCallback, firstDataRequest) {
    this._logMessage(`getBars ${symbolInfo.ticker}`);

    if (intervalMap(resolution) !== this._subscriptionIntervalMs) {
        AlphaPoint.logs.chartIntervalChanged.onNext(resolution);
    }

    this._rxHistorySubscribers // remove all stream listeners that not equal requested resolution
        .filter(subscriber => subscriber.resolution !== resolution)
        .forEach(subscriber => subscriber.listener.dispose());

    this._rxHistorySubscribers = this._rxHistorySubscribers // remove old resolution subscribers from cache
        .filter(subscriber => subscriber.resolution === resolution);

    const subscriberExists = this._rxHistorySubscribers // stream subscriber exists in cache
        .find(subscriber =>
            subscriber.resolution === resolution &&
            subscriber.exchangeId === symbolInfo.exchange_id &&
            subscriber.coinAPISymbol === symbolInfo.coinAPISymbol
        );

    if (!subscriberExists) {
        const listener = AlphaPoint.logs.historyDataResponse // create new listener for symbol and resolution
            .filter(response => response)
            .subscribe(response => {
                const { bars, exchangeId, symbol } = response;

                if (symbolInfo.exchange_id === exchangeId && symbolInfo.coinAPISymbol === symbol) {
                    return onDataCallback(bars, {
                        noData: !bars.length
                    });
                }
            });

        this._rxHistorySubscribers.push({ // push new subscriber into cache
            listener,
            resolution,
            exchangeId: symbolInfo.exchange_id,
            coinAPISymbol: symbolInfo.coinAPISymbol,
        });
    }

    AlphaPoint.logs.historyDataRequest.onNext({symbolInfo, resolution, rangeStartDate, rangeEndDate, firstDataRequest}); // make bars request
};


ChartAPI.UDFCompatibleDatafeed.prototype.subscribeBars = function (symbolInfo, resolution, onRealtimeCallback, listenerGUID) {
    this._logMessage(`subscribeBars ${listenerGUID}`);

    if (!this._subscribers.hasOwnProperty(listenerGUID)) {
        this._subscribers[listenerGUID] = {
            symbolInfo,
            resolution,
            lastBarTime: NaN,
            lastBar: null,
            listeners: []
        };
    }

    this._subscribers[listenerGUID].listeners.push(onRealtimeCallback);
};

ChartAPI.UDFCompatibleDatafeed.prototype.unsubscribeBars = function (listenerGUID) {
    this._logMessage(`unsubscribeBars ${listenerGUID}`);

    const symbolInfo = this._subscribers[listenerGUID].symbolInfo || {};

    const exchangeId = symbolInfo.exchange_id;
    const instrumentId = symbolInfo.market_id;

    const sessionExchangesId = localStorage.getItem('SessionExchangesId');
    const selectedExchangesId = sessionExchangesId ? JSON.parse(sessionExchangesId) : AlphaPoint.config.defaultExchangesId;

    const isExchangeSelected = selectedExchangesId.includes(exchangeId);

    if (isExchangeSelected) {
        AlphaPoint.chartRemovedSymbol.onNext({exchangeId, instrumentId});
    }

    delete this._subscribers[listenerGUID];
};

window.ChartAPI = ChartAPI;
// export default ChartAPI;
