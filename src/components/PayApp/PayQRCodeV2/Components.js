import React from 'react';
import styled from 'styled-components';
import { darkTheme } from '../../../theme/core';

const { palette } = darkTheme;

export const Wrapper = styled.div.attrs({ className: 'qr-code-view-wrapper' })`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    margin: 0;
    border: none;
    padding: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
`;

export const QRCodeWrapper = styled.div.attrs({ className: 'qr-code-wrapper' })`
    flex-shrink: 0;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    transition: 1s;
    transform: scale(1.05);
    opacity: 1;
    border-radius: 50%;
    filter: drop-shadow(0 0 15px ${props => props.theme.palette.mobile2QRGlowColor});

    .qr-code-back {
        position: absolute;
        width: 100%;
        height: 100%;
    }
    
    .qr-code, canvas {
        width: 66% !important;
        height: 66% !important;
        z-index: 1;
    }
`;

export const InnerCenterWrapper = styled.div.attrs({ className: 'center-wrapper' })`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    border: none;
    padding: 0;
    width: ${props => props.width ? props.width + 'px' : '100%'};
    height: ${props => props.height ? props.height + 'px' : '100%'};
`;

export const QRCodePartial = styled.div.attrs({ className: 'center-wrapper__qr-code-partial' })`
    flex-shrink: 0;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    border-radius: 50%;
    padding: 0;
    width: ${props => props.width ? props.width + 'px' : '0px'};
    height: ${props => props.height ? props.height + 'px' : '0px'};
    // transition: .5s;
    overflow: visible;
    transform: rotateZ(0deg);
    z-index: 2;
    box-shadow: 0 0 120px 0 #3269d1;
    border: 2px solid ${props => props.theme.palette.clrHighContrast};

    @keyframes qr-code-hide {
        0% {
            width: ${props => props.width ? props.width + 'px' : '0px'};
            height: ${props => props.height ? props.height + 'px' : '0px'};
            transform: rotateZ(0deg);
            opacity: 1;
        }
        
        90% {
            width: 50px;
            height: 50px;
            opacity: 1;
        }
        
        100% {
            width: 50px;
            height: 50px;
            transform: rotateZ(360deg);
            opacity: 0;
        }
    }

    @keyframes show-again {
        0% {
            width: 50px;
            height: 50px;
            transform: rotateZ(360deg);
            opacity: 0;
        }
        
        10% {
            width: 50px;
            height: 50px;
            opacity: 1;
        }

        100% {
            width: ${props => props.width ? props.width + 'px' : '0px'};
            height: ${props => props.height ? props.height + 'px' : '0px'};
            transform: rotateZ(0deg);
            opacity: 1;
        }

    }

    &.hide {
        animation-name: qr-code-hide;
        animation-duration: .5s;
        animation-fill-mode: both;
        pointer-events: none;
    }
    
    &.show-again {
        animation-name: show-again;
        animation-duration: .5s;
        animation-delay: .5s;
        animation-fill-mode: both;
    }
`;

export const PhoneNumberPartial = styled.div`
    flex-shrink: 0;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0;
    border: 2px solid ${palette.mobile2PhoneInputBorder};
    border-radius: 35px;
    padding: 0 9px;
    width: 64px;
    height: 64px;
    background: ${palette.mobile2PhoneInputBg};
    box-shadow: 0 0 20px 10px ${palette.mobile2CircleGlowColor}d0;
    overflow: hidden;
    z-index: 1;
    
    @keyframes enter-phone-number-wrapper-animation {
        0% {
            padding: 0 9px;
            width: 64px;
            height: 64px;
        }
        
        100% {
            padding: 0 9px 0 20px;
            width: calc(100% - 50px);
            height: 64px;
        }
    }
    
    @keyframes enter-code-wrapper-animation {
        0% {
            padding: 0 9px 0 20px;
            width: calc(100% - 50px);
            height: 64px;
        }

        100% {
            padding: 0 9px 0 20px;
            width: calc(100% - 50px);
            height: 126px;
        }
    }

    @keyframes view-qr-again-wrapper-animation {   
        0% {
            padding: 0 9px 0 20px;
            width: calc(100% - 50px);
            height: 64px;
        }

        100% {
            padding: 0 9px;
            width: 64px;
            height: 64px;
        }
    }

    @keyframes verify-success-wrapper-animation {
        0% {
            width: calc(100% - 50px);
            height: 126px;
            opacity: 1;
        }
        
        100% {
            opacity: 0;
            padding: 0 9px;
            width: calc(100% - 50px);
            height: 64px;
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
        
        .separator {
            display: block;
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
        border-top: 2px solid ${palette.mobile2PhoneInputBorder};
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
    flex-shrink: 1;
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: 0;
    border: none;
    padding: 0 !important;
    width: 100%;
    min-width: 0;
    height: 50px;
    background: transparent;
    font-size: 20px;
    line-height: 1em;
    font-weight: normal;
    font-family: 'Exo 2', sans-serif;
    color: ${palette.clrHighContrast};
    outline: none !important;
    transition: .5s;

    &::placeholder {
        color: ${palette.clrLightGray};
    }
`;

export const InputAddon = styled.div`
    flex-shrink: 0;
    flex-grow: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    border: 2px solid ${palette.mobile2PhoneInputBorder};
    border-radius: 30px;
    width: 40px;
    height: 40px;
    background: ${palette.mobile2PhoneInputBg};
    box-shadow: 0 0 20px 10px ${palette.mobile2CircleGlowColor}70;
`;

const QRIconSvg = styled.svg`
    width: 18px;
    height: 18px;

    & * {
        fill: ${palette.mobile2PhoneInputBorder};
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

    & * {
        fill: ${palette.mobile2PhoneInputBorder};
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
