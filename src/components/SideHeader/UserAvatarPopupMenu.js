import React from 'react';
import { inject, observer } from 'mobx-react';
import { FormattedMessage } from 'react-intl';
import { Tooltip } from 'react-tippy';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

import { STORE_KEYS } from '../../stores';
import { STATE_KEYS } from '../../stores/ConvertStore';
import { autoConvertOptions } from '../../stores/SettingsStore';
import { SETTING_TIPPY_INFO } from '../../config/constants';
import {
    format7DigitString,
    formatNegativeNumber,
    getItemColor,
    getScreenInfo
} from '../../utils';
import {
    AvatarWrapper, DefaultAvatar, InputTextCustom,
    Item, SettingsBtn
} from '../SideBar/NewSettingsPop/Components';
import {
    DropdownWrapper,
    DropdownArrow,
    DropdownMenu,
    DropdownMenuItem,
    OrderHistoryWrapper,
    Spacer,
    GlobalIcon,
    OpenArrow,
    CloseIcon,
    ThreeDotIcon,
    LanguageWrapper
} from './Components';
import PerfectScrollWrapper from '../../components-generic/PerfectScrollWrapper';
import {
    ActivityMenuIcon,
    AffiliateMenuIcon,
    HistoryMenuIcon,
    SettingsMenuIcon
} from './icons';
import OrderHistoryTable from '../OrderHistory/OrderHistoryTable';
import SelectDropdown from '../../components-generic/SelectDropdown';
import {
    accessLevels,
    autoFlips,
    c1s,
    c2s,
    swaps,
    timerList,
    timerAfterList
} from '../SideBar/NewSettingsPop/mock';
import SwitchCustom from '../../components-generic/SwitchCustom';
import { languages } from '../../lib/translations/languages';
import KeyModal from '../KeyModal';
import LogoutModal from '../LogoutModal';
import CurrencySelectDropdown from '../../components-generic/SelectDropdown/CurrencySelectDropdown';
import LanguageSelectDropdown from '../../components-generic/SelectDropdown/LanguageSelectDropdown';
import InputCustom from '../../components-generic/InputCustom';
import SendCoinsModal from '../SendCoinsModal';
import SeedWordsModal from '../SeedWordsModal';
import AvatarImage from './AvatarImage';
import ExchangeListComponent from './ExchangeListComponent';
import ExchangeSelectorWrapper from '../OrderBook/BuyBook/ExchangeSelectorWrapper';

class UserAvatarPopupMenu extends React.Component {
    ref = React.createRef();
    state = {
        isExchangeListOpen: false,
        isChildOpen: false,
        isKeyModalOpen: false,
        isAdvancedListOpen: false,
        isPrivacyListOpen: false,
        isAffiliateListOpen: false,
        isPreferencesListOpen: false,
        isHelpDeskListOpen: false,
        tab: 'all',
    };

    componentDidMount() {
        window.addEventListener('resize', this.handleResizeWindow);
        this.props[STORE_KEYS.ORDERHISTORY].requestOrderHistory();
        this.props[STORE_KEYS.SETTINGSSTORE].getOrderHistory();
        this.props[STORE_KEYS.VIEWMODESTORE].toggleOrderHistoryMode(false);
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResizeWindow);
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    setChildOpen = value => {
        this.setState({
            isChildOpen: value,
        });
    }

    handleResizeWindow = () => {
        this.forceUpdate();
    };

    handleClickOutside = (event) => {
        const {
            [STORE_KEYS.VIEWMODESTORE]: {
                isUserDropDownOpen,
            },
            isLogoutModalOpen,
            headerRef,
        } = this.props;
        if (isUserDropDownOpen && headerRef.current
            && !headerRef.current.contains(event.target) && !isLogoutModalOpen) {
            this.props.onClose(false);
        }
    };

    toggleSettings = (mode) => {
        const {
            [STORE_KEYS.VIEWMODESTORE]: {
                openSettingsView,
            },
        } = this.props;

        openSettingsView(mode);
    };

    handleLogin = e => {
        e.preventDefault();

        this.props.setLoginBtnLocation(true);
        this.props.onClose();
    };

    showTradeHistory = e => {
        e.preventDefault();
        this.props.onShowHistory();
    };

    showExchanges = e => {
        e.preventDefault();
        this.props.onShowExchanges();
    };

    handleResetBalance = (e) => {
        e.stopPropagation();
        this.props[STORE_KEYS.YOURACCOUNTSTORE].resetDemoBalances();
        this.props[STORE_KEYS.YOURACCOUNTSTORE].resetWalletTableState();
        this.props[STORE_KEYS.PORTFOLIODATASTORE].resetPortfolioData();
        // this.props[STORE_KEYS.SETTINGSSTORE].setShortSellWith(false);
        this.props[STORE_KEYS.CONVERTSTORE].gotoFirstState();
        this.props[STORE_KEYS.INSTRUMENTS].setBase('BTC');
        this.props[STORE_KEYS.INSTRUMENTS].setQuote('USDT');
        this.props[STORE_KEYS.SETTINGSSTORE].resetBalance();
        this.props[STORE_KEYS.ORDERHISTORY].resetOrderHistory();
        this.props[STORE_KEYS.SETTINGSSTORE].resetHistory();
        this.props.onClose();
    };

