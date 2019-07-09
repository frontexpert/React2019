import React from 'react';
import styled from 'styled-components';
import { AutoSizer } from 'react-virtualized';
import { inject, observer } from 'mobx-react';
import { compose, withProps } from 'recompose';

import { STORE_KEYS } from '../../stores';
import { STATE_KEYS } from '../../stores/ConvertStore';
import PriceChartCanvas from './PriceChartCanvas';
import DonutChart from './DonutChart';
import TradingView from './TradingView';
import GraphPrices from './Styles/graphprices';
import RightLowerSectionGrid from '../../grid/RightLowerSectionGrid';
import { viewModeKeys } from '../../stores/ViewModeStore';
import { orderFormToggleKeys } from '../../stores/OrderFormToggle';
import ArrowUpIcon from './ArrowUpIcon';
import PortfolioChartCanvas from './PortfolioChartCanvas';

/**
 *  Container styles
 */
const BGraph = styled.div.attrs({ className: 'bgraph' })`
    border-radius: ${props => props.theme.palette.borderRadius};
    border: none;
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    display: flex;
    flex: 1 1;
    background: transparent;
    // overflow: hidden;

    position: ${props => (props.fullmode ? 'fixed' : 'relative')};
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: ${props => (props.fullmode ? 100000 : 99999)};
`;

const BGraphSection = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    // overflow: hidden;
    transition: width 0.25s linear;
`;

const BGraphControls = styled.div`
    position: absolute;
    ${props => props.isBorderHidden && 'border: none !important;'}
    left: 0;
    top: 0;
    right: 0;
    width: 100%;
    height: ${props => props.height}px;
    // overflow: hidden;
    border-right: 1px solid ${props => props.theme.palette.clrBorder};
    border-bottom: ${props => (!props.isCoinSearch ? '1px solid ' + props.theme.palette.clrBorder : '')};
    border-radius: ${props => props.theme.palette.borderRadius};
