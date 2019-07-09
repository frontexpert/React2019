import React from 'react';
import {MarketOrderRows} from 'Components/BuySellOrderTypes/MarketOrder/MarketOrderRows'
import OrderButton from 'Components/BuySellOrderTypes/OrderButton';
import Slider from 'ComponentsGeneric/Slider';
import Grid from '@material-ui/core/Grid';

export const MarketOrderContainer = ({isBuy, orderButtonText, toggleActive, amount, amountCoin, price, priceCoin, total,
                                         totalCoin, handleOrder, handlePriceChange, handleAmountChange, orderButtonDisabled}) => {
    return (
        <React.Fragment>
            <Grid container style={{ "padding": ".5rem 1rem 1rem 1rem" }}>
                <MarketOrderRows amount={amount} amountCoin={amountCoin} handleAmountChange={handleAmountChange}>
                    <Slider />
                    <OrderButton isBuy={isBuy} onClick={handleOrder} orderButtonText={orderButtonText} disabled={orderButtonDisabled}/>
                </MarketOrderRows>
            </Grid>
        </React.Fragment>
    )
};