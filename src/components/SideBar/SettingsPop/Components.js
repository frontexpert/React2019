import React from 'react';
import styled from 'styled-components';

const paddingV = 10;
const paddingH = 15;

export const SettingsPopupStyleWrapper = styled.div.attrs({ className: 'settings-popup-style-wrapper' })`
    position: relative;
    align-self: flex-end;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    margin: 0 0 15px 70px;
    border: none;
    padding: 0;
    width: min-content;
    min-width: 342px;
    height: min-content;
    background: transparent;
    color: ${props => props.theme.palette.settingsText};
    font-size: 17px;
    font-weight: 600;
    
    overflow: visible;
    box-shadow: 5px 0 7px 0 rgba(0, 0, 0, 0.4);
    
    .error {
        &, & span {
            color: ${props => props.theme.palette.settingsErrorColor} !important;
        }
    }
    
    .styled-component-hack {
        position: fixed;
        left: -100px;
        top: -100px;
        width: 0;
        height: 0;
    }
    
    &:before {
        position: absolute;
        bottom: 25px;
        left: -4px;
        content: " ";
        display: block;
        width: 8px;
        height: 8px;
        border: 1px solid ${props => props.theme.palette.settingsBorder};
        background: ${props => props.theme.palette.settingsBackground};
        transform: rotate(45deg);
        transform-origin: center;
        z-index: 0;
    }
    
    .content {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: stretch;
        margin: 0;
        border: 1px solid ${props => props.theme.palette.settingsBorder};
        border-radius: 3px;
        width: 100%;
        height: min-content;
        background: ${props => props.theme.palette.settingsBackground};
        overflow: hidden;
        z-index: 1;
    }
`;

export const SettingsPopupHeader = styled.div.attrs({ className: 'settings-popup-header' })`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin: 0;
    border: none;
    border-bottom: 1px solid ${props => props.theme.palette.settingsBorder};
    padding: ${paddingV}px ${paddingH}px;
    width: 100%;
    min-height: 40px;
    
    svg {
        margin: 0 9px 0 0;
        width: 20px;
        height: 20px;
        
        &, & * {
            fill: ${props => props.theme.palette.settingsText};
        }
    }
`;

export const SettingsPopupItem = styled.div.attrs({ className: 'settings-popup-item' })`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: stretch;
    margin: 0;
    border: none;
    border-bottom: 1px solid ${props => props.theme.palette.settingsBorder};
    padding: ${paddingV}px ${paddingH}px;
    width: 100%;
    min-height: 57px;
    background: ${props => props.theme.palette.settingsFormBackground};
    
    &:last-child {
        border-bottom: none;
    }
    
    .settings-popup-item__label {
        flex-grow: 1;
    }
    
    .settings-popup-item__control {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        margin: 0 0 0 auto;
        border: none;
        padding: 0;
    }
    
    .settings-popup-item__btn-label {
        font-size: 13px;
        line-height: 1em;
    }
`;

export const CloseButton = styled.button.attrs({ className: 'settings-popup-close-btn' })`
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: 0;
    padding: 0;
    width: 20px;
    height: 20px;
    color: white;
    font-size: 20px;
    font-weight: 200;
    line-height: 20px;
    background-color: ${props => props.theme.palette.clrBlue};
    transform: translate(50%, -50%);
    transform-origin: center;
    z-index: 10;

    &:hover {
        cursor: pointer;
        filter: brightness(110%);
    }

    &:focus {
        outline: none;
    }
    
    &:before {
        margin-top: -1.5px;
        content: "\00d7";
    }
`;