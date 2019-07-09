import SatoriDataContainer from '../SatoriData/index';
import {OrderCreated, OrderEvent} from 'bct-ui-satori';
import {compose, mapProps, withState, withHandlers} from 'recompose';
import uniq from "lodash.uniq";
import {
    ClientId, /* TEMPORARILY HARDCODE UNTIL DATA CHANNELS ARE SETUP */ ORDER_CREATED_TICKET_ID_MAPPED,
    FILLED_ORDER_STATUS_LABEL, CANCELED_ORDER_STATUS_LABEL, LIMIT_ORDER_TYPE
} from '../../config/constants';
import {
    mapToProps,
    throttleMs,
    identity,
    getStateReducer,
    mapNewOrderCreatedData,
    mapNewOrderEventData,
    orderCreatedStateReducerMap,
    orderEventStateReducerMap,
    getFormattedSymbol,
    getTicketsIdWithOnlyOpenEvents,
    getFirstOrderInOrderCreatedListByTicketId,
    getExchangeFormatted,
    calculateOrderSizeFromOrderCreatedList,
    calculateOrderPriceFromOrderCreatedList,
    calculateOrderPriceFromOrderEventList,
    calculateFilledFromOrderEventList,
    getSentTimeFormatted,
    getHardcodedFormattedFeeCoin,
    calculateFeeForDisplay,
    getTicketIdFromOrderEventOrderId,
    getSideFromOrderCreated,
    calculateAverageFromOrderEventList
} from './clientOrderDataUtil';

export const withOrderCreatedData = ({propName = '', map = identity}) => {
    return SatoriDataContainer({
        initial: {},
        observable: OrderCreated({ClientId, throttleMs}),
        nextStateReducer: getStateReducer(orderCreatedStateReducerMap, mapNewOrderCreatedData),
        mapToProps: mapToProps(propName, map),
    });
};

export const withOrderEventData = ({propName = '', map = identity}) => {
    return SatoriDataContainer({
        initial: {},
        observable: OrderEvent({ClientId, throttleMs}),
        nextStateReducer: getStateReducer(orderEventStateReducerMap, mapNewOrderEventData),
        mapToProps: mapToProps(propName, map),
    });
};

export const withHandleCancelledTicketIds = compose(
    withState('canceledTicketIds', 'setCanceledTicketIds', []),
    withHandlers({
        onCancelFactory: props => (ticketId) => event => {
            event.preventDefault();
            const cancelTicketIds = [ticketId, ...props.canceledTicketIds];
            props.setCanceledTicketIds(cancelTicketIds)
        },
    })
);

export const withOpenOrders = mapProps((prop) => {
    const {ordersCreated, orderEvents, canceledTicketIds, onCancelFactory, ...rest} = prop;
    const orderCreatedList = [];
    const orderEventList = [];

    for (const orderCreated in ordersCreated) {
        orderCreatedList.push(ordersCreated[orderCreated]);
    }

    for (const orderEvent in orderEvents) {
        orderEventList.push(orderEvents[orderEvent]);
    }

    const ticketIdsWithOpenEvents = getTicketsIdWithOnlyOpenEvents(orderEventList, canceledTicketIds);

    // For each ticket, if a ticket is open, create an open order object
    const openOrders = ticketIdsWithOpenEvents.map((ticketId) => {
        const firstOrderCreated = getFirstOrderInOrderCreatedListByTicketId(ticketId, orderCreatedList);
        const size = calculateOrderSizeFromOrderCreatedList(ticketId, orderCreatedList);
        const product = getFormattedSymbol(firstOrderCreated);
        const price = calculateOrderPriceFromOrderCreatedList(ticketId, orderCreatedList);
        const feeCoin = getHardcodedFormattedFeeCoin(firstOrderCreated);
        const fee = calculateFeeForDisplay(price, size, feeCoin);
        const time = getSentTimeFormatted(firstOrderCreated);
        const exchange = getExchangeFormatted(firstOrderCreated);
        return {
            size,
            exchange,
            fee,
            price,
            time,
            product,
            ticketId,
        };
    });

    return {
        openOrders,
        onCancelFactory,
        ...rest,
    }
});

export const withClientOrderData = compose(
    withHandleCancelledTicketIds,
    withOrderCreatedData({propName: 'ordersCreated'}),
    withOrderEventData({propName: 'orderEvents'}),
    withOpenOrders,
);