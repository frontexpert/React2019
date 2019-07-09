import React from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';

import DepthChart from '../components/DepthChart';
import DataLoader from '../components-generic/DataLoader';
import { STORE_KEYS } from '../stores';
import OrderHistoryAdv from '../components/OrderHistoryAdv';

const StyledRightLowerSectionGrid = styled.div`
    height: ${props => props.maximize ? 263 : 0}px;
    margin-top: ${props => props.maximize ? '12px' : '0'};
    // grid-area: rightlowersection;
    border-radius: ${props => props.theme.palette.borderRadius};
    border: 1px solid ${props => props.theme.palette.clrBorder};
    // overflow: hidden;

    position: absolute;
    width: 100%;
    bottom: 0;
    
    .highcharts-container {
        z-index: auto !important;
        overflow: visible !important;
    }
`;

class RightLowerSectionGrid extends React.Component {
    state = {};

    render() {
        const {
            [STORE_KEYS.VIEWMODESTORE]: viewModeStore,
            [STORE_KEYS.ORDERBOOK]: orderBookStore,
        } = this.props;

        const {
            showDepthChartMode,
            depthChartMode,
            orderHistoryMode,
            isAdvancedAPIMode,
        } = viewModeStore;

        const {
            isDGLoaded,
            isSymbolUpdated,
        } = orderBookStore;

        let showDepthChart = depthChartMode && isSymbolUpdated && isDGLoaded;

        return (
            <StyledRightLowerSectionGrid
                id="rightLowerSectionGrid"
                maximize={depthChartMode || isAdvancedAPIMode}
            >
                {depthChartMode && !showDepthChart &&
                    <DataLoader/>
                }

                {isAdvancedAPIMode ? (
                    <OrderHistoryAdv/>
                ) : (
                    <DepthChart
                        toggleViewMode={showDepthChartMode}
                        showDepthChart={showDepthChart}
                    />
                )}
            </StyledRightLowerSectionGrid>
        );
    }
}

export default inject(
    STORE_KEYS.VIEWMODESTORE,
    STORE_KEYS.ORDERBOOK,
)(observer(RightLowerSectionGrid));
