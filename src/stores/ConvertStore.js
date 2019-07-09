import { observable, action } from 'mobx';
import React from 'react';

export const STATE_KEYS = {
    coinSearch: Symbol(),
    amtInput : Symbol(),
    submitOrder: Symbol(),
    orderDone: Symbol(),
};

const StateSequence = new Set([
    STATE_KEYS.coinSearch,
    STATE_KEYS.amtInput,
    STATE_KEYS.submitOrder,
    STATE_KEYS.orderDone
]);

class ConvertStore {
    @observable convertState;
    @observable isDynamicCoinPair = true;
    @observable forceStopArbitrageExchange = false;
    statesSequence = null;

    constructor(snackbar) {
        this.gotoFirstState();
        this.snackbar = snackbar;
    }

    @action.bound progressState() {
        this.convertState = this.__nextState();
    }

    @action.bound setDynamicCoinPair(mode) {
        this.isDynamicCoinPair = mode;
    }

    @action.bound showConvertState(msg) {
        this.snackbar({
            message: () => (
                <React.Fragment>
                    <span><b>{msg}</b></span>
                </React.Fragment>
            ),
        });
    }

    @action.bound setConvertState(state) {
        this.convertState = state;
    }

    @action.bound setForceStopArbitrageExchange(mode) {
        this.forceStopArbitrageExchange = mode;
    }

    @action.bound gotoFirstState() {
        this.__initStateSequence();
        this.convertState = this.__nextState();
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
}

export default (snackbar) => {
    const store = new ConvertStore(snackbar);
    return store;
};
