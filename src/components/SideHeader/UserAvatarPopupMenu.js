import React from 'react';
import { inject, observer } from 'mobx-react';
import { FormattedMessage } from 'react-intl';
import { Tooltip } from 'react-tippy';

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
    DownArrow,
    OpenArrow,
    CloseIcon,
    Tab
} from './Components';
import PerfectScrollWrapper from '../../components-generic/PerfectScrollWrapper';
import {
    ActivityMenuIcon,
    AffiliateMenuIcon,
    HistoryMenuIcon,
    SettingsMenuIcon
} from './icons';
import {
    ImageWrapper
} from './UserAvatarComponent';
import OrderHistoryTable from '../OrderHistory/OrderHistoryTable';
import SelectDropdown from '../../components-generic/SelectDropdown';
import {
    accessLevels,
    autoFlips,
    c1s,
    c2s,
    swaps,
    timerList
} from '../SideBar/NewSettingsPop/mock';
import SwitchCustom from '../../components-generic/SwitchCustom';
import { languages } from '../../lib/translations/languages';
import KeyModal from '../KeyModal';
import LogoutModal from '../LogoutModal';
import CurrencySelectDropdown from '../../components-generic/SelectDropdown/CurrencySelectDropdown';
import LanguageSelectDropdown from '../../components-generic/SelectDropdown/LanguageSelectDropdown';
import InputCustom from '../../components-generic/InputCustom';
import LanguageCurrencyModal from '../Modals/LanguageCurrencyModal';
import SendCoinsModal from '../SendCoinsModal';
import SeedWordsModal from '../SeedWordsModal';

const showLanguageCurrencyModal = (Modal, onClose, portal, additionalVerticalSpace) => () => {
    return Modal({
        portal,
        additionalVerticalSpace,
        ModalComponentFn: () => <LanguageCurrencyModal portal={portal} onClose={onClose} />,
    });
};

