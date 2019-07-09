import React, { memo } from 'react';

import { Wrapper } from './styles';

const OrderProgressCell = memo(({
    maxPrice, minPrice, price, totalWidth, isBuy,
}) => {
    const progressPercents = isBuy
        ? 1 - (price - minPrice) / (maxPrice - minPrice)
        : (price - minPrice) / (maxPrice - minPrice);
    return <Wrapper width={progressPercents * totalWidth} isBuy={isBuy} />;
});

export default OrderProgressCell;
