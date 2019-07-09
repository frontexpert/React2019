import React from 'react';
import styled from 'styled-components';
import { darkTheme } from '../../../theme/core';

const { palette } = darkTheme;

export const Main = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;

    .input-bar-containers {
        position: relative;
        top: calc(30%);
        transform: translateY(-50%);
        margin: 0 auto;
        
        &.shadow {
            top: 30%;
            max-width: calc(100% - 10px);
            box-shadow: 0 0 37px 10px #3269D143;
            border-radius: 37px;
        
            .input-bar {
                box-shadow: none;
                > number-prefix {
                    display: none;
                }
            }
        }
    }
    
    .input-bar-container {
        display: block;
        max-width: calc(100% - 30px);
        z-index: 1;
        margin: 0 auto;
        
        &:first-child {
            .input-bar {
                border-radius: 37px;
            }
        }
        &:last-child {
            .input-bar {
            border-bottom-left-radius: 37px;
            border-bottom-right-radius: 37px;
            }
        }
        &:nth-child(2) {
            opacity: 0;
            .input-bar {
            border-top: none;
            }
        }
    }
    
    .input-bar {
        width: 100%;
        max-width: 74px;
        position: relative;
        z-index: 1;
        margin: 0 auto;
        transform: scale(4.5);
        background: transparent;
        transition: max-width 250ms ease-in 500ms, transform 250ms ease-in, left 250ms ease-in;

        > prefix-number {
            display: none;
        }
    
    .qr-code-container {
        position: absolute;
        top: 23%;
        left: 23%;
        bottom: 0;
        height: 48%;
        border-radius: 50%;
        box-shadow: 0 0 10px 10px rgba(240, 168, 35, 0.3);
    
        .qr-code {
        height: 100%;
        border-radius: 100%;
        object-fit: cover;
        transform: translateY(0%) rotate(0deg);
        transition: transform 250ms ease-in;
        opacity: 1;
        }
    
        .image-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        object-fit: contain;
        width: 100%;
        height: 100%;
        }
    
        .animate {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        }
    
        &.arrow, &.spinner, &.none {
        .animate {
            display: none;
        }
        }
    
        &.arrow {
        .qr-code {
            padding: 14px;
        }
        }
    
        &.spinner {
        .qr-code {
            height: 30px;
            margin: 11px;
            border: none;
        }
        }
    
        &.none {
        border: none;
        .qr-code {
            opacity: 0;
        }
        }
    }
    
    .number-input {
        width: 100%;
        height: 74px;
        box-sizing: border-box;
        margin: 0;
        padding-left: 75px;
        padding-right: 74px;
        border: none;
        outline: none;
        font-size: 18px;
        background: transparent;
        color: #ffffff;
    
        &::placeholder {
        opacity: 0;
        color: #999999;
        transition: opacity 250ms 500ms ease-out;
        }
    }

    .number-prefix {
        display: none;
        position: absolute;
        left: 18px;
        color: white;
        top: 29%;
        font-size: 1.4rem;
    }
    
    &.load {
        max-width: calc(100% - 10px);
        transform: scale(1);
        border: 2px solid rgb(50, 102, 209);
        background: black;
        overflow: hidden;

        > .number-prefix {
            display: block !important;
        }
    
        .qr-code-container {
            top: 8px !important;
            left: auto !important;
            right: 8px !important;
            bottom: 8px !important;
            height: calc(100% - 20px) !important;
            border-radius: 100%;
            border: 2px solid rgb(50, 102, 209);
            box-shadow: 0 0 20px 20px #3269D143;
    
            .qr-code {
                transform: translateY(0%) rotate(360deg);
            }
        
            &.arrow {
                .qr-code {
                    &:active {
                        opacity: 0.7;
                    }
                }
            }
    
            &.none {
                border: none;
                box-shadow: none;
            }
        }

        &.unload {
            background: none !important;
        }
    
        .number-input {
            display: block;
            &::placeholder {
                opacity: 1;
            }
        }
    }
    
    &.unload {
        max-width: 74px;
        transform: scale(4.5);
        border-width: 0;
        transition: transform 250ms ease-in 500ms, max-width 250ms ease-in, border-width 250ms ease-in 250ms;
        overflow: hidden;

        > .number-prefix {
            display: none !important;
        }
    
        .qr-code-container {
            position: absolute !important;
            top: 23% !important;
            left: 23% !important;
            right: auto !important;
            bottom: 0 !important;
            height: 48% !important;
            border-radius: 50% !important;
            border: none !important;
            box-shadow: 0 0 10px 10px rgba(240, 168, 35, 0.3) !important;
    
        .qr-code {
            transform: translateY(0%) rotate(0deg);
            transition: transform 250ms ease-in 500ms;
        }
        }
    }
    }
    
    /* Animation for background */
    
    $color: rgb(240, 168, 35);
    $width: 100%;
    
    .animate {
    animation: showMainBgAnimate 1s 1s 1 forwards;
    opacity: 0;
    transform: translateZ(0);
    
    .plane {
        height: 100%;
        transform-style: preserve-3d;
        width: 100%;
    }
    .plane.main {
        animation: animatedCirclesRotate 20s linear infinite;
        bottom: 0;
        left: 0;
        margin: auto;
        position: absolute;
        right: 0;
        top: 0;
        will-change: transform;
    
        .circle {
        border: 1px solid rgb(240, 168, 35);
        border-radius: 100%;
        box-shadow: 0 0 20px rgb(240, 168, 35), inset 0 0 20px rgb(240, 168, 35);
        box-sizing: border-box;
        height: 100%;
        position: absolute;
        transform-style: preserve-3d;
        width: 100%;
    
        &::after, &::before {
            background: rgb(240, 168, 35);
            border-radius: 100%;
            bottom: 0;
            box-shadow: 0 0 60px 2px rgb(240, 168, 35);
            box-sizing: border-box;
            content: "";
            display: block;
            height: 2px;
            left: 0;
            margin: auto;
            position: absolute;
            right: 0;
            top: 0;
            width: 2px;
            will-change: transform;
        }
    
        &::after {
            transform: translateZ(90px);
        }
    
        &::before {
            transform: translateZ(-90px);
        }
    
        &:first-child {
            transform: rotate(72deg) rotateX(63.435deg);
        }
    
        &:nth-child(2) {
            transform: rotate(144deg) rotateX(63.435deg);
        }
    
        &:nth-child(3) {
            transform: rotate(216deg) rotateX(63.435deg);
        }
    
        &:nth-child(4) {
            transform: rotate(288deg) rotateX(63.435deg);
        }
    
        &::nth-child(5) {
            transform: rotate(1turn) rotateX(63.435deg);
        }
        }
    }
    }
    
    @keyframes showMainBgAnimate {
    0% {
        opacity: 0;
    }
    
    100% {
        opacity: 1;
    }
    }
    
    @keyframes animatedCirclesRotate {
        0% {
            -webkit-transform: rotateX(0) rotateY(0) rotate(0);
            transform: rotateX(0) rotateY(0) rotate(0);
        }
        
        100% {
            -webkit-transform: rotateX(1turn) rotateY(1turn) rotate(1turn);
            transform: rotateX(1turn) rotateY(1turn) rotate(1turn);
        }
    }
