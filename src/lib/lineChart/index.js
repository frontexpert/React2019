import Chart from 'chart.js';
import moment from 'moment';
import 'chartjs-plugin-zoom';

import documentVisibilityListener from '../../utils/documentVisibilityListener';
import {
    ANIMATION_DURATION, SHIFT_CHART_DURATION, SHIFT_CHART_QUALIFIER
} from './constants';
import { formatCoinString } from '../../utils';
import PulsateDotSrc from './pulsateDot.svg';
import './customScaleTypes';

const PulsateDot = new Image();
PulsateDot.src = PulsateDotSrc;

Chart.defaults.global.animation.duration = 200;

export default class LineChart {
    constructor(props) {
        this.el = props.el;
        this.maxDataLength = props.maxDataLength;
        this.initialDataLength = props.data.length;
        this.config = props.config;
        this.chart = new Chart(this.el, this.getConfig(props.data, props.config));
        this.removeVisibilityListener = documentVisibilityListener(this.onChangeVisibility);
        this.coin = props.coin;

        // helpers
        this.updateInProgress = false;
        this.lineAnimationStartedAt = moment().valueOf();
        this.tabStatus = 'visible';

        // timers
        this.shiftChartTimer = undefined;
        this.drawLineTimer = undefined;
        this.clearUpdateProgressTimer = undefined;
        this.mouseMoveTimer = undefined;
    }

    // getDefault gradient for line chart
    getLineGradient = () => {
        const ctx = this.el.getContext('2d');
        const gradient = ctx.createLinearGradient(0, 0, 0, this.el.offsetHeight);
        gradient.addColorStop(0, 'rgba(15, 68, 149, 0.3)');
        // gradient.addColorStop(1, 'rgba(33, 27, 88, 0.4)');
        // gradient.addColorStop(0, '#20223e');
        // gradient.addColorStop(1, '#20223e');

        return gradient;
    };

