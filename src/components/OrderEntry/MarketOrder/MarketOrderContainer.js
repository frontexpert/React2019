import React from 'react';
import styled from 'styled-components';

import { MarketOrderRows } from './MarketOrderRows';
import OrderButton from '../OrderButton';
import SliderInput from '../SliderInputWithColor';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    padding: 14px;
    width: 100%;

    &:last-of-type {
        border-left: 1px solid ${props => props.theme.palette.orderFormBorder}7f;
    }
`;

export const MarketOrderContainer = ({
    isBuy,
    orderButtonText,
    amount,
    price,
    sliderMax,
    amountCoin,
    baseSymbol,
    quoteSymbol,
    estimatedAmountReceived,
    total,
    totalCoin,
    handleOrder,
    handleAmountChange,
    orderButtonDisabled,
    priceLabel,
}) => {
    return (
        <Wrapper>
            <MarketOrderRows
                amount={amount}
                price={price}
                amountCoin={amountCoin}
                handleAmountChange={handleAmountChange}
                priceLabel={priceLabel}
                baseSymbol={baseSymbol}
                quoteSymbol={quoteSymbol}
                estimatedAmountReceived={estimatedAmountReceived}
            />
            <SliderInput value={amount} max={sliderMax} onChange={handleAmountChange}/>
            {/* <SliderSlick/> */}
            <OrderButton
                isBuy={isBuy}
                onClick={handleOrder}
                orderButtonText={orderButtonText}
                disabled={orderButtonDisabled}
            />
        </Wrapper>
    );
};
