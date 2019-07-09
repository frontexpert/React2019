import React from 'react';
import { AutoSizer } from 'react-virtualized';
import styled from 'styled-components';
import { compose } from 'recompose';

import OrderBook from '../OrderBook';
import { withOrderFormToggleData } from '../../hocs/OrderFormToggleData';
import { orderFormToggleKeys } from '../../stores/OrderFormToggle';
import LeftLowerSectionGrid from '../../grid/LeftLowerSectionGrid';
// import MattriotSwitch from '../MattriotSwitch';
// import TopSwitch from '../TopSwitch';
// import SideHeader from '../SideHeader';
// import AvatarImage from '../SideHeader/AvatarImage';
// import UserAvatarComponent from '../SideHeader/UserAvatarComponent';
// import WorldBookIconComponent from '../SideHeader/WorldBookIconComponent';
import WalletHeader from '../PayApp/PayWindow/Header';
// import { Wrapper } from '../PayApp/PayWindow/Components';
import DataLoader from '../../components-generic/DataLoader';
import UserAvatarPopupMenu from '../SideHeader/UserAvatarPopupMenu';
import { STATE_KEYS } from '../../stores/ConvertStore';

const AdvancedDropdownGrid = styled.div`
    position: relative;
    height: ${props => props.height}px;
    display: grid;
    grid-template-areas: 
        'walletheader'
        'ordercontent'
        ${props => !props.open ? "'leftlowersection'" : ''};
    grid-template-rows: 60px auto ${props => !props.open ? '263px' : ''};
    grid-template-columns: 100%;
    grid-gap: 12px;
    .order-book-side-wrapper {
        height: ${props => props.height}px;
    }
`;

const OrderBookHeaderWrapper = styled.div`
    grid-area: orderheader;
    display: flex;
    border: 1px solid ${props => props.theme.palette.orderBookHeaderBorder};
    border-bottom: 0;
    border-radius: ${props => props.theme.palette.borderRadius} ${props => props.theme.palette.borderRadius} 0 0;
    overflow: hidden;
`;

const OrderBookHeader = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0;
    padding: 4px 15px;
    min-height: 60px;
    background: ${props => props.theme.palette.orderBookHeaderBg};
    color: ${props => props.theme.palette.orderBookHeaderText};
    font-weight: 600;
    font-size: 18px;
    
    span:last-child {
        font-size: 13px;
        font-weight: normal;
        color: ${props => props.theme.palette.orderBookHeaderText2};
    }
`;

const OrderBookWrapper = styled.div.attrs({ className: 'order-book-wrapper' })`
    margin-top: 12px;
    height: calc(100% - 72px);
    position: relative;
    grid-area: ordercontent;
    // padding-top: 14px;
    background: ${props => props.theme.palette.orderBookTableCellBg};
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

const Svg = styled.svg`
    fill: ${props => props.theme.palette.orderBookAddonFill};
    width: 10px;
    height: 14px;
    // margin-top: ${props => props.open ? 0 : '-5px'};
`;

const TriangleClosedIcon = props => (
    <Svg viewBox="0 0 15 8.9" {...props}>
        <g>
            <path
                d="M7.5 8.9L.3 1.7C-.1 1.3-.1.7.3.3s1-.4 1.4 0l5.8 5.8L13.3.3c.4-.4 1-.4 1.4 0s.4 1 0 1.4L7.5 8.9z"
            />
        </g>
    </Svg>
);

const TriangleOpenedIcon = props => (
    <Svg viewBox="0 0 284.929 284.929" {...props}>
        <path
            d="M282.082 195.285L149.028 62.24c-1.901-1.903-4.088-2.856-6.562-2.856s-4.665.953-6.567 2.856L2.856 195.285C.95 197.191 0 199.378 0 201.853c0 2.474.953 4.664 2.856 6.566l14.272 14.271c1.903 1.903 4.093 2.854 6.567 2.854s4.664-.951 6.567-2.854l112.204-112.202 112.208 112.209c1.902 1.903 4.093 2.848 6.563 2.848 2.478 0 4.668-.951 6.57-2.848l14.274-14.277c1.902-1.902 2.847-4.093 2.847-6.566.001-2.476-.944-4.666-2.846-6.569z"
        />
    </Svg>
);

class DropdownsGridAreaContainer extends React.Component {
    state = {
        isArbOpen: true,
        isLogoutModalOpen: false,
    };
    wrapperRef = null;

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside = (event) => {
        const { isUserDropDownOpen } = this.props;
        const { isLogoutModalOpen } = this.state;
        if (isUserDropDownOpen && this.wrapperRef && this.wrapperRef.contains
            && !this.wrapperRef.contains(event.target) && !isLogoutModalOpen) {
            this.toggleDropDown();
        }
    };

