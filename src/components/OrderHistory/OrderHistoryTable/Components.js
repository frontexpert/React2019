import React from 'react';
import styled from 'styled-components';

export const OrdersWrapper = styled.div`
    position: relative;
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    background: ${props => props.theme.palette.orderHistoryBackground};
    border-radius: ${props => props.theme.palette.borderRadius};
    font-size: 14px;
    line-height: 1.2;
    color: ${props => props.theme.palette.orderHistoryText};
    border: 2px solid ${props => props.theme.palette.clrBorder};
    
    .scroll__scrollup {
        right: 21px;
        bottom: 6px;
    }
    
    .ps__rail-y {
        display: none !important;
        background-color: ${props => props.theme.palette.orderHistoryBackground} !important;
        // border-top: 1px solid ${props => props.theme.palette.orderHistoryInnerBorder};
        border-left: 2px solid ${props => props.theme.palette.orderHistoryBorder};
        opacity: 0 !important;
        
        .ps__thumb-y {
            z-index: 9999;
            cursor: pointer;
            
            &:before {
                background-color: ${props => props.theme.palette.orderHistoryBorder};
            }
        }
    }
`;

export const TableHeader = styled.div`
    height: ${props => props.height}px;
    // padding-right: ${props => props.length > 4 ? '15px' : 0};
    display: flex;
    background-color: ${props => props.theme.palette.orderHistoryHeaderBackground};
    border-bottom: 2px solid ${props => props.theme.palette.orderHistoryBorder};
    font-weight: 600;
    color: ${props => props.theme.palette.orderHistoryHeader};
`;

export const Tab = styled.div`
    padding: 8px;
    z-index: 100;
    font-weight: 400;
    color: ${props => props.active ? props.theme.palette.orderHistoryHeaderTabActive : props.theme.palette.orderHistoryHeaderTab};
    cursor: pointer;
    margin-right: ${props => props.marginRight ? 10 :  0}px;
`;

export const ProgressWrapper = styled.div`
    width: 38px;
    height: 38px;
`;

export const TableBody = styled.div`
    height: ${props => props.height}px;
`;

export const Row = styled.div`
    position: relative;
    z-index: 10;
    height: ${props => props.height}px;
    // padding-right: ${props => props.length > 4 ? '15px' : 0};
    display: flex;
    border-bottom: ${props => props.splitter ? 4 : 1}px solid ${props => props.theme.palette.orderHistoryInnerBorder};
    font-size: 12px;
    background: ${props => props.progress ? (props.isTrading ? `linear-gradient(90deg, ${props.isBuy ? '#0000' : props.theme.palette.btnNegativeBg} ${props.isBuy ? 100 - props.progress : props.progress}%, ${props.isBuy ? props.theme.palette.btnPositiveBg : '#0000'} ${props.isBuy ? 100 - props.progress : props.progress}%);` : props.theme.palette.orderHistoryHoverBackground) : ''};
    border-radius: ${props => `${props.theme.palette.borderRadius} ${props.theme.palette.borderRadius} 0 0`};

    .history-row-tooltip {
        width: 100%;
    }

    &:hover {
        background-color: ${props => props.theme.palette.orderHistoryHoverBackground};
        color: ${props => props.theme.palette.orderHistoryHoverText};
        
        .status-btn {
            border-color: ${props => props.theme.palette.orderHistoryBtnHoverBorder};
            color: ${props => props.theme.palette.orderHistoryBtnHover};            
        }
        
        svg {
            fill: ${props => props.theme.palette.orderHistoryHoverText};
        }

        .icon-wrapper {
            svg, svg * {
                fill: ${props => props.theme.palette.orderHistoryHoverText} !important;
            }
        }
    }
    .info-arrow {
        position: absolute;
        top: calc(100% - 10px);
        ${props => props.isBuy ? 'right: 40px' : 'left : 25px'};
        z-index: 100;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        margin: 0;
        border: none;
        background: transparent;
        .exch-form__switch-arrows {
            width: 24px;
            height: 20px;
            transition: all .3s;
            transform: rotate(-90deg);
            stroke: ${props => props.theme.palette.coinPairSwitchBtnFill};
        }
    }
`;

