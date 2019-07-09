import React from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { compose, withProps } from 'recompose';

import { STORE_KEYS } from '../../stores';
import { formatString } from '../../utils';
import { getSplittedNumber } from '../OrderPriceFormatter';

const Container = styled.span`
    font-weight: ${({ type }) => (type === 'header' ? 700 : 400)};
`;

const ZerosWrapper = styled.span`
    opacity: 0.39;
`;

const OrderCellFormatter = ({
    children, isQuote, type, maxOrderAmount, maxOrderSize,
}) => {
    const intLength = `${parseInt(isQuote ? maxOrderAmount : maxOrderSize, 10)}`.length;
    const fractionDigits = Math.max(7 - intLength, 0);

    const stringifiedNumber = formatString(children, fractionDigits);
    const result = getSplittedNumber(stringifiedNumber);

    return (
        <Container type={type}>
            {!!result.leadingZeros && <ZerosWrapper>{result.leadingZeros}</ZerosWrapper>}
            {result.resultNumber}
            {!!result.trailingZeros && <ZerosWrapper>{result.trailingZeros}</ZerosWrapper>}
        </Container>
    );
};

export default compose(
    inject(STORE_KEYS.ORDERBOOKBREAKDOWN),
    observer,
    withProps(({ [STORE_KEYS.ORDERBOOKBREAKDOWN]: { maxOrderAmount, maxOrderSize } }) => ({
        maxOrderAmount,
        maxOrderSize,
    }))
)(OrderCellFormatter);
