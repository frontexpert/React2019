import {
    observable, action, computed, reaction
} from 'mobx';
import isEqual from 'lodash/isEqual';
import moment from 'moment';
import { ClientId, OrderHistoryStoreLabels } from '../config/constants';
import { OrderHistoryReply, OrderHistoryRequest } from '../lib/bct-ws';
import {
    formatOrderHistoryDataForDisplay
} from './utils/OrderHistoryUtils';
import { customDigitFormat } from '../utils';

const throttleMs = 200;

class OrderHistory {
    @observable OrderHistoryData = [];
    @observable PortfolioGraphData = [];
    @observable lastPortfolioValue = 0;
    @observable TargetTicketId = '';
    @observable downTimerCount = 0;
    @observable maxDownTimerCount = 0;

    orderHistoryReply$ = null;
    __subscriptionInited = false;
    PortfolioGraphData$ = []

    fiatPrice = 1;
    isDefaultCrypto = false;
    defaultCryptoPrice = 0;

    constructor(instrumentStore, settingsStore) {
        this.fiatPrice = settingsStore.price;
        this.isDefaultCrypto = settingsStore.isDefaultCrypto;
        this.defaultCryptoPrice = settingsStore.defaultCryptoPrice;
        if (localStorage.getItem('authToken')) {
            this.orderHistoryReply$ = OrderHistoryReply({ throttleMs });
            if (!this.__subscriptionInited) {
                this.orderHistoryReply$.subscribe({ next: this.handleIncomingOrderHistory.bind(this) });
                this.__subscriptionInited = true;
            }
        }

        reaction(
            () => (instrumentStore.Bases),
            (Bases) => {
                const cryptoArray = [];
                for (let i = 0; i < Bases.length; i++) {
                    cryptoArray.push(Bases[i].symbol);
                }

                // Remove USDT and BTC from crypto array
                let index = cryptoArray.findIndex(a => a === 'USDT');
                if (index > -1) {
                    cryptoArray.splice(index, 1);
                }
                index = cryptoArray.findIndex(a => a === 'BTC');
                if (index > -1) {
                    cryptoArray.splice(index, 1);
                }

                // Append USDT and BTC to the start of crypto array
                cryptoArray.splice(0, 0, 'USDT', 'BTC');

                if (!isEqual(cryptoArray, this.cryptoArray) && cryptoArray.length > 0) {
                    this.Bases = cryptoArray;
                }
            }
        );

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
                this.PortfolioGraphData = this.getFiatPortfolioData(this.PortfolioGraphData$);
                this.updateOrderHistoryByFiat();
            }
        );
    }

    handleIncomingOrderHistory(orderHistoryData = {}) {
        const {
            body: {
                messages: [
                    {
                        Tickets = [],
                    } = {}
                ] = [],
            } = {},
        } = orderHistoryData;
        const conversionRate = this.isDefaultCrypto ? 1 : this.fiatPrice;
        this.OrderHistoryData = formatOrderHistoryDataForDisplay(this.Bases, Tickets, conversionRate);
        this.PortfolioGraphData$ = this.OrderHistoryData
            .slice()
            .reverse()
            .filter(item => item.sourceTotal && !Number.isNaN(item.sourceTotal))
            .map((item) => ({ x: moment(item.timeUnFormatted).valueOf(), y: item.sourceTotal }));
        this.PortfolioGraphData = this.getFiatPortfolioData(this.PortfolioGraphData$);
    }

    getFiatPortfolioValue = (portfolioValue) => {
        if (!this.isDefaultCrypto) {
            return portfolioValue * this.fiatPrice;
        }
        return this.defaultCryptoPrice !== 0 ? portfolioValue / this.defaultCryptoPrice : 0;
    };

    getFiatPortfolioData = (usdPortfolioData) => {
        const fiatPortfolioData = usdPortfolioData.map(
            ({ x, y }) => {
                const fiatPortfolioValue = this.getFiatPortfolioValue(y);
                return {
                    x,
                    y: fiatPortfolioValue,
                };
            }
        );

        if (fiatPortfolioData.length) {
            this.lastPortfolioValue = fiatPortfolioData[fiatPortfolioData.length - 1].y;
        }

        return fiatPortfolioData;
    };

    @action.bound
    setTargetTradeHistoryTicket(targetTicketId) {
        this.TargetTicketId = targetTicketId;
    }

    requestOrderHistory() {
        if (!this.__subscriptionInited) {
            this.orderHistoryReply$ = OrderHistoryReply({ throttleMs });
            this.orderHistoryReply$.subscribe({ next: this.handleIncomingOrderHistory.bind(this) });
            this.__subscriptionInited = true;
        }
        OrderHistoryRequest(localStorage.getItem('authClientId') || ClientId);
    }

    updateOrderHistoryByFiat() {
        const conversionRate = this.isDefaultCrypto ? 1 : this.fiatPrice;
        this.OrderHistoryData = this.OrderHistoryData.map((source) => {
            source.total = customDigitFormat(source.sourceTotal * conversionRate, 9);
            return source;
        });
    }

    @action.bound resetOrderHistory() {
        this.OrderHistoryData = [];
    }

    @action.bound setDownTimerCount(tm) {
        this.downTimerCount = tm;
    }

    @action.bound setMaxDownTimerCount(tm) {
        this.maxDownTimerCount = tm;
    }
}

export default (instrumentStore, settingsStore) => {
    return new OrderHistory(instrumentStore, settingsStore);
};
