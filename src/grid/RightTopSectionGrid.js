import React from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';

import CoinPairSearchContainerV2 from '../components/CoinPairSearchV2';
import GraphTool from '../components/GraphTool';
import TradingViewAdv from '../components/GraphTool/TradingViewAdv';
import Report from '../components/Report';

import { STORE_KEYS } from '../stores';
import { STATE_KEYS } from '../stores/ConvertStore';

const StyledRightTopSectionGrid = styled.div`
    grid-area: righttopsection;
    margin-left: 12px;
    ${props => (props.isMobileDevice || props.isSmallWidth) ? 'display: none;' : 'flex: 1;'}
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
    background-color: ${props => props.theme.palette.clrChartBackground};
    // ${props => (props.full) ? 'margin-left: -72px;' : ''}
`;

const ChartGridArea = styled.div`
    grid-area: chart;
    position: relative;
    // ${props => (props.full) ? 'margin-left: -72px;' : ''}
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
        const { rightTopSectionGridMode } = this.props[STORE_KEYS.VIEWMODESTORE];
        const {
            [STORE_KEYS.SETTINGSSTORE]: {
                tradeColStatus,
                isArbitrageMode,
                sidebarStatus,
            },
            [STORE_KEYS.CONVERTSTORE]: { convertState },
        } = this.props;
        const {
            isMobileDevice,
            isSmallWidth,
        } = this.props;
        const isArbitrageMonitorMode = isArbitrageMode && (convertState !== STATE_KEYS.coinSearch);

        return (
            <StyledRightTopSectionGrid isMobileDevice={isMobileDevice} isSmallWidth={isSmallWidth} id="right-top">
                <GraphGrid>
                    <SearchBarGridArea full={(isArbitrageMonitorMode && tradeColStatus === 'closed') || sidebarStatus === 'closed'}>
                        <CoinPairSearchContainerV2 openExchBar={this.openExchBar}/>
                    </SearchBarGridArea>

                    <ChartGridArea id="graph" full={(isArbitrageMonitorMode && tradeColStatus === 'closed') || sidebarStatus === 'closed'}>
                        {
                            rightTopSectionGridMode === 'graph' && <GraphTool/>
                        }
                        {
                            rightTopSectionGridMode === 'report' && <Report/>
                        }
                        {
                            rightTopSectionGridMode === 'trading' && <TradingViewAdv/>
                        }
                    </ChartGridArea>
                </GraphGrid>
            </StyledRightTopSectionGrid>
        );
    }
}

export default inject(
    STORE_KEYS.VIEWMODESTORE,
    STORE_KEYS.SETTINGSSTORE,
    STORE_KEYS.CONVERTSTORE,
)(observer(RightTopSectionGrid));
