import React from 'react';
import Grid from '@material-ui/core/Grid';
import Row from '../Row';

export const LimitOrderRows = ({children, amount, amountCoin, price, priceCoin, total, totalCoin,
                                   handlePriceChange, handleAmountChange, amountMistake, priceMistake}) => {
    return (
        <Grid item xs={12}>
            <Row header={'Amount'} amount={amount} coin={amountCoin} onChange={handleAmountChange} userInputMistake={amountMistake}/>
            <Row header={'Price Limit'} amount={price} coin={priceCoin} onChange={handlePriceChange} userInputMistake={priceMistake}/>
            <Row header={'Total'} amount={total} coin={totalCoin}/>
            {children}
        </Grid>
    )
};