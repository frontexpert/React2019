import React, { Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { compose, withProps } from 'recompose';
import { STORE_KEYS } from '../../../stores';
import { unifyDigitString } from '../../../utils';

const PriceHeaderLabel = ({ price }) => {
    return (
        <Fragment>
            {price > 0 ? unifyDigitString(price) : '-'}
        </Fragment>
    );
};

export default compose(
    inject(STORE_KEYS.PRICECHARTSTORE),
    observer,
    withProps(
        ({
            [STORE_KEYS.PRICECHARTSTORE]: {
                price,
            },
        }) => ({
            price,
        })
    )
)(PriceHeaderLabel);
