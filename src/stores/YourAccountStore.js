import {observable, action, computed, toJS} from "mobx"
import {PositionRequest, PositionReply} from 'bct-ui-satori'
import {ClientId, PORTFOLIO_LABEL_AMOUNT, ProgramId} from "../config/constants";
import partial from 'lodash.partial';
import {formatNumForDisplayAsDollars} from "../hocs/ClientOrderData/clientOrderDataUtil";
import {
    makePositionRequest,
    normalizePortfolioPieChartData,
    normalizeYourAccountPositionData,
    registerForPositionReplies,
    updatePortfolioPieChartData,
    updatePosition,
    updatePositionError
} from "./utils/YourAccountStoreUtils";
import {initRequest} from "./utils/storeUtils";

// Don't allow state modifications outside actions
// TODO: configure({enforceActions: true});
const throttleMs = 200;

class YourAccountStore {
    @observable PortfolioData = [];
    @observable PortfolioPieChartTitle = "";
    @observable PortfolioPieChartData = [];

    constructor(PositionRequest, PositionReply) {
        registerForPositionReplies(
            PositionReply,
            ClientId,
            partial(updatePosition, this.updateYourAccountStoreData),
            updatePositionError
        );

        setTimeout(partial(initRequest, PositionRequest, throttleMs, partial(makePositionRequest, ClientId, ProgramId)), 500);
    }

    @action.bound
    updateYourAccountStoreData(Positions, response) {
        const YourAccountPositions = normalizeYourAccountPositionData(Positions, response);
        if (YourAccountPositions.length > 0) {
            this.PortfolioData = YourAccountPositions;
            const totalAccountBalance = YourAccountPositions.reduce((acc, position) => {
                return acc + Number(position[PORTFOLIO_LABEL_AMOUNT]);
            }, 0);
            this.PortfolioPieChartTitle = `Total Balance<br>$${formatNumForDisplayAsDollars(totalAccountBalance)}`;
            const totalAmountPerCoin = YourAccountPositions.reduce(updatePortfolioPieChartData, {});
            this.PortfolioPieChartData = Object.entries(totalAmountPerCoin)
                .map(partial(normalizePortfolioPieChartData, totalAccountBalance));
        }
    }
 
    @computed.struct
    get portfolioData() {
        return toJS(this.PortfolioData)
    }

    @computed.struct
    get portfolioPieChartTitle() {
        return toJS(this.PortfolioPieChartTitle)
    }

    @computed.struct
    get portfolioPieChartData() {
        return toJS(this.PortfolioPieChartData)
    }
}

export default () => {
    return new YourAccountStore(PositionRequest, PositionReply);
};