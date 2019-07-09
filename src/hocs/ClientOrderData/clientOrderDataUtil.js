import {
    ORDER_CREATED_AMOUNT_MAPPED,
    ORDER_CREATED_ORDER_ID,
    ORDER_CREATED_TICKET_ID_MAPPED,
    ORDER_EVENT_PARTIAL_FILL_RESULT,
    ORDER_EVENT_ORDER_ID_MAPPED,
    ORDER_CREATED_EXCHANGE_MAPPED,
    ORDER_EVENT_SIZE_MAPPED,
    ORDER_EVENT_PRICE_MAPPED,
    ORDER_CREATED_SYMBOL_MAPPED,
    ORDER_CREATED_PRICE_MAPPED,
    ORDER_CREATED_SENT_TIME_MAPPED,
    ORDER_EVENT_ORDER_ID,
    ORDER_EVENT_RESULT_MAPPED,
    ORDER_CREATED_EXCHANGE,
    ORDER_CREATED_AMOUNT,
    ORDER_CREATED_TICKET_ID,
    ORDER_CREATED_SYMBOL,
    ORDER_CREATED_PRICE,
    ORDER_CREATED_SENT_TIME,
    ORDER_EVENT_EXCHANGE,
    ORDER_EVENT_FILL_SIZE,
    ORDER_EVENT_RESULT,
    ORDER_EVENT_FILL_PRICE,
    ORDER_EVENT_SENT_TIME,
    ORDER_EVENT_MESSAGE,
    ORDER_CREATED_SIDE,
    ORDER_CREATED_SIDE_MAPPED,
    ORDER_EVENT_FILL_PRICE_MAPPED
} from "../../config/constants";
import uniq from "lodash.uniq";
import {roundToFixedNum} from 'Utils';
import {calculateFee, formatNumForDisplay, getTimeFormatted} from "../../stores/utils/storeUtils";

export const mapToProps = (propName, map) => channelData => ({
    [propName]: map(channelData),
});

export const identity = x => x;
export const throttleMs = 0;
export const getFormattedSymbol = (orderCreated) => orderCreated[ORDER_CREATED_SYMBOL_MAPPED].replace("-", "/");
export const formatNumForDisplayAsDollars = (numberString) => numberString.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');  // 14,445.67
export const mapNewOrderCreatedData = (
    {
        [ORDER_CREATED_AMOUNT]: size,
        [ORDER_CREATED_EXCHANGE]: exchange,
        [ORDER_CREATED_ORDER_ID]: orderId,
        [ORDER_CREATED_PRICE]: price,
        [ORDER_CREATED_SENT_TIME]: time,
        [ORDER_CREATED_SYMBOL]: product,
        [ORDER_CREATED_TICKET_ID]: ticketId,
        [ORDER_CREATED_SIDE]: side,
    }) => {
    return {
        size: formatNumForDisplay(size),
        exchange: exchange.toUpperCase(),
        orderId,
        price: formatNumForDisplay(Number(price)),
        time,
        product,
        ticketId,
        side,
    }
};

export const mapNewOrderEventData = (
    {
        [ORDER_EVENT_FILL_SIZE]: size,
        [ORDER_EVENT_FILL_PRICE]: fillPrice,
        [ORDER_EVENT_EXCHANGE]: exchange,
        [ORDER_EVENT_ORDER_ID]: orderId,
        [ORDER_EVENT_FILL_PRICE]: price,
        [ORDER_EVENT_SENT_TIME]: time,
        [ORDER_EVENT_MESSAGE]: message,
        [ORDER_EVENT_RESULT]: result,
    }) => {
    return {
        size: formatNumForDisplay(Number(size)),
        fillPrice,
        exchange,
        orderId,
        price: formatNumForDisplay(Number(price)),
        time,
        message,
        result,
    };
};

export const orderEventStateReducerMap = (nextOrderEventsDataUnmapped, prevOrderEventsState) => stateReducerMap(
    nextOrderEventsDataUnmapped, prevOrderEventsState, ORDER_EVENT_ORDER_ID, mapNewOrderEventData
);

export const orderCreatedStateReducerMap = (nextOrdersCreatedDataUnmapped, prevOrdersCreatedState) => stateReducerMap(
    nextOrdersCreatedDataUnmapped, prevOrdersCreatedState, ORDER_CREATED_ORDER_ID, mapNewOrderCreatedData
);

export const stateReducerMap = (nextDataUnmapped, previousState, KEY, dataMap) => {
    return nextDataUnmapped.reduce(
        (accumulator, data) => {
            accumulator[data[KEY]] = dataMap(data);
            return accumulator;
        }
        , previousState
    );
};