    getConfig = (data, config = {}) => {
        let pointStyle = [];
        const now = Date.now();
        let zoomMin = now;
        let zoomMax = config.endTime;
        if (data.length) {
            pointStyle = Array(data.length - 1)
                .fill('')
                .concat([PulsateDot]);
            zoomMin = data[0].x;
        }

        return {
            type: 'line',
            data: {
                datasets: [
                    {
                        borderColor: '#d4d4d4',
                        backgroundColor: this.getLineGradient(),
                        fill: true,
                        data,
                        type: 'line',
                        lineTension: 0,
                        borderWidth: 3,
                        pointRadius: 0,
                        pointStyle,
                        steppedLine: config.steppedLine,
                    }
                ],
            },

            options: {
                maintainAspectRatio: false,
                maxTickDecimalPoints: 0,
                customLine: {},
                elements: {
                    line: {
                        tension: 0, // disables bezier curves
                    },
                },
                scales: {
                    xAxes: [
                        {
                            id: 'time',
                            type: 'time',
                            distribution: 'linear',
                            bounds: 'ticks',
                            ticks: {
                                source: 'auto',
                                autoSkip: true,
                                autoSkipPadding: 100,
                                maxRotation: 0,
                                // move ticks inside the chart
                                padding: -20,
                            },
                            time: {
                                min: config.startTime,
                                max: config.endTime,
                                displayFormats: {
                                    hour: 'H:mm',
                                    minute: 'H:mm',
                                    second: 'H:mm:ss',
                                    millisecond: 'H:mm:ss',
                                },
                            },
                            gridLines: {
                                color: '#191D3E',
                                tickMarkLength: 0,
                                drawBorder: false,
                            },
                            afterFit: chart => {
                                chart.minSize.height = 0;
                                chart.paddingLeft = 0;
                            },
                        }
                    ],
                    yAxes: [
                        {
                            id: 'price',
                            type: config.maxTicksLimit ? 'fixed-grid-rows-scale' : 'custom-min-max-scale',
                            position: 'right',
                            scaleLabel: {
                                display: false,
                            },
                            ticks: {
                                source: 'labels',
                                maxTicksLimit: config.maxTicksLimit || 8,
                            },
                            gridLines: {
                                color: '#191D3E',
                            },
                            offset: config.yAxesOffset,
                            afterFit: chart => {
                                chart.margins.top = 0;
                                chart.margins.bottom = 0;
                                chart.paddingTop = 0;
                                chart.paddingBottom = 0;
                            },
                        }
                    ],
                },
                legend: {
                    display: false,
                },
                tooltips: {
                    enabled: false,
                },
                hover: {
                    animationDuration: 0, // duration of animations when hovering an item
                },
                // Container for pan options
                pan: {
                    enabled: true,
                    mode: 'x',
                    rangeMin: {
                        x: zoomMin,
                    },
                    rangeMax: {
                        x: zoomMax,
                    },
                    onPan: this.onZoom,
                },

                // Container for zoom options
                zoom: {
                    enabled: true,
                    mode: 'x',
                    speed: 0.016,
                    rangeMin: {
                        x: zoomMin,
                    },
                    rangeMax: {
                        x: zoomMax,
                    },
                    onZoom: this.onZoom,
                },
            },
            // Chart.js plugin:
            // - draws verical and horizontal lines under a cursor
            // - draws horizontal line from the most recent price
            // - displays cursor and the most recent price on the right side
            plugins: [
                {
                    beforeEvent: (chart, e) => {
                        if (e.type === 'mousemove') {
                            chart.options.customLine.x =
                                e.x >= e.chart.chartArea.left && e.x <= e.chart.chartArea.right ? e.x : undefined;
                            chart.options.customLine.y =
                                e.y >= e.chart.chartArea.top && e.y <= e.chart.chartArea.bottom ? e.y : undefined;
                            clearTimeout(this.mouseMoveTimer);
                            this.mouseMoveTimer = setTimeout(() => {
                                chart.options.customLine.x = undefined;
                                chart.options.customLine.y = undefined;
                            }, 5000);
                        }
                        if (e.type === 'mouseout') {
                            chart.options.customLine.x = undefined;
                            chart.options.customLine.y = undefined;
                        }
                    },
                    afterDraw: chart => {
                        const ctx = chart.chart.ctx;
                        const { x, y } = chart.options.customLine;

                        // save canvas state
                        ctx.save();

                        const {
                            top, bottom, right, left,
                        } = chart.chartArea;
                        const { min, max } = chart.scales.price;

                        // draw price label for the current price
                        const dataset = chart.data.datasets[0].data;
                        const lastItem = dataset[dataset.length - 1];
                        const meta = chart.getDatasetMeta(0);
                        if (!meta.data.length) {
                            // meta array is empty during the full redraw
                            return;
                        }
                        const lastItemY = meta.data[meta.data.length - 1]._model.y;
                        this.drawPriceLabel(lastItemY, lastItem.y);

                        // draw line for the current price
                        this.drawLine(left, lastItemY, right, lastItemY);

                        if (!x || !y) {
                            ctx.restore();
                            return;
                        }

                        // draw lines at cursor position
                        this.drawLine(x, bottom, x, top);
                        this.drawLine(left, y, right, y);

                        // draw price label for cursor
                        const valueAtCursor = (1 - (y - top) / (bottom - top)) * (max - min) + min;
                        this.drawPriceLabel(y, valueAtCursor);

                        // draw time label for cursor
                        // console.log(chart.scales.time);
                        let totalSeconds = (chart.scales.time.max - chart.scales.time.min) / 1000;
                        let frameWidth = chart.scales.time.maxWidth;
                        let secondStep = frameWidth / totalSeconds;
                        if (secondStep === 0) {
                            secondStep = 1;
                        }

                        let date = new Date(chart.scales.time.min + (x / secondStep) * 1000);
                        // Hours part from the timestamp
                        let hours = date.getHours();
                        // Minutes part from the timestamp
                        let minutes = '0' + date.getMinutes();
                        // Seconds part from the timestamp
                        let seconds = '0' + date.getSeconds();

                        // Will display time in 10:30:23 format
                        let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
                        this.drawTimeLabel(x, formattedTime);

                        // restore canvas state
                        ctx.restore();
                    },
                }
            ],
        };
    };

    drawPriceLabel = (y, valueAtCursor) => {
        const {
            chart: { ctx },
            chartArea: { right },
            scales: {
                price: { width },
            },
        } = this.chart;

        // draw box for price at Y-axes for cursor
        ctx.beginPath();
        ctx.moveTo(right - 12, y);
        ctx.lineTo(right - 5, y - 10);
        ctx.lineTo(right + width, y - 10);
        ctx.lineTo(right + width, y + 10);
        ctx.lineTo(right - 5, y + 10);
        ctx.lineTo(right - 12, y);
        ctx.fillStyle = '#7F88C2';
        ctx.fill();

        // draw price at Y-axes for cursor
        ctx.fillStyle = '#fff';
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.fillText(
            `${this.coin} ${formatCoinString(valueAtCursor, this.chart.options.maxTickDecimalPoints)}`,
            right - 5 + width / 2,
            y
        );
    };

