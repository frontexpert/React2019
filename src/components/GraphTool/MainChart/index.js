import React from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from "highcharts-react-official";
import styled from 'styled-components';
import { RANGE_OPTIONS } from '../../../config/constants';
import $ from 'jquery';
import { STATE_KEYS } from '../../../stores/ConvertStore';

var lineColor = '#01B067';
var gradientColor = [
    [0, Highcharts.Color(lineColor).setOpacity(0.1).get('rgba')],
    [1, Highcharts.Color(lineColor).setOpacity(0).get('rgba')]
];
var mainChartMarginLeft = 0;
var mainChartSpacingTop = 90;

const MainChartWrapper = styled.div`
    position: relative;
    
    .highcharts-container {
        position: inherit !important;
    }
    
    .highcharts-tooltip {
        z-index: 3998 !important;
    }
    
    .highcharts-tooltip {
        font-family: 'open_sans', sans-serif;
        
        div.tooltip,
        div.tooltipCircle {
            opacity: 1;
            padding: 2px 15px;
            z-index: 3999 !important;
            font-size: 11px;
            border-radius: 3px;
            line-height: 20px;
            background-color: ${props => props.theme.palette.clrbacktooltip};
            color: ${props => props.theme.palette.clrtextL};
            box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.25);
            
            span {
                color: ${props => props.theme.palette.clrtextD};
            }
        }
        
        div.tooltip {
            color: ${props => props.theme.palette.clrtexttooltip};
            font-weight: 600;
            
            .textCenter {
                text-align: center;
                font-weight: 700;
            }
            
            &.mainTooltip {
                font-size: 11px;
                
                span {
                    color: ${props => props.theme.palette.clrtexttooltip};
                }
                
                .currencies {
                    font-size: 12px;
                }
                
                .value {
                    font-size: 12px;
                }
                
                div:first-child {
                    margin-bottom: -7px;
                }
            }
            
            &.blackColor {
                color: ${props => props.theme.palette.clrtextD};
            }
        }
        
        div.tooltipCircle {
            font-family: 'open_sans', sans-serif;
            padding: 5px 5px 5px 5px;
            min-width: 148px;
            background-color: ${props => props.theme.palette.clrblock};
            // border: 1px solid ${props => props.theme.palette.clrseparatorD};
            display: flex;
            line-height: 20px;
            font-weight: 700;
            
            .currency {
                font-weight: 700;
                font-size: 13px;
                border-right: 2px solid ${props => props.theme.palette.clrtextD};
                padding-right: 5px;
                padding-left: 5px;
                margin: 0;
                display: block;
                color: ${props => props.theme.palette.clrtextD};
                line-height: 20px;
            }
            
            .price {
                font-weight: 700;
                padding-left: 5px;
                font-size: 13px;
                line-height: 20px;
                color: ${props => props.theme.palette.clrtextD};
                
                span {
                    font-size: 13px;
                    line-height: 20px;
                    // font-weight: 600;
                }
            }
        }
        
        span svg {
            width: 20px;
            height: 20px;
            position: relative;
            margin: 0px 3px 0px 0px;
            flex: 0 0 20px;
        }
        
        div.font12 {
            font-size: 12px;
            margin-bottom: -7px;
        }
        
        div.font10 {
            font-size: 10px;
            font-weight: 300;
        }
        
        .bold {
            font-weight: bold;
        }
        
        .light {
            font-weight: 100;
            font-size: 10px;
        }
    }
    
    .arrow_box:after {
        top: 50%;
        border: solid transparent;
        content: " ";
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
        border-color: rgba(136, 183, 213, 0);
        border-width: 7px;
        margin-top: -7px;
    }
    
    .arrow_box.right:after {
        left: 100%;
        border-left-color: ${props => props.theme.palette.clrbacktooltip};
    }
    
    .arrow_box.left:after {
        right: 100%;
        border-right-color: ${props => props.theme.palette.clrbacktooltip};
    }
    
    .arrow_box.bottom:after {
        bottom: 100%;
        border-top-color: ${props => props.theme.palette.clrbacktooltip};
        top: calc(100% + 7px);
        left: calc(50% - 7px);
    }
    
    .lineForMainChart {
        position: absolute;
        left: -9999px;
        pointer-events: none;
        z-index: 3001;
        
        .circle {
            position: relative;
            width: 14px;
            height: 14px;
            background: rgba(222, 222, 222, 0.6);
            border: 1.5px solid ${props => props.theme.palette.clrbacktooltip};
            border-radius: 50%;
            transform: translateX(-50%) translateY(-50%);
            box-shadow: 0px 2px 5px 0px ${props => props.theme.palette.clrbackarrow};
            pointer-events: none;
        }
        
        .line {
            background: linear-gradient(to bottom, rgba(44, 49, 55, 1), rgba(44, 49, 55, 0.4));
            width: 1px;
            height: 1px;
            margin-top: -6px;
            transform: translateX(-50%);
            pointer-events: none;
        }
    }
    
    .lineForPortfolioChart {
        position: absolute;
        left: -9999px;
        pointer-events: none;
        z-index: 3001;
    
        .circle {
            position: relative;
            width: 11px;
            height: 11px;
            background: white;
            border: 1.2px solid var(--clr-line);
            border-radius: 50%;
            transform: translateX(-50%) translateY(-50%);
            z-index: 1;
        }
    
        .line {
            background: linear-gradient(to bottom, rgba(191, 192, 192, 0.8), rgba(191, 192, 192, 0.1), rgba(191, 192, 192, 0));
            width: 1px;
            height: 1px;
            margin-top: -6px;
        }
    }
    
    .gray {
	    color: #727679;
    }
`;

