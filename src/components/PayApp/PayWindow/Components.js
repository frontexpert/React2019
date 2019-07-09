import React from 'react';
import styled from 'styled-components';

import { BodyWrapper } from '../Components';

export const Wrapper = styled.div.attrs({ className: 'wallet-on-side-wrapper' })`
    position: relative;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-rows: 60px auto; //${props => !props.isLoggedIn ? '60px auto 60px' : '60px auto'};
    background: ${props => props.theme.palette.leftTopHeaderBg};
    border-radius: ${props => props.theme.palette.borderRadius};
    overflow: hidden;

    @media (max-width: 768px) {
        grid-template-rows: 80px auto;
    }
`;

export const WalletWrapper = styled.div.attrs({ className: 'wallet-on-side__wallet-wrapper' })`
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: stretch;
    justify-content: stretch;
    border: 1px solid ${props => props.theme.palette.clrBorder};
    // border-top-left-radius: ${props => props.theme.palette.borderRadius};
    // border-top-right-radius: ${props => props.theme.palette.borderRadius};
`;

export const TableWrapper = styled.div.attrs({ className: 'wallet-on-side__table-wrapper' })`
    width: ${props => props.width}px;
    height: ${props => props.height}px;

    .ps__rail-y {
        background-color: ${props => props.theme.palette.walletScrollBack} !important;
        border-left: 1px solid ${props => props.theme.palette.walletScrollBorder};
        opacity: 1 !important;
        right: 0 !important;
        height: calc(100% - 2px) !important;
        
        .ps__thumb-y {
            z-index: 9999;
            cursor: pointer;

            &:before {
                background-color: ${props => props.theme.palette.walletScrollThumbBack};
            }
        }
    }

    .ReactVirtualized__Table__rowColumn {
        height: 100%;
        margin: 0;
        padding: 0;
        display: flex;
        // border-right: 1px solid ${props => props.theme.palette.walletGrid};
        text-overflow: inherit;
        overflow: visible !important;
        
        &:last-child {
            border-right: 0;
            padding-right: 15px;
        }
    }
    
    .ReactVirtualized__Table__row {
        border-bottom: 1px solid ${props => props.theme.palette.walletGrid};
        overflow: visible !important;

        &:last-child {
            border-bottom: none;
        }
        
        &:hover {
            .wallet-table-merged-cell {
                background: ${props => props.theme.palette.clrMouseHover};
                
                .volume-box {
                    // font-size: 13px;
                    // line-height: 22px;
                    // font-weight: normal;
                    //
                    // .value-marketcap {
                    //     margin-right: 10px;
                    // }

                    .unit {
                        display: initial !important;
                    }
                    
                    .tooltip-wrap {
                        opacity: 1 !important;
                    }
                }
            }
        }
    }
    
    .ReactVirtualized__Table__Grid {
        outline: none !important;
        box-shadow: 7px 6px 11px rgba(0, 0, 0, .05);
    }
    
    .basic-table__btn {
        position: relative;
        width: 100%;
        min-height: 35px;
        // margin-left: 10px;
        margin-right: 6px;
        background: transparent;
        border: 1px solid ${props => props.theme.palette.walletBtn};
        border-radius: ${props => props.theme.palette.borderRadius};
        outline: none;
        font-size: 20px;
        color: ${props => props.theme.palette.clrPurple};
        line-height: 1.2;
        cursor: pointer;
        opacity: 1 !important;
        pointer-events: all;
        word-break: break-all;
        white-space: normal;

        &:hover {
            background: ${props => props.theme.palette.clrMainWindow};
        }
        
        &:after {
            content: '';
            position: absolute;
            right: -8px;
            top: calc(50% - 18px);
            width: 30px;
            height: 30px;
            background: transparent url(/img/wallet-button-after.png) no-repeat center;
            background-size: cover;
        }

        &:active,
        &.active {
            background: ${props => props.theme.palette.clrMainWindow};
            color: ${props => props.theme.palette.contrastText};
        }
        
        // span {
        //     font-weight: 500;
        //     color: ${props => props.theme.palette.clrHighContrast};
        // }
    }
`;