export const getStateReducer = (stateReducer, newDataMap) => {
    return (
        previousData = {},
        {
            body: {
                messages: newUnmappedData = [],
            } = {},
        } = {}
    ) => {
        return stateReducer(newUnmappedData, previousData, newDataMap);
    }
};

export const getTicketIdFromOrderEventOrderId = (orderEvent) => {
    const orderIdValue = orderEvent[ORDER_EVENT_ORDER_ID_MAPPED]; // ie.  "bctui.hedgehog.gz4qs-101.8"
    return orderIdValue.substring(0, orderIdValue.lastIndexOf('.'));
};

export const calculateFeeForDisplay = (price, size, feeCoin) => `${calculateFee(size, price, 6)} ${feeCoin}`;
export const getHardcodedFormattedFeeCoin = (orderCreated) =>
    orderCreated[ORDER_CREATED_SYMBOL_MAPPED].substring(0, orderCreated[ORDER_CREATED_SYMBOL_MAPPED].lastIndexOf('-'));

export const calculateFilledFromOrderEventList = (ticketId, orderEventList) =>
    formatNumForDisplay(orderEventList
        .filter((orderEvent) => ticketId === getTicketIdFromOrderEventOrderId(orderEvent))
        .map((orderEvent) => orderEvent[ORDER_EVENT_SIZE_MAPPED])
        .reduce((accumulator, currentValue) => Number(accumulator) + Number(currentValue), 0));

export const calculateOrderPriceFromOrderEventList = (ticketId, orderEventList) =>
    formatNumForDisplay(orderEventList
        .filter((orderEvent) => ticketId === getTicketIdFromOrderEventOrderId(orderEvent))
        .map((orderEvent) => orderEvent[ORDER_EVENT_PRICE_MAPPED])
        .reduce((accumulator, currentValue) => Number(accumulator) + Number(currentValue), 0));

export const calculateAverageFromOrderEventList = (ticketId, orderEventList) => {
    const fillPricesForTickedId = orderEventList
        .filter((orderEvent) => ticketId === getTicketIdFromOrderEventOrderId(orderEvent))
        .map((orderEvent) => orderEvent[ORDER_EVENT_FILL_PRICE_MAPPED]);

    const sum = fillPricesForTickedId
        .reduce((accumulator, currentValue) => Number(accumulator) + Number(currentValue), 0);
    return (sum/fillPricesForTickedId.length);
};

export const calculateOrderPriceFromOrderCreatedList = (ticketId, orderCreatedList) =>
    formatNumForDisplay(orderCreatedList
        .filter((ordersCreated) => ordersCreated[ORDER_CREATED_TICKET_ID_MAPPED] === ticketId)
        .map((ordersCreated) => ordersCreated[ORDER_CREATED_PRICE_MAPPED])
        .reduce((accumulator, currentValue) => Number(accumulator) + Number(currentValue), 0));

export const calculateOrderSizeFromOrderCreatedList = (ticketId, orderCreatedList) =>
    formatNumForDisplay(orderCreatedList
        .filter((ordersCreated) => ordersCreated[ORDER_CREATED_TICKET_ID_MAPPED] === ticketId)
        .map((ordersCreated) => ordersCreated[ORDER_CREATED_AMOUNT_MAPPED])
        .reduce((accumulator, currentValue) => Number(accumulator) + Number(currentValue), 0));

export const getExchangeFormatted = (ordersCreated) => {
    return ordersCreated[ORDER_CREATED_EXCHANGE_MAPPED].toUpperCase();
};

// Pretty random but temporary: there exists information that is general to all OrderCreated messages.
// so we leverage that fact to access [Symbol, SentTime (which is again is arbitrarily picked), Result, etc.] for now.
export const getFirstOrderInOrderCreatedListByTicketId = (ticketId, orderCreatedList) =>
    orderCreatedList.find((ordersCreated) => ordersCreated[ORDER_CREATED_TICKET_ID_MAPPED] === ticketId);

export const getTicketsIdWithOpenEvents = (orderEventList) => uniq(
    orderEventList
        .filter((orderEvent) => orderEvent[ORDER_EVENT_RESULT_MAPPED] === ORDER_EVENT_PARTIAL_FILL_RESULT)
        .map(getTicketIdFromOrderEventOrderId)
);

export const getTicketsIdWithOnlyOpenEvents = (orderEventList, canceledTicketIds = []) => {
    return getTicketsIdWithOpenEvents(orderEventList)
        .filter((ticketId) => !canceledTicketIds.includes(ticketId));
};

// Use sent time of first order created received for now
export const getSentTimeFormatted = (orderBase) => getTimeFormatted(orderBase[ORDER_CREATED_SENT_TIME_MAPPED]);

// Use sent time of first order created received for now
export const getSideFromOrderCreated = (ordersCreated) => {
    return ordersCreated[ORDER_CREATED_SIDE_MAPPED].toUpperCase();
};
