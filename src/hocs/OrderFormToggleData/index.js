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
    EXCHANGESSTORE,
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
        isTelegramLoaded: stores[TELEGRAMSTORE].isLoaded,
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
        isArbitrageMode: stores[SETTINGSSTORE].isArbitrageMode,
        tradeColStatus: stores[SETTINGSSTORE].tradeColStatus,
        marketExchanges: stores[EXCHANGESSTORE].marketExchanges,
        exchanges: stores[EXCHANGESSTORE].exchanges,
    })),
);
