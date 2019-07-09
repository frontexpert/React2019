import {withStateHandlers} from 'recompose';
//user can pass buy & sell (i.e. if a sell order is clicked in order book, buy should be passed and be active; visa versa). Otherwise has buy default state
// Currently not used.
export const withStateBuySellButtons = withStateHandlers(
    ({buyActive=true, sellActive=false}) => ({
        buyActive,
        sellActive,
    }),
    {
        toggleActive: ({buyActive, sellActive}) => (isBuy) => {
            buyActive = isBuy;
            sellActive = !isBuy;
            return{buyActive, sellActive}
        },
    }
);