import React from 'react';
import { inject, observer } from 'mobx-react';
import { compose, withProps } from 'recompose';

import { STORE_KEYS } from '../../../stores';
import { viewModeKeys } from '../../../stores/ViewModeStore';
import { STATE_KEYS } from '../../../stores/ConvertStore';
import {
    Top, TopBarItemWrapper, TopBarItem, TopBarItemPopup
} from '../Component';
import {
    ChartIcon, ChatIcon, ContactsIcon, DonutIcon, ExchangeIcon, MarketIcon,
    MarketHistoryIcon, OrderBookIcon, TradingIcon, TradingViewIcon, WalletIcon
} from '../icons';

class TopItems extends React.Component {
    state = {
        opened: '',
        walletSelected: 'wallet',
        chartSelected: 'chart',
        marketSelected: 'depth',
    };

    static getDerivedStateFromProps(props, state) {
        const {
            viewMode, convertState, exchangeIndex, depthChartMode, orderHistoryMode,
        } = props;
        const { walletSelected, chartSelected } = state;

        const newState = {};

        if (viewMode === viewModeKeys.basicModeKey && walletSelected !== 'wallet') {
            newState.walletSelected = 'wallet';
        }
        if (viewMode === viewModeKeys.advancedModeKey && walletSelected !== 'orderbook') {
            newState.walletSelected = 'orderbook';
        }
        if (viewMode === viewModeKeys.friendModeKey && walletSelected !== 'contacts') {
            newState.walletSelected = 'contacts';
        }
        if (viewMode === viewModeKeys.publicChatModeKey && walletSelected !== 'chat') {
            newState.walletSelected = 'chat';
        }

        if (convertState === STATE_KEYS.coinSearch && chartSelected !== 'chart') {
            newState.chartSelected = 'chart';
        }
        if (convertState === STATE_KEYS.amtInput && exchangeIndex === -1 && chartSelected !== 'donut') {
            newState.chartSelected = 'donut';
        }
        if (convertState === STATE_KEYS.amtInput && exchangeIndex !== -1 && chartSelected !== 'tradingview') {
            newState.chartSelected = 'tradingview';
        }

        if (depthChartMode) {
            if (!orderHistoryMode) {
                newState.marketSelected = 'depth';
            } else {
                newState.marketSelected = 'history';
            }
        }

        if (Object.keys(newState).length > 0) {
            return newState;
        }

        return null;
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside = event => {
        const { opened } = this.state;
        if (opened === 'wallet' && this.walletRef && !this.walletRef.contains(event.target)) {
            this.togglePopup('wallet');
        }

        if (opened === 'chart' && this.chartRef && !this.chartRef.contains(event.target)) {
            this.togglePopup('chart');
        }

        if (opened === 'market' && this.marketRef && !this.marketRef.contains(event.target)) {
            this.togglePopup('market');
        }
    };

    togglePopup = opened => {
        this.setState(prevState => ({
            opened: prevState.opened === opened ? '' : opened,
        }));
    };

    changeWallet = walletSelected => {
        if (walletSelected !== this.state.walletSelected) {
            this.setState({
                opened: '',
                walletSelected,
            });

            const { isLoggedIn, isOrderBookStop, setViewMode } = this.props;
            if (walletSelected === 'wallet') {
                setViewMode(viewModeKeys.basicModeKey);
            }
            if (!isOrderBookStop && walletSelected === 'orderbook') {
                setViewMode(viewModeKeys.advancedModeKey);
            }
            if (isLoggedIn && walletSelected === 'contacts') {
                setViewMode(viewModeKeys.friendModeKey);
            }
            if (walletSelected === 'chat') {
                setViewMode(viewModeKeys.publicChatModeKey);
            }
        }
    };

    changeMarket = marketSelected => {
        if (marketSelected !== this.state.marketSelected) {
            this.setState({
                opened: '',
                marketSelected,
            });

            this.props.toggleOrderHistoryMode(marketSelected === 'history');
        }
    };

    changeField = (field, selected) => {
        this.setState({
            [field]: selected,
        });
    };

    render() {
        const {
            isLoggedIn, isOrderBookStop, setViewMode, convertState, depthChartMode,
        } = this.props;
        const {
            opened, walletSelected, chartSelected, marketSelected,
        } = this.state;

        if (!isLoggedIn && walletSelected === 'contacts') {
            setViewMode(viewModeKeys.basicModeKey);
        }

        if (isOrderBookStop && walletSelected === 'orderbook') {
            setViewMode(viewModeKeys.basicModeKey);
        }

        return (
            <Top>
                <TopBarItemWrapper innerRef={ref => this.walletRef = ref} toggleAble>
                    <TopBarItem
                        current
                        opened={opened === 'wallet'}
                        onClick={() => this.togglePopup('wallet')}
                        isClickable={true}
                    >
                        {walletSelected === 'wallet' && <WalletIcon />}
                        {isLoggedIn && walletSelected === 'contacts' && <ContactsIcon />}
                        {walletSelected === 'chat' && <ChatIcon />}
                        {!isOrderBookStop && walletSelected === 'orderbook' && <OrderBookIcon />}
                    </TopBarItem>

                    <TopBarItemPopup opened={opened === 'wallet'}>
                        <TopBarItem
                            active={walletSelected === 'wallet'}
                            onClick={() => this.changeWallet('wallet')}
                            isClickable={true}
                        >
                            <WalletIcon />
                        </TopBarItem>
                        {isLoggedIn && (
                            <TopBarItem
                                active={walletSelected === 'contacts'}
                                onClick={() => this.changeWallet('contacts')}
                                isClickable={true}
                            >
                                <ContactsIcon />
                            </TopBarItem>
                        )}
                        <TopBarItem
                            active={walletSelected === 'chat'}
                            onClick={() => this.changeWallet('chat')}
                            isClickable={true}
                        >
                            <ChatIcon />
                        </TopBarItem>
                        {!isOrderBookStop && (
                            <TopBarItem
                                active={walletSelected === 'orderbook'}
                                onClick={() => this.changeWallet('orderbook')}
                                isClickable={true}
                            >
                                <OrderBookIcon />
                            </TopBarItem>
                        )}
                    </TopBarItemPopup>
                </TopBarItemWrapper>

                <TopBarItemWrapper innerRef={ref => this.chartRef = ref}>
                    <TopBarItem
                        current
                        // opened={opened === 'chart'}
                        // onClick={() => this.togglePopup('chart')}
                        isClickable={false}
                    >
                        {chartSelected === 'chart' && <ChartIcon />}
                        {chartSelected === 'donut' && <DonutIcon />}
                        {chartSelected === 'tradingview' && <TradingViewIcon />}
                    </TopBarItem>

                    <TopBarItemPopup opened={opened === 'chart'}>
                        <TopBarItem
                            active={chartSelected === 'chart'}
                            onClick={() => this.changeField('chartSelected', 'chart')}
                        >
                            <ChartIcon />
                        </TopBarItem>
                        <TopBarItem
                            active={chartSelected === 'donut'}
                            onClick={() => this.changeField('chartSelected', 'donut')}
                        >
                            <DonutIcon />
                        </TopBarItem>
                        <TopBarItem
                            active={chartSelected === 'tradingview'}
                            onClick={() => this.changeField('chartSelected', 'tradingview')}
                        >
                            <TradingViewIcon />
                        </TopBarItem>
                    </TopBarItemPopup>
                </TopBarItemWrapper>

                {convertState === STATE_KEYS.submitOrder && (
                    <TopBarItemWrapper>
                        <TopBarItem
                            current
                            isClickable={false}
                        >
                            <TradingIcon />
                        </TopBarItem>
                    </TopBarItemWrapper>
                )}

                {depthChartMode && (
                    <TopBarItemWrapper innerRef={ref => this.marketRef = ref} toggleAble>
                        <TopBarItem
                            current
                            opened={opened === 'market'}
                            onClick={() => this.togglePopup('market')}
                            isClickable={true}
                        >
                            {marketSelected === 'depth'
                                ? <MarketIcon />
                                : <MarketHistoryIcon />
                            }
                        </TopBarItem>

                        <TopBarItemPopup opened={opened === 'market'}>
                            <TopBarItem
                                active={marketSelected === 'depth'}
                                onClick={() => this.changeMarket('depth')}
                                isClickable={true}
                            >
                                <MarketIcon />
                            </TopBarItem>
                            <TopBarItem
                                active={marketSelected === 'history'}
                                onClick={() => this.changeMarket('history')}
                                isClickable={true}
                            >
                                <MarketHistoryIcon />
                            </TopBarItem>
                        </TopBarItemPopup>
                    </TopBarItemWrapper>
                )}

                <TopBarItemWrapper>
                    <TopBarItem
                        current
                        isClickable={false}
                    >
                        <ExchangeIcon />
                    </TopBarItem>
                </TopBarItemWrapper>
            </Top>
        );
    }
}

const withStores = compose(
    inject(
        STORE_KEYS.TELEGRAMSTORE,
        STORE_KEYS.VIEWMODESTORE,
        STORE_KEYS.ORDERBOOK,
        STORE_KEYS.CONVERTSTORE,
        STORE_KEYS.LOWESTEXCHANGESTORE,
    ),
    observer,
    withProps(
        ({
            [STORE_KEYS.TELEGRAMSTORE]: {
                isLoggedIn,
            },
            [STORE_KEYS.VIEWMODESTORE]: {
                viewMode,
                depthChartMode,
                orderHistoryMode,
                progressState,
                setViewMode,
                toggleOrderHistoryMode,
            },
            [STORE_KEYS.ORDERBOOK]: {
                isOrderBookStop,
            },
            [STORE_KEYS.CONVERTSTORE]: {
                convertState,
            },
            [STORE_KEYS.LOWESTEXCHANGESTORE]: {
                exchangeIndex,
            },
        }) => ({
            isLoggedIn,
            viewMode,
            depthChartMode,
            orderHistoryMode,
            progressState,
            setViewMode,
            toggleOrderHistoryMode,
            isOrderBookStop,
            convertState,
            exchangeIndex,
        })
    )
);

export default withStores(TopItems);
