/* eslint-disable react/no-multi-comp */
import React, { Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Tooltip } from 'react-tippy';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

import { AutoSizer } from 'react-virtualized';
import { STORE_KEYS } from '../../../stores';
import { STATE_KEYS } from '../../../stores/ConvertStore';
import {
    customDigitFormat,
    fillUntil,
    unifyDigitString,
    customDigitFormatWithNoTrim,
    format2DigitStringForDonut
} from '../../../utils';
import { viewModeKeys } from '../../../stores/ViewModeStore';
import { HexColors, GreenHexColors, getChartColors } from './colors';

// TODO mock data - plans
import Plan from './mockPlan';

import {
    ItemNormal,
    ItemTitle,
    ItemExchPair,
    ItemExchPairSimple,
    ItemExchPairRatioText,
    ItemExchPairSideIcon,
    ItemProgressBar,
    ArrowIcon1,
    ExchangeWrapper,
    ExCellTable,
    ExCellContainer,
    TopSwitchWrapper,
    StyleWrapper,
    ExchangeInfoWrapper,
    ColumnObj,
    TooltipContent
} from './CellComponents';
// import TopSwitch from '../../TopSwitch';
// import SideHeader from '../../SideHeader';
// import Header from '../../Telegram/Header';
import WalletHeader from '../../PayApp/PayWindow/Header';
import CoinIcon from '../../../components-generic/CoinIcon';
import { Logo, LogoWrapper } from '../../PayApp/PayWindow/Header/Components';
import { ListItem } from '../../../components-generic/SelectDropdown/Components';
import { WalletGroupButton } from '../../OrderHistory/OrderHistoryTable/WalletGroupButton';
import {
    ArrowIcon, BTCFontIcon, WalletSideIcon
} from '../../OrderHistory/OrderHistoryTable/Components';

const maxCells = 150;

