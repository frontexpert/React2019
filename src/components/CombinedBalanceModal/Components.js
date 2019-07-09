import React from 'react';
import styled from 'styled-components';

export const Wrapper = styled.section.attrs({ className: 'combined-balance-modal' })`
    position: relative;
    display: flex;
    flex-direction: column;
    margin: 0;
    border: 1px solid ${props => props.theme.palette.clrBorderHover};
    border-radius: ${props => props.submitted ? `${props.theme.palette.borderRadius} ${props.theme.palette.borderRadius} 0 0` : props.theme.palette.borderRadius};
    width: 388px;
    min-height: 254px;
    background-color: ${props => props.theme.palette.clrMainWindow};
    box-shadow: 0 3px 15px rgba(0, 0, 0, .5);
`;

export const Header = styled.span.attrs({ className: 'combined-balance-modal__header' })`
    flex-shrink: 0;
    flex-grow: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    border-bottom: 1px solid ${props => props.theme.palette.clrBorderHover};
    border-radius: ${props => `${props.theme.palette.borderRadius} ${props.theme.palette.borderRadius} 0 0`};
    width: 100%;
    min-height: 41px;
    padding: 10px 15px;
    text-align: left;
    font-size: 18px;
    font-weight: 600;
    color: ${props => props.theme.palette.clrHighContrast};
    background: ${props => props.theme.palette.clrBackground};
    
    .title {
        font-size: 18px;
        font-weight: bold;
        line-height: 1em;
        color: ${props => props.theme.palette.clrHighContrast};

        .unit {
            font-weight: normal;
        }
    }
`;

export const ModalBody = styled.div.attrs({ className: 'combined-balance-modal__body' })`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    border: none;
    padding: 0;
    width: 100%;
`;

export const TableWrapper = styled.div.attrs({ className: 'combined-balance-modal__table-body-wrapper' })`
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    
    .ps__rail-y {
        border-left: 1px solid ${props => props.theme.palette.clrBorderHover};
        background-color: ${props => props.theme.palette.clrMainWindow} !important;
        opacity: 1 !important;
        
        .ps__thumb-y {
            z-index: 9999;
            cursor: pointer;
            
            &:before {
                background-color: ${props => props.theme.palette.clrBorderHover};
            }
        }
    }

    .ReactVirtualized__Table__headerRow {
        display: flex;
        flex-direction: row;
        align-items: stretch;
        justify-content: stretch;
        margin: 0;
        border-bottom: 1px solid ${props => props.theme.palette.clrBorder};
        padding: 0;
    }

    .ReactVirtualized__Table__headerColumn {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        margin: 0;
        border-right: 1px solid ${props => props.theme.palette.clrBorder};
        padding: 5px 15px;

        &:last-child {
            border-right: none;
        }
    }

    .ReactVirtualized__Table__row {
        display: flex;
        flex-direction: row;
        align-items: stretch;
        justify-content: stretch;
        margin: 0;
        border-bottom: 1px solid ${props => props.theme.palette.clrBorder};
        padding: 0;

        &:last-child {
            border-bottom: none;
        }
    }

    .ReactVirtualized__Table__rowColumn {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        margin: 0;
        border-right: 1px solid ${props => props.theme.palette.clrBorder};
        padding: 5px 5px 5px 15px;
        
        &:last-child {
            border-right: none;
        }
    }

    .ReactVirtualized__Table__Grid {
        outline: none !important;
    }
`;

export const TableHeader = styled.div.attrs({ className: 'combined-balance-modal__table-header' })`
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: stretch;
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    margin: 0;
    border-bottom: 1px solid ${props => props.theme.palette.clrBorder};
    padding: 0;
    background: ${props => props.theme.palette.clrMouseHover};
`;

export const TableHeaderColumn = styled.div.attrs({ className: 'combined-balance-modal__table-header-column' })`
    flex: 0 0 ${props => props.width}px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin: 0;
    border-right: 1px solid ${props => props.theme.palette.clrBorder};
    padding: 5px 15px;
    width: ${props => props.width}px;
    height: 100%;
    
    &:last-child {
        border-right: none;
    }
    
    font-size: 14px;
    font-weight: bold;
    line-height: 1.1em;
    color: ${props => props.theme.palette.clrHighContrast};
`;

export const ExchangeLogo = styled.img`
    width: 16px;
    height: 16px;
    margin: 0 7px 0 0;
    border-radius: 50%;
`;

export const ExchangeName = styled.span`
    font-size: 14px;
    font-weight: bold;
    line-height: 1.1em;
    color: ${props => props.theme.palette.clrHighContrast};
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const ExchangeAPILink = styled.span`
    align-self: flex-end;
    margin-left: auto;
    cursor: pointer;
    font-size: 12px;
    font-weight: 300;
    line-height: 1em;
    color: ${props => props.theme.palette.clrBlue};
    text-decoration: underline;
`;

export const BalanceAmount = styled.span`
    font-size: 14px;
    font-weight: bold;
    line-height: 1.1em;
    color: ${props => props.theme.palette.clrHighContrast};
    
    span {
        font-weight: 300;
        color: ${props => props.theme.palette.clrPurple};
    }
`;

export const IncludeCheckWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: 0 25px 0 0;
    width: 100%;
    height: 100%;
`;
