import {observable, action} from "mobx";

export const layoutKeys = {
    telegramSelectKey : 'telegramSelectKey',
    globalOrderBookSelectKey : 'globalOrderBookSelectKey',
}

class GridStore {
    @observable selectedLayout = layoutKeys.telegramSelectKey;

    @action.bound selectLayout(selectedLayoutKey){
        this.selectedLayout = selectedLayoutKey;
    }
}

export default () => {
    const store = new GridStore();
    return store;
};