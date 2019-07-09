import React from 'react';
import styled from 'styled-components';

import { darkTheme } from '../../../../theme/core';

const { palette } = darkTheme;


export const Wrapper = styled.div.attrs({ className: 'currency-list' })`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: stretch;
    margin: 0;
    border: none;
    padding: 35px;
    width: 100%;
    height: 100%;
`;

export const SliderWrapper = styled.div.attrs({ className: 'currency-list__slider-wrapper' })`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0;
    border: none;
    padding: 0;
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    transform: rotateZ(180deg);
    
    .slick-slider {
        position: relative;
        width: ${props => props.width}px;
        height: ${props => props.height}px;
    }
    
    .slick-list {
        padding: 0 !important;
        height: ${props => props.height}px !important;
        filter: drop-shadow(0 0 15px ${palette.mobile2CurrencyGlowColor});
    }
    
    .slick-slide {
        border: none !important;
        height: ${props => props.height}px !important;
        
        & > div {
            width: 100%;
            height: 100%;
        }
    }

    * {
        outline: none !important;
    }
`;

export const CurrencyItem = styled.div.attrs({ className: 'currency-item' })`
    position: relative;
    width: 100%;
    height: 100%;
    margin: 0;
    border: none;
    padding: 0;

    img {
        width: 100%;
        height: 100%;
    }
    
    .corner-amount {
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 0;
        border: none;
        padding: 10px;
        width: min-content;
        height: min-content;
        min-width: 50px;
        min-height: 50px;
        background: ${palette.mobile2CurrencyCornerBg};
        font-size: 40px;
        font-weight: bold;
        font-family: 'Exo 2', sans-serif;
        color: ${palette.mobile2CurrencyCornerNumber};
        transform: rotateZ(180deg);
        
        &.top-left {
            top: 0;
            left: 0;
        }
        
        &.top-right {
            top: 0;
            right: 0;
        }
        
        &.bottom-left {
            bottom: 0;
            left: 0;
        }
        
        &.bottom-right {
            bottom: 0;
            right: 0;
        }
    }
`;

export const CurrencyImage = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    background: ${props => `url(/img/fiat_90/${props.coin}/${props.src})`} no-repeat;
    // background-size: contain;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center;
    transform: rotateZ(180deg);
        
    cursor: pointer;
`;

export const SliderPrevArrowWrapper = styled.div`
    position: absolute !important;
    top: -1px !important;
    left: -1px !important;
    right: -1px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    margin: 0 !important;
    border-radius: 0 !important;
    border: none !important;
    padding: 0 !important;
    width: calc(100% + 2px) !important;
    height: 20% !important;
    z-index: 1 !important;
    transform: none !important;

    // background: linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%) !important;

    &.slick-disabled {
        img {
            opacity: .3;
            filter: none !important;
        }
    }

    &:before {
        display: none !important;
    }
    
    img {
        width: 15px;
        height: 9px;
        filter: drop-shadow(0 0 3px black);
    }
`;




export const SliderNextArrowWrapper = styled.div`
    position: absolute !important;
    top: unset !important;
    bottom: -1px !important;
    left: -1px !important;
    right: -1px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    margin: 0 !important;
    border-radius: 0 !important;
    border: none !important;
    padding: 0 !important;
    width: calc(100% + 2px) !important;
    height: 20% !important;
    z-index: 1 !important;
    transform: none !important;

    // background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%) !important;

    &.slick-disabled {
        img {
            opacity: .3;
            filter: none !important;
        }
    }

    &:before {
        display: none !important;
    }
    
    img {
        width: 15px;
        height: 9px;
        filter: drop-shadow(0 0 3px black);
    }
`;

