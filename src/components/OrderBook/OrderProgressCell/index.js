import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { compose, withProps } from 'recompose';

import { STORE_KEYS } from '../../../stores';

const Wrapper = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: ${({ width }) => width}px;
    background: ${({ isBuy, theme }) =>
        isBuy
            ? theme.palette.orderBookTableCellBuyProgress
            : theme.palette.orderBookTableCellSellProgress};
    opacity: 0.1;
    pointer-events: none;
`;

const OrderProgressCell = ({
    maxBidPrice, minBidPrice, maxAskPrice, minAskPrice, price, totalWidth, isBuy,
}) => {
    const progressPercents = isBuy
        ? 1 - (price - minBidPrice) / (maxBidPrice - minBidPrice)
        : (price - minAskPrice) / (maxAskPrice - minAskPrice);
    return <Wrapper width={progressPercents * totalWidth} isBuy={isBuy} />;
};

export default compose(
    inject(STORE_KEYS.ORDERBOOKBREAKDOWN),
    observer,
    withProps(({
        [STORE_KEYS.ORDERBOOKBREAKDOWN]: {
            maxBidPrice, minBidPrice, maxAskPrice, minAskPrice,
        },
    }) => ({
        maxBidPrice,
        minBidPrice,
        maxAskPrice,
        minAskPrice,
    }))
)(OrderProgressCell);