const ExchangeCell = ({
    exchange, lowestExchange, price, baseSymbol, quoteSymbol, updateExchange, setExchange, marketExchanges, index, convertState, isProgressing,
    swapBaseQuote, disabled, setTradingViewMode, setViewMode, isOrderBookStop, showOrderForm, viewMode, getLocalPrice, defaultFiat, isCoinPairInversed, defaultFiatSymbol,
}) => {
    const coinSearchPrice = swapBaseQuote ? 1 / price : price;
    let exchangeFileName = exchange.toLowerCase();
    let includedInActiveMarkets = false;

    for (let i = 0; i < marketExchanges.length; i++) {
        if (marketExchanges[i].icon.toLowerCase() === exchange.toLowerCase() + '.png')  {
            exchangeFileName = marketExchanges[i].icon.substr(0, marketExchanges[i].icon.length - 4);
            break;
        }

        if (marketExchanges[i].name === exchange && marketExchanges[i].status === 'active') {
            includedInActiveMarkets = true;
        }
    }

    const isActive = exchange === lowestExchange;
    const baseAmount = coinSearchPrice < 1 ? customDigitFormatWithNoTrim(getLocalPrice(1 / coinSearchPrice, quoteSymbol).toFixed(5)) : 1;
    const quoteAmount = coinSearchPrice < 1 ? 1 : customDigitFormatWithNoTrim(getLocalPrice(coinSearchPrice, quoteSymbol).toFixed(5));
    const c1Coin = isCoinPairInversed ? quoteSymbol : baseSymbol;
    const c2Coin = isCoinPairInversed ? baseSymbol : quoteSymbol;
    const c1Amount = isCoinPairInversed ? quoteAmount : baseAmount;
    const c2Amount = isCoinPairInversed ? baseAmount : quoteAmount;

    return (
        <ItemNormal
            active={isActive}
            coinSearch={convertState === STATE_KEYS.coinSearch}
            last={index === 0}
            planCell={false}
            isPlan={false}
            isRealExchange={false}
            isProgressing={isProgressing}
            disabled={disabled || (!isActive && !includedInActiveMarkets)}
            onClick={() => {
                if ((convertState !== STATE_KEYS.submitOrder) && (convertState !== STATE_KEYS.orderDone)) {
                    if (!disabled && (isActive || includedInActiveMarkets)) {
                        setTradingViewMode(true);
                        if (convertState === STATE_KEYS.amtInput) {
                            if (exchange === lowestExchange) {
                                // setViewMode(viewModeKeys.basicModeKey);
                                // Reset if already selected
                                setTimeout(() => {
                                    updateExchange(-1, '');
                                    setExchange('Global');
                                }, 1000);
                            } else {
                                updateExchange(index, exchange);
                                setExchange(exchange);
                                // if (!isOrderBookStop) {
                                //     setViewMode(viewModeKeys.advancedModeKey);
                                // } else {
                                //     setViewMode(viewModeKeys.exchangesModeKey);
                                // }
                            }
                        } else {
                            updateExchange(index, exchange);
                            setExchange(exchange);
                        }
                    }
                }
            }}
            className="exch-bar-item"
        >
            <ItemExchPair>
                <ItemExchPairSimple
                    active={exchange === lowestExchange}
                    isProgress={false}
                    isRealExchange={false}
                    isProgressing={isProgressing}
                >
                    <ColumnObj>
                        <ItemExchPairSideIcon
                            value={exchangeFileName}
                            type="ExchangeIcon"
                            size={38}
                            className={exchange + 'exch'}
                            isOpen={false}
                            isSearchState={false}
                            defaultFiat={defaultFiat}
                        />
                        <div className="c1Symbol inactive">
                            {exchange}
                        </div>
                        <div className="c1Amount inactive">
                            <WalletGroupButton
                                inProgress={true}
                                isLeft={true}
                                isBuy={!isCoinPairInversed}
                                progress={false}
                                isWhite={false}
                                position={false}
                            >
                                <WalletSideIcon />
                                <span>
                                    {c1Amount}
                                </span>
                                <span className="infoIcon">
                                    <BTCFontIcon />
                                </span>
                            </WalletGroupButton>
                        </div>
                    </ColumnObj>

                    <ExchangeWrapper isActive={false} isCoinPairInversed={isCoinPairInversed}>
                        {/* <ArrowIcon1/> */}
                        <div className="info-arrow-directional">
                            <div className="wrapper_arrow">
                                <ArrowIcon className="arrow-icon" />
                                <span className="type-label">{isCoinPairInversed ? 'BUY' : 'SELL'}</span>
                            </div>
                        </div>
                    </ExchangeWrapper>

                    <ColumnObj right>
                        <div className="c1Amount">
                            <WalletGroupButton
                                inProgress={true}
                                isLeft={false}
                                isBuy={!isCoinPairInversed}
                                progress={false}
                                isWhite={false}
                                position={false}
                            >
                                <WalletSideIcon isRight/>
                                <span>
                                    {c2Amount}
                                </span>
                                <span className="infoIcon">
                                    <span>{defaultFiatSymbol}</span>
                                </span>
                            </WalletGroupButton>
                        </div>
                        <div className="c1Symbol inactive">
                            @{c2Amount}
                        </div>
                        {/*
                        <ItemExchPairSideIcon
                            value={c2Coin}
                            size={38}
                            className={c2Coin + 'quote'}
                            isOpen={false}
                            isSearchState={false}
                            defaultFiat={defaultFiat}
                        />
                        */}
                    </ColumnObj>

                    <ExchangeInfoWrapper active={convertState === STATE_KEYS.coinSearch}>
                        {/*
                        <Tooltip
                            animation="fade"
                            arrow={true}
                            position="bottom"
                            followCursor
                            distance={10}
                            theme="bct"
                            title={exchange.charAt(0).toUpperCase() + exchange.slice(1)}
                        >
                            <div className="display-flex">
                                <ItemExchPairSideIcon
                                    value={exchangeFileName}
                                    type="ExchangeIcon"
                                    size={38}
                                    className={exchange + 'exch'}
                                    isOpen={false}
                                    isSearchState={false}
                                    defaultFiat={defaultFiat}
                                />
                            </div>
                        </Tooltip>
                        */}
                    </ExchangeInfoWrapper>
                </ItemExchPairSimple>
            </ItemExchPair>
        </ItemNormal>
    );
};

