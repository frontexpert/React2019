import React from 'react';
import styled, { keyframes } from 'styled-components';

import { BodyWrapper } from '../Components';
import { darkTheme } from '../../../theme/core';

const { palette } = darkTheme;

export const Wrapper = styled(BodyWrapper).attrs({ className: 'pay-view-2' })`
    bottom: 40px;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    background: ${palette.mobile2Bg};
`;

export const ContentWrapper = styled.div.attrs({ className: 'pay-view-2__content-wrapper' })`
    position: relative;
    width: 100%;
    height: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    margin: 0;
    padding: 0;
    border: none;
    background: ${palette.mobile2ContentBg};
`;

export const FooterWrapper = styled.div.attrs({ className: 'pay-view-footer-wrapper' })`
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-end;
    border: none;
`;

const shakeAnimation = keyframes`
    10%, 90% {
        transform: translate3d(-1px, 0, 0);
    }

    20%, 80% {
        transform: translate3d(2px, 0, 0);
    }

    30%, 50%, 70% {
        transform: translate3d(-4px, 0, 0);
    }

    40%, 60% {
        transform: translate3d(4px, 0, 0);
    }
`;

export const NumpadWrapper = styled.div.attrs({ className: 'pay-view-2__numpad-wrapper' })`
    flex: 1;
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: stretch;
    color: #FFF;
    // font-family: CoreSansC_Light;// CoreSansC_Regular, CoreSansC_ExtraLight
    
    .qr-in-numpad {
        flex: 1;
        width: 100%;
    }
`;

export const StyleWrapper = styled.div`
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    padding: 0 10%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .num-pad-row {
        display: flex;
        justify-content: center;
        color: ${palette.mobile2PayViewNumpadColor};
            
        &:not(:first-child) {
            margin-top: ${props => props.margin}px;
        }
    }
`;

export const NamPadKey = styled.div`
    position: relative;
    width: ${props => props.size}px;
    height: ${props => props.size}px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.theme.palette.mobile2PayViewNumpadBg};
    border-radius: 50%;
    font-size: ${props => props.size * 0.5}px;
    transition: background-color 0.2s ease-in, font-size 0.2s ease-in;
    overflow: hidden;
    cursor: pointer;

    &:active {
        background-color: ${props => props.theme.palette.mobile2PayViewNumpadBgActive};
        font-size: 54px;
    }
    
    &:not(:first-child) {
        margin-left: 6.25%;
    }
`;

export const QROuterWrapper = styled.div.attrs({ className: 'qr-outer-wrapper' })`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: stretch;
    justify-content: stretch;
    margin: 0;
    border: none;
    padding: 0;
    width: 100%;
    height: 100%;
    
    background: ${props => props.hasBg ? palette.mobile2Bg : 'transparent'};
`;


const DeleteIconSvgWrapper = styled.svg`
    width: ${props => props.size}px;
    height: ${props => props.size * 19 / 31}px;

    & * {
        fill: ${palette.mobile2PayViewNumpadColor} !important;
    }
`;

export const DeleteIcon = props => (
    <DeleteIconSvgWrapper {...props} viewBox="0 0 123.38 78.04">
        <path
            d="M111,0H44.14A12.35,12.35,0,0,0,35.4,3.62L0,39l35.4,35.4A12.35,12.35,0,0,0,44.14,78H111a12.35,12.35,0,0,0,12.35-12.35V12.35A12.35,12.35,0,0,0,111,0Zm-4.62,59.81-6.6,6.6L79,45.62,58.23,66.41l-6.6-6.6L72.42,39,51.63,18.23l6.6-6.6L79,32.42,99.81,11.63l6.6,6.6L85.62,39Z"
        />
    </DeleteIconSvgWrapper>
);

export const PayButtonWrapper = styled.div`
    padding: 50px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${props => `radial-gradient(${props.disabled ? palette.mobile2PayViewPayBtnWrapperBgDisabled : props.theme.palette.mobile2PayViewPayBtnWrapperBg}, ${props.theme.palette.clrBackground} 85%, ${props.theme.palette.clrBackground})`};
`;
