import React from 'react';
import styled, {css} from 'styled-components';
import ExchangeCells from './ExchangeCell';
import VerticalAlignBottom from '@material-ui/icons/VerticalAlignBottom';

const StyledIcon = styled(VerticalAlignBottom)`
    font-size: 2rem;
`;

const ExchangeSideBarCSS = css`
    border: 1px solid ${props => props.theme.palette.clrseparatorD};
    background: ${props => props.theme.palette.backgroundHighContrast};
    padding-left: .5rem;
    padding-right: .5rem;
    overflow-y: scroll;
    max-height: 100%;
    min-height: 100%;
`;

const StyledExchangeHeader = styled.div`
    color: ${props => props.theme.palette.clrtextD};
    padding: .5rem;
    margin-bottom: 1rem;
    margin-top: .5rem;
    text-align: center;
    font-size: 1.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    outline: 1px solid ${props => props.theme.palette.clrseparatorD};
    @media (max-width: 2000px) {
        font-size: 1rem;
    }
`;

const ExchangeSideBar = ({className}) => {
    return (
        <div className={className}>
            <StyledExchangeHeader>
                <StyledIcon /> 
                By Lowest Price
            </StyledExchangeHeader>
            <ExchangeCells />
        </div>
    )
};

export default styled(ExchangeSideBar)`${ExchangeSideBarCSS}`