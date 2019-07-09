import React from 'react';
import styled from 'styled-components';
import KeyboardBackspace from '@material-ui/icons/KeyboardBackspace';
import {observer, inject} from 'mobx-react';
import {STORE_KEYS} from '../../../stores';
import {fillUntil} from '../../../utils';
import once from 'lodash.once';
import {roundToFixedNum} from '../../../utils';

const {ORDERBOOK:OrderBookStoreKey, INSTRUMENTS:InstrumentsStoreKey} = STORE_KEYS;

const maxCells = 20;

const StyledExchangeCell = styled.div`
    color: ${props => props.theme.palette.contrastText};
    border: ${(props) => {
        const prefix = `${props.visible ? '1': '0'}px solid`;
        return `${prefix} ${props.theme.palette.clrseparatorD}`;
    }};
    padding: .8rem;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: ${props => props.theme.palette.clrtextD};
`;

const ExchangeName = styled.div`
    font-size: 1.2rem;
    font-weight: 400;
    @media (max-width: 1850px) {
        font-size: .9rem;
    }
`;

const ExchangePriceInfo = styled.div`
    font-size: 0.95rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    @media (max-width: 1850px) {
        font-size: .75rem;
    }
`;

const StyledIcon = styled(KeyboardBackspace)`
    font-size: 1rem;
`;

const ExchangeCell = ({exchange, price, baseSymbol, quoteSymbol}) => {
    price = roundToFixedNum(price, 2)
    return(
        <React.Fragment> 
            <ExchangeName>{exchange}</ExchangeName>
            <ExchangePriceInfo>
                <div>{`1 ${baseSymbol} \u00A0`}</div>
                <StyledIcon /> 
                <div>{`\u00A0 ${price} ${quoteSymbol}`}</div>
            </ExchangePriceInfo>
        </React.Fragment>
    ) 
};

const ObservedExchangeCell = (observer(
    ({orderBookStore:{pricesByExchange}, instrumentsStore:{selectedInstrumentPair:[baseSymbol, quoteSymbol]}, index}) => {
        const visible = pricesByExchange.has(index);
        return (
            <StyledExchangeCell  visible={visible}>
                {
                    visible && 
                    <ExchangeCell 
                        baseSymbol={baseSymbol}
                        quoteSymbol={quoteSymbol}
                        exchange={pricesByExchange.get(index)[0]} 
                        price={pricesByExchange.get(index)[1]}
                    />
                }
            </StyledExchangeCell>
        )
    }
));


const getExchangeCells = once(
    (orderBookStore, instrumentsStore, maxCells) => fillUntil(
        maxCells,
        i => (
            <ObservedExchangeCell 
                orderBookStore={orderBookStore} 
                instrumentsStore={instrumentsStore}
                index={i}
                key={i}
            />
        ) 
    )
);

const ExchangeCells = ({
    orderBookStore,
    instrumentsStore,
}) => (
    <React.Fragment>
        {getExchangeCells(orderBookStore, instrumentsStore, maxCells)}
    </React.Fragment>
);

export default (
    inject(
        ({
            [OrderBookStoreKey]:orderBookStore,
            [InstrumentsStoreKey]:instrumentsStore,
        })=>({
            orderBookStore, 
            instrumentsStore,
        })
    )
)(ExchangeCells);