import React, { Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import Highcharts from 'highcharts';
import styled from 'styled-components';
import { debounce } from 'lodash';

import minus from './icons/minus.svg';
import plus from './icons/plus.svg';
import { initConfiguration, updateConfig } from './ChartConfig';
import { STORE_KEYS } from '../../../stores';
import DataLoader from '../../../components-generic/DataLoader';
import {
    Wrapper,
    DepthChartWrapper,
    Overlapper,
    OverlapperMask,
    MidMarketWrapper,
    ExchangeLabel,
    ZoomWrapper,
    ZoomOut,
    ZoomIn,
    Loading,
    GlobalIcon,
    Logo
} from './DepthChartComponents';

import { getScreenInfo } from '../../../utils';

let chart;

class _Chart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            overLapWidth: 0,
            colorMode: 'Buy',
            zoomingMode: null,
        };
        this.onResizeListener = this.onResizeListener.bind(this);

        this.symbol = '';
        this.spread = 10;
        this.midMarket = 0;
        this.tickInterval = 1;

        this.overLap = {
            overLapScale: 1,
            overLapLeft: 0,
            overLapSpread: 0,
            overLapBorder: false,
        };
    }

    componentDidMount() {
        chart = undefined;
        window.addEventListener('resize', this.onResizeListener);
    }

    componentWillReceiveProps(nextProps) {
        // theme comes through here to react to dark/light toggle
        const {
            midMarket, sell, buy, theme, height, width, baseCur, quoteCur, symbol, updateSpread,
        } = nextProps;

        if (sell && buy && sell.length > 1 && buy.length > 1) {


            if (chart === undefined || this.symbol !== symbol) {
                this.symbol = symbol;
                const newSpread = Math.min(sell[sell.length - 1].x - midMarket, midMarket - buy[0].x);
                const overLapSpread = Math.abs(sell[0].x - buy[buy.length - 1].x);
                const overLapWidth = width * overLapSpread / (2 * newSpread);
                const spreadRateToUpdate = overLapWidth / (100 * this.overLap.overLapScale);

                this.spread = newSpread * spreadRateToUpdate;
                updateSpread(this.spread);

                chart = Highcharts.chart('depth_chart_container', initConfiguration(baseCur, quoteCur, midMarket, buy, sell, theme, height, width, this.spread, this.setTooltipColorMode));

                this.setOverLapData(width, buy, sell);
            } else if (symbol !== baseCur + '-' + quoteCur) {
                chart.update({
                    chart: {
                        marginRight: 0,
                    },
                    yAxis: {
                        visible: false,
                    },
                    series: [{
                        name: 'Bids',
                        data: [],
                    }, {
                        name: 'Asks',
                        data: [],
                    }],
                });
            } else {
                const spread = Math.min(sell[sell.length - 1].x - midMarket, midMarket - buy[0].x);
                this.spread = spread;

                const overLapSpread = Math.abs(sell[0].x - buy[buy.length - 1].x);
                const overLapWidth = width * overLapSpread / (2 * this.spread);
                const spreadRateToUpdate = overLapWidth / (100 * this.overLap.overLapScale);

                this.spread = spread * spreadRateToUpdate;

                chart.update(updateConfig(buy, sell, height, width));
                chart.xAxis[0].setExtremes(midMarket - this.spread, midMarket + this.spread);
                this.setOverLapData(width, buy, sell);
            }
        }

        this.setState({
            zoomingMode: null,
        });
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onResizeListener);
    }

    onResizeListener = debounce(e => {
        const {
            midMarket, sell, buy, theme, height, width, baseCur, quoteCur,
        } = this.props;
        if (sell && buy && sell.length > 0 && buy.length > 0) {
            this.zoomUnit = (sell[sell.length - 1].x - buy[0].x) * 0.014;
            chart = Highcharts.chart('depth_chart_container', initConfiguration(baseCur, quoteCur, midMarket, buy, sell, theme, height, width, this.spread, this.setTooltipColorMode));
        }
    }, 350);

    setOverLapData = (width, buy, sell) => {
        try {
            if (buy && sell && buy.length > 0 && sell.length > 0) {
                let overLapSpread = sell[0].x - buy[buy.length - 1].x;
                if (overLapSpread === 0) {
                    this.overLap = {
                        overLapScale: 1,
                        overLapLeft: 0,
                        overLapSpread,
                        overLapBorder: false,
                    };
                    this.setState({
                        overLapWidth: 0,
                    });
                    return;
                }

                let overLapBorder = true;
                let overLapWidth = this.spread === 0 ? 0 : width * overLapSpread / (2 * this.spread);
                if (overLapSpread < 0) overLapWidth = -overLapWidth;

                let overLapLeft = (width - overLapWidth) / 2;

                if (overLapWidth >= width) {
                    overLapBorder = false;
                    overLapWidth = width;
                    overLapLeft = 0;
                }

                this.overLap = {
                    overLapScale: this.overLap.overLapScale,
                    overLapLeft,
                    overLapSpread,
                    overLapBorder,
                };
                this.setState({
                    overLapWidth,
                });
            } else {
                this.overLap = {
                    overLapScale: 1,
                    overLapLeft: 0,
                    overLapSpread: 0,
                    overLapBorder: false,
                };
                this.setState({
                    overLapWidth: 0,
                });
            }
        } catch (e) {
            console.log('DepthChart OverLapData setting error!', e);
        }
    };

    setTooltipColorMode = (mode) => {
        this.setState({
            colorMode: mode,
        });
    };

    zoomIn = () => {
        try {
            const {
                updateSpread, spreadMin,
            } = this.props;

            this.spread = this.spread / 2;
            this.overLap.overLapScale *= 2;
            if (this.spread < spreadMin) {
                this.overLap.overLapScale *= this.spread * 2 / spreadMin;
                this.spread = spreadMin;
            }
            updateSpread(this.spread);
            this.setState({
                zoomingMode: 'in',
            });
        } catch (e) {
            console.log('zoomIn error!', e);
        }
    };

    zoomOut = () => {
        try {
            const {
                updateSpread, spreadMax,
            } = this.props;

            this.spread = 2 * this.spread;
            this.overLap.overLapScale /= 2;
            if (this.spread > spreadMax) {
                this.overLap.overLapScale *= this.spread / (2 * spreadMax);
                this.spread = spreadMax;
            }
            updateSpread(this.spread);
            this.setState({
                zoomingMode: 'out',
            });
        } catch (e) {
            console.log('zoomOut error!', e);
        }
    };

    render() {
        try {
            const {
                midMarket, width, height, onMouseEnter, onMouseLeave, baseCur, quoteCur,
                selectedExchange, exchanges, getActiveExchanges,
                [STORE_KEYS.EXCHANGESSTORE]: { marketExchanges },
            } = this.props;

            const {
                zoomingMode,
            } = this.state;

            const {
                isMobileDevice,
                isMobilePortrait,
            } = getScreenInfo();

            let selectedTableItem = null;
            let activeExchanges = 0;
            let activeExchange = '';
            for (let i = 0; i < marketExchanges.length; i++) {
                if (marketExchanges[i].name !== 'Global' && exchanges[marketExchanges[i].name] && exchanges[marketExchanges[i].name].active) {
                    activeExchanges++;
                    activeExchange = marketExchanges[i].name;
                    selectedTableItem = marketExchanges[i];
                }
            }
            const activeMarketExchanges = marketExchanges.filter(m => m.status === 'active');
            const countExchange = (activeExchanges === 0) ? activeMarketExchanges.length : activeExchanges;
            if (this.props.value === 'Global' && activeExchanges === 0 && activeMarketExchanges.length === 1) {
                for (let i = 0; i < marketExchanges.length; i++) {
                    if (marketExchanges[i].name !== 'Global' && marketExchanges[i].status === 'active') {
                        selectedTableItem = marketExchanges[i];
                    }
                }
            }

            const selectedIcon = (selectedTableItem && selectedTableItem.icon) || null;
            const selectedName = (selectedTableItem && selectedTableItem.name) || null;

            return (
                <Wrapper width={width} height={height}>

                    {midMarket && (
                        <MidMarketWrapper left={width / 2}>
                            <ZoomWrapper>
                                <ZoomOut
                                    src={minus}
                                    alt="Zoom out"
                                    isMobile={isMobileDevice && !isMobilePortrait}
                                    onClick={this.zoomOut}
                                />
                                <ZoomIn
                                    src={plus}
                                    alt="Zoom in"
                                    isMobile={isMobileDevice && !isMobilePortrait}
                                    onClick={this.zoomIn}
                                />
                                {(zoomingMode === 'in' || zoomingMode === 'out') && <Loading mode={zoomingMode} />}
                            </ZoomWrapper>
                        </MidMarketWrapper>
                    )}

                    <ExchangeLabel>
                        {countExchange !== 1 ? (
                            <GlobalIcon/>
                        ) : (
                            <Logo src={`/img/exchange/${selectedIcon}`} alt=""/>
                        )}
                        <span>{getActiveExchanges(exchanges)}</span>{`(${baseCur}/${quoteCur})`}
                    </ExchangeLabel>

                    <DepthChartWrapper width={width} colorMode={this.state.colorMode}>
                        <div id="depth_chart_container" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}/>

                        <Overlapper width={this.state.overLapWidth} left={this.overLap.overLapLeft} border={this.overLap.overLapBorder} isSpread={this.overLap.overLapSpread >= 0}/>
                        {this.overLap.overLapSpread < 0 && (
                            <OverlapperMask width={this.state.overLapWidth} left={this.overLap.overLapLeft}/>
                        )}
                    </DepthChartWrapper>
                </Wrapper>
            );
        } catch (e) {
            console.log('depthChart render error!', e);

            return (
                <Wrapper/>
            );
        }
    }
}

export default inject(
    STORE_KEYS.EXCHANGESSTORE,
)(observer(_Chart));
