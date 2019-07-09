import React from 'react';
import Grid from '@material-ui/core/Grid';
import Row from './Row';

export const StopOrderRows = ({children, amount, amountCoin, stopPrice, stopCoin, price, priceCoin, total, totalCoin }) => {
    return(
        <Grid item xs={12}>
            <Row header={'Amount'} amount={amount} coin={amountCoin} />
            <Row header={'Stop Limit'} amount={stopPrice} coin={stopCoin} />
            <Row header={'Price Limit'} amount={price} coin={priceCoin} />
            <Row header={'Total'} amount={total} coin={totalCoin} />
            {children}
        </Grid>
    )
};