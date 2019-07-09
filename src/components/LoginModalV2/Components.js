import styled from 'styled-components';
import { darkTheme } from '../../theme/core';

// Copied from PhoneInput/style.js
const spacing3 = 12; // space between columns
const numberFontSize = 18;
const inputBorderWidth = 1;
const inputBorderColor = darkTheme.palette.telegramLoginControlBorderColor;
const inputBorderRadius = 4;
const inputPaddingV = 2;
const inputHeight = 61;
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
    
    // Specified Styles
    .telegram-login-modal {
        position: relative;
        width: 550px;
        min-height: 455px;
        margin: 0;
        padding: 35px 0 0;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        background: ${props => props.theme.palette.telegramLoginBackground};
        border: 1px solid ${props => props.theme.palette.telegramLoginBorder};
        border-radius: 4px;
        color: ${props => props.theme.palette.telegramLoginTextColor};
        box-shadow: 0 3px 15px rgba(0, 0, 0, .5);

        & * {
            font-family: 'open_sans', sans-serif;
        }

        &.has-bottom-addon {
            border-bottom: none !important;
            border-bottom-left-radius: 0 !important;
            border-bottom-right-radius: 0 !important;        
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

            .header-text__tail {
                max-width: 280px;
                margin-bottom: 0;
            }
        }
        
        .telegram-login-modal__bottom-addon {
            position: absolute;
            top: 100%;
            left: -1px;
            right: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            border: 1px solid ${props => props.theme.palette.telegramLoginBorder};
            border-bottom-left-radius: 4px;
            border-bottom-right-radius: 4px;
            width: 343px;
            height: min-content;
            min-height: 216px;
            background: ${props => props.theme.palette.telegramLoginBackground};
            color: ${props => props.theme.palette.telegramLoginTextColor};
            box-shadow: 0 3px 15px rgba(0, 0, 0, .5);
        }
    }

    .telegram-login__2fa-form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 30px;

        .addon.without-wrapper {
            width: 40px;
            height: 40px;
            flex: unset;
            border: 1px solid ${props => props.theme.palette.telegramLoginControlBorderColor};
            border-radius: 4px;
            
            .telegram-login-addon-btn {
                border-radius: 4px;
            }
        }
    }

    // Component Styles
    .telegram-login-text {
        margin-bottom: 15px;
        padding: 0;
        width: 100%;
        text-align: center;
        font-size: 15px;
        font-weight: 400;
        letter-spacing: 1.1px;
        color: ${props => props.theme.palette.telegramLoginTitle};

        a {
            text-decoration: none;
            color: ${props => props.theme.palette.telegramLoginTitle};
            
            &:hover {
                color: ${props => props.theme.palette.telegramLoginTextColor};
                text-decoration: underline;
            }
        }
    }

    .telegram-login-description {
        margin-bottom: 18px;
        padding: 0;
        width: 100%;
        text-align: center;
        color: ${props => props.theme.palette.telegramLoginTextColor};
        font-size: 15px;
        font-weight: normal;
        line-height: 1.2em;
    }
    
    .telegram-login__link {
        margin: 0 0 18px 30px;
        border-bottom: 1px solid ${props => props.theme.palette.telegramLoginControlAddonColor};
        padding-bottom: 2px;
        color: ${props => props.theme.palette.telegramLoginControlAddonColor};
        font-size: 11px;
        font-weight: normal;
        cursor: pointer;
        white-space: nowrap;
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
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${props => props.theme.palette.telegramLoginControlBackground};
    border: 0;
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
        width: 15px;
        height: 11px;
    }
`;

export const ErrorMsg = styled.span`
    position: absolute;
    bottom: 10px;
    width: 300px;
    font-size: 15px;
    color: ${props => props.theme.palette.telegramLoginErrorMsg};
    text-align: center;
`;

export const InputWithAddonWrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;

    .text-field {
        flex: 1;
        position: relative;
        margin: 0;
        padding: 0;

        input {
            padding: ${inputPaddingV}px 20px;
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
        width: ${inputHeight}px;
        height: ${inputHeight}px;
        background: ${props => props.theme.palette.telegramLoginControlBackground};
        overflow: hidden;
    }
`;

export const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: 0;
    width: 100%;

    button {
        &:last-child {
            margin-left: 8px;
        }
        
        &:disabled {
            .gradient-button__content {
                background: ${props => props.theme.palette.telegramLoginDisabled} !important;
            }
        }
    }
`;
