import React from 'react';
import { compose, withProps } from 'recompose';
import { inject, observer } from 'mobx-react';

import { STORE_KEYS } from '../../../stores';
import { payViewModeKeys } from '../../../stores/PayAppStore';
import FIAT_CURRENCIES from '../PayCurrencyChoose/CurrecySliderSelector/fiat_currencies';

import {
    Wrapper,
    QROuterWrapper
} from './Components';

import CurrencySliderSelector from './CurrencySliderSelector';
import PayQRCodeV2InCurrency from '../PayQRCodeV2InCurrency';

import TouchBlocker from '../../../components-generic/TouchBlocker';

class PayCurrencyChooseV2 extends React.Component {
    state = {};
    sliderRef = null;

    handleSwipe = (direction) => {
        const {
            defaultFiat,
            setFiatPrice,
        } = this.props;

        switch (direction) {
        case 'right':
            if (this.props.onSwipe) {
                this.handleCloseQR();
                this.props.onSwipe(direction);
            }
            break;
        case 'up':
            if (this.props.payViewMode === payViewModeKeys.payQRCodeModeKey) {
                if (
                    this.sliderRef
                    && this.sliderRef.sliderRef
                ) {
                    if (this.sliderRef.sliderRef.innerSlider.state.currentSlide > 0) {
                        this.handleCloseQR();
                        this.sliderRef.handleSwipe(direction);
                    } else if (this.props.onSwipe) {
                        this.handleCloseQR();
                        this.props.onSwipe('up');
                    }
                }
            } else if (this.props.payViewMode === payViewModeKeys.payChooseModeKey) {
                if (
                    this.sliderRef
                    && this.sliderRef.sliderRef
                    && this.sliderRef.sliderRef.innerSlider.state.currentSlide > 0
                ) {
                    setFiatPrice(FIAT_CURRENCIES[defaultFiat][this.sliderRef.sliderRef.innerSlider.state.currentSlide - 1].price);
                }
            }
            break;
        case 'down':
            if (this.props.payViewMode === payViewModeKeys.payQRCodeModeKey) {
                if (
                    this.sliderRef
                    && this.sliderRef.sliderRef
                    && (this.sliderRef.sliderRef.innerSlider.state.currentSlide < this.sliderRef.sliderRef.innerSlider.state.slideCount - 1)
                ) {
                    this.handleCloseQR();
                    this.sliderRef.handleSwipe(direction);
                }
            } else if (this.props.payViewMode === payViewModeKeys.payChooseModeKey) {
                if (
                    this.sliderRef
                    && this.sliderRef.sliderRef
                    && (this.sliderRef.sliderRef.innerSlider.state.currentSlide < this.sliderRef.sliderRef.innerSlider.state.slideCount - 1)
                ) {
                    setFiatPrice(FIAT_CURRENCIES[defaultFiat][this.sliderRef.sliderRef.innerSlider.state.currentSlide + 1].price);
                }
            }
            break;
        default:
        }
    };

    handleSwipeUpAtLastCurrency = () => {
        this.handleCloseQR();
        this.props.onSwipe('up');
    };

    handleCloseQR = () => {
        this.props.switchAppContentView(payViewModeKeys.payChooseModeKey);
    };

    convertToQRSection = amount => {
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

    render() {
        const {
            payViewMode,
            isVisible,
        } = this.props;

        return (
            <Wrapper>
                <TouchBlocker onSwipe={this.handleSwipe} isBlockMouseScroll threshold={5}>
                    <CurrencySliderSelector
                        onSelect={this.convertToQRSection}
                        onSwipe={this.handleSwipe}
                        isVisible={isVisible}
                        isQRVisible={payViewMode === payViewModeKeys.payQRCodeModeKey}
                        onSwipeUpAtLastCurrency={this.handleSwipeUpAtLastCurrency}
                        innerRef={e => {
                            this.sliderRef = e;
                        }}
                    />

                    {(payViewMode === payViewModeKeys.payQRCodeModeKey && isVisible) &&
                    <QROuterWrapper className="pay-currency-select-qr-view">
                        <PayQRCodeV2InCurrency onClose={this.handleCloseQR} />
                    </QROuterWrapper>
                    }
                </TouchBlocker>
            </Wrapper>
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
                    setFiatPrice,
                },
                [STORE_KEYS.YOURACCOUNTSTORE]: {
                    PortfolioData,
                    requestPosition,
                },
                [STORE_KEYS.PAYAPPSTORE]: {
                    payViewMode,
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
            payViewMode,
            switchAppContentView,
            setPayAmount,
            setFiatPrice,
        })
    )
);

export default withStore(PayCurrencyChooseV2);
