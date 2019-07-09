/* eslint-disable react/no-multi-comp */
import React, { Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { STORE_KEYS } from '../../../stores';
import { STATE_KEYS } from '../../../stores/ConvertStore';
import {
    roundToFixedNum, fillUntil, formatCoinString, format7DigitString
} from '../../../utils';
import Plan from './mockPlan';
import imgCheck from './check.png';
import GraphPrices from '../Styles/graphprices';

const maxCells = 100;

const ExchangeCell = ({
    exchange, price, baseSymbol, quoteSymbol, updateExchange, index, exchangeIndex, convertState, swapBaseQuote, disabled,
}) => {
    const coinSearchPrice = swapBaseQuote ? 1 / price : price;

    return (
        <GraphPrices.Item
            active={index === exchangeIndex}
            coinSearch={convertState === STATE_KEYS.coinSearch}
            last={index === 0}
            planCell={false}
            isPlan={false}
            disabled={disabled}
            onClick={() => {
                if (convertState !== STATE_KEYS.submitOrder) {
                    updateExchange(index, exchange);
                }
            }}
            className="exch-bar-item"
        >
            <GraphPrices.ItemWrapper className="exch-bar-item__wrapper">
                <GraphPrices.IconTrader className="exch-bar-item__wrapper__icon-trader">
                    <GraphPrices.Icon background={`${exchange.toLowerCase()}`} className="exch-bar-item__wrapper__icon-trader__icon"/>
                </GraphPrices.IconTrader>

                <GraphPrices.ItemInner className="exch-bar-item__wrapper__inner">
                    <GraphPrices.Trader className="exch-bar-item__wrapper__inner__trader">
                        {exchange}
                    </GraphPrices.Trader>

                    {convertState === STATE_KEYS.coinSearch
                        ? (
                            <Fragment>
                                <GraphPrices.Amount className="exch-bar-item__wrapper__inner__amount">
                                    {format7DigitString(coinSearchPrice)}
                                    <span> {swapBaseQuote ? baseSymbol : quoteSymbol}</span>
                                </GraphPrices.Amount>
                            </Fragment>
                        )
                        : (
                            <Fragment>
                                <GraphPrices.Amount className="exch-bar-item__wrapper__inner__amount">
                                <FormattedMessage
                                    id="graph_tool.exchange_cells.label_amount"
                                    defaultMessage="Amount"
                                />: 0.00 <span>{quoteSymbol}</span>
                                </GraphPrices.Amount>
                            </Fragment>
                        )
                    }
                </GraphPrices.ItemInner>
            </GraphPrices.ItemWrapper>
        </GraphPrices.Item>
    );
};

class ExchangePlanCell extends React.Component {
    state = {
        isOpen: false,
    };

    handleClick = () => {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen,
        }));
    };

    render() {
        // const {exchange, price, quoteSymbol, baseSymbol, amount, index, convertState, percentage, details} = this.props;
        // TODO using mock plan
        const {
            exchange, price, quoteSymbol, baseSymbol, amount, index, convertState, percentage,
        } = this.props;
        const details = Plan.data[0].details;

        const { isOpen } = this.state;
        let priceFixed = roundToFixedNum(price, 6);

        let buys = [];
        let sells = [];

        if (details && details.length) {
            for (let i = 0; i < details.length; i++) {
                if (details[i].type === 'buy') {
                    buys.push(
                        <div>
                            <span className="bold">
                                <FormattedMessage
                                    id="graph_tool.exchange_cells.label_bought"
                                    defaultMessage="Bought"
                                />:
                            </span> {details[i].amountReceived} <span className="unit">
                                {quoteSymbol}
                            </span> @{details[i].amount} <span className="unit">{baseSymbol}</span>
                        </div>
                    );
                } else {
                    sells.push(
                        <div>
                            <span className="bold">
                                <FormattedMessage
                                    id="graph_tool.exchange_cells.label_sold"
                                    defaultMessage="Sold"
                                />:
                            </span> {details[i].amount} <span className="unit">
                                {quoteSymbol}
                            </span> @{details[i].amountReceived} <span className="unit">{baseSymbol}</span>
                        </div>
                    );
                }
            }
        }

        return (
            <Fragment>
                <GraphPrices.Item
                    active={false}
                    coinSearch={false}
                    planCell={convertState === STATE_KEYS.submitOrder}
                    isPlan={true}
                    className="exch-bar-item"
                    onClick={this.handleClick}
                >
                    <GraphPrices.ItemWrapper className="exch-bar-item__wrapper">
                        <GraphPrices.IconTrader className="exch-bar-item__wrapper__icon-trader">
                            <GraphPrices.Icon background={`${exchange.toLowerCase()}`} className="exch-bar-item__wrapper__icon-trader__icon"/>
                        </GraphPrices.IconTrader>

                        <GraphPrices.ItemInner className="exch-bar-item__wrapper__inner">
                            <GraphPrices.Trader className="exch-bar-item__wrapper__inner__trader">
                                {exchange}
                            </GraphPrices.Trader>

                            <Fragment>
                                <GraphPrices.Price className="exch-bar-item__wrapper__inner__price">
                                    <span className="bold">1</span><span
                                    className="unit">{` ${quoteSymbol}=`}</span><span
                                    className="bold">{format7DigitString(priceFixed)}</span> <span
                                    className="unit">{baseSymbol}</span>
                                </GraphPrices.Price>
                                <GraphPrices.Price className="exch-bar-item__wrapper__inner__price">
                                    <span className="bold">
                                        <FormattedMessage
                                            id="graph_tool.exchange_cells.label_amount"
                                            defaultMessage="Amount"
                                        />
                                        : {formatCoinString(amount, 2)}</span> <span
                                    className="unit">{quoteSymbol}</span>
                                </GraphPrices.Price>
                            </Fragment>
                        </GraphPrices.ItemInner>
                    </GraphPrices.ItemWrapper>

                    {/* mock status: comment out following if statement */}

                    {convertState === STATE_KEYS.submitOrder && (
                        <GraphPrices.ItemProgress className="exch-bar-item__progress">
                            <GraphPrices.ItemProgressBar percent={percentage}/>
                            {Number.parseInt(percentage) === 100 && (
                                <GraphPrices.ItemProgressBarCheck src={imgCheck}/>
                            )}
                        </GraphPrices.ItemProgress>
                    )}
                </GraphPrices.Item>

                {(isOpen && details && !!details.length) && (
                    <GraphPrices.ItemDetails>
                        {!!buys.length && (
                            <Fragment>
                                <div><span className="bold">{buys.length}
                                    <FormattedMessage
                                        id="graph_tool.exchange_cells.label_completed_buy"
                                        defaultMessage="completed Buy(s)"
                                    />
                                 </span></div>
                                {buys}
                            </Fragment>
                        )}

                        {!!sells.length && (
                            <Fragment>
                                <div><span className="bold">{sells.length}
                                    <FormattedMessage
                                        id="graph_tool.exchange_cells.label_completed_sell"
                                        defaultMessage="completed Sells(s)"
                                    /></span></div>
                                {sells}
                            </Fragment>
                        )}
                    </GraphPrices.ItemDetails>
                )}
            </Fragment>
        );
    }
}

