import React from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';

import CoinPairSearchContainerV2 from '../components/CoinPairSearchV2';
import GraphTool from '../components/GraphTool';
import Report from '../components/Report';
import { STORE_KEYS } from '../stores';

const StyledRightTopSectionGrid = styled.div`
    grid-area: righttopsection;
`;

const GraphGrid = styled.div`
    height: 100%;
    display: grid;
    grid-template-rows: 60px calc(100% - 72px);
    grid-gap: 12px;
    grid-template-areas: 
    "search"
    "chart";
`;

const SearchBarGridArea = styled.div`
    grid-area: search;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    min-width: 0;
`;

const ChartGridArea = styled.div`
    grid-area: chart;
    position: relative;
`;

class RightTopSectionGrid extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isExchBarOpen: false,
        };
    }

    componentWillUnmount() {
        if (this.exchBarTimer) clearTimeout(this.exchBarTimer);
    }

    openExchBar = value => {
        if (!this.state.isExchBarOpen && value) {
            clearTimeout(this.exchBarTimer);
            this.exchBarTimer = setTimeout(() => {
                this.setState({
                    isExchBarOpen: value,
                });
            }, 800);
        } else {
            clearTimeout(this.exchBarTimer);
            this.setState({
                isExchBarOpen: value,
            });
        }
    };

    render() {
        const { isReportMode } = this.props[STORE_KEYS.VIEWMODESTORE];

        return (
            <StyledRightTopSectionGrid id="right-top">
                <GraphGrid>
                    <SearchBarGridArea>
                        <CoinPairSearchContainerV2 openExchBar={this.openExchBar}/>
                    </SearchBarGridArea>

                    <ChartGridArea id="graph">
                        {
                            isReportMode ? <Report/> : <GraphTool/>
                        }
                        <Report/>
                        {/* <GraphTool/> */}
                    </ChartGridArea>
                </GraphGrid>
            </StyledRightTopSectionGrid>
        );
    }
}

export default inject(
    STORE_KEYS.VIEWMODESTORE,
)(observer(RightTopSectionGrid));