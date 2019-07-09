import React from 'react';
import styled from 'styled-components/macro';
import { inject, observer } from 'mobx-react';
import { withStyles } from '@material-ui/styles';
import { compose, withProps } from 'recompose';

import { STORE_KEYS } from '../stores';
import { viewModeKeys } from '../stores/ViewModeStore';
import { STATE_KEYS } from '../stores/ConvertStore';
import OrderBookRecentTradesContainer from '../components/OrderBookRecentTradesContainer';
import PayApp from '../components/CryptoApp';
import ForexApp from '../components/ForexApp';
import SettingsPanel from '../components/SettingsPanel';
import ExchangeCellsV2 from '../components/GraphTool/ExchangeCellsV2';
import CoinPairSearchV2 from '../components/CoinPairSearchV2';
import OrderHistoryTable from '../components/ArbitrageHistory';

const StyledLeftTopSectionGrid = styled.div`
    position: relative;
    ${props => ((props.isMobilePortrait) || props.isSmallWidth) ? 'width: calc(100% - 8px);' : 'max-width: 33%; width: 33%;'}
    margin-left: ${props => (props.isTrading || !props.isSidebar) && !props.isMobilePortrait ? '-33%' : '12px'};
    transition: margin .1s linear;
    border: ${props => (props.isForex && !props.isSidebarMenuOpen) && `1px solid ${props.theme.palette.clrMouseClick}`};

    & > div:first-child {
        ${props => props.isSidebarOpen
        ? `
            transition: 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
            margin-left: 37px !important;
            width: calc(100% - 37px);
        `
        : `
            transition: none !important;
            margin-left: 0 !important;
            width: 100% !important;
        `}
    }
`;

// need to get at paper within select
const styles = (theme) => {
    return {
        paper: {
            width: '160px',
            background: `${theme.appTheme.palette.backgroundHighContrast}`,
        },
    };
};

class LeftTopSectionGrid extends React.Component {
    componentDidMount() {
    }

    render() {
        const {
            viewMode, isSidebarOpen, isSettingsOpen, isPayApp, isPayAppLoading, isUserDropDownOpen,
            isArbitrageMode, tradeColStatus, sidebarStatus,
            isEmptyExchange,
            isOrderBookBreakDownStop, isOrderBookDataLoaded,
            convertState,
            isCoinTransfer, isMobileDevice, isMobilePortrait, isSmallWidth,
        } = this.props;

        const isArbitrageMonitorMode = isArbitrageMode && (convertState !== STATE_KEYS.coinSearch);

        let SelectedComponent = PayApp;
        if (isSettingsOpen) {
            SelectedComponent = SettingsPanel;
        } else if (viewMode === viewModeKeys.basicModeKey) {
            SelectedComponent = (isMobileDevice && isPayApp)
                ? PayApp
                : OrderBookRecentTradesContainer;
        } else if (viewMode === viewModeKeys.advancedModeKey) {
            SelectedComponent = (!isOrderBookBreakDownStop && isOrderBookDataLoaded && !isEmptyExchange)
                ? OrderBookRecentTradesContainer
                : ExchangeCellsV2;
        } else if (viewMode === viewModeKeys.settingsModeKey) {
            SelectedComponent = SettingsPanel;
        } else if (viewMode === viewModeKeys.exchangesModeKey) {
            SelectedComponent = ExchangeCellsV2;
        } else if (viewMode === viewModeKeys.forexModeKey) {
            SelectedComponent = ForexApp;
        }

        const isSidebarMenuOpen = (isUserDropDownOpen || (isArbitrageMonitorMode && tradeColStatus === 'open')) &&
            sidebarStatus === 'open';

        return (
            <StyledLeftTopSectionGrid
                id="left-sidebar"
                full={(isArbitrageMonitorMode && tradeColStatus === 'closed') || sidebarStatus === 'closed'}
                isSidebarOpen={isSidebarOpen}
                isMobilePortrait={isMobilePortrait}
                isSmallWidth={isSmallWidth}
                isForex={viewMode === viewModeKeys.forexModeKey}
                isTrading={isArbitrageMonitorMode && tradeColStatus === 'closed'}
                isSidebar={sidebarStatus === 'open'}
                isSidebarMenuOpen={isSidebarMenuOpen}
            >
                <SelectedComponent
                    isLeftTop
                    isMobileDevice={isMobileDevice}
                    isCoinTransfer={isCoinTransfer}
                    trId={isCoinTransfer ? this.props.trId : null}
                    firstLoad={isPayAppLoading}
                    isUserDropDownOpen={isUserDropDownOpen}
                    isArbitrageMonitorMode={isArbitrageMonitorMode}
                    isSidebarMenuOpen={isSidebarMenuOpen}
                />

                {isMobileDevice && !isArbitrageMonitorMode && (
                    <CoinPairSearchV2 isSimple={true} isHidden/>
                )}
            </StyledLeftTopSectionGrid>
        );
    }
}

const withStore = compose(
    inject(
        STORE_KEYS.VIEWMODESTORE,
        STORE_KEYS.LOWESTEXCHANGESTORE,
        STORE_KEYS.SETTINGSSTORE,
        STORE_KEYS.EXCHANGESSTORE,
        STORE_KEYS.ORDERBOOKBREAKDOWN,
        STORE_KEYS.CONVERTSTORE,
        STORE_KEYS.MARKETMAKER,
    ),
    observer,
    withProps(
        ({
            [STORE_KEYS.VIEWMODESTORE]: {
                viewMode, isSidebarOpen, isSettingsOpen, isPayApp, isPayAppLoading, isUserDropDownOpen,
            },
            [STORE_KEYS.SETTINGSSTORE]: {
                isArbitrageMode, tradeColStatus, sidebarStatus,
            },
            [STORE_KEYS.EXCHANGESSTORE]: { isEmptyExchange },
            [STORE_KEYS.ORDERBOOKBREAKDOWN]: { isOrderBookBreakDownStop, isOrderBookDataLoaded },
            [STORE_KEYS.CONVERTSTORE]: { convertState },
        }) => ({
            viewMode,
            isSidebarOpen,
            isSettingsOpen,
            isPayApp,
            isPayAppLoading,
            isArbitrageMode,
            tradeColStatus,
            sidebarStatus,
            isEmptyExchange,
            isOrderBookBreakDownStop,
            isOrderBookDataLoaded,
            convertState,
            isUserDropDownOpen,
        })
    )
);

export default withStyles(styles)(withStore(LeftTopSectionGrid));
