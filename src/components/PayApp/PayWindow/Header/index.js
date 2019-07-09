import React, { Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { FormattedMessage } from 'react-intl';

import { STORE_KEYS } from '../../../../stores';
import { STATE_KEYS } from '../../../../stores/ConvertStore';
import { languages } from '../../../../lib/translations/languages';
import {
    Wrapper,
    AvatarWrapper,
    LabelArbitrage,
    ThreeDotIcon,
    HistoryMenuIcon
} from './Components';
import { GlobalIcon } from '../../../OrderTabs/Components';
import UserAvatarComponent from '../../../SideHeader/UserAvatarComponent';
import { getScreenInfo } from '../../../../utils';
import SelectDropdown2Columns from '../../../../components-generic/SelectDropdown/SelectDropdown2Columns';
import SMSVerification from '../../../../components-generic/SMSVerification2';
import ExchangeSelectorWrapper from '../../../OrderBook/BuyBook/ExchangeSelectorWrapper';
import UserAvatarPopupMenu from '../../../SideHeader/UserAvatarPopupMenu';

class WalletHeader extends React.Component {
    state = {
        isLoading: false,
        loginMode: false,
        isArbOpen: false,
        isExchangesOpen: false,
        isLogoutModalOpen: false,
    };

    headerRef = React.createRef();
    exchangeRef = React.createRef();

    handleLanguage = (lang) => {
        // this.props.toggleKeyModal(true);
        const { setLanguage } = this.props[STORE_KEYS.SETTINGSSTORE];
        setLanguage(lang);
    };

    refresh = () => {
        window.location.reload();
    };

    setLoading = (isLoading) => {
        this.setState({ isLoading });
    };

    handleLogin = () => {
        this.setState(prevState => ({
            loginMode: !prevState.loginMode,
        }));
    };

    toggleLogoutModal = (isLogoutModalOpen) => {
        this.setState(prevState => ({
            isLogoutModalOpen: (typeof isLogoutModalOpen === 'boolean') ? isLogoutModalOpen : !prevState.isLogoutModalOpen,
        }));
    };

    toggleDropDown = (isInner = true) => {
        const {
            [STORE_KEYS.SETTINGSSTORE]: {
                isArbitrageMode,
                tradeColStatus,
                setTradeColStatus,
                sidebarStatus,
                setSidebarStatus,
            },
            [STORE_KEYS.CONVERTSTORE]: {
                convertState,
            },
            [STORE_KEYS.VIEWMODESTORE]: {
                isUserDropDownOpen,
                setUserDropDownOpen,
            },
        } = this.props;

        if (convertState !== STATE_KEYS.coinSearch) {
            if (!isInner) return;
            /*
            if (tradeColStatus === 'closed') {
                setTradeColStatus('open');
            } else {
                if (!isUserDropDownOpen) {
                    setTradeColStatus('closed');
                }
                setUserDropDownOpen(!isUserDropDownOpen);
            }
            */
            setUserDropDownOpen(!isUserDropDownOpen);
        } else {
            const { isArbOpen, isExchangesOpen } = this.state;
            if (sidebarStatus === 'closed') {
                setSidebarStatus('open');
                return;
            }
            setUserDropDownOpen(!isUserDropDownOpen);
            if (isUserDropDownOpen) {
                // setSidebarStatus('closed');
                if (isArbOpen) {
                    this.setState(prevState => ({
                        isArbOpen: !prevState.isArbOpen,
                    }));
                } else if (isExchangesOpen) {
                    this.setState(prevState => ({
                        isExchangesOpen: !prevState.isExchangesOpen,
                    }));
                }
            }
        }
    };

    handleShowHistory = () => {
        const {
            [STORE_KEYS.CONVERTSTORE]: {
                convertState,
            },
            [STORE_KEYS.VIEWMODESTORE]: {
                isUserDropDownOpen,
                setUserDropDownOpen,
            },
        } = this.props;

        this.setState({ isArbOpen: true, isExchangesOpen: false });
        if (convertState !== STATE_KEYS.coinSearch) {
            setUserDropDownOpen(false);
        }
    }

    handleShowExchanges = () => {
        this.exchangeRef.current.wrappedInstance.ref.current.wrappedInstance.toggleDropDown();

        const {
            [STORE_KEYS.CONVERTSTORE]: {
                convertState,
            },
            [STORE_KEYS.VIEWMODESTORE]: {
                setUserDropDownOpen,
            },
        } = this.props;

        if (convertState !== STATE_KEYS.coinSearch) {
            setUserDropDownOpen(false);
        }
    }

    render() {
        const {
            isLoading, loginMode, isArbOpen, isExchangesOpen, isLogoutModalOpen,
        } = this.state;
        const {
            [STORE_KEYS.TELEGRAMSTORE]: {
                isLoggedIn, loginBtnLocation, isProfileLogoExists, logoURL, setLoginBtnLocation,
            },
            [STORE_KEYS.SETTINGSSTORE]: {
                language, defaultURL, isRealTrading, isArbitrageMode, tradeColStatus, sidebarStatus,
            },
            [STORE_KEYS.VIEWMODESTORE]: {
                isUserDropDownOpen,
            },
            [STORE_KEYS.CONVERTSTORE]: { convertState },
            isOrderbook,
            isSeparate,
        } = this.props;

        const isArbitrageMonitorMode = isArbitrageMode && (convertState !== STATE_KEYS.coinSearch);
        const { isMobileDevice } = getScreenInfo();
        const languagesArray = [];
        for (let i = 0; i < languages.length; i++) {
            languagesArray.push({
                name: languages[i].value,
                flag: languages[i].flag,
            });
        }

        return (
            <Wrapper
                isTelegram={false}
                isOrderbook={isOrderbook}
                isSeparate={isSeparate}
                isPadding={isLoggedIn && !isMobileDevice}
                innerRef={this.headerRef}
                isClosed={(convertState !== STATE_KEYS.coinSearch && tradeColStatus === 'closed') || (convertState === STATE_KEYS.coinSearch && sidebarStatus === 'closed')}
            >
                {!isLoggedIn &&
                    <AvatarWrapper onClick={isLoggedIn ? null : this.handleLogin} isLoggedIn={isLoggedIn}>
                        <UserAvatarComponent
                            toggleDropDown={this.toggleDropDown}
                        />

                        <span className="login-title">
                            {!isLoggedIn ? (
                                <FormattedMessage
                                    id="pay_app.pay_window.label_login"
                                    defaultMessage="Login"
                                />
                            ) : (
                                isRealTrading ? (
                                    <FormattedMessage
                                        id="pay_app.pay_window.label_real_trading"
                                        defaultMessage="Real"
                                    />
                                ) : (
                                    isArbitrageMode ? (
                                        <FormattedMessage
                                            id="pay_app.pay_window.label_arbitrage"
                                            defaultMessage="Arbitrage"
                                        />
                                    ) : (
                                        <FormattedMessage
                                            id="pay_app.pay_window.label_demo"
                                            defaultMessage="Demo"
                                        />
                                    )
                                )
                            )}
                        </span>
                    </AvatarWrapper>
                }
                {(!isLoggedIn && loginMode) ? (
                    <SMSVerification handleBack={this.handleLogin} />
                ) : (
                    <Fragment>
                        {!isArbitrageMonitorMode && !isArbOpen && !isExchangesOpen && (
                            <ExchangeSelectorWrapper ref={this.exchangeRef} isEnabled={convertState === STATE_KEYS.coinSearch} isLoggedIn={isLoggedIn} />
                        )}
                        {(isArbOpen || (tradeColStatus === 'open' && isArbitrageMonitorMode)) && sidebarStatus === 'open' && (
                            <LabelArbitrage><HistoryMenuIcon size={38} marginRight={15} color="#fff" />HISTORY</LabelArbitrage>
                        )}
                        {isExchangesOpen && (
                            <LabelArbitrage><GlobalIcon size={38} marginRight={15} color="#fff" />EXCHANGES</LabelArbitrage>
                        )}
                    </Fragment>
                )}

                {!isLoggedIn && !loginMode && (
                    <SelectDropdown2Columns
                        isSearchable={false}
                        value={language}
                        items={languagesArray}
                        onChange={this.handleLanguage}
                    />
                )}
                {isLoggedIn && <ThreeDotIcon onClick={this.toggleDropDown} />}
                {(isUserDropDownOpen || (isArbitrageMonitorMode && tradeColStatus === 'open')) && sidebarStatus === 'open' && (
                    <UserAvatarPopupMenu
                        isLoggedIn={isLoggedIn}
                        isProfileLogoExists={isProfileLogoExists}
                        logoURL={logoURL}
                        setLoginBtnLocation={setLoginBtnLocation}
                        onClose={this.toggleDropDown}
                        isArbOpen={isArbOpen}
                        isExchangesOpen={isExchangesOpen}
                        isLogoutModalOpen={isLogoutModalOpen}
                        toggleLogoutModal={this.toggleLogoutModal}
                        onShowHistory={this.handleShowHistory}
                        onShowExchanges={this.handleShowExchanges}
                        headerRef={this.headerRef}
                    />
                )}
            </Wrapper>
        );
    }
}

export default inject(
    STORE_KEYS.TELEGRAMSTORE,
    STORE_KEYS.SETTINGSSTORE,
    STORE_KEYS.MODALSTORE,
    STORE_KEYS.CONVERTSTORE,
    STORE_KEYS.VIEWMODESTORE,
)(observer(WalletHeader));
