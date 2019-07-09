import React from 'react';
import styled from 'styled-components';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import {withProps} from "recompose";
import {AutoSizer} from 'react-virtualized';
import {initConfig} from './ChartConfig';

const ChartContainer = styled.div`
    background: ${props => props.theme.palette.backgroundHighContrast};
    height: height;
    rect{
        fill: ${props => props.theme.palette.backgroundHighContrast};
    }
    text{
        fill: ${props => props.theme.palette.contrastText} !important;
    }
    .highcharts-tooltip-box{
        fill: ${props => props.theme.palette.backgroundHighContrast};
    }
`;

const PortfolioPieChart = ({title, data}) => {
    return (
        <AutoSizer>
            {({width, height}) => {
                return(
                    <ChartContainer height={height} width={width}>
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={initConfig(title, data, height, width)}
                        />
                    </ChartContainer>
                )
            }}
        </AutoSizer>
    )
};

export default PortfolioPieChart;