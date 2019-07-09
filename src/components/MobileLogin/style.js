import styled from 'styled-components';

import { darkTheme } from '../../theme/core';

const spacing1 = 15; // normally padding
const spacing2 = 22; // space between rows
const spacing3 = 18; // space between columns
const numberFontSize = 18;
const inputBorderWidth = 2;
const inputBorderColor = darkTheme.palette.clrHighContrast;
const inputBorderRadius = 4;
const inputPaddingV = 2;
const inputPaddingH = 20;
const inputHeight = 61;
const countryCodeWidth = 75;
const inputTextColor = darkTheme.palette.clrHighContrast;
const inputBackground = darkTheme.palette.telegramLoginControlBackground;
const inputPlaceholderColor = darkTheme.palette.clrHighContrast;

const dropdownBackground = darkTheme.palette.telegramLoginDropdownItemBackgroundColor;
const dropdownItemTextColor = darkTheme.palette.telegramLoginDropdownItemTextColor;
const dropdownSelectedItemTextColor = darkTheme.palette.telegramLoginDropdownItemActiveTextColor;
const dropdownSelectedItemBackground = darkTheme.palette.telegramLoginDropdownItemActiveBackgroundColor;
const dropdownItemHoverTextColor = darkTheme.palette.telegramLoginDropdownItemHoverTextColor;
const dropdownItemHoverBackground = darkTheme.palette.telegramLoginDropdownItemHoverBackgroundColor;
const dropdownItemFontSize = 18;
const dropdownItemBorderColor = darkTheme.palette.telegramLoginDropdownItemBorder;