export const Column = styled.div.attrs({ className: 'history-column' })`
    height: 100%;
    width: 100%;
    padding: 0 15px;
    padding-right: ${props => props.isHeader ? '23px' : ''};
    flex: 1;
    flex-shrink: 0;
    display: flex;
    flex-direction: ${props => props.isColumn ? 'column' : 'row'};
    align-items: ${props => props.isHeader ? 'flex-end' : 'center'};
    justify-content: center;
    // border-right: 2px solid ${props => props.theme.palette.orderHistoryInnerBorder};
    overflow: hidden;
    text-overflow: ellipsis;

    * {
        z-index: 1;
    }

    ${props => props.isColumn ? `
        > div {
            display: flex;
            align-items: center;
            white-space: nowrap;
        }
    ` : ''};

    .status-date {
        color: ${props => props.theme.palette.orderHistoryBtnHover};            
    }
    
    span {
        font-size: 33px;
        font-weight: 600px;
        letter-spacing: 1px;
    }
    
    div[data-tooltipped] {
        width: 100%;
    }

    .icon-wrapper {
        flex-shrink: 0;
        display: flex;
        align-items: center;
        margin: 0;
        border: none;
        padding: 0;
        width: 70px;
        height: 100%;
        
        svg, svg * {
            fill: ${props => props.index !== 0 ? props.theme.palette.userMenuPopupMenuItem : props.theme.palette.userMenuPopupMenuItemHover} !important;
        }
    }
    
    .failed {
        color: ${props => props.theme.palette.clrLightRed};
        font-weight: bold;
    }
    
    ${props => props.isHighlight ? `
        font-weight: 500;
        color: ${props.theme.palette.orderHistoryHoverText};
    ` : ''};
`;

export const ButtonWrapper = styled.div`
    width: 100%;
    height: 32px;
    
    button {
        width: 100%;
        height: 100%;
        border-radius: ${props => props.theme.palette.borderRadius};
        font-size: 14px;
        cursor: pointer;
        outline: none;
    }
    
    .status-btn {
        background-color: transparent;
        border: 2px solid ${props => props.theme.palette.orderHistoryText};
        color: ${props => props.theme.palette.orderHistoryText};
    }
    
    .status-cancel {
        display: none;
        background-color: ${props => props.theme.palette.orderHistoryBtnCancelBackground};
        border: 0;
        color: ${props => props.theme.palette.orderHistoryBtnHover};
    }
    
    ${props => !props.isDone ? `
        &:hover {
            .status-btn {
                display: none;
            }
            
            .status-cancel {
                display: block;
            }
        }
    ` : ''};
`;

const CustomSvg = styled.svg`
    width: 24px;
    height: 18px;
    margin-right: 10px;
    fill: ${props => props.theme.palette.orderHistoryArrow};
`;

export const Arrow = props => (
    <CustomSvg {...props} viewBox="0 0 21.45 16.74">
        <polygon points="7.04 16.74 0 10.5 7.04 4.31 7.04 7.83 15.49 7.83 15.49 9.93 19.75 6.24 15.49 2.5 15.49 4.71 9.31 4.71 9.31 3.58 14.36 3.58 14.36 0 21.45 6.24 14.36 12.43 14.36 8.97 5.9 8.97 5.9 6.81 1.7 10.5 5.9 14.24 5.9 12.09 12.14 12.09 12.14 13.22 7.04 13.22 7.04 16.74"/>
    </CustomSvg>
);

export const InfoHistory = styled.div.attrs({ className: 'history-info-wrapper' })`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 15px;

    > div {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .info-send-section,
    .info-get-section {
        width: 250px;

        *:first-child {
            margin-right: 12px;
        }
    }

    .info-send-section {
        justify-content: flex-start;
    }

    .info-get-section {
        justify-content: flex-end;
    }

    .info-arrow-directional {
        height: 100%;
    }

    .info-arrow-directional .arrow-icon {
        fill: ${props => props.progress ? props.theme.palette.clrHighContrast : props.isBuy ? props.theme.palette.btnPositiveBg : props.theme.palette.btnNegativeBg};    //set arrow icon fill color
        ${props => props.isBuy && 'transform: rotate(180deg);'} 
        width: 30px;
    }

    .info-arrow-directional .warning-icon {
        position: absolute;
    }
`;

const WarningSvg = styled.svg`
    width: 16px;
    height: 16px;
    fill: ${props => props.theme.palette.clrHighContrast};
`;

export const WarningIcon = props => (
    <WarningSvg {...props} viewBox="0 0 286.054 286.054">
        <path
            d="M143.027,0C64.04,0,0,64.04,0,143.027c0,78.996,64.04,143.027,143.027,143.027
            c78.996,0,143.027-64.022,143.027-143.027C286.054,64.04,222.022,0,143.027,0z M143.027,259.236
            c-64.183,0-116.209-52.026-116.209-116.209S78.844,26.818,143.027,26.818s116.209,52.026,116.209,116.209
            S207.21,259.236,143.027,259.236z M143.036,62.726c-10.244,0-17.995,5.346-17.995,13.981v79.201c0,8.644,7.75,13.972,17.995,13.972
            c9.994,0,17.995-5.551,17.995-13.972V76.707C161.03,68.277,153.03,62.726,143.036,62.726z M143.036,187.723
            c-9.842,0-17.852,8.01-17.852,17.86c0,9.833,8.01,17.843,17.852,17.843s17.843-8.01,17.843-17.843
            C160.878,195.732,152.878,187.723,143.036,187.723z"
        />
    </WarningSvg>
);