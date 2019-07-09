import React from 'react';
import styled, { keyframes } from 'styled-components';

export const Wrapper = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: ${props => props.fullScreen ? 0 : 70}px;
    z-index: 50;
    overflow: hidden;
    
    .touch-blocker {
        position: relative;
    }
`;

export const QRInnerWrapper = styled.div`
    position: relative;
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    
    .qr-scan-circle {
        border: 0 !important;
        box-shadow: 0px 0px 0px 500px transparent !important;
    }
    
    .qr-inner-border {
        // border: 12px solid ${props => props.theme.palette.clrBackground} !important;
        border-color: transparent !important;
    }
`;

export const QRImageTrigger = styled.div`
    position: absolute;
    left: calc(50% - 15px);
    // top: ${props => props.top}px;
    bottom: 150px;
    z-index: 200;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid ${props => props.theme.palette.mobile2PayViewPayBtnDisabled};
    border-radius: 50%;
    
    img {
        height: 50%;
    }
    
    svg {
        width: 31px;
        height: 25px;
        fill: ${props => props.theme.palette.clrHighContrast};
    }
    
    &:hover {
        cursor: pointer;
        
        svg {
            fill: ${props => props.theme.palette.clrBlue};
        }
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

export const PopupWrapper = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    
    > div {
        max-width: 70%;
        padding: 20px 30px;
        background-color: ${props => props.theme.palette.clrHighContrast};
        border-radius: ${props => props.theme.palette.borderRadius};
        font-size: 24px;
        color: #000;
        text-align: center;
        
        &.error {
            color: ${props => props.theme.palette.clrRed};
        }
    }
`;

export const FrameWrapper = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: ${props => props.hasBottomControl ? 100 : 0}px;
    display: flex;
    align-items: flex-start;
    justify-content: center;
`;

const FrameSVG = styled.svg`
    width: ${props => props.width ? `${props.width}px` : '90%'};
    height: ${props => props.height ? `${props.height}px` : '80%'};
`;

export const FrameIcon = (props) => (
    <FrameSVG {...props} viewBox="0 0 24 24">
        <path fill="none" d="M0 0h24v24H0V0z"/>
        <path d="M3 5v4h2V5h4V3H5c-1.1 0-2 .9-2 2zm2 10H3v4c0 1.1.9 2 2 2h4v-2H5v-4zm14 4h-4v2h4c1.1 0 2-.9 2-2v-4h-2v4zm0-16h-4v2h4v4h2V5c0-1.1-.9-2-2-2z"/>
    </FrameSVG>
);
