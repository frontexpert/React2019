import React from 'react';
import styled, { keyframes } from 'styled-components';
export const Wrapper = styled.div`
    position: relative;
    width: 226px;
    display: flex;
    justify-content: ${props => props.isBuy ? 'flex-end' : 'flex-start'};
    z-index: 9999;
`;

export const Wallet = styled.div`
    display: flex;
    align-items: center;
    ${props => props.isLeft ? '' : 'flex-direction: row-reverse;'}
    ${props => props.isFront ? `
        position: absolute;
        width: ${props.progress}%;
        justify-content: ${props.isBuy ? props.isLeft ? 'flex-end' : 'flex-start' : props.isLeft ? 'flex-start' : 'flex-end'};
        display: flex;
        overflow: hidden;
        ${props.isLeft ? 'padding-right' : 'padding-left'}: 1px;
        * { flex-shrink: 0; }
    ` : `
        position: relative;
        width: 100%;
    `};
    .currency-symbol{
        display: flex;
        text-align: center
        align-items: center;
        justify-content: center;
        ${props => props.isLeft ? 'margin-right' : 'margin-left'}: -15px;
        z-index: 100;
        width: 30px;
        height: 30px;
        color: ${props => props.theme.palette[props.color]};
        font-size: 25px;
        border: 3px solid ${props => props.theme.palette[props.color]};
        border-radius: 50%;
        background: ${props => props.theme.palette.orderHistoryBackground};
    }
    .price-label{
        width: 210px;
        height: 45px;
        background: ${props => props.theme.palette.orderHistoryBackground};
        border-radius: 5px;
        font-size: 35px;
        line-height: 1.2;
        color: ${props => props.theme.palette[props.color]};
        border: 3px dashed ${props => props.theme.palette[props.color]};
        text-align: center;
    }
    .wallet-side-icon {
        ${props => props.isFront ? '' : 'right: 0'}; 
        ${props => props.isLeft ? '' : 'left: 1px;'}
        ${props => props.isLeft ? '' : 'transform: rotate(180deg);'}
        stroke: ${props => props.theme.palette[props.color]};
    }
   
`;
export const SvgSide = styled.svg.attrs({ className: 'wallet-side-icon' })`
    position: absolute;
    width: 23px;
    height: 20px;
    fill: ${props => props.theme.palette.clrBackground};
    stroke-miterlimit: 10;
    stroke-width: 2px;
`;

export const WalletSideIcon = () => (
    <SvgSide viewBox="0 0 22.47 19.27">
        <path d="M9.63,1h8.83a3,3,0,0,1,3,3V15.27a3,3,0,0,1-3,3H9.63A8.63,8.63,0,0,1,1,9.63v0A8.63,8.63,0,0,1,9.63,1Z" />
        <circle cx="9.68" cy="9.63" r="3.11" />
    </SvgSide>
);

const keyFrameSpin = keyframes`
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
`;

export const CircleSpinner = styled.div` 
    display: block;
    // width: ${props => props.width ? props.width : 50}px;
    // height: ${props => props.height ? props.height : 50}px;
    // margin: -25px 0 0 -25px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 3px solid transparent;
    border-top-color: ${props => props.theme.palette.clrHighContrast};
    animation: ${keyFrameSpin} 2s linear infinite;
    
    position: absolute;
    // left: calc(50% - ${props => props.width ? props.width / 2 : 25}px);
    // top: calc(50% - ${props => props.height ? props.height / 2 : 25}px);
    z-index: 99999;
    ${props => props.isLeft ? 'left: 0' : 'right: 0'};
`;