const Cell = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    padding: 15px;
    color: ${props => !props.disabled ? props.theme.palette.walletText : props.theme.palette.clrtext};

    > * {
        opacity: ${props => !props.disabled ? '1' : '0.5 !important'};
    }
`;

export const NameCell = styled(Cell)`
    overflow: hidden;
    color: ${props => !props.disabled ? props.theme.palette.contrastText : props.theme.palette.clrPurple};
    
    .wallet-index {
        margin-right: 8px;
        color: ${props => props.theme.palette.clrPurple};
    }

    .d-flex-col {
        opacity: 1 !important;
    }

    .coin-icon,
    .no-icon {
        flex-shrink: 0;
        // opacity: ${props => !props.disabled ? '1' : '0.25 !important'};
        border-radius: 50%;
        overflow: hidden;
        opacity: 1 !important;
        background-size: 100% 100% !important;
        width: 50px;
        height: 50px;
        margin-right: 10px;
    }

    .wallet-box {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: 100%;
        color: ${props => props.theme.palette.clrPurple};

        .wallet {
            color: ${props => !props.disabled ? props.theme.palette.contrastText : props.theme.palette.clrPurple};
            display: inline;
            margin-right: 6px;
            font-weight: 600;
        }
        
        .coin-name {
            span {
                color: ${props => props.theme.palette.clrHighContrast};
                text-transform: uppercase;
            }
        }
    }
    
    .smaller {
        width: 100%;
        overflow: hidden;
        color: ${props => props.theme.palette.clrPurple} !important;
    }
    
    .link {
        margin-left: 8px;
        font-weight: 600;
        color: ${props => props.theme.palette.walletLink};
        text-decoration: underline;
        cursor: pointer;
    }
    
    .coin-price-box {
        display: flex;
        flex-direction: row;

        .price {
            display: block;
            margin-right: 6px;
            font-weight: 600;
            color: ${props => !props.disabled ? props.theme.palette.contrastText : props.theme.palette.clrtext};
        }
        
        .change-in-percent {
            display: flex;
            align-items: center;
            
            &.positive {
                color: ${props => props.theme.palette.clrGreen};
                
                > span {
                    width: 0; 
                    height: 0; 
                    border-left: 5px solid transparent;
                    border-right: 5px solid transparent;
                    border-bottom: 5px solid ${props => props.theme.palette.clrGreen};
                    margin-left: 4px;
                    margin-top: 2px;
                }
                
                svg {
                    &, & * {
                        fill: ${props => props.theme.palette.clrGreen} !important;
                    }
                }
                
                .sprite-icon {
                    transform: rotateZ(180deg);
                }
            }
    
            &.negative {
                color: ${props => props.theme.palette.clrRed};
                
                > span {
                    width: 0; 
                    height: 0; 
                    border-left: 5px solid transparent;
                    border-right: 5px solid transparent;
                    border-top: 5px solid ${props => props.theme.palette.clrRed};
                    margin-left: 4px;
                    margin-top: 2px;
                }
                
                svg {
                    &, & * {
                        fill: ${props => props.theme.palette.clrRed} !important;
                    }
                }
            }
        }
    }
