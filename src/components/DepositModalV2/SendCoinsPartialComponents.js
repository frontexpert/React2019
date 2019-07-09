import React from 'react';
import styled from 'styled-components';

export const Dropdown = styled.div`
    position: absolute;
    top: 59px;
    left: -1px;
    right: -1px;
    z-index: 5001;
    height: 240px;
    // background-color: ${props => props.theme.palette.depositInputBackground};
    background: transparent;
    // border: 1px solid ${props => props.theme.palette.depositActive};
    border: none;
    border-top: 0;
    border-radius: 0 0 ${props => props.theme.palette.borderRadius} ${props => props.theme.palette.borderRadius};
    color: ${props => props.theme.palette.depositLabel};
`;

export const Item = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    
    .telegram-channel-avatar {
        width: 40px !important;
        height: 40px !important;
        min-width: 40px;
        min-height: 40px;
        margin: 4px !important;
        border-radius: 50% !important;
        
        .telegram-channel-avatar__default {
            font-size: 10px !important;
            line-height: 1em !important;
        }
    }
`;

export const Name = styled.div.attrs({ className: 'deposit-dropdown-name' })`
    margin-left: 8px;
    flex: 1;
    display: ${props => props.isCustom ? 'flex' : 'block'};
    align-items: center;
    font-size: 14px;
    font-weight: normal;
    color: ${props => props.selected ? props.theme.palette.depositDropdownActive : props.theme.palette.depositDropdown};
    overflow: hidden;
    text-overflow: ellipsis;
    
    span {
        color: ${props => props.theme.palette.clrHighContrast};
    }
`;

const CustomSvg = styled.svg`
    width: 13px;
    height: 13px;
    margin-left: 8px;
    cursor: pointer;
    
    .cls-opt-1 {
        stroke: ${props => props.selected ? props.theme.palette.depositDropdownActive : props.theme.palette.depositDropdown};    
    }
    
    .cls-opt-2 {
        fill: ${props => props.selected ? props.theme.palette.depositDropdownActive : props.theme.palette.depositDropdown};    
    }
`;

export const Option = props => (
    <CustomSvg {...props} viewBox="0 0 12.34 12.34">
        <circle className="cls-opt-1" cx="6.17" cy="6.17" r="5.67"/>
        {props.selected && (
            <circle className="cls-opt-2" cx="6.22" cy="6.17" r="2.79"/>
        )}
    </CustomSvg>
);

export const StyleWrapper = styled.div`
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    
    .scrollbar-container {
        border: 1px solid ${props => props.theme.palette.depositActive};
        border-top: none;
        border-bottom-left-radius: ${props => props.theme.palette.borderRadius};
        border-bottom-right-radius: ${props => props.theme.palette.borderRadius};
        overflow: hidden;

        height: min-content;
        max-height: 100%;
    }
    
    .ps__rail-y {
        background-color: ${props => props.theme.palette.depositInputBackground} !important;
        border-left: 1px solid ${props => props.theme.palette.depositActive};
        border-bottom-right-radius: ${props => props.theme.palette.borderRadius};
        opacity: 1 !important;
        
        .ps__thumb-y {
            z-index: 9999;
            cursor: pointer;
            
            &:before {
                background-color: ${props => props.theme.palette.depositActive};
            }
        }
    }
    
    .ReactVirtualized__Table__rowColumn {
        height: 100%;
        margin: 0;
        padding: ${props => props.length > 4 ? '8px 30px 8px 15px' : '8px 15px'};
    }
    
    .ReactVirtualized__Table__row {
        border-bottom: 1px solid ${props => props.theme.palette.depositInputBorder};
        background: ${props => props.theme.palette.depositInputBackground};

        &:last-child {
            border-bottom: none;
        }

        &:hover {
            background-color: ${props => props.theme.palette.depositInputHover};
            
            .cls-info-1,
            .cls-opt-1 {
                fill: ${props => props.theme.palette.depositInputHover};
            }
        }
        
        &:active {
            background-color: ${props => props.theme.palette.depositActiveBack};
            
            .cls-info-1,
            .cls-opt-1 {
                fill: ${props => props.theme.palette.depositActiveBack};
            }
        }
        
        &:hover,
        &:active {
            .deposit-dropdown-name {
                color: ${props => props.theme.palette.depositDropdownActive} !important;
            }
            
            .cls-info-1 {
                stroke: ${props => props.theme.palette.depositInputBackground} !important;
            }
            
            .cls-info-2 {
                fill: ${props => props.theme.palette.depositBackground} !important;
            }
        }
    }
    
    .ReactVirtualized__Table__Grid {
        outline: none !important;
    }
`;

const SuccessfulIconSvg = styled.svg`
    width: 15px;
    height: 13px;

    &, & * {
        fill: transparent !important;
        stroke: white !important;
    }
`;

export const SuccessfulIcon = () => (
    <SuccessfulIconSvg>
        <g>
            <polyline points="0.49 5.18 6.8 10.7 16.3 0.51"/>
        </g>
    </SuccessfulIconSvg>
);
