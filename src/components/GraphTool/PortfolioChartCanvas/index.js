import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import moment from 'moment';
import min from 'lodash.min';
import { FormattedMessage } from 'react-intl';

import LineChart from '../../../lib/lineChart';
import { STORE_KEYS } from '../../../stores';
import { MAX_PRICES_LENGTH } from '../../../stores/PriceChartStore';
import PortfolioValue from '../YourPortfolio/SplineAreaChartHighCharts/PortfolioValue';
import CurrencyDropdownWithSymbol from '../../../components-generic/CurrencyDropdown/CurrencyDropdownWithSymbol';
import { unifyDigitString } from '../../../utils';

import {
    ChartWrapper, PortfolioLabels, TotalPrice, PriceLabel, BackTesting, OneDayProfitStyled
} from './styles';

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
                oneDayProfit,
                lastPortfolioValue,
                lastPortfolioValueChange,
                isActiveState,
            },
        } = this.props;

        const oneDayProfitStr = unifyDigitString(oneDayProfit);

        return (
            <PortfolioLabels>
                <TotalPrice>
                    <PriceLabel>
                        <FormattedMessage id="graph_tool.your_portfolio.label_portfolio" defaultMessage="Portfolio" />
                    </PriceLabel>

                    <PortfolioValue
                        lastPortfolioValue={lastPortfolioValue}
                        lastPortfolioValueChange={lastPortfolioValueChange}
                        isActiveState={isActiveState}
                    />
                </TotalPrice>

                {oneDayProfit > 0 && oneDayProfitStr.length < 12 && (
                    <BackTesting>
                        (
                        <FormattedMessage
                            id="graph_tool.your_portfolio.label_backtesting"
                            defaultMessage="Backtesting"
                        />
                        :
                        <OneDayProfitStyled>{oneDayProfitStr}</OneDayProfitStyled>
                        <FormattedMessage
                            id="graph_tool.your_portfolio.label_desc"
                            defaultMessage="/day. Capped at 365%/year"
                        />
                        )
                    </BackTesting>
                )}
            </PortfolioLabels>
        );
    };

    handleNewData = () => {
        const {
            [STORE_KEYS.PORTFOLIODATASTORE]: { portfolioData },
        } = this.props;

        if ((this.prevDataLength && !portfolioData.length) || (!this.prevDataLength && portfolioData.length)) {
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
                .add(120, 'seconds')
                .valueOf();
            if (portfolioData.length) {
                data = this.patchPriceData(portfolioData);
                startTime = min(portfolioData.map(item => item[0]));
                endTime = now + Math.min(Math.round((now - startTime) / 2), 120000);
                if (endTime - startTime < 120000) {
                    endTime = startTime + 120000;
                }
            }

            this.chart = new LineChart({
                el: this.el,
                maxDataLength: MAX_PRICES_LENGTH,
                data,
                config: {
                    yAxesOffset: true,
                    steppedLine: true,
                    startTime,
                    endTime,
                    minRangeForZoom: startTime,
                    timeLimitWhenShift: (endTime - startTime) * 0.1,
                },
            });

            // make the chart dynamic
            this.drawDummyLine();
        }

        this.prevDataLength = portfolioData.length;
    };

    destroyChart = () => {
        this.chartInitialized = false;
        clearTimeout(this.drawDummyLineTimer);
        clearTimeout(this.nextPriceTimer);
        if (this.chart) {
            this.chart.destroy();
        }
    };

    patchPriceData = priceData => priceData.map(item => ({ x: item[0], y: item[1] }));

    updateChart = forcedItem => {
        const timeSinceLastDraw = Date.now() - (this.dummyLineDrawnAt || 0);
        let timeoutBeforeNextDraw = Math.max(DUMMY_LINE_TIMEOUT - timeSinceLastDraw, 0);

        let nextItem = forcedItem;
        if (!forcedItem) {
            const {
                [STORE_KEYS.PORTFOLIODATASTORE]: { portfolioData },
            } = this.props;

            if (!portfolioData.length) {
                return;
            }

            const nextItemArray = portfolioData[portfolioData.length - 1];
            nextItem = { x: nextItemArray[0], y: nextItemArray[1] };

            clearTimeout(this.drawDummyLineTimer);
            this.drawDummyLineTimer = setTimeout(this.drawDummyLine, DUMMY_LINE_TIMEOUT);
        }

        this.nextPriceTimer = setTimeout(() => {
            this.chart.lineTo(nextItem);
        }, timeoutBeforeNextDraw);
    };

    drawDummyLine = () => {
        const {
            [STORE_KEYS.PORTFOLIODATASTORE]: { portfolioData },
        } = this.props;

        const lastPrice = portfolioData.length ? portfolioData[portfolioData.length - 1][1] : 0;
        const dateNow = Date.now();

        this.updateChart({ x: dateNow, y: lastPrice });

        this.dummyLineDrawnAt = dateNow;
        this.drawDummyLineTimer = setTimeout(this.drawDummyLine, DUMMY_LINE_TIMEOUT);
    };

    render() {
        const {
            [STORE_KEYS.PORTFOLIODATASTORE]: { portfolioData },
            [STORE_KEYS.YOURACCOUNTSTORE]: { selectedCoin },
            [STORE_KEYS.SETTINGSSTORE]: { defaultFiat, defaultCrypto },
            isLowerSectionOpened,
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
            <ChartWrapper isLowerSectionOpened={isLowerSectionOpened}>
                <canvas ref={el => (this.el = el)} />
                {this.getPortfolioInfo()}
            </ChartWrapper>
        );
    }
}

export default inject(STORE_KEYS.PORTFOLIODATASTORE, STORE_KEYS.YOURACCOUNTSTORE, STORE_KEYS.SETTINGSSTORE)(
    observer(PortfolioChartCanvas)
);
