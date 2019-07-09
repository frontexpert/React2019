import React, { Fragment } from 'react';
import { Tooltip } from 'react-tippy';
import { inject, observer } from 'mobx-react';
import partial from 'lodash.partial';

import StyleWrapper from './style';
import { STORE_KEYS } from '../../stores';
import { STATE_KEYS } from '../../stores/ConvertStore';
import { autoConvertOptions } from '../../stores/SettingsStore';
import {
    format7DigitString,
    withValueFromEvent,
    customDigitFormat,
    getScreenInfo
} from '../../utils';
import CoinIconStep2 from './CoinIconStep2';
import ExchDropdown from './ExchDropdownRV';
import SliderInput from './SliderInput/index';
import COIN_DATA_MAP from '../../mock/coin-data-map';
import OrderGradientButton from '../../components-generic/GradientButtonSquare';
import GradientButtonTimer from '../../components-generic/GradientButtonTimer';
import DataLoader from '../../components-generic/DataLoader';
import SwitchCustom from '../../components-generic/SwitchCustom';

import {
    Addon,
    AddonLabel,
    LoaderWrapper,
    WalletButtonCentered,
    SearchIcon
} from './Components';
import { viewModeKeys } from '../../stores/ViewModeStore';
import { valueNormalized } from '../../stores/utils/OrderEntryUtils';
import { donutChartModeStateKeys } from '../../stores/LowestExchangeStore';
import CoinNameStep2 from './CoinNameStep2';
import { orderFormToggleKeys } from '../../stores/OrderFormToggle';

const MIN_USD_AMOUNT = 20;

class CoinPairSearchV2 extends React.Component {
    state = {
        amount: '',
        isSwapped: false,
        isAmtInputFocused: false,
        isAmtChangedAfterFocus: false,
        isOpenLeftList: false,
        isOpenRightList: false,
    };

    wrapperRef = React.createRef();
    amtInputRef = React.createRef();
    countOfTrading = 0;
    arbitrageSubmitTimer = null;
    inProgressTradingTick = null;
    doneTradingTick = null;

    updateExecPlan = _.debounce(() => {
        const {
            [STORE_KEYS.LOWESTEXCHANGESTORE]: lowestExchange,
        } = this.props;
        lowestExchange.getExecPlan();
    }, 1000);

