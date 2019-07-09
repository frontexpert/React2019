import React from 'react';
import styled from 'styled-components';

export const Wrapper = styled.div`
    position: relative;
    width: 750px;
    height: 500px;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    background-color: ${props => props.theme.palette.clrMainWindow};
    border: 1px solid ${props => props.theme.palette.clrBorderHover};
    border-radius: ${props => props.theme.palette.borderRadius};
    box-shadow: 0 3px 15px rgba(0, 0, 0, .5);
    color: ${props => props.theme.palette.clrMouseClick};
`;

export const Header = styled.div`
    width: 100%;
    height: 45px;
    padding-right: 15px;
    display: flex;
    align-items: center;
    background: ${props => props.theme.palette.clrBackground};
    border-bottom: 1px solid ${props => props.theme.palette.clrBorderLight};
    font-weight: 600;
    
    > div {
        height: 100%;
        padding: 0 10px;
        display: flex;
        align-items: center;
        white-space: nowrap;
        
        &:not(:last-child) {
            border-right: 1px solid ${props => props.theme.palette.clrBorderLight};
        }
        
        &:first-child {
            width: 120px;
        }
        
        &:nth-child(2) {
            width: 100px;
        }
        
        &:nth-child(3) {
            width: 250px;
        }
        
        &:last-child {
            width: 263px;
        }
    }
`;

export const TableWrapper = styled.div`
    width: ${props => props.width}px;
    height: ${props => props.height}px;

    .ps__rail-y {
        right: 0 !important;
        z-index: 49;
        height: calc(100% - 0px) !important;
        background-color: ${props => props.theme.palette.clrBackground} !important;
        border-left: 1px solid ${props => props.theme.palette.clrBorder};
        opacity: 1 !important;
        
        .ps__thumb-y {
            z-index: 9999;
            cursor: pointer;

            &:before {
                background-color: ${props => props.theme.palette.clrPurple};
            }
        }
    }
    
    .ReactVirtualized__Table__Grid {
        outline: none !important;
        box-shadow: 7px 6px 11px rgba(0, 0, 0, .05);
    }
    
    .ReactVirtualized__Table__row {
        border-bottom: 1px solid ${props => props.theme.palette.clrBorderLight};
        overflow: visible !important;
        outline: none !important;
        cursor: pointer;
        
        &:last-child {
            border-bottom: 0;
        }
        
        &:hover {
            background-color: ${props => props.theme.palette.clrMouseHover};
            color: ${props => props.theme.palette.clrHighContrast};
        }

        &.active {
            background-color: ${props => props.theme.palette.clrBorder};
            color: ${props => props.theme.palette.clrHighContrast};
        }
        
        &.disabled {
            background-color: ${props => props.theme.palette.clrDisabled} !important;
            cursor: initial !important;
        }
    }

    .ReactVirtualized__Table__rowColumn {
        height: 100%;
        margin: 0;
        display: flex;
        align-items: flex-start;
        flex: unset !important;
        text-overflow: ellipsis;
        
        &:not(:last-child) {
          padding: 6px 10px;
            border-right: 1px solid ${props => props.theme.palette.clrBorderLight};
        }
        
        &:first-child {
            width: 120px;
        }
        
        &:nth-child(2) {
            width: 100px;
        }
        
        &:nth-child(3) {
            width: 250px;
        }
        
        &:last-child {
            width: 263px;
            padding: 8px 10px;
            display: flex;
            flex-direction: column;
        }
    }
`;

export const Item = styled.div`
    position: relative;
    width: 100%;
    height: 18px;
    padding-left: 25px;
    display: flex;
    align-items: center;
    
    &:before {
        content: '';
        position: absolute;
        top: 4px;
        left: 0;
        width: 16px;
        height: 11px;
        background: url('./img/flags.png') no-repeat scroll 0 0; 
        background-position: ${props => `${props.x}px ${props.y}px`} !important;
    }
    
    &:not(:first-child) {
        margin-top: 10px;
    }
`;
