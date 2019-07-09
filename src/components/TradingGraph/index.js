import React from 'react';
import TradingViewWidget, {Themes} from 'react-tradingview-widget';
import {withProps, compose, defaultProps} from 'recompose';
import {inject, observer} from 'mobx-react';
import {STORE_KEYS} from '../../stores';

const Coinbase = 'COINBASE';
const Binance = 'BINANCE';
const Bitfinex = 'BITFINEX';

const coinPairExchangeTable = {
    'BTCUSD':Coinbase,
    'ETHUSD':Coinbase,
    'ETHBTC':Coinbase,
    'LTCUSD':Coinbase,
    'LTCBTC':Coinbase,
    "BTCUSDT":Binance,
    "TRXBTC":Binance,
    "ADABTC":Binance,
    "BNBBTC":Binance,
    "EOSBTC":Binance,
    "KEYBTC":Binance,
    "BNBUSDT":Binance,
    "ZRXBTC":Binance,
    "XLMBTC":Binance,
    "ICXBTC":Binance,
    "NEOBTC":Binance,
    "ETHUSDT":Binance,
    "NEOUSDT":Binance,
    "ONTBTC":Binance,
    "QKCBTC":Binance,
    "ZILBTC":Binance,
    "ADAUSDT":Binance,
    "XRPBTC":Binance,
    "MFTBTC":Binance,
    "EOSUSDT":Binance,
    "ETCBTC":Binance,
    "VENBTC":Binance,
    "NANOBTC":Binance,
    "XVGBTC":Binance,
    "IOTABTC":Binance,
    "WANBTC":Binance,
    "BATBTC":Binance,
    "BCCUSDT":Binance,
    "ADAUSD":Binance,
    "TRXUSDT":Binance,
    "NPXSBTC":Binance,
    "XLMUSDT":Binance,
    "DENTBTC":Binance,
    "ONTUSDT":Binance,
    "MANABTC":Binance,
    "LTCUSDT":Binance,
    "BCCBTC":Binance,
    "IOSTBTC":Binance,
    "ENJBTC":Binance,
    "ELFBTC":Binance,
    "POWRBTC":Binance,
    "BCDBTC":Binance,
    "AIONBTC":Binance,
    "LOOMBTC":Binance,
    "WTCBTC":Binance,
    "GTOBTC":Binance,
    "POEBTC":Binance,
    "NCASHBTC":Binance,
    "EOSUSD":Bitfinex,
    "XRPUSD":Bitfinex,
    "BCHUSD":Bitfinex,
    "IOTUSD":Bitfinex,
    "NEOUSD":Bitfinex,
    "BTCUSDSHORTS":Bitfinex,
    "ETCUSD":Bitfinex,
    "BTCUSDLONGS":Bitfinex,
    "ZECUSD":Bitfinex,
    "ETPUSD":Bitfinex,
    "TRXUSD":Bitfinex,
    "BCHBTC":Bitfinex,
    "OMGUSD":Bitfinex,
    "XMRUSD":Bitfinex,
    "ZRXUSD":Bitfinex,
    "BTGUSD":Bitfinex,
    "BTCEUR":Bitfinex,
    "XLMUSD":Bitfinex,
    "IOTBTC":Bitfinex,
    "DSHUSD":Bitfinex,
    "BTCJPY":Bitfinex,
    "XMRBTC":Bitfinex,
    "ZECBTC":Bitfinex,
    "ETHEUR":Bitfinex,
    "GNTUSD":Bitfinex,
    "ETPBTC":Bitfinex,
    "SANUSD":Bitfinex,
    "OMGBTC":Bitfinex,
    "BATUSD":Bitfinex,
    "XVGUSD":Bitfinex,
    "VENUSD":Bitfinex,
    "BTGBTC":Bitfinex,
    "QTMUSD":Bitfinex,
    "ETHUSDSHORTS":Bitfinex,
    "DATUSD":Bitfinex,
}

const baseQuoteInTradingViewFormat = (base, quote) => {
    const basequote = `${base}${quote}`;
    return `${coinPairExchangeTable[basequote]}:${basequote}`;
};

const tradingViewThemeFromMuiTheme = muiTheme => muiTheme === 'dark' ? Themes.DARK : Themes.LIGHT;

const TradingGraph = defaultProps({
    locale:'en',
    interval:120,
    width:2500,
    height:960,
    autosize:true,
})(TradingViewWidget);

export default compose(
    inject(STORE_KEYS.INSTRUMENTS),
    observer,
    withProps(
        ({
            [STORE_KEYS.INSTRUMENTS]:{selectedInstrumentPair:[base, quote]},
            themeType:{muiTheme},
        }) => ({
            symbol:baseQuoteInTradingViewFormat(base, quote),
            theme:tradingViewThemeFromMuiTheme(muiTheme),
        })
    ),
)(TradingGraph);


