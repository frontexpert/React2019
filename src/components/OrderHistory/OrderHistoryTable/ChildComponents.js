import React from 'react';
import styled, { keyframes } from 'styled-components';

const growAnim = keyframes`
    0% { width: 0; }
    50% { width: 100%; }
    100% { width: 100%; }
`;

const fillAnim = start => keyframes`
    0% { width: 0; }
    ${start}% { width: 0; }
    ${start + 10}% { width: 100%; }
    100% { width: 100%; }
`;

export const WalletGroupButtonWrapper = styled.div`
    position: relative;
    width: 260px;
    height: 100%;
`;

export const WalletButtonWrapper = styled.div`
    position: absolute;
    width: ${props => props.width}%;
    height: 100%;
    top: 0;
    overflow: hidden;
    ${props => props.direction === 'Left' ? `
        left: 0;
    ` : `
        right: 0;
    `};
    display: flex;
    align-items: center;
    justify-content: center;
    
    &.progress {
        animation: ${growAnim} 10s linear;
    }
    
    &.fill {
        animation: ${props => fillAnim(props.start)} 10s linear;
    }
`;

export const WalletButton = styled.div`
    width: 220px;
    margin: 0 20px;
    position: absolute;
    ${props => props.direction === 'Left' ? 'left: 0;' : 'right: 0;'}
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px dashed ${props => props.type === 'inactive'
        ? props.theme.palette.clrMouseClick
        : props.masterColor
            ? props.masterColor
            : (props.type === 'active')
                ? props.theme.palette.clrHighContrast
                : (props.type === 'buy')
                    ? props.theme.palette.btnPositiveBg
                    : props.theme.palette.btnNegativeBg};
    border-radius: ${props => props.theme.palette.borderRadius};
    padding: 5px 12px 2px;
    height: 65px;
    color: ${props => props.theme.palette.clrPurple};
    font-size: 33px;
    text-align: right;
    cursor: pointer;
    opacity: 1 !important;
    word-break: break-all;
    white-space: nowrap;
    background: ${props => props.theme.palette.clrBackground};
    outline: none;
    
    svg {
        display: ${props => props.isDefaultCrypto ? 'none' : ''};
    }
    
    > span {
        display: block;
        margin-right: 2px !important;
        overflow: hidden;
        color: ${props => props.type === 'inactive'
        ? props.theme.palette.clrMouseClick
        : props.masterColor
            ? props.masterColor
            : (props.type === 'active')
                ? props.theme.palette.clrHighContrast
                : (props.type === 'buy')
                    ? props.theme.palette.btnPositiveBg
                    : props.theme.palette.btnNegativeBg};
        
        &.failed {
            font-size: 20px;
            color: ${props => props.theme.palette.clrDarkRed};
        }
    }

    .infoIcon {
        position: absolute;
        ${props => props.isLeft ? 'left: -20px;' : 'right: -20px;'}
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 2px solid ${props => props.type === 'inactive'
        ? props.theme.palette.clrMouseClick
        : props.masterColor
            ? props.masterColor
            : (props.type === 'active')
                ? props.theme.palette.clrHighContrast
                : (props.type === 'buy')
                    ? props.theme.palette.btnPositiveBg
                    : props.theme.palette.btnNegativeBg};
        display: flex;
        align-items: center;
        justify-content: center;
        background: ${props => props.theme.palette.clrBackground};

        img {
            filter: ${props => props.type === 'active'
        ? props.theme.palette.coinActiveFilter
        : (props.type === 'inactive')
            ? props.theme.palette.coinInactiveFilter
            : (props.type === 'buy')
                ? props.theme.palette.coinBuyFilter
                : props.theme.palette.coinSellFilter};
        }
    }
    
    div {
        overflow: inherit;
        white-space: initial;
        word-break: break-word;
    }
    
    .wallet-side-icon {
        stroke: ${props => props.type === 'inactive'
        ? props.theme.palette.clrMouseClick
        : props.masterColor
            ? props.masterColor
            : (props.type === 'active')
                ? props.theme.palette.clrHighContrast
                : (props.type === 'buy')
                    ? props.theme.palette.btnPositiveBg
                    : props.theme.palette.btnNegativeBg};
    }

    &:hover {
        color: ${props => props.theme.palette.clrHighContrast};
        opacity: 0.5;
    }

    &:active {
        background: ${props => props.theme.palette.clrBackground};
        color: ${props => props.theme.palette.clrHighContrast};
    }
`;
