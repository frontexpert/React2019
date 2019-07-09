import { action, observable, reaction } from 'mobx';
import isEqual from 'lodash/isEqual';
import { PortfolioDataRequest, PortfolioDataResponse } from '../lib/bct-ws';

const throttleMs = 100;

class PortfolioDataStore {
    @observable portfolioData = [];
    @observable lastPortfolioValue = 0;
    @observable lastPortfolioValueChange = 0;
    @observable portfolioGraphRange = 0;
    @observable isActiveState = true;
    @observable portfolioView = '1 year';
    @observable oneDayProfit = 0;

    portfolioData$ = [];
    portfolioDataAll = [];
    lastPortfolioValue$ = 0;
    lastPortfolioValueChange$ = null;
    portfolioDataSub = null;
    defaultPeriod = 'year';
    __subscriptionInited = false;
    isArbitrageMode = true;
    arbitrageTime = 0;
    intTick = null;
    clearTick = null;
    activeTick = null;

    fiatPrice = 1;
    isDefaultCrypto = false;
    defaultCryptoPrice = 0;

    incomingDataStack = [];
    bufferData = [];

    constructor(settingsStore) {
        this.fiatPrice = settingsStore.price;
        this.isDefaultCrypto = settingsStore.isDefaultCrypto;
        this.defaultCryptoPrice = settingsStore.defaultCryptoPrice;
        this.isArbitrageMode = settingsStore.isArbitrageMode;
        this.arbitrageTime = parseInt(localStorage.getItem('arbitrageTime'));

        reaction(
            () => ({
                price: settingsStore.price,
                isDefaultCrypto: settingsStore.isDefaultCrypto,
                defaultCryptoPrice: settingsStore.defaultCryptoPrice,
            }),
            (settings) => {
                this.fiatPrice = settings.price;
                this.isDefaultCrypto = settings.isDefaultCrypto;
                this.defaultCryptoPrice = settings.defaultCryptoPrice;

                this.portfolioData = this.getFiatPortfolioData(this.portfolioData$);

                this.lastPortfolioValue = this.getFiatPortfolioValue(this.lastPortfolioValue$);
                this.lastPortfolioValueChange = this.getFiatPortfolioValue(this.lastPortfolioValueChange$);
            }
        );

        reaction(
            () => ({
                isArbitrageMode: settingsStore.isArbitrageMode,
            }),
            (settings) => {
                this.isArbitrageMode = settings.isArbitrageMode;
                if (this.isArbitrageMode) {
                    this.arbitrageTime = new Date().getTime();
                    if (this.portfolioDataAll.length > 0) {
                        this.lastPortfolioValueBeforeArbitrage = this.portfolioDataAll[this.portfolioDataAll.length - 1][1];
                    } else {
                        this.lastPortfolioValueBeforeArbitrage = 0;
                    }
                    localStorage.setItem('arbitrageTime', this.arbitrageTime.toString());
                    this.pushToPortfolioData(this.portfolioDataAll, true);
                } else {
                    this.pushToPortfolioData(this.portfolioDataAll, true);
                }
            }
        );

        this.initPortfolioDataStore();
    }

    initPortfolioDataStore() {
        // payload: { Period: 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year'  }
        PortfolioDataRequest({
            Period: this.defaultPeriod,
        });

        if (localStorage.getItem('authToken')) {
            this.portfolioDataSub = PortfolioDataResponse({
                throttleMs,
            });
            if (!this.__subscriptionInited) {
                this.portfolioDataSub.subscribe({ next: this.handleIncomingPortfolioData.bind(this) });
                this.__subscriptionInited = true;
            }
            this.restartIntTick();
        }
    }

    restartIntTick() {
        clearInterval(this.intTick);
        this.intTick = setInterval(() => {
            this.requestPortfolioDataByDefault();
        }, 60000);
    }

    handleIncomingPortfolioData(data) {
        const size = data.length;
        let totalAccountBalance;
        try {
            totalAccountBalance = data[size - 1][1] || 0;
            if (totalAccountBalance > 0) {
                this.pushToPortfolioData(data, false);
            }
        } catch(e) {
            totalAccountBalance = 0;
        }

        if (this.lastPortfolioValueChange$ === null) {
            this.lastPortfolioValue$ = totalAccountBalance;
            if (size > 1) this.lastPortfolioValueChange$ = totalAccountBalance - data[size - 2][1];
        } else if (this.lastPortfolioValue$ !== totalAccountBalance) {
            this.lastPortfolioValueChange$ = totalAccountBalance - this.lastPortfolioValue$;
            this.lastPortfolioValue$ = totalAccountBalance;
            if (this.lastPortfolioValueChange$ === this.lastPortfolioValue$) {
                this.lastPortfolioValueChange$ = 0;
            }
        }
        this.lastPortfolioValue = this.getFiatPortfolioValue(this.lastPortfolioValue$);
        this.lastPortfolioValueChange = this.getFiatPortfolioValue(this.lastPortfolioValueChange$);
    }

