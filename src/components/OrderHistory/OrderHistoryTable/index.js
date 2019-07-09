/* eslint-disable react/no-danger */
import React from 'react';
import { AutoSizer } from 'react-virtualized';
import { inject, observer } from 'mobx-react';
import { injectIntl, defineMessages } from 'react-intl';
import { compose, withProps } from 'recompose';
import { Tooltip } from 'react-tippy';
import moment from 'moment';

import { STORE_KEYS } from '../../../stores';
import { STATE_KEYS } from '../../../stores/ConvertStore';
import NewCoinIcon from '../../NewCoinIcon';
import {
    OrdersWrapper,
    InfoHistory,
    InfoTooltip,
    WarningIcon,
    TableBody,
    Row,
    Column,
    LongArrow,
    WalletSideIcon,
    WalletTopIcon,
    CoinIconWrapper,
    BTCFontIcon,
    ArrowIcon,
    PieChartIcon,
    CircleSpinner,
    ArrowConnectionIcon,
    ArrowGroupIcon
} from './Components';
import { WalletGroupButton } from './WalletGroupButton';
import {
    capitalizeFirstLetter, convertToFloat, customDigitFormat, commafy
} from '../../../utils';
import DataLoader from '../../../components-generic/DataLoader';
import OrderProgress from './OrderProgress';

const Messages = defineMessages({
    item_info: {
        id: 'order_history.item_info',
        defaultMessage: '{status} {type} {side} order<br/>{amount} {l2} @ {price} {l1}<br/>Timestamp: {time}',
    },
});

class OrderHistoryTable extends React.Component {
    state = {
        isScrollTopVisible: false,
        isHoverTable: false,
        // cache the most recent item in order to compare it inside getDerivedStateFromProps
        lastItem: {},
        defaultCrypto: '',
        defaultFiat: '',
        isCurrencyUpdate: false,
    };
    timeoutId = 0;

    shouldComponentUpdate(nextProps, nextState) {
        const lastItem = nextProps.OrderHistoryData.length ? nextProps.OrderHistoryData[0] : {};
        const isLastMode = lastItem.advancedMode ? 'Buy' : 'Sell';
        const isCoinPairInversed = nextProps.isCoinPairInversed;
        const isDefaultCrypto = nextProps.isDefaultCrypto;
        const currentTransactionDirection = !isDefaultCrypto ? !isCoinPairInversed : isCoinPairInversed;

        if (isDefaultCrypto !== this.props.isDefaultCrypto) {
            return true;
        }
        if (nextState.isCurrencyUpdate &&
            nextProps.convertState === STATE_KEYS.amtInput) {
            return true;
        }
        if (nextProps.convertState === STATE_KEYS.amtInput) {
            return isLastMode === (!isDefaultCrypto ? 'Sell' : 'Buy');
        }
        return nextProps.convertState !== STATE_KEYS.orderDone && currentTransactionDirection;
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const lastItem = nextProps.OrderHistoryData.length ? nextProps.OrderHistoryData[0] : {};
        const defaultFiat = nextProps.defaultFiat;
        const defaultCrypto = nextProps.defaultCrypto;
        const nextState = {
            lastItem,
            defaultFiat,
            defaultCrypto,
            isCurrencyUpdate: false,
        };
        if (defaultFiat !== prevState.defaultFiat || defaultCrypto !== prevState.defaultCrypto) {
            nextState.isCurrencyUpdate = true;
        }
        return nextState;
    }

    componentWillUnmount() {
    }

    handleFocus = () => {
        const {
            [STORE_KEYS.VIEWMODESTORE]: viewModeStore,
            [STORE_KEYS.CONVERTSTORE]: convertStore,
        } = this.props;
        if (convertStore.convertState === STATE_KEYS.amtInput) {
            viewModeStore.setGraphSwitchMode(true);
        }
    }

