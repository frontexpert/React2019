import React from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { inject, observer } from 'mobx-react';
import { FormattedMessage } from 'react-intl';
import { debounce } from 'lodash';

import { STORE_KEYS } from '../../../../stores/index';
import { unifyDigitString } from '../../../../utils';
import {
    GraphIcon, PortfolioContainer, ChartContainer, ArbSwitcher
} from './Components';
import PortfolioValue from './PortfolioValue';
import ArbitrageToggleButton from '../../ArbitrageToggleButton';
import CurrencyDropdownWithSymbol from '../../../../components-generic/CurrencyDropdown/CurrencyDropdownWithSymbol';
// import SwitchCustom from '../../../../components-generic/SwitchCustom';

class SplineAreaChartHighCharts extends React.Component {
    constructor(props) {
        super(props);

        this.tooltipLineRef = React.createRef();
        this.mainChartRef = null;
        this.xTooltipRef = null;
        this.YTooltipRef = null;
        this.highChartRef = null;
        this.moveTooltip = this.moveTooltip.bind(this);
        this.disableAnimation = true;
        this.tooltipTimeOut = null;

        (function (H) {
            H.wrap(H.Tooltip.prototype, 'hide', function (defaultCallback) {});
        }(Highcharts));

        Highcharts.setOptions({
            global: {
                useUTC: false,
            },
        });
    }

    componentDidMount() {
        window.addEventListener('resize', this.onResizeListener);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.refreshToolTipToEnd();
        if (this.mainChartRef && this.highChartRef && this.highChartRef.plotBox) {
            const plotBox = this.highChartRef.plotBox;
            const yTooltipWidth = this.mainChartRef.getBoundingClientRect().width - plotBox.width + 1;
            let toggleButtonRef = document.getElementById('donut-portfolio-toggle');
            if (toggleButtonRef) toggleButtonRef.style.left = (plotBox.width - 80 + 'px');

            if (this.yTooltipRef && this.yTooltipTop) {
                this.yTooltipRef.setAttribute('style', 'left:' + plotBox.width + 'px; top:' + this.yTooltipTop + 'px; width:' + yTooltipWidth + 'px;');
            }
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onResizeListener);
    }

    onResizeListener = debounce(() => {
        this.handleMouseLeave();
        const width = this.highChartRef.chartWidth;
        const height = this.highChartRef.chartHeight;
        this.highChartRef.setSize(width, height, true);
    }, 350);

