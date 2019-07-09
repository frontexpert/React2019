/* eslint no-template-curly-in-string: 0 */ // --> OFF
import Highcharts from 'highcharts';

import { formatOrderBookDigitString, formatDepthIntervalString } from '../../../utils';

// height for chart in both init and update must subtract 36 because of materials select.
// export const initConfiguration = (baseCur, quoteCur, midMarket, buy, sell, theme, height, width, zoomIndex, zoomUnit, zoomMax, max, interval, setTooltipColorMode) => {
export const initConfiguration = (
    baseCur,
    quoteCur,
    midMarket,
    buy,
    sell,
    theme,
    height,
    width,
    spread,
    setTooltipColorMode
) => {
    let rightSpace = 0;
    // let spread = zoomUnit * Math.pow(2, zoomIndex);
    // if (sell && buy && sell.length > 1 && buy.length > 1 && zoomIndex >= zoomMax) {
    //     spread = Math.min(sell[sell.length - 1].x - midMarket, midMarket - buy[0].x);
    // }

    return {
        chart: {
            type: 'area',
            height,
            width,
            animation: false,
            marginRight: rightSpace,
            marginTop: 0,
            marginBottom: 0,
            marginLeft: 0,
        },
        credits: {
            enabled: false,
        },
        title: null,
        xAxis: [
            {
                visible: false,
                crosshair: false,
                min: midMarket - spread,
                max: midMarket + spread,
            }
        ],
        yAxis: {
            className: 'highcharts-right',
            title: {
                text: null,
            },
            alignTicks: false,
            offset: 0,
            visible: true,
            opposite: true,
            lineWidth: 0,
            tickAmount: 6,
            lineColor: '#0E1622',
            gridLineWidth: 0,
            labels: {
                useHTML: true,
                formatter() {
                    var value = formatDepthIntervalString(this.value);
                    var labelHtml = '<b>' + value + '</b>';
                    if (value !== '') {
                        labelHtml += ' ' + baseCur;
                        // value+= `<img src="img/coin/coin-` + baseCur.toLowerCase() + `.svg" alt="` + baseCur + `"/>`;
                    }
                    return labelHtml;
                },
                enabled: true,
                align: 'right',
                x: -20,
            },
            maxPadding: 0,
            min: 0,
        },
        legend: {
            enabled: false,
        },
        plotOptions: {
            area: {
                softThreshold: true,
                marker: {
                    enabled: false,
                },
                lineWidth: 4,
                states: {
                    hover: {
                        lineWidth: 4,
                    },
                },
                threshold: null,
            },
        },
        tooltip: {
            animation: false,
            backgroundColor: 'rgba(0,0,0,0)',
            borderColor: 'rgba(0,0,0,0)',
            borderRadius: 0,
            padding: 0,
            shadow: false,
            shape: 'box',
            style: {
                color: `${theme.palette.contrastText}`,
                fontSize: 16,
            },
            shared: false,
            useHTML: true,
            formatter() {
                let TooltipValuePrices = this.x < 1 ? this.x.toFixed(6) : this.x.toPrecision(7);
                const outsideOffset = 22;
                let tooltipTop = this.point.plotY - outsideOffset;  // 10: force to go outside

                let margin = '';
                if (this.point.plotX + 140 > width - rightSpace) {
                    let offset = this.point.plotX + 140 - width + rightSpace;
                    margin += 'margin-left: -' + offset + 'px;';
                }

                let tooltipHtml = '';
                if (this.series.name === 'Bids') {
                    setTooltipColorMode('Buy');

                    tooltipHtml = `
                        <div class="tooltip-wrapper" style="top: ${tooltipTop + outsideOffset}px">
                            <div class="circle"></div>
                            <div class="tooltip horizontal" style="margin-top: -${tooltipTop}px;${margin}">
                              <div class="font12 textCenter bold">
                                <img src="img/coin/coin-${baseCur.toLowerCase()}.svg" alt="${baseCur}"/>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 125" x="0px" y="0px">
                                    <path d="M97.64,44.1,64.72,11.18a8.06,8.06,0,1,0-11.4,11.39L72.78,42H8.06a8.06,8.06,0,0,0,0,16.12H72.6L53.32,77.43a8.06,8.06,0,0,0,11.4,11.39L97.64,55.9A8,8,0,0,0,100,50.2a1.27,1.27,0,0,0,0-.2,1.41,1.41,0,0,0,0-.2A8.07,8.07,0,0,0,97.64,44.1Z"/>
                                </svg>
                                ${formatOrderBookDigitString(TooltipValuePrices)} 
                                <img class="left" src="img/coin/coin-${quoteCur.toLowerCase()}.svg" alt="${quoteCur}"/>
                              </div>
                            </div>
                        </div>
                        `;
                } else if (this.series.name === 'Asks') {
                    setTooltipColorMode('Sell');
                    tooltipHtml = `
                        <div class="tooltip-wrapper" style="top: ${tooltipTop + outsideOffset}px">
                            <div class="circle"></div>
                            <div class="tooltip horizontal" style="margin-top: -${tooltipTop}px;${margin}">
                              <div class="font12 textCenter bold">
                                <img class="right" src="img/coin/coin-${quoteCur.toLowerCase()}.svg" alt="${quoteCur}"/>
                                ${formatOrderBookDigitString(TooltipValuePrices)} 
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 125" x="0px" y="0px">
                                    <path d="M97.64,44.1,64.72,11.18a8.06,8.06,0,1,0-11.4,11.39L72.78,42H8.06a8.06,8.06,0,0,0,0,16.12H72.6L53.32,77.43a8.06,8.06,0,0,0,11.4,11.39L97.64,55.9A8,8,0,0,0,100,50.2a1.27,1.27,0,0,0,0-.2,1.41,1.41,0,0,0,0-.2A8.07,8.07,0,0,0,97.64,44.1Z"/>
                                </svg>
                                <img src="img/coin/coin-${baseCur.toLowerCase()}.svg" alt="${baseCur}"/>
                              </div>
                            </div>
                        </div>
                    `;
                }

                return tooltipHtml;
            },
            positioner: (labelWidth, labelHeight, point) => {
                return {
                    x: point.plotX,
                    y: 0,
                };
            },
        },
        series: [
            {
                name: 'Bids',
                data: buy,
                step: 'right',
                color: {
                    linearGradient: [0, 0, 300, 0],
                    stops: [[0, '#055125'], [2, '#01AC67']],
                },
                fillColor: {
                    linearGradient: [0, 160, 0, 290],
                    stops: [[0, '#01573F'], [1, 'rgba(0, 0, 0, 0.06)']],
                },
                marker: {
                    enabled: false,
                    states: {
                        hover: {
                            enabled: false,
                        },
                    },
                },
            },
            {
                name: 'Asks',
                data: sell,
                step: 'left',
                color: {
                    linearGradient: [0, 0, 300, 0],
                    stops: [
                        [0, '#052551'],
                        [2, '#0167AC']
                    ],
                },
                fillColor: {
                    linearGradient: [0, 160, 0, 290],
                    stops: [
                        [0, 'rgba(0, 153, 255, 0.5)'],
                        [1, 'rgba(0, 0, 0, 0.06)']
                    ],
                },
                marker: {
                    enabled: false,
                    states: {
                        hover: {
                            enabled: false,
                        },
                    },
                },
            }
        ],
    };
};

export const updateConfig = (buy, sell, height, width) => {
    return {
        chart: {
            height,
            width,
        },
        series: [
            {
                name: 'Bids',
                data: buy,
            },
            {
                name: 'Asks',
                data: sell,
            }
        ],
    };
};
