import React from 'react';
import styled from 'styled-components';
import CoinPairSearchContainer from 'Components/CoinPairSearch';
import TradingGraph from 'Components/TradingGraph';
import ExchangeSideBar from 'Components/TradingGraph/ExchangeSideBar';

const StyledRightTopSectionGrid = styled.div`
    grid-area: righttopsection;
    outline: 1px solid ${props => props.theme.palette.clrseparatorD};
`;

const GraphGrid = styled.div`
    display: grid;
    grid-template-columns: calc(100% - 165px) 165px;
    grid-template-rows: 75px calc(70vh - 75px);
    grid-template-areas: 
    "search search"
    "chart exchangedropdown";
`;

const SearchBarGridArea = styled.div`
    grid-area: search;
    min-width: 0;
`;

const ChartGridArea = styled.div`
    grid-area: chart;
`;

const ExchangeDropdownGridArea = styled.div`
    grid-area: exchangedropdown;
`;

const RightTopSectionGrid = ({themeType}) => {
    return (
        <StyledRightTopSectionGrid>
            <GraphGrid>
                <SearchBarGridArea>
                    <CoinPairSearchContainer />
                </SearchBarGridArea>
                <ChartGridArea>
                    <TradingGraph themeType={themeType} />
                </ChartGridArea>
                <ExchangeDropdownGridArea className="exchangedropdown">
                    <ExchangeSideBar />
                </ExchangeDropdownGridArea>
            </GraphGrid>
        </StyledRightTopSectionGrid>
    )
};

export default RightTopSectionGrid;