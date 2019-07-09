import React, { Fragment } from 'react';
import { AutoSizer } from 'react-virtualized';
import styled from 'styled-components/macro';
import { withOrderFormToggleData } from '@/hocs/OrderFormToggleData';
import { orderFormToggleKeys } from '@/stores/MarketMaker';
import LeftLowerSectionGrid from '@/grid/LeftLowerSectionGrid';
import WalletHeader from '@/components/WalletHeader';
import OrderBook from '@/components/OrderBook';
import DataLoader from '@/components-generic/DataLoader';
import { STATE_KEYS } from '@/stores/ConvertStore';
import { getScreenInfo } from '@/utils';

const AdvancedDropdownGrid = styled.div`
    position: relative;
    height: ${props => props.height}px;
    display: grid;
    grid-template-areas:
        ${props => (props.isUserDropDownOpen || props.isArbitrageMonitorMode || !props.isLoggedIn) ? "'walletheader'" : ''}
        'ordercontent'
        ${props => !props.open ? "'leftlowersection'" : ''};
    grid-template-rows: ${props => (props.isUserDropDownOpen || props.isArbitrageMonitorMode || !props.isLoggedIn) ? '60px' : ''} auto ${props => !props.open ? props.lowerSectionHeight + 'px' : ''};
    grid-template-columns: 100%;
    grid-gap: 12px;
`;

const OrderBookWrapper = styled.div.attrs({ className: 'order-book-wrapper' })`
    position: relative;
    grid-area: ordercontent;
    // padding-top: 14px;
    background: ${props => props.theme.palette.clrChartBackground};
    border: 1px solid ${props => props.theme.palette.orderBookHeaderBorder};
    // border-top: none;
    // border-radius: 0 0 ${props => props.theme.palette.borderRadius} ${props => props.theme.palette.borderRadius};
    border-radius: ${props => `${props.theme.palette.borderRadius}`};
    overflow: hidden;
    // margin-bottom: ${props => !props.open ? '12px' : '0'};
    
    .wallet-header {
        border-top: 0 !important;
        border-left: 0 !important;
        border-right: 0 !important;
    }
`;

const ToggleBtn = styled.div.attrs({ className: 'order-form-toggle-btn' })`
    position: absolute;
    bottom: 0; // ${props => props.open ? '0px' : '-14px'};
    left: 0;
    display: flex; // ${props => props.open ? 'flex' : 'none'};
    align-items: center;
    justify-content: center;
    border-top: 1px solid ${props => props.theme.palette.orderBookAddonBorder};
    border-radius: 0 0 ${props => props.theme.palette.borderRadius} ${props => props.theme.palette.borderRadius};
    padding: 0 5px;
    width: 100%;
    height: 15px;
    background-color: ${props => props.theme.palette.orderBookAddonBg};
    
    svg {
        &, & * {
            fill: ${props => props.theme.palette.orderBookAddonFill};
        }
    }
    
    &:hover {
        cursor: pointer;
        
        svg {
            &, & * {
                fill: ${props => props.theme.palette.orderBookAddonHoverFill} !important;
            }
        }
    }
`;

const ScanContainer = styled.div.attrs({ className: 'scan-container' })`
    position: absolute;
    z-index: 1000;
    left: calc(50% - 20px);
    width: 40px;
    bottom: -10px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: space-around;

    .on {
        background-color: #fff8;
    }
    .off {
        background-color: #fff4;
    }
`;

const ScanIcon = styled.div.attrs({ className: 'scan-icon' })`
    width: 10px;
    height: 10px;
    border-radius: 50%;
`;

const IS_MOBILE = getScreenInfo().isMobileDevice;

class DropdownsGridAreaContainer extends React.Component {
    render() {
        const {
            toggleMode,
            selectedBase,
            selectedQuote,
            isMobileDevice,
            isUserDropDownOpen,
            isLoggedIn,
        } = this.props;
        const open = toggleMode === orderFormToggleKeys.offToggleKey;

        const {
            isArbitrageMode,
            tradeColStatus,
            convertState,
        } = this.props;
        const isArbitrageMonitorMode = isArbitrageMode && (convertState !== STATE_KEYS.coinSearch);
        const showOrderForm = !isArbitrageMonitorMode && !open;

        return (
            <AutoSizer>
                {({ width, height }) => {
                    // Todo: This needs to be exported and shared thorugh the app.
                    let lowerSectionHeight = 263;
                    if (IS_MOBILE) {
                        lowerSectionHeight = Math.round(height / 3);
                    }
                    return (
                        <AdvancedDropdownGrid
                            open={open}
                            height={height}
                            isMobileDevice={isMobileDevice}
                            lowerSectionHeight={lowerSectionHeight}
                            isUserDropDownOpen={isUserDropDownOpen}
                            isLoggedIn={isLoggedIn}
                        >
                            <WalletHeader
                                isOrderbook
                                isSeparate
                                width={width}
                                height={!open ? (height - 277) : height}
                            />

                            {(!isArbitrageMonitorMode || (isArbitrageMonitorMode && tradeColStatus === 'open')) &&
                            <OrderBookWrapper open={open} isMobileDevice={isMobileDevice}>
                                {(selectedBase && selectedQuote) ? (
                                    <OrderBook wrapperWidth={width} wrapperHeight={!open ? (height - 277) : height} openOrderBook={open}/>
                                ) : (
                                    <DataLoader width={100} height={100}/>
                                )}
                            </OrderBookWrapper>
                            }

                            {showOrderForm && !isUserDropDownOpen && <LeftLowerSectionGrid/>}
                            {isMobileDevice &&
                                <ScanContainer>
                                    {convertState === STATE_KEYS.coinSearch &&
                                        <Fragment>
                                            <ScanIcon className="off" />
                                            <ScanIcon className="on" />
                                            <ScanIcon className="off" />
                                        </Fragment>
                                    }
                                </ScanContainer>
                            }
                        </AdvancedDropdownGrid>
                    );
                }}
            </AutoSizer>
        );
    }
}

export default withOrderFormToggleData()(DropdownsGridAreaContainer);