    initConfig = (portfolioData, height, width) => {
        let minX;
        let minY;
        let increment = 30000;
        const dataLength = portfolioData.length;
        if (dataLength === 1) {
            minX = portfolioData[0][0] - 60000;
            minY = 0;
            increment = 10000;
        } else if (dataLength > 1) {
            const lastTime = portfolioData[dataLength - 1][0];
            const startTime = portfolioData[0][0];
            increment = Math.floor((lastTime - startTime) / 6.5);
            if (increment <= 0) increment = 3000;
        }

        return (
            {
                chart: {
                    width,
                    height,
                    type: 'area',
                    backgroundColor: '#020518',
                    animation: Highcharts.svg,
                    marginLeft: 0,
                    marginTop: 0,
                    marginBottom: 29,
                },
                scrollbar: {
                    enabled: false,
                },
                title: null,
                legend: {
                    enabled: false,
                },
                credits: {
                    enabled: false,
                },
                navigator: {
                    enabled: false,
                },
                rangeSelector: {
                    enabled: false,
                    inputEnabled: false,
                    labelStyle: {
                        visibility: 'hidden',
                    },
                },
                exporting: {
                    enabled: false,
                },
                xAxis: {
                    type: 'datetime',
                    lineColor: 'rgba(127, 139, 194, 0.5)',
                    gridLineColor: '#191D3E',
                    gridLineWidth: 1,
                    tickPositioner() {
                        let positions = [];
                        const dataMin =  dataLength === 1 ? this.dataMax - 60000 : this.dataMin;
                        let tick = Math.floor(dataMin);
                        if (this.dataMax !== null && dataMin !== null) {
                            for (tick; tick - increment <= this.dataMax; tick += increment) {
                                positions.push(tick);
                            }
                        }
                        return positions;
                    },
                    tickColor: 'rgba(127, 139, 194, 0.5)',
                    tickLength: 5,
                    minPadding: 0,
                    maxPadding: 0.2,
                    min: minX,
                    labels: {
                        enabled: true,
                        formatter() {
                            return Highcharts.dateFormat('%H:%M:%S', this.value);
                        },
                        style: {
                            color: 'rgba(127, 139, 194, 0.5)',
                        },
                    },
                },
                yAxis: [{
                    lineColor: 'rgba(127, 139, 194, 0.5)',
                    lineWidth: 1,
                    gridLineColor: '#191D3E',
                    gridLineWidth: 1,
                    tickPixelInterval: 80,
                    opposite: true,
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080',
                    }],
                    labels: {
                        enabled: true,
                        style: {
                            color: 'rgba(127, 139, 194, 0.5)',
                        },
                        formatter() {
                            return unifyDigitString(this.value);
                        },
                    },
                    title:{
                        text: null,
                    },
                    maxPadding: 0.4,
                    minPadding: 0.3,
                    min: minY,
                    floor: 0,
                    showLastLabel: false,
                }],
                tooltip: {
                    animation: false,
                    crosshairs: false,
                    backgroundColor: '#0e1521',
                    borderColor: '#733fda',
                    borderRadius: 5,
                    borderWidth: 2,
                    shared: true,
                    style: {
                        color: '#7f8bc2',
                        fontSize: '12px',
                    },
                    useHTML: true,
                    formatter() {
                        return '<b style="font-size: 16px; color: #FFF;">&ensp;$' + Highcharts.numberFormat(this.y, 2) + '</b><br/>' + Highcharts.dateFormat('%a, %b %d, %Y %H:%M:%S', this.x) + '<br/>';
                    },
                },
                plotOptions: {
                    area: {
                        lineWidth: 4,
                        animation: false,
                        states: {
                            hover: {
                                halo: {
                                    opacity: 0.2,
                                    size: 8,
                                    attributes: {
                                        fill: 'rgba(255, 255, 255, 0.8)',
                                    },
                                },
                            },
                        },
                        marker: {
                            enabled: true,
                            lineWidth: 0,
                            lineColor: 'transparent',
                            radius: 0,
                            states: {
                                hover: {
                                    animation: {
                                        duration: 0,
                                    },
                                    enabled: true,
                                    lineWidthPlus: 0,
                                    lineColor: 'rgba(255, 255, 255, 0.2)',
                                    fillColor: 'rgba(255, 255, 255, 0.5)',
                                    radiusPlus: 5,
                                },
                            },
                            // lineWidth: 2,
                            // lineColor: '#263583',
                            // radius: 3,
                            // states: {
                            //     hover: {
                            //         animation: {
                            //             duration: 0,
                            //         },
                            //         enabled: true,
                            //         lineWidthPlus: 0,
                            //         lineColor: 'rgba(255, 255, 255, 0.2)',
                            //         fillColor: 'rgba(255, 255, 255, 0.5)',
                            //         radiusPlus: 2,
                            //     },
                            // },
                        },
                    },
                    series: {
                        threshold: -Infinity,
                    },
                },
                series: [{
                    name: 'Graph 1',
                    type: 'area',
                    data: portfolioData,
                    step: 'left',
                    color: {
                        linearGradient: [0, 0, 0, 3 * height / 4],
                        stops: [
                            [0, '#2c88e9'],
                            [1, '#3F1183']
                        ],
                    },
                    fillColor: {
                        linearGradient: [0, 0, 0, height],
                        stops: [
                            [0, 'rgba(48, 147, 253, 0.2)'],
                            [1, 'rgba(43, 7, 88, 0.2)']
                        ],
                    },
                }],
            }
        );
    };

    moveTooltip = (lineX, lineY, circleY, lineHeight) => {
        if (this.tooltipLineRef.current) {
            this.tooltipLineRef.current.setAttribute('style', 'left:' + lineX + 'px; top:' + lineY + 'px;');
            this.tooltipLineRef.current.firstChild.setAttribute('style', 'top:' + circleY + 'px;');
            this.tooltipLineRef.current.lastChild.setAttribute('style', 'height:' + lineHeight + 'px;');
        }
    };

    refreshToolTipToEnd = () => {
        if (
            this.highChartRef &&
            this.highChartRef.series &&
            this.highChartRef.series.length &&
            this.highChartRef.series[0].points &&
            this.highChartRef.series[0].points.length
        ) {
            try {
                this.highChartRef.tooltip.refresh([this.highChartRef.series[0].points[this.highChartRef.series[0].points.length - 1]]);
            } catch (e) { console.log(''); }
        }
    };

    refreshToolTipToStart = () => {
        if (
            this.highChartRef &&
            this.highChartRef.series &&
            this.highChartRef.series.length &&
            this.highChartRef.series[0].points &&
            this.highChartRef.series[0].points.length
        ) {
            this.highChartRef.tooltip.refresh([this.highChartRef.series[0].points[0]]);
        }
    };

    handleMouseLeave = () => {
        if (this.tooltipLineRef.current) {
            this.tooltipLineRef.current.setAttribute('style', 'left: -9999px');
        }

        if (this.highChartRef && this.highChartRef.tooltip && this.highChartRef.destroyOriginal) {
            this.highChartRef.tooltip.destroyOriginal();
        }
    };

    onMouseLeave = () => {
        if (this.mainChartRef && this.xTooltipRef && this.yTooltipRef) {
            const xTooltipLeft = -9999;
            const yTooltipTop = -9999;
            this.xTooltipRef.setAttribute('style', 'left:' + xTooltipLeft + 'px;');
            this.yTooltipRef.setAttribute('style', 'top:' + yTooltipTop + 'px;');
            this.xTooltipRef.nextSibling.setAttribute('style', 'left:' + xTooltipLeft + 'px;');
            this.yTooltipRef.nextSibling.setAttribute('style', 'top:' + yTooltipTop + 'px;');
        }
    };

    onMouseMove = (e) => {
        try {
            if (this.mainChartRef && this.xTooltipRef && this.yTooltipRef && this.highChartRef) {
                // get tooltip position values
                let mainChartRect = this.mainChartRef.getBoundingClientRect();
                let plotBox = this.highChartRef.plotBox;
                let xTooltipLeft = e.pageX - mainChartRect.left;
                let yTooltipTop = e.pageY - mainChartRect.top;
                let yTooltipWidth = mainChartRect.width - plotBox.width + 1;
                // set max, min Limit
                if (xTooltipLeft < plotBox.x ||
                    yTooltipTop < plotBox.y ||
                    xTooltipLeft > plotBox.x + plotBox.width ||
                    yTooltipTop > plotBox.y + plotBox.height) {

                    xTooltipLeft = -9999;
                    yTooltipTop = -9999;
                }

                // get tooltip values
                const xMin = this.highChartRef.xAxis[0].min;
                const xMax = this.highChartRef.xAxis[0].max;
                const yMin = this.highChartRef.yAxis[0].min;
                const yMax = this.highChartRef.yAxis[0].max;
                let x = (plotBox.width === 0) ? 1 : (xMin + (xMax - xMin) * (xTooltipLeft - plotBox.x) / plotBox.width);
                let y = (plotBox.height === 0) ? 1 : (yMax - (yMax - yMin) * (yTooltipTop - plotBox.y) / plotBox.height);

                // insert tooltip labels
                const xString = new Date(x).toTimeString().substr(0, 8);
                this.xTooltipRef.innerHTML = xString;
                this.yTooltipRef.innerHTML = unifyDigitString(y);

                // set tooltip grid-line style
                this.xTooltipRef.nextSibling.setAttribute('style', 'left:' + xTooltipLeft + 'px; height:' + (plotBox.height - yTooltipTop) + 'px;');
                this.yTooltipRef.nextSibling.setAttribute('style', 'top:' + yTooltipTop + 'px; right:' + yTooltipWidth + 'px; width:' + (plotBox.width - xTooltipLeft) + 'px;');

                // set tooltip position [here 40 means half of xTooltip width(80px).]
                if (xTooltipLeft > 0 && xTooltipLeft < (plotBox.x + 40)) xTooltipLeft = plotBox.x + 40;
                if (xTooltipLeft > 0 && xTooltipLeft > (plotBox.x + plotBox.width - 40)) xTooltipLeft = plotBox.x + plotBox.width - 38;
                this.xTooltipRef.setAttribute('style', 'left:' + xTooltipLeft + 'px;');
                this.yTooltipRef.setAttribute('style', 'left:' + plotBox.width + 'px; top:' + yTooltipTop + 'px; width:' + yTooltipWidth + 'px;');
                this.yTooltipTop = yTooltipTop;
            }
        } catch (e) {
            console.log('PortfolioChart: tooltip render error!', e);
        }
    };

    handlePortfolioGraphRangeChange = (portfolioGraphRange) => {
        const {
            [STORE_KEYS.PORTFOLIODATASTORE]: portfolioDataStore,
        } = this.props;

        const {
            requestPortfolioData, setPortfolioGraphRange,
        } = portfolioDataStore;

        setPortfolioGraphRange(portfolioGraphRange);

        switch (portfolioGraphRange) {
        case 0:
            requestPortfolioData('minute');
            break;
        case 1:
            requestPortfolioData('hour');
            break;
        case 2:
            requestPortfolioData('day');
            break;
        case 3:
            requestPortfolioData('week');
            break;
        case 4:
            requestPortfolioData('month');
            break;
        case 5:
            requestPortfolioData('year');
            break;
        default:
            requestPortfolioData('hour');
            break;
        }
    };

    render() {
        const {
            [STORE_KEYS.PORTFOLIODATASTORE]: portfolioDataStore,
            [STORE_KEYS.TELEGRAMSTORE]: telegramStore,
            // [STORE_KEYS.SETTINGSSTORE]: settingsStore,
            width,
            height,
            switchMode,
        } = this.props;

        const {
            portfolioData, lastPortfolioValue, lastPortfolioValueChange,
            portfolioGraphRange, isActiveState, portfolioView, setPortfolioGraphRange,
            oneDayProfit,
        } = portfolioDataStore;

        const { isLoggedIn } = telegramStore;

        // const { isArbitrageMode, setArbitrageMode } = settingsStore;

        this.disableAnimation = false;
        const size = portfolioData.length;
        if (size === 0) {
            this.handleMouseLeave();
        }
        const oneDayProfitStr = unifyDigitString(oneDayProfit);

        return (
            <PortfolioContainer
                id="graph-chart"
                width={width}
                height={height}
                isVisible={true}
                disableAnimation={this.disableAnimation}
                onMouseLeave={this.onMouseLeave}
                switchMode={switchMode}
            >
                <div onMouseMove={this.onMouseMove} ref={el => { this.mainChartRef = el; }}>
                    <ChartContainer width={width}>
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={this.initConfig(portfolioData, height, width)}
                            callback={(chart) => {
                                this.highChartRef = chart;
                                chart.tooltip.destroyOriginal = chart.tooltip.destroy;
                                chart.tooltip.destroy = () => {};
                                chart.tooltip.hide = () => {};
                            }}
                        />
                    </ChartContainer>

                    {size > 0 && (
                        <div className="tooltipWrapper">
                            <div className="x-tooltip" ref={el => { this.xTooltipRef = el; }}/>
                            <div className="x-grid-line"/>
                            <div className="y-tooltip" ref={el => { this.yTooltipRef = el; }}/>
                            <div className="y-grid-line"/>
                        </div>
                    )}
                </div>

                {isLoggedIn && (
                    <div className="portfolioLabels">
                        <div className="values">
                            <div className="totalPrice">
                                {/* <GraphIcon/> */}
                                <div className="label">
                                    <FormattedMessage
                                        id="graph_tool.your_portfolio.label_portfolio"
                                        defaultMessage="Portfolio"
                                    />
                                </div>

                                <PortfolioValue
                                    lastPortfolioValue={lastPortfolioValue}
                                    lastPortfolioValueChange={lastPortfolioValueChange}
                                    isActiveState={isActiveState}
                                />
                            </div>

                            {oneDayProfit > 0 && oneDayProfitStr.length < 12 && (
                                <div className="back-testing">
                                    (
                                    <FormattedMessage
                                        id="graph_tool.your_portfolio.label_backtesting"
                                        defaultMessage="Backtesting"
                                    />:
                                    <CurrencyDropdownWithSymbol alignRight={false} symbolSize={21}/>
                                    <span>
                                        {oneDayProfitStr}
                                    </span>
                                    <FormattedMessage
                                        id="graph_tool.your_portfolio.label_desc"
                                        defaultMessage="/day. Capped at 365%/year"
                                    />
                                    )
                                </div>
                            )}
                        </div>
                    </div>
                )}
                {/*
                <ArbitrageToggleButton />
                */}
            </PortfolioContainer>
        );
    }
}

export default inject(
    STORE_KEYS.PORTFOLIODATASTORE,
    STORE_KEYS.TELEGRAMSTORE,
    // STORE_KEYS.SETTINGSSTORE,
)(observer(SplineAreaChartHighCharts));