    drawTimeLabel(x, valueAtCursor) {
        const {
            chart: { ctx },
            chartArea: { bottom },
        } = this.chart;
        // draw box for price at Y-axes for cursor
        let labelWidth = 60;
        let offsetY = 0;
        let labelHeight = 20;
        ctx.beginPath();
        ctx.moveTo(x - labelWidth / 2, bottom + offsetY);
        ctx.lineTo(x + labelWidth / 2, bottom + offsetY);
        ctx.lineTo(x + labelWidth / 2, bottom + offsetY - labelHeight);
        ctx.lineTo(x - labelWidth / 2, bottom + offsetY - labelHeight);
        ctx.lineTo(x - labelWidth / 2, bottom + offsetY);
        ctx.fillStyle = '#7F88C2';
        ctx.fill();
        // draw price at Y-axes for cursor
        ctx.fillStyle = '#fff';
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.fillText(`${valueAtCursor}`, x, bottom - labelHeight / 2);
    }

    drawLine = (x1, y1, x2, y2) => {
        const {
            chart: { ctx },
        } = this.chart;

        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#9ba4af';
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    };

    // function to calculate offset based on time and distance
    // http://gizma.com/easing/
    easeOutQuart = (t, b, c, d) => {
        t /= d;
        t--;
        return c * (t * t * t * t * t + 1) + b;
    };

    onChangeVisibility = status => {
        this.tabStatus = status;
    };

    onZoom = ({ chart }) => {
        const { data } = chart.data.datasets[0];
        if (!data.length) {
            return;
        }

        const {
            time: { min, max },
        } = chart.scales;
        const timeAxesDuration = max - min;

        const lastItem = data[data.length - 1];
        if (lastItem.x + timeAxesDuration * SHIFT_CHART_QUALIFIER * 2 > max) {
            this.chart.config.options.scales.xAxes[0].time.max =
                lastItem.x + timeAxesDuration * SHIFT_CHART_QUALIFIER * 2;
            this.chart.update({ duration: 0 });
        }
    };

    // function to animate line
    animateLine = (lastItem, nextItem, timestamp, isFirstCall) => {
        if (!this.chart || this.tabStatus === 'hidden') {
            return;
        }

        const elapsed = Date.now() - timestamp;

        if (elapsed >= ANIMATION_DURATION) {
            this.chart.data.datasets[0].data.pop();
            this.chart.data.datasets[0].data.push(nextItem);
            this.chart.update({ duration: 0 });
            return;
        }

        const coordinates = {
            x: this.easeOutQuart(elapsed, lastItem.x, nextItem.x - lastItem.x, ANIMATION_DURATION),
            y: this.easeOutQuart(elapsed, lastItem.y, nextItem.y - lastItem.y, ANIMATION_DURATION),
        };

        let itemAdded = isFirstCall;
        if (coordinates.x <= nextItem.x && coordinates.x >= lastItem.x) {
            itemAdded = false;
            if (isFirstCall) {
                this.chart.data.datasets[0].pointStyle.unshift('');
            } else {
                this.chart.data.datasets[0].data.pop();
            }
            this.chart.data.datasets[0].data.push(coordinates);
            this.chart.update();
        }

        if (elapsed < ANIMATION_DURATION) {
            setTimeout(() => this.animateLine(lastItem, nextItem, timestamp, itemAdded), ANIMATION_DURATION / 50);
        }
    };

    // shift time axes
    shiftChartTimeline = nextItem => {
        const {
            time: { min: timeMin, max: timeMax },
        } = this.chart.scales;
        const timeAxesDuration = timeMax - timeMin;
        if (nextItem.x + timeAxesDuration * SHIFT_CHART_QUALIFIER > timeMax) {
            // the line reaches the edge
            this.chart.config.options.scales.xAxes[0].time.max = nextItem.x + timeAxesDuration / 2;
            this.chart.config.options.scales.xAxes[0].time.min = nextItem.x - timeAxesDuration / 2;
            return true;
        }

        return false;
    };

