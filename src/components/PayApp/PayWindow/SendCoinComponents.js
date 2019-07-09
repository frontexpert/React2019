import styled, { keyframes } from 'styled-components';
import React from 'react';
import QRCode from 'qrcode.react';
import { contentModeKeys } from '../../../stores/PayWindowStore';

const shake = keyframes`
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

export const Wrapper = styled.div.attrs({ className: 'wallet-on-side-wrapper' })`
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-rows: 60px auto;
    background: ${props => props.theme.palette.leftTopBg};
    border-radius: ${props => props.theme.palette.borderRadius};
    overflow: ${props => props.overflowVisible ? 'visible' : 'hidden'};
    border: 1px solid ${props => props.theme.palette.clrBorder};
    z-index: 100;

    @media (max-width: 768px) {
        grid-template-rows: 80px auto;
    }
`;

export const SendFormWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin: 0;
    border: 1px solid ${props => props.theme.palette.clrBorderHover};
    border-radius: ${props => props.theme.palette.borderRadius};
    width: 100%;
    height: 100%; 
    background: ${props => props.theme.palette.clrBackground};

    .address-label {
        margin-left: 10px;
        height: 42px;
        min-height: 42px;
        font-size: 20px;
        color: ${props => props.theme.palette.clrPurple};
        line-height: 42px;
    }

    .send-coin-avatar-2 {
        margin-left: 10px;
        margin-right: 0 !important;
        width: 42px;
        height: 42px;
        min-width: 42px;
        min-height: 42px;
    }
`;

export const SendAddress = styled.div`
    position: absolute;
    left: 25px;
    width: 100px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    z-index: 1;
    
    input {
        background: transparent;
        border: 0;
        color: transparent;
        outline: none;
        position: absolute;
        left: -200%;
    }
`;

export const InputAmountGroupDefault = styled.div`
    position: relative;
    flex-shrink: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    margin: 0;
    border: none;
    width: calc(100% - 50px);
    height: 100%;
    pointer-events: ${props => props.readonly ? 'none' : 'all'};
`;

export const Numpad = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: stretch;
    color: #FFF;
    font-family: CoreSansC_Light;// CoreSansC_Regular, CoreSansC_ExtraLight

    .usd-amount {
        flex: 1;
        font-size: ${props => props.usdAmountFont.smallSize}px;
        align-items: center;
        text-align: center;
        display: flex;
        justify-content: center;
        padding-right: ${props => props.isOnedigit ? '12%' : '0'};

        &.disabled {
            pointer-events: none;
        }

        &.shake {
            animation: ${shake} 0.3s cubic-bezier(.36,.07,.19,.97) both;
        }
        
        .dropdown-wrapper {
            position: relative;
            height: ${props => 0.7 * props.usdAmountFont.bigSize}px;
        }
        
        .child:hover {
            color: ${props => props.theme.palette.clrBlue};
            cursor: pointer;
        }
            
        .usd-symbol {
            position: relative;
            height: ${props => 0.7 * props.usdAmountFont.bigSize}px;
        }

        span {
            height: ${props => 0.7 * props.usdAmountFont.bigSize}px;
        
            &.usd-integer {
                font-size: ${props => props.usdAmountFont.bigSize}px;
                line-height: ${props => props.usdAmountFont.bigSize}px;
                height: ${props => 0.8 * props.usdAmountFont.bigSize}px;
                font-family: CoreSansC_ExtraLight;
            }

            &.usd-decimal {
                // width: ${props => 1.2 * props.usdAmountFont.smallSize}px;
                height: ${props => 0.75 * props.usdAmountFont.bigSize}px;
                text-align: left;
                margin-left: 5px;

                &.placeholder {
                    color: ${props => props.theme.palette.clrPurple};
                    opacity: 0.15;
                }
            }
            
            @media (max-width: 700px) {
                font-size: ${props => 1.2 * props.usdAmountFont.smallSize}px;

                &.usd-integer {
                    font-size: ${props => 1.2 * props.usdAmountFont.bigSize}px;
                    line-height: ${props => 1.2 * props.usdAmountFont.bigSize}px;
                }

                &.usd-decimal {
                    // width: ${props => 1.8 * props.usdAmountFont.smallSize}px;
                    text-align: left;
                    margin-left: 5px;

                    &.placeholder {
                        color: ${props => props.theme.palette.clrPurple};
                    }
                }
            }
        }
    }

    .num-pad {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 0 10px;

        .num-pad-row {
            display: flex;
            flex-direction: row;
            font-size: 30px;
            // max-height: 80px;
            flex: 2;

            .num-pad-key {
                cursor: pointer;
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
                overflow: hidden;
                transition: background-color 0.2s ease-in, font-size 0.2s ease-in;
                border-bottom: 2px solid rgba(127 , 139, 194, 0.05);
                margin: 0 10px;

                &:active {
                    border-bottom: 1px solid rgba(127 , 139, 194, 0.6);
                    font-size: 54px;
                }
            }
        }

        .num-pad-bottom {
            flex: 1;
        }
    }
    
    .qr-in-numpad {
        flex: 1;
        width: 100%;
    }
