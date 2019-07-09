import styled from 'styled-components';
import { darkTheme } from '../../../theme/core';

// Copied from PhoneInput/style.js
const spacing3 = 12; // space between columns
const numberFontSize = 12;
const inputBorderWidth = 1;
const inputBorderColor = darkTheme.palette.telegramLoginControlBorderColor;
const inputBorderRadius = 4;
const inputPaddingV = 2;
const inputHeight = 40;
const inputTextColor = darkTheme.palette.telegramLoginControlTextColor;
const inputBackground = darkTheme.palette.telegramLoginControlBackground;

export const TelegramLoginModalWrapper = styled.div.attrs({ className: 'telegram-login-modal-wrapper' })`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, .435);
    z-index: 1000000; // made higher than wallet table
    
    .telegram-login-modal {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: stretch;
        margin: 0;
        border: 1px solid ${props => props.theme.palette.telegramLoginBorder};
        border-radius: 4px;
        padding: 0;
        width: 100%;
        max-width: 550px;
        min-height: 440px;
        background: ${props => props.theme.palette.telegramLoginBackground};
        color: ${props => props.theme.palette.telegramLoginTextColor};
        box-shadow: 0 3px 15px rgba(0, 0, 0, .5);

        & * {
            font-family: 'open_sans', sans-serif;
        }

        .content {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            width: 100%;

            &.loading {
                // filter: blur(2px);
            }

            .header-images {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                margin: 0;
                border: none;
                padding: 35px 0 15px;
    
                .header-images__telegram {
                    width: 44px;
                    height: 44px;
                }
    
                .header-images__arrow {
                    width: 40px;
                    height: 20px;
                    margin-left: 8px;
                    margin-right: 9px;
                }
    
                .header-images__logo-wrapper {
                    margin: 0;
                    padding: 0;
                    width: 37px;
                    height: 40px;
                    background: transparent;
                }
            }

            .header-text__lead {
                max-width: 300px;
            }

            .header-text__instruction {
                max-width: 250px;
            }

            .header-text__tail {
                max-width: 250px;
            }
            
            .text-wrapper-2fa {
                span {
                    width: 65px !important;
                    font-weight: 600 !important;
                }
            }
        }
        
        .loading-panel {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            background: rgba(0, 0, 0, .35);
            z-index: 10;
        }
    }

    // components
    .telegram-login-text {
        margin: 0 0 25px;
        padding: 0;
        width: 100%;
        text-align: center;
        font-size: 16px;
        font-weight: 300;
        line-height: 19.2px;
        color: ${props => props.theme.palette.telegramLoginTextColor};

        a {
            text-decoration: none;
            color: ${props => props.theme.palette.telegramLoginTextColor};
            
            &:hover {
              color: ${props => props.theme.palette.telegramLoginTextColor};
              text-decoration: underline;
            }
        }

        span {
            font-weight: 600;
        }
    }

    .telegram-login-input-wrapper {
        flex: 1;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: stretch;
        width: 225px;

        & > * {
            flex: 1;
            width: 50%;
        }

        & > span {
            text-align: right;
            padding-right: ${spacing3}px;
            margin: 0;
        }
    }
`;

export const Close = styled.button`
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: 0;
    padding: 0;
    width: 21px;
    height: 21px;
    transform: translate(50%, -50%);
    background-color: ${props => props.theme.palette.telegramLoginControlAddonColor};
    z-index: 11;

    &:hover {
        cursor: pointer;
        filter: brightness(110%);
    }

    &:focus {
        outline: none;
    }
`;

export const Icon = styled.img`
    width: 50%;
    height: 50%;
`;

export const InputAddonBtn = styled.button.attrs({ className: 'telegram-login-addon-btn' })`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: 0;
    border: none;
    width: 100%;
    height: 100%;
    background: ${props => props.theme.palette.telegramLoginControlBackground};
    outline: none !important;
    cursor: pointer;
    
    img {
        width: 18px;
        height: 17px;
    }
    
    &:hover, &:focus {
        background: ${props => props.theme.palette.telegramLoginDropdownItemHoverBackgroundColor};
    }
    
    &:active, &.active {
        background: ${props => props.theme.palette.telegramLoginDropdownItemActiveBackgroundColor};
    }
`;

export const CheckAddon = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: 0;
    border: none;
    width: 100%;
    height: 100%;
    background: ${props => props.theme.palette.clrPurple};
    
    img {
        width: 10px;
        height: 8px;
    }
`;

export const ErrorMsg = styled.span`
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    min-height: 30px;
    font-size: 16px;
    color: ${props => props.theme.palette.telegramLoginErrorMsg};
`;

export const InputWithAddonWrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    
    .text-field {
        flex: 1;
        position: relative;
        margin: 0;
        padding: 0;

        input {
            padding: ${inputPaddingV}px 10px;
            width: 100%;
            height: ${inputHeight}px;
            font-size: ${numberFontSize}px;
            line-height: 1em;
            font-weight: normal;
            font-family: inherit;
            background-color: ${inputBackground};
            border: ${inputBorderWidth}px solid ${inputBorderColor};
            border-right: 0;
            border-radius: ${inputBorderRadius}px 0 0 ${inputBorderRadius}px;
            color: ${inputTextColor};
            letter-spacing: 1px;
            text-align: left;

            &:focus {
                outline: none;
            }
        }
    }

    .addon {
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin: 0;
        border: 1px solid ${props => props.theme.palette.telegramLoginControlBorderColor};
        border-radius: 0 4px 4px 0;
        padding: 0;
        width: 38px;
        height: 40px;
        background: ${props => props.theme.palette.telegramLoginControlBackground};
        overflow: hidden;
    }
`;
