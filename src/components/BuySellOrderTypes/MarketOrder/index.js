import React from 'react';
import {MarketOrderContainer} from './MarketOrderContainer';
import {withMapSymbolsToCoinLabelProps} from '../../../hocs/WithMapSymbolToCoinLabelProps';
import {withSubmitOrderTicketOnComponentDidMount} from '../../../hocs/WithSubmitOrderTicketOnComponentDidMount';
import {withTicketSubmittalHandlers} from '../../../hocs/WithTicketSubmittalHandlers';
import {withStateMapForPriceOrAmountChange} from '../../../hocs/WithStateMapForPriceOrAmountChange';
import {compose, withProps} from "recompose";
import {MARKET_ORDER_TYPE} from '../../../config/constants';
import {withOrderBookData} from "../../../hocs/OrderBookData/WithOrderBookData";

export const MarketOrder = compose(
    withProps({type: MARKET_ORDER_TYPE}),
    withSubmitOrderTicketOnComponentDidMount,
    withOrderBookData,
    withStateMapForPriceOrAmountChange,
    withTicketSubmittalHandlers
)(MarketOrderContainer);

// Temporary
const MarketOrderSideBySideContainer = ({ProgramId, ClientId, Route, Symbols, amountCoin}) => {
    return (
        <React.Fragment>
            <MarketOrder orderButtonText={`BUY ${amountCoin}`} amountCoin={amountCoin} isBuy={true} ProgramId={ProgramId} ClientId={ClientId} Symbols={Symbols} Route={Route}/>
            <MarketOrder orderButtonText={`SELL ${amountCoin}`} amountCoin={amountCoin} isBuy={false} ProgramId={ProgramId} ClientId={ClientId} Symbols={Symbols} Route={Route}/>
        </React.Fragment>
    )
};

export const MarketOrderFormSideBySide = compose(
    withMapSymbolsToCoinLabelProps,
)(MarketOrderSideBySideContainer);