    handleLeave = () => {
        if (!this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
        const {
            [STORE_KEYS.VIEWMODESTORE]: viewModeStore,
        } = this.props;
        this.timeoutId = setTimeout(() => {
            viewModeStore.setGraphSwitchMode(false);
        }, 60000);
    }

    render() {
        const {
            OrderHistoryData,
            tab,
            convertState,
            gridHeight,
            isFromSettings,
            orderForm,
            totalPrice,
            getLocalPrice,
            timerAfter,
            isCoinPairInversed,
            currentProgress,
            isDefaultCrypto,
            defaultCrypto,
            defaultCryptoSymbol,
            defaultCryptoPrice,
            defaultFiat,
            defaultFiatSymbol,
            currentFiatPrice,
            graphSwitchMode,
        } = this.props;

        const { formatMessage } = this.props.intl;
        const data = OrderHistoryData.slice();
        let isEstimateDataSet = false;
        const is2Transaction = timerAfter === 'After 2 transactions';
        const isLiveTrading = convertState !== STATE_KEYS.coinSearch;
        const statusArray = data.map(val => {
            return val.advancedMode ? 'Buy' : 'Sell';
        });

        let initVal = 0;
        if (!isDefaultCrypto) {
            initVal = (isCoinPairInversed && is2Transaction) ? 1 : 0;
        } else {
            initVal = (!isCoinPairInversed && is2Transaction) ? 1 : 0;
        }
        const currentTransactionDirection = !isDefaultCrypto ? !isCoinPairInversed : isCoinPairInversed;

        if (data.length > 0 && isLiveTrading) {
            const filled = customDigitFormat(orderForm.amount);
            const total = customDigitFormat(getLocalPrice(totalPrice, !isDefaultCrypto ? orderForm.quoteSymbol : defaultFiatSymbol));
            const lastEstimatedMode = !isCoinPairInversed ? 'Sell' : 'Buy';
            const estL1 = !isDefaultCrypto ? defaultFiat : (!isCoinPairInversed ? orderForm.quoteSymbol : orderForm.baseSymbol);
            const estL2 = !isCoinPairInversed ? orderForm.baseSymbol : orderForm.quoteSymbol;
            const estFilled = !isCoinPairInversed ? filled : total;
            const estTotal = !isCoinPairInversed ? total : filled;

            data.unshift({
                L1: estL1,
                L2: estL2,
                isFailed: false,
                filled: estFilled,
                price: customDigitFormat(orderForm.Price),
                total: estTotal,
                timeUnFormatted: new Date().toISOString(),
                type: 'Market',
            });
            statusArray.unshift(lastEstimatedMode);

            if (lastEstimatedMode === (!isDefaultCrypto ? 'Buy' : 'Sell') && is2Transaction) {
                const nextEstFilled = !isDefaultCrypto ? estFilled : convertToFloat(estFilled) * 1.00001;
                const nextEstTotal = !isDefaultCrypto ? convertToFloat(estTotal) * 1.00001 : estTotal;
                data.unshift({
                    L1: estL1,
                    L2: estL2,
                    isFailed: false,
                    filled: nextEstFilled,
                    price: ' ',
                    total: nextEstTotal,
                    timeUnFormatted: new Date((new Date()).getTime() + (1000 * 60)).toISOString(),
                    type: 'Market',
                });
                statusArray.unshift(lastEstimatedMode === 'Sell' ? 'Buy' : 'Sell');
            }
            isEstimateDataSet = true;
        }

        let animatable = false;
        if (currentTransactionDirection && (currentProgress > 0) && convertState === STATE_KEYS.submitOrder) {
            animatable = true;
        }

        const isOrderStarted = !currentTransactionDirection && this.convertState !== STATE_KEYS.amtInput && convertState === STATE_KEYS.amtInput;
        setTimeout(() => {
            this.convertState = convertState;
            this.isOrderStarted = isOrderStarted;
        }, 0);

        return (
            <AutoSizer>
                {({ width, height }) => (
                    <OrdersWrapper width={width} height={height}>
                        <TableBody height={height}>
                            {data.map(({
                                filled, price, L1, L2, timeUnFormatted, isFailed, type, total,
                            }, key) => {
                                if (tab === 'open' || !filled) {
                                    return;
                                }

                                let mode = statusArray[key];
                                let isBuy = mode === 'Buy';
                                const prices = price.split(' ');
                                const time = `${moment(timeUnFormatted).format('MM/DD/YYYY HH:mm')} - 100%`;
                                const actualHeight = isFromSettings && gridHeight ? gridHeight : height;

                                let isProgress = false;
                                if (this.isCoinPairInversed === isCoinPairInversed) {
                                    isProgress = (key === initVal) && (convertState === STATE_KEYS.submitOrder || convertState === STATE_KEYS.orderDone);
                                }
                                const actualProgress = isProgress ? Math.min(key === initVal && currentProgress, 100) : 0;

                                if (this.isCoinPairInversed !== isCoinPairInversed) {
                                    setTimeout(() => {
                                        this.isCoinPairInversed = isCoinPairInversed;
                                    }, 0);
                                }

                                let symbol = '';
                                let isArrowBuy = '';
                                if (isDefaultCrypto) {
                                    total = convertToFloat(total);
                                    isArrowBuy = isBuy;
                                    isBuy = !isBuy;
                                } else {
                                    total = convertToFloat(total);
                                    symbol = defaultFiatSymbol;
                                    L1 = defaultFiat;
                                    isArrowBuy = isBuy;
                                }

                                const infoSend = isLiveTrading && ((isDefaultCrypto && key === 0) || (!isDefaultCrypto && key === 1));
                                const infoGet = isLiveTrading && ((!isDefaultCrypto && key === 0) || (isDefaultCrypto && key === 1));
                                return (
                                    <Row
                                        isBuy={isBuy}
                                        isArrowBuy={isArrowBuy}
                                        isTrading={isProgress}
                                        progress={actualProgress}
                                        height={(actualHeight - 2) * 0.125}
                                        length={data.length}
                                        key={timeUnFormatted}
                                        index={key}
                                        last={key === data.length - 1}
                                        isDefaultCrypto={isDefaultCrypto}
                                        isFailed={isFailed}
                                        animatable={animatable}
                                        isOrderStarted={isOrderStarted}
                                        isNumberFilled={!isOrderStarted && this.isOrderStarted}
                                    >
                                        {key > 1 && (
                                            <ArrowGroupIcon isBuy={isBuy} isDefaultCrypto={isDefaultCrypto}>
                                                <span>LEVEL 1 CAP</span>
                                                <span>1k Trades / day</span>
                                                <span>1% Profit / day</span>
                                            </ArrowGroupIcon>
                                        )}
                                        <Column isHighlight={true} isColumn>
                                            <InfoHistory
                                                progress={isProgress}
                                                isBuy={isBuy}
                                                isArrowBuy={isArrowBuy}
                                                isEstimateDataSet={isEstimateDataSet}
                                                isCoinPairInversed={isCoinPairInversed}
                                                isActiveLine={key === initVal}
                                            >
                                                <div className="info-send-section">
                                                    {isEstimateDataSet && Number(filled) === 0 && key < 2 ? (
                                                        <DataLoader />
                                                    ) : (filled !== ' ' ? (
                                                        <WalletGroupButton
                                                            inProgress={infoSend}
                                                            isLeft
                                                            isBuy={!isArrowBuy}
                                                            progress={animatable}
                                                            isWhite={key > 1 || !isLiveTrading}
                                                            position={isDefaultCrypto}
                                                        >
                                                            <span className="infoIcon">
                                                                <NewCoinIcon size="sm" value="BTC" />
                                                            </span>
                                                            {(key < 2) && isLiveTrading && isArrowBuy && !animatable && (
                                                                <OrderProgress
                                                                    isLeft={true}
                                                                />
                                                            )}
                                                            <span>
                                                                {Number.parseFloat(filled).toPrecision(6) || ''}
                                                            </span>
                                                            <WalletSideIcon />
                                                        </WalletGroupButton>
                                                    ) : null)}
                                                </div>
                                                <Tooltip
                                                    className="history-row-tooltip"
                                                    arrow={true}
                                                    animation="shift"
                                                    position="bottom"
                                                    distance={10}
                                                    theme="bct"
                                                    html={
                                                        <InfoTooltip isArrowBuy={isArrowBuy}>
                                                            <div className="info-arrow-directional">
                                                                <div className="info-title">
                                                                    <div className="info-direction">
                                                                        <div className="label-arrow-info">
                                                                            {L2}
                                                                        </div>
                                                                        <div className="wrapper_arrow">
                                                                            <svg
                                                                                style={{
                                                                                    fill: isArrowBuy
                                                                                        ? '#01B067'
                                                                                        : '#09f',
                                                                                    transform: isArrowBuy
                                                                                        ? 'rotate(180deg)'
                                                                                        : 'rotate(0)',
                                                                                }}
                                                                                className="arrow-icon"
                                                                                viewBox="0 0 8.8106 6.7733"
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                            >
                                                                                <g
                                                                                    transform="matrix(1.2645 0 0 1.2645 -2.3188 -365.95)"
                                                                                    strokeMiterlimit="10"
                                                                                    strokeWidth=".26327"
                                                                                >
                                                                                    <path d="m2.1205 292.68h4.6888v0.93039c0 0.0419 0.015007 0.0782 0.045808 0.10899 0.030802 0.0305 0.067133 0.0461 0.10899 0.0461 0.045019 0 0.082403-0.0145 0.11136-0.0434l1.5506-1.5509c0.028959-0.0287 0.043439-0.0661 0.043439-0.11136 0-0.045-0.014481-0.0821-0.043702-0.1111l-1.5454-1.5459c-0.038963-0.0321-0.077664-0.0484-0.11663-0.0484-0.045282 0-0.082403 0.0145-0.1111 0.0437-0.028959 0.0287-0.043439 0.0661-0.043439 0.11136v0.93038h-4.6888c-0.042123 0-0.078454 0.015-0.10899 0.0458-0.030539 0.0311-0.046072 0.0671-0.046072 0.10926v0.93012c0 0.0421 0.015533 0.0784 0.046072 0.10926 0.030539 0.0303 0.06687 0.0458 0.10899 0.0458z" />
                                                                                </g>
                                                                            </svg>
                                                                            {isFailed && !isProgress && (
                                                                                <WarningIcon className="warning-icon" />
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    className="label-arrow-text"
                                                                    dangerouslySetInnerHTML={{
                                                                        __html: formatMessage(Messages.item_info, {
                                                                            status: isFailed ? 'Failed' : 'Completed',
                                                                            type: capitalizeFirstLetter(type),
                                                                            side: mode,
                                                                            amount: filled,
                                                                            l2: L2,
                                                                            price: customDigitFormat(prices[0]),
                                                                            l1: L1,
                                                                            time,
                                                                        }),
                                                                    }}
                                                                />
                                                            </div>
                                                        </InfoTooltip>
                                                    }
                                                >
                                                    <div
                                                        className="info-arrow-directional"
                                                        onMouseEnter={this.handleFocus}
                                                        onMouseLeave={this.handleLeave}
                                                    >
                                                        <div className="wrapper_arrow">
                                                            <ArrowIcon className="arrow-icon" />
                                                            {isFailed && !isProgress && (
                                                                <WarningIcon className="warning-icon" />
                                                            )}
                                                            <span className="type-label">{isArrowBuy ? 'BUY' : 'SELL'}</span>
                                                        </div>
                                                    </div>
                                                </Tooltip>
                                                <div className="info-get-section">
                                                    {!isCoinPairInversed && isEstimateDataSet && Number(total) === 0 && key < 2 ? (
                                                        <DataLoader />
                                                    ) : (
                                                        <WalletGroupButton
                                                            inProgress={infoGet}
                                                            isBuy={!isArrowBuy}
                                                            progress={animatable}
                                                            isWhite={key > 1 || !isLiveTrading}
                                                            position={isDefaultCrypto}
                                                        >
                                                            { total !== 0 ? (
                                                                <span>{commafy(total.toPrecision(6))}</span>
                                                            ) : (key < 2 && isLiveTrading) && (
                                                                <DataLoader />
                                                            )}
                                                            <span className="infoIcon">
                                                                {isDefaultCrypto ? (
                                                                    defaultFiatSymbol
                                                                ) : symbol}
                                                            </span>
                                                            {(key < 2) && isLiveTrading && !isArrowBuy && !animatable && (
                                                                <OrderProgress
                                                                    isLeft={false}
                                                                />
                                                            )}
                                                            <WalletSideIcon isRight />
                                                        </WalletGroupButton>
                                                    )}
                                                </div>
                                            </InfoHistory>
                                        </Column>
                                        {key !== data.length - 1 && !isBuy && (
                                            <ArrowConnectionIcon/>
                                        )}
                                    </Row>
                                );
                            })}
                        </TableBody>
                    </OrdersWrapper>
                )}
            </AutoSizer>
        );
    }
}

export default compose(
    inject(
        STORE_KEYS.CONVERTSTORE,
        STORE_KEYS.ORDERHISTORY,
        STORE_KEYS.ORDERENTRY,
        STORE_KEYS.LOWESTEXCHANGESTORE,
        STORE_KEYS.SETTINGSSTORE,
        STORE_KEYS.ORDERBOOK,
        STORE_KEYS.VIEWMODESTORE
    ),
    observer,
    withProps(
        ({
            [STORE_KEYS.CONVERTSTORE]: { convertState, currentProgress },
            [STORE_KEYS.ORDERHISTORY]: { OrderHistoryData },
            [STORE_KEYS.ORDERENTRY]: { CoinsPairSearchMarketOrderBuyForm: orderForm },
            [STORE_KEYS.LOWESTEXCHANGESTORE]: { totalPrice },
            [STORE_KEYS.SETTINGSSTORE]: {
                getLocalPrice,
                timerAfter,
                isDefaultCrypto,
                defaultCrypto,
                defaultCryptoSymbol,
                defaultCryptoPrice,
                defaultFiat,
                defaultFiatSymbol,
                price: currentFiatPrice,
            },
            [STORE_KEYS.ORDERBOOK]: { isCoinPairInversed },
            [STORE_KEYS.VIEWMODESTORE]: { setGraphSwitchMode, setMasterSwitchMode, graphSwitchMode },
        }) => ({
            convertState,
            currentProgress,
            OrderHistoryData,
            orderForm,
            totalPrice,
            getLocalPrice,
            timerAfter,
            isCoinPairInversed,
            isDefaultCrypto,
            defaultCrypto,
            defaultCryptoSymbol,
            defaultCryptoPrice,
            defaultFiat,
            defaultFiatSymbol,
            currentFiatPrice,
            setMasterSwitchMode,
            graphSwitchMode,
        })
    )
)(injectIntl(OrderHistoryTable));