    handleLanguage = (lang) => {
        // this.props.toggleKeyModal(true);
        const {
            [STORE_KEYS.SETTINGSSTORE]: {
                setLanguage,
            },
            [STORE_KEYS.MODALSTORE]: {
                onClose,
            },
        } = this.props;
        setLanguage(lang);
        // close LanguageCurrencyModal manually
        onClose();
    };

    toggleKeyModal = (isKeyModalOpen) => {
        this.setState(prevState => ({
            isKeyModalOpen: (typeof isKeyModalOpen === 'boolean') ? isKeyModalOpen : !prevState.isKeyModalOpen,
        }));
    };

    toggleExchangeList = (isOpen) => {
        this.setState(prevState => ({
            isExchangeListOpen: (typeof isOpen === 'boolean') ? isOpen : !prevState.isExchangeListOpen,
            isAdvancedListOpen: false,
            isKeyModalOpen: false,
            isPrivacyListOpen: false,
            isAffiliateListOpen: false,
            isPreferencesListOpen: false,
            isHelpDeskListOpen: false,
        }));
        this.props[STORE_KEYS.VIEWMODESTORE].toggleOrderHistoryMode(false);
    };

    toggleAdvancedList = (isOpen) => {
        this.setState(prevState => ({
            isAdvancedListOpen: (typeof isOpen === 'boolean') ? isOpen : !prevState.isAdvancedListOpen,
            isKeyModalOpen: false,
            isPrivacyListOpen: false,
            isAffiliateListOpen: false,
            isPreferencesListOpen: false,
            isHelpDeskListOpen: false,
            isExchangeListOpen: false,
        }));
        this.props[STORE_KEYS.VIEWMODESTORE].toggleOrderHistoryMode(false);
    };

    togglePrivacyList = (isOpen) => {
        this.setState(prevState => ({
            isPrivacyListOpen: (typeof isOpen === 'boolean') ? isOpen : !prevState.isPrivacyListOpen,
            isKeyModalOpen: false,
            isAdvancedListOpen: false,
            isAffiliateListOpen: false,
            isPreferencesListOpen: false,
            isHelpDeskListOpen: false,
            isExchangeListOpen: false,
        }));
        this.props[STORE_KEYS.VIEWMODESTORE].toggleOrderHistoryMode(false);
    };

    toggleAffiliateList = (isOpen) => {
        this.setState(prevState => ({
            isAffiliateListOpen: (typeof isOpen === 'boolean') ? isOpen : !prevState.isAffiliateListOpen,
            isKeyModalOpen: false,
            isAdvancedListOpen: false,
            isPrivacyListOpen: false,
            isPreferencesListOpen: false,
            isHelpDeskListOpen: false,
            isExchangeListOpen: false,
        }));
        this.props[STORE_KEYS.VIEWMODESTORE].toggleOrderHistoryMode(false);
    };
    toggleHelpDeskList = (isOpen) => {
        this.setState(prevState => ({
            isHelpDeskListOpen: (typeof isOpen === 'boolean') ? isOpen : !prevState.isHelpDeskListOpen,
            isKeyModalOpen: false,
            isAdvancedListOpen: false,
            isPrivacyListOpen: false,
            isPreferencesListOpen: false,
            isAffiliateListOpen: false,
            isExchangeListOpen: false,
        }));
        this.props[STORE_KEYS.VIEWMODESTORE].toggleOrderHistoryMode(false);
    };

    togglePreferencesList = (isOpen) => {
        this.setState(prevState => ({
            isPreferencesListOpen: (typeof isOpen === 'boolean') ? isOpen : !prevState.isPreferencesListOpen,
            isKeyModalOpen: false,
            isAdvancedListOpen: false,
            isPrivacyListOpen: false,
            isAffiliateListOpen: false,
            isHelpDeskListOpen: false,
            isExchangeListOpen: false,
        }));
        this.props[STORE_KEYS.VIEWMODESTORE].toggleOrderHistoryMode(false);
    };

    handleLogoutBtn = () => {
        this.props.toggleLogoutModal(true);
    };

