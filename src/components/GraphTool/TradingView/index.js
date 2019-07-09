import React from 'react';
import { inject, observer } from 'mobx-react';
import styled, { keyframes } from 'styled-components';

import { STORE_KEYS } from '../../../stores';
import { TV_CONFIG } from '../../../config/constants';
import ChartAPI, { apiDataLoadObservable } from './ChartApi';
import DataLoader from '../../../components-generic/DataLoader';
import TradingViewPriceLabel from './TradingViewPriceLabel';
import { getDecimalPlaces } from '../../../utils';
import WalletPopup from '../WalletPopup';

const fadeOut = keyframes`
    0%   { transform: translate(0%, 0); }
    80%  { transform: translate(0%, 0); }
    100% { transform: translate(103%, 0); }
`;

const Wrapper = styled.div.attrs({ className: 'wrapper-tradingview' })`
    // display: grid;
    // grid-template-areas: 
    //     'tradingview'
    //     'rightlowersection';
    // grid-template-columns: 100%;
    // grid-template-rows: calc(100% - 275px) 263px; // 263+12=275
    // grid-gap: 12px;

    position: relative;
    width: ${props => props.width}px;
    height: 100%;
    display: flex;
    flex-direction: column;
    pointer-events: ${props => props.isCoinListOpen ? 'none' : 'all'};
    z-index: 2;
`;

const DataLoaderWrapper = styled.div`
    position: absolute;
    width: ${props => props.width}px;
    height: 100%;
`;

const ChartContainer = styled.div`
    position: relative;
    // grid-area: tradingview;
    width: ${props => props.width}px;
    flex: 1;
    border-top-left-radius: ${props => props.theme.palette.borderRadius};
    border: 1px solid ${props => props.theme.palette.clrBorder};
    // border-width: 1px 0 0 1px;
`;

const ApTradingViewChart = styled.div.attrs({ className: 'apTradingViewChart' })`
    position: relative;
    width: ${props => props.width ? `${props.width}px` : '100%'};
    height: ${props => props.height}px;
    // height: calc(100% - 15px);
    
    iframe {
        height: 100% !important;
    }
`;

const CoverBox = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 275px;
    z-index: 5;
