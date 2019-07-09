import React from 'react';
import {observer, inject} from 'mobx-react';
import styled from 'styled-components';
import {STORE_KEYS} from '../../../stores';
const {INSTRUMENTS:INSTRUMENT_STORE} = STORE_KEYS;

const Spread = styled.div`
    font-size: 1rem;
    color: ${props => props.theme.palette.clrtextD};
    padding: .7rem 0 .7rem 0;
    font-weight: 700;
    background: ${props => props.theme.palette.backgroundApp};
    border-top: 1px solid ${props => props.theme.palette.clrseparatorD};
    border-bottom: 1px solid ${props => props.theme.palette.clrseparatorD};
    ${'' /* is 1px too far right - needs to be fixed */}
    border-right: 1px solid ${props => props.theme.palette.clrseparatorD};
`;

const ObservedSpread = observer(({
    spread, 
    height, 
    width,
    [INSTRUMENT_STORE]:{
        selectedInstrumentPair:[, quoteSymbol],
    },
})=>{
    return (
        <Spread style={{height, width,'textAlign':'center'}}>
            {spread.has(0) && `${spread.get(0)} ${quoteSymbol}`}
        </Spread>
    )
})


export default inject(INSTRUMENT_STORE)(ObservedSpread)