    setAccessLevel = (accessLevel) => {
        const { referredBy, setAccessLevel } = this.props[STORE_KEYS.SETTINGSSTORE];
        const { Modal } = this.props[STORE_KEYS.MODALSTORE];

        // if (accessLevel !== 'Level 1') {
        //     Modal({
        //         portal: 'graph-chart-parent',
        //         ModalComponentFn: () => (
        //             <SendCoinsModal
        //                 coin="USDT"
        //                 name={referredBy}
        //                 user={{
        //                     name: referredBy,
        //                 }}
        //                 onFinish={() => {
        //                     setAccessLevel(accessLevel);
        //                 }}
        //             />
        //         ),
        //     });
        // } else {
        //     setAccessLevel(accessLevel);
        // }
        setAccessLevel(accessLevel);
    };

    handleViewSeedWords = () => {
        const { Modal } = this.props[STORE_KEYS.MODALSTORE];
        Modal({
            portal: 'graph-chart-parent',
            ModalComponentFn: () => (
                <SeedWordsModal isShow={true} isBackUp={true} />
            ),
        });
    };

    setRealTradingWith = () => {
        const { setRealTrading } = this.props[STORE_KEYS.SETTINGSSTORE];
        const { isLoggedIn } = this.props[STORE_KEYS.TELEGRAMSTORE];
        if (isLoggedIn) {
            setRealTrading();
        } else {
            console.log('Login with Telegram');
        }
    };

