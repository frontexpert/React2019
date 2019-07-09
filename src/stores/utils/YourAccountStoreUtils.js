import {PORTFOLIO_LABEL_AMOUNT, PORTFOLIO_LABEL_COIN, PORTFOLIO_LABEL_POSITION} from "../../config/constants";
import {genRandFloat} from "../../mock/dataGeneratingUtils";
import partial from "lodash.partial";
import uniq from "lodash.uniq";
import {roundToFixedNum} from "../../utils";
import CRYPTO_PROJECTS from "../../mock/cryptocurrencies" // TODO: MOCK DATA -- WILL REMOVE

export const normalizeYourAccountPositionData = (Positions, response) => {
    return Positions.map((position) => {
        const {USD: cryptoCompareCoinValue} = response[position[PORTFOLIO_LABEL_COIN]];
        const coinValue = !!cryptoCompareCoinValue ? cryptoCompareCoinValue : genRandFloat(0, 1000, 2);
        position[PORTFOLIO_LABEL_POSITION] = roundToFixedNum(position[PORTFOLIO_LABEL_POSITION], 4);
        position[PORTFOLIO_LABEL_AMOUNT] = roundToFixedNum(position[PORTFOLIO_LABEL_POSITION] * coinValue, 2);
        return position;
    })
};

export const registerForPositionReplies = (PositionReply, ClientId, next, error) => {
    return PositionReply({ClientId}).subscribe({
        next,
        error,
    })
};

export const updatePositionError = (e) => console.log(e);


export const normalizePortfolioPieChartData = (totalAccountBalance, [symbol, symbolAmountTotal]) => {
    return [
        CRYPTO_PROJECTS[symbol] || "",
        Number(symbolAmountTotal) / Number(totalAccountBalance)
    ]
};

export const makePositionRequest = (ClientId, ProgramId, {SubmitPositionRequest}) => {
    SubmitPositionRequest({ClientId, ProgramId});
};

export const updatePosition = (updateYourAccountStoreData, portfolioData) => {
    if (portfolioData === undefined) return;
    const {body: {messages} = {}} = portfolioData;
    if (messages === undefined || messages.length === 0) {
        return;
    }
    const [{Positions}] = messages;
    if (!!Positions) {
        const symbolList = uniq(Positions.map(position => position[PORTFOLIO_LABEL_COIN]));
        const url = `https://min-api.cryptocompare.com/data/pricemulti?&fsyms=${symbolList}&tsyms=USD`;
        fetch(url)
            .then(response => response.json()) // TODO: Generate our own real "Amount" on backend
            .then(partial(updateYourAccountStoreData, Positions))
            .catch(err => console.log(`YourAccountStore Error:${err}`));
    }
};

export const updatePortfolioPieChartData = (acc, position) => {
    const positionSymbol = position[PORTFOLIO_LABEL_COIN];
    const positionAmount = Number(position[PORTFOLIO_LABEL_AMOUNT]);
    acc[positionSymbol] = !!acc[positionSymbol] ? acc[positionSymbol] + positionAmount : positionAmount;
    return acc;
};