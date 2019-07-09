import React from 'react';
import styled from 'styled-components';

export const Wrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

export const UpperWrapper = styled.div`
    padding: 50px 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    background-color: ${props => props.theme.palette.clrBackground};
    
    > div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
`;

export const LoginTitle = styled.div`
    margin-bottom: 24px;
    font-size: 36px;
    font-weight: 600;
    color: ${props => props.theme.palette.mobileSignFormMainColor};
    
    span {
        display: block;
        font-size: 20px;
        color: ${props => props.theme.palette.mobileSignFormColor};
        text-align: center;
    }
`;

export const CodeInputWrapper = styled.div`
    display: ${props => props.hide ? 'none' : 'block'};
    text-align: center;
`;

export const InputWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    
    input {
        width: 50px;
        height: 50px;
        background: transparent;
        border: 0;
        border-bottom: 2px solid ${props => props.theme.palette.mobileSignFormMainColor};
        font-size: 36px;
        font-weight: 600;
        color: ${props => props.theme.palette.mobileSignFormMainColor};
        text-align: center;
        
        &:not(:first-child) {
            margin-left: 8px;
        }
    }
`;

export const SocialTitle = styled.div`
    margin-bottom: 16px;
    font-size: 24px;
    font-weight: 600;
    color: ${props => props.theme.palette.mobileSignFormColor};
`;

export const SocialWrapper = styled.div`
    display: flex;
    align-items: center;
    
    svg {
        border: 2px solid ${props => props.theme.palette.mobileSignFormMainColor};
        border-radius: 50%;
        fill: ${props => props.theme.palette.mobileSignFormMainColor};
        cursor: pointer;
        
        &:not(:first-child) {
            margin-left: 16px;
        }
        
        .telegram-cls-3 {
            fill: #9ec2e5;
        }
        
        .telegram-cls-4 {
            fill: #dadde0;
        }
        
        .telegram-cls-5 {
            fill: #d1d1d1;
        }
        
        .telegram-cls-6 {
            fill: #020518;
        }
        
        .messenger-cls-3 {
            fill: #020518;
        }
        
        &:hover {
            border-color: ${props => props.theme.palette.clrBlue};
            fill: ${props => props.theme.palette.clrBlue};
        }
    }
`;

const Svg = styled.svg`
    width: 60px;
    height: 60px;
`;

export const FacebookIcon = (props) => (
    <Svg viewBox="0 0 126.09 126.09" {...props}>
        <path d="M52.46,40.55V50.71H45V63.12h7.44V100H67.74V63.12H78s1-5.95,1.42-12.46H67.8V42.17a3.6,3.6,0,0,1,3.31-3h8.33V26.27H68.12c-16,0-15.66,12.43-15.66,14.28Z" />
    </Svg>
);

export const TelegramWrapper = styled.div`
    position: relative;
    width: 60px;
    height: 60px;
    margin-left: 16px;
    border-radius: 50%;
    overflow: hidden;
    
    > svg {
        position: relative;
        z-index: 10;
        background-color: ${props => props.theme.palette.clrBackground};
        pointer-events: none;
        margin-left: 0 !important;
    }
    
    > div {
        position: absolute;
        left: -20px;
        top: 0;
        z-index: 0;
        
        .telegram-login {
            display: none;
        }
    }