class MainChart extends React.Component {
    constructor(props) {
        super(props);

        this.mainChartRef = null;
    }

    initChartConfig = (candles, columns, diffMax, min, max, yMin, yMax, fakeGraphs, height, width, baseSymbol, quoteSymbol, rangeIndex) => {
        const date50 = new Date(Date.now() - RANGE_OPTIONS[rangeIndex].interval * RANGE_OPTIONS[rangeIndex].limit);

        const startPoint = Date.UTC(date50.getFullYear(), date50.getMonth(), date50.getDate());

        const self = this;

        // Reset y axis cross hair
        $('.lineForMainChart').css(
            'left', '-9999px',
        );

        return (
            {
                legend: {
                    enabled: false,
                },
                chart: {
                    marginLeft: mainChartMarginLeft,
                    marginBottom: 0,
                    marginRight: 0,
                    spacingTop: mainChartSpacingTop,
                    width,
                    height,
                    backgroundColor: '#17212C',
                    borderRadius: 4,
                },
                title: null,
                rangeSelector: {
                    enabled: false,
                    inputEnabled: false,
                    labelStyle: {
                        visibility: 'hidden',
                    },

                },
                navigator: {
                    enabled: false,
                },
                scrollbar: {
                    enabled: false,
                },
                plotOptions: {
                    series: {
                        turboThreshold: 10000,
                        pointWidth: width > 800 ? 5 : 4,
                        pointPadding: 0,
                        pointStart: startPoint,
                        pointInterval: RANGE_OPTIONS[rangeIndex].interval,
                        pointPlacement: 'on',
                        borderWidth: 0,
                        groupPadding: 0,
                        lineWidth: 0.6,
                        stickyTracking: false,
                        trackByArea: true,
                        marker: {
                            enabled: false,
                            fillColor: '#999',
                            lineWidth: 1,
                            lineColor: null,
                            symbol: 'circle',
                            radius: 3,
                            states: {
                                hover: {
                                    enabled: false,
                                },
                            },
                        },
                        states: {
                            hover: {
                                halo: {
                                    opacity: 0,
                                },
                            },
                        },
                        dataGrouping: {
                            approximation: function (currentGroup) {
                                var sum = 0;
                                for (var i = 0; i < currentGroup.length; i++) {
                                    sum += currentGroup[i]; //don't forget to add the base
                                }
                                return (sum / currentGroup.length);
                            },
                            forced: true,
                            units: [
                                [
                                    'minute',
                                    [1, 12]
                                ],
                                [
                                    'hour',
                                    [2, 6]
                                ],
                                [
                                    'day',
                                    [3]
                                ]
                            ],
                        },
                    },
                    areaspline: {
                        color: '#BFC0C0',
                        lineWidth: 1,
                        fillColor: {
                            linearGradient: [0, 0, 0, 1],
                            stops: gradientColor,
                        },
                        states: {
                            hover: {
                                enabled: true,
                                lineWidth: 3,
                            },
                        },
                        enableMouseTracking: false,
                        trackByArea: false,
                    },
                    column: {
                        pointPadding: 0,
                        borderWidth: 0,
                        groupPadding: 0,
                    },
                },
                xAxis: {
                    type: 'datetime',
                    dateTimeLabelFormats: {
                        month: '%e. %b',
                        year: '%b',
                    },
                    crosshair: {
                        width: 0,
                        color: '#2B569A',
                    },
                    labels: {
                        enabled: false,
                        step: 5,
                        style: {
                            width: '35px',
                            fontSize: '10px',
                        },
                        x: 50,
                    },
                    tickLength: 0,
                    gridLineWidth: 0,
                    minPadding: 0,
                    maxPadding: 0,
                },
                yAxis: {
                    min: yMin,
                    max: yMax,
                    endOnTick: false,
                    tickLength: 0,
                    gridLineWidth: 0,
                    labels: {
                        enabled: false,
                    },
                },
                tooltip: {
                    animation: false,
                    hideDelay: 86400,
                    backgroundColor: 'rgba(0,0,0,0)',
                    borderColor: 'rgba(0,0,0,0)',
                    borderRadius: 0,
                    padding: 0,
                    shared: true,
                    split: false,
                    shadow: false,
                    useHTML: true,
                    shape: "box",
                    style: {
                        color: '#ffffff',
                        fontSize: 8,
                    },
                    formatter: function () {
                        let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                        let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

                        // Days are grouped by 3, hours are 2 ~ 6
                        let offset = RANGE_OPTIONS[rangeIndex].interval;
                        let date = new Date(this.x + (rangeIndex === 4 ? offset : offset / 2));
                        let month = months[date.getMonth()];
                        let dayName = days[date.getDay()];
                        let year = date.getFullYear();
                        let TooltipValue = this.y.toFixed(5);
                        let arrowDirection = 'bottom';
                        let exchangeName = 'Huobi';

                        const chartBoundingRect = self.mainChartRef.getBoundingClientRect();

                        let lineForMainChartX = this.points[0].point.plotX + mainChartMarginLeft;
                        let lineForMainChartY = mainChartSpacingTop + 10 + 35 - 50;
                        let lineForMainChartHeight = this.points[0].point.plotY - 24 - 35 + 50;
                        let lineForPortfolioChartY = this.points[0].point.plotY - 44 + 50;

                        // right side fix
                        if (lineForMainChartX > chartBoundingRect.width) {
                            lineForMainChartX = -9999;
                        }

                        if (this.points[0].point.plotX < 100) {
                            arrowDirection = 'left';
                            lineForMainChartY -= 24;
                            lineForMainChartHeight += 24;
                            lineForPortfolioChartY += 24;
                        } else if (this.points[0].point.plotX + mainChartMarginLeft + 82 + 10 > chartBoundingRect.width) {
                            arrowDirection = 'right';
                            lineForMainChartY -= 24;
                            lineForMainChartHeight += 24;
                            lineForPortfolioChartY += 24;
                        }

                        $('.lineForMainChart').css({
                            'left': lineForMainChartX,
                            'top': lineForMainChartY,
                        });

                        $('.lineForMainChart .circle').css({
                            'top': lineForPortfolioChartY,
                        });

                        $('.lineForMainChart .line').css({
                            'height': lineForMainChartHeight,
                        });

                        return `
                            <div class="tooltip font10 arrow_box mainTooltip ${arrowDirection}">
                                <div class="textCenter">
                                    <span class="currencies font12 bold">${baseSymbol}/${quoteSymbol}</span> : <span class="value font12 bold">${TooltipValue}</span>
                                </div>
                                <div class="gray">
                                    ${dayName}, ${month} ${date.getDate()}, ${year},${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)} (${exchangeName}) 
                                </div>
                            </div>
                            `;
                    },
                    positioner: (labelWidth, labelHeight, point) => {
                        var graphWidth = width;
                        var xPos = point.plotX - (labelWidth / 2) + mainChartMarginLeft;
                        // right side fix
                        if ((point.plotX + (labelWidth / 2) + mainChartMarginLeft + 10) > graphWidth) {
                            xPos -= labelWidth / 2 + 10;
                        }
                        // left side fix
                        else if (point.plotX < 100) {
                            xPos += labelWidth / 2 + 10;
                        }

                        return {
                            x: xPos,
                            y: 10 + mainChartSpacingTop - 50,
                        };
                    },
                },
                series: [
                    {
                        type: 'areaspline',
                        data: candles,
                        name: 'Series Spline',
                        lineWidth: 3,
                        color: lineColor,
                        fillColor: {
                            linearGradient: [0, 0, 0, height - 50],
                            stops: gradientColor,
                        },
                        id: 1,
                        enableMouseTracking: true,
                        trackByArea: true,
                    },
                    {
                        type: 'areaspline',
                        // data: (fakeGraphs && fakeGraphs.length > 1) ? fakeGraphs[0] : [],
                        name: 'Series Spline 2',
                        id: 2,
                    },
                    {
                        type: 'areaspline',
                        // data: (fakeGraphs && fakeGraphs.length > 2) ? fakeGraphs[1] : [],
                        name: 'Series Spline 3',
                        id: 3,
                    },
                    {
                        type: 'areaspline',
                        // data: (fakeGraphs && fakeGraphs.length > 3) ? fakeGraphs[2] : [],
                        name: 'Series Spline 4',
                        id: 4,
                    },
                    {
                        type: 'areaspline',
                        // data: (fakeGraphs && fakeGraphs.length > 4) ? fakeGraphs[3] : [],
                        name: 'Series Spline 5',
                        id: 5,
                    },
                    {
                        type: 'areaspline',
                        // data: (fakeGraphs && fakeGraphs.length > 5) ? fakeGraphs[4] : [],
                        name: 'Series Spline 6',
                        id: 6,
                    },
                    {
                        type: 'areaspline',
                        // data: (fakeGraphs && fakeGraphs.length > 6) ? fakeGraphs[5] : [],
                        name: 'Series Spline 7',
                        id: 7,
                    },
                    {
                        type: 'column',
                        data: columns,
                        name: 'Series Column',
                        id: 8,
                        enableMouseTracking: false,
                        trackByArea: false,
                        zIndex: 11,
                        dataGrouping: {
                            approximation: function (currentGroup) {
                                var sum = 0;
                                for (var i = 0; i < currentGroup.length; i++) {
                                    sum += currentGroup[i]; //don't forget to add the base
                                }
                                var avg = (sum / currentGroup.length);

                                // set green color by default
                                this.dataGroupInfo.options = {
                                    color: '#01b067',
                                    fill: '#01b067',
                                };
                                // set red color
                                if (avg < 0) {
                                    this.dataGroupInfo.options = {
                                        color: '#CE2424',
                                        fill: '#CE2424',
                                    };
                                    avg *= -1;
                                }

                                var yMin = min - (max - min) * 0.3;
                                if (yMin < 0) yMin = 0;
                                var yMax = max + (max - min) * 0.15;
                                return yMin + (yMax - yMin) * 0.25 * avg / diffMax;
                            },
                            forced: true,
                            units: [
                                [
                                    'minute',
                                    [1, 12]
                                ],
                                [
                                    'hour',
                                    [2, 6]
                                ],
                                [
                                    'day',
                                    [3]
                                ]
                            ],
                        },
                    }
                ],
                credits: {
                    enabled: false,
                },
            }
        )
    };

