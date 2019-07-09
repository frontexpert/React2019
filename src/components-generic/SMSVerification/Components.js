import React from 'react';
import styled from 'styled-components';

export const Wrapper = styled.div`
    flex: 1;
    height: 100%;
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    ${props => !props.isMobile ? `
        position: absolute;
        left: 1px;
        right: 1px;
        top: 1px;
        z-index: 50;
        height: 58px;
        background-color: ${props.theme.palette.clrBackground};
    ` : ''};
`;

export const PhoneNumberPartial = styled.div`
    position: relative;
    width: ${props => props.isMobile ? 64 : 52}px;
    // max-width: 330px;
    height: ${props => props.isMobile ? 64 : 52}px;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    padding: 0 ${props => props.isMobile ? 9 : 4}px;
    margin: 0;
    border: 2px solid ${props => props.theme.palette.mobile2PhoneInputBorder};
    border-radius: ${props => props.isMobile ? 32 : 26}px;
    background: ${props => props.theme.palette.mobile2PhoneInputBg};
    box-shadow: ${props => props.isMobile ? `0 0 20px 10px ${props.theme.palette.mobile2CircleGlowColor}d0` : 'none'};
    overflow: hidden;
    z-index: 1;
    
    @keyframes enter-phone-number-wrapper-animation {
        0% {
            padding: 0 ${props => props.isMobile ? 9 : 4}px;
            width: ${props => props.isMobile ? 64 : 52}px;
            height: ${props => props.isMobile ? 64 : 52}px;
        }
        
        100% {
            padding: 0 ${props => props.isMobile ? 9 : 4}px 0 ${props => props.isMobile ? 20 : 16}px;
            width: 100%;
            height: ${props => props.isMobile ? 64 : 52}px;
        }
    }
    
    @keyframes enter-code-wrapper-animation {
        0% {
            padding: 0 ${props => props.isMobile ? 9 : 4}px 0 ${props => props.isMobile ? 20 : 16}px;
            width: 100%;
            height: ${props => props.isMobile ? 64 : 52}px;
        }

        100% {
            padding: 0 ${props => props.isMobile ? 9 : 4}px 0 ${props => props.isMobile ? 20 : 16}px;
            width: 100%;
            height: ${props => props.isMobile ? 126 : 52}px;
        }
    }

    @keyframes view-qr-again-wrapper-animation {   
        0% {
            padding: 0 ${props => props.isMobile ? 9 : 4}px 0 ${props => props.isMobile ? 20 : 16}px;
            width: 100%;
            height: ${props => props.isMobile ? 64 : 52}px;
        }

        100% {
            padding: 0 ${props => props.isMobile ? 9 : 4}px
            width: ${props => props.isMobile ? 64 : 52}px;
            height: ${props => props.isMobile ? 64 : 52}px;
        }
    }

    @keyframes verify-success-wrapper-animation {
        0% {
            width: 100%;
            height: ${props => props.isMobile ? 126 : 52}px;
            opacity: 1;
        }
        
        100% {
            opacity: 0;
            padding: 0 ${props => props.isMobile ? 9 : 4}px
            width: 100%;
            height: ${props => props.isMobile ? 64 : 52}px;
        }
    }

    &.view-qr {
        opacity: 0;
    }

    &.enter-phone-number {
        animation-name: enter-phone-number-wrapper-animation;
        animation-duration: .5s;
        animation-delay: .5s;
        animation-fill-mode: both;
    }

    &.enter-code {
        animation-name: enter-code-wrapper-animation;
        animation-duration: .5s;
        animation-fill-mode: both;
        
        .phone-number-input {
            margin-top: ${props => props.isMobile ? 0 : '-52px'};
        }
        
        .separator {
            display: ${props => props.isMobile ? 'block' : 'none'};
        }
        
        .code-input {
            display: flex;
        }
    }
    
    &.view-qr-again {
        animation-name: view-qr-again-wrapper-animation;
        animation-duration: .5s;
        animation-fill-mode: both;
    }
    
    &.verify-success {
        animation-name: verify-success-wrapper-animation;
        animation-duration: .5s;
        animation-fill-mode: both;
        pointer-events: none;
    }
    
    .separator {
        position: absolute;
        top: 62px;
        left: 0;
        display: none;
        width: 100%;
        height: 0;
        margin: 0;
        border: none;
        border-top: 2px solid ${props => props.theme.palette.mobile2PhoneInputBorder};
    }
`;

