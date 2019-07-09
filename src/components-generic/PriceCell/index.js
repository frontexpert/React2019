import React from 'react';
import styled from 'styled-components';

const PrimaryColorSell = styled.span`
    color: ${props => props.theme.palette.orderBookTableCellTextNegativeDark};
    opacity: ${props => props.opacity};
    &.active {
        color: ${props => props.theme.palette.orderBookTableCellTextNegative};
    }
`;

const PrimaryColorBuy = styled.span`
    color: ${props => props.theme.palette.orderBookTableCellTextPositiveDark};
    opacity: ${props => props.opacity};
    &.active {
        color: ${props => props.theme.palette.orderBookTableCellTextPositive};
    }
`;

const PriceCell = ({ price, isBuy, nextPrice }) => {
    let priceBuffer = [];
    let isOneDigitHighlighted = false;
    for (let i = 0; i < price.length; i++) {
        if (!isOneDigitHighlighted) {
            isOneDigitHighlighted = nextPrice ? (price[i] !== nextPrice[i]) : (price[i] !== null);
        }
        const opacity = 0.5 * (1 + i / price.length);
        if (isBuy) {
            priceBuffer.push(<PrimaryColorBuy className={isOneDigitHighlighted ? 'active' : ''} key={i} opacity={opacity}>{price[i]}</PrimaryColorBuy>);
        } else {
            priceBuffer.push(<PrimaryColorSell className={isOneDigitHighlighted ? 'active' : ''} key={i} opacity={opacity}>{price[i]}</PrimaryColorSell>);
        }
    }
    return (
        <div>
            {priceBuffer}
        </div>
    );
};

export default PriceCell;
