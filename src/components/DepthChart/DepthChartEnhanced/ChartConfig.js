/* eslint no-template-curly-in-string: 0 */  // --> OFF
import Highcharts from 'highcharts'

// height for chart in both init and update must subtract 36 because of materials select.
export const initConfiguration = (buy, sell, theme, height) => {
  return (
    {
      chart: {
        type: 'area',
        zoomType: 'xy',
        height: (height - 36),
        backgroundColor: '#18202d',
      },
      credits: {
        enabled: false,
      },
      title: null,
      xAxis: [{
        type: 'logarithmic',
        width: '50%',
        visible: false,
        crosshair: true,
      }, {
        type: 'logarithmic',
        offset: 0,
        left: '49%',
        width: '50%',
        visible: false,
        crosshair: true,
      }],
      yAxis: {
        visible: false,
      },
      legend: {
        enabled: false,
      },
      plotOptions: {
        area: {
          step: 'right',
          softThreshold: true,
          marker: {
            enabled: false,
          },
          lineWidth: 3,
          states: {
            hover: {
              lineWidth: 5,
            },
          },
          threshold: null,
        },
      },
      tooltip: {
        shared: false,
        useHTML: true,
        headerFormat: '',
        pointFormat: '<span style="text-align: center;">${point.x}</span>',
        footerFormat: '',
        valueDecimals: 2,
        style: {
          color: `${theme.palette.contrastText}`,
          fontSize: '1.2rem',
        },
      },
      series: [{
        name: 'Bids',
        data: buy,
        color: `${theme.tradePalette.primaryBuy}`,
        xAxis: 0,
        fillColor: {
          linearGradient: [0, 0, 0, 300],
          stops: [
            [0, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0.05).get('rgba')],
            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
          ],
        },
        marker: {
          symbol: 'circle',
        },
      }, {
        name: 'Asks',
        data: sell,
        color: `${theme.tradePalette.primarySell}`,
        xAxis: 1,
        fillColor: {
          linearGradient: [0, 0, 0, 300],
          stops: [
            [0, Highcharts.Color('#e05475').setOpacity(0.4).get('rgba')],
            [1, Highcharts.Color('#e05475').setOpacity(0).get('rgba')]
          ],
        },
        marker: {
          symbol: 'circle',
        },
      }],
    }
  )
}

export const updateConfig = (buy, sell, theme, height, width) => {
  return (
    {
      chart: {
        height: (height - 36),
        width: width,
      },
      series: [{
        data: buy,
        color: `${theme.tradePalette.primaryBuy}`,
      }, {
        data: sell,
        color: `${theme.tradePalette.primarySell}`,
      }],
    }
  )
}
