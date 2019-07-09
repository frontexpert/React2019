import {withProps} from 'recompose';

// withProps used this way could cause possible memory leak; should be changed to withHandlers
export const withStateMapForPriceOrAmountChange = withProps(
    () => ({
        mapStateChangeForPriceOrAmount: (price, amount) => {
            const newTotal = price * amount;
            const priceMistake = Number.isNaN(price * price);
            const amountMistake = Number.isNaN(amount * amount);

            return {
                // We are mapping the price in the
                // prop (set by withPriceByOrderType)
                // to the price in state here. ¯\_(ツ)_/¯
                price: priceMistake ? 0 : price,
                amount: amountMistake ? 0 : amount,
                priceMistake: priceMistake,
                amountMistake: amountMistake,
                total: Number.isNaN(newTotal) ? 0 : newTotal,
                orderButtonDisabled: Number.isNaN(newTotal) || newTotal <= 0,
            };
        },
    })
);