`;

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
    opacity: 1;
    border-radius: 50%;

    .qr-code-back {
        position: absolute;
        width: 100%;
        height: 100%;
    }
    
    .qr-code, canvas {
        width: 48% !important;
        height: 48% !important;
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
    overflow: visible;
    transform: rotateZ(0deg);
    z-index: 2;

    @keyframes qr-code-hide-animation-2 {
        0% {
            width: ${props => props.width ? props.width + 'px' : '0px'};
            height: ${props => props.height ? props.height + 'px' : '0px'};
            transform: rotateZ(0deg);
            opacity: 1;
        }
        
        90% {
            width: 50px;
            height: 50px;
            margin: 0;
            opacity: 1;
        }
        
        100% {
            width: 50px;
            height: 50px;
            transform: rotateZ(360deg);
            opacity: 0;
        }
    }

    @keyframes show-again-animation-2 {
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
        animation-name: qr-code-hide-animation-2;
        animation-duration: .5s;
        animation-fill-mode: both;
        pointer-events: none;
    }
    
    &.show-again {
        animation-name: show-again-animation-2;
        animation-duration: .5s;
        animation-delay: .5s;
        animation-fill-mode: both;
    }

    &.size-1 {
        margin-top: ${props => props.height ? (props.height * .05 + 'px') : '0px'};
        margin-left: ${props => props.height ? (-props.height * .055 + 'px') : '0px'};
    }

    &.size-10 {
        margin: 0;
    }

    &.size-100 {
        margin-top: ${props => props.height ? (-props.height * .3 + 'px') : '0px'};
    }
`;

export const PayAmountPartial = styled.div`
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
    z-index: 10;
    
    @keyframes enter-pay-amount-wrapper-animation-2 {
        0% {
            padding: 0 9px;
            width: 64px;
            height: 64px;
        }
        
        100% {
            padding: 0 9px 0 20px;
            width: 100%;
            height: 64px;
        }
    }

    @keyframes view-qr-again-wrapper-animation-2 {   
        0% {
            padding: 0 9px 0 20px;
            width: 100%;
            height: 64px;
        }

        100% {
            padding: 0 9px;
            width: 64px;
            height: 64px;
        }
    }

    @keyframes verify-success-wrapper-animation-2 {
        0% {
            width: 100%;
            height: 126px;
            opacity: 1;
        }
        
        100% {
            opacity: 0;
            padding: 0 9px;
            width: 100%;
            height: 64px;
        }
    }

    &.view-qr {
        display: none;
        opacity: 0;
    }

    &.enter-pay-amount {
        animation-name: enter-pay-amount-wrapper-animation-2;
        animation-duration: .5s;
        animation-delay: .5s;
        animation-fill-mode: both;
    }
    
    &.view-qr-again {
        animation-name: view-qr-again-wrapper-animation-2;
        animation-duration: .5s;
        animation-fill-mode: both;
    }
    
    &.verify-success {
        animation-name: verify-success-wrapper-animation-2;
        animation-duration: .5s;
        animation-fill-mode: both;
        pointer-events: none;
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
