import React, { memo } from 'react';

import AmountCell from '@/components/OrderBook/Cells/AmountCell';
import BuyHeaderTooltip from '../HeaderTooltip';

import { Wrapper } from './styles';

import NewCoinIcon from '@/components/NewCoinIcon';
import { darkTheme } from '@/theme/core';

const TotalBaseHeader = memo(({ amount, intLength, fractionDigits, coin }) => {
    return (
        <BuyHeaderTooltip tooltipText={coin}>
            <Wrapper>
                <NewCoinIcon value={coin} filter={darkTheme.palette.orderBookIconFilter} size="sm" />
                <AmountCell type="header" intLength={intLength} fractionDigits={fractionDigits}>{amount}</AmountCell>
            </Wrapper>
        </BuyHeaderTooltip>
    );
});

export default TotalBaseHeader;
