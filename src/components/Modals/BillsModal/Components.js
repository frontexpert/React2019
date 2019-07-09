import React from 'react';
import styled, { keyframes } from 'styled-components';
import ReactPanZoom from '@ajainarayanan/react-pan-zoom';
import Slider from 'react-input-slider';

const openAnim = keyframes`
    0% { transform: scale(0); }
    100% { transform: scale(1); }
`;

export const Wrapper = styled.section`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 900000;
    margin: 0;
    background-color: transparent;
    font-weight: 600;
    color: ${props => props.theme.palette.clrMainWindow};
    visibility: ${props => props.isVisible ? 'visible' : 'hidden'};

    ${props => props.isVisible ? `
        animation: ${openAnim} 300ms linear;
    ` : ''};

    .pan-container {
        @media (min-width: 1300px) {
            width: unset !important;
            height: unset !important;
        }
    }
`;

export const RefWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    padding: 15px;
    
    > div {
        width: 100% !important;
        height: 100% !important;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

export const InnerWrapper = styled.div.attrs({ className: 'bills-modal-inner' })`
    position: relative;
    width: ${props => props.isV2 ? 1350 : 1504}px;
    height: 852px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme.palette.clrLightGray};
    border-radius: ${props => props.theme.palette.borderRadius};
    box-shadow: 0 3px 15px rgba(0, 0, 0, .7);
    text-align: center;
    transform: scale(${props => (props.realHeight || 55) / 852});
    transform-origin: center;
    
    .bill-description {
        height: 64px;
        font-size: 48px;
        font-weight: 600;
        color: ${props => props.theme.palette.clrRed};
        letter-spacing: 30px;
        text-align: center;
    }
`;

export const BillsWrapper = styled.div`
    display: flex;
`;

export const BillLine = styled.div`
    position: relative;
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    margin-left: ${props => props.isV2 ? 10 : 0}px;
    margin-top: ${props => props.isV2 ? 0 : 10}px;
    // padding: ${props => props.isV2 ? '8px 0' : '0 8px'};
    display: flex;
    flex-direction: ${props => props.isV2 ? 'column' : 'row'};
    
    &:first-child {
        margin-left: 0;
        margin-top: 0;
    }
`;

export const BalanceOutline = styled.div`
    position: absolute;
    top: -4px;
    bottom: -4px;
    right: 4px;
    width: ${props => props.size || 0}px;
    border: 4px solid ${props => props.theme.palette.clrRed};
    border-radius: 5px;
    pointer-events: none;
`;

export const BalanceCol = styled.div`
    position: relative;
    height: 48px;
    font-size: 48px;
    font-weight: 600;
    line-height: 1;
    color: ${props => props.theme.palette.clrRed};
    
    ${props => props.active ? `
        &::after {
            content: '';
            position: absolute;
            right: -8px;
            bottom: 0;
            width: 6px;
            height: 6px;
            display: block;
            background-color: ${props.theme.palette.clrRed};
            border-radius: 3px;
        }
    ` : ''};
`;

export const BillImgWrapper = styled.div`
    position: relative;
    width: ${props => props.width || 3192}px;
    height: ${props => props.height || 1801}px;
    margin-left: ${props => props.isV2 ? 0 : 10}px;
    margin-top: ${props => props.isV2 ? 10 : 0}px;
    overflow: hidden;
    cursor: ${props => (props.disabled || !props.hoverable) ? 'initial' : 'pointer'};
    
    &:first-child {
        margin-left: 0;
        margin-top: 0;
    }
    
    ${props => (!props.disabled && props.hoverable) ? `
        &:hover {
            &:after {
                content: '';
                background: rgba(255, 0, 0, 0.35) !important;
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                right: 0;
                z-index: 0;
            }
        }
    ` : ''};

    ${props => props.disabled ? `
        // filter: blur(4px);
        
        &::after {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(255, 255, 255, 0.8);
        }
    ` : ''};
`;

export const BillImg = styled.div`
    position: relative;
    width: 1063px;
    height: 600px;
    flex-shrink: 0;
    background: ${props => `url('/img/bills/${props.lv || '1'}.jpg') no-repeat`};
    background-size: cover;
    background-position: center;
    transform: scale(${props => props.height / 600});
    transform-origin: left top;
    
    .info {
        position: absolute;
        left: 3px;
        bottom: 3px;
        width: 40%;
        display: flex;
        flex-direction: column;
        line-height: 0.8;
        text-align: left;
        overflow: hidden;
        color: ${props => props.lv < 7 ? props.theme.palette.clrHighContrast : props.theme.palette.clrDarkPurple};

        .label_deno {
            flex: 1;
            font-size: 12px;
            font-weight: bold;
        }

        .label_details {
            height: 100%;
            flex: 1;
            display: flex;
            flex-direction: column;

            .label_symbol {
                padding-left: 3px;
                flex: 1;
                font-size: 12px;
                text-align: left;
            }

            .label_address {
                // max-width: 40%;
                margin-top: 3px;
                flex: 1;
                font-size 8px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
    }
`;

export const Close = styled.button`
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: 0;
    padding: 0;
    width: 21px;
    height: 21px;
    transform: translate(50%, -50%);
    background-color: ${props => props.theme.palette.telegramLoginControlAddonColor};
    z-index: 11;

    &:hover {
        cursor: pointer;
        filter: brightness(110%);
    }

    &:focus {
        outline: none;
    }
`;

export const Icon = styled.img`
    width: 50%;
    height: 50%;
`;

export const StyledReactPanZoom = styled(ReactPanZoom)`
    // width: ${props => props.width ? `${props.width}px` : '100%'};
    // height: ${props => props.height ? `${props.height}px` : '100%'};
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
`;

export const StyledSlider = styled(Slider)`
    max-width: 100%;
    margin-top: 15px;
`;

const growAnim = keyframes`
    0% { transform: scale(0); }
    100% { transform: scale(1); }
`;

export const BillDetail = styled.div`
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    animation: ${growAnim} 0.5s linear;
`;