    componentDidMount() {
        window.addEventListener('resize', this.handleResizeWindow);
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    static getDerivedStateFromProps(props, state) {
        if (state.convertState !== props[STORE_KEYS.CONVERTSTORE].convertState) {
            return {
                convertState: props[STORE_KEYS.CONVERTSTORE].convertState,
            };
        }

        return null;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {
            [STORE_KEYS.CONVERTSTORE]: { setConvertState },
            [STORE_KEYS.LOWESTEXCHANGESTORE]: {
                updateExchange,
                isDonutChartLoading,
                resetDonutChartLoadingState,
            },
            [STORE_KEYS.EXCHANGESSTORE]: { setExchange },
        } = this.props;

        if (isDonutChartLoading === donutChartModeStateKeys.doneModeKey) {
            setConvertState(STATE_KEYS.amtInput);
            updateExchange(-1, '');
            setExchange('Global');
            resetDonutChartLoadingState();
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResizeWindow);
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleResizeWindow = () => {
        this.forceUpdate();
    };

    initTradeWith = (base, quote) => {
        const {
            [STORE_KEYS.INSTRUMENTS]: instrumentsStore,
            [STORE_KEYS.ORDERENTRY]: orderEntryStore,
            [STORE_KEYS.YOURACCOUNTSTORE]: yourAccountStore,
            [STORE_KEYS.LOWESTEXCHANGESTORE]: lowestExchange,
            [STORE_KEYS.VIEWMODESTORE]: viewModeStore,
            [STORE_KEYS.SETTINGSSTORE]: settingsStore,
            [STORE_KEYS.CONVERTSTORE]: convertStore,
        } = this.props;
        const { CoinsPairSearchMarketOrderBuyForm: orderForm } = orderEntryStore;
        const {
            setExchFormState, setBase, setQuote,
        } = instrumentsStore;
        const { setViewMode, openDepositView } = viewModeStore;
        const {
            portfolioData, setTargetBaseCoin, setTargetQuoteCoin, isAutoTrade, setAutoTrade,
        } = yourAccountStore;
        const { isAutoConvert, isArbitrageMode } = settingsStore;
        if (convertStore.forceStopArbitrageExchange) return;

        for (let i = 0; i < portfolioData.length; i++) {
            if (portfolioData[i] && (portfolioData[i].Coin === base)) {
                if (portfolioData[i].Position > 0.0001) {
                    orderForm.setAccurateAmount(portfolioData[i].Position);
                    orderForm.setSliderMax(portfolioData[i].Position);
                    orderForm.setAmount(portfolioData[i].Position);
                } else if ((isAutoConvert !== autoConvertOptions.Off) && !isAutoTrade) {
                    setAutoTrade(true);
                    setTargetBaseCoin(base);
                    setTargetQuoteCoin(quote);
                    setQuote(base);
                    setBase(yourAccountStore.maxCoin);
                    this.initTradeWith(yourAccountStore.maxCoin, base);
                    return;
                }
                break;
            }
        }
        openDepositView(null);
        lowestExchange.startExecPlan();
        setExchFormState(true);
        // setViewMode(viewModeKeys.exchangesModeKey);

        if (isArbitrageMode /* || isAutoConvert !== autoConvertOptions.Off */) {
            this.arbitrageSubmitTimer = setTimeout(() => {
                this.onSubmitOrder();
            }, 6000);
        }
    };

    // Step1 exchange button
    onStep1ExchangeBtnClicked = () => {
        const {
            [STORE_KEYS.INSTRUMENTS]: instrumentsStore,
            [STORE_KEYS.VIEWMODESTORE]: viewModeStore,
            [STORE_KEYS.SETTINGSSTORE]: settingsStore,
            [STORE_KEYS.ORDERFORMTOGGLE]: orderformToggleStore,
            [STORE_KEYS.CONVERTSTORE]: convertStore,
        } = this.props;

        if (settingsStore.isArbitrageMode) {
            viewModeStore.setGraphSwitchMode(true);
        } else {
            viewModeStore.setGraphSwitchMode(false);
        }
        viewModeStore.showDepthChartMode(false);
        orderformToggleStore.showOrderFormWith(orderFormToggleKeys.offToggleKey);
        viewModeStore.setViewMode(viewModeKeys.basicModeKey);
        viewModeStore.setTradingViewMode(false);
        convertStore.setForceStopArbitrageExchange(false);
        this.initTradeWith(instrumentsStore.selectedBase, instrumentsStore.selectedQuote);
    };

    handleDoneBtnClick = (isConvertSuccess) => {
        const {
            [STORE_KEYS.CONVERTSTORE]: convertStore,
            [STORE_KEYS.SETTINGSSTORE]: settingsStore,
            [STORE_KEYS.YOURACCOUNTSTORE]: yourAccountStore,
            [STORE_KEYS.INSTRUMENTS]: instrumentStore,
            [STORE_KEYS.ORDERENTRY]: orderEntryStore,
            [STORE_KEYS.TELEGRAMSTORE]: telegramStore,
        } = this.props;
        const { CoinsPairSearchMarketOrderBuyForm: orderForm } = orderEntryStore;
        const { autoFlip, isArbitrageMode } = settingsStore;
        const {
            setBase, setQuote, selectedBase, selectedQuote,
        } = instrumentStore;
        const {
            isAutoTrade, setAutoTrade, targetBaseCoin, targetQuoteCoin, getRecentPosition,
        } = yourAccountStore;
        const { isLoggedIn } = telegramStore;
        if (convertStore.forceStopArbitrageExchange) return;

        if (!isLoggedIn) {
            convertStore.setConvertState(STATE_KEYS.orderDone);
            this.onOrderDone(isConvertSuccess);
        } else if (isArbitrageMode) {
            getRecentPosition()
                .then((recentPositionData) => {
                    if (convertStore.forceStopArbitrageExchange) {
                        return;
                    }
                    setBase(selectedQuote);
                    setQuote(selectedBase);

                    let resourceAmount = 0;
                    for (let i = 0; i < recentPositionData.length; i++) {
                        if (recentPositionData[i] && (recentPositionData[i].Coin === selectedQuote)) {
                            if (recentPositionData[i].Position > 0.0001) {
                                resourceAmount = recentPositionData[i].Position;
                                orderForm.setAccurateAmount(resourceAmount);
                                orderForm.setSliderMax(resourceAmount);
                                orderForm.setAmount(resourceAmount);
                            }
                            break;
                        }
                    }
                    if (resourceAmount > 0 && !convertStore.forceStopArbitrageExchange) {
                        setTimeout(() => {
                            convertStore.setConvertState(STATE_KEYS.amtInput);
                            this.initTradeWith(selectedQuote, selectedBase);
                        }, 0);
                    } else {
                        convertStore.showConvertState('Previous trading amount is Zero now. Please check network state.');
                        setTimeout(() => {
                            convertStore.setConvertState(STATE_KEYS.orderDone);
                            this.onOrderDone(isConvertSuccess);
                        }, 2000);
                    }
                })
                .catch(err => {
                    convertStore.showConvertState('No portfolio data come from backend. Please check network state.');
                    setTimeout(() => {
                        convertStore.setConvertState(STATE_KEYS.orderDone);
                        this.onOrderDone(isConvertSuccess);
                    }, 2000);
                });
        } else if (isAutoTrade) {
            setAutoTrade(false);
            setBase(targetBaseCoin);
            setQuote(targetQuoteCoin);
            if (!convertStore.forceStopArbitrageExchange) {
                setTimeout(() => {
                    this.initTradeWith(targetBaseCoin, targetQuoteCoin);
                }, 3000);
            }
        } else {
            // this.onOrderDone(isConvertSuccess);
            setBase(selectedQuote);
            setQuote(selectedBase);
            convertStore.setConvertState(STATE_KEYS.amtInput);
            this.initTradeWith(selectedQuote, selectedBase);
        }
    };

    onOrderDone = (isConvertSuccess) => {
        const {
            [STORE_KEYS.CONVERTSTORE]: {
                setConvertState,
                convertState,
            },
            [STORE_KEYS.LOWESTEXCHANGESTORE]: {
                setDonutModeFinishedForLabel,
                resetExecPlan,
                updateExchange,
            },
            [STORE_KEYS.EXCHANGESSTORE]: { setExchange },
            [STORE_KEYS.PORTFOLIODATASTORE]: portfolioDataStore,
            [STORE_KEYS.YOURACCOUNTSTORE]: yourAccountStore,
            [STORE_KEYS.TELEGRAMSTORE]: telegramStore,
            [STORE_KEYS.SETTINGSSTORE]: settingsStore,
            [STORE_KEYS.VIEWMODESTORE]: viewModeStore,
            [STORE_KEYS.ORDERFORMTOGGLE]: orderformToggleStore,
        } = this.props;
        const { isLoggedIn, setLoginBtnLocation } = telegramStore;
        const { autoFlip, isArbitrageMode } = settingsStore;
        const {
            setResetC1Mode, isAutoTrade, resetWalletTableState, setAutoTrade, targetBaseCoin, targetQuoteCoin,
        } = yourAccountStore;
        const { showDepthChartMode, setTradingViewMode, setViewMode } = viewModeStore;

        setViewMode(viewModeKeys.basicModeKey);
        if (convertState === STATE_KEYS.orderDone) {
            setDonutModeFinishedForLabel(true);
            setConvertState(STATE_KEYS.coinSearch);
            resetExecPlan();
            updateExchange(-1, '');
            setExchange('Global');
            if (!isLoggedIn) {
                setTimeout(() => {
                    setLoginBtnLocation(true);
                }, 2000);
            }
            showDepthChartMode(false);
            setTradingViewMode(false);
            portfolioDataStore.requestPortfolioData('minute');
            portfolioDataStore.setActiveState(true);
            orderformToggleStore.showOrderFormWith(orderFormToggleKeys.offToggleKey);
            if (isConvertSuccess && autoFlip !== 'Disabled' && !isAutoTrade) {
                this.toggleSwap();
            } else {
                setResetC1Mode(true);
            }
            resetWalletTableState();
        }
    };

    onSubmitOrder = () => {
        const {
            [STORE_KEYS.INSTRUMENTS]: instrumentsStore,
            [STORE_KEYS.CONVERTSTORE]: convertStore,
            [STORE_KEYS.ORDERENTRY]: orderEntryStore,
            [STORE_KEYS.YOURACCOUNTSTORE]: yourAccountStore,
            [STORE_KEYS.LOWESTEXCHANGESTORE]: lowestExchangeStore,
            [STORE_KEYS.EXCHANGESSTORE]: { setExchange },
            [STORE_KEYS.ORDERHISTORY]: orderHistoryStore,
            [STORE_KEYS.PORTFOLIODATASTORE]: portfolioDataStore,
            [STORE_KEYS.TELEGRAMSTORE]: telegramStore,
            [STORE_KEYS.SETTINGSSTORE]: settingsStore,
        } = this.props;
        const { CoinsPairSearchMarketOrderBuyForm: orderForm } = orderEntryStore;
        const { setExchFormState, selectedBase, selectedQuote } = instrumentsStore;
        const { setPortfolioGraphRange } = portfolioDataStore;
        const { isLoggedIn } = telegramStore;

        if (convertStore.forceStopArbitrageExchange) {
            return;
        }

        setExchFormState(false);
        lowestExchangeStore.clearExecPlanInterval();

        const c1ItemIndex = yourAccountStore.portfolioData.findIndex(x => (x && x.Coin === selectedBase));
        const c1BeforePosition = yourAccountStore.portfolioData[c1ItemIndex] ? yourAccountStore.portfolioData[c1ItemIndex].Position : 0;
        const c2ItemIndex = yourAccountStore.portfolioData.findIndex(x => (x && x.Coin === selectedQuote));
        const c2BeforePosition = yourAccountStore.portfolioData[c2ItemIndex] ? yourAccountStore.portfolioData[c2ItemIndex].Position : 0;
        const amount = orderForm.Amount;
        const price = orderForm.Price;

        if (convertStore.convertState === STATE_KEYS.amtInput) {
            lowestExchangeStore.updateConfirmed(true);
            convertStore.setConvertState(STATE_KEYS.submitOrder);
            let _this = this;

            if (isLoggedIn) {
                orderForm.submitOrder();
                // setPortfolioGraphRange('1 min');
                let startPoint = new Date().getTime();

                this.inProgressTradingTick = setInterval(() => {
                    if (convertStore.forceStopArbitrageExchange) return;
                    let endTime = lowestExchangeStore.endPacketTime;
                    let delta = Math.abs((new Date().getTime()) - endTime);
                    let delta2 = Math.abs(new Date().getTime() - startPoint);

                    if ((endTime !== 0 && delta >= 3000) || (endTime === 0 && delta2 >= 30000)) {
                        let isConvertSuccess = true;
                        if (endTime === 0 && delta2 >= 30000) {
                            convertStore.showConvertState('Order Execution is failed.');
                            isConvertSuccess = false;
                            let transaction = [selectedBase, selectedQuote, amount, price, c1BeforePosition, c2BeforePosition, 'Failed', c1BeforePosition, c2BeforePosition];
                            settingsStore.orderHistory(transaction);
                        } else if (endTime !== 0 && delta >= 3000) {
                            convertStore.showConvertState('Order Execution is successful.');
                            isConvertSuccess = true;
                            let transaction = [selectedBase, selectedQuote, amount, price, c1BeforePosition, c2BeforePosition, 'Success', c1BeforePosition - amount, Number(c2BeforePosition) + Number(amount * price)];
                            settingsStore.orderHistory(transaction);
                        }
                        convertStore.setConvertState(STATE_KEYS.orderDone);
                        yourAccountStore.requestPosition();
                        // lowestExchangeStore.resetExecPlan();
                        orderHistoryStore.requestOrderHistory();
                        lowestExchangeStore.stopExecPlan();
                        lowestExchangeStore.updateExchange(-1, '');
                        setExchange('Global');
                        if (this.inProgressTradingTick) {
                            clearInterval(this.inProgressTradingTick);
                        }
                        if (this.doneTradingTick) {
                            clearTimeout(this.doneTradingTick);
                        }
                        this.doneTradingTick = setTimeout(() => {
                            if (convertStore.forceStopArbitrageExchange) return;
                            _this.handleDoneBtnClick(isConvertSuccess);
                        }, 2000);
                    }
                }, 1000);
            } else {
                /**
                 *  Will not send order request to backend if they didn't log in
                 *  ( Show mock color advancing )
                 */
                lowestExchangeStore.startMockColorAdvance();
                setTimeout(() => {
                    convertStore.setConvertState(STATE_KEYS.orderDone);
                    lowestExchangeStore.stopExecPlan();
                    _this.handleDoneBtnClick();
                }, 8000);
            }
        }
    };

    handleClickOutside = (event) => {
        if (this.wrapperRef.current && !this.wrapperRef.current.contains(event.target)) {
            const { [STORE_KEYS.ORDERENTRY]: { CoinsPairSearchMarketOrderBuyForm: orderForm } } = this.props;
            this.setState({
                isAmtInputFocused: false,
            });

            this.amtInputRef.current.blur();
            if (orderForm.sliderMax < orderForm.amount) {
                orderForm.setAmount(orderForm.sliderMax || 0);
                this.updateExecPlan();
            }
        }
    };

    handleAmtInputFocus = () => {
        this.setState({
            amount: '',
            isAmtInputFocused: true,
            isAmtChangedAfterFocus: false,
        });
    };

    handleAmtInputBlur = () => {
        // const { CoinsPairSearchMarketOrderBuyForm: orderForm } = this.props.orderEntryStore;
        // const valueParsed = Number.parseFloat(value);
        // if (valueParsed > orderForm.sliderMax) {
        //     let oldValue = String(this.state.amount);
        //     let newValue = format7DigitString(valueNormalized(oldValue, orderForm.sliderMax));
        //
        //     orderForm.setAmount(orderForm.sliderMax || 0);
        //     this.updateExecPlan();
        //
        //     this.setState({
        //         amount: newValue,
        //         isAmtInputFocused: false,
        //     });
        //     return;
        // }

        this.setState({
            isAmtInputFocused: false,
        });
    };

    handleAmountChange = (event) => {
        // const valueParsed = Number.parseFloat(value);
        // if (valueParsed > orderForm.sliderMax) {
        //     return;
        // }

        const { [STORE_KEYS.ORDERENTRY]: { CoinsPairSearchMarketOrderBuyForm: orderForm } } = this.props;
        const value = event.target.value;

        let oldValue = String(this.state.amount);
        let newValue = valueNormalized(oldValue, value);

        orderForm.setAmount(newValue || 0);
        this.updateExecPlan();

        this.setState({
            amount: newValue,
            isAmtChangedAfterFocus: true,
        });
    };

    toggleSwap = () => {
        this.setState(prevProp => ({
            isSwapped: !prevProp.isSwapped,
        }));
        this.props[STORE_KEYS.INSTRUMENTS].swapBaseQuote();
    };

    toggleLeftList = () => {
        this.setState(prevState => ({
            isOpenLeftList: !prevState.isOpenLeftList,
        }));
    };

    toggleLeftListWith = () => {
        const {
            [STORE_KEYS.CONVERTSTORE]: convertStore,
            [STORE_KEYS.LOWESTEXCHANGESTORE]: lowestExchange,
            [STORE_KEYS.EXCHANGESSTORE]: { setExchange },
        } = this.props;
        if (convertStore.convertState !== STATE_KEYS.submitOrder && convertStore.convertState !== STATE_KEYS.orderDone) {
            convertStore.gotoFirstState();
            this.toggleLeftList();
            lowestExchange.updateExchange(-1, '');
            setExchange('Global');
            lowestExchange.resetDonutChartLoadingState();
        }
    };

    toggleRightList = () => {
        this.setState(prevState => ({
            isOpenRightList: !prevState.isOpenRightList,
        }));
    };

    toggleRightListWith = () => {
        const {
            [STORE_KEYS.CONVERTSTORE]: convertStore,
            [STORE_KEYS.LOWESTEXCHANGESTORE]: lowestExchange,
            [STORE_KEYS.EXCHANGESSTORE]: { setExchange },
        } = this.props;
        if (convertStore.convertState !== STATE_KEYS.submitOrder && convertStore.convertState !== STATE_KEYS.orderDone) {
            convertStore.setConvertState(STATE_KEYS.amtInput);
            this.toggleRightList();
            lowestExchange.updateExchange(-1, '');
            setExchange('Global');
            lowestExchange.resetDonutChartLoadingState();
        }
    };

    onCancelTrading = () => {
        const {
            [STORE_KEYS.INSTRUMENTS]: instrumentsStore,
            [STORE_KEYS.CONVERTSTORE]: convertStore,
            [STORE_KEYS.LOWESTEXCHANGESTORE]: lowestExchangeStore,
            [STORE_KEYS.EXCHANGESSTORE]: { setExchange },
            [STORE_KEYS.VIEWMODESTORE]: viewModeStore,
            [STORE_KEYS.SETTINGSSTORE]: settingsStore,
            [STORE_KEYS.YOURACCOUNTSTORE]: { setResetC1Mode },
            [STORE_KEYS.ORDERFORMTOGGLE]: orderFormToggleStore,
        } = this.props;

        const { setExchFormState } = instrumentsStore;
        const {
            updateExchange, stopExecPlan,
            clearExecPlanInterval,
        } = lowestExchangeStore;
        const {
            setViewMode, showDepthChartMode, setTradingViewMode,
        } = viewModeStore;
        const {
            setArbitrageModeWith,
        } = settingsStore;
        const { showOrderFormWith } = orderFormToggleStore;

        if (this.inProgressTradingTick) clearInterval(this.inProgressTradingTick);
        if (this.arbitrageSubmitTimer) clearTimeout(this.arbitrageSubmitTimer);
        if (this.doneTradingTick) clearTimeout(this.doneTradingTick);
        setTradingViewMode(false);
        updateExchange(-1, '');
        setExchange('Global');
        convertStore.setForceStopArbitrageExchange(true);
        setExchFormState(false);
        stopExecPlan();
        setViewMode(viewModeKeys.basicModeKey);
        clearExecPlanInterval();
        showDepthChartMode(false);
        setArbitrageModeWith(false);
        showOrderFormWith(orderFormToggleKeys.offToggleKey);
        setResetC1Mode(true);
        convertStore.setConvertState(STATE_KEYS.coinSearch);
    };

    onSubmitOrderByTimer = () => {
        const {
            [STORE_KEYS.SETTINGSSTORE]: settingsStore,
            [STORE_KEYS.TELEGRAMSTORE]: telegramStore,
            [STORE_KEYS.CONVERTSTORE]: convertStore,
        } = this.props;
        const { isLoggedIn } = telegramStore;

        this.countOfTrading++;
        if (this.countOfTrading >= 2) {
            this.countOfTrading = 0;
            if (isLoggedIn) settingsStore.setArbitrageMode(true);
        }
        this.onSubmitOrder();
    };

    render() {
        const {
            isSwapped,
            isAmtInputFocused,
            isAmtChangedAfterFocus,
            amount: amountFromState,
            isOpenLeftList,
            isOpenRightList,
        } = this.state;

        const {
            [STORE_KEYS.INSTRUMENTS]: instrumentsStore,
            [STORE_KEYS.CONVERTSTORE]: convertStore,
            [STORE_KEYS.ORDERENTRY]: orderEntryStore,
            [STORE_KEYS.YOURACCOUNTSTORE]: yourAccountStore,
            [STORE_KEYS.LOWESTEXCHANGESTORE]: lowestExchangeStore,
            [STORE_KEYS.EXCHANGESSTORE]: { setExchange },
            [STORE_KEYS.VIEWMODESTORE]: viewModeStore,
            [STORE_KEYS.SETTINGSSTORE]: settingsStore,
            [STORE_KEYS.TELEGRAMSTORE]: telegramStore,
            [STORE_KEYS.TRADINGVIEWSTORE]: tradingViewStore,
            [STORE_KEYS.MODALSTORE]: modalStore,
            [STORE_KEYS.ORDERBOOK]: orderBookStore,
            [STORE_KEYS.COINADDRESSSTORE]: coinAddressStore,
        } = this.props;

        const { CoinsPairSearchMarketOrderBuyForm: orderForm } = orderEntryStore;
        const { sliderMax } = orderForm;
        const { setExchFormState, selectedBase, selectedQuote } = instrumentsStore;
        const {
            updateExchange, averagePrice, stopExecPlan, totalPrice, isDonutChartLoading,
            clearExecPlanInterval, isDelayed, isNoExchanges, isAutoTradingLoading,
        } = lowestExchangeStore;
        const { setDynamicCoinPair, showConvertState } = convertStore;
        const {
            setViewMode, showDepthChartMode, setTradingViewMode,
        } = viewModeStore;
        const { isLoggedIn, setLoginBtnLocation } = telegramStore;

        const {
            isShortSell,
            isArbitrageMode,
            setShortSell,
            setArbitrageMode,
            setArbitrageModeWith,
            defaultFiat,
            getLocalPrice,
            defaultFiatSymbol,
            isAutoConvert,
            swap,
            slider,
            c1,
            getLocalCurrency,
            timer,
        } = settingsStore;
        const { createDepositAddress, coinDepositAddress } = coinAddressStore;

        const {
            setCoinListOpen,
        } = tradingViewStore;

        const {
            open: modalOpened,
        } = modalStore;

        const {
            isFetchingBestRates,
        } = orderBookStore;

        const isSwapMode = swap === 'Swap';

        let baseList = [...instrumentsStore.Bases];
        let quoteList = [...instrumentsStore.Quotes];
        let coinsInMyWallet = [];
        let coinsInRecent = [];
        let isStep1ExchangeBtnDisabled = isAutoConvert === autoConvertOptions.Off;
        let isDynamicCoinPair = true;
        let isArbitrageCondition = false;
        let baseCoinUSDPrice = 0;
        let quoteCoinUSDPrice = 0;
        let baseCoinPosition = 0;

        const {
            screenWidth,
            isMobileDevice,
            gridHeight,
        } = getScreenInfo();

        /*
        // ----------------------------------
        if (!isShortSell) { // http://prntscr.com/mcmcss
            if (!isLoggedIn) {
                const index = baseList.findIndex(x => (x && x.symbol && x.symbol === 'BTC'));
                const bListItem = baseList[index];
                baseList = [];
                baseList[0] = bListItem;
            } else {
                let tempList = [];
                for (let i = 0; i < yourAccountStore.portfolioData.length; i++) {
                    if (yourAccountStore.portfolioData[i]) {
                        const balance = Number.parseFloat(yourAccountStore.portfolioData[i].Position);
                        if (balance < 0 || balance > 0.0001) {
                            for (let j = 0; j < baseList.length; j++) {
                                if (baseList[j].symbol === yourAccountStore.portfolioData[i].Coin && baseList[j].symbol !== 'BCT') {
                                    tempList.push(baseList[j]);
                                    break;
                                }
                            }
                        }
                    }
                }
                baseList = tempList;
            }

            const index = quoteList.findIndex(x => (x && x.symbol && x.symbol === 'BCT'));
            quoteList.splice(index, 1);
        } */

        // ----------------------------------
        const bctIndexOfBase = baseList.findIndex(x => (x && x.symbol && x.symbol === 'BCT'));
        const bctIndexOfQuote = quoteList.findIndex(x => (x && x.symbol && x.symbol === 'BCT'));
        if (isArbitrageMode) {
            /**
             * Set USDT in C2 always
             */
            const usdtIndexOfQuote = quoteList.findIndex(x => (x && x.symbol && x.symbol === 'USDT'));
            const usdtIndexOfBase = baseList.findIndex(x => (x && x.symbol && x.symbol === 'USDT'));

            if (usdtIndexOfQuote !== -1) {
                const usdtObj = quoteList[usdtIndexOfQuote];
                quoteList = [];
                quoteList.push(usdtObj);
                isArbitrageCondition = true;
            } else {
                quoteList.splice(bctIndexOfQuote, 1);
            }
            /**
             *  Remove BCT from C1, C2
             */
            if (usdtIndexOfBase < bctIndexOfBase) {
                baseList.splice(bctIndexOfBase, 1);
                baseList.splice(usdtIndexOfBase, 1);
            } else {
                baseList.splice(usdtIndexOfBase, 1);
                baseList.splice(bctIndexOfBase, 1);
            }
        } else {
            /**
             *  Remove BCT from C1, C2
             */
            baseList.splice(bctIndexOfBase, 1);
            quoteList.splice(bctIndexOfQuote, 1);
        }

        // ----------------------------------
        // Get coins in my wallet as MAP array
        // This builds top group of dropdown, removing items in top group from bottom group.
        for (let i = 0; i < yourAccountStore.portfolioData.length; i++) {
            if (yourAccountStore.portfolioData[i] && (Number.parseFloat(yourAccountStore.portfolioData[i].Position) > 0.0001)) { // low limit is 0.0001
                // coin is in wallet, if baseList has it, remove from base list and add here, if not, just add new disabled one to list.
                const symbol = yourAccountStore.portfolioData[i].Coin;

                // Disabled TopGroupItems, 2019-01-11

                const index = baseList.findIndex(x => x.symbol === symbol);
                if (index === -1) {
                    if (COIN_DATA_MAP[symbol]) {
                        coinsInMyWallet.push({
                            ...COIN_DATA_MAP[symbol],
                            enabled: false,
                            position: yourAccountStore.portfolioData[i].Position,
                        });
                    } else {
                        coinsInMyWallet.push({
                            name: symbol,
                            symbol,
                            enabled: false,
                            position: yourAccountStore.portfolioData[i].Position,
                        });
                    }
                } else {
                    coinsInMyWallet.push(
                        {
                            ...baseList[index],
                            position: yourAccountStore.portfolioData[i].Position,
                        }
                    );
                    baseList.splice(index, 1);
                }

                if (symbol === instrumentsStore.selectedBase /* && instrumentsStore.selectedBaseEnabled && instrumentsStore.selectedQuoteEnabled */) {
                    isStep1ExchangeBtnDisabled = false;
                    isDynamicCoinPair = instrumentsStore.selectedBaseEnabled && instrumentsStore.selectedQuoteEnabled;
                    setDynamicCoinPair(isDynamicCoinPair);
                }
            }
            if (yourAccountStore.portfolioData[i] && (yourAccountStore.portfolioData[i].Coin === instrumentsStore.selectedBase)) {
                baseCoinUSDPrice = yourAccountStore.portfolioData[i].Price;
                baseCoinPosition = yourAccountStore.portfolioData[i].Position;
            }
            if (yourAccountStore.portfolioData[i] && (yourAccountStore.portfolioData[i].Coin === instrumentsStore.selectedQuote)) {
                quoteCoinUSDPrice = yourAccountStore.portfolioData[i].Price;
            }
        }

        // ----------------------------------
        if (!isArbitrageCondition) {
            for (let i = 0; i < instrumentsStore.recentQuotes.length; i++) {
                const symbol = instrumentsStore.recentQuotes[i];
                if (symbol !== instrumentsStore.selectedBase) {
                    const index = quoteList.findIndex(x => x.symbol === symbol);
                    const itemIndex = yourAccountStore.portfolioData.findIndex(x => (x && x.Coin === symbol));
                    if (index === -1) {
                        if (COIN_DATA_MAP[symbol]) {
                            coinsInRecent.push({
                                ...COIN_DATA_MAP[symbol],
                                enabled: false,
                                position: yourAccountStore.portfolioData[itemIndex] ? yourAccountStore.portfolioData[itemIndex].Position : 0,
                            });
                        } else {
                            coinsInRecent.push({
                                name: symbol,
                                symbol,
                                enabled: false,
                                position: yourAccountStore.portfolioData[itemIndex] ? yourAccountStore.portfolioData[itemIndex].Position : 0,
                            });
                        }
                    } else {
                        coinsInRecent.push(
                            {
                                ...quoteList[index],
                                position: yourAccountStore.portfolioData[itemIndex] ? yourAccountStore.portfolioData[itemIndex].Position : 0,
                            }
                        );
                        quoteList.splice(index, 1);
                    }
                }
            }
        }

        return (
            <StyleWrapper
                innerRef={this.wrapperRef}
                modalOpened={modalOpened}
                gridHeight={gridHeight}
            >
                <div
                    className={'coin-pair-form-inner-wrapper' + (convertStore.convertState !== STATE_KEYS.coinSearch ? ' open' : '')}
                >
                    {/* ----------Step 1----------*/}
                    <div className="exch-head">
                        <div className="exch-head__send">
                            <ExchDropdown
                                value={instrumentsStore.selectedBase}
                                onChange={(val) => {
                                    instrumentsStore.setBase(val);
                                    setViewMode(viewModeKeys.basicModeKey);
                                    showDepthChartMode(false);
                                    setTradingViewMode(false);
                                }}
                                onClick={() => {
                                    yourAccountStore.resetWalletTableState();
                                }}
                                setSelectedCoin={yourAccountStore.setSelectedCoin}
                                openDepositView={viewModeStore.openDepositView}
                                mainItems={c1 === 'All Coins' ? baseList : []}
                                topGroupEnabled
                                topGroupLabel="Your Coins"
                                topGroupItems={coinsInMyWallet}
                                isArbitrageMode={isArbitrageMode}
                                isShortSell={isShortSell}
                                selectedBase={selectedBase}
                                selectedQuote={selectedQuote}
                                isLeft={true}
                                setCoinListOpen={setCoinListOpen}
                                isOpen={isOpenLeftList}
                                toggleDroplist={this.toggleLeftList}
                                defaultFiat={defaultFiat}
                                isLoggedIn={isLoggedIn}
                                setLoginBtnLocation={setLoginBtnLocation}
                                createDepositAddress={createDepositAddress}
                                coinDepositAddress={coinDepositAddress}
                                isMobile={isMobileDevice || screenWidth < 1024}
                                notifyMsg={showConvertState}
                                addon={
                                    <Addon>
                                        <AddonLabel>Store Credit</AddonLabel>
                                        <SwitchCustom checked={isShortSell} onChange={setShortSell}/>
                                    </Addon>
                                }
                            />
                        </div>

                        <Tooltip
                            style={{ display : 'flex' }}
                            arrow={true}
                            animation="shift"
                            position="bottom"
                            followCursor
                            theme="bct"
                            title={`Convert ${instrumentsStore.selectedBase} to ${instrumentsStore.selectedQuote}`}
                        >
                            {
                                (isShortSell || isSwapMode) ? (
                                    <button className={'exch-head__switch' + (isSwapped ? ' switched' : '')} onClick={this.toggleSwap}>
                                        <svg className="exch-form__switch-arrows" viewBox="0 0 8.8106 6.7733">
                                            <g transform="translate(0 -290.23)" strokeMiterlimit="10" strokeWidth=".26327">
                                                <path d="m2.1205 292.68h4.6888v0.93039c0 0.0419 0.015007 0.0782 0.045808 0.10899 0.030802 0.0305 0.067133 0.0461 0.10899 0.0461 0.045019 0 0.082403-0.0145 0.11136-0.0434l1.5506-1.5509c0.028959-0.0287 0.043439-0.0661 0.043439-0.11136 0-0.045-0.014481-0.0821-0.043702-0.1111l-1.5454-1.5459c-0.038963-0.0321-0.077664-0.0484-0.11663-0.0484-0.045282 0-0.082403 0.0145-0.1111 0.0437-0.028959 0.0287-0.043439 0.0661-0.043439 0.11136v0.93038h-4.6888c-0.042123 0-0.078454 0.015-0.10899 0.0458-0.030539 0.0311-0.046072 0.0671-0.046072 0.10926v0.93012c0 0.0421 0.015533 0.0784 0.046072 0.10926 0.030539 0.0303 0.06687 0.0458 0.10899 0.0458z"/>
                                                <path d="m6.6807 294.54h-4.6888v-0.93038c0-0.0421-0.015269-0.0785-0.045545-0.10873-0.031065-0.0308-0.067133-0.0463-0.10926-0.0463-0.045282 0-0.082139 0.0145-0.11163 0.0437l-1.5504 1.5504c-0.028959 0.0292-0.043439 0.0661-0.043439 0.11137 0 0.0421 0.01448 0.0774 0.043439 0.10662l1.5459 1.5506c0.038437 0.0321 0.0774 0.0482 0.1161 0.0482 0.042123 0 0.07819-0.015 0.10926-0.0458 0.030539-0.0308 0.045545-0.0671 0.045545-0.10925v-0.93013h4.6888c0.041859 0 0.07819-0.0153 0.10899-0.0458 0.030802-0.0308 0.046072-0.0671 0.046072-0.10926v-0.93039c0-0.0419-0.015269-0.0779-0.046072-0.10899-0.030802-0.0303-0.06687-0.0458-0.10899-0.0458z"/>
                                            </g>
                                        </svg>
                                    </button>
                                ) : (
                                    <button className={'exch-head__switch shortsell' + (isSwapped ? ' switched' : '')}>
                                        <svg className="exch-form__switch-arrows" viewBox="0 0 8.8106 6.7733" xmlns="http://www.w3.org/2000/svg">
                                            <g transform="matrix(1.2645 0 0 1.2645 -2.3188 -365.95)" strokeMiterlimit="10" strokeWidth=".26327">
                                                <path d="m2.1205 292.68h4.6888v0.93039c0 0.0419 0.015007 0.0782 0.045808 0.10899 0.030802 0.0305 0.067133 0.0461 0.10899 0.0461 0.045019 0 0.082403-0.0145 0.11136-0.0434l1.5506-1.5509c0.028959-0.0287 0.043439-0.0661 0.043439-0.11136 0-0.045-0.014481-0.0821-0.043702-0.1111l-1.5454-1.5459c-0.038963-0.0321-0.077664-0.0484-0.11663-0.0484-0.045282 0-0.082403 0.0145-0.1111 0.0437-0.028959 0.0287-0.043439 0.0661-0.043439 0.11136v0.93038h-4.6888c-0.042123 0-0.078454 0.015-0.10899 0.0458-0.030539 0.0311-0.046072 0.0671-0.046072 0.10926v0.93012c0 0.0421 0.015533 0.0784 0.046072 0.10926 0.030539 0.0303 0.06687 0.0458 0.10899 0.0458z"/>
                                            </g>
                                        </svg>
                                    </button>
                                )
                            }
                        </Tooltip>

                        <div className="exch-head__get">
                            <ExchDropdown
                                value={instrumentsStore.selectedQuote}
                                onChange={(val) => {
                                    instrumentsStore.setQuote(val);
                                    instrumentsStore.addRecentQuote(val);
                                    setViewMode(viewModeKeys.basicModeKey);
                                    showDepthChartMode(false);
                                    setTradingViewMode(false);
                                }}
                                onClick={() => {}}
                                setSelectedCoin={yourAccountStore.setSelectedCoin}
                                openDepositView={viewModeStore.openDepositView}
                                mainItems={quoteList}
                                topGroupEnabled={true}
                                topGroupLabel="Recent"
                                topGroupItems={coinsInRecent}
                                isArbitrageMode={isArbitrageMode}
                                isShortSell={isShortSell}
                                selectedBase={selectedBase}
                                selectedQuote={selectedQuote}
                                isLeft={false}
                                setCoinListOpen={setCoinListOpen}
                                isOpen={isOpenRightList}
                                toggleDroplist={this.toggleRightList}
                                defaultFiat={defaultFiat}
                                isLoggedIn={isLoggedIn}
                                setLoginBtnLocation={setLoginBtnLocation}
                                createDepositAddress={createDepositAddress}
                                coinDepositAddress={coinDepositAddress}
                                isMobile={isMobileDevice || screenWidth < 1200}
                                notifyMsg={showConvertState}
                                addon={
                                    <Addon>
                                        <AddonLabel>Arbitrage</AddonLabel>
                                        <SwitchCustom checked={isArbitrageMode} onChange={setArbitrageMode}/>
                                    </Addon>
                                }
                            />
                        </div>

                        <OrderGradientButton
                            className={'exch-head__btnv2 primary-solid search-btn' + (isDonutChartLoading === donutChartModeStateKeys.loadingModeKey ? ' progress' : '')}
                            disabled={isStep1ExchangeBtnDisabled || isDonutChartLoading !== donutChartModeStateKeys.defaultModeKey || isNoExchanges || isFetchingBestRates}
                            // disabled={isDonutChartLoading !== donutChartModeStateKeys.defaultModeKey}
                            onClick={this.onStep1ExchangeBtnClicked}
                            height={60}
                        >
                            {(isDonutChartLoading === donutChartModeStateKeys.defaultModeKey && !isFetchingBestRates)
                                ? (
                                    isStep1ExchangeBtnDisabled && baseCoinPosition < 0.0001
                                        ? (
                                            <WalletButtonCentered>
                                                0 <span className="unit">{selectedBase}</span>
                                            </WalletButtonCentered>
                                        )
                                        : (
                                            <div className="exch-head__btnv2__content">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23.03 38.81">
                                                    <path d="M23,19.4,4.4,38A2.49,2.49,0,0,1,.78,38a2.49,2.49,0,0,1,0-3.62l15-15-15-15A2.49,2.49,0,0,1,.78.78,2.49,2.49,0,0,1,4.4.78Z"/>
                                                </svg>
                                            </div>
                                        )
                                ) : (
                                    <DataLoader/>
                                )
                            }
                        </OrderGradientButton>
                    </div>
                    {/* ----------End Step 1----------*/}

                    {/* ----------Step 2----------*/}
                    <div
                        className={
                            'exch-form' + ((convertStore.convertState === STATE_KEYS.submitOrder ? ' progress' : '') +
                                (convertStore.convertState === STATE_KEYS.orderDone ? ' completed' : '') +
                                (convertStore.convertState === STATE_KEYS.amtInput ? ' amountInput' : ''))
                        }
                    >
                        <div className="exch-form__send">
                            <CoinIconStep2 value={instrumentsStore.selectedBase} defaultFiat={defaultFiat} onClick={this.toggleLeftListWith}/>
                            <CoinNameStep2 value={(instrumentsStore.selectedBase || '').replace('F:', '')} defaultFiat={defaultFiat} onClick={this.toggleLeftListWith}/>
                            <div>
                                <input
                                    className="exch-form__input"
                                    type="text"
                                    // value={isAmtInputFocused && !(convertStore.convertState === STATE_KEYS.submitOrder || convertStore.convertState === STATE_KEYS.orderDone) ? orderForm.amount : format7DigitString(orderForm.amount)}
                                    value={isAmtInputFocused ? (isAmtChangedAfterFocus ? amountFromState : '') : customDigitFormat(orderForm.amount)}
                                    ref={this.amtInputRef}
                                    readOnly={convertStore.convertState === STATE_KEYS.submitOrder || convertStore.convertState === STATE_KEYS.orderDone}
                                    onFocus={this.handleAmtInputFocus}
                                    onBlur={this.handleAmtInputBlur}
                                    onChange={this.handleAmountChange}
                                />
                            </div>
                            {!isAmtInputFocused && !isArbitrageMode && (
                                <SliderInput
                                    readOnly={convertStore.convertState !== STATE_KEYS.amtInput}
                                    isDisabledColors={convertStore.convertState !== STATE_KEYS.amtInput}
                                    max={sliderMax}
                                    currentValue={baseCoinUSDPrice * orderForm.amount}
                                    value={orderForm.amount}
                                    onChange={(value) => partial(withValueFromEvent, orderForm.setAmount)({ target: { value } })}
                                    lowestExchangeStore={lowestExchangeStore}
                                    defaultFiatSymbol={defaultFiatSymbol}
                                    getLocalPrice={getLocalPrice}
                                />
                            )}
                        </div>

                        <div className={isShortSell ? 'exch-form__sep' : 'exch-form__sep shortsell'}>
                            {
                                (isShortSell || isSwapMode) ? (
                                    <svg className="exch-form__switch-arrows" viewBox="0 0 8.8106 6.7733">
                                        <g transform="translate(0 -290.23)" strokeMiterlimit="10" strokeWidth=".26327">
                                            <path d="m2.1205 292.68h4.6888v0.93039c0 0.0419 0.015007 0.0782 0.045808 0.10899 0.030802 0.0305 0.067133 0.0461 0.10899 0.0461 0.045019 0 0.082403-0.0145 0.11136-0.0434l1.5506-1.5509c0.028959-0.0287 0.043439-0.0661 0.043439-0.11136 0-0.045-0.014481-0.0821-0.043702-0.1111l-1.5454-1.5459c-0.038963-0.0321-0.077664-0.0484-0.11663-0.0484-0.045282 0-0.082403 0.0145-0.1111 0.0437-0.028959 0.0287-0.043439 0.0661-0.043439 0.11136v0.93038h-4.6888c-0.042123 0-0.078454 0.015-0.10899 0.0458-0.030539 0.0311-0.046072 0.0671-0.046072 0.10926v0.93012c0 0.0421 0.015533 0.0784 0.046072 0.10926 0.030539 0.0303 0.06687 0.0458 0.10899 0.0458z"/>
                                            <path d="m6.6807 294.54h-4.6888v-0.93038c0-0.0421-0.015269-0.0785-0.045545-0.10873-0.031065-0.0308-0.067133-0.0463-0.10926-0.0463-0.045282 0-0.082139 0.0145-0.11163 0.0437l-1.5504 1.5504c-0.028959 0.0292-0.043439 0.0661-0.043439 0.11137 0 0.0421 0.01448 0.0774 0.043439 0.10662l1.5459 1.5506c0.038437 0.0321 0.0774 0.0482 0.1161 0.0482 0.042123 0 0.07819-0.015 0.10926-0.0458 0.030539-0.0308 0.045545-0.0671 0.045545-0.10925v-0.93013h4.6888c0.041859 0 0.07819-0.0153 0.10899-0.0458 0.030802-0.0308 0.046072-0.0671 0.046072-0.10926v-0.93039c0-0.0419-0.015269-0.0779-0.046072-0.10899-0.030802-0.0303-0.06687-0.0458-0.10899-0.0458z"/>
                                        </g>
                                    </svg>
                                ) : (
                                    <svg className="exch-form__switch-arrows" viewBox="0 0 8.8106 6.7733" xmlns="http://www.w3.org/2000/svg">
                                        <g transform="matrix(1.2645 0 0 1.2645 -2.3188 -365.95)" strokeMiterlimit="10" strokeWidth=".26327">
                                            <path d="m2.1205 292.68h4.6888v0.93039c0 0.0419 0.015007 0.0782 0.045808 0.10899 0.030802 0.0305 0.067133 0.0461 0.10899 0.0461 0.045019 0 0.082403-0.0145 0.11136-0.0434l1.5506-1.5509c0.028959-0.0287 0.043439-0.0661 0.043439-0.11136 0-0.045-0.014481-0.0821-0.043702-0.1111l-1.5454-1.5459c-0.038963-0.0321-0.077664-0.0484-0.11663-0.0484-0.045282 0-0.082403 0.0145-0.1111 0.0437-0.028959 0.0287-0.043439 0.0661-0.043439 0.11136v0.93038h-4.6888c-0.042123 0-0.078454 0.015-0.10899 0.0458-0.030539 0.0311-0.046072 0.0671-0.046072 0.10926v0.93012c0 0.0421 0.015533 0.0784 0.046072 0.10926 0.030539 0.0303 0.06687 0.0458 0.10899 0.0458z"/>
                                        </g>
                                    </svg>
                                )
                            }
                        </div>

                        <div className="exch-form__get">
                            <CoinIconStep2 value={instrumentsStore.selectedQuote} defaultFiat={defaultFiat} onClick={this.toggleRightListWith}/>
                            <CoinNameStep2 value={(instrumentsStore.selectedQuote || '').replace('F:', '')} defaultFiat={defaultFiat} onClick={this.toggleRightListWith}/>
                            <div>
                                <input
                                    className="exch-form__input"
                                    type="text"
                                    placeholder={!isDelayed ? orderForm.estimatedAmountReceived.toString() : ''}
                                    readOnly
                                    // value={format7DigitString(orderForm.estimatedAmountReceived)}
                                    value={!isDelayed ? customDigitFormat(getLocalPrice(totalPrice, instrumentsStore.selectedQuote)) : ''}
                                    onClick={this.toggleRightListWith}
                                />
                            </div>
                            {!isDelayed && !isAmtInputFocused && !isArbitrageMode && (
                                <SliderInput
                                    // readOnly
                                    readOnly={convertStore.convertState !== STATE_KEYS.amtInput}
                                    isDisabledColors={convertStore.convertState !== STATE_KEYS.amtInput}
                                    max={sliderMax}
                                    currentValue={slider === 'Best Execution' ? (quoteCoinUSDPrice * totalPrice) : (quoteCoinUSDPrice * totalPrice * 37.7834)} // * 0.9975 New way is to calculate the real value of C2. Then multiply by 0.9975
                                    value={orderForm.amount}
                                    // onChange={null}
                                    lowestExchangeStore={lowestExchangeStore}
                                    onChange={(value) => partial(withValueFromEvent, orderForm.setAmount)({ target: { value } })}
                                    defaultFiatSymbol={defaultFiatSymbol}
                                    getLocalPrice={getLocalPrice}
                                />
                            )}
                            {isDelayed &&
                            <LoaderWrapper>
                                <DataLoader width={40} height={40}/>
                            </LoaderWrapper>
                            }
                        </div>

                        <div className="exch-form__btns">
                            {(convertStore.convertState === STATE_KEYS.amtInput) && (
                                <GradientButtonTimer
                                    onCancelOrder={() => this.onCancelTrading()}
                                    onSubmitOrder={this.onSubmitOrderByTimer}
                                    isArbitrageMode={isArbitrageMode}
                                    disabled={!orderForm.validAmountEntered || baseCoinUSDPrice * orderForm.amount < MIN_USD_AMOUNT}
                                    maxTimer={timer}
                                />
                            )}
                            {convertStore.convertState === STATE_KEYS.submitOrder && (
                                <OrderGradientButton
                                    className="exch-form__submitv2 exchange-progress"
                                    onClick={() => this.onCancelTrading()}
                                    disabled={false}
                                    height={60}
                                    width={259}
                                >
                                    <DataLoader/>
                                </OrderGradientButton>
                            )}
                            {convertStore.convertState === STATE_KEYS.orderDone && (
                                <OrderGradientButton
                                    className="exch-form__submitv2 positive-solid"
                                    onClick={() => {
                                        // this.handleDoneBtnClick(false);
                                    }}
                                    disabled={false}
                                    height={60}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35.34 29.66">
                                        <path d="M34.87,5,30.32.47a1.6,1.6,0,0,0-2.27,0L17.67,10.85h0l-5.84,5.84L7.29,12.15a1.62,1.62,0,0,0-2.28,0L.47,16.69A1.6,1.6,0,0,0,.47,19L10.69,29.19a1.61,1.61,0,0,0,1.14.47A1.63,1.63,0,0,0,13,29.19l4.7-4.71L34.87,7.29a1.62,1.62,0,0,0,0-2.28Z"/>
                                    </svg>
                                </OrderGradientButton>
                            )}
                        </div>
                    </div>
                    {/* ----------End Step 2----------*/}
                </div>
            </StyleWrapper>
        );
    }
}

export default inject(
    STORE_KEYS.INSTRUMENTS,
    STORE_KEYS.CONVERTSTORE,
    STORE_KEYS.ORDERENTRY,
    STORE_KEYS.YOURACCOUNTSTORE,
    STORE_KEYS.LOWESTEXCHANGESTORE,
    STORE_KEYS.EXCHANGESSTORE,
    STORE_KEYS.VIEWMODESTORE,
    STORE_KEYS.ORDERHISTORY,
    STORE_KEYS.PORTFOLIODATASTORE,
    STORE_KEYS.SETTINGSSTORE,
    STORE_KEYS.TELEGRAMSTORE,
    STORE_KEYS.TRADINGVIEWSTORE,
    STORE_KEYS.MODALSTORE,
    STORE_KEYS.ORDERBOOK,
    STORE_KEYS.COINADDRESSSTORE,
    STORE_KEYS.ORDERFORMTOGGLE,
)(observer(CoinPairSearchV2));
