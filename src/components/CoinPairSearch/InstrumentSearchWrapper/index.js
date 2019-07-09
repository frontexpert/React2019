import React from 'react';
import styled from 'styled-components';
import InstrumentSearch from './InstrumentSearch';

const StyledContainer = styled.div`
    padding: .1rem .5rem .1rem .5rem;
    border: 1px solid ${props => props.theme.palette.clrseparatorD};
    align-items: center;
    background: ${props => props.theme.palette.backgroundHighContrast};
    min-width: 200px;
    border-radius: 5px;

    @media (max-width: 1200px) {
        min-width: 75px;
    } 

    /* prevents overflow out of grid*/
    @media (max-width: 1000px) {
        max-width: 150px;
    } 

    @media (max-width: 900px) {
        max-width: 130px;
    } 
`;

const InstrumentSearchWrapper = ({
    getSuggestions,
    onSelect,
    selectedItem,
}) => {
    return (
        <StyledContainer>
            <InstrumentSearch 
                getSuggestions={getSuggestions}
                onSelect={onSelect}    
                selectedItem={selectedItem}
            />
        </StyledContainer>
    )
};

export default InstrumentSearchWrapper;