export const InputWrapper = styled.div`
    flex-shrink: 1;
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 60px;
    overflow: visible;
    
    @keyframes enter-code-input-animation {
        0% {
            height: 0;
        }

        100% {
            height: 60px;
        }
    }
    
    &.code-input {
        display: none;
        margin-top: 2px;
        height: 0;

        &.enter-code {
            animation-name: enter-code-input-animation;
            animation-duration: .5s;
            animation-fill-mode: both;
        }
    }
`;

export const Input = styled.input`
    width: 100%;
    min-width: 0;
    height: 50px;
    margin: 0;
    padding: 0 !important;
    flex-shrink: 1;
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background: transparent;
    border: none;
    font-size: 20px;
    line-height: 1em;
    font-weight: normal;
    font-family: 'Exo 2', sans-serif;
    color: ${props => props.theme.palette.clrHighContrast};
    outline: none !important;
    transition: .5s;

    &::placeholder {
        color: ${props => props.theme.palette.clrLightGray};
    }
`;

export const InputAddon = styled.div`
    flex-shrink: 0;
    flex-grow: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    border: 2px solid ${props => props.theme.palette.mobile2PhoneInputBorder};
    border-radius: 30px;
    width: 40px;
    height: 40px;
    background: ${props => props.theme.palette.mobile2PhoneInputBg};
    box-shadow: 0 0 20px 10px ${props => props.theme.palette.mobile2CircleGlowColor}70;
    cursor: pointer;
    
    .close {
        width: 18px;
        height: 18px;
        fill: ${props => props.theme.palette.mobile2PhoneInputBorder};
    }
`;

const QRIconSvg = styled.svg`
    width: 18px;
    height: 18px;

    & * {
        fill: ${props => props.theme.palette.mobile2PhoneInputBorder};
    }
`;

export const QRIcon = props => (
    <QRIconSvg {...props} viewBox="0 0 16.27 16.27">
        <path className="cls-1" d="M0,16.27H7.4V8.88H0Zm1.48-5.92H5.92v4.43H1.48Z" />
        <rect className="cls-1" x="2.96" y="11.83" width="1.48" height="1.48" />
        <rect className="cls-1" x="11.83" y="14.79" width="1.48" height="1.48" />
        <rect className="cls-1" x="14.79" y="14.79" width="1.48" height="1.48" />
        <path className="cls-1" d="M14.79,10.35H13.31V8.88H8.88v7.39h1.47V11.83h1.48v1.48h4.44V8.88H14.79Z" />
        <path className="cls-1" d="M0,7.4H7.4V0H0ZM1.48,1.48H5.92V5.92H1.48Z" />
        <rect className="cls-1" x="2.96" y="2.96" width="1.48" height="1.48" />
        <path className="cls-1" d="M8.88,0V7.4h7.39V0Zm5.91,5.92H10.35V1.48h4.44Z" />
        <rect className="cls-1" x="11.83" y="2.96" width="1.48" height="1.48" />
    </QRIconSvg>
);


const SendIconSvg = styled.svg`
    width: 18px;
    height: 18px;
    cursor: pointer;

    & * {
        fill: ${props => props.theme.palette.mobile2PhoneInputBorder};
    }
`;

export const SendIcon = props => (
    <SendIconSvg {...props} viewBox="0 0 16.18 13.02">
        <polygon className="cls-1" points="16.18 6.51 9.68 0 9.68 3.22 0 3.22 0 9.08 9.68 9.08 9.68 13.02 16.18 6.51" />
    </SendIconSvg>
);

const SpinnerIconSvg = styled.svg`
    width: 18px;
    height: 18px;
`;

