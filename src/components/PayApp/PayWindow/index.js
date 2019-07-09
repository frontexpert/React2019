import React, { Component, Fragment } from 'react';
import { compose, withProps } from 'recompose';
import { inject, observer } from 'mobx-react';
import { AutoSizer } from 'react-virtualized';

import { STORE_KEYS } from '../../../stores/index';
import { valueNormalized } from '../../../stores/utils/OrderEntryUtils';
import {
    formatStringMinMax, getNumPadFont, format2DigitString, getScreenInfo
} from '../../../utils/index';
import {
    Wrapper, Numpad, FiatIcon,
    HWrapper, CurrencyList, ReceiveFund, SendFund, CurrencyImage, LoginBtnWrapper
} from './SendCoinComponents';
import PayButton from './Components/PayButton';
import CashHeader from './Components/CashHeader';
import HistoryView from '../HistoryViewV2';
import QRScanView from './QRScanView/index';
import QRScanReceiverView from './QRScanReceiverView/index';
import CoinReceivePopup from '../../Modals/CoinReceivePopup/index';
import QRScanner from '../PayQRScanner/index';
import { contentModeKeys } from '../../../stores/PayWindowStore';
import CurrencyDropdownWithSymbol from '../../../components-generic/CurrencyDropdown/CurrencyDropdownWithSymbol';
import TelegramLogin from '../../TelegramLogin/index';

class PayWindow extends Component {
    integerFocus = true;

    constructor(props) {
        super(props);

        this.state = {
            amount: 0,
            receiverAddress: '',
            receiverTelegramUser: null,
            isSendingCoins: false,
            submitted: false,
            isShowNotification: false,
        };
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
    }

    componentWillReceiveProps(props) {
        if ((props.qrObj !== null) && !this.state.isShowNotification) {
            this.setState({
                isShowNotification: true,
            });
            setTimeout(() => {
                this.setState({
                    isShowNotification: false,
                });
                props.setQrObject(null);
            }, 10000);
        }
    }

    componentWillUnmount() {
    }

    updateDimensions = () => {
        this.forceUpdate();
    };

    convertToQRSection = (defaultFiat, isDefaultCrypto, defaultCryptoSymbol) => {
        const {
            isLoggedIn,
            setLoginBtnLocation,
        } = this.props;
        if (!isLoggedIn) {
            setLoginBtnLocation(true);
        } else if (parseFloat(this.state.amount) > 0) {
            const {
                getDefaultPrice,
                getUSDPrice,
                PortfolioData,
                initTransferRequest,
                requestPosition,
                openQRScan,
            } = this.props;

            if (!isDefaultCrypto) {
                const usdAmount = getUSDPrice(Number(this.state.amount));
                for (let coin of PortfolioData) {
                    if (coin.Coin === 'USDT') {
                        if (coin.Position > 0) {
                            const amount = coin.Position > usdAmount ? usdAmount : coin.Position;
                            initTransferRequest('USDT', Number(amount), defaultFiat)
                                .then(() => {
                                    requestPosition();
                                });
                            openQRScan('USDT', getDefaultPrice(Number(amount)));
                            break;
                        }
                    }
                    if (coin.Coin === 'BTC') {
                        if (coin.Position > 0) {
                            const btcAmount = usdAmount / coin.Price || 0;
                            const amount = coin.Position > btcAmount ? btcAmount : coin.Position;
                            initTransferRequest('BTC', Number(amount), defaultFiat)
                                .then(() => {
                                    requestPosition();
                                });
                            openQRScan('USDT', getDefaultPrice(Number(amount * coin.Price)));
                            break;
                        }
                    }
                    if (coin.Coin === 'ETH') {
                        if (coin.Position > 0) {
                            const ethAmount = usdAmount / coin.Price || 0;
                            const amount = coin.Position > ethAmount ? ethAmount : coin.Position;
                            initTransferRequest('ETH', Number(amount), defaultFiat)
                                .then(() => {
                                    requestPosition();
                                });
                            openQRScan('USDT', getDefaultPrice(Number(amount * coin.Price)));
                            break;
                        }
                    }
                }
            } else {
                const coinAmount = Number(this.state.amount);
                for (let coin of PortfolioData) {
                    if (coin.Coin === 'BTC' && defaultCryptoSymbol.toUpperCase() === 'BTC') {
                        if (coin.Position > 0) {
                            const amount = coin.Position > coinAmount ? coinAmount : coin.Position;
                            initTransferRequest('BTC', Number(amount), '')
                                .then(() => {
                                    requestPosition();
                                });
                            openQRScan('BTC', Number(amount));
                            break;
                        }
                    }
                    if (coin.Coin === 'ETH' && defaultCryptoSymbol.toUpperCase() === 'ETH') {
                        if (coin.Position > 0) {
                            const amount = coin.Position > coinAmount ? coinAmount : coin.Position;
                            initTransferRequest('ETH', Number(amount), '')
                                .then(() => {
                                    requestPosition();
                                });
                            openQRScan('ETH', Number(amount));
                            break;
                        }
                    }
                }
            }
        }
    };