const ObservedExchangeCell = (observer(
    ({
        orderBookStore: { pricesByExchange },
        instrumentsStore: { selectedInstrumentPair: [baseSymbol, quoteSymbol] },
        // mock data
        // lowestExchangeStore: { updateExchange, exchangeIndex },
        // original code
        lowestExchangeStore: { updateExchange, exchangeIndex, Plan },
        convertStore: { convertState },
        index,
        swapBaseQuote,
    }) => {
        if (convertState === STATE_KEYS.amtInput || convertState === STATE_KEYS.submitOrder) {
            if (Plan && Plan.length > index) {
                return (
                    <Fragment>
                        <ExchangePlanCell
                            baseSymbol={Plan.get(index).Bid.toUpperCase()}
                            quoteSymbol={Plan.get(index).Ask.toUpperCase()}
                            exchange={Plan.get(index).Exchange}
                            price={Plan.get(index).Price}
                            amount={formatCoinString(Plan.get(index).Amount, 2)}
                            convertState={convertState}
                            index={index}
                            percentage={Plan.get(index).progress}
                            details={Plan.get(index).details || []}
                        />
                    </Fragment>
                );
            }
            // let cIndex = Plan ? index - Plan.length : index;
            // return (
            //     <Fragment>
            //         {pricesByExchange.has(cIndex) && (
            //             <ExchangeCell
            //                 baseSymbol={baseSymbol}
            //                 quoteSymbol={quoteSymbol}
            //                 exchange={pricesByExchange.get(cIndex)[0]}
            //                 price={pricesByExchange.get(cIndex)[1]}
            //                 updateExchange={updateExchange}
            //                 index={cIndex}
            //                 exchangeIndex={exchangeIndex}
            //                 convertState={convertState}
            //                 swapBaseQuote={swapBaseQuote}
            //                 disabled={true}
            //             />
            //         )}
            //     </Fragment>
            // );
            return (
                <Fragment/>
            );

        }

        if (convertState === STATE_KEYS.coinSearch) {
            return (
                <Fragment>
                    {pricesByExchange.has(index) && (
                        <ExchangeCell
                            baseSymbol={baseSymbol}
                            quoteSymbol={quoteSymbol}
                            exchange={pricesByExchange.get(index)[0]}
                            price={pricesByExchange.get(index)[1]}
                            updateExchange={updateExchange}
                            index={index}
                            exchangeIndex={exchangeIndex}
                            convertState={convertState}
                            swapBaseQuote={swapBaseQuote}
                            disabled={false}
                        />
                    )}
                </Fragment>
            );
        }
    }
));

