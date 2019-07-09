import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themesAnimated from '@amcharts/amcharts4/themes/animated';
import isEqual from 'lodash/isEqual';

import { STORE_KEYS } from '../../../stores';
import { customDigitFormat, capitalizeFirstLetter, format2DigitStringForDonut } from '../../../utils';
import {
    DonutChartWrapper, Donut, HoverLabel, ArbSwitcher, SvgComplete
} from './Components';
import { STATE_KEYS } from '../../../stores/ConvertStore';
import DataLoader from '../../../components-generic/DataLoader';
// import SplineAreaChartHighCharts from '../YourPortfolio/SplineAreaChartHighCharts';
// import ChartStatus from '../ChartStatus';
import ArbitrageToggleButton from '../ArbitrageToggleButton';
import { getChartColors } from '../ExchangeCellsV2/colors';
import ExchangeCellsV2 from '../ExchangeCellsV2';

am4core.useTheme(am4themesAnimated);

// --- # mock data for temporary. --- //
const categories = [
    'Binance',
    'Bitstrap',
    'Bitfinex',
    'Huobi',
    'Coinbase'
    // "Upbit",
    // "Poloniex",
    // "Cryptopia",
    // "Kucoin",
    // "Bibox",
    // "Gateio",
    // "Otcbtc",
    // "Liqui"
];
const percentages = [30, 15, 9, 6, 40];
// const percentages = [17, 11, 10, 9, 9, 9, 8, 7, 6.5, 6, 3.5, 3, 1];
let data = [];
for (let i = 0; i < percentages.length; i++) {
    data.push({
        category: categories[i],
        value: percentages[i],
        hidden: false,
    });
}

function hideSmall(hidden, target) {
    let result = false;
    if (target.dataItem.category === 'hidden') {
        result = true;
    } else {
        result = false;
    }
    return result;
}

