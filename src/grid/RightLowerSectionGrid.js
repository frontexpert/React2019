import React from 'react';
import styled from 'styled-components';
import YourAccount from 'Components/YourAccount';
import PieChart from 'Components/YourAccount/PieChart';
import Select from 'ComponentsGeneric/Select';
import OrderHistory from 'Components/OrderHistory';
import SplineAreaChartHighCharts from 'Components/YourPortfolio/SplineAreaChartHighCharts';
import OpenOrders from 'Components/OpenOrders';
import {withClientOrderData} from "../hocs/ClientOrderData";
import {withYourAccountData} from "../hocs/YourAccountData";
import {DepthChart} from 'Components/DepthChart';
import {compose} from "recompose";
import TradesHistory from '../components/TradesHistory';

const StyledRightLowerSectionGrid = styled.div`
    grid-area: rightlowersection;
    background: ${props => props.theme.palette.backgroundHighContrast};
    outline: 1px solid ${props => props.theme.palette.clrseparatorD};
`;

const ChartGridArea = styled.div`
    grid-area: chart;
`;

const DataGridArea = styled.div`
    grid-area: data;
`;

/* hacky; subtract out material select height */
const StyledPortfolioGrid = styled.div`
    display: grid;
    grid-template-columns: 300px auto;
    grid-template-areas:
        "chart data data";
    min-height: calc(100% - 36px);
`;

const StyledSelect = styled(Select)`
    text-align: right; 
    color: ${props => props.theme.palette.clrtextD};
`;

const RightLowerSectionGridContainer = ({openOrders, onCancelFactory, portfolioData, portfolioPieChartTitle, portfolioPieChartData}) => {
    return (
        <StyledRightLowerSectionGrid id="rightLowerSectionGrid">
            <StyledSelect options={['Your Portfolio', 'Your Wallet', "Open Orders", 'Order History', 'Trades History', 'Global Liquidity']} data-testid='rightlowersectiongrid'>
                <SplineAreaChartHighCharts/>
                <StyledPortfolioGrid>
                    <ChartGridArea>
                        <PieChart title={portfolioPieChartTitle} data={portfolioPieChartData}/>
                    </ChartGridArea>
                    <DataGridArea>
                        <YourAccount portfolioData={portfolioData}/>
                    </DataGridArea>
                </StyledPortfolioGrid>
                <OpenOrders openOrders={openOrders} onCancelFactory={onCancelFactory}/>
                <OrderHistory />
                <TradesHistory />
                <DepthChart/>
            </StyledSelect>
        </StyledRightLowerSectionGrid>
    )
};

export const RightLowerSectionGrid = compose(
    withClientOrderData,
    withYourAccountData
)(RightLowerSectionGridContainer);
