import React from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { AutoSizer } from 'react-virtualized';
import { STORE_KEYS } from '../../stores';

import DepthChartEnhanced from './DepthChartEnhanced';

const ChartContainer = styled.div`
    /* to account AdvancedSelect height and space of graph needs */
    position: absolute;
    z-index: 100;
    width: fit-content;
    height: ${props => props.height}px;
    border-radius: ${props => props.theme.palette.borderRadius};
    // transform: translate(0, ${props => props.showDepthChart ? '-100%' : '0'});
    transform: translate(0, ${props => props.showDepthChart ? '0' : '100%'});
    // transition: transform 0.2s ease-in-out, border 0.2s ease-in-out;
    transform-origin: top left;
    @media(max-width: 1500px) {
        transform: translate(0, ${props => props.showDepthChart ? '0' : '100%'}) scale(${1 / 0.75});
    }
    @media(max-width: 1080px) {
        transform: translate(0, ${props => props.showDepthChart ? '0' : '100%'}) scale(${1 / 0.65});
    }
    @media(max-width: 940px) {
        transform: translate(0, ${props => props.showDepthChart ? '0' : '100%'}) scale(${1 / 0.55});
    }

    .highcharts-plot-background {
        fill: ${props => props.theme.palette.clrBackground};
    }
    
    text {
        fill: ${props => props.theme.palette.contrastText} !important;
    }
`;

const DepthChart = props => {
    const {
        [STORE_KEYS.ORDERBOOK]: {
            orderBookCoinPair: [baseCur, quoteCur],
            depthChartData,
            updateSpread,
        },
        [STORE_KEYS.EXCHANGESSTORE]: {
            selectedExchange,
            exchanges,
            getActiveExchanges,
        },
        [STORE_KEYS.VIEWMODESTORE]: theme,
        showDepthChart,
    } = props;
    return (
        <AutoSizer>
            {({ width, height }) => {
                let scale = 1;
                const w = window.innerWidth;
                if (w < 940) scale = 0.55;
                else if (w < 1080) scale = 0.65;
                else if (w < 1500) scale = 0.75;

                return (
                    <ChartContainer height={height * scale} width={width * scale - 1} showDepthChart={showDepthChart}>
                        <DepthChartEnhanced
                            height={height * scale - 2}
                            width={width * scale - 2}
                            showDepthChart={showDepthChart}
                            baseCur={baseCur}
                            quoteCur={quoteCur}
                            depthChartData={depthChartData}
                            updateSpread={updateSpread}
                            selectedExchange={selectedExchange}
                            exchanges={exchanges}
                            getActiveExchanges={getActiveExchanges}
                            theme={theme.theme}
                        />
                    </ChartContainer>
                );
            }}
        </AutoSizer>
    );
};

export default inject(
    STORE_KEYS.VIEWMODESTORE,
    STORE_KEYS.ORDERBOOK,
    STORE_KEYS.EXCHANGESSTORE,
)(observer(DepthChart));