export const SpinnerIcon = props => (
    <SpinnerIconSvg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" {...props}>
        <g transform="rotate(0 50 50)">
            <rect x="47" y="9" rx="30.55" ry="5.8500000000000005" width="6" height="18" fill="rgb(50, 102, 209)">
                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.9333333333333333s" repeatCount="indefinite" />
            </rect>
        </g>
        <g transform="rotate(24 50 50)">
            <rect x="47" y="9" rx="30.55" ry="5.8500000000000005" width="6" height="18" fill="rgb(50, 102, 209)">
                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.8666666666666667s" repeatCount="indefinite" />
            </rect>
        </g>
        <g transform="rotate(48 50 50)">
            <rect x="47" y="9" rx="30.55" ry="5.8500000000000005" width="6" height="18" fill="rgb(50, 102, 209)">
                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.8s" repeatCount="indefinite" />
            </rect>
        </g>
        <g transform="rotate(72 50 50)">
            <rect x="47" y="9" rx="30.55" ry="5.8500000000000005" width="6" height="18" fill="rgb(50, 102, 209)">
                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.7333333333333333s" repeatCount="indefinite" />
            </rect>
        </g>
        <g transform="rotate(96 50 50)">
            <rect x="47" y="9" rx="30.55" ry="5.8500000000000005" width="6" height="18" fill="rgb(50, 102, 209)">
                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.6666666666666666s" repeatCount="indefinite" />
            </rect>
        </g>
        <g transform="rotate(120 50 50)">
            <rect x="47" y="9" rx="30.55" ry="5.8500000000000005" width="6" height="18" fill="rgb(50, 102, 209)">
                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.6s" repeatCount="indefinite" />
            </rect>
        </g>
        <g transform="rotate(144 50 50)">
            <rect x="47" y="9" rx="30.55" ry="5.8500000000000005" width="6" height="18" fill="rgb(50, 102, 209)">
                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5333333333333333s" repeatCount="indefinite" />
            </rect>
        </g>
        <g transform="rotate(168 50 50)">
            <rect x="47" y="9" rx="30.55" ry="5.8500000000000005" width="6" height="18" fill="rgb(50, 102, 209)">
                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.4666666666666667s" repeatCount="indefinite" />
            </rect>
        </g>
        <g transform="rotate(192 50 50)">
            <rect x="47" y="9" rx="30.55" ry="5.8500000000000005" width="6" height="18" fill="rgb(50, 102, 209)">
                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.4s" repeatCount="indefinite" />
            </rect>
        </g>
        <g transform="rotate(216 50 50)">
            <rect x="47" y="9" rx="30.55" ry="5.8500000000000005" width="6" height="18" fill="rgb(50, 102, 209)">
                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.3333333333333333s" repeatCount="indefinite" />
            </rect>
        </g>
        <g transform="rotate(240 50 50)">
            <rect x="47" y="9" rx="30.55" ry="5.8500000000000005" width="6" height="18" fill="rgb(50, 102, 209)">
                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.26666666666666666s" repeatCount="indefinite" />
            </rect>
        </g>
        <g transform="rotate(264 50 50)">
            <rect x="47" y="9" rx="30.55" ry="5.8500000000000005" width="6" height="18" fill="rgb(50, 102, 209)">
                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.2s" repeatCount="indefinite" />
            </rect>
        </g>
        <g transform="rotate(288 50 50)">
            <rect x="47" y="9" rx="30.55" ry="5.8500000000000005" width="6" height="18" fill="rgb(50, 102, 209)">
                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.13333333333333333s" repeatCount="indefinite" />
            </rect>
        </g>
        <g transform="rotate(312 50 50)">
            <rect x="47" y="9" rx="30.55" ry="5.8500000000000005" width="6" height="18" fill="rgb(50, 102, 209)">
                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.06666666666666667s" repeatCount="indefinite" />
            </rect>
        </g>
        <g transform="rotate(336 50 50)">
            <rect x="47" y="9" rx="30.55" ry="5.8500000000000005" width="6" height="18" fill="rgb(50, 102, 209)">
                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite" />
            </rect>
        </g>
    </SpinnerIconSvg>
);
