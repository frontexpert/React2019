import styled from 'styled-components';
import { darkTheme } from '../../theme/core';

const spacing1 = 15; // normally padding
const spacing2 = 22; // space between rows
const spacing3 = 18; // space between columns
const numberFontSize = 18;
const inputBorderWidth = 1;
const inputBorderColor = darkTheme.palette.telegramLoginControlBorderColor;
const inputBorderRadius = 4;
const inputPaddingV = 2;
const inputPaddingH = 20;
const inputHeight = 61;
const countryCodeWidth = 65;
const inputTextColor = darkTheme.palette.telegramLoginControlTextColor;
const inputBackground = darkTheme.palette.telegramLoginControlBackground;
const inputPlaceholderColor = darkTheme.palette.telegramLoginControlTextColor;

const dropdownBackground = darkTheme.palette.telegramLoginDropdownItemBackgroundColor;
const dropdownItemTextColor = darkTheme.palette.telegramLoginDropdownItemTextColor;
const dropdownSelectedItemTextColor = darkTheme.palette.telegramLoginDropdownItemActiveTextColor;
const dropdownSelectedItemBackground = darkTheme.palette.telegramLoginDropdownItemActiveBackgroundColor;
const dropdownItemHoverTextColor = darkTheme.palette.telegramLoginDropdownItemHoverTextColor;
const dropdownItemHoverBackground = darkTheme.palette.telegramLoginDropdownItemHoverBackgroundColor;
const dropdownItemFontSize = 18;
const dropdownItemBorderColor = darkTheme.palette.telegramLoginDropdownItemBorder;

const StyleWrapper = styled.div`
.phone-input-telegram {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    width: 100%;
    max-width: 316px;
    margin: auto;
    
    &, & * {
        box-sizing: border-box;
        font-family: Roboto, sans-serif;
    }
    
    .phone-input-group {
        width: 100%;

        .textfield-item {
            flex: 1;
            position: relative;
            padding: 0 0 ${spacing2}px;

            input.form-control {
                padding: ${inputPaddingV}px ${inputPaddingH}px;
                width: 100%;
                height: ${inputHeight}px;
                font-size: ${numberFontSize}px;
                line-height: 1em;
                font-weight: 300;
                font-family: inherit;
                background-color: ${inputBackground};
                border: ${inputBorderWidth}px solid ${inputBorderColor};
                border-radius: ${inputBorderRadius}px;
                color: ${inputTextColor};
                letter-spacing: 1px;

                &:focus {
                    outline: none;
                }
            }

            .textfield-item__placeholder {
                position: absolute;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: flex-start;
                top: 1px;
                left: ${inputBorderWidth}px;
                right: 0;
                bottom: 0;
                padding: ${inputBorderWidth + inputPaddingV + 1}px ${inputBorderWidth + inputPaddingH - 1}px;
                width: 100%;
                height: calc(100% - ${spacing2}px);
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
            position: relative;

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
                position: absolute;
                right: 13px;
                top: ${inputHeight / 2 - 5}px;
                pointer-events: none;
            }

            .login_country_selected {
                display: flex;
                flex-direction: row;
                align-items: center;
                margin: 0;
                border: none;
                border: ${inputBorderWidth}px solid ${inputBorderColor};
                border-radius: ${inputBorderRadius}px;
                padding: ${inputPaddingV}px ${inputPaddingH}px;
                background: ${inputBackground};
                font-size: ${numberFontSize}px;
                font-weight: 300;
                line-height: 1em;
                width: 100%;
                height: ${inputHeight}px;
                text-align: left;
                color: ${inputPlaceholderColor};
                cursor: pointer;
                position: relative;
            
                &.is-dirty {
                  color: ${inputTextColor};
                }
                
                &:hover, &:active {
                    border: ${inputBorderWidth}px solid ${props => props.theme.palette.clrPurple};
                }
            }
            
            .login_country_search_wrap {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                visibility: hidden;
                opacity: 0;
                
                .textfield-item {
                    input {
                        border-radius: ${inputBorderRadius}px ${inputBorderRadius}px 0 0 !important;
                        
                        &:hover, &:active, &:focus {
                            border: ${inputBorderWidth}px solid ${props => props.theme.palette.clrPurple};
                        }
                    }
                }
            }

            .login_country_search_results {
                position: absolute;
                top: calc(100% - ${spacing2 + inputBorderWidth}px);
                margin: 0;
                padding: 0;
                width: 100%;
                max-height: 340px;
                text-align: left;
                box-shadow: 0 0 2px 1px rgba(0, 0, 0, .15);
                background: ${dropdownBackground};
                border: ${inputBorderWidth}px solid ${inputBorderColor};
                border-radius: 0 0 ${inputBorderRadius}px ${inputBorderRadius}px !important;
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
                display: flex;
                align-items: center;
                justify-content: flex-start;
                margin: 0;
                padding: 4px ${spacing1}px;
                width: 100%;
                height: ${inputHeight}px;
                font-size: ${dropdownItemFontSize}px;
                font-weight: 300;
                line-height: 1em;
                cursor: pointer;
                color: ${dropdownItemTextColor};
                border-bottom: 1px solid ${dropdownItemBorderColor};
                border-right: 1px solid ${inputBorderColor};
                
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
            }
        
            .login_country_search_noresult {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                margin: 0;
                padding: 4px ${spacing1}px;
                width: 100%;
                height: ${inputHeight}px;
                color: ${dropdownItemTextColor};
                font-size: ${dropdownItemFontSize - 1};
                font-weight: 300;
                line-height: 1em;
                cursor: pointer;
            }
        }
        
        .login_phone_field_wrap {
            padding-top: ${spacing2}px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
            
            .login_code_field_wrap {
                flex-shrink: 0;
                width: ${countryCodeWidth}px;
                margin-right: ${spacing3}px;
                display: inline-block;
                vertical-align: top;
                
                .textfield-item input.form-control {
                    text-align: center;
                    padding: 0 !important;
                    
                    &:hover, &:active, &:focus {
                        border: ${inputBorderWidth}px solid ${props => props.theme.palette.clrPurple};
                    }
                }
            }
            
            .login_number_field_wrap {
                flex: 1;
                display: flex;
                flex-direction: row;
                align-items: flex-start;
                justify-content: flex-start;
                vertical-align: top;

                &.with-button {
                    .textfield-item {
                        input.form-control {
                            border-right: none !important;
                            border-radius: ${inputBorderRadius}px 0 0 ${inputBorderRadius}px;
                    
                            &:hover, &:active, &:focus {
                                border: ${inputBorderWidth}px solid ${props => props.theme.palette.clrPurple};
                            }
                        }
                    }
                }
                
                .number_action {
                    position: relative;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: center;
                    margin: 0;
                    border: 1px solid ${props => props.theme.palette.telegramLoginControlBorderColor};
                    border-radius: 0 4px 4px 0;
                    padding: 0;
                    width: ${inputHeight}px;
                    height: ${inputHeight}px;
                    background: ${props => props.theme.palette.telegramLoginControlBackground};
                    overflow: hidden;
                }
            }
        }
    }
}
`;

export default StyleWrapper;