`;

export const TelegramIcon = (props) => (
    <Svg viewBox="0 0 122.18 122.18" {...props}>
        <path
            className="telegram-cls-2"
            d="M91.32,32.1a3.26,3.26,0,0,1,4.38,3.71L84.87,87.59a3.42,3.42,0,0,1-5.36,2.06l-16.35-12-8.34,8.51a2.77,2.77,0,0,1-4.62-1.1L44.19,66,28.07,61.19a2.31,2.31,0,0,1-.19-4.37ZM83.37,43.59a.77.77,0,0,0-.92-1.23L47.66,63.94A1.59,1.59,0,0,0,47,65.76L51.72,86.6a.31.31,0,0,0,.6-.06l1.06-15.88a1.58,1.58,0,0,1,.52-1Z"
        />
        <path
            className="telegram-cls-3"
            d="M82.45,42.36a.77.77,0,0,1,.92,1.23L53.9,69.65a1.58,1.58,0,0,0-.52,1L52.32,86.54a.3.3,0,0,1-.59.06L47,65.76a1.59,1.59,0,0,1,.68-1.82Z"
        />
        <path
            className="telegram-cls-2"
            d="M51.9,86.81a2.71,2.71,0,0,1-1.7-1.76L44.19,66,28.07,61.19a2.31,2.31,0,0,1-.19-4.37L91.32,32.1a3.25,3.25,0,0,1,3.94,1.29,3,3,0,0,0-.52-.61l-43,35.13v1.54l-.24-.17L51.71,79v7.77l.19.08Z"
        />
        <path
            className="telegram-cls-2"
            d="M95.77,34.94a3.74,3.74,0,0,1-.07.87L84.87,87.59a3.42,3.42,0,0,1-5.36,2.06l-16.35-12L51.71,69.45V67.91l43-35.14a3.36,3.36,0,0,1,.52.62l.09.14.07.14a2026399579431.54,2026399579431.54,0,0,0,.14.3.88.88,0,0,1,0,.15,2,2,0,0,1,.12.5,3.11,3.11,0,0,1,0,.32Z"
        />
        <path
            className="telegram-cls-2"
            d="M63,77.66l-8.08,8.2a1.29,1.29,0,0,1-.21.19l-.21.16h0a2.25,2.25,0,0,1-.46.24,1.25,1.25,0,0,1-.25.09,2.61,2.61,0,0,1-1,.09l-.27,0h0l-.27-.08-.08,0-.18-7.55V69.77Z"
        />
        <path className="telegram-cls-4" d="M54.61,86.35l-.23.17h0l.23-.17Z" />
        <path className="telegram-cls-4" d="M54.38,86.52Z" />
        <path className="telegram-cls-4" d="M53.9,86.78a2.83,2.83,0,0,0,.48-.26,2.83,2.83,0,0,1-.48.26Z" />
        <path className="telegram-cls-4" d="M52.57,87a3,3,0,0,0,1.07-.1,2.58,2.58,0,0,1-.78.11h-.29Z" />
        <path className="telegram-cls-2" d="M52.86,87h0Z" />
        <path className="telegram-cls-2" d="M52.57,87h0a1,1,0,0,1-.25,0l.2,0Z" />
        <path className="telegram-cls-4" d="M52.57,87l-.2,0-.08,0,.28,0Z" />
        <path className="telegram-cls-4" d="M52,86.84l.27.08-.11,0,0,0a.53.53,0,0,1-.12,0Z" />
        <path className="telegram-cls-2" d="M52.14,86.89l.11,0-.11,0Z" />
        <path className="telegram-cls-2" d="M52,86.84a.53.53,0,0,0,.12,0l-.19-.05.07,0Z" />
        <path className="telegram-cls-4" d="M52,86.84l-.07,0h0l.08,0Z" />
        <path className="telegram-cls-5" d="M51.71,79l.19,7.85-.19-.08Z" />
        <path className="telegram-cls-4" d="M51.71,69.45V79l-.24-9.68Z" />
        <path
            className="telegram-cls-6"
            d="M83.37,43.59,53.9,69.65a1.58,1.58,0,0,0-.52,1L52.32,86.54a.31.31,0,0,1-.6.06L47,65.76a1.59,1.59,0,0,1,.68-1.82L82.45,42.36a.77.77,0,0,1,.92,1.23Z"
        />
    </Svg>
);

export const MessengerIcon = (props) => (
    <Svg viewBox="0 0 126.18 126.18" {...props}>
        <path
            d="M103.9,73.23C103.9,62,92.55,53,78.56,53S53.22,62,53.22,73.23,64.56,93.5,78.56,93.5a30.35,30.35,0,0,0,6.61-.79l13.66,5.86L94.1,89.13C100,85.42,103.9,79.71,103.9,73.23Z"
        />
        <path
            d="M53.22,27.62C36.42,27.62,22.81,39,22.81,53c0,8.06,4.55,15.22,11.61,19.85l-4,8,10.92-4.68A34.73,34.73,0,0,0,48.7,78a21.58,21.58,0,0,1-.55-4.76c0-14,13.64-25.34,30.41-25.34a35.33,35.33,0,0,1,4.51.31C80.4,36.48,68.05,27.62,53.22,27.62Z"
        />
        <circle className="messenger-cls-3" cx="43.08" cy="42.82" r="3.8" />
        <circle className="messenger-cls-3" cx="63.35" cy="42.82" r="3.8" />
        <circle className="messenger-cls-3" cx="70.95" cy="68.16" r="3.8" />
        <circle className="messenger-cls-3" cx="86.16" cy="68.16" r="3.8" />
    </Svg>
);

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

export const Label = styled.div`
    margin-top: 10px;
    font-size: 20px;
    font-weight: 600;
    color: ${props => props.theme.palette.clrBlue};
    cursor: pointer;
`;

export const ErrorLabel = styled.div`
    margin-bottom: 10px;
    font-size: 16px;
    color: ${props => props.theme.palette.clrRed};
    text-align: center;
`;

export const KeyPadWrapper = styled.div`
    width: 100%;
    padding: 8px;
    background-color: #cbcbd6;
    border-radius: ${props => props.theme.palette.borderRadius};
`;

export const Row = styled.div`
    display: flex;
    align-items: center;
    
    &:not(:first-child) {
        margin-top: 8px;
    }
`;

export const KeyPad = styled.div`
    height: 60px;
    padding: 8px;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f7f5f6;
    border-radius: 8px;
    font-size: 24px;
    line-height: 1;
    font-weight: 600;
    cursor: pointer;
    
    &:not(:first-child) {
        margin-left: 8px;
    }
    
    .small {
        height: 16px;
        margin-top: 4px;
        font-size: 16px;
        font-weight: 400;
    }
`;

export const EmptyPad = styled(KeyPad)`
    background: transparent;
`;

const BackSvg = styled.svg`
    width: 24px;
    height: 24px;
`;

export const BackSpaceIcon = (props) => (
    <BackSvg viewBox="0 0 24 24" {...props}>
        <path fill="none" d="M0 0h24v24H0V0z" />
        <path d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z" />
    </BackSvg>
);
