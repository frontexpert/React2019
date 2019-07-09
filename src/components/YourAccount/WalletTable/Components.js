import React from 'react';
import styled from 'styled-components';

export const StyleWrapper = styled.div`
    position: relative;
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    margin-top: 1px;
    background-color: ${props => props.theme.palette.clrMainWindow};
    border: 1px solid ${props => props.theme.palette.clrBorder};
    border-radius: ${props => props.theme.palette.borderRadius};
    font-family: open_sans, sans-serif;
    font-size: 14px;
    
    .ps__rail-y {
        display: none !important;
        background-color: ${props => props.theme.palette.walletScrollBack} !important;
        border-left: 1px solid ${props => props.theme.palette.walletScrollBorder};
        opacity: 1 !important;
        
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
        padding: 10px 14px;
        display: flex;
        border-right: 1px solid ${props => props.theme.palette.walletGrid};
        text-overflow: inherit;
        overflow: initial !important;
        
        &:last-child {
            border-right: 0;
        }
    }
    
    .ReactVirtualized__Table__row {
        border-bottom: 1px solid ${props => props.theme.palette.walletGrid};
        overflow: initial !important;

        &:last-child {
            border-bottom: none;
        }
    }
    
    .ReactVirtualized__Table__Grid {
        outline: none !important;
        box-shadow: 7px 6px 11px rgba(0, 0, 0, .05);
    }
    
    .coin-icon {
        width: 36px;
        height: 36px;
        background-size: 100% 100% !important;
        
        .coin-icon-disabled {
            width: 36px;
            height: 36px;
            border-radius: 100%;
            background: rgba(104, 122, 240, 0.4);            
        }
    }
    
    .no-icon {
        width: 36px;
        height: 36px;
        border-radius: 50% 50%;
        margin-right: 10px;
        background-color: #f3a217;
    }
    
    .d-flex-col {
        display: flex;
        flex-direction: column;
        line-height: 1.2;
        
        .smaller {
            // width: 54.9062px;
            display: block;
            font-size: 12px;
        }
    }
    
    .scroll__scrolldown {
        bottom: 30px;
    }
`;

const Cell = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
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

    .coin-icon {
        // opacity: ${props => !props.disabled ? '1' : '0.25 !important'};
        opacity: 1 !important;
        background-size: 100% 100% !important;
    }

    .wallet-box {
        display: block;
        width: 54.9062px;
        color: ${props => props.theme.palette.clrPurple};

        .wallet {
            color: ${props => !props.disabled ? props.theme.palette.contrastText : props.theme.palette.clrPurple};
            display: inline;
            font-weight: 600;
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
    
    .wallet-combined {
        margin-left: auto;
        cursor: pointer;
        font-size: 12px;
        font-weight: 300;
        line-height: 1em;
        color: ${props => props.theme.palette.clrBlue};
        text-decoration: underline;
    }
`;

export const PriceCell = styled(Cell)`
    .price {
        display: block;
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
        }
    }
    
    // .smallChartInfo {
    //     color: ${props => !props.disabled ? props.theme.palette.contrastText : props.theme.palette.clrtext};
    //     display: flex;
    //     flex-direction: column;
    //     justify-content: center;
    //     font-family: open_sans, sans-serif;
    //     font-size: 14px;
    //     // font-weight: 600;
    //     // width: 100px;
    //     // height: 36px;
    //     line-height: 1.2;
    //     text-size-adjust: 100%;
    //     width: 50%;
    //    
    //     .smaller {
    //         // margin: 2px 0 0;
    //         // font-size: 10px;
    //         font-weight: 400;
    //         color: ${props => props.theme.palette.clrtext};
    //     }
    //    
    //     .clr-green {
    //         color: #01b067;
    //     }
    //    
    //     .clr-darkRed {
    //         color: #CE2424;
    //         // color: #8f393f;
    //     }
    //    
    //     div {
    //         display: flex;
    //         align-items: center;
    //        
    //         span:last-child {
    //             margin-left: 8px;
    //         }
    //     }
    // }
    //
    // .gray {
    //     font-family: open_sans, sans-serif;
    //     font-size: 13px;
    //     font-weight: 400;
    //     color: ${props => props.theme.palette.clrtext};
    // }
`;

export const MarketcapCell = styled(Cell)`
    .value {
        display: block;
        font-weight: 600;
    }
`;

export const VolumeCell = styled(MarketcapCell)`
    width: 100%;
    justify-content: space-between;
    
    .change-in-percent {
        &.positive {
            color: ${props => props.theme.palette.clrGreen};
        }

        &.negative {
            color: ${props => props.theme.palette.clrRed};
        }
    }
`;

export const DepositCell = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    // padding-right: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    > div {
        width: 100%;
        height: 100%;
    }
    
    .basic-table__btn {
        position: relative;
        width: 100%;
        height: 100%;
        background: transparent;
        border: 1px solid ${props => props.theme.palette.walletBtn};
        border-radius: ${props => props.theme.palette.borderRadius};
        outline: none;
        font-size: 14px;
        font-weight: bold;
        color: ${props => props.theme.palette.walletBtn};
        line-height: 1.2;
        cursor: pointer;
        opacity: 1 !important;
        pointer-events: all;

        &:hover {
            background: ${props => props.theme.palette.walletBtnHover};
        }

        &:active,
        &.active {
            background: ${props => props.theme.palette.walletBtn};
            color: ${props => props.theme.palette.contrastText};
        }
        
        &:after {
            content: '';
            position: absolute;
            right: -4px;
            top: calc(50% - 7px);
            width: 14px;
            height: 14px;
            background: transparent url('/img/wallet-button-after.png') no-repeat center;
            background-size: cover;
        }
    }
`;

export const InputWrapper = styled.div`
    position: absolute;
    left: ${props => props.left || 0}px;
    top: ${props => props.top || 0}px;
    width: 200px;
    height: 60px;
    padding: 0 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: ${props => props.theme.palette.clrMouseHover};
    border: 1px solid ${props => props.theme.palette.clrPurple};
    border-radius: ${props => props.theme.palette.borderRadius};
    
    input {
        max-width: 130px;
        margin: 0 4px;
        background: transparent;
        border: 0;
        outline: 0;
        flex: 1;
        font-size: 18px;
        font-weight: 600;
        color: ${props => props.theme.palette.clrHighContrast};
    }
`;

export const SearchSvg = styled.svg`
    width: 15px;
    height: 15px;
    fill: ${props => props.theme.palette.clrPurple};
`;

export const CloseSvg = styled.svg`
    width: 15px;
    height: 15px;
    fill: ${props => props.theme.palette.clrPurple};
    cursor: pointer;
    
    &:hover {
        fill: ${props => props.theme.palette.clrHighContrast};
    }
`;