class UserAvatarPopupMenu extends React.Component {
    state = {
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
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResizeWindow);
    }

    handleResizeWindow = () => {
        this.forceUpdate();
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

        if (!this.props[STORE_KEYS.VIEWMODESTORE].orderHistoryMode) {
            this.props[STORE_KEYS.ORDERHISTORY].requestOrderHistory();
            this.props[STORE_KEYS.SETTINGSSTORE].getOrderHistory();
            this.props[STORE_KEYS.VIEWMODESTORE].toggleOrderHistoryMode(true);
        } else {
            this.props[STORE_KEYS.VIEWMODESTORE].toggleOrderHistoryMode(false);
        }

        this.setState({
            isKeyModalOpen: false,
            isAdvancedListOpen: false,
            isPrivacyListOpen: false,
            isAffiliateListOpen: false,
            isPreferencesListOpen: false,
            isHelpDeskListOpen: false,
        });
        // this.props.onClose();
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
        // this.props[STORE_KEYS.VIEWMODESTORE].toggleOrderHistoryMode(false);
        if (this.props[STORE_KEYS.SETTINGSSTORE].isArbitrageMode) {
            this.props[STORE_KEYS.SETTINGSSTORE].setArbitrageMode();
        }
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

    toggleAdvancedList = (isOpen) => {
        this.setState(prevState => ({
            isAdvancedListOpen: (typeof isOpen === 'boolean') ? isOpen : !prevState.isAdvancedListOpen,
            isKeyModalOpen: false,
            isPrivacyListOpen: false,
            isAffiliateListOpen: false,
            isPreferencesListOpen: false,
            isHelpDeskListOpen: false,
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
        }));
        this.props[STORE_KEYS.VIEWMODESTORE].toggleOrderHistoryMode(false);
    };

    handleLogoutBtn = () => {
        this.props.toggleLogoutModal(true);
    };

    setAccessLevel = (accessLevel) => {
        const { referredBy, setAccessLevel } = this.props[STORE_KEYS.SETTINGSSTORE];
        const { Modal } = this.props[STORE_KEYS.MODALSTORE];

        if (accessLevel !== 'Level 1') {
            Modal({
                portal: 'graph-chart-parent',
                ModalComponentFn: () => (
                    <SendCoinsModal
                        coin="USDT"
                        name={referredBy}
                        user={{
                            name: referredBy,
                        }}
                        onFinish={() => {
                            setAccessLevel(accessLevel);
                        }}
                    />
                ),
            });
        } else {
            setAccessLevel(accessLevel);
        }
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

    render() {
        const {
            isKeyModalOpen,
            isAdvancedListOpen,
            isPrivacyListOpen,
            isAffiliateListOpen,
            isPreferencesListOpen,
            isHelpDeskListOpen,
            tab,
        } = this.state;

        const {
            isLoggedIn,
            loggedInUser,
            logoURL,
            isProfileLogoExists,
        } = this.props[STORE_KEYS.TELEGRAMSTORE];

        const {
            isShortSell, isArbitrageMode, isRealTrading, defaultTelegram, isExporting, defaultURL, isGoogle2FA,
            setRealTrading, setShortSell, setArbitrageMode, setArbitrageModeWith, setDefaultTelegram, setExportTrading, setDefaultURL, setGoogle2FA,
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
            slider, setSlider,
            timer, setTimer,
        } = this.props[STORE_KEYS.SETTINGSSTORE];

        const {
            setViewMode,
            setSettingsOpen,
            settingsViewMode,
            orderHistoryMode,
        } = this.props[STORE_KEYS.VIEWMODESTORE];

        const {
            convertState,
        } = this.props[STORE_KEYS.CONVERTSTORE];

        const {
            isLogoutModalOpen,
            toggleLogoutModal,
            isArbitrageMonitorMode,
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

        const phoneNumber = localStorage.getItem('phoneNumber');

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
        const { Modal: ModalPopup, onClose } = this.props[STORE_KEYS.MODALSTORE];
        const storeCreditStr = formatNegativeNumber(format7DigitString(storeCredit)).replace('+', '');

        const {
            gridHeight,
            leftSidebarWidth,
        } = getScreenInfo();

        const advancedList = (
            <React.Fragment>
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
                            defaultMessage="Timer"
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
                    <SelectDropdown
                        width={180}
                        value={timer}
                        items={timerList}
                        isSearchable={false}
                        onChange={setTimer}
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
                {/*
                <Item>
                    <span>
                        <FormattedMessage
                            id="settings.label_demomode"
                            defaultMessage="Demo Mode"
                        />

                        <Tooltip
                            arrow={true}
                            animation="shift"
                            position="right"
                            theme="bct"
                            title={SETTING_TIPPY_INFO.DEMO_MODE}
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
                        className="btn_reset"
                        onClick={this.handleResetBalance}
                    >
                        <FormattedMessage
                            id="settings.btn_reset"
                            defaultMessage="Reset"
                        />
                    </button>
                </Item>
                */}

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
                        // onClick={showLanguageCurrencyModal(ModalPopup, onClose, 'graph-chart-parent', true)}
                    />
                </Item>

                <Item>
                    <span>
                        <FormattedMessage
                            id="settings.label_language"
                            defaultMessage="Language"
                        />

                        <Tooltip
                            arrow={true}
                            animation="shift"
                            position="right"
                            theme="bct"
                            title={SETTING_TIPPY_INFO.LANGUAGE}
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

                    <LanguageSelectDropdown
                        width={180}
                        height={200}
                        isFullScreen
                        value={language}
                        items={languagesArray}
                        onChange={this.handleLanguage}
                        // onClick={showLanguageCurrencyModal(ModalPopup, onClose, 'graph-chart-parent', true)}
                    />

                    {/*
                    <SelectDropdown
                        width={180}
                        value={language}
                        items={languagesArray}
                        alignTop={false}
                        onChange={this.handleLanguage}
                        // onClick={showLanguageCurrencyModal(ModalPopup, onClose, 'graph-chart-parent', true)}
                    />
                    */}
                    {/*
                    <InputTextCustom
                        width={180}
                        value={language}
                        readOnly
                        clickable
                        onClick={showLanguageCurrencyModal(ModalPopup, onClose, 'graph-chart-parent', true)}
                    />
                    */}
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

        const helpdeskList = (
            <React.Fragment>
                <Item>
                    <span>
                        <FormattedMessage
                            id="setting.label_user_guide"
                            defaultMessage="Blockchain Terminal Users Guide"
                        />
                    </span>
                    <a href="http://nswebdev.us/helpdesk/category/blockchain-terminal-users-guide/">
                        <InputTextCustom
                            // readOnly
                            width={280}
                            value="http://nswebdev.us/helpdesk/category/blockchain-terminal-users-guide/"
                            // onChange={setDefaultURL}
                            readOnly
                        />
                    </a>

                </Item>

                <Item>
                    <span>
                        <FormattedMessage
                            id="setting.label_about_bct"
                            defaultMessage="About the Blockchain Terminal"
                        />
                    </span>
                    <a href="http://nswebdev.us/helpdesk/category/about-the-blockchain-terminal/">
                        <InputTextCustom
                            // readOnly
                            width={280}
                            value="http://nswebdev.us/helpdesk/category/about-the-blockchain-terminal/"
                            onChange={setDefaultURL}
                            readOnly
                        />
                    </a>
                </Item>

                <Item>
                    <span>
                        <FormattedMessage
                            id="setting.label_account_management"
                            defaultMessage="Account Management"
                        />
                    </span>
                    <a href="https://nswebdev.us/helpdesk/category/account-management/">
                        <InputTextCustom
                            // readOnly
                            width={280}
                            value="http://nswebdev.us/helpdesk/category/account-management/"
                            onChange={setDefaultURL}
                            readOnly
                        />
                    </a>
                </Item>

                <Item>
                    <span>
                        <FormattedMessage
                            id="setting.label_buy_sell"
                            defaultMessage="Buy and Sell"
                        />
                    </span>
                    <a href="http://nswebdev.us/helpdesk/category/buy-and-sell/">
                        <InputTextCustom
                        // readOnly
                            width={280}
                            value="http://nswebdev.us/helpdesk/category/buy-and-sell/"
                            onChange={setDefaultURL}
                            readOnly
                        />
                    </a>
                </Item>

                <Item>
                    <span>
                        <FormattedMessage
                            id="setting.label_custodians_wallets"
                            defaultMessage="Custodians / Wallets"
                        />
                    </span>
                    <a href="http://nswebdev.us/helpdesk/category/custodians-wallets/">
                        <InputTextCustom
                            // readOnly
                            width={280}
                            value="http://nswebdev.us/helpdesk/category/custodians-wallets/"
                            onChange={setDefaultURL}
                            readOnly
                        />
                    </a>
                </Item>

                <Item>
                    <span>
                        <FormattedMessage
                            id="setting.label_customer_support"
                            defaultMessage="Customer Support"
                        />
                    </span>
                    <a href="http://nswebdev.us/helpdesk/category/customer-support/">
                        <InputTextCustom
                            // readOnly
                            width={280}
                            value="http://nswebdev.us/helpdesk/category/customer-support/"
                            onChange={setDefaultURL}
                            readOnly
                        />
                    </a>
                </Item>

                <Item>
                    <span>
                        <FormattedMessage
                            id="setting.label_digital_currency"
                            defaultMessage="Digital Currency"
                        />
                    </span>
                    <a href="http://nswebdev.us/helpdesk/category/digital-currency/">
                        <InputTextCustom
                            // readOnly
                            width={280}
                            value="http://nswebdev.us/helpdesk/category/digital-currency/"
                            onChange={setDefaultURL}
                            readOnly
                        />
                    </a>
                </Item>

                <Item>
                    <span>
                        <FormattedMessage
                            id="setting.label_exchanges"
                            defaultMessage="Exchanges"
                        />
                    </span>
                    <a href="http://nswebdev.us/helpdesk/category/exchanges/">
                        <InputTextCustom
                            // readOnly
                            width={280}
                            value="http://nswebdev.us/helpdesk/category/exchanges/"
                            onChange={setDefaultURL}
                            readOnly
                        />
                    </a>
                </Item>

                <Item>
                    <span>
                        <FormattedMessage
                            id="setting.label_privacy"
                            defaultMessage="Privacy"
                        />
                    </span>
                    <a href="http://nswebdev.us/helpdesk/category/privacy/">
                        <InputTextCustom
                            // readOnly
                            width={280}
                            value="http://nswebdev.us/helpdesk/category/privacy/"
                            onChange={setDefaultURL}
                            readOnly
                        />
                    </a>
                </Item>

                <Item>
                    <span>
                        <FormattedMessage
                            id="setting.label_security"
                            defaultMessage="Security"
                        />
                    </span>
                    <a href="http://nswebdev.us/helpdesk/category/security/">
                        <InputTextCustom
                            // readOnly
                            width={280}
                            value="http://nswebdev.us/helpdesk/category/security/"
                            onChange={setDefaultURL}
                            readOnly
                        />
                    </a>
                </Item>

                <Item>
                    <span>
                        <FormattedMessage
                            id="setting.label_what_blockchain"
                            defaultMessage="What is Blockchain"
                        />
                    </span>
                    <a href="http://nswebdev.us/helpdesk/category/what-is-blockchain/">
                        <InputTextCustom
                            // readOnly
                            width={280}
                            value="http://nswebdev.us/helpdesk/category/what-is-blockchain/"
                            onChange={setDefaultURL}
                            readOnly
                        />
                    </a>
                </Item>

            </React.Fragment>
        );

        // const isArbCondition = isArbitrageMode && convertState !== STATE_KEYS.coinSearch && isArbOpen;
        return (
            <DropdownWrapper
                gridHeight={gridHeight}
                leftSidebarWidth={leftSidebarWidth}
                isArbCondition={isArbitrageMonitorMode}
            >
                <DropdownMenu isArbCondition={isArbitrageMonitorMode}>
                    <PerfectScrollWrapper
                        scrollTop={false}
                    >
                        {
                            (isArbitrageMonitorMode) ? (
                                <OrderHistoryWrapper>
                                    <OrderHistoryTable />
                                </OrderHistoryWrapper>
                            ) : (
                                <React.Fragment>
                                    {isBackendTelLogin && (
                                        <Item UserItem>
                                            {/*
                                            <ImageWrapper onClick={this.toggleDropDown}>
                                                <AvatarWrapper>
                                                    <DefaultAvatar color={getItemColor(userName).hexColor}>
                                                        {symbolName.toUpperCase()}
                                                    </DefaultAvatar>

                                                    {isProfileLogoExists && (
                                                        <img
                                                            alt=""
                                                            className="user-pic"
                                                            src={logoURL}
                                                        />
                                                    )}
                                                </AvatarWrapper>

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
                                            </ImageWrapper>
                                            */}

                                            <span className="fullName">{phoneNumber}</span>

                                            <SettingsBtn onClick={this.handleLogoutBtn}>
                                                <FormattedMessage
                                                    id="settings.btn_logout"
                                                    defaultMessage="Logout"
                                                />
                                            </SettingsBtn>
                                        </Item>
                                    )}

                                    {/*
                                    <DropdownArrow />
                                    */}

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

                                            {orderHistoryMode && isLoggedIn && (
                                                <button
                                                    className="btn_reset"
                                                    onClick={this.handleResetBalance}
                                                >
                                                    <FormattedMessage
                                                        id="settings.btn_reset"
                                                        defaultMessage="Reset"
                                                    />
                                                </button>
                                            )}
                                            {orderHistoryMode && (
                                                <Tab active={tab === 'all'} onClick={(e) => this.changeTab('all', e)}>
                                                    <FormattedMessage
                                                        id="order_history.label_all"
                                                        defaultMessage="All"
                                                    />
                                                </Tab>
                                            )}
                                            {orderHistoryMode && (
                                                <Tab marginRight active={tab === 'open'} onClick={(e) => this.changeTab('open', e)}>
                                                    <FormattedMessage
                                                        id="order_history.label_open"
                                                        defaultMessage="Open"
                                                    />
                                                </Tab>
                                            )}
                                            {orderHistoryMode ? <CloseIcon/> : <OpenArrow/>}
                                        </div>

                                        {orderHistoryMode && (
                                            <OrderHistoryWrapper>
                                                <OrderHistoryTable
                                                    tab={tab}
                                                    gridHeight={gridHeight}
                                                    isFromSettings
                                                />
                                            </OrderHistoryWrapper>
                                        )}
                                    </DropdownMenuItem>

                                    {/* <Spacer /> */}

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
                                </React.Fragment>
                            )
                        }
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
