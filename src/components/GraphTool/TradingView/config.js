export default {
    disableLogo: true,
    timezone: 'America/New_York',

    height: '100%',
    width: '100%',
    theme: 'black',
    debug: false,
    toolbar_bg: '#ffffff',
    exchangeColors: ['#FFFFFF', '#f14d4d', '#0000FF', '#FF8C00', '#D8BFD8'],
    disabled_features: [
        'header_widget',
        'header_symbol_search',
        'delete_button_in_legend',
        'header_compare',
        'adaptive_logo',
        'show_logo_on_all_charts',
        'compare_symbol',
        'go_to_date'
    ],
    enabled_features: [
        'side_toolbar_in_fullscreen_mode',
        'header_saveload_to_the_right',
        'narrow_chart_enabled'
    ],
    drawings_access: {
        type: 'black',
        tools: [
            { name: 'Regression Trend' }
        ],
    },
    time_frames: [
        { text: '1min', resolution: '1' },
        { text: '5min', resolution: '5' },
        { text: '15min', resolution: '15' },
        // { text: '30min', resolution: '30' },
        { text: '1h', resolution: '60' },
        { text: '6h', resolution: '360' },
        { text: '1day', resolution: 'D' }
    ],
    studies_overrides: {
        'volume.volume.transparency': 30,
        'Overlay.style': 2,
        'Overlay.lineStyle.linewidth': 3,
    },
    overrides: {
        'mainSeriesProperties.style': 2,
        'mainSeriesProperties.lineStyle.linewidth': 2,

        'scalesProperties.showSymbolLabels': false,

        'paneProperties.background': '#000000',
        'paneProperties.vertGridProperties.color': '#4e4e4e',
        'paneProperties.horzGridProperties.color': '#4e4e4e',

        'paneProperties.topMargin': 5,
        'paneProperties.bottomMargin': 5,
        'paneProperties.gridProperties.color': '#222',

        // Candles styles
        'mainSeriesProperties.candleStyle.upColor': '#08620a',
        'mainSeriesProperties.candleStyle.downColor': '#bb080a',
        'mainSeriesProperties.candleStyle.drawWick': true,
        'mainSeriesProperties.candleStyle.drawBorder': true,
        'mainSeriesProperties.candleStyle.borderColor': '#767E83',
        'mainSeriesProperties.candleStyle.borderUpColor': '#066b06',
        'mainSeriesProperties.candleStyle.borderDownColor': '#e01b1c',
        'mainSeriesProperties.candleStyle.wickUpColor': '#767E83',
        'mainSeriesProperties.candleStyle.wickDownColor': '#767E83',
        'mainSeriesProperties.candleStyle.barColorsOnPrevClose': false,

        // Hollow Candles styles
        'mainSeriesProperties.hollowCandleStyle.upColor': '#08620a',
        'mainSeriesProperties.hollowCandleStyle.downColor': '#bb080a',

        // Heiken Ashi styles
        'mainSeriesProperties.haStyle.upColor': '#08620a',
        'mainSeriesProperties.haStyle.downColor': '#bb080a',

        // Bars styles
        'mainSeriesProperties.barStyle.upColor': '#08620a',
        'mainSeriesProperties.barStyle.downColor': '#bb080a',

        // Line styles
        'mainSeriesProperties.lineStyle.color': '#FFFFFF',


        'symbolWatermarkProperties.transparency': 90,

        'scalesProperties.textColor': '#FFFFFF',
        'scalesProperties.lineColor': '#303030',
        'scalesProperties.showLeftScale': false,
        'scalesProperties.showRightScale': true,
        'scalesProperties.backgroundColor': '#141414',
        'volumePaneSize': 'large',
        'mainSeriesProperties.hollowCandleStyle.drawWick': false,
        'mainSeriesProperties.haStyle.drawWick': false,
    },
};
