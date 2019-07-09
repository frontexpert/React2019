import React from 'react';
import { FormattedMessage } from 'react-intl';
import Grid from '@material-ui/core/Grid';
import Row from './Row';
import styled from 'styled-components';

const StyledGrid = styled(Grid)`
    padding-top: .5rem;
`;

export const StopOrderRows = ({children, amount, amountCoin, stopPrice, stopCoin, price, priceCoin, total, totalCoin }) => {
    return(
        <StyledGrid item xs={12}>
            <FormattedMessage
                id="order_history.label_amount"
                defaultMessage="Amount"
            >
                {value =>
                    <Row header={value} amount={amount} coin={amountCoin} />
                }
            </FormattedMessage>
            <FormattedMessage
                id="order_entry.label_stop_limit"
                defaultMessage="Stop Limit"
            >
                {value =>
                    <Row header={value} amount={stopPrice} coin={stopCoin} />
                }
            </FormattedMessage>
            <FormattedMessage
                id="order_entry.label_price_limit"
                defaultMessage="Price Limit"
            >
                {value =>
                    <Row header={value} amount={price} coin={priceCoin} />
                }
            </FormattedMessage>
            <FormattedMessage
                id="order_history.label_total"
                defaultMessage="Total"
            >
                {value =>
                    <Row header={value} amount={total} coin={totalCoin} />
                }
            </FormattedMessage>
            {children}
        </StyledGrid>
    )
};