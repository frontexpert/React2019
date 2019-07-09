import React from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';

import OrderBookRecentTradesContainer from '../components/OrderBookRecentTradesContainer';
import Telegram from '../components/Telegram';
// import PayApp from '../components/PayApp/PayWindow';
// import PayApp from '../components/PayApp';
import PayApp from '../components/CryptoApp';
import SettingsPanel from '../components/SettingsPanel';
import ExchangeCellsV2 from '../components/GraphTool/ExchangeCellsV2';
import { STORE_KEYS } from '../stores';
import { viewModeKeys } from '../stores/ViewModeStore';
import { format2DigitString } from '../utils';
import DepositView from '../components/DepositView';
import { payViewModeKeys } from '../stores/PayAppStore';

const StyledLeftTopSectionGrid = styled.div`
    position: relative;
    grid-area: lefttopsection;
    
    & > div {
        ${props => props.isSidebarOpen
        ? `
            transition: 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
            margin-left: 37px !important;
            width: calc(100% - 37px) !important;
        `
        : `
            transition: none !important;
            margin-left: 0 !important;;
            width: 100% !important;;
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
        const url = window.location.href;
        const coinTransferInfo = url ? url.split('cointransfer')[1] : '';
        if (coinTransferInfo && coinTransferInfo !== '') {
            const {
                [STORE_KEYS.SENDCOINSTORE]: { requestDetailsPrivate, requestDetailsPublic },
            } = this.props;
            const { isLoggedIn } = this.props[STORE_KEYS.TELEGRAMSTORE];
            const uniqueId = coinTransferInfo ? coinTransferInfo.split('.')[0] : '';

            if (isLoggedIn) {
                requestDetailsPrivate(uniqueId).then(res => {
                    setTimeout(() => {
                        this.showSendCoinConfirm(uniqueId, res.Coin, res.Amount, res.DefaultCurrency, res.FullName, res.Status, isLoggedIn);
                    }, 4000);

                });
            } else {
                requestDetailsPublic(uniqueId).then(res => {
                    setTimeout(() => {
                        this.showSendCoinConfirm(uniqueId, res.Coin, res.Amount, res.DefaultCurrency, res.FullName, res.Status, isLoggedIn);
                    }, 4000);
                });
            }
        }
    }

    showSendCoinConfirm = (uniqueId, coin, amount, defaultCurrency, fullName, status, isLoggedIn) => {
        if (coin && (coin !== '') && amount && (amount !== '')) {
            const {
                getCoinPrice, defaultFiatSymbol, isDefaultCrypto, getDefaultPrice,
            } = this.props[STORE_KEYS.SETTINGSSTORE];
            const { setQrObject, switchAppContentView } = this.props[STORE_KEYS.PAYAPPSTORE];

            let labelAmount = '';
            if (!isDefaultCrypto) {
                labelAmount = defaultFiatSymbol + format2DigitString(getDefaultPrice(getCoinPrice(coin.toUpperCase()) * amount));
            } else {
                labelAmount = format2DigitString(amount) + ' ' + coin.toUpperCase();
            }
            setQrObject({
                uniqueId,
                coin,
                fullName,
                amount,
                labelAmount,
                isLoggedIn,
            });
            switchAppContentView(payViewModeKeys.payScanConfirmModeKey);
        }
    };

    render() {
        const {
            viewMode, isSidebarOpen, depositActiveCoin, isSettingsOpen, setUserDropDownOpen,
        } = this.props[STORE_KEYS.VIEWMODESTORE];
        const { isOrderBookBreakDownStop, isOrderBookDataLoaded } = this.props[STORE_KEYS.ORDERBOOKBREAKDOWN];
        const { isNoExchanges } = this.props[STORE_KEYS.LOWESTEXCHANGESTORE];
        const { isEmptyExchange } = this.props[STORE_KEYS.EXCHANGESSTORE];
        const { isLoggedIn } = this.props[STORE_KEYS.TELEGRAMSTORE];
        const { isUserDropDownOpen } = this.props[STORE_KEYS.VIEWMODESTORE];
        const {
            isMobileDevice,
        } = this.props;
        let SelectedComponent = PayApp;
        if (isSettingsOpen) {
            SelectedComponent = SettingsPanel;
        } else if (viewMode === viewModeKeys.basicModeKey) {
            SelectedComponent =  isMobileDevice
                ? PayApp
                : (depositActiveCoin !== null
                    ? DepositView
                    : ((!isOrderBookBreakDownStop && isOrderBookDataLoaded && !isEmptyExchange)
                        ? OrderBookRecentTradesContainer
                        : (!isNoExchanges ? ExchangeCellsV2 : SettingsPanel)));
        } else if (viewMode === viewModeKeys.advancedModeKey) {
            SelectedComponent = (!isOrderBookBreakDownStop && isOrderBookDataLoaded && !isEmptyExchange)
                ? OrderBookRecentTradesContainer
                : (!isNoExchanges ? ExchangeCellsV2 : SettingsPanel);
        } else if (viewMode === viewModeKeys.friendModeKey) {
            SelectedComponent = Telegram;
        } else if (viewMode === viewModeKeys.publicChatModeKey) {
            SelectedComponent = Telegram;
        } else if (viewMode === viewModeKeys.settingsModeKey) {
            SelectedComponent = SettingsPanel;
        } else if (viewMode === viewModeKeys.exchangesModeKey) {
            SelectedComponent = ExchangeCellsV2;
        }

        return (
            <StyledLeftTopSectionGrid isSidebarOpen={isSidebarOpen} id="left-sidebar">
                <SelectedComponent/>
            </StyledLeftTopSectionGrid>
        );
    }
}

export default withStyles(styles)(inject(
    STORE_KEYS.VIEWMODESTORE,
    STORE_KEYS.LOWESTEXCHANGESTORE,
    STORE_KEYS.SENDCOINSTORE,
    STORE_KEYS.TELEGRAMSTORE,
    STORE_KEYS.MODALSTORE,
    STORE_KEYS.SETTINGSSTORE,
    STORE_KEYS.PAYAPPSTORE,
    STORE_KEYS.EXCHANGESSTORE,
    STORE_KEYS.ORDERBOOKBREAKDOWN
)(observer(LeftTopSectionGrid)));
