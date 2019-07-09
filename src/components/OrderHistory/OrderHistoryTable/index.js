import React from 'react';
import { AutoSizer } from 'react-virtualized';
import { inject, observer } from 'mobx-react';
import { FormattedMessage, injectIntl, defineMessages } from 'react-intl';
import { compose, withProps } from 'recompose';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Tooltip } from 'react-tippy';
import moment from 'moment';
// import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { STORE_KEYS } from '../../../stores';
import { STATE_KEYS } from '../../../stores/ConvertStore';
import {
    OrdersWrapper, Arrow, ProgressWrapper, InfoHistory, WarningIcon,
    TableHeader, TableBody, Tab, Row, Column
} from './Components';
import CoinIcon from '../../../components-generic/CoinIcon';
import { capitalizeFirstLetter, customDigitFormat, unifyDigitString } from '../../../utils';
import { ArrowIcon1 } from '../../GraphTool/ExchangeCellsV2/CellComponents';

const Messages = defineMessages({
    item_info: {
        id: 'order_history.item_info',
        defaultMessage: '{status} {type} {side} order<br/>{amount} {l2} @ {price} {l1}<br/>Timestamp: {time}',
    },
});

class OrderHistoryTable extends React.Component {
    perfectScrollRef = null;
    state = {
        isScrollTopVisible: false,
        isHoverTable: false,
        tradingProgress: {
            progress: 0,
            isTrading: false,
        },
    };

