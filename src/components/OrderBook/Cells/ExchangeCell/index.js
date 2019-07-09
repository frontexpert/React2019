import React, { memo } from 'react';

import { Wrapper, DotSpan } from './styles';

const ExchangeCell = memo(({ isBuy, exchange }) => {
    const sellExchanges = exchange.split(',');
    const exchanges = isBuy ? sellExchanges.reverse() : sellExchanges;
    const renderedExchanges = exchanges.map((item, index) => <DotSpan key={index}>{item}</DotSpan>)
    return <Wrapper isBuy={isBuy}>{renderedExchanges}</Wrapper>;
});

export default ExchangeCell;
