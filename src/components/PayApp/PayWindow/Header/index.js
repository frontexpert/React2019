import React from 'react';
import { inject, observer } from 'mobx-react';
import { FormattedMessage } from 'react-intl';

import { STORE_KEYS } from '../../../../stores';
import { STATE_KEYS } from '../../../../stores/ConvertStore';
import { languages } from '../../../../lib/translations/languages';
import {
    Wrapper,
    AvatarWrapper,
    LoginTextWrapper,
    LabelArbitrage,
    ThreeDotIcon
} from './Components';
import UserAvatarComponent from '../../../SideHeader/UserAvatarComponent';
import { getScreenInfo } from '../../../../utils';
// import { LoaderWrapper } from '../../../TelegramLogin';
// import DataLoader from '../../../../components-generic/DataLoader';
import SelectDropdown2Columns from '../../../../components-generic/SelectDropdown/SelectDropdown2Columns';
import SMSVerification from '../../../../components-generic/SMSVerification2';
import ExchangeSelectorWrapper from '../../../OrderBook/BuyBook/ExchangeSelectorWrapper';

const showLoginModal = (Modal, onClose, portal, additionalVerticalSpace) => () => {
    return Modal({
        portal,
        additionalVerticalSpace,
        showClose: false,
        ModalComponentFn: () => <SMSVerification portal={portal} onClose={onClose} />,
    });
};

class WalletHeader extends React.Component {
    state = {
        isLoading: false,
        loginMode: false,
    };

    handleLanguage = (lang) => {
        // this.props.toggleKeyModal(true);
        const { setLanguage } = this.props[STORE_KEYS.SETTINGSSTORE];
        setLanguage(lang);
    };

    onSelectExchange = (exchange) => {
        const {
            [STORE_KEYS.EXCHANGESSTORE]: { setExchange },
        } = this.props;
        setExchange(exchange);
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

    toggleDropDown = () => {
        const {
            [STORE_KEYS.VIEWMODESTORE]: {
                isUserDropDownOpen,
                setUserDropDownOpen,
            },
        } = this.props;
        setUserDropDownOpen(!isUserDropDownOpen);
    };
    render() {
        const { isLoading, loginMode } = this.state;
        const {
            [STORE_KEYS.TELEGRAMSTORE]: { isLoggedIn, loginBtnLocation },
            [STORE_KEYS.SETTINGSSTORE]: {
                language, defaultURL, isRealTrading, isArbitrageMode,
            },
            // [STORE_KEYS.EXCHANGESSTORE]: {
            //     marketExchanges,
            //     selectedExchange,
            //     exchanges,
            //     setExchangeActive,
            // },
            [STORE_KEYS.MODALSTORE]: { Modal, onClose, isApiKeyModalOpened },
            [STORE_KEYS.CONVERTSTORE]: { convertState },
            isOrderbook,
            isSeparate,
            width,
            height,
        } = this.props;

        const isArbitrageMonitorMode = isArbitrageMode && (convertState !== STATE_KEYS.coinSearch);
        const { isMobileDevice, isMobilePortrait } = getScreenInfo();
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
            >
                {!isLoggedIn &&
                    <AvatarWrapper onClick={isLoggedIn ? null : this.handleLogin} isLoggedIn={isLoggedIn}>
                        <UserAvatarComponent/>
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
                    <SMSVerification handleBack={this.handleLogin}/>
                ) : (
                    !isArbitrageMonitorMode ? (
                        <ExchangeSelectorWrapper isEnabled={convertState === STATE_KEYS.coinSearch}/>
                    ) : (
                        <LabelArbitrage>
                            <FormattedMessage
                                id="pay_app.pay_window.title_trade_history"
                                defaultMessage="TRADING HISTORY"
                            />
                        </LabelArbitrage>
                    )
                )}
                {isLoggedIn && !isArbitrageMonitorMode && <ThreeDotIcon onClick={this.toggleDropDown}/>}
                {!isLoggedIn && !loginMode && (
                    <SelectDropdown2Columns
                        isSearchable={false}
                        value={language}
                        items={languagesArray}
                        onChange={this.handleLanguage}
                    />
                )}
            </Wrapper>
        );
    }
}

export default inject(
    STORE_KEYS.TELEGRAMSTORE,
    // STORE_KEYS.EXCHANGESSTORE,
    STORE_KEYS.SETTINGSSTORE,
    STORE_KEYS.MODALSTORE,
    STORE_KEYS.CONVERTSTORE,
    STORE_KEYS.VIEWMODESTORE,
)(observer(WalletHeader));