    toggleLogoutModal = (isLogoutModalOpen) => {
        this.setState(prevState => ({
            isLogoutModalOpen: (typeof isLogoutModalOpen === 'boolean') ? isLogoutModalOpen : !prevState.isLogoutModalOpen,
        }));
    };

    toggleDropDown = () => {
        const {
            // isArbitrageMode,
            // convertState,
            isUserDropDownOpen,
            setUserDropDownOpen,
        } = this.props;
        /*
        const { isArbOpen } = this.state;

        if (isArbitrageMode && convertState !== STATE_KEYS.coinSearch) {
            this.setState({
                isArbOpen: !isArbOpen,
            });
        } else {
            setUserDropDownOpen(!isUserDropDownOpen);
        }
        */
        setUserDropDownOpen(!isUserDropDownOpen);
    };

    render() {
        const {
            toggleMode,
            toggleViewMode,
            selectedBase,
            selectedQuote,
            baseFromInstrument,
            quoteFromInstrument,
            isRegularMarket,
            isUserDropDownOpen,
            isArbCondition,
            isProfileLogoExists,
            logoURL,
            setLoginBtnLocation,
            setUserDropDownOpen,
            isArbitrageMode,
            convertState,
            isLoggedIn,
        } = this.props;
        const { isLogoutModalOpen } = this.state;
        /*
        if (isArbitrageMode && convertState !== STATE_KEYS.coinSearch) {
            this.setState({
                isArbOpen: !isArbOpen,
            });
        }
        */
        const open = toggleMode === orderFormToggleKeys.offToggleKey;
        const isArbitrageMonitorMode = isArbitrageMode && (convertState !== STATE_KEYS.coinSearch);
        return (
            <AutoSizer>
                {({ width, height }) => {
                    return (
                        <AdvancedDropdownGrid open={open} height={height} innerRef={ref => this.wrapperRef = ref}>
                            {/*
                            <OrderBookHeaderWrapper>
                                <WorldBookIconComponent hide={true}/>
                                <OrderBookHeader>
                                    <span>Order Book (Global)</span>
                                    <span>{selectedBase + ' / ' + selectedQuote} {!isRegularMarket ? '(Buy: ' + quoteFromInstrument + ')' : ''}</span>
                                </OrderBookHeader>
                            </OrderBookHeaderWrapper>
                            */}

                            {/* <SideHeader isWorldBook={false}/> */}
                            {isArbitrageMonitorMode &&
                                <WalletHeader
                                    isOrderbook
                                    isSeparate
                                    width={width}
                                    height={!open ? (height - 277) : height}
                                />
                            }
                            {(isUserDropDownOpen || isArbitrageMonitorMode) ?
                                <UserAvatarPopupMenu
                                    isLoggedIn={isLoggedIn}
                                    isProfileLogoExists={isProfileLogoExists}
                                    logoURL={logoURL}
                                    setLoginBtnLocation={setLoginBtnLocation}
                                    onClose={this.toggleDropDown}
                                    isArbitrageMonitorMode={isArbitrageMonitorMode}
                                    isLogoutModalOpen={isLogoutModalOpen}
                                    toggleLogoutModal={this.toggleLogoutModal}
                                /> :
                                <div className="order-book-side-wrapper">
                                    <WalletHeader
                                        isOrderbook
                                        isSeparate
                                        width={width}
                                        height={!open ? (height - 277) : height}
                                    />
                                    <OrderBookWrapper open={open}>
                                        {(selectedBase && selectedQuote) ? (
                                            <OrderBook wrapperWidth={width} wrapperHeight={!open ? (height - 277) : height}/>
                                        ) : (
                                            <DataLoader width={100} height={100}/>
                                        )}
                                        {!open &&
                                        <ToggleBtn
                                            onClick={() => {
                                                toggleViewMode();
                                            }}
                                            open={open}
                                        >
                                            {open ? <TriangleOpenedIcon open={open}/> : <TriangleClosedIcon open={open}/>}
                                        </ToggleBtn>
                                        }
                                    </OrderBookWrapper>
                                    {!open && <LeftLowerSectionGrid/>}
                                </div>
                            }
                        </AdvancedDropdownGrid>
                    );
                }}
            </AutoSizer>
        );
    }
}

export default compose(
    withOrderFormToggleData,
)(DropdownsGridAreaContainer);
