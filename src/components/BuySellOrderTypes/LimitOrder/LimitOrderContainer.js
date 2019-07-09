import React from 'react';
import {LimitOrderRows} from './LimitOrderRows'
import OrderButton from '../OrderButton';
import Slider from 'ComponentsGeneric/Slider';
import Grid from '@material-ui/core/Grid';

const LimitOrderContainer = ({amount, amountCoin, price, priceCoin, total, totalCoin, isBuy, orderButtonText, handleOrder,
                    handleAmountChange, handlePriceChange, orderButtonDisabled}) => {
    return (
        <React.Fragment>
            <Grid container style={{"padding": ".5rem 1rem 1rem 1rem"}}>
                <LimitOrderRows
                    amount={amount} amountCoin={amountCoin} handleAmountChange={handleAmountChange}
                    price={price} priceCoin={priceCoin} handlePriceChange={handlePriceChange}
                    total={total} totalCoin={totalCoin}>
                    <Slider/>
                    <OrderButton isBuy={isBuy} onClick={handleOrder} orderButtonText={orderButtonText} disabled={orderButtonDisabled} />
                </LimitOrderRows>
            </Grid>
        </React.Fragment>
    )
};

export default LimitOrderContainer;