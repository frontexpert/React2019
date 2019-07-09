import { observable, action, reaction } from 'mobx';
import { darkTheme } from '../theme/core';

export const viewModeKeys = {
    basicModeKey: 'basic', // Wallet Table view mode
    friendModeKey: 'friend', // Telegram Friend list view mode
    publicChatModeKey: 'chat', // Telegram Public Coin's channel view mode
    advancedModeKey: 'advanced', // Global Order Book view mode
    exchangesModeKey: 'exchanges', // Exchanges list view mode
    settingsModeKey: 'settings', // Settings view mode
    historyModeKey: 'history', // History view mode
    depositModeKey: 'deposit', // Deposit view mode
};

export const settingsViewModeKeys = {
    privacyList: 'privacyList',
    affiliateList: 'affiliateList',
    advancedList: 'advancedList',
};

const StateSequence = new Set([
    viewModeKeys.basicModeKey,
    viewModeKeys.friendModeKey,
    viewModeKeys.publicChatModeKey,
    viewModeKeys.advancedModeKey,
    viewModeKeys.exchangesModeKey,
    viewModeKeys.settingsModeKey,
    viewModeKeys.historyModeKey,
    viewModeKeys.depositModeKey
]);

class ViewModeStore {
    @observable viewMode;
    @observable theme = darkTheme;
    @observable isFullScreen = false;
    @observable depthChartMode = false;
    @observable orderHistoryMode = false;
    @observable isSidebarOpen = false;
    @observable tradingViewMode = false;
    @observable isSearchEnabled = false;
    @observable isGBExistMonitor = false; // TRUE: state of checking if data stream exists; FALSE: state of unchecking.
    @observable depositActiveCoin = null;
    @observable isUserDropDownOpen = false;
    @observable isSettingsOpen = false;
    @observable settingsViewMode = settingsViewModeKeys.advancedList; // Which group of settings items to show
    @observable graphSwitchMode = false; // false: donut, true: portfolio
    @observable isFirstLoad = true; // true: first-loading
    @observable isAdvancedAPIMode = false;
    @observable rightTopSectionGridMode = 'graph';
    @observable masterSwtichMode = false;

    statesSequence = null;

    constructor() {
        this.gotoFirstState();
    }

    /**
     *  ViewMode State Control
     */
    @action.bound gotoFirstState() {
        this.__initStateSequence();
        this.viewMode = this.__nextState();
    }

    @action.bound progressState() {
        this.viewMode = this.__nextState();
    }

    __initStateSequence() {
        this.statesSequence = StateSequence.values();
    }

    __nextState() {
        const nextState = this.statesSequence.next();

        if (nextState.done) {
            this.__initStateSequence();
            return this.statesSequence.next().value;
        }

        return nextState.value;
    }

    /**
     *  Observable actions
     */
    @action.bound setViewMode(viewMode) {
        this.isSearchEnabled = false;

        if (viewMode === this.viewMode) { return; }
        this.viewMode = viewMode;

        let state = '';
        do {
            state = this.__nextState();
        } while (state !== viewMode);
    }

    @action.bound toggleFullmode() {
        this.isFullScreen = !this.isFullScreen;
    }

    @action.bound toggleDepthChartMode() {
        this.depthChartMode = !this.depthChartMode;
    }

    @action.bound showDepthChartMode(mode) {
        this.depthChartMode = mode;
    }

    @action.bound toggleOrderHistoryMode(mode) {
        this.orderHistoryMode = mode;
    }

    @action.bound toggleSidebarOpen(isSidebarOpen) {
        if (typeof isSidebarOpen === 'boolean') {
            this.isSidebarOpen = isSidebarOpen;
        } else {
            this.isSidebarOpen = !this.isSidebarOpen;
        }
    }

    @action.bound setTradingViewMode(mode) {
        this.tradingViewMode = mode;
    }

    @action.bound setRightTopSectionGridMode(mode) {
        this.rightTopSectionGridMode = mode;
    }

    @action.bound toggleSearchEnabled(isSearchEnabled) {
        this.isSearchEnabled = (typeof isSearchEnabled === 'boolean') ? isSearchEnabled : !this.isSearchEnabled;
    }

    @action.bound setGBExistMonitor(mode) {
        this.isGBExistMonitor = mode;
    }

    @action.bound openDepositView(coin) {
        this.depositActiveCoin = coin;
    }

    @action.bound setUserDropDownOpen(mode) {
        this.isUserDropDownOpen = mode;
    }

    @action.bound setSettingsOpen(mode) {
        this.isSettingsOpen = mode;
    }

    @action.bound openSettingsView(mode) {
        this.isUserDropDownOpen = false;
        this.isSettingsOpen = true;
        this.settingsViewMode = mode;
        this.setViewMode(viewModeKeys.settingsModeKey);
    }

    @action.bound setGraphSwitchMode(mode) {
        if (this.masterSwtichMode === false) this.graphSwitchMode = mode;
    }

    @action.bound setMasterSwitchMode(mode) {
        this.masterSwtichMode = mode;
        this.graphSwitchMode = mode;
    }

    @action.bound setIsFirstLoad(mode) {
        this.isFirstLoad = mode;
    }

    @action.bound setAdvancedAPIMode(mode) {
        this.isAdvancedAPIMode = mode;
    }
}

export default () => {
    const store = new ViewModeStore();
    return store;
};
