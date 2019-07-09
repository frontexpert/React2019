import React from 'react';
import { inject, observer } from 'mobx-react';
import { compose, withProps } from 'recompose';

import {
    TopBarItemWrapper, TopBarItem, TopBarItemPopup
} from '../SideBar/Component';
import {
    ChatIcon, ContactsIcon, OrderBookIcon, WalletIcon, SettingsIcon, ExchangesIcon
} from '../SideBar/icons';
import { viewModeKeys } from '../../stores/ViewModeStore';
import { STORE_KEYS } from '../../stores';

class TopSwitch extends React.Component {
    state = {
        opened: '',
        walletSelected: 'wallet',
    };

    static getDerivedStateFromProps(props, state) {
        const {
            viewMode,
        } = props;
        const { walletSelected } = state;

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
        if (viewMode === viewModeKeys.exchangesModeKey && walletSelected !== 'exchanges') {
            newState.walletSelected = 'exchanges';
        }
        if (viewMode === viewModeKeys.settingsModeKey && walletSelected !== 'settings') {
            newState.walletSelected = 'settings';
        }

        if (Object.keys(newState).length > 0) {
            return newState;
        }

        return null;
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
        // this.showPopup();
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside = event => {
        const { opened } = this.state;
        if (opened === 'wallet' && this.walletRef && !this.walletRef.contains(event.target)) {
            this.togglePopup('wallet');
        }
    };

    togglePopup = opened => {
        this.setState(prevState => ({
            opened: prevState.opened === opened ? '' : opened,
        }));
    };

    showPopup = () => {
        this.setState({
            opened: 'wallet',
        });
    }

    changeWallet = walletSelected => {
        if (walletSelected !== this.state.walletSelected) {
            this.setState({
                opened: '',
                walletSelected,
            });

            const {
                isLoggedIn, isOrderBookStop, setViewMode, openSettingsView,
            } = this.props;
            if (walletSelected === 'wallet') {
                setViewMode(viewModeKeys.basicModeKey);
            }
            if (/* !isOrderBookStop && */walletSelected === 'orderbook') {
                setViewMode(viewModeKeys.advancedModeKey);
            }
            if (isLoggedIn && walletSelected === 'contacts') {
                setViewMode(viewModeKeys.friendModeKey);
            }
            if (walletSelected === 'chat') {
                setViewMode(viewModeKeys.publicChatModeKey);
            }
            if (walletSelected === 'exchanges') {
                setViewMode(viewModeKeys.exchangesModeKey);
            }
            if (walletSelected === 'settings') {
                openSettingsView();
            }
        }
    };

    render() {
        const {
            isLoggedIn, isOrderBookStop, setViewMode,
        } = this.props;
        const {
            opened, walletSelected,
        } = this.state;

        if (!isLoggedIn && walletSelected === 'contacts') {
            setViewMode(viewModeKeys.basicModeKey);
        }

        // if (isOrderBookStop && walletSelected === 'orderbook') {
        //     setViewMode(viewModeKeys.basicModeKey);
        // }

        return (
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
                    {/* !isOrderBookStop && */walletSelected === 'orderbook' && <OrderBookIcon />}
                    {walletSelected === 'exchanges' && <ExchangesIcon/>}
                    {walletSelected === 'settings' && <SettingsIcon/>}
                </TopBarItem>

                <TopBarItemPopup opened={opened === 'wallet'}>
                    {
                        walletSelected !== 'wallet' &&
                        <TopBarItem
                            // active={walletSelected === 'wallet'}
                            onClick={() => this.changeWallet('wallet')}
                            isClickable={true}
                        >
                            <WalletIcon />
                        </TopBarItem>
                    }
                    {isLoggedIn && walletSelected !== 'contacts' && (
                        <TopBarItem
                            // active={walletSelected === 'contacts'}
                            onClick={() => this.changeWallet('contacts')}
                            isClickable={true}
                        >
                            <ContactsIcon />
                        </TopBarItem>
                    )}
                    {
                        walletSelected !== 'chat' &&
                        <TopBarItem
                            // active={walletSelected === 'chat'}
                            onClick={() => this.changeWallet('chat')}
                            isClickable={true}
                        >
                            <ChatIcon />
                        </TopBarItem>
                    }
                    {/* !isOrderBookStop && */walletSelected !== 'orderbook' && (
                        <TopBarItem
                            active={walletSelected === 'orderbook'}
                            onClick={() => this.changeWallet('orderbook')}
                            isClickable={true}
                        >
                            <OrderBookIcon />
                        </TopBarItem>
                    )}
                    {
                        walletSelected !== 'exchanges' &&
                        <TopBarItem
                            // active={walletSelected === 'exchanges'}
                            onClick={() => this.changeWallet('exchanges')}
                            isClickable={true}
                        >
                            <ExchangesIcon />
                        </TopBarItem>
                    }
                    {
                        walletSelected !== 'settings' &&
                        <TopBarItem
                            // active={walletSelected === 'settings'}
                            onClick={() => this.changeWallet('settings')}
                            isClickable={true}
                        >
                            <SettingsIcon />
                        </TopBarItem>
                    }
                </TopBarItemPopup>
            </TopBarItemWrapper>
        );
    }
}

const withStores = compose(
    inject(
        STORE_KEYS.TELEGRAMSTORE,
        STORE_KEYS.VIEWMODESTORE,
        STORE_KEYS.ORDERBOOK,
    ),
    observer,
    withProps(
        ({
            [STORE_KEYS.TELEGRAMSTORE]: {
                isLoggedIn,
            },
            [STORE_KEYS.VIEWMODESTORE]: {
                viewMode,
                progressState,
                setViewMode,
                openSettingsView,
            },
            [STORE_KEYS.ORDERBOOK]: {
                isOrderBookStop,
            },
        }) => ({
            isLoggedIn,
            viewMode,
            progressState,
            setViewMode,
            openSettingsView,
            isOrderBookStop,
        })
    )
);

export default withStores(TopSwitch);