`;

export const FiatIcon = styled.div`
    background: url('img/icons-coin/${props => props.defaultFiat ? props.defaultFiat.toLowerCase() : ''}.png') no-repeat;
    flex-shrink: 0;
    border-radius: 50%;
    overflow: hidden;
    opacity: 1 !important;
    background-size: 100% 100% !important;
    width: 40px;
    height: 40px;
    display: block;
    margin: auto;
`;

export const InputAddress = styled.input`
    flex: 1 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin: 0;
    border: none;
    padding: 5px;
    width: 100%;
    height: 100%;

    font-size: 18px;
    font-weight: normal;
    line-height: 1em;
    color: ${props => props.theme.palette.clrHighContrast};
    background: transparent;
    outline: none !important;
    
    overflow: hidden;
    text-overflow: ellipsis;

    &.is-address {
        // color: ${props => props.theme.palette.clrBorder};
        color: ${props => props.theme.palette.clrHighContrast};
    }
    &::-webkit-input-placeholder {
        color: ${props => props.theme.palette.clrPurple};
    }
`;

export const InputAmountGroup = styled.div`
    position: relative;
    flex-shrink: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    margin: 0;
    border: none;
    border-left: 1px solid ${props => props.theme.palette.clrBorderHover};
    width: 175px;
    height: 100%;
`;

export const InputAmount = styled.input`
    flex: 1 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    margin: 0;
    border: none;
    padding: 5px 15px;
    width: 100%;
    height: 100%;

    text-align: right;
    font-size: 25px;
    font-weight: bold;
    line-height: 1em;
    color: ${props => props.theme.palette.clrHighContrast};
    background: transparent;
    outline: none !important;
`;

export const InputAmountAddon = styled.span`
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    border: none;
    padding: 5px 10px 5px 5px;
    width: min-content;
    height: 100%;

    font-size: 25px;
    font-weight: bold;
    line-height: 1em;
    color: ${props => props.theme.palette.clrPurple};
    background: transparent;
    outline: none !important;
`;

export const Dropdown = styled.div`
    position: absolute;
    top: 59px;
    left: -1px;
    right: 174px;
    z-index: 5001;
    height: 240px;
    // background-color: ${props => props.theme.palette.depositInputBackground};
    background: transparent;
    // border: 1px solid ${props => props.theme.palette.depositActive};
    border: none;
    border-top: 0;
    border-radius: 0 0 ${props => props.theme.palette.borderRadius} ${props => props.theme.palette.borderRadius};
    color: ${props => props.theme.palette.depositLabel};
`;

export const Item = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    
    .telegram-channel-avatar {
        width: 40px !important;
        height: 40px !important;
        min-width: 40px;
        min-height: 40px;
        margin: 4px !important;
        border-radius: 50% !important;
        
        .telegram-channel-avatar__default {
            font-size: 10px !important;
            line-height: 1em !important;
        }
    }
`;

export const Name = styled.div.attrs({ className: 'deposit-dropdown-name' })`
    margin-left: 8px;
    flex: 1;
    display: ${props => props.isCustom ? 'flex' : 'block'};
    align-items: center;
    font-size: 14px;
    font-weight: normal;
    color: ${props => props.selected ? props.theme.palette.depositDropdownActive : props.theme.palette.depositDropdown};
    overflow: hidden;
    text-overflow: ellipsis;
    
    span {
        color: ${props => props.theme.palette.clrHighContrast};
    }
`;

