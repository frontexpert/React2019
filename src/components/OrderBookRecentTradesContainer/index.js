import React from 'react';
import styled from 'styled-components';
import OrderBook from 'Components/OrderBook';
import RecentTrades from 'Components/RecentTrades';

//1 Rem is grid gap; there is no clean way to style a gap so manufactured a gap
const DropdownsGridArea = styled.div`
    display: grid;
    grid-template-columns: 1fr 1rem 1fr;
    /* KEEP FOR VIRTUALIZED ...this is 100% less the material select*/
    height: calc(100% - 34px);
`;

const StyledLWrapper = styled.div`
    border: 1px solid ${props => props.theme.palette.clrseparatorD};
    background: ${props => props.theme.palette.backgroundMedContrast} !important;
`;

const StyledRWrapper = styled.div`
    border: 1px solid ${props => props.theme.palette.clrseparatorD};
    background: ${props => props.theme.palette.backgroundMedContrast} !important;
`;

const StyledGap = styled.div`
    background: ${props => props.theme.palette.backgroundApp};
    border-bottom: 1px solid ${props => props.theme.palette.clrseparatorD};
`;

export default () => (
    <DropdownsGridArea>
        {/* Dropdown Grid Area divs should not be removed - Grid Area needs 2 children.  */}
        <StyledLWrapper>
            <OrderBook />
        </StyledLWrapper>
        <StyledGap></StyledGap>
        <StyledRWrapper>
            <RecentTrades />
        </StyledRWrapper>
    </DropdownsGridArea>
);