`;

export const NameWithVolumeCell = styled(Cell).attrs({ className: 'wallet-table-merged-cell' })`
    position: relative;
    overflow: visible;
    color: ${props => props.theme.palette.clrPurple};
    cursor: pointer;
    font-size: 24px;

    @media (max-width: 768px) {
        font-size: 26px;

        .basic-table__btn {
            width: 175px !important;
            font-size: 26px !important;
        }
    }

    &.active {
        background: ${props => props.theme.palette.clrBorder} !important;
        
        .wallet-index {
            color: ${props => props.theme.palette.clrBackground};
        }
    }

    .wallet-index {
        position: absolute;
        top: 3px;
        left: 5px;
        font-size: 13px;
        line-height: 1em;
        color: ${props => props.theme.palette.clrBorder};
    }
    
    .fiat-usdt {
        position: absolute;
        top: 3px;
        left: 5px;
        font-size: 15px;
        color: ${props => props.theme.palette.clrBorder};
        font-weight: 700;
    }

    .d-flex-col {
        flex: 1 1;
        opacity: 1 !important;
        overflow: hidden;
        
        .subtitle {
            font-size: 20px;
            color: ${props => props.theme.palette.clrBorder};
        }
    }

    .coin-icon,
    .no-icon {
        flex-shrink: 0;
        border-radius: 50%;
        overflow: hidden;
        opacity: 1 !important;
        background-size: 100% 100% !important;
        width: 50px;
        height: 50px;
        margin-right: 10px;
    }

    .coin-price-box {
        display: flex;
        flex-direction: row;
        font-size: 25px;

        .price {
            display: block;
            margin-right: 6px;
            font-weight: 700;
            
            &.positive {
                color: ${props => props.theme.palette.clrGreen};
            }
            
            &.negative {
                color: ${props => props.theme.palette.clrRed};
            }
        }
        
        .change-in-percent {
            display: none;
            align-items: center;
            font-weight: 700;
            
            &.positive {
                color: ${props => props.theme.palette.clrGreen};
                
                > span {
                    width: 0; 
                    height: 0; 
                    border-left: 5px solid transparent;
                    border-right: 5px solid transparent;
                    border-bottom: 5px solid ${props => props.theme.palette.clrGreen};
                    margin-left: 4px;
                    margin-top: 2px;
                }
                
                svg {
                    &, & * {
                        fill: ${props => props.theme.palette.clrGreen} !important;
                    }
                }
                
                .sprite-icon {
                    transform: rotateZ(180deg);
                }
            }
    
            &.negative {
                color: ${props => props.theme.palette.clrRed};
                
                > span {
                    width: 0; 
                    height: 0; 
                    border-left: 5px solid transparent;
                    border-right: 5px solid transparent;
                    border-top: 5px solid ${props => props.theme.palette.clrRed};
                    margin-left: 4px;
                    margin-top: 2px;
                }
                
                svg {
                    &, & * {
                        fill: ${props => props.theme.palette.clrRed} !important;
                    }
                }
            }
        }
    }
        
    // &:hover {
    //     .price {
    //         display: none;
    //     }
    //     .change-in-percent {
    //         display: flex;
    //     }
    // }
    
    .basic-table__btn {
        margin-left: auto;
        width: 175px;
        min-height: 61px !important;
        white-space: nowrap;
        font-size: 24px;
        line-height: 0.8;
        text-align: right;
        padding: 20px 30px 20px 5px;
        background: ${props => props.theme.palette.clrBackground};
        color: ${props => (props.isActive && props.isLoggedIn) ? props.theme.palette.clrPurple : props.theme.palette.clrBorder};
        
        div {
            overflow: hidden;
            white-space: initial;
            word-break: break-word;
        }

        &:hover {
            background: ${props => props.theme.palette.clrMouseHover};
            // color: ${props => (props.isActive && props.isLoggedIn) ? props.theme.palette.clrHighContrast : props.theme.palette.clrBorder};
            color: ${props => props.theme.palette.clrHighContrast};
        }

        &:active {
            background: ${props => props.theme.palette.clrPurple};
            color: ${props => props.theme.palette.clrHighContrast};
        }
    }
    
    .full-width {
        margin-left: auto;
        width: 186px !important;
    }
    
    .send-coin {
        position: absolute;
        left: 15px;
        right: 15px;
        margin: 0;
        width: calc(100% - 30px) !important;
        height: 60px;
        z-index: 2;
    }
`;

export const MarketcapCell = styled(Cell)`
    .value {
        display: block;
        font-weight: 600;
    }