const CustomSvg = styled.svg`
    width: 13px;
    height: 13px;
    margin-left: 8px;
    cursor: pointer;
    
    .cls-opt-1 {
        stroke: ${props => props.selected ? props.theme.palette.depositDropdownActive : props.theme.palette.depositDropdown};    
    }
    
    .cls-opt-2 {
        fill: ${props => props.selected ? props.theme.palette.depositDropdownActive : props.theme.palette.depositDropdown};    
    }
`;

export const Option = props => (
    <CustomSvg {...props} viewBox="0 0 12.34 12.34">
        <circle className="cls-opt-1" cx="6.17" cy="6.17" r="5.67"/>
        {props.selected && (
            <circle className="cls-opt-2" cx="6.22" cy="6.17" r="2.79"/>
        )}
    </CustomSvg>
);

export const StyleWrapper = styled.div`
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    
    .scrollbar-container {
        border: 1px solid ${props => props.theme.palette.depositActive};
        border-top: none;
        border-bottom-left-radius: ${props => props.theme.palette.borderRadius};
        border-bottom-right-radius: ${props => props.theme.palette.borderRadius};
        overflow: hidden;

        height: min-content;
        max-height: 100%;
    }
    
    .ps__rail-y {
        background-color: ${props => props.theme.palette.depositInputBackground} !important;
        border-left: 1px solid ${props => props.theme.palette.depositActive};
        border-bottom-right-radius: ${props => props.theme.palette.borderRadius};
        opacity: 1 !important;
        right: 0 !important;

        .ps__thumb-y {
            z-index: 9999;
            cursor: pointer;
            
            &:before {
                background-color: ${props => props.theme.palette.depositActive};
            }
        }
    }
    
    .ReactVirtualized__Table__rowColumn {
        height: 100%;
        margin: 0;
        padding: ${props => props.length > 4 ? '8px 30px 8px 15px' : '8px 15px'} !important;
    }
    
    .ReactVirtualized__Table__row {
        border-bottom: 1px solid ${props => props.theme.palette.depositInputBorder};
        background: ${props => props.theme.palette.depositInputBackground};

        &:last-child {
            border-bottom: none;
        }

        &:hover {
            background-color: ${props => props.theme.palette.depositInputHover};
            
            .cls-info-1,
            .cls-opt-1 {
                fill: ${props => props.theme.palette.depositInputHover};
            }
        }
        
        &:active {
            background-color: ${props => props.theme.palette.depositActiveBack};
            
            .cls-info-1,
            .cls-opt-1 {
                fill: ${props => props.theme.palette.depositActiveBack};
            }
        }
        
        &:hover,
        &:active {
            .deposit-dropdown-name {
                color: ${props => props.theme.palette.depositDropdownActive} !important;
            }
            
            .cls-info-1 {
                stroke: ${props => props.theme.palette.depositInputBackground} !important;
            }
            
            .cls-info-2 {
                fill: ${props => props.theme.palette.depositBackground} !important;
            }
        }
    }
    
    .ReactVirtualized__Table__Grid {
        outline: none !important;
    }
`;

const SuccessfulIconSvg = styled.svg`
    width: 15px;
    height: 13px;

    &, & * {
        fill: transparent !important;
        stroke: white !important;
    }
`;

export const SuccessfulIcon = () => (
    <SuccessfulIconSvg>
        <g>
            <polyline points="0.49 5.18 6.8 10.7 16.3 0.51"/>
        </g>
    </SuccessfulIconSvg>
);

export const SendButton = styled.div`
    //position: absolute;
    //top: 100%;
    //right: -1px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid ${props => props.theme.palette.clrBlue};
    width: 140px;
    height: 60px;
    background: ${props => props.theme.palette.clrBlue};
    border-radius: ${props => props.theme.palette.borderRadius};
    cursor: pointer;

    transform-origin:left;
    @media(max-width: 1500px) {
        transform:scale(0.75) !important;
    }
    
    @media(max-width: 1080px) { 
        transform:scale(0.65) !important;
    }
    
    @media(max-width: 940px) {
        transform:scale(0.55) !important;
    }
    
    @media(max-width: 790px) {
        transform:scale(0.45) !important;
    }
    
    @media(max-width: 700px) {
        transform:scale(0.35) !important;
    }
    
    
    &.is-sending {
        background: ${props => props.theme.palette.clrBackground};
        border: 1px solid ${props => props.theme.palette.clrBorderHover};
    }
    
    &.is-submitted {
        background: ${props => props.theme.palette.clrGreen};
        border: 1px solid ${props => props.theme.palette.clrGreen};
    }
`;

