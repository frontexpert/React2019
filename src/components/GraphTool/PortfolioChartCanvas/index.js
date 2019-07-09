import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';

import LineChart from '../../../lib/lineChart';
import { STORE_KEYS } from '../../../stores';
import PortfolioValue from '../YourPortfolio/SplineAreaChartHighCharts/PortfolioValue';

import {
    ChartWrapper, PortfolioLabels, TotalPrice, PriceLabel
} from './styles';

const MAX_PRICES_LENGTH = 600;
const DUMMY_LINE_TIMEOUT = 2000;

class PortfolioChartCanvas extends Component {
    constructor(props) {
        super(props);

        this.defaultFiat = undefined;
        this.defaultCrypto = undefined;
        this.selectedCoin = undefined;
        this.chartInitialized = false;

        this.drawDummyLineTimer = undefined;
        this.nextPriceTimer = undefined;
        this.dummyLineDrawnAt = undefined;
        this.prevDataLength = 0;
    }

    componentDidMount() {
        const {
            [STORE_KEYS.SETTINGSSTORE]: { setDefaultCurrency },
        } = this.props;
        setDefaultCurrency('Bitcoin', 'BTC', 1, true);
        this.handleNewData();
    }

    componentDidUpdate() {
        this.handleNewData();
    }

    componentWillUnmount() {
        this.destroyChart();
    }

    getPortfolioInfo = () => {
        const {
            [STORE_KEYS.PORTFOLIODATASTORE]: {
                isActiveState,
            },
            [STORE_KEYS.SETTINGSSTORE]: { isDefaultCrypto, defaultFiatSymbol, defaultCryptoSymbol },
            [STORE_KEYS.ORDERHISTORY]: { lastPortfolioValue },
        } = this.props;

        return (
            <PortfolioLabels>
                <TotalPrice>
                    {/* <PriceLabel>
                        <FormattedMessage id="graph_tool.your_portfolio.label_balance" defaultMessage="BALANCE: " />
                    </PriceLabel> */}

                    <PortfolioValue
                        lastPortfolioValue={lastPortfolioValue}
                        isActiveState={isActiveState}
                        isDefaultCrypto={isDefaultCrypto}
                        defaultFiatSymbol={defaultFiatSymbol}
                        defaultCryptoSymbol={defaultCryptoSymbol}
                    />
                </TotalPrice>
            </PortfolioLabels>
        );
    };

    handleNewData = () => {
        const {
            [STORE_KEYS.ORDERHISTORY]: { PortfolioGraphData },
            [STORE_KEYS.SETTINGSSTORE]: { defaultFiatSymbol },
        } = this.props;

        if ((this.prevDataLength && !PortfolioGraphData.length) || (!this.prevDataLength && PortfolioGraphData.length)) {
            this.destroyChart();
        }

        if (this.chartInitialized) {
            this.updateChart();
        } else {
            this.chartInitialized = true;
            let data = [];
            const now = Date.now();
            let startTime = now;
            let endTime = moment()
                .add(180, 'seconds')
                .valueOf();
            if (PortfolioGraphData.length) {
                data = PortfolioGraphData.slice();
                startTime = Math.max(
                    data[0].x,
                    moment()
                        .subtract(10, 'minutes')
                        .valueOf()
                );
                endTime = Math.max(startTime + (now - startTime) * 2, endTime);
            }

            this.chart = new LineChart({
                el: this.el,
                maxDataLength: MAX_PRICES_LENGTH,
                data,
                config: {
                    startTime,
                    endTime,
                    // this is added to make grid lines be aligned with rows in the left block
                    maxTicksLimit: 9,
                    yAxesOffset: true,
                    steppedLine: true,
                    removeRecurringPricesAtTheEnd: true,
                },
                coin: defaultFiatSymbol,
            });

            // make the chart dynamic
            this.drawDummyLine();
        }

        this.prevDataLength = PortfolioGraphData.length;
    };

    destroyChart = () => {
        this.chartInitialized = false;
        clearTimeout(this.drawDummyLineTimer);
        clearTimeout(this.nextPriceTimer);
        if (this.chart) {
            this.chart.destroy();
        }
    };

    updateChart = forcedItem => {
        const timeSinceLastDraw = Date.now() - (this.dummyLineDrawnAt || 0);
        let timeoutBeforeNextDraw = Math.max(DUMMY_LINE_TIMEOUT - timeSinceLastDraw, 0);

        let nextItem = forcedItem;
        if (!forcedItem) {
            const {
                [STORE_KEYS.ORDERHISTORY]: { PortfolioGraphData },
            } = this.props;
            if (!PortfolioGraphData.length) {
                return;
            }

            nextItem = PortfolioGraphData[PortfolioGraphData.length - 1];

            clearTimeout(this.drawDummyLineTimer);
            this.drawDummyLineTimer = setTimeout(this.drawDummyLine, DUMMY_LINE_TIMEOUT);
        }

        this.nextPriceTimer = setTimeout(() => {
            this.chart.lineTo(nextItem);
        }, timeoutBeforeNextDraw);
    };

    drawDummyLine = () => {
        const {
            [STORE_KEYS.ORDERHISTORY]: { PortfolioGraphData },
        } = this.props;

        const lastPrice = PortfolioGraphData.length ? Number(PortfolioGraphData[PortfolioGraphData.length - 1].y) : 0;
        const dateNow = Date.now();

        this.updateChart({ x: dateNow, y: lastPrice });

        this.dummyLineDrawnAt = dateNow;
        this.drawDummyLineTimer = setTimeout(this.drawDummyLine, DUMMY_LINE_TIMEOUT);
    };

    render() {
        const {
            [STORE_KEYS.YOURACCOUNTSTORE]: { selectedCoin },
            [STORE_KEYS.SETTINGSSTORE]: { defaultFiat, defaultCrypto },
            isLowerSectionOpened,
            isBorderHidden,
        } = this.props;

        if (
            this.defaultFiat !== defaultFiat ||
            this.defaultCrypto !== defaultCrypto ||
            this.selectedCoin !== selectedCoin
        ) {
            this.destroyChart();
            this.defaultFiat = defaultFiat;
            this.selectedCoin = selectedCoin;
            this.defaultCrypto = defaultCrypto;
        }

        return (
            <ChartWrapper isLowerSectionOpened={isLowerSectionOpened} isBorderHidden={isBorderHidden}>
                <canvas ref={el => (this.el = el)} />
                {this.getPortfolioInfo()}
            </ChartWrapper>
        );
    }
}

export default inject(STORE_KEYS.PORTFOLIODATASTORE, STORE_KEYS.YOURACCOUNTSTORE, STORE_KEYS.SETTINGSSTORE, STORE_KEYS.ORDERHISTORY)(
    observer(PortfolioChartCanvas)
);
