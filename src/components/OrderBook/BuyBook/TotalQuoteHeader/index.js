import React, { memo } from 'react';

import AmountCell from '../../Cells/AmountCell';
import { Wrapper, CoinNameWrapper } from './styles';
import BuyHeaderTooltip from '../HeaderTooltip';
import { SwipArrowIcon } from '@/components-generic/ArrowIcon'

const TotalQuoteHeader = memo(({
    coin,
    coinSymbol,
    amount,
    intLength,
    fractionDigits,
}) => {
    return (
        <BuyHeaderTooltip tooltipText={coin}>
            <Wrapper>
                <SwipArrowIcon className="arrow-icon" width="20px" />
                <CoinNameWrapper>{coinSymbol || '$'}</CoinNameWrapper>
                <AmountCell
                    type="header"
                    intLength={intLength}
                    fractionDigits={fractionDigits}
                >
                    {amount}
                </AmountCell>
            </Wrapper>
        </BuyHeaderTooltip>
    );
});

export default TotalQuoteHeader;
