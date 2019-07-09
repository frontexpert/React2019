// Chart.js plugin:
// - draws verical and horizontal lines under a cursor
// - draws horizontal line from the most recent price
// - displays cursor and the most recent price on the right side
function drawPriceLabel(chart, y, valueAtCursor) {
    const {
        chart: { ctx },
        chartArea: { right },
        scales: {
            price: { width },
        },
    } = chart;

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
}

function drawTimeLabel(chart, x, valueAtCursor) {
    const {
        chart: { ctx },
        chartArea: { bottom },
        scales: {
            time: { width },
        },
    } = chart;

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

function drawLine(chart, x1, y1, x2, y2) {
    const {
        chart: { ctx },
    } = chart;

    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#9ba4af';
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

export const cursorLinesPlugin = {
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
        drawPriceLabel(chart, lastItemY, lastItem.y);

        // draw line for the current price
        drawLine(chart, left, lastItemY, right, lastItemY);

        if (!x || !y) {
            ctx.restore();
            return;
        }

        // draw lines at cursor position
        drawLine(chart, x, bottom, x, top);
        drawLine(chart, left, y, right, y);

        // draw price label for cursor
        const valueAtCursor = (1 - (y - top) / (bottom - top)) * (max - min) + min;
        drawPriceLabel(chart, y, valueAtCursor);

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
        drawTimeLabel(chart, x, formattedTime);

        // restore canvas state
        ctx.restore();
    },
};
