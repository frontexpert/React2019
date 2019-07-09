import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import Row from '../Row';

const Wrapper = styled.div`
    flex: 1;
    overflow: auto;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: space-between;
    width: 100%;
`;

export const StopOrderRows = ({
    amount,
    amountCoin,
    price,
    stopPrice,
    priceCoin,
    total,
    totalCoin,
    handlePriceChange,
    handleStopPriceChange,
    handleAmountChange,
}) => {
    return (
        <Wrapper>
            <FormattedMessage
                id="order_history.label_amount"
                defaultMessage="Amount"
            >
                {value =>
                    <Row header={value} amount={amount} coin={amountCoin} onChange={handleAmountChange}/>
                }
            </FormattedMessage>
            <FormattedMessage
                id="order_entry.label_stop_price"
                defaultMessage="Stop Price"
            >
                {value =>
                    <Row header={value} amount={stopPrice} coin={priceCoin} onChange={handleStopPriceChange}/>
                }
            </FormattedMessage>
            <FormattedMessage
                id="order_entry.label_price_limit"
                defaultMessage="Price Limit"
            >
                {value =>
                    <Row header={value} amount={price} coin={priceCoin} onChange={handlePriceChange}/>
                }
            </FormattedMessage>
            <FormattedMessage
                id="order_history.label_total"
                defaultMessage="Total"
            >
                {value =>
                    <Row header={value} readOnly={true} amount={total} coin={totalCoin} darkBg/>
                }
            </FormattedMessage>
        </Wrapper>
    );
};
