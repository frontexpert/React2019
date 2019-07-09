import {
    observable, action, computed, reaction
} from 'mobx';
import isEqual from 'lodash/isEqual';
import { ClientId, OrderHistoryStoreLabels } from '../config/constants';
import { OrderHistoryReply, OrderHistoryRequest } from '../lib/bct-ws';
import {
    formatOrderHistoryDataForDisplay
} from './utils/OrderHistoryUtils';
import { sortObjectArray } from '../utils';

const throttleMs = 200;

class OrderHistory {
    @observable OrderHistoryData = [];
    @observable TargetTicketId = '';

    orderHistoryReply$ = null;
    __subscriptionInited = false;

    constructor(instrumentStore) {
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
        this.OrderHistoryData = formatOrderHistoryDataForDisplay(this.Bases, Tickets);
    }

    @action.bound
    setTargetTradeHistoryTicket(targetTicketId) {
        this.TargetTicketId = targetTicketId;
    }

    @computed.struct get orderHistoryData() {
        return sortObjectArray('timeUnFormatted', this.OrderHistoryData
            .filter(Order => {
                return Order[OrderHistoryStoreLabels.Ticket.Status.Label] === OrderHistoryStoreLabels.Ticket.Status.Values.Filled
                    || Order[OrderHistoryStoreLabels.Ticket.Status.Label] === OrderHistoryStoreLabels.Ticket.Status.Values.Cancelled
                    || Order[OrderHistoryStoreLabels.Ticket.Status.Label] === OrderHistoryStoreLabels.Ticket.Status.Values.Rejected;
            }));
    }

    requestOrderHistory() {
        if (!this.__subscriptionInited) {
            this.orderHistoryReply$ = OrderHistoryReply({ throttleMs });
            this.orderHistoryReply$.subscribe({ next: this.handleIncomingOrderHistory.bind(this) });
            this.__subscriptionInited = true;
        }
        OrderHistoryRequest(localStorage.getItem('authClientId') || ClientId);
    }

    @action.bound resetOrderHistory() {
        this.OrderHistoryData = [];
    }
}

export default (instrumentStore) => {
    return new OrderHistory(instrumentStore);
};
