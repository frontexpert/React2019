import React from 'react';
import { inject, observer } from 'mobx-react';

import OrderCellFormatter from '../../../../components-generic/OrderCellFormatter';
import { STORE_KEYS } from '../../../../stores';
import { Wrapper, ArrowIcon, CoinNameWrapper } from './styles';

import arrowIconSrc from './arrow.svg';
import NewCoinIcon from '../../../NewCoinIcon';

const TotalBaseHeader = props => {
    const {
        [STORE_KEYS.ORDERBOOKBREAKDOWN]: { totalOrderAmount },
        coin,
    } = props;
    return (
        <Wrapper>
            <CoinNameWrapper>
                <NewCoinIcon value={coin} />
            </CoinNameWrapper>
            <OrderCellFormatter type="header">{totalOrderAmount}</OrderCellFormatter>
            <ArrowIcon src={arrowIconSrc} />
        </Wrapper>
    );
};

export default inject(STORE_KEYS.ORDERBOOKBREAKDOWN)(observer(TotalBaseHeader));
