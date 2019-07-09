import React from 'react';
import styled, { keyframes } from 'styled-components';
import QRCode from 'qrcode.react';

export const Wrapper = styled.div.attrs({ className: 'exch-deposit-wrapper' })`
    position: absolute;
    left: 65px;
    top: 0;
    right: 0;
    bottom: 0;
    margin: 0;
    padding: 5px 30px 5px 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    // background-color: ${props => props.theme.palette.clrBackground};
    color: ${props => props.theme.palette.depositText};
    pointer-events: none;

    .confirm-button {
        &:disabled {
            filter: drop-shadow(0px 0px 1px ${props => props.theme.palette.clrBorder}) !important;
        }
        
        .btn-text {
            font-size: 14px !important;
            font-weight: 600;
            text-transform: uppercase;
        }
    }
    
    .cancel-button {
        width: 48px;
        height: 32px;
        margin: 0 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: ${props => props.theme.palette.clrLightRed};
        border: 0;
        border-radius: ${props => props.theme.palette.borderRadius};
        cursor: pointer;
        
        .sprite-icon {
            width: 22px;
            height: 22px;
            fill: ${props => props.theme.palette.clrHighContrast};
        }
        
        &:focus {
            outline: none;
        }
    }
`;

export const InnerWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 50px;
    display: flex;
    pointer-events: all;
    
    &:not(:first-child) {
        margin-top: 15px;
    }
`;

export const InputAddon = styled.div`
    position: relative;
    min-width: ${props => props.width || 136}px;
    height: 100%;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.theme.palette.clrBorder};
    // border: none;
    border-left: 1px solid ${props => props.theme.palette.clrBorder};
    border-radius: 0 ${props => props.theme.palette.borderRadius} ${props => props.theme.palette.borderRadius} 0;
    font-size: 20px;
    font-weight: 600;
    color: ${props => props.theme.palette.clrHighContrast};
    text-transform: uppercase;
    cursor: pointer;

    svg {
        &, & * {
            fill: ${props => props.theme.palette.clrMouseClick};
        }
    }

    &:hover {
        // background-color: ${props => props.theme.palette.clrMouseClick};
        color: ${props => props.theme.palette.clrHighContrast};

        svg {
            &, & * {
                fill: ${props => props.theme.palette.clrHighContrast};
            }
        }
    }

    &:disabled {
      cursor: not-allowed;
    }
    
    .telegram-channel-avatar {
        margin: 0;
    }
    
    .exch-deposit {
        position: absolute;
        top: 100%;
        color: #005bab;
        font-size: 12px;
        font-weight: 900;
    }
`;

export const PortalWrapper = styled.div.attrs({ className: 'qr-portal-wrapper' })`
    position: relative;
    width: ${props => props.width || 136}px;
    height: ${props => props.height || 136}px;
    padding: 8px;
    background-color: ${props => props.theme.palette.clrPurple};
    border-radius: ${props => props.theme.palette.borderRadius};
    box-shadow: 0 3px 3px rgba(0, 0, 0, 0.35);
`;

const rotateOpenAnim = keyframes`
    0% { transform: scale(0) rotate(0deg); }
    100% { transform: scale(1) rotate(720deg); }
`;

const rotateCloseAnim = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(1440deg); }
`;

function fontAnim(props) {
    return keyframes`
        0% { font-size: 16px; }
        100% { font-size: ${props.maxFontSize}px; }
    `;
}

export const PortalInnerWrapper = styled.div`
    width: 100%;
    height: 100%;
    text-align: center;
    animation: ${rotateOpenAnim} 0.5s linear;
    transform-origin: center;
    
    &.close {
        animation: ${rotateCloseAnim} 0.5s linear;
        
        span {
            animation: ${fontAnim} 0.5s linear;
            animation-fill-mode: forwards;
        }
    }

    > img {
        height: 100%;
    }
    
    .coin-icon {
        position: relative;
        width: 100%;
        height: 100%;
        background-size: cover !important;
        
        // &::after {
        //     content: '';
        //     position: absolute;
        //     left: 0;
        //     top: 0;
        //     right: 0;
        //     bottom: 0;
        //     background-color: rgba(255, 255, 255, 0.8);
        //     border-radius: 50%;
        // }
    }
`;

export const CoinBlurOverlay = styled.div`
    position: absolute;
    left: 8px;
    top: 8px;
    right: 8px;
    bottom: 8px;
    border-radius: 50%;
    
    .coin-icon {
        filter: blur(3px);
    }
`;

export const Code = styled(QRCode)`
    pointer-events: none !important;

    & path:nth-child(1) {
        /* background */
        fill: ${props => props.theme.palette.clrBorder};
        display: none;
    }
    
    & path:nth-child(2) {
        /* foreground */
        fill: ${props => props.theme.palette.clrBackground};
    }
`;

const Svg = styled.svg`
    width: 30px;
    height: 30px;
`;

export const SendIcon = (props) => (
    <Svg viewBox="0 0 1026 1024" {...props}>
        <path d="M1014.187886 494.2848 26.7648 110.281143c-2.177829-0.8576-4.4288-1.285486-6.6432-1.285486-3.927771 0-7.749486 1.285486-11.000686 3.713829-5.070629 3.856457-7.786057 10.000457-7.213714 16.285257l32.285257 348.289829 3.143314 35.285943-3.465143 33.142857L1.9072 893.646629c-0.570514 6.359771 2.143086 12.501943 7.213714 16.287086 3.214629 2.428343 7.071086 3.713829 11.000686 3.713829 2.249143 0 4.500114-0.427886 6.6432-1.285486l987.423086-384.005486c6.999771-2.7136 11.642514-9.499429 11.642514-17.000229C1025.8304 503.786057 1021.187657 497.000229 1014.187886 494.2848zM107.157943 472.071314l-0.142629-1.536L82.944 210.603886l767.241143 298.397257L107.157943 472.071314zM106.622171 553.322057l0.285257-2.750171 743.098514-36.856686L82.837943 812.075886 106.622171 553.322057z" />
    </Svg>
);

export const WithdrawInfo = styled.div`
    position: absolute;
    left: 8px;
    top: 8px;
    right: 8px;
    bottom: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    span {
        font-size: 10px;
        font-weight: 600;
        color: ${props => props.theme.palette.clrRed};
        text-transform: uppercase;
    }
`;

function growAnim(props) {
    return keyframes`
        0% {
            width: 97px;
            height: 55px;
        }
        100% {
            width: ${(props.maxHeight || 838) * 1504 / 858}px;
            height: ${props.maxHeight || 838}px;
        }
    `;
}

export const ModalWrapper = styled.div`
    position: relative;
    width: 97px;
    height: 55px;
    
    &.close {
        animation: ${growAnim} 0.5s linear;
        animation-fill-mode: forwards;
    }
    
    > div {
        width: 100% !important;
        height: 100% !important;
        display: flex;
        align-items: center;
        justify-content: center;        
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

