import React from 'react';
import {withMapSymbolsToCoinLabelProps} from '../../../hocs/WithMapSymbolToCoinLabelProps';
import {withSubmitOrderTicketOnComponentDidMount} from '../../../hocs/WithSubmitOrderTicketOnComponentDidMount';
import {withTicketSubmittalHandlers} from '../../../hocs/WithTicketSubmittalHandlers';
import {LIMIT_ORDER_TYPE} from '../../../config/constants';
import LimitOrderContainer from './LimitOrderContainer';
import {compose, withProps} from "recompose";
import {withOrderBookData} from "../../../hocs/OrderBookData/WithOrderBookData";
import {withStateMapForPriceOrAmountChange} from "../../../hocs/WithStateMapForPriceOrAmountChange";

export const LimitOrder = compose(
    withProps({type: LIMIT_ORDER_TYPE}),
    withSubmitOrderTicketOnComponentDidMount,
    withOrderBookData,
    withStateMapForPriceOrAmountChange,
    withTicketSubmittalHandlers
)(LimitOrderContainer);

// Temporary
const LimitOrderSideBySideContainer = ({ProgramId, ClientId, Route, Symbols, amountCoin, priceCoin, totalCoin}) => {
    return (
        <React.Fragment>
            <LimitOrder
                amountCoin={amountCoin}
                priceCoin={priceCoin}
                totalCoin={totalCoin}
                orderButtonText={`BUY ${amountCoin}`}
                isBuy={true}
                ProgramId={ProgramId}
                ClientId={ClientId}
                Symbols={Symbols}
                Route={Route}/>

            <LimitOrder
                amountCoin={amountCoin}
                priceCoin={priceCoin}
                totalCoin={totalCoin}
                orderButtonText={`SELL ${amountCoin}`}
                isBuy={false}
                ProgramId={ProgramId}
                ClientId={ClientId}
                Symbols={Symbols}
                Route={Route}/>
        </React.Fragment>
    )
};

export const LimitOrderFormSideBySide = compose(
    withMapSymbolsToCoinLabelProps,
)(LimitOrderSideBySideContainer);