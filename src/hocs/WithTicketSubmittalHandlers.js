import {withStateHandlers} from "recompose";
import {BUY_SIDE, SELL_SIDE, MARKET_ORDER_TYPE} from '../config/constants';

let orderCount = 100;

const getMarketOrderPrice = (isBuy, orderBookStore) => isBuy ? orderBookStore.lowestAskPrice : orderBookStore.highestBidPrice;

export const withTicketSubmittalHandlers = withStateHandlers({
    orders: {},
    ticketIds: [],
    amount: '', //should be empty string so it clears out when end-user clicks into input; placeholder used instead to show 0 
    price: '', 
    total: '',
    priceMistake: false,
    amountMistake: false,
    orderButtonDisabled: true,
}, {
    handlePriceChange: ({amount: limitOrderAmount}, {type, amount: marketOrderAmount, mapStateChangeForPriceOrAmount}) => (event) => {
        const amount = type === MARKET_ORDER_TYPE ? marketOrderAmount : limitOrderAmount;
        return mapStateChangeForPriceOrAmount(event.target.value, amount);
    },

    handleAmountChange: ({price: limitOrderPrice}, {type, isBuy, orderBookStore, mapStateChangeForPriceOrAmount}) => (event) => {
        const price = type === MARKET_ORDER_TYPE ? getMarketOrderPrice(isBuy, orderBookStore) : limitOrderPrice;
        // Mapping all price from this point forward to state
        return mapStateChangeForPriceOrAmount(price, event.target.value);
    },

    handleOrder: (state, props) => {
        return (event) => {
            const {price, amount, total, ticketIds, orders} = state;
            const {type, submitOrder, ProgramId, ClientId, Symbols, Route, isBuy, orderBookStore} = props;

            // Don't re-render
            if (type !== MARKET_ORDER_TYPE && total === 0) {
                console.log("Invalid order amount: No order submitted");
                return undefined;
            }

            const ticketId = `${ProgramId}-${++orderCount}`;
            const payload = {
                TicketId: ticketId,
                ClientId,
                ProgramId,
                Symbol: Symbols,
                Size: Number(amount),
                // Get the price one last time if our order type is Market
                Price: type === MARKET_ORDER_TYPE ? getMarketOrderPrice(isBuy, orderBookStore) : price,
                Side: isBuy ? BUY_SIDE : SELL_SIDE,
                Route,
            };

            console.log("payload", payload);
            submitOrder(payload);

            // temporary local store of orders
            orders[ticketId] = {
                type,
                ...payload,
            };
            return { // Reset component
                ticketIds: [...ticketIds, ticketId],
                orders,
                amount: 0,
                price: 0,
                total: 0,
                priceMistake: false,
                amountMistake: false,
                orderButtonDisabled: true,
            }
        };
    },
});