    pushToPortfolioData(data, forceUpdate) {
        if (!forceUpdate && this.portfolioDataAll.length > 1 && data.length > 0) {
            const lastPoint = this.portfolioDataAll[this.portfolioDataAll.length - 1];
            if (isEqual(lastPoint, data[data.length - 1])) return;
        }
        if (forceUpdate || !isEqual(this.portfolioDataAll, data)) {
            this.portfolioDataAll = data;
            if (this.isArbitrageMode) {
                this.portfolioData$ = this.getArbPortfolioData();
            } else {
                this.portfolioData$ = this.getSmartGraphData(this.portfolioDataAll, 100);
            }

            this.portfolioData = this.getFiatPortfolioData(this.portfolioData$);

            if (this.portfolioData.length > 1) {
                const size = this.portfolioData.length;
                const arbitrageRange = this.portfolioData[size - 1][0] - this.portfolioData[0][0];
                const arbitrageProfit = this.portfolioData[size - 1][1] - this.portfolioData[0][1];
                const oneDayRange = 24 * 60 * 60 * 1000;

                if (arbitrageRange > 5 && arbitrageRange < oneDayRange && arbitrageProfit > 0) {
                    this.oneDayProfit = arbitrageProfit *  oneDayRange / arbitrageRange;
                } else {
                    this.oneDayProfit = 0;
                }
            } else {
                this.oneDayProfit = 0;
            }
        }
    }

    getArbPortfolioData() {
        try {
            let portfolioData$ = [];
            let portfolioDataForSmartGraph = [];

            portfolioData$ = this.portfolioDataAll.filter(item => item[0] >= this.arbitrageTime);
            if (portfolioData$.length === 0 && this.lastPortfolioValueBeforeArbitrage > 0) {
                const currentTime = new Date().getTime();
                portfolioData$ = [
                    [
                        currentTime - 10000,
                        this.lastPortfolioValueBeforeArbitrage
                    ], [
                        currentTime,
                        this.lastPortfolioValueBeforeArbitrage
                    ]
                ];
                portfolioDataForSmartGraph = this.getSmartGraphData(portfolioData$, 100);
            } else if (portfolioData$.length > 0) {
                if (this.lastPortfolioValueBeforeArbitrage > 0) {
                    portfolioData$.unshift([
                        portfolioData$[0][0] - 10000,
                        this.lastPortfolioValueBeforeArbitrage
                    ]);
                }
                portfolioDataForSmartGraph = this.getSmartGraphData(portfolioData$, 100);
            }

            return portfolioDataForSmartGraph;
        } catch(e) {
            // console.log(e);
            return [];
        }
    }

    getSmartGraphData = (data, levels) => {
        let smartGraphData = [];
        if (data.length > 0) {
            let plotValue = data[0][1];
            let time = data[0][0];
            const step = (data[data.length - 1][0] - data[0][0]) / levels;

            for (let i = 0; i < data.length; i++) {
                if (data[i][0] > time) {
                    if (data[i][0] - time > step) {
                        while (time < data[i][0]) {
                            smartGraphData.push([time, plotValue]);
                            time += step;
                        }
                    } else {
                        smartGraphData.push([time, plotValue]);
                        time += step;
                    }
                }
                plotValue = data[i][1];
            }
            smartGraphData.push(data[data.length - 1]);
        }

        return smartGraphData;
    }

    getFiatPortfolioValue = (portfolioValue) => {
        if (!this.isDefaultCrypto) {
            return portfolioValue * this.fiatPrice;
        }
        return this.defaultCryptoPrice !== 0 ? portfolioValue / this.defaultCryptoPrice : 0;
    }

    getFiatPortfolioData = (usdPortfolioData) => {
        const fiatPortfolioData = usdPortfolioData.map(
            ([time, portfolioValue]) => {
                const fiatPortfolioValue = this.getFiatPortfolioValue(portfolioValue);
                return [
                    time,
                    fiatPortfolioValue
                ];
            }
        );

        return fiatPortfolioData;
    }

    @action.bound requestPortfolioData(period) {
        PortfolioDataRequest({
            Period: period,
        });
    }

    @action.bound requestPortfolioDataByDefault() {
        PortfolioDataRequest({
            Period: this.defaultPeriod,
        });

        if (!this.__subscriptionInited) {
            this.portfolioDataSub = PortfolioDataResponse({
                throttleMs,
            });
            this.portfolioDataSub.subscribe({ next: this.handleIncomingPortfolioData.bind(this) });
            this.__subscriptionInited = true;
        }
    }

    @action.bound resetPortfolioData() {
        this.portfolioData = [];
        this.portfolioData$ = [];
        this.portfolioDataAll = [];
        this.lastPortfolioValueChange = null;
        this.lastPortfolioValueChange$ = null;
        this.lastPortfolioValue = 0;
        this.lastPortfolioValue$ = 0;
        this.oneDayProfit = 0;
    }

    // @action.bound setPortfolioGraphRange(idx) {
    //     this.portfolioGraphRange = idx;
    // }

    @action.bound setActiveState(mode) {
        this.isActiveState = mode;
        // clearTimeout(this.activeTick);
        // if (mode) {
        //     this.activeTick = setTimeout(() => {
        //         this.isActiveState = false;
        //     }, 30000);
        // }
    }
}

export default (settingsStore) => new PortfolioDataStore(settingsStore);