    destroy = () => {
        this.updateInProgress = false;

        clearTimeout(this.shiftChartTimer);
        clearTimeout(this.drawLineTimer);
        clearTimeout(this.clearUpdateProgressTimer);
        clearTimeout(this.mouseMoveTimer);

        if (this.removeVisibilityListener) {
            this.removeVisibilityListener();
        }

        if (this.chart) {
            this.chart.destroy();
            this.chart = undefined;
        }
    };

    lineTo = nextItem => {
        if (this.updateInProgress || !this.chart) {
            // block all updates while current animation is in progress
            return Promise.resolve();
        }

        let { data: currentData, pointStyle } = this.chart.data.datasets[0];

        if (!currentData.length) {
            // add first item without animation
            this.chart.data.datasets[0].pointStyle.push(PulsateDot);
            this.chart.data.datasets[0].data.push(nextItem);
            this.chart.update({ duration: 0 });
            return Promise.resolve();
        }

        this.updateInProgress = true;

        const lastItem = currentData[currentData.length - 1];

        if (lastItem.x >= nextItem.x) {
            // in case of any glitches :)
            this.updateInProgress = false;
            return Promise.resolve();
        }

        if (currentData.length >= this.maxDataLength) {
            // slice history prices
            const nextData = currentData.slice(currentData.length - this.initialDataLength);
            this.chart.data.datasets[0].data = nextData;
            this.chart.data.datasets[0].pointStyle = pointStyle.slice(currentData.length - this.initialDataLength);
            const nextMinTime = nextData.length && nextData[0].x;
            if (nextMinTime) {
                const {
                    time: { min: timeMin },
                } = this.chart.scales;
                if (timeMin < nextMinTime) {
                    this.chart.config.options.scales.xAxes[0].time.min = nextMinTime;
                }
                this.chart.options.pan.rangeMin.x = nextMinTime;
                this.chart.options.zoom.rangeMin.x = nextMinTime;
            }
            this.chart.update({ duration: 0 });
            currentData = nextData;
        }

        if (this.config.removeRecurringPricesAtTheEnd) {
            let recurringItemsCount = 1;
            for (let i = currentData.length - 2; i >= 0; i--) {
                if (lastItem.y === currentData[i].y) {
                    recurringItemsCount += 1;
                } else {
                    break;
                }
            }

            if (recurringItemsCount > 2) {
                this.chart.data.datasets[0].data = currentData.slice(0, -recurringItemsCount + 1).concat([lastItem]);
                this.chart.data.datasets[0].pointStyle = pointStyle.slice(recurringItemsCount - 2);
            }
        }

        return new Promise(resolve => {
            // adjust and shift chart
            const updateBeforeAnimation = this.shiftChartTimeline(nextItem);

            const timeToFinishPrevAnimation = Math.max(
                ANIMATION_DURATION - (Date.now() - this.lineAnimationStartedAt),
                0
            );
            let delayBeforeNextAnimation = timeToFinishPrevAnimation;
            if (updateBeforeAnimation) {
                this.shiftChartTimer = setTimeout(() => {
                    // wait while previous animation is finished
                    this.chart.update({ duration: SHIFT_CHART_DURATION });
                }, timeToFinishPrevAnimation);

                delayBeforeNextAnimation += SHIFT_CHART_DURATION;
            }

            this.drawLineTimer = setTimeout(() => {
                const currentTs = Date.now();
                const {
                    time: { min: timeMin, max: timeMax },
                } = this.chart.scales;
                const timeAxesDuration = timeMax - timeMin;
                const nextMaxTime = nextItem.x + timeAxesDuration / 2;
                this.chart.options.pan.rangeMax.x = nextMaxTime;
                this.chart.options.zoom.rangeMax.x = nextMaxTime;
                if (this.tabStatus === 'visible') {
                    // let's use animation only when tab is active
                    this.animateLine(lastItem, nextItem, currentTs, true);
                    this.lineAnimationStartedAt = currentTs;
                    this.chart.options.drawingTo = nextItem.y;
                    this.clearUpdateProgressTimer = setTimeout(() => {
                        this.updateInProgress = false;
                        this.chart.options.drawingTo = undefined;
                        resolve();
                    }, ANIMATION_DURATION);
                } else {
                    // render without animation when tab is hidden
                    this.chart.data.datasets[0].pointStyle.unshift('');
                    this.chart.data.datasets[0].data.push(nextItem);
                    this.chart.update({ duration: 0 });
                    this.updateInProgress = false;
                    resolve();
                }
            }, delayBeforeNextAnimation);
        });
    };
}