export const Buttons = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 75px;
    padding: 0 20px 20px;
`;

export const CloseButton = styled.div`
    flex: 1;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    padding: 0;
    height: 100%;
    color: #fff;
    cursor: pointer;
    text-decoration: none;
    font-size: 16px;
    font-weight: 700;
    white-space: nowrap;
    transition: all 0.1s;
    line-height: 1;
    background: ${props => props.theme.palette.coinPairCloseBtnBg};
    border-radius: ${props => props.theme.palette.borderRadius};

    .sprite-icon {
        width: 35px;
        height: 35px;
        fill: ${props => props.theme.palette.coinPairCloseBtnText};
    }
    
    &:hover, &:focus {
        background: ${props => props.theme.palette.coinPairCloseBtnHoverBg};
        
        .sprite-icon {
            fill: ${props => props.theme.palette.coinPairCloseBtnHoverText};
        }
    }
    
    &:active, &.active {
        background: ${props => props.theme.palette.coinPairCloseBtnActiveBg};
        
        .sprite-icon {
            fill: ${props => props.theme.palette.coinPairCloseBtnActiveText};
        }
    }
`;

const CompleteIconSvgWrapper = styled.svg`
    width: 35px;
    height: 29px;
    
    &, & * {
        fill: ${props => props.theme.palette.clrHighContrast};
    }
`;

export const QRSectionWrapper = styled.div`
    position: relative;
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #FFF;
    border-radius: ${props => props.theme.palette.borderRadius};
    border: ${props => !props.noborder ? '1px solid ' + props.theme.palette.clrBorder : ''};
    
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

export const QRCodeWrapper = styled.div`
    display: flex;
    position: relative;
    width: 82%;
    height: 100%;
    flex-direction: column;
    align-items: stretch;
    justify-content: stretch;
    font-family: CoreSansC_ExtraLight;
    color: #FFF;
    
    .qr-code-mini {
        width: 30px;
        height: 75px;
        fill: ${props => props.theme.palette.depositText};
    }
`;

export const QRLabel = styled.div`
    // margin-top: 25px;
    text-align: center;
    font-size: 25px;
    height: 75px;
    word-break: break-all;
    padding-top: 10px;
`;

export const ImgCoin = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    
    > div {
        max-width: 150px;
        max-height: 150px;
        width: 100%;
        height: 100%;
    }
    
    .coin-icon {
        flex-shrink: 0;
        background-size: cover !important;
    }
    
    .no-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        font-weight: bold;
        background: ${props => props.theme.tradePalette.primaryBuy};
        color: ${props => props.theme.palette.contrastText};
    }
`;

export const QRPrice = styled.div.attrs({ className: 'usd-amount' })`
    flex: 1;
    font-size: ${props => props.usdAmountFont.smallSize}px;
    align-items: center;
    text-align: center;
    display: flex;
    justify-content: center;
    padding-right: ${props => props.isOnedigit ? '12%' : '0'};

    &.shake {
        animation: ${shake} 0.3s cubic-bezier(.36,.07,.19,.97) both;
    }

    span {
        height: ${props => 0.7 * props.usdAmountFont.bigSize}px;
    
        &.usd-integer {
            font-size: ${props => props.usdAmountFont.bigSize}px;
            line-height: ${props => props.usdAmountFont.bigSize}px;
            height: ${props => 0.8 * props.usdAmountFont.bigSize}px;
        }

        &.usd-decimal {
            // width: ${props => 1.2 * props.usdAmountFont.smallSize}px;
            height: ${props => 0.75 * props.usdAmountFont.bigSize}px;
            text-align: left;
            margin-left: 5px;

            &.placeholder {
                color: ${props => props.theme.palette.clrPurple};
                opacity: 0.15;
            }
        }
        
        @media (max-width: 700px) {
            font-size: ${props => 1.2 * props.usdAmountFont.smallSize}px;

            &.usd-integer {
                font-size: ${props => 1.2 * props.usdAmountFont.bigSize}px;
                line-height: ${props => 1.2 * props.usdAmountFont.bigSize}px;
            }

            &.usd-decimal {
                // width: ${props => 1.8 * props.usdAmountFont.smallSize}px;
                text-align: left;
                margin-left: 5px;

                &.placeholder {
                    color: ${props => props.theme.palette.clrPurple};
                }
            }
        }
    }
