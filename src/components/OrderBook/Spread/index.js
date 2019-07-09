import React, { Fragment } from 'react';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';

import { STORE_KEYS } from '../../../stores';
import { unifyDigitString } from '../../../utils';

const Label = styled.div`
    flex: 5;
    margin-left: calc(${100 * 35 / 145}%);
    margin-right: 10px;
    text-align: left;
    color: ${props => props.theme.palette.orderBookTableSpreadText};
    font-size: 19px;
    font-weight: 200;
    line-height: 1em;

    span {
        color: ${props => props.theme.palette.orderBookTableSpreadText2};
        font-weight: 600;
    }
`;

const Price = styled.div`
    flex: 5;
    display: flex;
    align-items: center;
`;

const Spread = styled.div`
    background: ${props => props.theme.palette.orderBookTableSpreadBg};
    border-top: 1px solid ${props => props.theme.palette.orderBookTableSpreadBorder};
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Text = styled.p`
    margin: 0;
    font-size: 15px;
    color: ${props => props.theme.palette.orderBookTableSpreadText2};
    font-weight: bold;
`;

const QuoteSymbol = styled.span`
    font-weight: 300;
    margin-left: 0.25rem;
    font-size: 10px;
    color: ${props => props.theme.palette.orderBookTableSpreadText};
`;

const ObservedSpread = ({
    [STORE_KEYS.PRICECHARTSTORE]: {
        price,
    },
    [STORE_KEYS.INSTRUMENTS]: {
        selectedInstrumentPair: [baseSymbol, quoteSymbol],
    },
    [STORE_KEYS.YOURACCOUNTSTORE]: {
        baseCoinPrice,
        quoteCoinPrice,
    },
    height,
    width,
    base,
    quote,
}) => {
    let spreadUSD = baseCoinPrice;

    if (baseSymbol === quote && quoteSymbol === base && price > 0) {
        price = 1 / price;
        spreadUSD = quoteCoinPrice;
    }

    const isDigitShow = base === 'USDT' || quote === 'USDT';

    return (
        <Spread style={{ height, width }}>
            <Fragment>
                <Label>
                    <span>1</span> {base} &asymp; <span>${unifyDigitString(isDigitShow ? (quoteSymbol === 'USDT' ? spreadUSD : price) : spreadUSD)}</span>&nbsp;&nbsp;&nbsp;{!isDigitShow ? '(' + unifyDigitString(price) + ' ' + quote + ')' : ''}
                </Label>
            </Fragment>
        </Spread>
    );
};

export default inject(
    STORE_KEYS.PRICECHARTSTORE, STORE_KEYS.INSTRUMENTS, STORE_KEYS.YOURACCOUNTSTORE,
)(observer(ObservedSpread));