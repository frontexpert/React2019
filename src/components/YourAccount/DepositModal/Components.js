import React from 'react';
import styled from 'styled-components';

export const Wrapper = styled.section`
    position: relative;
    display: flex;
    flex-direction: column;
    border: 1px solid ${props => props.theme.palette.depositBorder};
    border-radius: ${props => props.submitted
        ? `${props.theme.palette.borderRadius} ${props.theme.palette.borderRadius} 0 0`
        : props.theme.palette.borderRadius};
    padding: 14px 14px 10px;
    width: 332px;
    background: ${props => props.theme.palette.depositBackground};
    box-shadow: 0 3px 15px rgba(0, 0, 0, .5);
`;

export const DepositAddress = styled.div`
    width: 100%;
    max-width: 290px;
    margin-top: 12px;
    // font-size: 16px;
    color: ${props => props.theme.palette.depositQRText};
    text-align: center;
    // text-overflow: ellipsis;
    // overflow: hidden;
`;

export const DropdownWrapper = styled.div`
    position: relative;
`;

export const Dropdown = styled.div`
    position: absolute;
    top: 47px;
    left: 0;
    right: 39px;
    z-index: 5001;
    height: 160px;
    // background-color: ${props => props.theme.palette.depositInputBackground};
    background: transparent;
    // border: 1px solid ${props => props.theme.palette.depositActive};
    border: none;
    border-top: 0;
    border-radius: 0 0 ${props => props.theme.palette.borderRadius} ${props => props.theme.palette.borderRadius};
    color: ${props => props.theme.palette.depositLabel};
`;

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
        padding: ${props => props.length > 7 ? '8px 30px 8px 15px' : '8px 15px'};
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

export const Item = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    
    .telegram-channel-avatar {
        width: 24px !important;
        height: 24px !important;
        min-width: 24px;
        min-height: 24px;
        margin: 4px !important;
        border-radius: 50% !important;
        
        .telegram-channel-avatar__default {
            font-size: 10px !important;
            line-height: 1em !important;
        }
    }
`;

export const Logo = styled.img`
    width: 24px;
    height: 24px;
    margin: 4px;
    border-radius: 50%;
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

const InfoSvg = styled.svg`
    width: 24px;
    height: 24px;
    margin-left: 8px;
    
    .cls-info-1 {
        stroke: ${props => props.selected ? props.theme.palette.depositDropdownActive : props.theme.palette.depositDropdown};
    }
    
    .cls-info-2 {
        font-size: 18px;
        font-weight: 700;
        letter-spacing: -0.05em;
        fill: ${props => props.selected ? props.theme.palette.depositDropdownActive : props.theme.palette.depositDropdown};
    }
`;

export const InfoIcon = props => (
    <InfoSvg {...props} viewBox="0 0 22.8 23.3">
        <circle className="cls-info-1" cx="11.4" cy="11.4" r="10.9"/>
        <text className="cls-info-2" transform="translate(8.78 18.03)">i</text>
    </InfoSvg>
);

export const HardwareKeyWrapper = styled.div`
    position: absolute;
    top: calc(100% + 1px);
    left: -1px;
    right: -1px;
    z-index: 5000;
    padding: 40px;
    display: flex;
    flex-direction: column;
    background-color: ${props => props.theme.palette.depositBackground};
    border: 1px solid ${props => props.theme.palette.depositBorder};
    border-top: 0;
    border-radius: 0 0 ${props => props.theme.palette.borderRadius} ${props => props.theme.palette.borderRadius};
    box-shadow: 0 3px 15px rgba(0, 0, 0, .5);
    font-size: 16px;
    color: ${props => props.theme.palette.depositDropdownActive};
    
    img {
        width: 80%;
        margin: 0 auto 30px;
    }
    
    p {
        width: 200px;
        margin: 0 auto;
        text-align: center;
    }
`;

export const PaymentWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color: #fff;
    font-weight: 600;
    margin-top: 6px;
    
    .buy-with-visa-button {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        span {
            padding-top: 2px;
            color: ${props => props.theme.palette.clrBlue};
            font-size: 12px;
            line-height: 1.2em;
            border-bottom: 1px solid ${props => props.theme.palette.clrBlue};
        }
        
        img {
            align-self: flex-end;
            margin-left: 8px;
            width: 64px;
            height: auto;
        }
        
        &:hover {
            span {
                color: ${props => props.theme.palette.clrHighContrast};
                border-bottom: 1px solid ${props => props.theme.palette.clrHighContrast};
            }
        }
    }
`;

export const AmountInputsWrapper = styled.div.attrs({ className: 'deposit-modal__input-row' })`
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    .horizontal-input-fields {
        position: relative;
        
        input {
            padding: 11px 37px 11px 11px;
        }
    
        .coinIconWrapper {
            position: absolute;
            top: 28px;
            right: 6px;
            z-index: 1;
            
            .coin-icon {
                flex-shrink: 0;
                background-size: cover !important;
            }
            .exch-dropdown__icon {
                width: 30px;
                height: 30px;
                margin: 0 0 0 0;
                cursor: pointer;    
            }
        }
        
        flex: 1;
        margin-top: 0;
                
        &:not(:last-child) {
            margin-right: -1px;
        }
        
        input {
            text-align: left;
        }
        
        &:first-child input {
            border-radius: ${props => props.theme.palette.borderRadius} 0 0 ${props => props.theme.palette.borderRadius};
        }
        
        &:last-child input {
            border-radius: 0 ${props => props.theme.palette.borderRadius} ${props => props.theme.palette.borderRadius} 0;
        }
    }
`;

