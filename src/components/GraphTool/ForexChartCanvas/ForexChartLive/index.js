import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import moment from 'moment';

import DataLoader from '@/components-generic/DataLoader';
import LineChart from '@/lib/chartModules/lineChart';
import { ChartCanvasWrapper } from '../styles';
import { STORE_KEYS } from '@/stores';
import { MAX_PRICES_LENGTH } from '@/stores/ForexStore';

class ForexChartLive extends Component {
    forexCurrency = '';

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            defaultFiat: undefined,
            c1: undefined,
            c2: undefined,
        };

        this.chartInitialized = false;
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const {
            [STORE_KEYS.YOURACCOUNTSTORE]: { selectedCoin, quoteSelectedCoin },
            [STORE_KEYS.SETTINGSSTORE]: { defaultFiat },
            [STORE_KEYS.FOREXSTORE]: { priceData },
        } = nextProps;

        if (
            prevState.defaultFiat !== defaultFiat ||
            prevState.c1 !== selectedCoin ||
            prevState.c2 !== quoteSelectedCoin ||
            !priceData.length
        ) {
            return {
                loading: true,
                defaultFiat,
                c1: selectedCoin,
                c2: quoteSelectedCoin,
            };
        }

        return {
            loading: false,
        };
    }

    componentDidUpdate() {
        const {
            [STORE_KEYS.FOREXSTORE]: {
                priceData,
                forexCurrency,
                forexCurrencySymbol: coinSymbol,
                forexCurrency: forexSymbol,
                rate
            },
        } = this.props;

        const { loading } = this.state;

        if (this.forexCurrency === '') {
            this.forexCurrency = forexCurrency;
        }
        if (this.forexCurrency !== forexCurrency) {
            this.forexCurrency = forexCurrency;
            this.setState({ loading: true });
            return this.destroyChart();
        }
        if (loading) {
            return this.destroyChart();
        }

        if (this.chartInitialized) {
            return this.updateChart();
        }

        const startTime = moment()
            .subtract(90, 'seconds')
            .valueOf();
        const endTime = moment()
            .add(90, 'seconds')
            .valueOf();
        const data = priceData.map(item => ({ x: item[0], y: item[1] }));

        this.chartInitialized = true;

        this.chart = new LineChart({
            el: this.el,
            data,
            config: {
                liveMode: true,
                startTime,
                endTime,
                maxDataLength: MAX_PRICES_LENGTH,
                coinSymbol,
                isForexMode: true,
                forexSymbol,
                rate,
            },
        });
    }

    componentWillUnmount() {
        this.destroyChart();
    }

    destroyChart = () => {
        this.chartInitialized = false;
        if (this.chart) {
            this.chart.destroy();
        }
    };

    updateChart = () => {
        const {
            [STORE_KEYS.SETTINGSSTORE]: { getDefaultPrice },
            [STORE_KEYS.FOREXSTORE]: { forexUSD },
        } = this.props;

        const nextItem = { x: new Date().getTime(), y: getDefaultPrice(forexUSD) };

        this.chart.lineTo(nextItem);
    };

    render() {
        const { [STORE_KEYS.FOREXSTORE]: { priceData } } = this.props;
        const { loading } = this.state;

        return (
            <ChartCanvasWrapper>
                <canvas ref={el => (this.el = el)} />
                {loading && <DataLoader width={100} height={100} />}
            </ChartCanvasWrapper>
        );
    }
}

export default inject(
    STORE_KEYS.FOREXSTORE,
    STORE_KEYS.YOURACCOUNTSTORE,
    STORE_KEYS.SETTINGSSTORE
)(observer(ForexChartLive));
