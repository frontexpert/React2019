import React from 'react';
import styled from 'styled-components';

import { darkTheme } from '../../../theme/core';

const { palette } = darkTheme;

export const CenterLabel = styled.div`
    width: ${props => props.size}px;
    height: ${props => props.size}px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 48px;
    color: ${palette.clrHighContrast};
    padding: 0 20px;
    
    .amount-wrapper {
        position: relative;
        display: flex;
        
        .amount {
            font-family: 'Exo 2', sans-serif;
            font-size: ${props => props.isSmallFont ? '50px' : '80px'};
            line-height: ${props => props.isSmallFont ? '50px' : '80px'};
            font-weight: 200;
            word-break: break-all;
        }
    }
    
    .selected-item {
        margin-top: 3px;
        margin-right: 5px;
        font-size: 32px;
        color: ${palette.clrHighContrast};
    }
    
    .mobile {
        left: 33.33%;
        right: 33.33%;
    }
    
    .label {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        text-align: center;
        font-family: 'Exo 2', sans-serif;
        font-weight: 500;
        font-size: 15px;
        margin-top: 20px;
        color: ${palette.clrHighContrast};
        text-transform: uppercase;
    }
`;

export const TelegramWrapper = styled.div`
    position: relative;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
    
    > svg {
        position: relative;
        z-index: 10;
        background-color: ${palette.mobile2CircleMainBg};
        border: 2px solid ${palette.mobileSignFormMainColor};
        border-radius: 50%;
        fill: ${palette.mobileSignFormMainColor};
        pointer-events: none;
        
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

const Svg = styled.svg`
    width: 60px;
    height: 60px;
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
