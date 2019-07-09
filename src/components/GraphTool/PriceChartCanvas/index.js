import React, { Component } from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import moment from 'moment';

import LineChart from '../../../lib/lineChart';
import WalletPopup from '../WalletPopup';
import DataLoader from '../../../components-generic/DataLoader';
import { STORE_KEYS } from '../../../stores';
import { MAX_PRICES_LENGTH } from '../../../stores/PriceChartStore';

const ChartWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${props => props.theme.palette.clrBackground};
    padding-bottom: ${props => (props.isLowerSectionOpened ? '15px' : '0')};
    border-top-left-radius: ${props => props.theme.palette.borderRadius};
    border-style: solid;
    border-color: ${props => props.theme.palette.clrBorder};
    border-width: 1px 0 ${props => (props.isLowerSectionOpened ? '0' : '1px')} 1px;
    cursor: crosshair;
    z-index: 3;
`;

class PriceChartCanvas extends Component {
    constructor(props) {
        super(props);

        this.defaultFiat = undefined;
        this.chartInitialized = false;
        this.activeCoin = undefined;
    }

    componentDidUpdate() {
        const {
            [STORE_KEYS.PRICECHARTSTORE]: { priceData },
        } = this.props;

        if (!priceData.length) {
            return;
        }

        if (this.chartInitialized) {
            this.updateChart();
        } else {
            const startTime = moment().subtract(120, 'seconds').valueOf();
            const endTime = moment().add(60, 'seconds').valueOf();
            this.chartInitialized = true;
            this.chart = new LineChart({
                el: this.el,
                maxDataLength: MAX_PRICES_LENGTH,
                data: this.patchPriceData(priceData),
                config: {
                    startTime,
                    endTime,
                    minRangeForZoom: moment().subtract(1, 'hour').valueOf(),
                    timeLimitWhenShift: (endTime - startTime) * 0.1,
                },
            });
        }
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

    patchPriceData = priceData => priceData.map(item => ({ x: item[0], y: item[1] }));

    updateChart = () => {
        const {
            [STORE_KEYS.PRICECHARTSTORE]: { priceData },
        } = this.props;

        const nextItemArray = priceData[priceData.length - 1];
        const nextItem = { x: nextItemArray[0], y: nextItemArray[1] };

        this.chart.lineTo(nextItem);
    };

    render() {
        const {
            [STORE_KEYS.PRICECHARTSTORE]: { priceData },
            [STORE_KEYS.YOURACCOUNTSTORE]: { selectedCoin },
            [STORE_KEYS.SETTINGSSTORE]: { defaultFiat },
            isLowerSectionOpened,
            height,
        } = this.props;

        const isLoadingGraph =
            !priceData.length ||
            this.defaultFiat !== defaultFiat ||
            (selectedCoin !== '' && this.activeCoin !== selectedCoin);

        if (this.activeCoin !== selectedCoin) {
            this.destroyChart();
            this.activeCoin = selectedCoin;
        }

        if (this.defaultFiat !== defaultFiat) {
            this.destroyChart();
            this.defaultFiat = defaultFiat;
        }

        return (
            <ChartWrapper isLowerSectionOpened={isLowerSectionOpened}>
                <canvas ref={el => (this.el = el)} />
                <WalletPopup isGlobal={true} maxHeight={height} />
                {isLoadingGraph && <DataLoader width={100} height={100} />}
            </ChartWrapper>
        );
    }
}

export default inject(STORE_KEYS.PRICECHARTSTORE, STORE_KEYS.YOURACCOUNTSTORE, STORE_KEYS.SETTINGSSTORE)(
    observer(PriceChartCanvas)
);
