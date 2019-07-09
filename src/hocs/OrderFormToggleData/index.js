import { inject } from 'mobx-react';
import { compose } from 'recompose';

import { STORE_KEYS } from '../../stores';

const {
    ORDERFORMTOGGLE,
    TELEGRAMSTORE,
    ORDERBOOKBREAKDOWN,
    INSTRUMENTS,
    YOURACCOUNTSTORE,
    VIEWMODESTORE,
    CONVERTSTORE,
    SESSIONSTORE,
    LOWESTEXCHANGESTORE,
    SETTINGSSTORE,
} = STORE_KEYS;

export const withOrderFormToggleData = compose(
    inject(stores => ({
        toggleMode: stores[ORDERFORMTOGGLE].toggleMode,
        toggleViewMode: stores[ORDERFORMTOGGLE].toggleViewMode,
        showOrderForm: stores[ORDERFORMTOGGLE].showOrderForm,
        viewMode: stores[VIEWMODESTORE].viewMode,
        depthChartMode: stores[VIEWMODESTORE].depthChartMode,
        showDepthChartMode: stores[VIEWMODESTORE].showDepthChartMode,
        toggleOrderHistoryMode: stores[VIEWMODESTORE].toggleOrderHistoryMode,
        setUserDropDownOpen: stores[VIEWMODESTORE].setUserDropDownOpen,
        isUserDropDownOpen: stores[VIEWMODESTORE].isUserDropDownOpen,
        isArbitrageMode: stores[SETTINGSSTORE].isArbitrageMode,
        isTelegramLoaded: stores[TELEGRAMSTORE].isLoaded,
        isProfileLogoExists: stores[TELEGRAMSTORE].isProfileLogoExists,
        logoURL: stores[TELEGRAMSTORE].logoURL,
        setLoginBtnLocation: stores[TELEGRAMSTORE].setLoginBtnLocation,
        isBaseQuotesLoaded: stores[INSTRUMENTS].isLoaded,
        baseFromInstrument: stores[INSTRUMENTS].selectedBase,
        quoteFromInstrument: stores[INSTRUMENTS].selectedQuote,
        selectedBase: stores[ORDERBOOKBREAKDOWN].base,
        selectedQuote: stores[ORDERBOOKBREAKDOWN].quote,
        isAccountStoreLoaded: stores[YOURACCOUNTSTORE].isLoaded,
        convertState: stores[CONVERTSTORE].convertState,
        isLoggedIn: stores[TELEGRAMSTORE].isLoggedIn,
        isRegularMarket: stores[SESSIONSTORE].isRegularMarket,
        exchangeIndex: stores[LOWESTEXCHANGESTORE].exchangeIndex,
    })),
);