class DonutChart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeIndex: -1,
            hoverIndex: -1,
            hovered: false,
        };

        this.disableTransition = false;
    }

    componentDidMount() {
        const {
            [STORE_KEYS.LOWESTEXCHANGESTORE]: { updateHoverExchangeFromDonut },
        } = this.props;

        const chart = am4core.create('donut-chart', am4charts.PieChart);

        chart.innerRadius = am4core.percent(45);

        chart.data = data;

        const pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = 'value';
        pieSeries.dataFields.category = 'category';
        pieSeries.dataFields.hidden = 'hidden';
        pieSeries.labels.template.disabled = true;
        pieSeries.ticks.template.disabled = true;
        // pieSeries.colors.list = colors;
        pieSeries.slices.template.stroke = am4core.color('#fff');
        pieSeries.slices.template.strokeWidth = 2;
        pieSeries.slices.template.cornerRadius = 8;
        // pieSeries.slices.template.tooltipText = "{category}: {value}%";
        pieSeries.slices.template.tooltipText = '';
        pieSeries.slices.template.fillOpacity = 1;

        // for opacity of user interaction
        pieSeries.slices.template.events.disableType('hit');
        // let as = pieSeries.slices.template.states.getKey('active');
        // as.properties.shiftRadius = 0;
        // as.properties.fillOpacity = 0.5;
        let hs = pieSeries.slices.template.states.getKey('hover');
        hs.properties.scale = 1;
        hs.properties.shiftRadius = 0.1;
        // hs.properties.fillOpacity = 0.5;

        const self = this;
        // pieSeries.slices.template.events.on('hit', (ev) => {
        //     const series = ev.target.dataItem.component;
        //     let activeIndex = -1;
        //     series.slices.each((item, index) => {
        //         if (item === ev.target) {
        //             if (item.isActive) {
        //                 activeIndex = index;
        //             }
        //         } else if (item.isActive) {
        //             item.isActive = false;
        //         }
        //     });
        //
        //     self.setState({
        //         activeIndex,
        //         hoverIndex: -1,
        //         hovered: false,
        //     });
        //
        //     // Reset active status
        //     // setTimeout(() => {
        //     //     if (!self.state.hovered) {
        //     //         self.setState({
        //     //             activeIndex: -1,
        //     //         });
        //     //
        //     //         series.slices.each(item => {
        //     //             if (item) {
        //     //                 item.isActive = false;
        //     //             }
        //     //         });
        //     //     }
        //     // }, 1000);
        //
        //     updateHoverExchangeFromDonut('');
        // });

        pieSeries.slices.template.events.on('over', ev => {
            const series = ev.target.dataItem.component;
            if (series.slices.length > 1) {
                series.slices.each((item, index) => {
                    if (item === ev.target) {
                        item.isHover = true;

                        updateHoverExchangeFromDonut(chart.data[index] ? chart.data[index].category : '');

                        self.setState({
                            hoverIndex: index,
                            hovered: true,
                        });
                    } else {
                        item.isHover = false;
                    }
                });
            }
        });

        pieSeries.slices.template.events.on('out', ev => {
            if (self.state.hovered) {
                const series = ev.target.dataItem.component;
                if (series.slices.length > 1) {
                    series.slices.each((item, index) => {
                        if (item === ev.target && item.isHover) {
                            item.isHover = false;
                        }
                    });
                }

                setTimeout(() => {
                    if (!self.state.hovered) {
                        self.setState({
                            hoverIndex: -1,
                        });

                        updateHoverExchangeFromDonut('');
                    }
                }, 500);

                self.setState({
                    hovered: false,
                });

                // for opacity of user interaction
                // self.setState({
                //     hoverIndex: -1,
                //     activeIndex: -1,
                // });
            }
        });

        this.chart = chart;
        this.pieSeries = pieSeries;
    }

    componentWillReceiveProps(nextProps) {
        const {
            [STORE_KEYS.CONVERTSTORE]: { convertState: nextState },
        } = nextProps;

        this.disableTransition = this.convertState !== STATE_KEYS.coinSearch && nextState !== STATE_KEYS.coinSearch;
    }

    componentWillUnmount() {
        if (this.chart) {
            this.chart.dispose();
        }
    }

    updateChartData(plan) {
        data = [];
        let totalAmount = 0;
        if (plan && plan.length) {
            for (let i = 0; i < plan.length; i++) {
                const amount = plan[i].Amount || 0;
                totalAmount += amount;
            }
            for (let i = 0; i < plan.length; i++) {
                const amount = plan[i].Amount || 0;
                const percentage = plan[i].Percentage || 0;
                let paddingPercentage = 0;
                let paddingAmount = totalAmount * 0.007;
                data.push({
                    category: plan[i].Exchange || '',
                    percentage,
                    value: amount,
                    hidden: false, // percentage < 1,
                });

                if (plan.length > 1) {
                    data.push({
                        category: 'hidden',
                        paddingPercentage,
                        value: paddingAmount,
                        hidden: false, // percentage < 1,
                    });
                }
            }
        }

        // data.sort((a, b) => b.value - a.value);

        // const chartData = data.map(dt => ({
        //     category: dt.category,
        //     value: Math.max(1, dt.value),
        //     hidden: dt.hidden,
        // }));

        if (this.chart && !isEqual(data, this.chart.data)) {
            this.chart.data = data;
            // this.pieSeries.colors.list = colors.slice(0, this.chart.data.length).reverse();
            this.pieSeries.slices.template.states.getKey('hover').properties.shiftRadius = data.length > 1 ? 0.1 : 0;
            this.chartColors = getChartColors(data.length);
            this.pieSeries.colors.list = this.chartColors;
            this.pieSeries.slices.template.adapter.add('hidden', hideSmall);
        }
    }

    render() {
        const { activeIndex, hoverIndex } = this.state;
        const {
            [STORE_KEYS.LOWESTEXCHANGESTORE]: lowestExchangeStore,
            [STORE_KEYS.INSTRUMENTS]: instrumentsStore,
            [STORE_KEYS.ORDERENTRY]: orderEntryStore,
            [STORE_KEYS.CONVERTSTORE]: convertStore,
            [STORE_KEYS.SETTINGSSTORE]: settingsStore,
            // [STORE_KEYS.VIEWMODESTORE]: viewModeStore,
            width,
            height,
            isVisible,
            isLoggedIn,
        } = this.props;
        const {
            averagePrice,
            totalPrice,
            Plan,
            hoverExchangeFromDonut,
            hoverExchange,
            isDelayed,
            isDonutModeFinishedForLabel,
        } = lowestExchangeStore;
        const { CoinsPairSearchMarketOrderBuyForm: orderForm } = orderEntryStore;
        const { Amount } = orderForm;
        let { selectedBase, selectedQuote } = instrumentsStore;
        const {
            getLocalPrice, getLocalCurrency, isArbitrageMode, setArbitrageMode,
        } = settingsStore;
        // const { graphSwitchMode, setGraphSwitchMode } = viewModeStore;

        selectedBase = (selectedBase || '').replace('F:', '');
        selectedQuote = (selectedQuote || '').replace('F:', '');

        this.convertState = convertStore.convertState;

        if (hoverIndex === -1) {
            this.updateChartData(Plan);
        }
        if (this.pieSeries && this.pieSeries.slices) {
            if (hoverExchange) {
                this.pieSeries.slices.each((item, index) => {
                    if (
                        index !== hoverIndex &&
                        index % 2 === 0 &&
                        Plan[index / 2] &&
                        Plan[index / 2].Exchange === hoverExchange
                    ) {
                        item.dispatchImmediately('over');
                    }
                });
            } else if (hoverIndex !== -1 && !hoverExchangeFromDonut) {
                this.pieSeries.slices.each((item, index) => {
                    if (index === hoverIndex) {
                        item.dispatchImmediately('out');
                    }
                });
            }
        }
        const isDonutMode = (convertStore.convertState !== STATE_KEYS.coinSearch) && !isArbitrageMode;

        return (
            <Fragment>
                {
                    isDonutMode &&
                    <ExchangeCellsV2 isDonutMode={isDonutMode}/>
                }
                <DonutChartWrapper
                    id="graph-chart"
                    width={width / 2}
                    height={height}
                    isVisible={isVisible}
                    disableTransition={this.disableTransition}
                    switchMode={isArbitrageMode}
                >
                    <Donut id="donut-chart" width={width} height={height} />

                    {(convertStore.convertState === STATE_KEYS.submitOrder || isDelayed) && (
                        <DataLoader width={120} height={120} />
                    )}

                    {(convertStore.convertState === STATE_KEYS.orderDone ||
                        (convertStore.convertState === STATE_KEYS.coinSearch && isDonutModeFinishedForLabel)) && (
                        <SvgComplete>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35.34 29.66">
                                <path d="M34.87,5,30.32.47a1.6,1.6,0,0,0-2.27,0L17.67,10.85h0l-5.84,5.84L7.29,12.15a1.62,1.62,0,0,0-2.28,0L.47,16.69A1.6,1.6,0,0,0,.47,19L10.69,29.19a1.61,1.61,0,0,0,1.14.47A1.63,1.63,0,0,0,13,29.19l4.7-4.71L34.87,7.29a1.62,1.62,0,0,0,0-2.28Z" />
                            </svg>
                        </SvgComplete>
                    )}

                    {(convertStore.convertState === STATE_KEYS.amtInput ||
                        (convertStore.convertState === STATE_KEYS.coinSearch && !isDonutModeFinishedForLabel)) &&
                        !isDelayed && (
                        <Fragment>
                            <div className="pie-center-label">
                                {hoverIndex > -1 && data[hoverIndex] && (
                                    <div className="justify-content-center text-white">
                                        {`${data[hoverIndex].category.charAt(0).toUpperCase() +
                                                data[hoverIndex].category.slice(1)} (${format2DigitStringForDonut(
                                            data[hoverIndex].percentage
                                        )}%)`}
                                    </div>
                                )}
                                <div>
                                    <span className="left">{customDigitFormat(Amount, 6)}</span>
                                    <span className="right">{selectedBase}</span>
                                </div>
                                <div>
                                    <span className="left">
                                            @{customDigitFormat(getLocalPrice(averagePrice, selectedQuote))}
                                    </span>
                                    {/* <span className="left">@{customDigitFormat(totalPrice / Amount)}</span> */}
                                    <span className="right">{getLocalCurrency(selectedQuote)}</span>
                                </div>
                                <div>
                                    <span className="left">
                                        <span className="gray">= </span>
                                        {customDigitFormat(getLocalPrice(totalPrice, selectedQuote))}
                                    </span>
                                    <span className="right">{getLocalCurrency(selectedQuote)}</span>
                                </div>
                            </div>
                        </Fragment>
                    )}

                    <div className="donut-placeholder"/>
                    {/*
                    <ArbitrageToggleButton />
                    */}
                </DonutChartWrapper>
                {/* <SplineAreaChartHighCharts width={width} height={height} switchMode={isArbitrageMode}/> */}
            </Fragment>
        );
    }
}

export default inject(
    STORE_KEYS.LOWESTEXCHANGESTORE,
    STORE_KEYS.ORDERENTRY,
    STORE_KEYS.INSTRUMENTS,
    STORE_KEYS.CONVERTSTORE,
    STORE_KEYS.SETTINGSSTORE
    // STORE_KEYS.VIEWMODESTORE,
)(observer(DonutChart));