`;

export const VolumeCell = styled(MarketcapCell).attrs({ className: 'wallet-table-merged-cell' })`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    margin: 0;
    // padding-right: ${props => props.isVolume ? '0' : '20px'};
    width: 100%;
    height: 100%;
    text-align: right;
    
    
    .change-in-percent {
        &.positive {
            color: ${props => props.theme.palette.clrGreen};
        }

        &.negative {
            color: ${props => props.theme.palette.clrRed};
        }
    }
    
    // &:hover {
    //     background: ${props => props.theme.palette.clrMouseHover};
    // }
`;

const ArrowSvg = styled.svg`
    margin-left: 6px;
    width: 10px;
    height: 9px;
`;

export const ArrowIcon = () => (
    <ArrowSvg className="sprite-icon close" role="img" aria-hidden="true">
        <path
            d="M1483.01,54a1.924,1.924,0,0,0,1.28-.809l3.34-3.65a1.27,1.27,0,0,0,.37-0.83c0-.43-0.38-0.71-1.09-0.71h-7.81c-0.71,0-1.1.28-1.1,0.71a1.259,1.259,0,0,0,.38.83l3.35,3.65A1.906,1.906,0,0,0,1483.01,54Z"
            transform="translate(-1478 -48)"
        />
    </ArrowSvg>
);

const SwapSvg = styled.svg`
    position: absolute;
    top: 3px;
    left: 5px;
    width: 20px;
    fill: ${props => props.theme.palette.clrBorder};
`;

export const SwapIcon = props => (
    <SwapSvg
        viewBox="0 0 512.003 512.003"
        role="img"
        aria-hidden="true"
        {...props}
    >
        <path d="M440.448,87.831H114.629l52.495-52.495c8.084-8.084,8.084-21.19,0-29.274c-8.083-8.084-21.19-8.084-29.274,0 L20.126,123.788c-8.084,8.084-8.084,21.19,0,29.274L137.85,270.786c4.041,4.042,9.338,6.062,14.636,6.062 c5.298,0,10.596-2.02,14.636-6.064c8.084-8.084,8.084-21.19,0-29.274l-52.495-52.495h325.82c27.896,0,50.592-22.695,50.592-50.592 C491.04,110.528,468.345,87.831,440.448,87.831z"/>
        <path d="M491.877,358.942L374.154,241.218c-8.083-8.084-21.19-8.084-29.274,0c-8.084,8.084-8.084,21.19,0,29.274l52.495,52.495 H71.556c-27.896,0-50.592,22.695-50.592,50.592s22.695,50.593,50.592,50.593h325.819l-52.495,52.495 c-8.084,8.084-8.084,21.19,0,29.274c4.042,4.042,9.34,6.064,14.636,6.064c5.296,0,10.596-2.02,14.636-6.064l117.724-117.724 C499.961,380.132,499.961,367.026,491.877,358.942z"/>
    </SwapSvg>
);

export const HeaderWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    background: ${props => props.theme.palette.leftTopBg};
    // overflow: hidden;
    font-size: 30px;
    
    > .left {
        width: 60px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        cursor: pointer;
    }
    
    > .center {
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: center;
        height: 100%;
        margin-right: ${props => props.isHistoryMode ? '60px' : 0};
    }
    
    > .right {
        width: 60px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        cursor: pointer;
    }
`;

export const LabelDeposit = styled.div`
    padding-top: ${props => !props.isDefaultCrypto ? '6px' : 0};
    display: flex;
    align-items: center;
    color: ${props => props.theme.palette.clrHighContrast};
    font-family: CoreSansC_ExtraLight;
    cursor: ${props => props.isClickable ? 'pointer' : ''};
    
    .dropdown-wrapper {
        position: relative;
    }
    
    > span {
        display: inline;
        padding-top: ${props => props.isDefaultCrypto ? '6px' : 0};
        padding-left: 4px;
    }
    
    &:hover {
        color: ${props => props.isClickable ? props.theme.palette.clrPurple : ''};
    }
`;

export const QRWrapper = styled(BodyWrapper)`
    font-size: 18px;
    font-weight: 600;
    color: ${props => props.theme.palette.clrPurple};
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
    bottom: 50px;
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

export const StyleWrapper = styled.div`
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    
    > section {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
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