    randomNum = [];

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.convertState === STATE_KEYS.submitOrder && !prevState.tradingProgress.isTrading) {
            return {
                tradingProgress: {
                    isTrading: true,
                    progress: 0,
                },
            };
        }

        if (nextProps.convertState === STATE_KEYS.orderDone && prevState.tradingProgress.isTrading) {
            return {
                tradingProgress: {
                    isTrading: false,
                    progress: 100,
                },
            };
        }

        return {};
    }

    componentWillUnmount() {
        if (this.updateProgress) {
            clearInterval(this.updateProgress);
        }
    }

    getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    };

    handleHoverOn = () => {
        this.setState({
            isHoverTable: true,
        });
    };

    handleHoverOff = () => {
        this.setState({
            isHoverTable: false,
        });
    };

    render() {
        const { isHoverTable, tradingProgress } = this.state;
        const {
            OrderHistoryData,
            tab,
            isFromSettings,
            gridHeight,
            orderForm,
            totalPrice,
            getLocalPrice,
        } = this.props;

        const data = [];
        let statusArray = [];
        const lengthOfHistory = OrderHistoryData.length;

        let isHomeStraight = false;
        if (tradingProgress.isTrading && (lengthOfHistory !== tradingProgress.itemCount)) {
            isHomeStraight = true;
        }

        if (tradingProgress.progress > 100) {
            this.setState(prevState => ({
                tradingProgress: {
                    ...prevState.tradingProgress,
                    progress: 100,
                },
            }));

            clearTimeout(this.updateProgress);
        } else if (tradingProgress.isTrading) {
            this.updateProgress = setTimeout(() => {
                this.setState(prevState => ({
                    tradingProgress: {
                        ...prevState.tradingProgress,
                        progress: prevState.tradingProgress.progress + 2.5,
                    },
                }));
            }, 8);

            const isRightDirection = orderForm.quoteSymbol === 'USDT';
            const filled = customDigitFormat(orderForm.amount);
            const total = customDigitFormat(getLocalPrice(totalPrice, orderForm.quoteSymbol));

            data.push({
                L1: isRightDirection ? orderForm.quoteSymbol : orderForm.baseSymbol,
                L2: isRightDirection ? orderForm.baseSymbol : orderForm.quoteSymbol,
                isFailed: false,
                filled: isRightDirection ? filled : total,
                price: customDigitFormat(orderForm.Price),
                total: isRightDirection ? total : filled,
                timeUnFormatted: new Date().toISOString(),
                type: 'Market',
            });
            statusArray.push(isRightDirection ? 'Sell' : 'Buy');
        }

        let tradingMode = 'Buy';
        OrderHistoryData.map((val) => {
            data.push(val);

            if (!val.isFailed) {
                tradingMode = (tradingMode === 'Sell') ? 'Buy' : 'Sell';
                statusArray.push(tradingMode);
            } else {
                statusArray.push(tradingMode);
            }
        });

        const { formatMessage } = this.props.intl;

        return (
            <AutoSizer>
                {({ width, height }) => (
                    <OrdersWrapper width={width} height={height}>
                        <TableBody
                            height={height}
                            onMouseEnter={this.handleHoverOn}
                            onMouseLeave={this.handleHoverOff}
                        >
                            <PerfectScrollbar
                                containerRef={element => {
                                    this.perfectScrollRef = element;
                                }}
                                option={{
                                    minScrollbarLength: 50,
                                    suppressScrollX: true,
                                }}
                            >
                                {data.map((val, key) => {
                                    if (tab === 'open' || !val.filled) {
                                        return;
                                    }
                                    const amounts = val.filled.split(' ');
                                    const prices = val.price.split(' ');
                                    const L1 = val.L1;
                                    const L2 = val.L2;

                                    const progress = 100;
                                    const time = moment(val.timeUnFormatted).format('MM/DD/YYYY HH:mm') + ' - ' + progress + '%';
                                    let mode = statusArray[key];
                                    const isBuy = (mode === 'Buy');

                                    const wrapperHeight = isFromSettings && gridHeight ? gridHeight : height;

                                    return (
                                        <Row
                                            isBuy={isBuy}
                                            isTrading={tradingProgress.isTrading}
                                            progress={(isHomeStraight ? (key === 1) : (key === 0)) && tradingProgress.progress}
                                            splitter={isBuy}
                                            first={(isHomeStraight ? (key === 1) : (key === 0)) && !isHoverTable}
                                            height={(wrapperHeight - 2) * 0.125}
                                            length={lengthOfHistory}
                                            key={key + 'history'}
                                        >
                                            <Tooltip
                                                className="history-row-tooltip"
                                                arrow={true}
                                                animation="shift"
                                                position="bottom"
                                                distance={10}
                                                theme="bct"
                                                // title={time}
                                                title={formatMessage(
                                                    Messages.item_info,
                                                    {
                                                        status: (val.isFailed ? 'Failed' : 'Completed'),
                                                        type: capitalizeFirstLetter(val.type),
                                                        side: mode,
                                                        amount: unifyDigitString(amounts[0]),
                                                        l2: L2,
                                                        price: customDigitFormat(prices[0]),
                                                        l1: L1,
                                                        time,
                                                    }
                                                )}
                                            >
                                                <Column isHighlight={true} isColumn>
                                                    <InfoHistory progress={key === 0 && tradingProgress.progress} isBuy={isBuy}>
                                                        <div className="info-send-section">
                                                            <CoinIcon value={L2} size={38}/>
                                                            <span>{(val.filled || '')}</span>
                                                        </div>
                                                        <div className="info-arrow-directional">
                                                            {/*
                                                            <Tooltip
                                                                arrow={true}
                                                                animation="shift"
                                                                position="bottom"
                                                                distance={0}
                                                                theme="bct"
                                                                title={isBuy ? 'Buy Low' : 'Sell High'}
                                                            >
                                                            </Tooltip>
                                                            */}
                                                            <ArrowIcon1 className="arrow-icon"/>
                                                            {val.isFailed && !tradingProgress.progress && <WarningIcon className="warning-icon"/>}
                                                        </div>
                                                        <div className="info-get-section">
                                                            <span>{val.total}</span>
                                                            <CoinIcon value={L1} size={38} hasMarginRight/>
                                                        </div>
                                                    </InfoHistory>
                                                </Column>
                                            </Tooltip>
                                            { key !== OrderHistoryData.length - 1 &&
                                                <div className="info-arrow">
                                                    <svg className="exch-form__switch-arrows" viewBox="0 0 8.8106 6.7733" xmlns="http://www.w3.org/2000/svg">
                                                        <g transform="matrix(1.2645 0 0 1.2645 -2.3188 -365.95)" strokeMiterlimit="10" strokeWidth=".26327">
                                                            <path d="m2.1205 292.68h4.6888v0.93039c0 0.0419 0.015007 0.0782 0.045808 0.10899 0.030802 0.0305 0.067133 0.0461 0.10899 0.0461 0.045019 0 0.082403-0.0145 0.11136-0.0434l1.5506-1.5509c0.028959-0.0287 0.043439-0.0661 0.043439-0.11136 0-0.045-0.014481-0.0821-0.043702-0.1111l-1.5454-1.5459c-0.038963-0.0321-0.077664-0.0484-0.11663-0.0484-0.045282 0-0.082403 0.0145-0.1111 0.0437-0.028959 0.0287-0.043439 0.0661-0.043439 0.11136v0.93038h-4.6888c-0.042123 0-0.078454 0.015-0.10899 0.0458-0.030539 0.0311-0.046072 0.0671-0.046072 0.10926v0.93012c0 0.0421 0.015533 0.0784 0.046072 0.10926 0.030539 0.0303 0.06687 0.0458 0.10899 0.0458z"/>
                                                        </g>
                                                    </svg>
                                                </div>
                                            }
                                        </Row>
                                    );
                                })}
                            </PerfectScrollbar>
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
    ),
    observer,
    withProps(
        ({
            [STORE_KEYS.CONVERTSTORE]: {
                convertState,
            },
            [STORE_KEYS.ORDERHISTORY]: {
                OrderHistoryData,
            },
            [STORE_KEYS.ORDERENTRY]: {
                CoinsPairSearchMarketOrderBuyForm: orderForm,
            },
            [STORE_KEYS.LOWESTEXCHANGESTORE]: {
                totalPrice,
            },
            [STORE_KEYS.SETTINGSSTORE]: {
                getLocalPrice,
            },
        }) => ({
            convertState,
            OrderHistoryData,
            orderForm,
            totalPrice,
            getLocalPrice,
        })
    )
)(injectIntl(OrderHistoryTable));