    handleAmountChange = (value, price) => {
        const {
            getDefaultPrice, isLoggedIn,
        } = this.props;
        // let amountMax = getDefaultPrice(this.props.PortfolioTotalValue);
        let amountMax = isLoggedIn ? getDefaultPrice(this.props.PortfolioTotalValue) : 1000;
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
        const { getDefaultPrice, isLoggedIn } = this.props;
        const price = 1;

        let amountMax = isLoggedIn ? getDefaultPrice(this.props.PortfolioTotalValue) : 1000;

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

    render() {
        const { amount, isShowNotification } = this.state;

        const {
            contentViewMode,

            defaultFiatSymbol,
            defaultFiat,
            defaultCryptoSymbol,
            isDefaultCrypto,

            switchContentView,

            getDefaultPrice,
            PortfolioTotalValue: amountMax,
            setIsDefaultCrypto,
            qrObj,
            setClaimNotify,
            isLoggedIn,
            switchAppContentView,
        } = this.props;

        let balanceMaxValue = format2DigitString(getDefaultPrice(amountMax));

        let balanceValue = formatStringMinMax(parseFloat(amount), 0, 2);
        if (amount === balanceMaxValue) balanceValue = '0';
        this.usdIntegerVal = balanceValue.split('.')[0];
        this.usdDecimalVal = balanceValue.split('.').length === 2 ? balanceValue.split('.')[1] : '';

        let usdDigits = this.integerFocus ? this.usdIntegerVal.length : this.usdIntegerVal.length + 2 * 0.7;
        usdDigits += defaultFiatSymbol.length;
        const usdAmountFont = getNumPadFont(usdDigits);

        const placeHolderVal = this.usdDecimalVal.length > 0 ? this.usdDecimalVal.length === 1 ? '0' : '' : '00';
        const isOnedigit = (this.integerFocus && this.usdIntegerVal.length < 2);

        const { isMobilePortrait } = getScreenInfo();
        if (isMobilePortrait && isDefaultCrypto) {
            setIsDefaultCrypto(false);
        }

        return (
            <Wrapper overflowVisible={contentViewMode === contentModeKeys.historyModeKey}>
                <CashHeader
                    contentMode={contentViewMode}
                    switchContentView={switchContentView}
                    balanceMaxValue={balanceMaxValue}
                    isDefaultCrypto={isDefaultCrypto}
                    setClaimNotify={setClaimNotify}
                    switchAppContentView={switchAppContentView}
                />

                {(contentViewMode === contentModeKeys.numPadModeKey || contentViewMode === contentModeKeys.qrScanModeKey || contentViewMode === contentModeKeys.qrScanReceiveModeKey) && (
                    <Numpad usdDigits={usdDigits} usdAmountFont={usdAmountFont} isOnedigit={isOnedigit}>
                        <div className={'usd-amount' + (contentViewMode === contentModeKeys.qrScanModeKey ? ' disabled' : '')} ref={el => { this.usdAmountRef = el; }}>
                            <CurrencyDropdownWithSymbol
                                isChild
                                isDisabled={true}
                                isMobile={true}
                                alignRight={false}
                                alignTop={false}
                                coinSize={65}
                                type={isMobilePortrait ? 'fiat' : 'currency'}
                            />

                            <span className="usd-integer">{this.usdIntegerVal}</span>
                            {(!this.integerFocus) && (
                                <Fragment>
                                    <span className="usd-decimal" ref={el => { this.decimalValRef = el; }}>{this.usdDecimalVal}</span>
                                    <span className="usd-decimal placeholder" ref={el => { this.placeHolderRef = el; }}>{placeHolderVal}</span>
                                </Fragment>
                            )}
                        </div>

                        {(contentViewMode === contentModeKeys.numPadModeKey ||
                            contentViewMode === contentModeKeys.qrScanModeKey ||
                            contentViewMode === contentModeKeys.qrScanReceiveModeKey) && (
                            <Fragment>
                                {contentViewMode === contentModeKeys.numPadModeKey && (
                                    <div className="num-pad">
                                        <div className="num-pad-row">
                                            <div className="num-pad-key" onClick={() => { this.keyPress('1'); }}>1</div>
                                            <div className="num-pad-key" onClick={() => { this.keyPress('2'); }}>2</div>
                                            <div className="num-pad-key" onClick={() => { this.keyPress('3'); }}>3</div>
                                        </div>
                                        <div className="num-pad-row">
                                            <div className="num-pad-key" onClick={() => { this.keyPress('4'); }}>4</div>
                                            <div className="num-pad-key" onClick={() => { this.keyPress('5'); }}>5</div>
                                            <div className="num-pad-key" onClick={() => { this.keyPress('6'); }}>6</div>
                                        </div>
                                        <div className="num-pad-row">
                                            <div className="num-pad-key" onClick={() => { this.keyPress('7'); }}>7</div>
                                            <div className="num-pad-key" onClick={() => { this.keyPress('8'); }}>8</div>
                                            <div className="num-pad-key" onClick={() => { this.keyPress('9'); }}>9</div>
                                        </div>
                                        <div className="num-pad-row">
                                            <div className="num-pad-key" onClick={() => { this.keyPress('.'); }}>.</div>
                                            <div className="num-pad-key" onClick={() => { this.keyPress('0'); }}>0</div>
                                            <div className="num-pad-key" onClick={() => { this.keyPress('Backspace'); }}>&#60;</div>
                                        </div>
                                        <div className="num-pad-bottom">
                                        </div>
                                    </div>
                                )}

                                {contentViewMode === contentModeKeys.qrScanModeKey && (
                                    <div className="qr-in-numpad">
                                        <AutoSizer>
                                            {({ width, height }) => {
                                                return (
                                                    <QRScanView
                                                        width={width}
                                                        height={height}
                                                    />
                                                );
                                            }}
                                        </AutoSizer>
                                    </div>
                                )}

                                {contentViewMode === contentModeKeys.qrScanReceiveModeKey && (
                                    <div className="qr-in-numpad">
                                        <AutoSizer>
                                            {({ width, height }) => {
                                                return (
                                                    <QRScanReceiverView
                                                        width={width}
                                                        height={height}
                                                    />
                                                );
                                            }}
                                        </AutoSizer>
                                    </div>
                                )}

                                {contentViewMode === contentModeKeys.qrScanReceiveModeKey && !isLoggedIn && (
                                    <LoginBtnWrapper>
                                        <TelegramLogin width={205} height={55}/>
                                    </LoginBtnWrapper>
                                )}

                                <PayButton
                                    className={contentViewMode !== contentModeKeys.numPadModeKey ? 'hidden' : ''}
                                    balanceValue={balanceValue.replace(',', '')}
                                    usdIntegerVal={this.usdIntegerVal}
                                    usdDecimalVal={this.usdDecimalVal + ((!this.integerFocus && Number.parseFloat(this.usdDecimalVal)) ? placeHolderVal : '')}
                                    defaultFiatSymbol={defaultFiatSymbol}
                                    isDefaultCrypto={isDefaultCrypto}
                                    defaultCryptoSymbol={defaultCryptoSymbol}
                                    convertToQRSection={() => this.convertToQRSection(defaultFiat, isDefaultCrypto, defaultCryptoSymbol)}
                                />
                            </Fragment>
                        )}
                    </Numpad>
                )}

                {contentViewMode === contentModeKeys.historyModeKey && (
                    <HistoryView
                        switchContentView={switchContentView}
                        setClaimNotify={setClaimNotify}
                        switchAppContentView={switchAppContentView}
                        balanceMaxValue={balanceMaxValue}
                    />
                )}

                {contentViewMode === contentModeKeys.qrScannerModeKey && (
                    <QRScanner />
                )}

                {isShowNotification && (qrObj !== null) && (
                    <CoinReceivePopup qrObj={qrObj}/>
                )}
            </Wrapper>
        );
    }
}

const withStore = compose(
    inject(
        STORE_KEYS.MODALSTORE,
        STORE_KEYS.COINADDRESSSTORE,
        STORE_KEYS.SENDCOINSTORE,
        STORE_KEYS.SETTINGSSTORE,
        STORE_KEYS.YOURACCOUNTSTORE,
        STORE_KEYS.PAYWINDOWSTORE,
        STORE_KEYS.TELEGRAMSTORE,
        STORE_KEYS.PAYAPPSTORE,
    ),
    observer,
    withProps(
        ({
            [STORE_KEYS.MODALSTORE]: {
                Modal,
            },
            [STORE_KEYS.SENDCOINSTORE]: {
                initTransferRequest,
                uniqueAddress,
            },
            [STORE_KEYS.SETTINGSSTORE]: {
                defaultCrypto,
                defaultFiatSymbol,
                defaultFiat,
                isDefaultCrypto,
                getDefaultPrice,
                defaultCryptoSymbol,
                getUSDPrice,
                setIsDefaultCrypto,
            },
            [STORE_KEYS.YOURACCOUNTSTORE]: {
                PortfolioData,
                requestPosition,
                PortfolioTotalValue,
            },
            [STORE_KEYS.PAYWINDOWSTORE]: {
                contentViewMode,
                switchContentView,
                openQRScan,
                qrObj,
                setQrObject,
                setClaimNotify,
            },
            [STORE_KEYS.PAYAPPSTORE]: {
                switchAppContentView,
            },
            [STORE_KEYS.TELEGRAMSTORE]: {
                isLoggedIn,
                setLoginBtnLocation,
            },
        }) => ({
            contentViewMode,
            switchContentView,
            openQRScan,
            qrObj,
            setQrObject,
            setClaimNotify,
            Modal,
            initTransferRequest,
            uniqueAddress,
            getUSDPrice,
            defaultCrypto,
            defaultFiatSymbol,
            defaultFiat,
            isDefaultCrypto,
            getDefaultPrice,
            setIsDefaultCrypto,
            PortfolioData,
            requestPosition,
            defaultCryptoSymbol,
            PortfolioTotalValue,
            isLoggedIn,
            setLoginBtnLocation,
            switchAppContentView,
        })
    )
);

export default withStore(PayWindow);
