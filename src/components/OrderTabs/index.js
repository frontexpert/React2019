import React, { Component, Fragment } from 'react';
import { compose, withProps } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import { inject, observer } from 'mobx-react';

import { STORE_KEYS } from '../../stores';
// import { MarketIcon, MarketHistoryIcon } from './icons';
import {
    // ToggleBtn,
    FormHeader,
    Label,
    GlobalIcon,
    Logo,
    // TabsWrapper,
    // Tabs,
    // Tab,
    // MarketStatusItem,
    DropdownWrapper,
    SelectedItem,
    ArrowIcon,
    Dropdown,
    Item
} from './Components';

const styles = (theme) => {
    return {
        tabsRoot: {
            minHeight: '42px',
            borderBottom: `1px solid ${theme.appTheme.palette.clrseparatorD}`,
        },
        tabsIndicator: {
            backgroundColor: `${theme.appTheme.palette.orderFormHeaderTabActiveBorder}`,
            height: '3px',
        },
    };
};

class OrderTabs extends Component {
    state = {
        tabIndex: 1,
        isOpened: false,
    };

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside = (event) => {
        if (this.state.isOpened && this.wrapperRef && this.wrapperRef.contains && !this.wrapperRef.contains(event.target)) {
            this.setState({
                isOpened: false,
            });
        }
    };

    handleTabChange = (tabIndex, tab) => {
        this.setState({
            tabIndex,
            isOpened: false,
        });
        if (tab === 'API') {
            this.props.setAdvancedAPIMode(true);
        } else {
            this.props.setAdvancedAPIMode(false);
        }
    };

    toggleDropdown = () => {
        this.setState(prevState => ({
            isOpened: !prevState.isOpened,
        }));
    };

    render() {
        const { tabIndex, isOpened } = this.state;
        const {
            toggleViewMode, depthChartMode, showDepthChartMode, toggleOrderHistoryMode, classes, children,
            selectedExchange, exchanges, marketExchanges, getActiveExchanges, orderHistoryMode, tabs, handleTabChange, baseSymbol, quoteSymbol,
        } = this.props;

        let selectedTableItem = null;
        let activeExchanges = 0;
        let activeExchange = '';
        for (let i = 0; i < marketExchanges.length; i++) {
            if (marketExchanges[i].name !== 'Global' && exchanges[marketExchanges[i].name] && exchanges[marketExchanges[i].name].active) {
                activeExchanges++;
                activeExchange = marketExchanges[i].name;
                selectedTableItem = marketExchanges[i];
            }
        }
        const activeMarketExchanges = marketExchanges.filter(m => m.status === 'active');
        const countExchange = (activeExchanges === 0) ? activeMarketExchanges.length : activeExchanges;
        if (this.props.value === 'Global' && activeExchanges === 0 && activeMarketExchanges.length === 1) {
            for (let i = 0; i < marketExchanges.length; i++) {
                if (marketExchanges[i].name !== 'Global' && marketExchanges[i].status === 'active') {
                    selectedTableItem = marketExchanges[i];
                }
            }
        }

        const selectedIcon = (selectedTableItem && selectedTableItem.icon) || null;
        const selectedName = (selectedTableItem && selectedTableItem.name) || null;

        return (
            <Fragment>
                {/* <ToggleBtn onClick={toggleViewMode}> */}
                {/* <svg viewBox="0 0 15 8.9"> */}
                {/* <g> */}
                {/* <path */}
                {/* d="M7.5 8.9L.3 1.7C-.1 1.3-.1.7.3.3s1-.4 1.4 0l5.8 5.8L13.3.3c.4-.4 1-.4 1.4 0s.4 1 0 1.4L7.5 8.9z" */}
                {/* /> */}
                {/* </g> */}
                {/* </svg> */}
                {/* </ToggleBtn> */}

                <FormHeader id="form-header">
                    {/* <Label id="form-label">Order Form</Label> */}
                    <Label id="form-label">
                        {countExchange !== 1 ? (
                            <GlobalIcon />
                        ) : (
                            <Logo src={`/img/exchange/${selectedIcon}`} alt="" />
                        )}
                        {getActiveExchanges(exchanges)}
                        <span>{`(${baseSymbol}/${quoteSymbol})`}</span>
                    </Label>

                    {/*
                    <TabsWrapper id="tabs-wrapper">
                        <Tabs
                            id="tabs"
                            value={tabIndex}
                            onChange={handleTabChange}
                            classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
                        >
                            {tabs && tabs.map((tab, idx) => (
                                <Tab key={idx} label={tab}/>
                            ))}
                        </Tabs>
                    </TabsWrapper>
                    */}

                    <DropdownWrapper innerRef={ref => { this.wrapperRef = ref; }}>
                        <SelectedItem onClick={this.toggleDropdown}>
                            <span>{tabs[tabIndex]}</span>
                            <ArrowIcon open={isOpened} />
                        </SelectedItem>

                        {isOpened && (
                            <Dropdown>
                                {tabs.map((tab, index) => (
                                    <Item
                                        key={index}
                                        active={tabIndex === index}
                                        onClick={() => this.handleTabChange(index, tab)}
                                    >
                                        {tab}
                                    </Item>
                                ))}
                            </Dropdown>
                        )}
                    </DropdownWrapper>

                    {/*
                    <MarketStatusItem
                        current={orderHistoryMode ? false : depthChartMode}
                        onClick={() => {
                            if (depthChartMode && orderHistoryMode) {
                                toggleOrderHistoryMode(!orderHistoryMode);
                            } else if (!depthChartMode && orderHistoryMode) {
                                toggleOrderHistoryMode(!orderHistoryMode);
                                showDepthChartMode(!depthChartMode);
                            } else {
                                showDepthChartMode(!depthChartMode);
                            }
                        }}
                    >
                        <MarketIcon />
                    </MarketStatusItem>

                    <MarketStatusItem
                        current={orderHistoryMode}
                        onClick={() => {
                            toggleOrderHistoryMode(!orderHistoryMode);
                        }}
                    >
                        <MarketHistoryIcon/>
                    </MarketStatusItem>
                    */}
                </FormHeader>
                {children[tabIndex] || <div/>}
            </Fragment>
        );
    }
}

export default compose(
    inject(
        STORE_KEYS.ORDERFORMTOGGLE,
        STORE_KEYS.VIEWMODESTORE,
        STORE_KEYS.INSTRUMENTS,
        STORE_KEYS.ORDERBOOKBREAKDOWN,
        STORE_KEYS.EXCHANGESSTORE,
    ),
    observer,
    withProps(
        ({
            [STORE_KEYS.ORDERFORMTOGGLE]: {
                toggleViewMode,
            },
            [STORE_KEYS.VIEWMODESTORE]: {
                depthChartMode,
                orderHistoryMode,
                showDepthChartMode,
                toggleOrderHistoryMode,
                setAdvancedAPIMode,
            },
            [STORE_KEYS.ORDERBOOKBREAKDOWN]: {
                base : baseSymbol,
                quote : quoteSymbol,
            },
            [STORE_KEYS.EXCHANGESSTORE]: {
                exchanges,
                marketExchanges,
                getActiveExchanges,
                selectedExchange,
            },
        }) => {
            return ({
                toggleViewMode,
                depthChartMode,
                orderHistoryMode,
                showDepthChartMode,
                toggleOrderHistoryMode,
                setAdvancedAPIMode,
                baseSymbol,
                quoteSymbol,
                exchanges,
                marketExchanges,
                getActiveExchanges,
                selectedExchange,
            });
        }
    ),
    withStyles(styles),
)(OrderTabs);
