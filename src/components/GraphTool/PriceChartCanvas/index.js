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
    ${props => props.isBorderHidden && 'border: none !important;'}
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${props => props.theme.palette.clrPriceChartAreaBackground};
    padding-bottom: ${props => (props.isLowerSectionOpened ? '15px' : '0')};
    border-radius: ${props => props.theme.palette.borderRadius};
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
        this.c1 = undefined;
        this.c2 = undefined;
    }

    componentDidUpdate() {
        const {
            [STORE_KEYS.PRICECHARTSTORE]: { priceData },
            [STORE_KEYS.SETTINGSSTORE]: { defaultFiatSymbol },
        } = this.props;

        if (!priceData.length) {
            return;
        }

        if (this.chartInitialized) {
            this.updateChart();
        } else {
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
                maxDataLength: MAX_PRICES_LENGTH,
                data,
                config: {
                    startTime,
                    endTime,
                },
                coin: defaultFiatSymbol,
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

    updateChart = () => {
        const {
            [STORE_KEYS.ORDERBOOKBREAKDOWN]: { MidPrice },
        } = this.props;

        const nextItem = { x: new Date().getTime(), y: MidPrice };
        this.chart.lineTo(nextItem);
    };

    render() {
        const {
            [STORE_KEYS.PRICECHARTSTORE]: { priceData },
            [STORE_KEYS.YOURACCOUNTSTORE]: { selectedCoin, quoteSelectedCoin },
            [STORE_KEYS.SETTINGSSTORE]: { defaultFiat },
            isLowerSectionOpened,
            height,
            isBorderHidden,
        } = this.props;

        const isLoadingGraph =
            !priceData.length ||
            this.defaultFiat !== defaultFiat ||
            this.c1 !== selectedCoin ||
            this.c2 !== quoteSelectedCoin;

        if (isLoadingGraph) {
            this.destroyChart();
            this.c1 = selectedCoin;
            this.c2 = quoteSelectedCoin;
            this.defaultFiat = defaultFiat;
        }

        return (
            <ChartWrapper isLowerSectionOpened={isLowerSectionOpened} isBorderHidden={isBorderHidden}>
                <canvas ref={el => (this.el = el)} />
                <WalletPopup isGlobal={true} maxHeight={height} />
                {isLoadingGraph && <DataLoader width={100} height={100} />}
            </ChartWrapper>
        );
    }
}

export default inject(
    STORE_KEYS.PRICECHARTSTORE,
    STORE_KEYS.YOURACCOUNTSTORE,
    STORE_KEYS.SETTINGSSTORE,
    STORE_KEYS.ORDERBOOKBREAKDOWN
)(
    observer(PriceChartCanvas)
);
