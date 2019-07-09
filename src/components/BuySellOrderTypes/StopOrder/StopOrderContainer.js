import React from 'react';
import Grid from '@material-ui/core/Grid';
import {StopOrderRows} from 'Components/BuySellOrderTypes/Vertical/OrderRowsGroup';
import OrderButton from 'Components/BuySellOrderTypes/Vertical/OrderButton';
import Slider from 'ComponentsGeneric/Slider';

export const StopOrderContainer = ({amount, amountCoin, stopPrice, stopCoin, price, priceCoin, total, totalCoin, orderButtonText, isBuy}) => {
    return (
        <React.Fragment>
            <Grid container style={{"padding": ".5rem 1rem 1rem 1rem"}}>
                <StopOrderRows
                    amount={amount} amountCoin={amountCoin}
                    stopPrice={stopPrice} stopCoin={stopCoin}
                    price={price} priceCoin={priceCoin}
                    total={total} totalCoin={totalCoin}>
                    <Slider/>
                    <OrderButton isBuy={isBuy} orderButtonText={orderButtonText}/>
                </StopOrderRows>
            </Grid>
        </React.Fragment>
    )
};