import React, { Component } from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';

import { STORE_KEYS } from '../../../stores';
import { payViewModeKeys } from '../../../stores/PayAppStore';

import svgUser from './icons/svg-user.svg';
import svgPay from './icons/svg-pay.svg';
import svgScan from './icons/svg-scan.svg';
import svgCalc from './icons/svg-calc.svg';

const HeaderWrapper = styled.div`
    position: relative;
    z-index: 100;
    width: 100%;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 30px;
`;

const Item = styled.div`
    flex: 1;
    text-align: center;
    cursor: pointer;

    > img {
        width: 50px;
        height: 50px;
        opacity: ${props => props.isActive ? '1' : '0.5'};
    }
`;

class PayAppHeader extends Component {
    state = {};

    render() {
        const {
            // [STORE_KEYS.TELEGRAMSTORE]: { isLoggedIn, setLoginBtnLocation, loginBtnLocation },
            payViewMode, switchAppContentView,
        } = this.props;

        return (
            <HeaderWrapper>
                <Item
                    isActive={payViewMode === payViewModeKeys.payHistoryModeKey}
                    onClick={() => {
                        switchAppContentView(payViewModeKeys.payHistoryModeKey);
                    }}
                >
                    <img src={svgUser} alt=""/>
                </Item>
                <Item
                    isActive={payViewMode === payViewModeKeys.payCalcModeKey}
                    onClick={() => {
                        switchAppContentView(payViewModeKeys.payCalcModeKey);
                    }}
                >
                    <img src={svgCalc} alt=""/>
                </Item>
                <Item
                    isActive={payViewMode === payViewModeKeys.payChooseModeKey}
                    onClick={() => {
                        switchAppContentView(payViewModeKeys.payChooseModeKey);
                    }}
                >
                    <img src={svgPay} alt=""/>
                </Item>
                <Item
                    isActive={payViewMode === payViewModeKeys.payScanModeKey}
                    onClick={() => {
                        switchAppContentView(payViewModeKeys.payScanModeKey);
                    }}
                >
                    <img src={svgScan} alt=""/>
                </Item>
            </HeaderWrapper>
        );
    }
}

export default inject(
    STORE_KEYS.TELEGRAMSTORE,
)(observer(PayAppHeader));
