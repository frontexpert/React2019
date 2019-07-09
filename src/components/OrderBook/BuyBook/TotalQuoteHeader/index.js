import React from 'react';
import { inject, observer } from 'mobx-react';

import OrderCellFormatter from '../../../../components-generic/OrderCellFormatter';
import { STORE_KEYS } from '../../../../stores';
import { Wrapper, CoinNameWrapper } from './styles';
import NewCoinIcon from '../../../NewCoinIcon';

const TotalQuoteHeader = props => {
    const {
        [STORE_KEYS.ORDERBOOKBREAKDOWN]: { totalOrderSize },
        coin,
    } = props;
    return (
        <Wrapper>
            <CoinNameWrapper>
                <NewCoinIcon value={coin} />
            </CoinNameWrapper>
            <OrderCellFormatter isQuote type="header">{totalOrderSize}</OrderCellFormatter>
        </Wrapper>
    );
};

export default inject(STORE_KEYS.ORDERBOOKBREAKDOWN)(observer(TotalQuoteHeader));