`;

const GraphTool = ({
    baseSymbol,
    quoteSymbol,
    isFullScreen,
    depthChartMode,
    isDGLoaded,
    setViewMode,
    showDepthChartMode,
    tradingViewMode,
    setTradingViewMode,
    selectedCoin,
    convertState,
    updateExchange,
    exchangeIndex,
    isLoggedIn,
    showOrderFormWith,
    isArbitrageMode,
    graphSwitchMode,
    tradeColStatus,
    sidebarStatus,
}) => {
    baseSymbol = (baseSymbol || '').replace('F:', '');
    quoteSymbol = (quoteSymbol || '').replace('F:', '');

    let isPriceChart = convertState === STATE_KEYS.coinSearch;
    let isTradingView = exchangeIndex > -1 && tradingViewMode;
    if (convertState === STATE_KEYS.coinSearch && tradingViewMode) {
        isTradingView = true;
        isPriceChart = false;
    }
    let isDonutChart = (!isPriceChart && !isTradingView) || graphSwitchMode;
    const isLowerSectionOpened = depthChartMode && isDGLoaded;
    const lowerSectionHeight = 275;
    let isWalletPopup = selectedCoin !== '' && convertState === STATE_KEYS.coinSearch;
    let isBestRateTradingView = false;

    if (convertState === STATE_KEYS.coinSearch && isTradingView) {
        isPriceChart = false;
        isWalletPopup = false;
        isBestRateTradingView = true;
    }

    // // show depthChart & advanced Orderform by default when page is loaded
    // if (!isLowerSectionOpened && isDGLoaded && (convertState === STATE_KEYS.coinSearch) && isFirstLoad) {
    //     showDepthChartMode(true);
    //     setViewMode(viewModeKeys.advancedModeKey);
    //     showOrderFormWith(orderFormToggleKeys.onToggleKey);
    //     setTradingViewMode(true);
    //     updateExchange(0, '');
    //     setIsFirstLoad(false);
    // }
    const isArbitrageMonitorMode = isArbitrageMode && convertState !== STATE_KEYS.coinSearch;
    const isBoderHidden = (isArbitrageMonitorMode && tradeColStatus === 'closed') || sidebarStatus === 'closed';

    return (
        <AutoSizer>
            {({ width, height }) => {
                if (isFullScreen) {
                    width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
                    height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
                }
                const chartHeight = convertState === STATE_KEYS.coinSearch ? height - 15 : height;

                return (
                    <BGraph width={width} height={height} fullmode={isFullScreen} id="graph-chart-parent">
                        <BGraphSection>
                            <BGraphControls
                                height={isLowerSectionOpened ? height - lowerSectionHeight : height}
                                isCoinSearch={convertState === STATE_KEYS.coinSearch}
                                isBorderHidden={isBoderHidden}
                            >
                                {isPriceChart && isWalletPopup && !isBestRateTradingView && (
                                    <PriceChartCanvas
                                        isLowerSectionOpened={isLowerSectionOpened}
                                        height={isLowerSectionOpened ? chartHeight - lowerSectionHeight : height}
                                        isBorderHidden={isBoderHidden}
                                    />
                                )}

                                {isArbitrageMode && isDonutChart && (
                                    <PortfolioChartCanvas isBorderHidden={isBoderHidden} />
                                )}

                                {isTradingView && (
                                    <TradingView
                                        width={width}
                                        height={isLowerSectionOpened ? chartHeight - lowerSectionHeight : height}
                                        convertState={convertState}
                                        coinPair={baseSymbol ? `${baseSymbol}-${quoteSymbol}` : 'BTC-USDT'}
                                    />
                                )}

                                {isDonutChart && (
                                    <DonutChart
                                        width={width}
                                        height={isLowerSectionOpened ? chartHeight - lowerSectionHeight : height}
                                        isLoggedIn={isLoggedIn}
                                        isExchangeCellsV2
                                        donutChatId="donut-chart"
                                    />
                                )}

                                {convertState === STATE_KEYS.coinSearch && isLowerSectionOpened && (
                                    <GraphPrices.BottomToggleBar
                                        isOpened={isLowerSectionOpened}
                                        onClick={() => {
                                            if (isLowerSectionOpened) {
                                                showDepthChartMode(false);
                                                showOrderFormWith(orderFormToggleKeys.offToggleKey);
                                                setViewMode(viewModeKeys.basicModeKey);
                                                setTradingViewMode(false);
                                            } else {
                                                if (!isDGLoaded) return;
                                                showDepthChartMode(true);
                                                setViewMode(viewModeKeys.advancedModeKey);
                                                showOrderFormWith(orderFormToggleKeys.offToggleKey);
                                                setTradingViewMode(true);
                                                updateExchange(0, '');
                                            }
                                        }}
                                    >
                                        <ArrowUpIcon />
                                    </GraphPrices.BottomToggleBar>
                                )}
                            </BGraphControls>
                            {isLowerSectionOpened && <RightLowerSectionGrid />}
                        </BGraphSection>
                    </BGraph>
                );
            }}
        </AutoSizer>
    );
};

export default compose(
    inject(
        STORE_KEYS.INSTRUMENTS,
        STORE_KEYS.VIEWMODESTORE,
        STORE_KEYS.CONVERTSTORE,
        STORE_KEYS.LOWESTEXCHANGESTORE,
        STORE_KEYS.YOURACCOUNTSTORE,
        STORE_KEYS.TELEGRAMSTORE,
        STORE_KEYS.SETTINGSSTORE,
        STORE_KEYS.ORDERFORMTOGGLE,
        STORE_KEYS.ORDERHISTORY,
        STORE_KEYS.ORDERBOOK
    ),
    observer,
    withProps(
        ({
            [STORE_KEYS.ORDERBOOK]: { isDGLoaded, base: baseSymbol, quote: quoteSymbol },
            [STORE_KEYS.VIEWMODESTORE]: {
                isFullScreen,
                depthChartMode,
                showDepthChartMode,
                tradingViewMode,
                setTradingViewMode,
                setViewMode,
                isFirstLoad,
                setIsFirstLoad,
                graphSwitchMode,
            },
            [STORE_KEYS.CONVERTSTORE]: { convertState },
            [STORE_KEYS.LOWESTEXCHANGESTORE]: { updateExchange, exchangeIndex },
            [STORE_KEYS.TELEGRAMSTORE]: { isLoggedIn },
            [STORE_KEYS.YOURACCOUNTSTORE]: { selectedCoin },
            [STORE_KEYS.ORDERFORMTOGGLE]: { showOrderFormWith },
            [STORE_KEYS.SETTINGSSTORE]: { isArbitrageMode, tradeColStatus, sidebarStatus },
        }) => {
            return {
                baseSymbol,
                quoteSymbol,
                isFullScreen,
                depthChartMode,
                showDepthChartMode,
                isDGLoaded,
                tradingViewMode,
                setTradingViewMode,
                setViewMode,
                isFirstLoad,
                setIsFirstLoad,
                graphSwitchMode,
                convertState,
                updateExchange,
                exchangeIndex,
                isLoggedIn,
                selectedCoin,
                showOrderFormWith,
                isArbitrageMode,
                tradeColStatus,
                sidebarStatus,
            };
        }
    )
)(GraphTool);
