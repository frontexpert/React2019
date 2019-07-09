import React, { Component, Fragment } from 'react';
import { compose, withProps } from 'recompose';
import { inject, observer } from 'mobx-react';
import { FormattedMessage } from 'react-intl';
import { AutoSizer } from 'react-virtualized';

import { STORE_KEYS } from '../../../stores';
import { valueNormalized } from '../../../stores/utils/OrderEntryUtils';
import {
    formatStringMinMax,
    format2DigitString
} from '../../../utils';
import {
    Wrapper,
    ContentWrapper,
    FooterWrapper,
    NumpadWrapper,
    StyleWrapper,
    NamPadKey,
    PayButtonWrapper,
    QROuterWrapper,
    DeleteIcon
} from './Components';

import PayButtonV2 from './PayButtonV2';
import CurrencyDropdownWithSymbol from '../../../components-generic/CurrencyDropdown/CurrencyDropdownWithSymbol';
import { payViewModeKeys } from '../../../stores/PayAppStore';
import TouchBlocker from '../../../components-generic/TouchBlocker';
import PayQRCodeV2 from '../PayQRCodeV2';

class PayCalc extends Component {
    integerFocus = true;

    constructor(props) {
        super(props);

        this.state = {
            amount: 0,
        };
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

    updateDimensions = () => {
        this.forceUpdate();
    };

    convertToQRSection = () => {
        const { amount } = this.state;
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
                                    setPayAmount(getDefaultPrice(Number(amount * coin.Price)), true);
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

    handleAmountChange = (value, price) => {
        const {
            getDefaultPrice,
        } = this.props;
        let amountMax = getDefaultPrice(this.props.PortfolioTotalValue);
        let valueParsed = Number.parseFloat(value);
        if (valueParsed && price && price > 0) valueParsed /= price;
        if (valueParsed > amountMax) {
            return;
        }

        let oldValue = String(this.state.amount);
        let newValue = valueNormalized(oldValue, valueParsed);
        if (valueParsed.toString().indexOf('e') > -1) {
            newValue = valueParsed;
        }

        this.setState({
            amount: newValue || '0',
        });
    };

    shake = () => {
        if (this.usdAmountRef) {
            this.usdAmountRef.className = 'usd-amount shake';
            setTimeout(() => {
                this.usdAmountRef.className = 'usd-amount';
            }, 300);
        }
    };

    keyPress = (key) => {
        const { getDefaultPrice } = this.props;
        const price = 1;

        let amountMax = getDefaultPrice(this.props.PortfolioTotalValue);

        this.usdIntegerVal = this.usdIntegerVal.replace(new RegExp(',', 'g'), '');
        let usdIntegerVal = this.usdIntegerVal;
        let usdDecimalVal = this.usdDecimalVal;

        if (key === '.') {
            this.integerFocus = false;
            this.forceUpdate();
        } else if (key === 'Backspace') {
            if (!this.integerFocus && this.usdDecimalVal === '') {
                this.integerFocus = true;
                this.forceUpdate();
                return;
            }
            if (this.integerFocus) {
                if (this.usdIntegerVal === '0') {
                    this.shake();
                    return;
                }
                this.usdIntegerVal = this.usdIntegerVal.substr(0, this.usdIntegerVal.length - 1);
            } else if (this.usdDecimalVal && this.usdDecimalVal[this.usdDecimalVal.length - 1] === '0') {
                this.usdDecimalVal = this.usdDecimalVal.substr(0, this.usdDecimalVal.length - 1);
                const placeHolderVal = this.usdDecimalVal.length > 0 ? this.usdDecimalVal.length === 1 ? '0' : '' : '00';
                this.decimalValRef.innerHTML = this.usdDecimalVal;
                this.placeHolderRef.innerHTML = placeHolderVal;
                return;
            } else {
                this.usdDecimalVal = this.usdDecimalVal.substr(0, this.usdDecimalVal.length - 1);
            }
            this.handleAmountChange(this.usdIntegerVal + '.' + this.usdDecimalVal, price);
        } else {
            if (this.integerFocus) {
                usdIntegerVal += key;
            } else {
                if (this.usdDecimalVal.length === 2) {
                    this.shake();
                    return;
                }
                usdDecimalVal += key;
                if (key === '0' && this.decimalValRef) {
                    this.usdDecimalVal = usdDecimalVal;
                    const placeHolderVal = this.usdDecimalVal.length > 0 ? this.usdDecimalVal.length === 1 ? '0' : '' : '00';
                    this.decimalValRef.innerHTML = this.usdDecimalVal;
                    this.placeHolderRef.innerHTML = placeHolderVal;
                    return;
                }
            }

            let valueParsed = Number.parseFloat(usdIntegerVal + '.' + usdDecimalVal);
            if (price && price > 0) valueParsed /= price;
            if (valueParsed > amountMax) {
                this.shake();
                return;
            }
            this.usdIntegerVal = usdIntegerVal;
            this.usdDecimalVal = usdDecimalVal;
            this.handleAmountChange(this.usdIntegerVal + '.' + this.usdDecimalVal, price);
        }
    };

    handleSwipe = (direction) => {
        if (this.props.payViewMode === payViewModeKeys.payQRCodeModeKey) {
            return;
        }

        if (this.props.onSwipe) {
            if (direction === 'down') {
                this.props.onSwipe(direction);
            }
        }
    };

    handleCloseQR = () => {
        this.props.switchAppContentView(payViewModeKeys.payChooseModeKey);
    };

    render() {
        const { amount } = this.state;

        const {
            getDefaultPrice,
            PortfolioTotalValue: amountMax,
            payViewMode,
            isVisible,
        } = this.props;

        let balanceMaxValue = format2DigitString(getDefaultPrice(amountMax));
        let balanceValue = formatStringMinMax(parseFloat(amount), 0, 2);
        if (amount === balanceMaxValue) balanceValue = '0';
        this.usdIntegerVal = balanceValue.split('.')[0];
        this.usdDecimalVal = balanceValue.split('.').length === 2 ? balanceValue.split('.')[1] : '';

        const placeHolderVal = this.usdDecimalVal.length > 0 ? this.usdDecimalVal.length === 1 ? '0' : '' : '00';

        return (
            <Wrapper>
                <TouchBlocker onSwipe={this.handleSwipe} isBlockMouseScroll>
                    <ContentWrapper>
                        <NumpadWrapper>
                            <AutoSizer>
                                {({ width, height }) => {
                                    const sizeW = width * 0.7 / 3;
                                    const sizeH = height * 0.6 / 4;
                                    const size = Math.min(sizeW, sizeH);
                                    return (
                                        <StyleWrapper width={width} height={height} margin={width * 0.05 * 2 / 3}>
                                            <div className="num-pad-row">
                                                <NamPadKey size={size} onClick={() => this.keyPress('1')}>1</NamPadKey>
                                                <NamPadKey size={size} onClick={() => this.keyPress('2')}>2</NamPadKey>
                                                <NamPadKey size={size} onClick={() => this.keyPress('3')}>3</NamPadKey>
                                            </div>
                                            <div className="num-pad-row">
                                                <NamPadKey size={size} onClick={() => this.keyPress('4')}>4</NamPadKey>
                                                <NamPadKey size={size} onClick={() => this.keyPress('5')}>5</NamPadKey>
                                                <NamPadKey size={size} onClick={() => this.keyPress('6')}>6</NamPadKey>
                                            </div>
                                            <div className="num-pad-row">
                                                <NamPadKey size={size} onClick={() => this.keyPress('7')}>7</NamPadKey>
                                                <NamPadKey size={size} onClick={() => this.keyPress('8')}>8</NamPadKey>
                                                <NamPadKey size={size} onClick={() => this.keyPress('9')}>9</NamPadKey>
                                            </div>
                                            <div className="num-pad-row">
                                                <NamPadKey size={size} onClick={() => this.keyPress('.')}>&bull;</NamPadKey>
                                                <NamPadKey size={size} onClick={() => this.keyPress('0')}>0</NamPadKey>
                                                <NamPadKey size={size} paddingBottom onClick={() => this.keyPress('Backspace')}>
                                                    <DeleteIcon size={size * 0.5} />
                                                </NamPadKey>
                                            </div>
                                        </StyleWrapper>
                                    );
                                }}
                            </AutoSizer>
                        </NumpadWrapper>

                        <FooterWrapper>
                            <PayButtonWrapper disabled={balanceValue === '0'}>
                                <PayButtonV2
                                    disabled={balanceValue === '0'}
                                    onClick={this.convertToQRSection}
                                >
                                    <FormattedMessage
                                        id="pay_app.pay_calc.btn_pay"
                                        defaultMessage="PAY"
                                    />&nbsp;

                                    <CurrencyDropdownWithSymbol
                                        isChild
                                        isDisabled={true}
                                        isMobile={true}
                                        isClickable={false}
                                        alignRight={false}
                                        alignTop={false}
                                        coinSize={65}
                                        type="fiat"
                                    />

                                    <span className="usd-integer">{this.usdIntegerVal}</span>

                                    {(!this.integerFocus) && (
                                        <Fragment>
                                            <span
                                                className="usd-decimal"
                                                ref={el => {
                                                    this.decimalValRef = el;
                                                }}
                                            >
                                                .{this.usdDecimalVal}
                                            </span>

                                            <span
                                                className="usd-decimal placeholder"
                                                ref={el => {
                                                    this.placeHolderRef = el;
                                                }}
                                            >
                                                {placeHolderVal}
                                            </span>
                                        </Fragment>
                                    )}
                                </PayButtonV2>
                            </PayButtonWrapper>
                        </FooterWrapper>
                    </ContentWrapper>

                    {(payViewMode === payViewModeKeys.payQRCodeModeKey && isVisible) &&
                    <QROuterWrapper hasBg className="pay-calc-qr-view">
                        <PayQRCodeV2 onClose={this.handleCloseQR} />
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
                    getDefaultPrice,
                    getUSDPrice,
                },
                [STORE_KEYS.YOURACCOUNTSTORE]: {
                    PortfolioData,
                    requestPosition,
                    PortfolioTotalValue,
                },
                [STORE_KEYS.PAYAPPSTORE]: {
                    switchAppContentView,
                    setPayAmount,
                    payViewMode,
                },
            }
        ) => ({
            initTransferRequest,
            getUSDPrice,
            defaultFiat,
            getDefaultPrice,
            PortfolioData,
            requestPosition,
            PortfolioTotalValue,
            switchAppContentView,
            setPayAmount,
            payViewMode,
        })
    )
);

export default withStore(PayCalc);
