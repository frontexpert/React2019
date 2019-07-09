import React, { Fragment } from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { compose, withProps } from 'recompose';

import { STORE_KEYS } from '../../stores';
import { formatString } from '../../utils';

const ResultNumber = styled.span`
    font-weight: 700;
    color: ${({ type, theme }) => {
        switch (type) {
        case 'buy':
            return theme.palette.orderBookTableCellTextBuyBright;
        case 'sell':
            return theme.palette.orderBookTableCellTextSellBright;
        case 'header':
        default:
            return theme.palette.orderBookHeaderText2;
        }
    }};
`;

const ZerosWrapper = styled.span`
    opacity: 0.39;
`;

export const getSplittedNumber = priceString => {
    const leadingZerosRegex = priceString.match(/^[0, .]+/);
    const leadingZeros = leadingZerosRegex && leadingZerosRegex[0];
    if (leadingZeros && leadingZeros.length === priceString.length) {
        // only zeroes
        return {
            resultNumber: '',
            trailingZeros: '',
            leadingZeros,
        };
    }
    const trailingZerosRegex = priceString.match(/0+$/);
    const trailingZeros = trailingZerosRegex && trailingZerosRegex[0];

    let resultNumber = priceString;
    if (trailingZeros) {
        resultNumber = resultNumber.slice(0, trailingZerosRegex.index);
    }
    if (leadingZeros) {
        resultNumber = resultNumber.slice(leadingZeros.length);
    }
    return { resultNumber, trailingZeros, leadingZeros };
};

const OrderPriceFormatter = ({
    children, type, maxBidPrice, minAskPrice,
}) => {
    // determine how to format
    const numberToCheck = Math.min(maxBidPrice, minAskPrice);
    let fractionDigits = 2;
    if (numberToCheck < 1) {
        const stringifiedNumber = `${numberToCheck}`;
        fractionDigits = stringifiedNumber.indexOf('.') > -1 && Math.min(stringifiedNumber.split('.')[1].length, 7);
    } else if (numberToCheck < 100) {
        fractionDigits = 4;
    }

    // format price
    const priceString = formatString(children, fractionDigits);
    const result = getSplittedNumber(priceString);

    return (
        <ResultNumber type={type}>
            {!!result.leadingZeros && <ZerosWrapper>{result.leadingZeros}</ZerosWrapper>}
            {result.resultNumber}
            {!!result.trailingZeros && <ZerosWrapper>{result.trailingZeros}</ZerosWrapper>}
        </ResultNumber>
    );
};

export default compose(
    inject(STORE_KEYS.ORDERBOOKBREAKDOWN),
    observer,
    withProps(({ [STORE_KEYS.ORDERBOOKBREAKDOWN]: { maxBidPrice, minAskPrice } }) => ({
        maxBidPrice,
        minAskPrice,
    }))
)(OrderPriceFormatter);
