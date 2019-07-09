import React from 'react';
import { inject, observer } from 'mobx-react';
import { compose, withProps } from 'recompose';

import { STORE_KEYS } from '../../../../stores';
import OrderPriceFormatter from '../../../../components-generic/OrderPriceFormatter';


const PriceHeader = ({ price }) => {
    if (price <= 0) {
        return '-';
    }
    return <OrderPriceFormatter type="header">{price}</OrderPriceFormatter>;
};

export default compose(
    inject(STORE_KEYS.PRICECHARTSTORE),
    observer,
    withProps(({ [STORE_KEYS.PRICECHARTSTORE]: { price } }) => ({
        price,
    }))
)(PriceHeader);