    handleMouseLeave = () => {
        // $('.lineForMainChart').css(
        //     'left', '-9999px',
        // );
    };

    handleMouseMove = (e) => {
        // if (this.mainChartRef && (this.mainChartRef.getBoundingClientRect().top + mainChartSpacingTop > e.clientY)) {
        //     $('.lineForMainChart').css(
        //         'left', '-9999px',
        //     );
        // }
    };

    render() {
        const { candles, columns, diffMax, min, max, yMin, yMax, fakeGraphs, height, width, baseSymbol, quoteSymbol, rangeIndex, openExchBar, updateExchange, convertState } = this.props;

        return (
            <MainChartWrapper id='graph-chart'>
                <div
                    onMouseMove={this.handleMouseMove}
                    onMouseLeave={this.handleMouseLeave} ref={el => {
                        this.mainChartRef = el;
                    }}
                    onMouseEnter={() => {
                        if (convertState === STATE_KEYS.coinSearch) {
                            openExchBar(false);
                            updateExchange(-1, '');
                        }
                    }}
                >
                    <HighchartsReact
                        highcharts={Highcharts}
                        constructorType={'stockChart'}
                        options={this.initChartConfig(candles, columns, diffMax, min, max, yMin, yMax, fakeGraphs, height, width, baseSymbol, quoteSymbol, rangeIndex)}
                    />
                    <div className="lineForMainChart">
                        <div className="circle"/>
                        <div className="line"/>
                    </div>
                </div>
            </MainChartWrapper>
        )
    }
}

export default MainChart;