`;

class BCTChart extends React.Component {
    constructor(props) {
        super(props);
        this.symbol = '';

        this.disableAnimation = true;
        this.isSubscribed = false;

        this.state = {
            isLoading: false,
        };
    }

    componentDidMount() {
        const {
            [STORE_KEYS.LOWESTEXCHANGESTORE]: { lowestExchange },
            [STORE_KEYS.EXCHANGESSTORE]: { selectedExchange },
            coinPair,
        } = this.props;

        let exchange = !lowestExchange ? selectedExchange.name : lowestExchange;
        if (!exchange || exchange === 'Global') exchange = 'CCCAVG';
        this.symbol = exchange + ':' + coinPair;

        this.createChart(this.symbol, TV_CONFIG);

        if (!this.isSubscribed) {
            apiDataLoadObservable
                .subscribe({
                    next: (apiDataEvent) => {
                        if (this.isSubscribed && apiDataEvent) {
                            if (apiDataEvent.apiLoaded) {
                                this.setState({
                                    isLoading: false,
                                });
                            } else {
                                this.setState({
                                    isLoading: true,
                                });
                            }
                        }
                    },
                });
            this.isSubscribed = true;
        }
    }

    componentDidUpdate() {
        try {
            const {
                [STORE_KEYS.YOURACCOUNTSTORE]: {
                    baseCoinPrice, quoteCoinPrice,
                },
                [STORE_KEYS.LOWESTEXCHANGESTORE]: { lowestExchange },
                [STORE_KEYS.EXCHANGESSTORE]: { selectedExchange },
                coinPair,
            } = this.props;

            let exchange = (!lowestExchange) ? selectedExchange.name : lowestExchange;
            if (!exchange || exchange === 'Global') exchange = 'CCCAVG';
            const symbol = exchange + ':' + coinPair;

            if (this.tv && this.tv._ready && this.tv._options) {

                const currentDecimalPlaces = this.tv._options.overrides['mainSeriesProperties.minTick'];
                const incomingDecimalPlaces = (baseCoinPrice > 0 && quoteCoinPrice > 0) ? getDecimalPlaces(baseCoinPrice / quoteCoinPrice).toString() : currentDecimalPlaces;

                if (currentDecimalPlaces !== incomingDecimalPlaces) {
                    let tvConfig = TV_CONFIG;
                    tvConfig.overrides['mainSeriesProperties.minTick'] = incomingDecimalPlaces;
                    // this.tv.applyOverrides(tvConfig); // this function sometimes doesn't work.
                    this.tv.remove();
                    this.createChart(symbol, tvConfig);
                    this.symbol = symbol;
                }
            }

            if (this.symbol !== symbol) {
                if (!this.tv) {
                    this.createChart(symbol, TV_CONFIG);
                } else if (this.tv.activeChart) {
                    this.tv.activeChart().setSymbol(symbol);
                }
                this.symbol = symbol;
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    componentWillUnmount() {
        if (this.tv && !this.tv.remove) {
            console.error(new Error('Method undefined this.tv.removed'));
            return;
        }

        try {
            this.tv.remove();
        } catch (err) {
            console.log(err.message);
        }
        this.isSubscribed = false;
    }

    onFullScreen = () => {
        this.props[STORE_KEYS.VIEWMODESTORE].toggleFullmode();
    };

    createChart = (symbol, overrides) => {
        try {
            const chartOptions = {
                symbol,
                datafeed: new ChartAPI.UDFCompatibleDatafeed(),
                library_path: 'libs/charting_library_new/',
                autosize: true,
                interval: '1',
                container_id: 'graph-chart',
                locale: 'en',
                ...overrides,
            };

            this.tv = new TradingView.widget(chartOptions);

            this.tv.onChartReady(() => {
                setTimeout(() => {
                    try {
                        let fullScreenBtn = document.querySelector('#graph-chart iframe').contentWindow.document.body.querySelector('span.button.fullscreen.iconed.apply-common-tooltip');
                        if (fullScreenBtn) {
                            fullScreenBtn.style.visibility = 'visible';
                            let fullScreenBtn2 = fullScreenBtn.cloneNode(true);
                            fullScreenBtn.parentNode.replaceChild(fullScreenBtn2, fullScreenBtn);
                            fullScreenBtn2.addEventListener('click', this.onFullScreen);
                        }
                    } catch (e) {
                        console.log('');
                    }
                }, 0);
            });
        } catch (err) {
            console.log();
        }
    };

    render() {
        const {
            width, height,
            [STORE_KEYS.TRADINGVIEWSTORE]: tradingViewStore,
            [STORE_KEYS.LOWESTEXCHANGESTORE]: { lowestExchange },
            [STORE_KEYS.EXCHANGESSTORE]: { selectedExchange },
        } = this.props;
        const {
            isLoading,
        } = this.state;
        let exchange = (!lowestExchange) ? selectedExchange.name : lowestExchange;

        const {
            isCoinListOpen,
        } = tradingViewStore;

        this.disableAnimation = false;

        return (
            <Wrapper
                disableAnimation={this.disableAnimation}
                isCoinListOpen={isCoinListOpen}
                width={width}
            >
                <ChartContainer width={width}>
                    <ApTradingViewChart
                        id="graph-chart"
                        width={width - 2}
                        height={height - 2}
                    />

                    <TradingViewPriceLabel isToggleBtn exchange={exchange}/>
                </ChartContainer>

                {(!exchange || exchange === 'Global') && (
                    <WalletPopup isGlobal={false} maxHeight={height} />
                )}

                {isLoading && (
                    <DataLoaderWrapper width={width}>
                        <DataLoader width={100} height={100}/>
                    </DataLoaderWrapper>
                )}
            </Wrapper>
        );
    }
}

export default inject(
    STORE_KEYS.VIEWMODESTORE,
    STORE_KEYS.TRADINGVIEWSTORE,
    STORE_KEYS.YOURACCOUNTSTORE,
    STORE_KEYS.LOWESTEXCHANGESTORE,
    STORE_KEYS.EXCHANGESSTORE,
)(observer(BCTChart));
