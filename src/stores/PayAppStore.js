import { observable, action } from 'mobx';

import { GetClaimedTransferNotification } from '../lib/bct-ws';

const throttleMs = 100;

export const payViewModeKeys = {
    payHistoryModeKey: 'pay-history-view', // tab 1
    payCalcModeKey: 'pay-calc-view', // tab 2
    payChooseModeKey: 'pay-currency-choose', // tab 3
    payScanModeKey: 'pay-scan-view', // tab 4
    payQRCodeModeKey: 'pay-qrcode-view',
    payScanConfirmModeKey: 'pay-scan-confirm-view',
};

export const claimModeKeys = {
    initialModeKey: 'init-mode',
    loadingModeKey: 'loading-mode',
    doneModeKey: 'done-mode',
};

class PayAppStore {
    @observable payViewMode = '';
    @observable qrObj = null;
    @observable claimNotify = null;
    @observable payAmount = 0;
    @observable backMode = false;

    GetClaimedTransferNotification$ = null;
    __subscriptionInited = false;

    constructor() {
        this.payViewMode = payViewModeKeys.payChooseModeKey;
        this.GetClaimedTransferNotification$ = GetClaimedTransferNotification({ throttleMs });
        if (!this.__subscriptionInited) {
            this.GetClaimedTransferNotification$.subscribe({ next: this.handleIncomingClaimedNotification.bind(this) });
            this.__subscriptionInited = true;
        }
        this.claimNotify = claimModeKeys.initialModeKey;
    }

    handleIncomingClaimedNotification(data) {
        // Amount: "0.080911456624898860"
        // Coin: "btc"
        // Executor: {FullName: null}
        // TrId: "c2c734b80f7a46e3903b0f69d208d6032a7556823f9c4d1cb9cc514bd0ecd56af34046ae595045bfb4d211140e3cca21"
        if (data && data.TrId) {
            this.claimNotify = claimModeKeys.loadingModeKey;
            setTimeout(() => {
                this.claimNotify = claimModeKeys.doneModeKey;
            }, 10000);
        }
    }

    @action.bound switchAppContentView(mode) {
        this.payViewMode = mode;
    }

    @action.bound setQrObject(qObj) {
        this.qrObj = qObj;
    }

    @action.bound setClaimNotify(mode) {
        this.claimNotify = mode;
    }

    @action.bound setPayAmount(amt, backMode) {
        this.payAmount = amt;
        this.backMode = backMode;
    }
}

export default () => {
    const store = new PayAppStore();
    return store;
};
