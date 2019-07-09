import Chartjs from 'chart.js';
import moment from 'moment';
import max from 'lodash.max';
import min from 'lodash.min';
import 'chartjs-plugin-zoom';

import documentVisibilityListener from '../../utils/documentVisibilityListener';
import PulsateDotSrc from './pulsateDot.svg';

const ANIMATION_DURATION = 1000;
const SHIFT_CHART_DURATION = 500;

const PulsateDot = new Image();
PulsateDot.src = PulsateDotSrc;

export default class LineChart {
    constructor(props) {
        this.el = props.el;
        this.maxDataLength = props.maxDataLength;
        this.initialDataLength = props.data.length;
        this.config = props.config;
        this.chart = new Chartjs(this.el, this.getConfig(props.data, props.config));
        this.removeVisibilityListener = documentVisibilityListener(this.onChangeVisibility);

        // helpers
        this.updateInProgress = false;
        this.lineAnimationStartedAt = moment().valueOf();
        this.tabStatus = 'visible';

        // timers
        this.shiftChartTimer = undefined;
        this.drawLineTimer = undefined;
        this.clearUpdateProgressTimer = undefined;
    }

    // getDefault gradient for line chart
    getLineGradient = () => {
        const ctx = this.el.getContext('2d');
        const gradient = ctx.createLinearGradient(0, 0, 0, this.el.offsetHeight);
        gradient.addColorStop(0, 'rgba(48, 147, 253, 0.2)');
        gradient.addColorStop(1, 'rgba(33, 27, 88, 0.2)');

        return gradient;
    };