class ExchangePlanCell extends React.Component {
    state = {
        isOpen: false,
        itemHover: false,
        CustomAmColors: [],
        itemCount: -1,
    };

    handleClick = () => {
        if (this.props.confirmed) {
            this.setState(prevState => ({
                isOpen: !prevState.isOpen,
            }));
        }
    };

    onMouseEnter = () => {
        this.setState({
            itemHover: true,
        });

        this.props.updateHoverExchange(this.props.exchange);
    };

    onMouseLeave = () => {
        this.setState({
            itemHover: false,
        });

        this.props.updateHoverExchange('');
    };

    getColor = (index, isCoinPairInversed) => {
        /*
        if (this.state.CustomAmColors.length <= index) {
            return '#000';
        }
        if (this.state.itemCount > 0) {
            return this.state.CustomAmColors[index].hex;
        }
        */
        if (isCoinPairInversed)  return GreenHexColors[index >= GreenHexColors.length ? GreenHexColors.length - 1 : index];
        return HexColors[index >= HexColors.length ? 0 : HexColors.length - 1 - index];
    };

    render() {
        const {
            exchange, hoverExchange, hoverExchangeFromDonut, price, quoteSymbol, baseSymbol, amount, spentAmount, index, convertState, percentage, isProgressing,
            setViewMode, isOrderBookStop, showOrderForm, viewMode, updateExchange, setExchange, marketExchanges, lowestExchange, setTradingViewMode,
            confirmed, partial, getLocalPrice, defaultFiat, length, isCoinPairInversed, defaultFiatSymbol, orderForm, totalPrice, selectedQuote,
        } = this.props;

        const details = Plan.data[0].details;
        const { isOpen, itemCount } = this.state;
        if (length && length !== 0 && itemCount !== length) {
            this.setState({
                CustomAmColors: getChartColors(length),
                itemCount: length,
            });
        }

        let exchangeFileName = exchange.toLowerCase();
        for (let i = 0; i < marketExchanges.length; i++) {
            if (marketExchanges[i].icon.toLowerCase() === exchange.toLowerCase() + '.png')  {
                exchangeFileName = marketExchanges[i].icon.substr(0, marketExchanges[i].icon.length - 4);
                break;
            }
        }

        /*
        const baseAmount = isProgressing
            ? customDigitFormat(spentAmount)
            : (price < 1 ? customDigitFormatWithNoTrim(getLocalPrice(1 / price, quoteSymbol)) : 1);
        */
        const baseTotalAmount = customDigitFormatWithNoTrim(getLocalPrice(orderForm.amount, quoteSymbol));
        const quoteTotalAmount = customDigitFormatWithNoTrim(getLocalPrice(totalPrice, selectedQuote));
        const baseAmount = customDigitFormatWithNoTrim(getLocalPrice(orderForm.amount * partial / 100, quoteSymbol));
        const quoteAmount = customDigitFormatWithNoTrim(getLocalPrice(totalPrice * partial / 100, selectedQuote));
        const c1Coin = isCoinPairInversed ? quoteSymbol : baseSymbol;
        const c2Coin = isCoinPairInversed ? baseSymbol : quoteSymbol;
        const c1Amount = isCoinPairInversed ? quoteAmount : baseAmount;
        const c2Amount = isCoinPairInversed ? baseAmount : quoteAmount;
        const c1TotalAmount = isCoinPairInversed ? quoteTotalAmount : baseTotalAmount;
        const c2TotalAmount = isCoinPairInversed ? baseTotalAmount : quoteTotalAmount;
        const percentLabel = !partial || partial === 0 ? 0 : format2DigitStringForDonut(partial);

        return (
            <ItemNormal
                color={percentage === 0 ? this.getColor(index, isCoinPairInversed) : ''}
                hover={exchange === hoverExchange || exchange === hoverExchangeFromDonut}
                planCell={convertState === STATE_KEYS.submitOrder}
                active={exchange === lowestExchange}
                isOpen={isOpen}
                isPlan={true}
                coinSearch={false}
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
                isRealExchange={true}
                isProgressing={isProgressing}
                onClick={() => {
                    setTradingViewMode(true);
                    if (exchange === lowestExchange) {
                        // setViewMode(viewModeKeys.basicModeKey);
                        setTimeout(() => {
                            updateExchange(-1, '');
                            setExchange('Global');
                        }, 1000);
                    } else {
                        updateExchange(index, exchange);
                        setExchange(exchange);
                        // showOrderForm();
                        /*
                        if (!isOrderBookStop) {
                            setViewMode(viewModeKeys.advancedModeKey);
                        } else {
                            setViewMode(viewModeKeys.basicModeKey);
                        }
                        */
                    }
                }}
            >
                {/*
                <ItemProgressBar color={this.getColor(index, isCoinPairInversed)} progress={percentage} isCoinPairInversed={isCoinPairInversed}/>
                */}
                <ItemExchPairSimple
                    hover={this.state.itemHover || (exchange === hoverExchange)}
                    isProgress={true}
                    isRealExchange={true}
                    isProgressing={isProgressing}
                >
                    <ColumnObj>
                        <ItemExchPairSideIcon
                            value={exchangeFileName}
                            type="ExchangeIcon"
                            size={38}
                            className={exchange + 'exch'}
                            isOpen={isOpen}
                            isSearchState={false}
                            hover={(exchange === hoverExchange) || percentage > 0}
                            defaultFiat={defaultFiat}
                        />
                        <Tooltip
                            followCursor
                            className="exch-name-tooltip"
                            animation="fade"
                            arrow={true}
                            position="bottom"
                            distance={10}
                            theme="bct"
                            title={exchange}
                        >
                            <div className="c1Symbol">
                                {exchange}
                            </div>
                        </Tooltip>
                        <div className={`c1Amount ${isCoinPairInversed && 'expRight'}`}>
                            <WalletGroupButton
                                masterColor={this.getColor(index, isCoinPairInversed)}
                                inProgress={isCoinPairInversed}
                                isLeft={true}
                                isBuy={!isCoinPairInversed}
                                progress={isCoinPairInversed && isProgressing}
                                isWhite={false}
                                position={false}
                            >
                                <WalletSideIcon/>
                                <span>
                                    {c1Amount}
                                </span>
                                <span className="infoIcon">
                                    <BTCFontIcon />
                                </span>
                            </WalletGroupButton>
                        </div>
                    </ColumnObj>

                    <ExchangeWrapper isActive={true} isCoinPairInversed={isCoinPairInversed}>
                        {/* <ArrowIcon1/> */}
                        <div className="info-arrow-directional">
                            <div className="wrapper_arrow">
                                <ArrowIcon className="arrow-icon" />
                                <span className="type-label">{isCoinPairInversed ? 'BUY' : 'SELL'}</span>
                            </div>
                        </div>
                    </ExchangeWrapper>

                    <ColumnObj right>
                        <div className={`c1Amount ${!isCoinPairInversed && 'expRight'}`}>
                            <WalletGroupButton
                                masterColor={this.getColor(index, isCoinPairInversed)}
                                isShouldOneAnim
                                inProgress={!isCoinPairInversed}
                                isLeft={false}
                                isBuy={!isCoinPairInversed}
                                progress={!isCoinPairInversed && isProgressing}
                                isWhite={false}
                                position={false}
                            >
                                <WalletSideIcon isRight/>
                                <span>
                                    {c2Amount}
                                </span>
                                <span className="infoIcon">
                                    <span>{defaultFiatSymbol}</span>
                                </span>
                            </WalletGroupButton>
                        </div>
                        <div className="c1Symbol">
                            <Tooltip
                                animation="fade"
                                arrow={true}
                                position="bottom"
                                followCursor
                                distance={10}
                                theme="bct"
                                title={`1->${defaultFiatSymbol}${c2TotalAmount}`}
                            >
                                @{c2TotalAmount}
                            </Tooltip>
                        </div>
                        {/*
                        <ItemExchPairSideIcon
                            value={c2Coin}
                            size={38}
                            className={c2Coin + 'quote'}
                            isOpen={isOpen}
                            isSearchState={false}
                            hover={(exchange === hoverExchange) || percentage > 0}
                            defaultFiat={defaultFiat}
                        />
                        */}
                    </ColumnObj>

                    <ExchangeInfoWrapper active>
                        <Tooltip
                            animation="fade"
                            arrow={true}
                            position="bottom"
                            followCursor
                            distance={10}
                            theme="bct"
                            html={(
                                <TooltipContent value={exchangeFileName}>
                                    <div className="tooltip-icon"/>
                                    <span>{exchange.charAt(0).toUpperCase() + exchange.slice(1)}</span>
                                </TooltipContent>
                            )}
                        >
                            <div className="display-flex">
                                {/*
                                <ItemExchPairSideIcon
                                    value={exchangeFileName}
                                    type="ExchangeIcon"
                                    size={38}
                                    className={exchange + 'exch'}
                                    isOpen={isOpen}
                                    isSearchState={false}
                                    hover={(exchange === hoverExchange) || percentage > 0}
                                    defaultFiat={defaultFiat}
                                />
                                <div className="percentage">
                                    <div className="value">{!partial || partial === 0 ? 0 : format2DigitStringForDonut(partial)}</div>
                                    <div className="percent-symbol"><span>%</span></div>
                                </div>
                                */}
                                {/*
                                <div className="percentage-badge">%</div>
                                */}
                                <CircularProgressbar
                                    strokeWidth={10}
                                    value={!partial || partial === 0 ? 0 : partial}
                                    maxValue={100}
                                    text={`${percentLabel}%`}
                                    background={true}
                                    styles={buildStyles({
                                        textSize: '33px',
                                        textColor: '#6ac6de',
                                        pathColor: '#6ac6de',
                                        trailColor: '#2c3133',
                                        backgroundColor: '#0000',
                                    })}
                                />
                            </div>
                        </Tooltip>
                    </ExchangeInfoWrapper>
                </ItemExchPairSimple>
            </ItemNormal>
        );
    }
}

