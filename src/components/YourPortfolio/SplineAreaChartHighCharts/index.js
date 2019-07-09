import React from 'react';
import styled from 'styled-components';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { inject, observer } from "mobx-react";
import { STORE_KEYS } from '../../../stores';
import { initConfig } from './ChartConfig';
import {AutoSizer} from 'react-virtualized';

const { THEME: STORE_KEY_THEME} = STORE_KEYS;

const ChartContainer = styled.div`
    height: height;
    position: relative;
    .highcharts-tooltip-box{
    fill: ${props => props.theme.palette.backgroundHighContrast};
    }
    rect{
        fill: ${props => props.theme.palette.backgroundHighContrast};
    }
    text{
        fill: ${props => props.theme.palette.contrastText} !important;
    }
`;

// right uses the width of the ChartContainer, applies a negative; 20px is an abatrary amt to make it look better
const PortfolioChartRange = styled.div`
    position: absolute;
    top: 20px;
    right: -${props => props.width -20}px;
    color: ${props => props.theme.palette.contrastText};

    span {
        padding: 3px 11px;
        display: inline-block;
        font-size: 14px;
        cursor: pointer;
    }

    .active {
        border-bottom: 3px solid #0576b9;
        font-weight: bold;
    }
`;

const PortfolioChartText = styled.div`
    color: ${props => props.theme.palette.contrastText};
    position: absolute;
    bottom: 50px;
    left: 30px;
    display: flex;

    div {
        display: inline-block;
        color: #0576b9;
        font-size: 2.2rem;
        border-right: 1px solid #a6a6a6;
        padding: 0 15px;
        text-align: center;

        span {
            font-size: 1.25rem;
            vertical-align: top;
            line-height: 1.9rem;
        }

        p {
            color: ${props => props.theme.palette.contrastText} !important;
            font-size: 1rem;
            color: black;
            margin-top: 0;
            margin-bottom: 0;
        }
    }

    div:last-child {
        border-right: 0;
    }
`;

const SplineAreaChartHighCharts = inject(STORE_KEY_THEME)(
    observer(
        ({
            [STORE_KEY_THEME]: { theme },
        }) => {
            const isGain = false;
            return (
                <AutoSizer>
                    {({width, height}) => {
                        return(
                            <ChartContainer height={height} width={width}>
                                <HighchartsReact
                                    highcharts={Highcharts}
                                    options={initConfig(theme, height, width, isGain)}
                                />
                                <PortfolioChartRange width={width}>
                                    <span>1H</span>
                                    <span>1D</span>
                                    <span>1W</span>
                                    <span>1M</span>
                                    <span>1Y</span>
                                    <span>ALL</span>
                                </PortfolioChartRange>
                                <PortfolioChartText>
                                    <div>
                                        <span>$</span>6,709
                                        <span>.93</span>
                                        <p>Portfolio value</p>
                                    </div>
                                    <div>
                                        <span>-$</span>709
                                        <span>.93</span>
                                        <p>Change since last month</p>
                                    </div>
                                </PortfolioChartText>
                            </ChartContainer>
                        )
                    }}
                </AutoSizer>
            )
        }
    )
);

export default SplineAreaChartHighCharts;