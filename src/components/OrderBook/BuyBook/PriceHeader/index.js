import React, { memo } from 'react';
import { inject } from 'mobx-react';
import { compose } from 'recompose';

import { STORE_KEYS } from '@/stores';
import PriceCell from '@/components/OrderBook/Cells/PriceCell';
import BuyHeaderTooltip from '@/components/OrderBook/BuyBook/HeaderTooltip';
import { ZerosWrapper } from '@/components/OrderBook/Cells/PriceCell/styles';

const PriceHeader = memo(({ price, intLength, fractionDigits, }) => {
    if (price <= 0) {
        return '-';
    }
    return (
        <BuyHeaderTooltip tooltipText="Price">
            <ZerosWrapper className="header" position="leading">@</ZerosWrapper>
            <PriceCell
                type="header"
                intLength={intLength}
                fractionDigits={fractionDigits}
            >
                {price}
            </PriceCell>
        </BuyHeaderTooltip>
    );
});

export default compose(
    inject(stores => ({
        price: stores[STORE_KEYS.PRICECHARTSTORE].price,
    }))
)(PriceHeader);
