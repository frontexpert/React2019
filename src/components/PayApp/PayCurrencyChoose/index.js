import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

import { compose, withProps } from 'recompose';
import { inject, observer } from 'mobx-react';
import { FormattedMessage } from 'react-intl';
import CurrecySliderSelector from './CurrecySliderSelector';
import CurrencyDropdownWithSymbol from '../../../components-generic/CurrencyDropdown/CurrencyDropdownWithSymbol';
import PayButtonV2 from '../PayCalc/PayButtonV2';
import { payViewModeKeys } from '../../../stores/PayAppStore';
import { STORE_KEYS } from '../../../stores';
import TouchBlocker from '../../../components-generic/TouchBlocker';

const Wrapper = styled.div.attrs({ className: 'pay-choose-wrapper' })`
    width: 100%;
    height: 100%;
    padding: 20px 20px 0;
`;

const BtnWrapper = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 20px;
`;

class PayCurrencyChoose extends Component {
    state = {
        amount: 0,
        selected: [],
    };

    handleSelectCurrency = (value) => {
        const { selected } = this.state;
        selected.push(value);
        this.setState({
            selected: selected.slice(0),
        });
    };

    handleDeselectCurrency = (value) => {
        const { selected } = this.state;
        const index = selected.indexOf(value);
        if (index > -1) {
            selected.splice(index, 1);
        }

        this.setState({
            selected: selected.slice(0),
        });
    };

    convertToQRSection = () => {
        const { selected } = this.state;
        const amount = selected.reduce((a, b) => a + b, 0);
        if (parseFloat(amount) > 0) {
            const {
                defaultFiat,
                getDefaultPrice,
                getUSDPrice,
                PortfolioData,
                initTransferRequest,
                requestPosition,
                switchAppContentView,
                setPayAmount,
            } = this.props;

            const usdAmount = getUSDPrice(Number(amount));
            for (let coin of PortfolioData) {
                if (coin.Coin === 'BTC') {
                    if (coin.Position > 0) {
                        const btcAmount = (usdAmount / coin.Price) || 0;
                        const amount = coin.Position > btcAmount ? btcAmount : coin.Position;
                        if (Number(amount) > 0) {
                            initTransferRequest('BTC', Number(amount), defaultFiat)
                                .then(() => {
                                    requestPosition();
                                    setPayAmount(getDefaultPrice(Number(amount * coin.Price)), false);
                                    switchAppContentView(payViewModeKeys.payQRCodeModeKey);
                                });
                        }
                    }
                    break;
                }
                if (coin.Coin === 'USDT') {
                    if (coin.Position > 0) {
                        const amount = coin.Position > usdAmount ? usdAmount : coin.Position;
                        if (Number(amount) > 0) {
                            initTransferRequest('USDT', Number(amount), defaultFiat)
                                .then(() => {
                                    requestPosition();
                                    setPayAmount(getDefaultPrice(Number(amount * coin.Price)), false);
                                    switchAppContentView(payViewModeKeys.payQRCodeModeKey);
                                });
                        }
                        break;
                    }
                }
                if (coin.Coin === 'ETH') {
                    if (coin.Position > 0) {
                        const ethAmount = (usdAmount / coin.Price) || 0;
                        const amount = coin.Position > ethAmount ? ethAmount : coin.Position;
                        if (Number(amount) > 0) {
                            initTransferRequest('ETH', Number(amount), defaultFiat)
                                .then(() => {
                                    requestPosition();
                                    setPayAmount(getDefaultPrice(Number(amount * coin.Price)), false);
                                    switchAppContentView(payViewModeKeys.payQRCodeModeKey);
                                });
                        }
                        break;
                    }
                }
            }
        }
    };

    handleSwipe = (direction) => {
        if (this.props.onSwipe) {
            if (direction === 'right') {
                this.props.onSwipe(direction);
            }
        }
    };

    render() {
        const { selected } = this.state;
        const amount = selected.reduce((a, b) => a + b, 0);
        const {
            isDefaultCrypto,
            setIsDefaultCrypto,
        } = this.props;

        if (isDefaultCrypto) {
            setIsDefaultCrypto(false);
        }

        return (
            <Fragment>
                <TouchBlocker onSwipe={this.handleSwipe} isBlockMouseScroll>
                    <Wrapper>
                        <CurrecySliderSelector
                            selected={selected}
                            selectCurrency={this.handleSelectCurrency}
                            deselectCurrency={this.handleDeselectCurrency}
                        />
                    </Wrapper>

                    <BtnWrapper>
                        <PayButtonV2
                            onClick={() => this.convertToQRSection()}
                        >
                            <FormattedMessage
                                id="pay_app.pay_calc.btn_pay"
                                defaultMessage="PAY"
                            />&nbsp;
                            <CurrencyDropdownWithSymbol
                                isChild
                                isDisabled={true}
                                isClickable={false}
                                isMobile={true}
                                alignRight={false}
                                alignTop={false}
                                coinSize={65}
                                type="fiat"
                            />

                            {amount}
                        </PayButtonV2>
                    </BtnWrapper>
                </TouchBlocker>
            </Fragment>
        );
    }
}

const withStore = compose(
    inject(
        STORE_KEYS.SENDCOINSTORE,
        STORE_KEYS.SETTINGSSTORE,
        STORE_KEYS.YOURACCOUNTSTORE,
        STORE_KEYS.PAYAPPSTORE,
    ),
    observer,
    withProps(
        (
            {
                [STORE_KEYS.SENDCOINSTORE]: {
                    initTransferRequest,
                },
                [STORE_KEYS.SETTINGSSTORE]: {
                    defaultFiat,
                    isDefaultCrypto,
                    getDefaultPrice,
                    getUSDPrice,
                    setIsDefaultCrypto,
                },
                [STORE_KEYS.YOURACCOUNTSTORE]: {
                    PortfolioData,
                    requestPosition,
                },
                [STORE_KEYS.PAYAPPSTORE]: {
                    switchAppContentView,
                    setPayAmount,
                },
            }
        ) => ({
            initTransferRequest,
            getUSDPrice,
            defaultFiat,
            isDefaultCrypto,
            getDefaultPrice,
            setIsDefaultCrypto,
            PortfolioData,
            requestPosition,
            switchAppContentView,
            setPayAmount,
        })
    )
);

export default withStore(PayCurrencyChoose);