class ExchangeCellsContent extends React.PureComponent {
    constructor() {
        super();

        this.perfectScrollRef = null;
        this.state = {
            isScrollTopVisible: false,
        };
    }

    handleScrollReachedStart = () => {
        this.setState({
            isScrollTopVisible: false,
        });
    };

    handleScrollY = () => {
        this.setState({
            isScrollTopVisible: !!this.perfectScrollRef.scrollTop,
        });
    };

    scrollTop = (duration = 300) => {
        const difference = this.perfectScrollRef.scrollTop || 0;
        const perTick = (difference / duration) * 10;

        setTimeout(() => {
            if (!this.perfectScrollRef) {
                return;
            }
            this.perfectScrollRef.scrollTop = this.perfectScrollRef.scrollTop - perTick;
            if (this.perfectScrollRef.scrollTop === 0) {
                return;
            }
            this.scrollTop(duration - 10);
        }, 10);
    };

    render() {
        const {
            isScrollTopVisible,
        } = this.state;

        const {
            instrumentsStore,
            convertStore,
            orderBookStore,
            lowestExchangeStore,
            convertState,
            swapBaseQuote,
        } = this.props;

        return (
            <Fragment>
                {isScrollTopVisible && convertState !== STATE_KEYS.coinSearch && (
                    <div className="scroll__scrollup" onClick={() => this.scrollTop(300)}>
                        <button className="scroll-up-button">
                            <svg className="sprite-icon" role="img" aria-hidden="true">
                                <use
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                    xlinkHref="img/sprite-basic.svg#arrow-up"
                                />
                            </svg>
                        </button>
                    </div>
                )}

                <PerfectScrollbar
                    containerRef={element => {
                        this.perfectScrollRef = element;
                    }}
                    option={{ maxScrollbarLength: 50 }}
                    onYReachStart={this.handleScrollReachedStart}
                    onScrollY={this.handleScrollY}
                >
                    <div id="exchange_cells">
                        {fillUntil(
                            maxCells,
                            i => (
                                <ObservedExchangeCell
                                    orderBookStore={orderBookStore}
                                    instrumentsStore={instrumentsStore}
                                    lowestExchangeStore={lowestExchangeStore}
                                    convertStore={convertStore}
                                    swapBaseQuote={swapBaseQuote}
                                    index={i}
                                    key={i}
                                />
                            )
                        )}
                    </div>
                </PerfectScrollbar>
            </Fragment>
        );
    }
}

const ExCellContainer = styled.div`
    position: relative;
    height: 100%;
`;

class ExchangeCells extends React.Component {
    state = {
        swapBaseQuote: false,
    };

    handleSortBtn = () => {
        this.setState(prevState => ({
            swapBaseQuote: !prevState.swapBaseQuote,
        }));
    };

    render() {
        const {
            [STORE_KEYS.INSTRUMENTS]: instrumentsStore,
            [STORE_KEYS.CONVERTSTORE]: convertStore,
            [STORE_KEYS.ORDERBOOK]: orderBookStore,
            [STORE_KEYS.LOWESTEXCHANGESTORE]: lowestExchangeStore,
        } = this.props;

        const { swapBaseQuote } = this.state;

        const baseSymbol = instrumentsStore.selectedInstrumentPair[0];
        const quoteSymbol = instrumentsStore.selectedInstrumentPair[1];
        const convertState = convertStore.convertState;

        return (
            <ExCellContainer id="exchange-cells-container">
                {/*
                {convertState !== STATE_KEYS.submitOrder && (
                    <GraphPrices.SortCtrl>
                        <div className="graph-prices__sort">
                            <button className="graph-prices__sort__btn"
                                    onClick={this.handleSortBtn}
                            >
                                {
                                    convertState === STATE_KEYS.coinSearch &&
                                    `1${swapBaseQuote ? quoteSymbol : baseSymbol} ≈`
                                    || convertState === STATE_KEYS.amtInput &&
                                    `1${quoteSymbol} ≈`
                                }
                            </button>
                        </div>
                    </GraphPrices.SortCtrl>
                )}
                */}

                <ExchangeCellsContent
                    instrumentsStore={instrumentsStore}
                    convertStore={convertStore}
                    orderBookStore={orderBookStore}
                    lowestExchangeStore={lowestExchangeStore}
                    convertState={convertState}
                    swapBaseQuote={swapBaseQuote}
                />
            </ExCellContainer>
        );
    }
}

export default inject(
    STORE_KEYS.INSTRUMENTS,
    STORE_KEYS.CONVERTSTORE,
    STORE_KEYS.ORDERBOOK,
    STORE_KEYS.LOWESTEXCHANGESTORE
)(observer(ExchangeCells));
