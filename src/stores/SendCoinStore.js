import React from 'react';
import { observable, action } from 'mobx';
import {
    InitTransferRequest,
    TransferInfoDetailedRequest,
    TransferInfoRequest,
    ClaimTransfer,
    TransferHistoryRequest,
    CancelTransferRequest
} from '../lib/bct-ws';

class SendCoinStore {
    @observable uniqueAddress = '';

    @observable transferHistory = [];
    @observable isFetchingTransferHistory = false;

    constructor(snackBar) {
        this.snackBar = snackBar;
    }

    @action.bound initTransferRequest(coin, amount, currency) {
        this.uniqueAddress = '';
        return new Promise((resolve, reject) => {
            InitTransferRequest(coin, amount, currency).then(res => {
                this.uniqueAddress = res.TrId || '';
                resolve({});
            });
        });
    }

    @action.bound requestDetailsPrivate(uniqueId) {
        return new Promise((resolve, reject) => {
            TransferInfoDetailedRequest(uniqueId).then(res => {
                resolve({
                    Coin: res.Coin || '',
                    Amount: res.Amount || '',
                    DefaultCurrency: res.DefaultCurrency || '',
                    FullName: res.FullName || '',
                    Status: res.Status || '',
                });
            });
        });
    }

    @action.bound requestDetailsPublic(uniqueId) {
        return new Promise((resolve, reject) => {
            TransferInfoRequest(uniqueId).then(res => {
                resolve({
                    Coin: res.Coin || '',
                    Amount: res.Amount || '',
                    DefaultCurrency: res.DefaultCurrency || '',
                    FullName: res.FullName || '',
                    Status: res.Status || '',
                });
            });
        });
    }

    @action.bound claimTransfer(uniqueId) {
        if (uniqueId !== '') {
            return new Promise((resolve, reject) => {
                ClaimTransfer(uniqueId).then(res => {
                    // console.log('[claim res]', res);
                    resolve({
                        status: res.Status,
                        msg: res.Message,
                    });
                });
            });
        }
    }

    @action.bound requestTransferHistory() {
        this.isFetchingTransferHistory = true;

        return TransferHistoryRequest()
            .then(res => {
                this.isFetchingTransferHistory = false;
                try {
                    res.sort(function compare(a, b) {
                        let dateA = new Date(a.CreatedAt);
                        let dateB = new Date(b.CreatedAt);
                        return dateB - dateA;
                    });
                    this.transferHistory = res;
                    return Promise.resolve(this.transferHistory);
                } catch (e) {
                    return Promise.resolve([]);
                }
            })
            .catch(e => {
                this.isFetchingTransferHistory = false;
                this.transferHistory = [];

                return Promise.reject(e);
            });
    }

    @action.bound showCoinSendState(msg) {
        this.snackBar({
            message: () => (
                <React.Fragment>
                    <span><b>{msg}</b></span>
                </React.Fragment>
            ),
        });
    }

    @action.bound requestCancelTransferRequest(uniqueId) {
        CancelTransferRequest(uniqueId)
            .then(res => {
                if (res && res.Success === true) {
                    this.showCoinSendState('Successfully canceled payment');
                } else {
                    this.showCoinSendState('Payment cancellation is failed');
                }
                this.requestTransferHistory();
            })
            .catch(e => {
                console.log(e);
            });
    }
}

export default (snackBar) => {
    const store = new SendCoinStore(snackBar);
    return store;
};
