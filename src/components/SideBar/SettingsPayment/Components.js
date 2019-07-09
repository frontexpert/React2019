import React from 'react';
import styled from 'styled-components';

export const InnerWrapper = styled.div.attrs({ className: 'settings-inner-wrapper' })`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    margin: 0;
    border-top: 1px solid ${props => props.theme.palette.settingsBorder};
    padding: 0;
    width: 100%;
`;

export const InfoCard = styled.div.attrs({ className: 'settings-info-card' })`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    margin: 0;
    border: none;
    padding: 20px 20px 8px;
    width: 100%;
`;

export const H1 = styled.h1.attrs({ className: 'settings-h1' })`
    margin: 0 0 8px;
    font-size: 22px;
    line-height: 30px;
    font-weight: 500;
`;

export const H2 = styled.h2.attrs({ className: 'settings-h2' })`
    margin: 0 0 8px;
    font-size: 19px;
    line-height: 1.3em;
    font-weight: 500;
`;

export const H3 = styled.h3.attrs({ className: 'settings-h3' })`
    margin: 0 0 8px;
    font-size: 16px;
    line-height: 1.3em;
    font-weight: 300;
`;

export const Span = styled.span.attrs({ className: 'settings-span' })`
    margin: 0 ${props => props.center ? 'auto' : ''};
    font-size: 13px;
    line-height: 1.3em;
    font-weight: normal;
`;

export const BalanceDisplay = styled.div.attrs({ className: 'settings-balance' })`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    margin: 0;
    border: none;
    padding: 30px 10px;
    width: 100%;
`;

export const Group = styled.div.attrs({ className: 'settings-group' })`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    margin: 0 0 10px;
    border: none;
    border-top: 1px solid ${props => props.theme.palette.settingsBorder};
    border-bottom: 1px solid ${props => props.theme.palette.settingsBorder};
    padding: 0 0 0 22px;
    
    background: ${props => props.theme.palette.settingsFormBackground};
`;

export const Item = styled.div.attrs({ className: 'settings-group-item' })`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin: 0;
    border: none;
    border-bottom: 1px solid ${props => props.theme.palette.settingsBorder};
    padding: 5px 13px 5px 0;
    width: 100%;
    min-height: 42px;

    &:last-child {
        border-bottom: none !important;
    }
    
    &:hover {
        .settings-group-item__label {
            color: ${props => props.theme.palette.settingsLabelHoverColor} !important;
            
            .title {
                color: ${props => props.theme.palette.settingsLabelHoverColor} !important;            
            }
        }
    }
`;

export const ItemLeftIcon = styled.div.attrs({ className: 'settings-group-item__left-icon' })`
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    min-width: 25px;
    height: 100%;
        
    svg {
        width: ${props => (props.width + 'px' || '100%')};
        height: ${props => (props.height + 'px' || '100%')};
        
        &, & * {
            fill: ${props => (props.fill || props.theme.palette.settingsLabelColor)} !important;
        }
    }
`;

export const ItemRightIcon = styled.div.attrs({ className: 'settings-group-item__right-icon' })`
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    min-width: 30px;
    height: 100%;
    
    svg {
        width: ${props => (props.width + 'px' || '100%')};
        height: ${props => (props.height + 'px' || '100%')};
        
        &, & * {
            fill: ${props => (props.fill || props.theme.palette.settingsLabelColor)} !important;
        }
    }
`;

export const ItemLabel = styled.div.attrs({ className: 'settings-group-item__label' })`
    flex-grow: ${props => props.fullWidth ? '1' : '0'};
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin: 0;
    border: none;
    padding: 0;
    min-width: 100px;
    cursor: pointer;
    
    .title {
        font-size: 15px;
        color: ${props => props.theme.palette.settingsLabelColor};
        line-height: 1em;
        font-weight: 300;
        margin: 0;
    }
    
    .description {
        font-size: 11px;
        color: ${props => props.theme.palette.settingsLabelColor};
        line-height: 1em;
        font-weight: 300;
        margin: 2px 0 0;
    }
`;

export const ItemInput = styled.input.attrs({ className: 'settings-group-item__input' })`
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border: none;
    font-size: 15px;
    color: ${props => props.theme.palette.settingsLabelColor};
    background: transparent;
    
    &::placeholder {
        color: ${props => props.theme.palette.settingsInputPlaceHolder};
    }
    
    &, &:focus, &:active {
        outline: none;
    }
`;

export const ItemButton = styled.button.attrs({className: 'settings-group-item__button'})`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: 10px 20px;
    border: 1px solid ${props => props.theme.palette.settingsBorder};
    border-radius: 3px;
    background: transparent;
    color: ${props => props.theme.palette.settingsLabelColor};
    font-size: 15px;
    
    &:hover {
        background: ${props => props.theme.palette.settingsFormBackground};
    }
    
    &, &:hover, &:focus, &:active {
        outline: none;
    }
`;

export const BackButton =  styled.button`
    position: absolute;
    top: 15px;
    right: 20px;
    border: none;
    background: transparent;
    cursor: pointer;
    
    img {
        transform: rotateZ(180deg);
    }
    
    &, &:hover, &:active, &:focus {
        outline: none;
    }
`;
