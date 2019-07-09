import React from 'react';
import styled, { keyframes } from 'styled-components';

import { darkTheme } from '../../theme/core';

const { palette } = darkTheme;

export const Wrapper = styled.div.attrs({ className: 'pay-app-wrapper' })`
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
    padding: 0;
    background: ${props => props.theme.palette.mobile2Bg};
    border-radius: ${props => props.theme.palette.borderRadius};
    overflow: ${props => props.overflowVisible ? 'visible' : 'hidden'};
    z-index: 100;
`;

export const BodyWrapper = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: ${props => props.fullScreen ? 0 : 70}px;
    overflow: hidden;
    
    .touch-blocker {
        position: relative;
    }
`;

export const PayAppBody = styled.div.attrs({ className: 'pay-app-body' })`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: stretch;
    padding: 25px;
    flex: 1;
    width: 100%;
`;

export const FullpageWrapper = styled.div.attrs({ className: 'fullpage-swipe' })`
    position: fixed;
    z-index: 1000;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: ${palette.mobile2ContentBg};
    
    .fp-slide {
        position: relative;
        display: flex;
        align-items: stretch;
        justify-content: stretch;
        margin: 0;
        border: none;
        padding: 0;
    }
`;

export const PageIndicator = styled.div`
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
`;

export const Indicator = styled.div`
    position: absolute;
    left: 50%;
    // width: ${props => props.active ? 12 : 8}px;
    // height: ${props => props.active ? 12 : 8}px;
    // background: ${props => props.active ? palette.clrHighContrast : palette.mobilePageIndicatorBg};
    width: 8px;
    height: 8px;
    background: ${palette.mobilePageIndicatorBg};

    border-radius: 50%;
    transform: translateX(-50%) translateY(50%);
    
    .thumb {
        display: ${props => props.isVisible ? 'block' : 'none'};
        position: absolute;
        width: 12px;
        height: 12px;
        left: -2px;
        top: -2px;
        background: ${palette.clrHighContrast};
        border-radius: 50%;
    }
    
    &.indicator-0 {
        bottom: 50px;
    }
    
    &.indicator-1-0 {
        left: calc(50% - 15px);
        bottom: 35px;
    }
    
    &.indicator-1-1 {
        bottom: 35px;
    }
    
    &.indicator-1-2 {
        left: calc(50% + 15px);
        bottom: 35px;
    }
    
    &.indicator-2 {
        bottom: 20px;
    }
`;

export const StyleWrapper = styled.div`
    position: relative;
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const QRSectionWrapper = styled.div.attrs({ className: 'pay-qr-section-wrapper' })`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    background: ${props => props.theme.palette.mobile2Bg};
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #FFF;
    border-radius: ${props => props.theme.palette.borderRadius};
    border: ${props => !props.noborder ? '1px solid ' + props.theme.palette.clrBorder : ''};
    
    > div {
        width: 100% !important;
        height: 100% !important;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
    
    > .price {
        font-size: 240px;
        line-height: 240px;
    }
    
    .qr-code-back {
        width: 100%;
        height: 100%;
    }
    
    canvas, .qr-code {
        position: absolute;
    }
`;

export const QRInnerWrapper = styled.div`
    position: relative;
    border-radius: 50%;
    box-shadow: 0 0 120px 0 #3269d1;
`;

export const QRWrapper = styled.div.attrs({ className: 'pay-qr-wrapper' })`
    position: relative;
    width: ${props => props.width ? props.width + 'px' : '100%'};
    height: ${props => props.height ? props.height + 'px' : '100%'};
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid ${props => props.theme.palette.clrHighContrast};
    border-radius: 50%;
    filter: drop-shadow(0 0 15px ${props => props.theme.palette.mobile2QRGlowColor});
    
    .qr-code-back {
        position: absolute;
        width: 100%;
        height: 100%;
    }
    
    .qr-code, canvas {
        width: 69% !important;
        height: 69% !important;
    }
`;

export const QRPayAmount = styled.div`
    position: absolute;
    top: ${props => props.top}px;
    font-family: 'Exo 2';
    font-weight: 500;
    font-size: 24px;
    text-align: center;
    color: ${props => props.theme.palette.clrHighContrast};
    
    @media screen and (min-width: 768px) {
        font-size: 40px;
    }
`;

export const BackButton = styled.button`
    position: absolute;
    left: 20px;
    top: 20px;
    width: 40px;
    height: 40px;
    padding: 10px;
    background: transparent;
    border: 1px solid ${props => props.theme.palette.telegramRoomArrow};
    border-radius: 50%;
    cursor: pointer;
    outline: none !important;
    
    &:hover {
        .arrow {
            fill: ${props => props.theme.palette.contrastText};
        }
    }
    
    .arrow {
        width: 100%;
        height: 100%;
        fill: ${props => props.theme.palette.telegramRoomArrow};
    }
`;

function move(props) {
    return keyframes`
        0% {
            top: 0;
        }
        50% {
            top: ${props.maxHeight}px;
        }
        100% {
            top: 0;
        }
    `;
}

export const QRScanLine = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    animation: ${props => move(props)} 6s linear infinite;
    transform: translateY(-50%);
    
    img {
        width: 100%;
        border-radius: 50%;
    }
`;
