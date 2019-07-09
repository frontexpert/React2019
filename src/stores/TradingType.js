import {observable, action, computed} from "mobx";

const simulationTradingKey = 'Paper';
const liveTradingKey = 'Live';

const tradingTypes = {
    [simulationTradingKey]: 'Paper',
    [liveTradingKey]: 'Live',
};

class TradingType {
    @observable tradingType = tradingTypes[liveTradingKey];
    selectedTradingType = liveTradingKey

    tradingTypes = [simulationTradingKey, liveTradingKey]


    @action.bound
    setTradingType(tradingType){
        this.tradingType = tradingTypes[tradingType];
        this.selectedTradingType = tradingType;
    }

    @computed get selectedTradingTypeIdx(){
        return this.tradingTypes.indexOf(this.selectedTradingType)
    }
}

export default () => {
    const store = new TradingType();
    return store;
};