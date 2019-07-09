import React from 'react';
import Grid from '@material-ui/core/Grid';
import Row from '../Row';

export const MarketOrderRows = ({children, amount, amountCoin, handleAmountChange, amountMistake}) => {
    return(
        <Grid data-testid='buysellordercontainer' item xs={12}>
            <Row header={'Amount'} amount={amount} coin={amountCoin} onChange={handleAmountChange} userInputMistake={amountMistake}/>
            {children}
        </Grid>
    )
};