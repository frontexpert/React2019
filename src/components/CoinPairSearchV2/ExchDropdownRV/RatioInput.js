import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';

import { STORE_KEYS } from '../../../stores';
import { unifyDigitString } from '../../../utils';
import DataLoader from '../../../components-generic/DataLoader';

const LoadingWrapper = styled.div.attrs({ className: 'loading_wrapper' })`
    position: absolute;
    width: ${props => props.size}px;
    height: ${props => props.size}px;
`;

class RatioInput extends Component {
    componentDidMount() {

    }

    render() {
        const {
            className,
            [STORE_KEYS.PRICECHARTSTORE]: priceChartStore,
            [STORE_KEYS.YOURACCOUNTSTORE]: yourAccountStore,
            [STORE_KEYS.SETTINGSSTORE]: settingsStore,
            isLeft,
        } = this.props;

        const {
            price,
            isFetchingPrice,
        } = priceChartStore;

        const {
            baseSelectedCoin,
            quoteSelectedCoin,
        } = yourAccountStore;

        const {
            getLocalPrice,
            price: fiatPrice,
        } = settingsStore;

        const size = 50;

        let ratioPriceLeft = 1;
        let ratioPriceRight = price;
        if (ratioPriceRight < 1 && ratioPriceRight !== 0) {
            ratioPriceLeft = 1 / ratioPriceRight;
            ratioPriceRight = 1;
        }
        if (baseSelectedCoin === 'USDT') {
            ratioPriceLeft = getLocalPrice(ratioPriceLeft, baseSelectedCoin);
        }
        if (quoteSelectedCoin === 'USDT') {
            ratioPriceRight = getLocalPrice(ratioPriceRight, quoteSelectedCoin);
        }

        return (isLeft || !isFetchingPrice) ? (
            <input
                className={className}
                value={isLeft ? unifyDigitString(ratioPriceLeft) : unifyDigitString(ratioPriceRight)}
                readOnly
            />
        ) : (
            <LoadingWrapper size={size}>
                <DataLoader width={size} height={size}/>
            </LoadingWrapper>
        );
    }
}
export default inject(
    STORE_KEYS.PRICECHARTSTORE,
    STORE_KEYS.YOURACCOUNTSTORE,
    STORE_KEYS.SETTINGSSTORE
)(observer(RatioInput));
