import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { unifyDigitString } from '../../../utils/index';
import { STORE_KEYS } from '../../../stores/index';

const LabelPrice = styled.div`
    position: absolute;
    bottom: ${props => props.isToggleBtn ? '60' : '35'}px;
    right: 90px;
    z-index: 6;
    color: #fff;
    font-size: 22px;
    line-height: 26px;
    font-weight: 600;
    text-align: right;
    pointer-events: none;
    
    > span {
        display: block;
        font-weight: 300;
        line-height: 12px;
        font-size: 12px;
        padding-bottom: 2px;
    }
`;

class TradingViewPriceLabel extends Component {
    componentDidMount() {}

    render() {
        const {
            [STORE_KEYS.INSTRUMENTS]: instrumentStore,
            [STORE_KEYS.PRICECHARTSTORE]: priceChartStore,
            isToggleBtn,
            exchange,
        } = this.props;

        const {
            selectedBase,
            selectedQuote,
        } = instrumentStore;

        const { price } = priceChartStore;

        return (
            <React.Fragment>
                {price && exchange && exchange !== 'Global' && (
                    <LabelPrice isToggleBtn={isToggleBtn}>
                        <span>{exchange} ({selectedBase}/{selectedQuote})</span>
                        {unifyDigitString(price)}
                    </LabelPrice>
                )}
            </React.Fragment>
        );
    }
}

export default inject(
    STORE_KEYS.INSTRUMENTS,
    STORE_KEYS.PRICECHARTSTORE,
)(observer(TradingViewPriceLabel));