const StyleWrapper = styled.div`
    display: ${props => props.hide ? 'none' : 'block'};
    text-align: center;
        
    .phone-input-telegram {
        width: 100%;
        max-width: 350px;
        margin: 0 0 10px;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: flex-start;
        
        &, & * {
            box-sizing: border-box;
            font-family: Roboto, sans-serif;
        }
        
        .phone-input-group {
            width: 100%;
    
            .textfield-item {
                position: relative;
                flex: 1;
    
                input.form-control {
                    width: 100%;
                    height: ${inputHeight}px;
                    padding: ${inputPaddingV}px ${inputPaddingH}px;
                    background: transparent;
                    border: 0;
                    font-size: ${numberFontSize}px;
                    line-height: 1em;
                    font-weight: 300;
                    color: ${inputTextColor};
                    letter-spacing: 1px;
    
                    &:focus {
                        outline: none;
                    }
                    
                    &#login-phone {
                        padding-left: ${inputPaddingH / 2}px;
                    }
                    
                    &#login-phone-code {
                        width: ${countryCodeWidth}px;
                        padding-right: 0;
                    }
                }
    
                .textfield-item__placeholder {
                    position: absolute;
                    top: 0;
                    left: ${countryCodeWidth}px;
                    right: 0;
                    bottom: 0;
                    padding: ${inputPaddingV}px ${inputPaddingH}px ${inputPaddingV}px ${inputPaddingH / 2}px;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: flex-start;
                    font-size: ${numberFontSize}px;
                    font-weight: 300;
                    font-family: inherit;
                    line-height: 1em;
                    text-align: left;
                    color: ${inputPlaceholderColor};
                    pointer-events: none;
                    overflow: hidden;
                    white-space: nowrap;
                    letter-spacing: 1px;
                    
                    &.hide {
                        visibility: hidden !important;
                    }
                }
            }
            
            .login_country_field_wrap {
                width: 100px;
                height: ${inputHeight + inputBorderWidth * 2}px;
                // padding: 0 ${inputPaddingH}px;
                display: flex;
                align-items: center;
                justify-content: center;
                background: ${inputBackground};
                border: ${inputBorderWidth}px solid ${inputBorderColor};
                border-radius: ${inputBorderRadius}px 0 0 ${inputBorderRadius}px;
    
                &.opened {
                    .login_country_search_wrap {
                        visibility: visible;
                        opacity: 1;
                    }
                    
                    .login_country_selected {
                        visibility: hidden;
                        opacity: 0;
                    }
                    
                    .login_country_chevron_down {
                        pointer-events: initial;
                    }
                }
                
                &.disabled {
                    pointer-events: none;
                }
    
                .login_country_chevron_down {
                    pointer-events: none;
                }
    
                .login_country_selected {
                    position: relative;
                    width: 48px;
                    height: 48px;
                    margin: 0 0 1px;
                    cursor: pointer;
                
                    .flag {
                        width: 48px;
                        height: 48px;
                    }
                }
                
                .login_country_search_wrap {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 100;
                    background: ${inputBackground};
                    border: ${inputBorderWidth}px solid ${inputBorderColor};
                    border-bottom: 0;
                    border-radius: ${inputBorderRadius}px ${inputBorderRadius}px 0 0;
                    visibility: hidden;
                    opacity: 0;
                }
    
                .login_country_search_results {
                    position: absolute;
                    top: 100%;
                    left: -${inputBorderWidth}px;
                    right: -${inputBorderWidth}px;
                    max-height: 300px;
                    margin: 0;
                    padding: 0;
                    background: ${dropdownBackground};
                    border: ${inputBorderWidth}px solid ${inputBorderColor};
                    border-radius: 0 0 ${inputBorderRadius}px ${inputBorderRadius}px !important;
                    box-shadow: 0 0 2px 1px rgba(0, 0, 0, .15);
                    text-align: left;
                    overflow: auto;
                    overflow-x: hidden;
                    -webkit-overflow-scrolling: touch;
                    z-index: 7;
                    
                    /* width */
                    &::-webkit-scrollbar { 
                        width: 14px;
                        height: 15px;
                        opacity: 1;
                        background: ${dropdownBackground};
                    }
                    
                    /* Track */
                    &::-webkit-scrollbar-track {
                        box-shadow: none;
                        border-radius: 0;
                    }
                    
                    /* Handle */
                    &::-webkit-scrollbar-thumb {
                        min-height: 30px;
                        border-radius: 10px;
                        border: 4px solid ${dropdownBackground};
                        background: ${inputBorderColor};
                    }
                }
            
                .login_country_search_result {
                    width: 100%;
                    height: ${inputHeight}px;
                    margin: 0;
                    padding: 4px ${spacing1}px;
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    border-bottom: 1px solid ${dropdownItemBorderColor};
                    border-right: 1px solid ${inputBorderColor};
                    font-size: ${dropdownItemFontSize}px;
                    font-weight: 300;
                    line-height: 1em;
                    cursor: pointer;
                    color: ${dropdownItemTextColor};
                    
                    &:last-child {
                        border-bottom: none;
                    }
    
                    &:hover {
                        background: ${dropdownItemHoverBackground};
                        color: ${dropdownItemHoverTextColor};
                    }
    
                    &.selected, &:active {
                        background: ${dropdownSelectedItemBackground};
                        color: ${dropdownSelectedItemTextColor};
                        font-weight: 500;
                    }
    
                    .prefix {
                        font-size: ${dropdownItemFontSize}px;
                        font-weight: 300;
                        padding-left: 8px;
                    }
                    
                    .flag {
                        width: 32px;
                        height: 32px;
                        margin-right: 8px;
                        flex-shrink: 0;
                    }
                }
            
                .login_country_search_noresult {
                    width: 100%;
                    height: ${inputHeight}px;
                    margin: 0;
                    padding: 4px ${spacing1}px;
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    font-size: ${dropdownItemFontSize - 1};
                    font-weight: 300;
                    line-height: 1em;
                    color: ${dropdownItemTextColor};
                    cursor: pointer;
                }
            }
            
            .login_phone_field_wrap {
                position: relative;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: flex-start;
                
                .login_number_field_wrap {
                    flex: 1;
                    display: flex;
                    flex-direction: row;
                    align-items: flex-start;
                    justify-content: flex-start;
                    background-color: ${inputBackground};
                    border: ${inputBorderWidth}px solid ${inputBorderColor};
                    border-left: 0;
                    border-radius: 0 ${inputBorderRadius}px ${inputBorderRadius}px 0;
                    vertical-align: top;
                    
                    .number_action {
                        position: relative;
                        width: ${inputHeight}px;
                        height: ${inputHeight}px;
                        margin: 0;
                        padding: 0;
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        justify-content: center;
                        background: ${props => props.theme.palette.telegramLoginControlBackground};
                        border: 1px solid ${props => props.theme.palette.telegramLoginControlBorderColor};
                        border-radius: 0 4px 4px 0;
                        overflow: hidden;
                    }
                }
            }
        }
    }
`;

export default StyleWrapper;