`;

export const QRCodeMain = styled.div`
    flex: 1;
    .qr-code {
        fill: ${props => props.theme.palette.depositText};
        width: 100%;
        height: 100%;
    }
`;

export const Code = styled(QRCode)`
    & path:nth-child(1) {
        /* background */
        fill: ${props => props.theme.palette.clrBackground};
        display: none;
    }

    & path:nth-child(2) {
        /* foreground */
        fill: ${props => props.theme.palette.clrHighContrast};
    }
`;

export const Button = styled.button`
    width: 38px;
    height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: 0;
    cursor: pointer;
    outline: none !important;
    
    &:first-child {
        border-radius: ${props => `${props.theme.palette.borderRadius} 0 0 ${props.theme.palette.borderRadius}`};
    }
    
    &:last-child {
        border-radius: ${props => `0 ${props.theme.palette.borderRadius} ${props.theme.palette.borderRadius} 0`};
    }
    
    &:not(:first-child) {
        border-left: 1px solid ${props => props.theme.palette.clrBorder};
    }
    
    svg {
        fill: ${props => props.theme.palette.clrBorder};
    }
    
    &:hover,
    &.active {
        background: ${props => props.theme.palette.clrBorder};

        svg {
            fill: ${props => props.theme.palette.clrHighContrast};
        }
    }
`;

export const CompleteIcon = props => (
    <CompleteIconSvgWrapper {...props}>
        <path d="M34.87,5,30.32.47a1.6,1.6,0,0,0-2.27,0L17.67,10.85h0l-5.84,5.84L7.29,12.15a1.62,1.62,0,0,0-2.28,0L.47,16.69A1.6,1.6,0,0,0,.47,19L10.69,29.19a1.61,1.61,0,0,0,1.14.47A1.63,1.63,0,0,0,13,29.19l4.7-4.71L34.87,7.29a1.62,1.62,0,0,0,0-2.28Z"/>
    </CompleteIconSvgWrapper>
);

const SendButtonArrowSvgWrapper = styled.svg`
    width: 11px;
    height: 22px;
    
    &, & * {
        fill: ${props => props.theme.palette.clrPurple} !important;
        stroke: ${props => props.theme.palette.clrBorder} !important;
    }
`;

export const SendButtonArrow = props => (
    <SendButtonArrowSvgWrapper {...props}>
        <polygon points="0.54 22.56 0.54 1.3 11.17 11.93 0.54 22.56"/>
    </SendButtonArrowSvgWrapper>
);

export const HWrapper = styled.div.attrs({ className: 'wallet-on-side-horizontal-wrapper' })`
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    // display: flex;
    // align-items: center;
    // justify-content: center;
    background: ${props => props.theme.palette.leftTopBg};
    border-radius: ${props => props.theme.palette.borderRadius};
    overflow: hidden;
    border: 1px solid ${props => props.theme.palette.clrBorder};
    z-index: 100;
`;

export const CurrencyList = styled.div`
    flex: 1;
    text-align: center;
    width: ${props => props.width}px;
    height: ${props => props.height}px;
`;

export const CurrencyImage = styled.img`
    width: ${props => props.width}px;
    height: ${props => props.height - 30}px;
`;

const TransferFundWrapper = styled.svg`
    width: 40px;
    height: 40px;
    
    &, & * {
        fill: ${props => props.theme.palette.clrGreen} !important;
        // stroke: ${props => props.theme.palette.clrBorder} !important;
        // fill: ${props => props.theme.palette.clrHighContrast};
    }