    getConfig = (data, config = {}) => {
        let pointStyle = [];
        if (data.length) {
            pointStyle = Array(data.length - 1)
                .fill('')
                .concat([PulsateDot]);
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
                customLine: {},
                scales: {
                    xAxes: [
                        {
                            id: 'time',
                            type: 'time',
                            distribution: 'linear',
                            bounds: 'ticks',
                            ticks: {
                                source: 'auto',
                            },
                            time: {
                                min: config.startTime,
                                max: config.endTime,
                                displayFormats: {
                                    second: 'H:mm:ss',
                                },
                            },
                            gridLines: {
                                color: '#191D3E',
                            },
                        }
                    ],
                    yAxes: [
                        {
                            id: 'price',
                            position: 'right',
                            scaleLabel: {
                                display: false,
                            },
                            ticks: {
                                source: 'labels',
                            },
                            gridLines: {
                                color: '#191D3E',
                            },
                            offset: config.yAxesOffset,
                        }
                    ],
                },
                legend: {
                    display: false,
                },
                tooltips: {
                    enabled: false,
                },
                // Container for pan options
                pan: {
                    // Boolean to enable panning
                    enabled: true,

                    // Panning directions. Remove the appropriate direction to disable
                    // Eg. 'y' would only allow panning in the y direction
                    mode: 'x',
                    rangeMin: {
                        // Format of min zoom range depends on scale type
                        x: config.minRangeForZoom,
                    },
                },

                // Container for zoom options
                zoom: {
                    // Boolean to enable zooming
                    enabled: true,

                    // Zooming directions. Remove the appropriate direction to disable
                    // Eg. 'y' would only allow zooming in the y direction
                    mode: 'x',
                    speed: 0.008,
                    rangeMin: {
                        // Format of min zoom range depends on scale type
                        x: config.minRangeForZoom,
                    },
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
        ctx.moveTo(right - 7, y);
        ctx.lineTo(right, y - 10);
        ctx.lineTo(right + width, y - 10);
        ctx.lineTo(right + width, y + 10);
        ctx.lineTo(right, y + 10);
        ctx.lineTo(right - 7, y);
        ctx.fillStyle = '#7F88C2';
        ctx.fill();

        // draw price at Y-axes for cursor
        ctx.fillStyle = '#fff';
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.fillText(`${(Math.round(valueAtCursor * 100) / 100).toFixed(2)}`, right + width / 2, y);
    };

    drawTimeLabel(x, valueAtCursor) {
        const {
            chart: { ctx },
            chartArea: { bottom },
            scales: {
                time: { width },
            },
        } = this.chart;
        // draw box for price at Y-axes for cursor
        let labelWidth = 50;
        let offsetY = 0;
        let labelHeight = 20;
        ctx.beginPath();
        ctx.moveTo(x, bottom + offsetY);
        ctx.lineTo(x + labelWidth, bottom + offsetY);
        ctx.lineTo(x + labelWidth + 7, bottom + offsetY + labelHeight / 2);
        ctx.lineTo(x + labelWidth, bottom + offsetY + labelHeight);
        ctx.lineTo(x, bottom + offsetY + labelHeight);
        ctx.lineTo(x, bottom + offsetY);
        ctx.fillStyle = '#7F88C2';
        ctx.fill();
        // draw price at Y-axes for cursor
        ctx.fillStyle = '#fff';
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.fillText(`${valueAtCursor}`, x + labelWidth / 2, bottom + labelHeight / 2);
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
    // https://github.com/bameyrick/js-easing-functions/blob/master/src/index.ts
    easeOutQuart = (elapsed, initialValue, amountOfChange, duration) =>
        amountOfChange * ((elapsed = elapsed / duration - 1) * elapsed * elapsed * elapsed * elapsed + 1) +
        initialValue;

    onChangeVisibility = status => {
        this.tabStatus = status;
    };

    // function to animate line
    animateLine = (targetCoordinates, animationStartTs, isFirstCall) => {
        if (!this.chart || this.tabStatus === 'hidden') {
            return;
        }

        const elapsed = Date.now() - animationStartTs;
        let poppedItem;

        if (isFirstCall) {
            // move blue dot to the last item
            this.chart.data.datasets[0].pointStyle.unshift('');
        } else {
            // remove most recent item
            poppedItem = this.chart.data.datasets[0].data.pop();
        }

        const dataset = this.chart.data.datasets[0].data;
        const prevItem = dataset[dataset.length - 1];

        const coordinates = {
            x: this.easeOutQuart(elapsed, prevItem.x, targetCoordinates.x - prevItem.x, ANIMATION_DURATION),
            y: this.easeOutQuart(elapsed, prevItem.y, targetCoordinates.y - prevItem.y, ANIMATION_DURATION),
        };

        if (coordinates.x <= targetCoordinates.x || coordinates.x >= prevItem.x) {
            this.chart.data.datasets[0].data.push(coordinates);
        } else if (poppedItem) {
            this.chart.data.datasets[0].data.push(poppedItem);
        }
        this.chart.update();

        if (elapsed < ANIMATION_DURATION) {
            setTimeout(() => this.animateLine(targetCoordinates, animationStartTs), 0);
        }
    };

    // adjust prices axes
    adjustAxesPrices = nextItem => {
        let {
            price: { min: priceMin, max: priceMax },
        } = this.chart.scales;

        const { data: currentData } = this.chart.data.datasets[0];

        if (!currentData.length) {
            return;
        }

        const { data: dataModels } = this.chart.getDatasetMeta(0);

        const chartWidth = this.chart.width;

        const visibleData = [];
        let lastAddedItemIndex = -1;
        for (let i = 0; i < dataModels.length; i++) {
            const item = dataModels[i];
            if (item._model.x > 0 && item._model.x < chartWidth) {
                visibleData.push(currentData[i].y);
                lastAddedItemIndex = i;
            }
        }

        if (lastAddedItemIndex === dataModels.length - 1) {
            visibleData.push(nextItem.y);
        }

        let updateBeforeAnimation = false;
        let maxVisiblePrice = max(visibleData);
        let minVisiblePrice = min(visibleData);
        const priceDifference = maxVisiblePrice - minVisiblePrice;
        const qualifier = priceDifference * 0.1;
        maxVisiblePrice += qualifier;
        minVisiblePrice -= qualifier;
        // const tickStep = ticksAsNumbers[0] - ticksAsNumbers[1];
        const tickStep = Math.pow(10, Math.round(maxVisiblePrice - minVisiblePrice).toString().length - 1);
        if (maxVisiblePrice > priceMax || maxVisiblePrice < priceMax - tickStep) {
            this.chart.config.options.scales.yAxes[0].ticks.max =
                maxVisiblePrice - (maxVisiblePrice % tickStep) + tickStep;
            updateBeforeAnimation = true;
        }
        if (minVisiblePrice < priceMin || minVisiblePrice > priceMin + tickStep) {
            this.chart.config.options.scales.yAxes[0].ticks.min = minVisiblePrice - (minVisiblePrice % tickStep);
            updateBeforeAnimation = true;
        }

        return updateBeforeAnimation;
    };

    // shift time axes
    shiftChartTimeline = nextItem => {
        const {
            time: { min: timeMin, max: timeMax },
        } = this.chart.scales;
        const { data: currentData } = this.chart.data.datasets[0];
        const lastItem = currentData[currentData.length - 1];
        const timeToShift = moment(timeMax).subtract(this.config.timeLimitWhenShift);
        if (moment(lastItem.x).isBefore(timeToShift) && moment(timeToShift).isBefore(nextItem.x)) {
            // the line reaches the edge
            this.chart.config.options.scales.xAxes[0].time.max = moment(timeMax).add(60, 'seconds');
            this.chart.config.options.scales.xAxes[0].time.min = moment(timeMin).add(60, 'seconds');
            return true;
        }

        return false;
    };

    destroy = () => {
        this.updateInProgress = false;

        clearTimeout(this.shiftChartTimer);
        clearTimeout(this.drawLineTimer);
        clearTimeout(this.clearUpdateProgressTimer);

        if (this.removeVisibilityListener) {
            this.removeVisibilityListener();
        }

        if (this.chart) {
            this.chart.destroy();
            this.chart = undefined;
        }
    };

    lineTo = (nextItem) => {
        if (this.updateInProgress) {
            // block all updates while current animation is in progress
            return Promise.resolve();
        }

        const { data: currentData, pointStyle } = this.chart.data.datasets[0];

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
            this.chart.data.datasets[0].data = currentData.slice(currentData.length - this.initialDataLength);
            this.chart.data.datasets[0].pointStyle = pointStyle.slice(currentData.length - this.initialDataLength);
            this.chart.update({ duration: 0 });
        }

        return new Promise(resolve => {
            // adjust and shift chart
            const updateBeforeAnimation = this.shiftChartTimeline(nextItem) || this.adjustAxesPrices(nextItem);

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
                if (this.tabStatus === 'visible') {
                    // let's use animation only when tab is active
                    this.animateLine(nextItem, currentTs, true);
                    this.lineAnimationStartedAt = currentTs;
                    this.clearUpdateProgressTimer = setTimeout(() => {
                        this.updateInProgress = false;
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
