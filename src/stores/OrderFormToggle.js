import { observable, action } from 'mobx';

export const orderFormToggleKeys = {
    onToggleKey : 'on',
    offToggleKey : 'off',
};

class OrderFormToggle {
    @observable toggleMode = orderFormToggleKeys.offToggleKey;

    @action.bound toggleViewMode() {
        this.toggleMode = this.toggleMode === orderFormToggleKeys.offToggleKey ? orderFormToggleKeys.onToggleKey : orderFormToggleKeys.offToggleKey;
    }

    @action.bound showOrderForm() {
        this.toggleMode = orderFormToggleKeys.onToggleKey;
    }

    @action.bound showOrderFormWith(mode) {
        this.toggleMode = mode;
    }
}

export default () => {
    const store = new OrderFormToggle();
    return store;
};