`;

const SvgWrapper = styled.div`
    position: absolute;
    top: calc(50% - 32px);
    left: ${props => props.isLeft ? '10px' : ''};
    right: ${props => !props.isLeft ? '10px' : ''};
    z-index: 10;
    background: ${props => props.theme.palette.clrHighContrast} !important;
    border-radius: 50%;
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0.65px 0.65px;
`;

export const ReceiveFund = props => (
    <SvgWrapper isLeft={true}>
        <TransferFundWrapper {...props}>
            <g>
                <path d="M32,22.327c0-1.705-1.387-3.093-3.092-3.093c-0.637,0-1.227,0.199-1.717,0.528h-0.002c0,0.003-0.002,0.003-0.002,0.005 c-0.207,0.142-0.398,0.301-0.566,0.485l0.008,0.008c-0.641,0.576-1.666,1.543-2.41,2.423c-0.16-0.412-0.404-0.787-0.717-1.093 c-3.053-2.688-6.723-3.78-10.93-3.78c-1.377,0-2.705,0.149-3.961,0.424c-0.037-0.457-0.063-0.735-0.063-0.735H0.359 c0,0-0.359,2.998-0.359,6.694c0,3.697,0.359,6.694,0.359,6.694h8.189c0,0,0.072-0.78,0.15-1.893 c1.219-0.205,2.465,0.116,3.908,1.012c1.828,1.195,4.08,1.902,6.518,1.902c2.472,0,4.594-0.729,6.36-1.955l0.002,0.002 c0.019-0.015,0.041-0.031,0.068-0.052c0.5-0.353,0.973-0.741,1.413-1.168c0.347-0.354,0.814-0.807,1.519-1.495 c2.361-2.32,2.652-2.781,2.652-2.781s-0.007,0.002-0.009,0.002C31.668,23.909,32,23.159,32,22.327z M30.121,23.54 c-0.414,0.41-2.166,2.215-2.639,2.678c-1.229,1.207-1.801,1.771-2.072,2.084l-0.004-0.006c-0.188,0.168-0.385,0.322-0.586,0.47 c-1.584,1.071-3.557,1.711-5.695,1.711c-2.158,0-4.146-0.647-5.736-1.735h-0.012c-1.375-0.841-2.988-1.354-4.584-1.197 c0.063-1.103,0.115-2.312,0.115-3.349c0-1.44-0.1-3.211-0.193-4.567c1.215-0.274,2.512-0.428,3.857-0.428 c4.12,0,7.762,1.362,9.995,3.495c0.263,0.293,0.429,0.679,0.429,1.101c0,0.916-0.744,1.658-1.658,1.658 c-0.035,0-0.067-0.009-0.103-0.011l-0.004,0.021c-0.854-0.03-2.188-0.389-4.442-1.25l-0.513,1.34 c2.384,0.91,3.953,1.318,5.066,1.347v-0.01c1.395-0.005,2.572-0.933,2.955-2.201v0.002c0.482-0.801,2.287-2.472,3.312-3.383 l0.002,0.002c0.011-0.011,0.021-0.019,0.027-0.026c0.19-0.171,0.354-0.313,0.473-0.416c0.216-0.136,0.44-0.193,0.798-0.193 c0.914,0,1.655,0.744,1.655,1.656C30.564,22.786,30.363,23.219,30.121,23.54z"/>
                <path d="M21.973,18.611c5.105,0,9.26-4.153,9.26-9.259s-4.152-9.26-9.26-9.26c-5.106,0-9.26,4.154-9.26,9.26 S16.865,18.611,21.973,18.611z M21.973,1.706c4.215,0,7.646,3.432,7.646,7.646c0,4.214-3.432,7.646-7.646,7.646 c-4.217,0-7.646-3.432-7.646-7.646C14.327,5.137,17.756,1.706,21.973,1.706z"/>
                <path d="M19.545,9.04c0.197,0.23,0.48,0.441,0.848,0.637c0.365,0.193,0.855,0.338,1.467,0.43 c0.174,0.029,0.348,0.066,0.521,0.115c0.178,0.045,0.338,0.109,0.486,0.188c0.146,0.08,0.268,0.176,0.361,0.287 c0.094,0.109,0.141,0.242,0.141,0.393c0,0.18-0.09,0.324-0.27,0.438c-0.184,0.111-0.406,0.166-0.682,0.166 c-0.209,0-0.396-0.016-0.559-0.049c-0.158-0.031-0.309-0.082-0.439-0.15c-0.132-0.068-0.262-0.154-0.389-0.26 c-0.125-0.104-0.254-0.227-0.385-0.371h-1.51v2.266h1.51v-0.338c0.072,0.037,0.146,0.072,0.225,0.104 c0.072,0.033,0.15,0.066,0.229,0.102v0.885h1.51v-0.681c0.324-0.021,0.625-0.09,0.9-0.205c0.277-0.113,0.518-0.266,0.719-0.453 c0.201-0.186,0.359-0.404,0.475-0.652s0.174-0.516,0.174-0.803c0-0.15-0.025-0.346-0.082-0.588 c-0.053-0.24-0.178-0.486-0.371-0.734c-0.191-0.248-0.477-0.477-0.846-0.689c-0.371-0.213-0.869-0.365-1.494-0.459 c-1.008-0.15-1.51-0.459-1.51-0.926c0-0.166,0.078-0.32,0.24-0.465c0.162-0.143,0.396-0.215,0.695-0.215 c0.209,0,0.391,0.018,0.545,0.053c0.154,0.037,0.297,0.09,0.426,0.156c0.129,0.068,0.252,0.154,0.367,0.26 c0.115,0.104,0.232,0.225,0.355,0.361h1.52V5.577h-1.508V5.9c-0.18-0.109-0.383-0.195-0.605-0.26V4.82H21.1v0.713 c-0.295,0.043-0.564,0.129-0.812,0.254s-0.463,0.283-0.646,0.475c-0.185,0.189-0.326,0.408-0.427,0.652 c-0.103,0.244-0.151,0.502-0.151,0.777c0,0.186,0.031,0.4,0.092,0.641C19.219,8.572,19.348,8.81,19.545,9.04z"/>
            </g>
        </TransferFundWrapper>
    </SvgWrapper>
);

export const SendFund = props => (
    <SvgWrapper isLeft={false}>
        <TransferFundWrapper {...props}>
            <g>
                {/* <path d="M509.532,34.999c-2.292-2.233-5.678-2.924-8.658-1.764L5.213,225.734c-2.946,1.144-4.967,3.883-5.192,7.034 c-0.225,3.151,1.386,6.149,4.138,7.7l102.719,57.875l35.651,174.259c0.222,1.232,0.723,2.379,1.442,3.364 c0.072,0.099,0.131,0.175,0.191,0.251c1.256,1.571,3.037,2.668,5.113,3c0.265,0.042,0.531,0.072,0.795,0.088 c0.171,0.011,0.341,0.016,0.511,0.016c1.559,0,3.036-0.445,4.295-1.228c0.426-0.264,0.831-0.569,1.207-0.915 c0.117-0.108,0.219-0.205,0.318-0.306l77.323-77.52c3.186-3.195,3.18-8.369-0.015-11.555c-3.198-3.188-8.368-3.18-11.555,0.015 l-60.739,60.894l13.124-112.394l185.495,101.814c1.868,1.02,3.944,1.239,5.846,0.78c0.209-0.051,0.4-0.105,0.589-0.166 c1.878-0.609,3.526-1.877,4.574-3.697c0.053-0.094,0.1-0.179,0.146-0.264c0.212-0.404,0.382-0.8,0.517-1.202L511.521,43.608 C512.6,40.596,511.824,37.23,509.532,34.999z M27.232,234.712L432.364,77.371l-318.521,206.14L27.232,234.712z M162.72,316.936 c-0.764,0.613-1.429,1.374-1.949,2.267c-0.068,0.117-0.132,0.235-0.194,0.354c-0.496,0.959-0.784,1.972-0.879,2.986L148.365,419.6 l-25.107-122.718l275.105-178.042L162.72,316.936z M359.507,419.195l-177.284-97.307L485.928,66.574L359.507,419.195z"/> */}
                <path d="M504.233,6.244c-5.695-4.828-13.841-6.8-22.394-2.912L12.506,216.665c-16.337,7.426-16.764,30.477-0.713,38.502 l145.331,72.666l-7.767,163.239c-0.858,18.029,19.667,28.91,34.107,18.082l78.318-58.726l40.67,54.494 c10.136,13.582,31.299,10.491,37.128-5.422L511.358,30.573C515.039,20.522,511.111,11.419,504.233,6.244z M392.393,90.856 L233.58,249.669l-45.937,45.72L70.87,237.003L392.393,90.856z M194.13,447.828l3.938-82.764l38.194,51.172L194.13,447.828z M313.074,447.819l-92.868-124.435l43.527-43.527l174.484-173.664L313.074,447.819z"/>
            </g>
        </TransferFundWrapper>
    </SvgWrapper>
);

export const LoginBtnWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 10px;
`;