    changeTab = (tab, e) => {
        e.stopPropagation();
        if (this.state.tab !== tab) {
            this.setState({ tab });
        }
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

    getInternationPhoneNumberFormat = value => {
        let intFormatValue = '';
        if (value.includes('+')) {
            intFormatValue = formatPhoneNumberIntl(value);
        } else {
            intFormatValue = formatPhoneNumberIntl('+' + value);
        }

        if (intFormatValue.length === 0) {
            intFormatValue = value;
        }
        return intFormatValue;
    }

    render() {
        const {
            isExchangeListOpen,
            isKeyModalOpen,
            isAdvancedListOpen,
            isPrivacyListOpen,
            isAffiliateListOpen,
            isPreferencesListOpen,
            isHelpDeskListOpen,
        } = this.state;

        const {
            isLoggedIn,
            loggedInUser,
        } = this.props[STORE_KEYS.TELEGRAMSTORE];

        const {
            isShortSell, isRealTrading, defaultURL, isGoogle2FA,
            setShortSell, setDefaultURL,
            setPortfolioIncludesBct, portfolioIncludesBct,
            accessLevel,
            privateVpn, setPrivateVpn,
            referredBy, setReferredBy,
            language,
            isAutoConvert, setIsAutoConvert,
            swap, setSwap,
            c2, setC2,
            c1, setC1,
            autoFlip, setAutoFlip,
            timer, setTimer,
            timerAfter, setTimerAfter,
        } = this.props[STORE_KEYS.SETTINGSSTORE];

        const {
            orderHistoryMode,
            exchangesMode,
            isUserDropDownOpen,
        } = this.props[STORE_KEYS.VIEWMODESTORE];

        const {
            convertState,
        } = this.props[STORE_KEYS.CONVERTSTORE];

        const {
            isArbOpen,
            isExchangesOpen,
            isLogoutModalOpen,
            toggleLogoutModal,
        } = this.props;

        // -----
        let symbolName = '';
        let userName = '';
        let fullName = '';
        if (isLoggedIn && loggedInUser) {
            const {
                firstname,
                lastname,
            } = loggedInUser;

            if (firstname && firstname.length > 0) {
                symbolName = firstname[0];
            }
            if (lastname && lastname.length > 0) {
                symbolName += lastname[0];
            }

            userName = loggedInUser.username;
            fullName = firstname + ' ' + lastname;
        }

        let phoneNumber = parsePhoneNumberFromString(localStorage.getItem('phoneNumber'));
        phoneNumber = phoneNumber.formatInternational();
        // -----
        const isBackendTelLogin = localStorage.getItem('authToken');
        let languagesArray = [];
        for (let i = 0; i < languages.length; i++) {
            languagesArray.push({
                name: languages[i].value,
                flag: languages[i].flag,
            });
        }

        // ------
        const { storeCredit, setSelectedCoin } = this.props[STORE_KEYS.YOURACCOUNTSTORE];
        const storeCreditStr = formatNegativeNumber(format7DigitString(storeCredit)).replace('+', '');

        const {
            gridHeight,
            leftSidebarWidth,
        } = getScreenInfo();

        const exchangeList = (
            <React.Fragment>
                <Item settingsOpen={this.state.isExchangeListOpen}>
                    <ExchangeSelectorWrapper
                        ref={this.ref}
                        isEnabled={convertState === STATE_KEYS.coinSearch}
                        isLoggedIn={isLoggedIn}
                        settingsOpen={this.state.isExchangeListOpen}
                        setChildOpen={this.setChildOpen}
                    />
                </Item>
            </React.Fragment>);
        const advancedList = (
            <React.Fragment>
                {/*
                <Item>
                    <span>
                        <FormattedMessage
                            id="settings.label_arbitrage_mode"
                            defaultMessage="Arbitrage Mode"
                        />

                        <Tooltip
                            arrow={true}
                            animation="shift"
                            position="right"
                            theme="bct"
                            title={SETTING_TIPPY_INFO.ARBITRAGE_MODE}
                            popperOptions={{
                                modifiers: {
                                    preventOverflow: { enabled: false },
                                    flip: { enabled: false },
                                    hide: { enabled: false },
                                },
                            }}
                        >
                            <span className="symbol_i">i</span>
                        </Tooltip>
                    </span>

                    <SwitchCustom
                        checked={isArbitrageMode}
                        onChange={setArbitrageMode}
                    />
                </Item>
                */}

                {/*
                <Item>
                    <span>
                        <FormattedMessage
                            id="settings.label_slider"
                            defaultMessage="Slider"
                        />
                        <span className="symbol_i">i</span>
                    </span>
                    <SelectDropdown
                        width={180}
                        value={slider}
                        items={sliders}
                        alignTop={false}
                        isSearchable={false}
                        onChange={setSlider}
                    />
                </Item>
                */}

                <Item>
                    <span>
                        <FormattedMessage
                            id="settings.label_auto_flip"
                            defaultMessage="Auto Flip"
                        />
                        <span className="symbol_i">i</span>
                    </span>
                    <SelectDropdown
                        width={180}
                        value={autoFlip}
                        items={autoFlips}
                        isSearchable={false}
                        onChange={setAutoFlip}
                    />
                </Item>

                <Item>
                    <span>
                        C1
                        <span className="symbol_i">i</span>
                    </span>
                    <SelectDropdown
                        width={180}
                        value={c1}
                        items={c1s}
                        isSearchable={false}
                        onChange={setC1}
                    />
                </Item>

                <Item>
                    <span>
                        C2
                        <span className="symbol_i">i</span>
                    </span>
                    <SelectDropdown
                        width={180}
                        value={c2}
                        items={c2s}
                        isSearchable={false}
                        onChange={setC2}
                    />
                </Item>

                <Item>
                    <span>
                        Convert
                        <span className="symbol_i">i</span>
                    </span>
                    <SelectDropdown
                        width={180}
                        value={swap}
                        items={swaps}
                        isSearchable={false}
                        onChange={setSwap}
                    />
                </Item>

                <Item>
                    <span>
                        <FormattedMessage
                            id="settings.label_is_auto_convert"
                            defaultMessage="Auto Convert"
                        />
                        <span className="symbol_i">i</span>
                    </span>
                    <SelectDropdown
                        width={180}
                        value={isAutoConvert}
                        items={Object.values(autoConvertOptions)}
                        isSearchable={false}
                        onChange={setIsAutoConvert}
                    />
                </Item>

                <Item>
                    <span>
                        <FormattedMessage
                            id="settings.label_store_credit"
                            defaultMessage="Store Credit"
                        />

                        <Tooltip
                            arrow={true}
                            animation="shift"
                            position="right"
                            theme="bct"
                            title={`Your Store Credit: ${storeCreditStr}`}
                            // title={SETTING_TIPPY_INFO.STORE_CREDIT}
                            popperOptions={{
                                modifiers: {
                                    preventOverflow: { enabled: false },
                                    flip: { enabled: false },
                                    hide: { enabled: false },
                                },
                            }}
                        >
                            <span className="symbol_i">i</span>
                        </Tooltip>
                    </span>
                    <SwitchCustom
                        checked={isShortSell}
                        onChange={isRealTrading ? this.toggleKeyModal : setShortSell}
                        onMouseLeave={() => {
                            this.toggleKeyModal(false);
                        }}
                    />
                </Item>

                <Item>
                    <span>
                        <FormattedMessage
                            id="settings.label_balance_includes_credit"
                            defaultMessage="Balance includes Credit"
                        />

                        <Tooltip
                            arrow={true}
                            animation="shift"
                            position="right"
                            theme="bct"
                            title={SETTING_TIPPY_INFO.BALANCE_CREDIT}
                            popperOptions={{
                                modifiers: {
                                    preventOverflow: { enabled: false },
                                    flip: { enabled: false },
                                    hide: { enabled: false },
                                },
                            }}
                        >
                            <span className="symbol_i">i</span>
                        </Tooltip>
                    </span>
                    <SwitchCustom
                        checked={portfolioIncludesBct}
                        // onChange={this.toggleKeyModal}
                        onChange={setPortfolioIncludesBct}
                        onMouseLeave={() => {
                            this.toggleKeyModal(false);
                        }}
                    />
                </Item>

                <Item>
                    <span>
                        <FormattedMessage
                            id="settings.label_12words"
                            defaultMessage="12-word phrase"
                        />

                        <Tooltip
                            arrow={true}
                            animation="shift"
                            position="right"
                            theme="bct"
                            title={SETTING_TIPPY_INFO.WORD12_PHRASE}
                            popperOptions={{
                                modifiers: {
                                    preventOverflow: { enabled: false },
                                    flip: { enabled: false },
                                    hide: { enabled: false },
                                },
                            }}
                        >
                            <span className="symbol_i">i</span>
                        </Tooltip>
                    </span>
                    <button
                        className="btn_normal"
                        onClick={this.handleViewSeedWords}
                    >
                        <Tooltip
                            arrow={true}
                            animation="shift"
                            position="left"
                            followCursor
                            theme="bct"
                            title="Your Access is Restricted to Level 1"
                            popperOptions={{
                                modifiers: {
                                    preventOverflow: { enabled: false },
                                    flip: { enabled: false },
                                    hide: { enabled: false },
                                },
                            }}
                        >
                            <FormattedMessage
                                id="settings.btn_view"
                                defaultMessage="View"
                            />
                        </Tooltip>
                    </button>
                </Item>

                <Item>
                    <span>
                        <FormattedMessage
                            id="settings.label_private_vpn"
                            defaultMessage="Private VPN"
                        />
                        <Tooltip
                            arrow={true}
                            animation="shift"
                            position="right"
                            theme="bct"
                            title={SETTING_TIPPY_INFO.PRIVATE_VPN}
                            popperOptions={{
                                modifiers: {
                                    preventOverflow: { enabled: false },
                                    flip: { enabled: false },
                                    hide: { enabled: false },
                                },
                            }}
                        >
                            <span className="symbol_i">i</span>
                        </Tooltip>
                    </span>
                    <SwitchCustom
                        checked={privateVpn}
                        onChange={setPrivateVpn}
                        // readOnly
                        // onMouseEnter={() => { this.toggleKeyModal(true); }}
                        onMouseLeave={() => {
                            this.toggleKeyModal(false);
                        }}
                    />
                </Item>

                <Item>
                    <span>
                        <FormattedMessage
                            id="settings.timer"
                            defaultMessage="Timer (seconds)"
                        />
                        <Tooltip
                            arrow={true}
                            animation="shift"
                            position="right"
                            theme="bct"
                            title={SETTING_TIPPY_INFO.TIMER}
                            popperOptions={{
                                modifiers: {
                                    preventOverflow: { enabled: false },
                                    flip: { enabled: false },
                                    hide: { enabled: false },
                                },
                            }}
                        >
                            <span className="symbol_i">i</span>
                        </Tooltip>
                    </span>
                    <Tooltip
                        arrow={true}
                        animation="shift"
                        position="right"
                        theme="bct"
                        title="Your level is not allowed to change this"
                        popperOptions={{
                            modifiers: {
                                preventOverflow: { enabled: false },
                                flip: { enabled: false },
                                hide: { enabled: false },
                            },
                        }}
                    >
                        <SelectDropdown
                            width={180}
                            value={timer}
                            items={timerList}
                            isSearchable={false}
                            onChange={setTimer}
                        />
                    </Tooltip>
                </Item>

                <Item>
                    <span>
                        <FormattedMessage
                            id="settings.timer"
                            defaultMessage="Initiate Timer"
                        />
                        <Tooltip
                            arrow={true}
                            animation="shift"
                            position="right"
                            theme="bct"
                            title={SETTING_TIPPY_INFO.TIMER_AFTER}
                            popperOptions={{
                                modifiers: {
                                    preventOverflow: { enabled: false },
                                    flip: { enabled: false },
                                    hide: { enabled: false },
                                },
                            }}
                        >
                            <span className="symbol_i">i</span>
                        </Tooltip>
                    </span>
                    <SelectDropdown
                        width={180}
                        value={timerAfter}
                        items={timerAfterList}
                        isSearchable={false}
                        onChange={setTimerAfter}
                    />
                </Item>
            </React.Fragment>
        );

        const privacyList = (
            <React.Fragment>
                <Item>
                    <span>
                        <FormattedMessage
                            id="settings.label_google_2fa"
                            defaultMessage="Google 2FA"
                        />
                        <Tooltip
                            arrow={true}
                            animation="shift"
                            position="right"
                            theme="bct"
                            title={SETTING_TIPPY_INFO.GOOGLE_2FA}
                            popperOptions={{
                                modifiers: {
                                    preventOverflow: { enabled: false },
                                    flip: { enabled: false },
                                    hide: { enabled: false },
                                },
                            }}
                        >
                            <span className="symbol_i">i</span>
                        </Tooltip>
                    </span>
                    <SwitchCustom
                        checked={isGoogle2FA}
                        // onChange={this.toggleKeyModal}
                        // onChange={setGoogle2FA}
                        // onMouseLeave={() => { this.toggleKeyModal(false); }}
                    />
                </Item>
            </React.Fragment>
        );

        const preferenceList = (
            <React.Fragment >
                <Item >
                    <span>
                        <FormattedMessage
                            id="settings.label_real_trading"
                            defaultMessage="Real Trading (Level1 Access)"
                        />

                        <Tooltip
                            arrow={true}
                            animation="shift"
                            position="right"
                            theme="bct"
                            title={SETTING_TIPPY_INFO.REAL_TREADING}
                            popperOptions={{
                                modifiers: {
                                    preventOverflow: { enabled: false },
                                    flip: { enabled: false },
                                    hide: { enabled: false },
                                },
                            }}
                        >
                            <span className="symbol_i">i</span>
                        </Tooltip>
                    </span>
                    <SwitchCustom
                        checked={isRealTrading}
                        onChange={this.setRealTradingWith}
                    />
                </Item>

                <Item>
                    <span>
                        <FormattedMessage
                            id="settings.label_access_level"
                            defaultMessage="Access Level"
                        />

                        <Tooltip
                            arrow={true}
                            animation="shift"
                            position="right"
                            theme="bct"
                            title={SETTING_TIPPY_INFO.ACCESS_LEVEL}
                            popperOptions={{
                                modifiers: {
                                    preventOverflow: { enabled: false },
                                    flip: { enabled: false },
                                    hide: { enabled: false },
                                },
                            }}
                        >
                            <span className="symbol_i">i</span>
                        </Tooltip>
                    </span>

                    <SelectDropdown
                        width={180}
                        value={accessLevel}
                        items={accessLevels}
                        isSearchable={false}
                        alignTop={false}
                        onChange={this.setAccessLevel}
                    />
                </Item>

                <Item>
                    <span>
                        <FormattedMessage
                            id="settings.label_default_fiat"
                            defaultMessage="Default Fiat"
                        />

                        <Tooltip
                            arrow={true}
                            animation="shift"
                            position="right"
                            theme="bct"
                            title={SETTING_TIPPY_INFO.DEFAULT_FIAT}
                            popperOptions={{
                                modifiers: {
                                    preventOverflow: { enabled: false },
                                    flip: { enabled: false },
                                    hide: { enabled: false },
                                },
                            }}
                        >
                            <span className="symbol_i">i</span>
                        </Tooltip>
                    </span>

                    <CurrencySelectDropdown
                        width={180}
                        height={200}
                        type="fiat"
                        isFullScreen
                        // onClick={showLanguageCurrencyModal(ModalPopup, onClose, 'graph-chart-parent', true)}
                    />
                </Item>

                <Item>
                    <span>
                        <FormattedMessage
                            id="settings.label_default_crypto"
                            defaultMessage="Default Crypto"
                        />

                        <Tooltip
                            arrow={true}
                            animation="shift"
                            position="right"
                            theme="bct"
                            title={SETTING_TIPPY_INFO.DEFAULT_CRYPTO}
                            popperOptions={{
                                modifiers: {
                                    preventOverflow: { enabled: false },
                                    flip: { enabled: false },
                                    hide: { enabled: false },
                                },
                            }}
                        >
                            <span className="symbol_i">i</span>
                        </Tooltip>
                    </span>

                    <CurrencySelectDropdown
                        width={180}
                        height={200}
                        type="crypto"
                        isFullScreen
                        disableCrypto
                    />
                </Item>
            </React.Fragment>
        );

        const affiliateList = (
            <React.Fragment>
                <Item>
                    <span className="affliate-label-wrapper">
                        <FormattedMessage
                            id="settings.label_default_url"
                            defaultMessage="Default URL"
                        />

                        <Tooltip
                            arrow={true}
                            animation="shift"
                            position="right"
                            theme="bct"
                            title={SETTING_TIPPY_INFO.DEFAULT_URL}
                            popperOptions={{
                                modifiers: {
                                    preventOverflow: { enabled: false },
                                    flip: { enabled: false },
                                    hide: { enabled: false },
                                },
                            }}
                        >
                            <span className="symbol_i">i</span>
                        </Tooltip>
                    </span>
                    <InputTextCustom
                        // readOnly
                        width={280}
                        value={defaultURL}
                        onChange={setDefaultURL}
                        readOnly
                    />
                </Item>

                <Item>
                    <span className="affliate-label-wrapper">
                        <FormattedMessage
                            id="settings.label_referred_by"
                            defaultMessage="Referred by"
                        />

                        <Tooltip
                            arrow={true}
                            animation="shift"
                            position="right"
                            theme="bct"
                            title={SETTING_TIPPY_INFO.REFERRED_BY}
                            popperOptions={{
                                modifiers: {
                                    preventOverflow: { enabled: false },
                                    flip: { enabled: false },
                                    hide: { enabled: false },
                                },
                            }}
                        >
                            <span className="symbol_i">i</span>
                        </Tooltip>
                    </span>
                    <InputTextCustom
                        width={280}
                        value={referredBy}
                        onChange={setReferredBy}
                        readOnly
                    />
                </Item>

                <Item>
                    <span className="affliate-label-wrapper">
                        <FormattedMessage
                            id="settings.label_affiliate_link"
                            defaultMessage="Affiliate Link"
                        />

                        <Tooltip
                            arrow={true}
                            animation="shift"
                            position="right"
                            theme="bct"
                            title={SETTING_TIPPY_INFO.AFFILIATE_LINK}
                            popperOptions={{
                                modifiers: {
                                    preventOverflow: { enabled: false },
                                    flip: { enabled: false },
                                    hide: { enabled: false },
                                },
                            }}
                        >
                            <span className="symbol_i">i</span>
                        </Tooltip>
                    </span>
                    <InputCustom
                        width={280}
                    />
                </Item>
            </React.Fragment>
        );

        const whitelabel = window.location.hostname;

        const helpdeskList = (
            <React.Fragment>
                <Item>
                    <span>
                        <FormattedMessage
                            id="settings.label_support_center"
                            defaultMessage="Platform Support Center"
                        />
                    </span>
                    {/* eslint-disable-next-line react/jsx-no-target-blank */}
                    <a href={`http://nswebdev.us/helpdesk/?${whitelabel}`} target="_blank">
                        <InputTextCustom
                            // readOnly
                            width={280}
                            value="http://nswebdev.us/helpdesk/"
                            readOnly
                        />
                    </a>
                </Item>
            </React.Fragment>
        );

        const isArbCondition = !isUserDropDownOpen && (convertState !== STATE_KEYS.coinSearch) || isArbOpen;
        return (
            <DropdownWrapper
                gridHeight={gridHeight}
                leftSidebarWidth={leftSidebarWidth}
                isArbCondition={isArbCondition || isExchangesOpen}
            >
                <DropdownMenu isArbCondition={isArbCondition || isExchangesOpen}>
                    <PerfectScrollWrapper
                        scrollTop={true}
                    >
                        {isArbCondition &&
                            <OrderHistoryWrapper>
                                <OrderHistoryTable />
                            </OrderHistoryWrapper>
                        }
                        {isExchangesOpen &&
                            <ExchangeListComponent />
                        }

                        {!isArbCondition && !isExchangesOpen && (
                            <React.Fragment>

                                <Item UserItem header>
                                    <span className="settings-label">SETTINGS</span>
                                    <ThreeDotIcon large onClick={this.props.onClose} />
                                </Item>

                                {/* <DropdownArrow /> */}

                                <DropdownMenuItem
                                    isColumn
                                    isFullHeight
                                    opened={orderHistoryMode}
                                >
                                    <div
                                        className="d-flex"
                                        onClick={this.showTradeHistory}
                                    >
                                        <div className="icon-wrapper">
                                            <HistoryMenuIcon />
                                        </div>
                                        <span
                                            className="label-wrapper"
                                        >
                                            <FormattedMessage
                                                id="settings.history"
                                                defaultMessage="History"
                                            />
                                        </span>
                                    </div>
                                </DropdownMenuItem>

                                {/* <Spacer /> */}

                                {!orderHistoryMode &&
                                <React.Fragment>
                                    <DropdownMenuItem
                                        isColumn
                                        opened={isExchangeListOpen}
                                        isChildOpen={this.state.isExchangeListOpen && !this.state.isChildOpen}
                                    >
                                        <div
                                            className="d-flex"
                                            onClick={this.toggleExchangeList}
                                            // onClick={this.showExchanges}
                                        >
                                            <div className="icon-wrapper">
                                                {/* <HistoryMenuIcon /> */}
                                                <GlobalIcon size={38} marginRight={15} color="#fff"/>
                                            </div>
                                            <span
                                                className="label-wrapper"
                                            >
                                                <FormattedMessage
                                                    id="settings.exchanges"
                                                    defaultMessage="Exchanges"
                                                />
                                            </span>
                                        </div>

                                        {isExchangeListOpen && exchangeList}
                                    </DropdownMenuItem>

                                    <DropdownMenuItem
                                        isColumn
                                        opened={isPreferencesListOpen}
                                    >
                                        <div
                                            className="d-flex"
                                            onClick={this.togglePreferencesList}
                                        >
                                            <div className="icon-wrapper">
                                                <AffiliateMenuIcon />
                                            </div>
                                            <span className="label-wrapper">
                                                <FormattedMessage
                                                    id="settings.preferences"
                                                    defaultMessage="Preferences"
                                                />
                                            </span>
                                            {isPreferencesListOpen ? <CloseIcon/> : <OpenArrow/>}
                                        </div>

                                        {isPreferencesListOpen && preferenceList}
                                    </DropdownMenuItem>

                                    <DropdownMenuItem
                                        isColumn
                                        opened={isPrivacyListOpen}
                                    >
                                        <div
                                            className="d-flex"
                                            onClick={this.togglePrivacyList}
                                        >
                                            <div className="icon-wrapper">
                                                <ActivityMenuIcon />
                                            </div>
                                            <span className="label-wrapper">
                                                <FormattedMessage
                                                    id="settings.privacy"
                                                    defaultMessage="Privacy"
                                                />
                                            </span>
                                            {isPrivacyListOpen ? <CloseIcon/> : <OpenArrow/>}
                                        </div>

                                        {isPrivacyListOpen && privacyList}
                                    </DropdownMenuItem>

                                    <DropdownMenuItem
                                        isColumn
                                        opened={isAffiliateListOpen}
                                    >
                                        <div
                                            className="d-flex"
                                            onClick={this.toggleAffiliateList}
                                        >
                                            <div className="icon-wrapper">
                                                <AffiliateMenuIcon />
                                            </div>
                                            <span className="label-wrapper">
                                                <FormattedMessage
                                                    id="settings.affiliate"
                                                    defaultMessage="Affiliate"
                                                />
                                            </span>
                                            {isAffiliateListOpen ? <CloseIcon/> : <OpenArrow/>}
                                        </div>

                                        {isAffiliateListOpen && affiliateList}
                                    </DropdownMenuItem>

                                    <DropdownMenuItem
                                        isColumn
                                        last
                                        opened={isAdvancedListOpen}
                                    >
                                        <div
                                            className="d-flex"
                                            onClick={this.toggleAdvancedList}
                                        >
                                            <div className="icon-wrapper">
                                                <SettingsMenuIcon />
                                            </div>
                                            <span className="label-wrapper">
                                                <FormattedMessage
                                                    id="settings.advanced"
                                                    defaultMessage="Advanced"
                                                />
                                            </span>
                                            {isAdvancedListOpen ? <CloseIcon/> : <OpenArrow/>}
                                        </div>

                                        {isAdvancedListOpen && advancedList}
                                    </DropdownMenuItem>

                                    <DropdownMenuItem
                                        isColumn
                                        opened={isHelpDeskListOpen}
                                    >
                                        <div
                                            className="d-flex"
                                            onClick={this.toggleHelpDeskList}
                                        >
                                            <div className="icon-wrapper">
                                                <AffiliateMenuIcon/>
                                            </div>
                                            <span className="label-wrapper">
                                                <FormattedMessage
                                                    id="settings.helpdesk"
                                                    defaultMessage="HelpDesk"
                                                />
                                            </span>
                                            {isHelpDeskListOpen ? <CloseIcon/> : <OpenArrow/>}
                                        </div>

                                        {isHelpDeskListOpen && helpdeskList}
                                    </DropdownMenuItem>

                                    {isBackendTelLogin && (
                                        <Item UserItem>
                                            <AvatarImage onClick={this.toggleDropDown}/>

                                            <span className="fullName">
                                                {phoneNumber}
                                                <br />
                                                {accessLevel}
                                            </span>

                                            <button
                                                className="btn_reset"
                                                onClick={this.handleResetBalance}
                                            >
                                                <FormattedMessage
                                                    id="settings.btn_reset"
                                                    defaultMessage="Reset"
                                                />
                                            </button>

                                            <SettingsBtn onClick={this.handleLogoutBtn}>
                                                <FormattedMessage
                                                    id="settings.btn_logout"
                                                    defaultMessage="Logout"
                                                />
                                            </SettingsBtn>
                                        </Item>
                                    )}

                                    <LanguageWrapper>
                                        <LanguageSelectDropdown
                                            width={180}
                                            height={200}
                                            isFullScreen
                                            value={language}
                                            items={languagesArray}
                                            onChange={this.handleLanguage}
                                        />
                                    </LanguageWrapper>
                                </React.Fragment>
                                }
                            </React.Fragment>
                        )}
                    </PerfectScrollWrapper>
                </DropdownMenu>

                <KeyModal
                    toggleModal={this.toggleKeyModal}
                    hoverMode
                    inLineMode
                    isModalOpen={isKeyModalOpen}
                />

                <LogoutModal
                    toggleModal={toggleLogoutModal}
                    inLineMode
                    backdropClose
                    isModalOpen={isLogoutModalOpen}
                />
            </DropdownWrapper>
        );
    }
}

export default inject(
    STORE_KEYS.ORDERHISTORY,
    STORE_KEYS.TELEGRAMSTORE,
    STORE_KEYS.YOURACCOUNTSTORE,
    STORE_KEYS.PORTFOLIODATASTORE,
    STORE_KEYS.SETTINGSSTORE,
    STORE_KEYS.INSTRUMENTS,
    STORE_KEYS.CONVERTSTORE,
    STORE_KEYS.MODALSTORE,
    STORE_KEYS.VIEWMODESTORE,
)(observer(UserAvatarPopupMenu));
