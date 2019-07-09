import {observable, action, computed} from "mobx"
import {ClientId, ProgramId} from "../config/constants";
import {OrderHistoryReply, OrderHistoryRequest} from 'bct-ui-satori'
import partial from 'lodash.partial';
import {initRequest} from "./utils/storeUtils";
import {
    formatOrderHistoryDataForDisplay,
    makeOrderHistoryRequest,
    registerForOrderHistoryData,
    updateOrderHistoryError
} from "./utils/OrderHistoryUtils";

const PageSize = 200;
const Skip = 0;
const SentTime = "2018-07-29T21:54:17.9642263Z";
const throttleMs = 200;

class OrderHistory {
    @observable OrderHistoryData = [];

    constructor(OrderHistoryReply, OrderHistoryRequest) {

        registerForOrderHistoryData(
            OrderHistoryReply,
            ClientId,
            this.updateOrderHistory,
            updateOrderHistoryError
        );

        setTimeout(
            () => initRequest(
                OrderHistoryRequest,
                throttleMs,
                partial(makeOrderHistoryRequest, ClientId, ProgramId, SentTime, Skip, PageSize)
            ),
            500
        );
    }


    @action.bound
    updateOrderHistory(orderHistoryData = {}) {
        const {
            body: {
                messages: [
                    {
                        Tickets = [],
                    } = {}
                ] = [],
            } = {},
        } = orderHistoryData;

        if (Tickets.length === 0) {
            return;
        }

        this.OrderHistoryData = Tickets;
    }

    @computed.struct get orderHistoryData() {
        return formatOrderHistoryDataForDisplay({Tickets: this.OrderHistoryData});
    }
}

export default () => {
    return new OrderHistory(OrderHistoryReply, OrderHistoryRequest);
};