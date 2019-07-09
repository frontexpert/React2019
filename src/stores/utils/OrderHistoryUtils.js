import {
    CREATED_ORDER_STATUS_LABEL, FILLED_ORDER_STATUS_LABEL, LIMIT_ORDER_TYPE,
    PARTIALLY_FILLED_ORDER_STATUS_LABEL,
    UNKNOWN_ORDER_STATUS_LABEL
} from "../../config/constants";
import {calculateFee, getTimeFormatted} from "./storeUtils";

export const makeOrderHistoryRequest = (ClientId, ProgramId, SentTime, Skip, Limit, {SubmitOrderHistoryRequest}) => {
    SubmitOrderHistoryRequest({ClientId, ProgramId, SentTime, Skip, Limit});
};

export const updateOrderHistoryError = (e) => console.log(e);

export const registerForOrderHistoryData = (OrderHistoryReply, ClientId, next, error) => {
    return OrderHistoryReply({ClientId}).subscribe({next, error})
};

export const getStatus = ({Message = "", Result}) => {
    if (Message === "") {
        return UNKNOWN_ORDER_STATUS_LABEL;
    } else if (Message === "Filled" || Result === 0) {
        return FILLED_ORDER_STATUS_LABEL;
    } else if (Message === "FilledPartially") {
        return PARTIALLY_FILLED_ORDER_STATUS_LABEL;
    } else if (Message === "Created") {
        return CREATED_ORDER_STATUS_LABEL // Not sure about this
    }
    return UNKNOWN_ORDER_STATUS_LABEL;
};

export const mapOrdersForDisplay = (Orders) => Orders.map((order = {}) => {
        return {
            exchange: order.Exchange,
            product: order.Symbol,
            size: order.Amount,
            price: order.Price,
            fee: calculateFee(order.Amount, order.Price, 8),
            time: `${getTimeFormatted(order.SentTime)} ago`,
            filled: order.AmountFilled,
            orderStatus: getStatus({Message: order.Message, Result: order.Result}),
            side: order.Side,
            type: LIMIT_ORDER_TYPE, // Todo: Hard coding for now
            average: order.AmountFilled,
            ticketId: order.TicketId,
        };
    }
);

export const formatOrderHistoryDataForDisplay = ({Tickets}) => {
    return Tickets.reduce((accumulator, {Orders = []}) => accumulator.concat(mapOrdersForDisplay(Orders)), [])
};