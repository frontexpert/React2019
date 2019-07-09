import React from 'react';
import styled from 'styled-components';

export const Wrapper = styled.div.attrs({ className: 'deposit-v2-wrapper' })`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    margin: 0;
    border: 1px solid ${props => props.theme.palette.depositBorder};
    border-radius: ${props => props.theme.palette.borderRadius};
    width: 550px;
    height: 455px;
    background-color: ${props => props.theme.palette.depositBackground};
    box-shadow: 0 3px 15px rgba(0, 0, 0, .5);
    color: ${props => props.theme.palette.depositText};
`;

export const ModalHeader = styled.div.attrs({ className: 'deposit-v2-header' })`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 0;
    border-bottom: 1px solid ${props => props.theme.palette.depositBorder};
    padding: 5px 15px;
    width: 100%;
    height: 41px;
    background: ${props => props.theme.palette.clrBackground};
`;

export const Title = styled.span`
    color: ${props => props.theme.palette.clrHighContrast};
    font-size: 18px;
    font-weight: bold;
`;

export const ModalBody = styled.div.attrs({ className: 'deposit-v2-body' })`
    position: relative;
    flex: 1 1;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    margin: 0;
    padding: 0;
`;

export const MainContent = styled.div.attrs({ className: 'deposit-v2-body__content' })`
    flex: 1 1;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: space-around;
`;

export const BottomLinks = styled.div.attrs({ className: 'deposit-v2-body__bottom-links' })`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    padding: 15px;
`;

export const BottomLink = styled.span.attrs({ className: 'deposit-v2-body__bottom-link' })`
    margin: 0 15px 0 0;
    border: none;
    border-bottom: 1px solid ${props => props.theme.palette.clrBlue};
    padding: 1px;
    color: ${props => props.theme.palette.clrBlue};
    font-size: 12px;
    font-weight: bold;
    cursor: pointer;
    
    &:hover {
        border-bottom: 1px solid ${props => props.theme.palette.clrHighContrast};
        color: ${props => props.theme.palette.clrHighContrast};
    }
`;

export const ContentSeparator = styled.div.attrs({ className: 'deposit-v2-separator' })`
    margin: 0;
    border: none;
    padding: 0;
    width: 100%;
    height: 1px;
    background: ${props => props.theme.palette.clrBorderHover};
`;