const ObservedExchangeCell = (observer(
    ({
        searchValue,
        orderBookStore: {
            pricesByExchangeCCA, pricesByExchange, isOrderBookStop, isCoinPairInversed,
        },
        instrumentsStore: { selectedInstrumentPair: [baseSymbol, quoteSymbol], selectedQuote },
        lowestExchangeStore: {
            updateExchange, lowestExchange, hoverExchange, hoverExchangeFromDonut, updateHoverExchange, PlanForExchangesBar: Plan, confirmed, totalPrice,
        },
        convertStore: { convertState, setCurrentProgress },
        orderFormToggle: { showOrderForm },
        viewModeStore: {
            setViewMode, viewMode, setTradingViewMode, isSearchEnabled,
        },
        settingsStore: {
            getLocalPrice, defaultFiat, defaultFiatSymbol,
        },
        index,
        swapBaseQuote,
        setExchange,
        marketExchanges,
        orderForm,
    }) => {
        const isProgressing = (convertState === STATE_KEYS.submitOrder) || (convertState === STATE_KEYS.orderDone);
        if (convertState === STATE_KEYS.amtInput || convertState === STATE_KEYS.submitOrder || convertState === STATE_KEYS.orderDone) {
            if (Plan && Plan.length > index) {
                if (index === 0) {
                    setCurrentProgress(Plan.get(0).progress);
                }
                return (
                    <Fragment>
                        <ExchangePlanCell
                            // baseSymbol={Plan.get(index).Bid.toUpperCase()} Hacking, since backend is sending swapped
                            length={Plan.length}
                            baseSymbol={Plan.get(index).Ask.toUpperCase()}
                            quoteSymbol={Plan.get(index).Bid.toUpperCase()}
                            exchange={Plan.get(index).Exchange}
                            marketExchanges={marketExchanges}
                            lowestExchange={lowestExchange}
                            hoverExchange={hoverExchange || ''}
                            updateHoverExchange={updateHoverExchange}
                            hoverExchangeFromDonut={hoverExchangeFromDonut || ''}
                            price={Plan.get(index).Price}
                            spentAmount={Plan.get(index).spentAmount}
                            amount={Plan.get(index).Amount}
                            convertState={convertState}
                            index={index}
                            partial={Plan.get(index).Percentage}
                            percentage={Plan.get(index).progress}
                            details={Plan.get(index).details || []}
                            confirmed={confirmed}
                            setViewMode={setViewMode}
                            setTradingViewMode={setTradingViewMode}
                            isOrderBookStop={isOrderBookStop}
                            showOrderForm={showOrderForm}
                            viewMode={viewMode}
                            updateExchange={updateExchange}
                            setExchange={setExchange}
                            getLocalPrice={getLocalPrice}
                            defaultFiat={defaultFiat}
                            isProgressing={isProgressing}
                            isCoinPairInversed={isCoinPairInversed}
                            defaultFiatSymbol={defaultFiatSymbol}
                            orderForm={orderForm}
                            totalPrice={totalPrice}
                            selectedquote={selectedQuote}
                        />
                    </Fragment>
                );
            }

            const planLength = Plan ? Plan.length : 0;
            const secondIndex = index - planLength;
            const lowestPrice = Plan[planLength - 1] ? Plan[planLength - 1].Price : 0;

            if (pricesByExchangeCCA.has(secondIndex)) {
                const exchangeName = (pricesByExchangeCCA.get(secondIndex)[0] || '').toLowerCase();
                const exchangePrice = pricesByExchangeCCA.get(secondIndex)[1] || 0;

                for (let i = 0; i < Plan.length; i++) {
                    if ((exchangeName === Plan.get(i).Exchange.toLowerCase()) || (exchangePrice > lowestPrice && lowestPrice !== 0)) {
                        return (
                            <Fragment/>
                        );
                    }
                }
            }

            return (
                <Fragment>
                    {pricesByExchangeCCA.has(secondIndex) && (
                        <ExchangeCell
                            baseSymbol={baseSymbol}
                            quoteSymbol={quoteSymbol}
                            exchange={pricesByExchangeCCA.get(secondIndex)[0]}
                            lowestExchange={lowestExchange}
                            price={pricesByExchangeCCA.get(secondIndex)[1]}
                            updateExchange={updateExchange}
                            setExchange={setExchange}
                            marketExchanges={marketExchanges}
                            index={secondIndex}
                            convertState={convertState}
                            swapBaseQuote={swapBaseQuote}
                            disabled={false}
                            setTradingViewMode={setTradingViewMode}
                            setViewMode={setViewMode}
                            isOrderBookStop={isOrderBookStop}
                            showOrderForm={showOrderForm}
                            viewMode={viewMode}
                            getLocalPrice={getLocalPrice}
                            defaultFiat={defaultFiat}
                            isProgressing={isProgressing}
                            isCoinPairInversed={isCoinPairInversed}
                            defaultFiatSymbol={defaultFiatSymbol}
                        />
                    )}
                </Fragment>
            );
        }

        if (convertState === STATE_KEYS.coinSearch) {
            let includes = pricesByExchangeCCA.has(index);
            if (includes) {
                const exchangeName = pricesByExchangeCCA.get(index)[0].toLowerCase();
                if (isSearchEnabled && searchValue && !exchangeName.includes(searchValue)) {
                    includes = false;
                }
            }

            return (
                <Fragment>
                    {includes && (
                        <ExchangeCell
                            baseSymbol={baseSymbol}
                            quoteSymbol={quoteSymbol}
                            exchange={pricesByExchangeCCA.get(index)[0]}
                            lowestExchange={lowestExchange}
                            price={pricesByExchangeCCA.get(index)[1]}
                            updateExchange={updateExchange}
                            setExchange={setExchange}
                            marketExchanges={marketExchanges}
                            index={index}
                            convertState={convertState}
                            swapBaseQuote={swapBaseQuote}
                            disabled={false}
                            setTradingViewMode={setTradingViewMode}
                            setViewMode={setViewMode}
                            isOrderBookStop={isOrderBookStop}
                            showOrderForm={showOrderForm}
                            viewMode={viewMode}
                            getLocalPrice={getLocalPrice}
                            defaultFiat={defaultFiat}
                            isProgressing={isProgressing}
                            isCoinPairInversed={isCoinPairInversed}
                            defaultFiatSymbol={defaultFiatSymbol}
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

        this.scrollBarRef = null;
        this.perfectScrollRef = null;
        this.state = {
            isScrollTopVisible: false,
        };
    }

    componentDidMount() {
        setTimeout(this.updateScroll);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        setTimeout(this.updateScroll);
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
            if (!this.perfectScrollRef) { return; }
            this.perfectScrollRef.scrollTop = this.perfectScrollRef.scrollTop - perTick;
            if (this.perfectScrollRef.scrollTop === 0) {
                return;
            }
            this.scrollTop(duration - 10);
        }, 10);
    };

    updateScroll = () => {
        if (this.scrollBarRef && this.scrollBarRef.updateScroll) {
            this.scrollBarRef.updateScroll();
        }
    };

    render() {
        const {
            isScrollTopVisible,
        } = this.state;

        const {
            searchValue,
            instrumentsStore,
            convertStore,
            orderBookStore,
            lowestExchangeStore,
            orderFormToggle,
            convertState,
            swapBaseQuote,
            viewModeStore,
            settingsStore,
            setExchange,
            marketExchanges,
            orderForm,
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
                    ref={ref => { this.scrollBarRef = ref; }}
                    containerRef={element => {
                        this.perfectScrollRef = element;
                    }}
                    option={{ minScrollbarLength: 40, maxScrollbarLength: 60 }}
                    onYReachStart={this.handleScrollReachedStart}
                    onScrollY={this.handleScrollY}
                >
                    <div className="exchange_cells">
                        {fillUntil(
                            maxCells,
                            i => (
                                <ObservedExchangeCell
                                    searchValue={searchValue}
                                    orderBookStore={orderBookStore}
                                    instrumentsStore={instrumentsStore}
                                    lowestExchangeStore={lowestExchangeStore}
                                    setExchange={setExchange}
                                    marketExchanges={marketExchanges}
                                    convertStore={convertStore}
                                    swapBaseQuote={swapBaseQuote}
                                    orderFormToggle={orderFormToggle}
                                    viewModeStore={viewModeStore}
                                    settingsStore={settingsStore}
                                    index={i}
                                    key={i}
                                    orderForm={orderForm}
                                />
                            )
                        )}
                    </div>
                </PerfectScrollbar>
            </Fragment>
        );
    }
}

class ExchangeCells extends React.Component {
    state = {
        swapBaseQuote: false,
        searchValue: '',
    };

    handleChangeSearchValue = ({ target: { value: searchValue } }) => {
        this.setState({
            searchValue,
        });
    };
    render() {
        const {
            [STORE_KEYS.INSTRUMENTS]: instrumentsStore,
            [STORE_KEYS.CONVERTSTORE]: convertStore,
            [STORE_KEYS.ORDERBOOK]: orderBookStore,
            [STORE_KEYS.LOWESTEXCHANGESTORE]: lowestExchangeStore,
            [STORE_KEYS.EXCHANGESSTORE]: { setExchange, marketExchanges },
            [STORE_KEYS.ORDERFORMTOGGLE]: orderFormToggle,
            [STORE_KEYS.VIEWMODESTORE]: viewModeStore,
            [STORE_KEYS.TELEGRAMSTORE]: telegramStore,
            [STORE_KEYS.SETTINGSSTORE]: settingsStore,
            [STORE_KEYS.ORDERENTRY]: orderEntryStore,
            isDonutMode,
        } = this.props;

        const { CoinsPairSearchMarketOrderBuyForm: orderForm } = orderEntryStore;
        const { isLoggedIn } = telegramStore;
        const { isRealTrading } = settingsStore;
        const { pricesByExchangeCCA } = orderBookStore;
        const {
            PlanForExchangesBar: Plan,
        } = lowestExchangeStore;

        const { swapBaseQuote, searchValue } = this.state;

        let itemSize = (Plan.length || 0) + (pricesByExchangeCCA.size || 0);
        if (convertStore.convertState === STATE_KEYS.coinSearch && viewModeStore.isSearchEnabled && searchValue) {
            itemSize = 0;
            for (let i = 0; i < pricesByExchangeCCA.size; i++) {
                if (pricesByExchangeCCA.has(i) && pricesByExchangeCCA.get(i)[0].toLowerCase().includes(searchValue)) {
                    itemSize += 1;
                }
            }
        }

        return (
            <ExCellTable isDonutMode={isDonutMode}>
                <AutoSizer>
                    {({ width, height }) => (
                        <StyleWrapper width={width} height={height}>
                            {/*
                                viewModeStore.isSearchEnabled
                                ? (
                                    <Header
                                        sidebar
                                        type="search"
                                        value={searchValue}
                                        onSearch={this.handleChangeSearchValue}
                                        hasBorder
                                    />
                                )
                                : (
                                    <SideHeader isWorldBook={!isLoggedIn || (isLoggedIn && isRealTrading)}/>
                                )
                            */}
                            {
                                !isDonutMode &&
                                <WalletHeader isExchange isSeparate />
                            }

                            <ExCellContainer id="exchange-cells-container" isDonutMode={isDonutMode} /* hasPadding={itemSize * 111 > height - 74} */>
                                <ExchangeCellsContent
                                    searchValue={searchValue}
                                    instrumentsStore={instrumentsStore}
                                    convertStore={convertStore}
                                    orderBookStore={orderBookStore}
                                    lowestExchangeStore={lowestExchangeStore}
                                    setExchange={setExchange}
                                    marketExchanges={marketExchanges}
                                    viewModeStore={viewModeStore}
                                    convertState={convertStore.convertState}
                                    swapBaseQuote={swapBaseQuote}
                                    orderFormToggle={orderFormToggle}
                                    settingsStore={settingsStore}
                                    orderForm={orderForm}
                                />
                            </ExCellContainer>
                        </StyleWrapper>
                    )}
                </AutoSizer>
            </ExCellTable>
        );
    }
}

export default inject(
    STORE_KEYS.INSTRUMENTS,
    STORE_KEYS.CONVERTSTORE,
    STORE_KEYS.ORDERBOOK,
    STORE_KEYS.LOWESTEXCHANGESTORE,
    STORE_KEYS.EXCHANGESSTORE,
    STORE_KEYS.ORDERFORMTOGGLE,
    STORE_KEYS.VIEWMODESTORE,
    STORE_KEYS.TELEGRAMSTORE,
    STORE_KEYS.SETTINGSSTORE,
    STORE_KEYS.ORDERENTRY,
)(observer(ExchangeCells));
