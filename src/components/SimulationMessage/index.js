import React from 'react';
import styled from 'styled-components';

const SimMessageContainer = styled.div`
    background: tomato;
    color: white;
    text-align: center;
    padding: 5px;
`;

const SimMessage = styled.div`
    text-transform: uppercase;
    font-size: 1.8rem;
`;

const StyledSpan = styled.div`
    font-size: 1rem;
    text-transform: none;
`;

const SimulationMessage = () => {
    return(
        <SimMessageContainer>
            <SimMessage>YOU ARE CURRENTLY IN SIMULATION TRADING MODE; NO REAL MONEY IS BEING EXCHANGED</SimMessage>
            <StyledSpan>Visit Settings to switch to 'Live Trading'</StyledSpan>
        </SimMessageContainer>
    )
};

export default SimulationMessage;