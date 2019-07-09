import React from 'react';
import styled, { keyframes } from 'styled-components';

export const Wrapper = styled.div.attrs({ className: 'crypto-app-wrapper' })`
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 30px;
    background: ${props => props.theme.palette.mobile2Bg};
    border-radius: ${props => props.theme.palette.borderRadius};
    overflow: ${props => props.overflowVisible ? 'visible' : 'hidden'};
    
    // &:before,
    // &:after {
    //     content: '';
    //     position: absolute;
    //     left: 0;
    //     right: 0;
    //     z-index: 30;
    //     height: 200px;
    // }
    
    // &:before {
    //     top: 0;
    //     background: linear-gradient(#000, transparent);
    // }
    
    // &:after {
    //     bottom: 0;
    //     background: linear-gradient(transparent, #000);
    // }

    @media screen and (orientation: landscape) {
        &&& {
            transform: rotate(-90deg) !important;
            transform-origin: left top !important;
            width: 100vh !important;
            height: 100vw !important;
            overflow-x: hidden !important;
            position: absolute !important;
            top: calc(100% + 12px) !important;
            left: -10px !important;
        }
    }
`;

export const BackCurrency = styled.img.attrs({ className: 'crypto-app-back-currency' })`
    height: 100%;
    width: 100%;
    border: 2px solid #3266d1;
    box-shadow: 0 0 20px 20px #3269D17f;
    z-index: 1;
`;

export const Controller = styled.div.attrs({ className: 'crypto-scanner' })`
    position: absolute;
    left: calc(50% - 60px);
    bottom: 23%;
    z-index: 100;
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    cursor: pointer;

    &.crypto-scanner--on {
        left: calc(50% - 30px);
        bottom: 20px;
        width: 60px;
        height: 60px;
        background: radial-gradient(${props => props.theme.palette.clrDarkGray}, ${props => props.theme.palette.clrBackground}, ${props => props.theme.palette.clrBackground});
        border: 1px solid ${props => props.theme.palette.clrBlue};
        box-shadow: 0 0 10px 10px #3269D143;
    }
`;

export const ScannerIcon = styled.img.attrs({ className: 'crypto-app-scanner-icon' })`
    height: 100%;
    width: 100%;
    // border: 2px solid #3266d1;
    // box-shadow: 0 0 20px 20px #3269D17f;
    z-index: 1;
`;
export const InnerWrapper = styled.div`
    position: relative;
    width: 30px;
    height: 30px;
    border: 2px solid ${props => props.theme.palette.clrBlue};
    border-radius: ${props => props.theme.palette.borderRadius};
    
    .inner-circle {
        position: absolute;
        left: -4px;
        top: -4px;
        width: 34px;
        height: 34px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: radial-gradient(${props => props.theme.palette.clrDarkGray}, ${props => props.theme.palette.clrBackground} 70%);
        border-radius: 50%;
        font-size: 24px;
        font-weight: 600;
        color: ${props => props.theme.palette.clrBlue};
    }
`;

// export const QRWrapper = styled.div.attrs({ className: 'qr-outer-wrapper' })`
//     position: absolute;
//     top: 5%;
//     left: 0;
//     display: flex;
//     align-items: stretch;
//     justify-content: stretch;
//     margin: 0;
//     border: none;
//     padding: 0;
//     width: 100%;
//     height: 45%;
//     z-index: 100;
//     background: ${props => props.hasBg ? palette.mobile2Bg : 'transparent'};
// `;

export const QRWrapper = styled.div.attrs({ className: 'qr-outer-wrapper' })`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 100;
`;

export const QRBalanceButton = styled.div`

    display: flex;
    background-color: #000;
    color : #fff;
    margin: 0;
    border: none;
    padding: 0;
    width: 50%;
    height: 4%;
    z-index: 1000;
    justify-content:center;
    position:absolute;
    top:8px;

    
`;



const CopySVG = styled.svg`
    position: absolute;
    right: 50px;
    top: 50px;
    z-index: 100;
    width: 30px;
    height: 30px;
    fill: none;
    stroke: ${props => props.theme.palette.clrBlue};
    transform: rotate(-90deg);
    cursor: pointer;
`;

export const CopyIcon = (props) => (
    <CopySVG {...props} viewBox="0 0 24 24">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
    </CopySVG>
);
