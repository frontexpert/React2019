import React from 'react';
import styled from 'styled-components';
import QRCode from 'qrcode.react';

export const BillWrapper = styled.div`
    position: relative;
    width: ${props => props.width || 3192}px;
    height: ${props => props.height || 1800}px;
    margin-left: ${props => props.isV2 ? 0 : 10}px;
    margin-top: ${props => props.isV2 ? 10 : 0}px;
    text-align: left;
    // overflow: hidden;
    cursor: pointer;
    // cursor: ${props => (props.disabled || !props.hoverable) ? 'initial' : 'pointer'};

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
            background-color: rgba(255, 255, 255, ${props.isOpened ? 0.3 : 0.8});
        }
    ` : ''};
`;

// Because at the moment we don't have all the unique bills for all 16 levels - show first and last bill for
// previous and next levels, center bills around decimal point
export const convertLevel = (level) => {
    if (level >= 3 && level <= 12) {
        return level - 3;
    }
    return 3;
};

export const ChipWrapper = styled.div.attrs({ className: 'chip-wrapper' })`
    position: relative;
    width: 3192px;
    height: 1800px;
    background-image: url('./img/bills/bills_all.jpg');
    background-position: 0 -${props => (props.isDeposit ? 10 : convertLevel(props.level)) * 1800}px;
    background-repeat: no-repeat;
    transform: scale(${props => props.height / 1800});
    transform-origin: left top;
`;

export const PriceSection = styled.div`
    position: absolute;
    left: 30px;
    bottom: 150px;
    z-index: 100;
    display: flex;
    font-family: 'Ubuntu';
    font-size: 50px;
    font-weight: 500;
    line-height: 0.8;
    color: ${props => props.black ? props.theme.palette.clrBackground : props.theme.palette.clrHighContrast};
`;

export const PriceValue = styled.div`
    margin-right: 10px;
    font-size: 400px;

    ${props => props.fontStyle === 'stroke' ? `
        -webkit-text-stroke: 16px ${props.black ? props.theme.palette.clrBackground : props.theme.palette.clrHighContrast};
        color: transparent;
    ` : ''};
`;

export const PriceInfo = styled.div`
    padding-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
    .symbol {
        display: flex;
        font-size: 160px;
        justify-content: center;
        color: ${props => props.black ? props.theme.palette.clrBackground : props.theme.palette.clrHighContrast} !important;
    }

    .address {
        font-size: 16px;
        font-weight: 400;
        line-height 1;
        word-break: break-all;
    }
    
    .unit {
        display: flex;
        justify-content: flex-end;
        font-size: 200px
        ${props => props.length ? 'letter-spacing: 26px' : ''};
    }
    
    ${props => props.fontStyle === 'stroke' ? `
        -webkit-text-stroke: 16px ${props.black ? props.theme.palette.clrBackground : props.theme.palette.clrHighContrast};
        color: transparent;
    ` : ''};
`;

export const SignSection = styled.div`
    position: absolute;
    bottom: 50px;
    right: 850px;
    z-index: 100;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
    font-family: 'Ubuntu';
    font-size: 86px;
    font-weight: 400;
    line-height: 0.7;
    color: ${props => props.black ? props.theme.palette.clrBackground : props.theme.palette.clrHighContrast};

    img {
        width: 750px;
        margin-bottom: ${props => (props.isDeposit || (props.level === 7) || (props.level === 9)) ? -70 : 20}px;
    }
`;

export const WaterMark = styled.div`
    position: absolute;
    top: 0;
    right: 804px;
    bottom: 0;
    z-index: 50;
    width: 817px;
    overflow: hidden;
`;

export const CoinIconWrapper = styled.div`
    position: absolute;
    right: -165px;
    width: 982px;
    height: 982px;

    &:first-child {
        top: -165px;
    }

    &:last-child {
        bottom: -165px;
    }

    &:after {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background: ${props => props.color || 'transparent'};
        border-radius: 50%;
        opacity: 0.3;
    }

    .coin-icon {
        width: 100%;
        height: 100%;
        background-size: cover !important;
        opacity: 0.2 !important;
        filter: grayscale(100%);
    }
`;

export const QRLabelLeft = styled.div`
    position: absolute;
    top: 100%;
    width: 700px;
    font-size: 60px;
    line-height: 1;
    overflow-wrap: break-word;
`;

export const QRLabelRight = styled.div`
    position: absolute;
    bottom: 100%;
    width: 185px;
    height: auto;
    font-size: 16px;
    overflow-wrap: break-word;
`;

export const PriceLabel = styled.div`
    position: absolute;
    left: 45px;
    bottom: calc(100% - 15px);
    width: 1400px;
    height: auto;
    font-size: 70px;
    line-height: 1.1;
    overflow-wrap: break-word;
    
    p {
        margin: 0;
    }
`;

export const QRWrapperLeft = styled.div`
    position: absolute;
    left: 75px;
    top: 75px;
    z-index: 150;
    width: 700px;
    height: 700px;

    & svg {
        ${props => props.disabled ? 'filter: blur(20px)' : ''};
    }
`;

export const QRCodeLabel = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    font-size: 60px;
    text-align: center;
    transform: rotate(-90deg);
    transform-origin: left bottom;
`;

export const QRWrapperRight = styled.div`
    position: absolute;
    right: 75px;
    bottom: 75px;
    z-index: 150;
    width: 600px;
    height: 600px;

    // blur private key
    filter: blur(20px);
`;

export const Code = styled(QRCode)`
    pointer-events: none !important;
    ${props => props.isdisabled2 ? 'filter: blur(15px)' : ''};
    
    & path:nth-child(1) {
        /* background */
        fill: ${props => props.theme.palette.clrBorder};
        display: none;
    }

    & path:nth-child(2) {
        /* foreground */
        fill: ${props => props.color || props.theme.palette.clrBackground};
    }
`;

export const DetailsWrapper = styled.div`
    position: absolute;
    left: calc(100% - 30px);
    top: 50px;
    z-index: 100;
    width: 1050px;
    height: 600px;
    display: flex;
    font-size: 40px;
    color: ${props => props.theme.palette.clrBackground};
    transform: rotate(90deg);
    transform-origin: left top;

    .coin-icon {
        width: 250px;
        height: 250px;
        margin-right: 20px;
        background-size: cover !important;
        filter: grayscale(100%);
    }
    
    .specimen-label {
        font-size: 80px;
        color: ${props => props.theme.palette.clrBackground};
        display: block;
        margin-top: 50px;
        text-transform: none;
    }
`;

export const Balance = styled.div`
    margin-top: 60px;
    font-size: 100px;
    font-weight: 500;
`;

export const PrivateAddress = styled.div`
    width: 70%;
    margin-top: 5px;
    line-height: 1.2;
    color: transparent;
    text-shadow: 0 0 20px ${props => props.theme.palette.clrBackground};
    word-break: break-all;
`;

export const PublicAddress = styled.div`
    width: 80%;
    margin-top: 15px;
    font-size: 70px;
    line-height: 1.1;
    word-break: break-all;
`;

export const Issue = styled.div`
    margin-top: 10px;
`;

export const PublicAddressWrapper = styled.div`
    max-width: 100%;
    flex: 1;
    display: flex;
    align-items: center;
    background: transparent;
    border: 1px solid ${props => props.theme.palette.clrBorder};
    border-radius: ${props => props.theme.palette.borderRadius};
`;

export const InputWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;

    svg {
        fill: ${props => props.color || props.theme.palette.clrBackground};
    }
`;

export const InputTextarea = styled.textarea`
    width: 100%;
    margin-left: 5px;
    border: none;
    font-size: 60px;
    resize: none;
    outline: none;
`;

export const InputAddon = styled.div`
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Svg = styled.svg`
    width: 50px;
    height: 50px;
`;

export const CopyIcon = (props) => (
    <Svg {...props} viewBox="0 0 25.93 30.03">
        <path d="M19.1,0H2.73A2.74,2.74,0,0,0,0,2.73V21.84H2.73V2.73H19.1Zm4.1,5.46h-15A2.74,2.74,0,0,0,5.46,8.19v19.1A2.75,2.75,0,0,0,8.19,30h15a2.75,2.75,0,0,0,2.73-2.74V8.19A2.74,2.74,0,0,0,23.2,5.46Zm0,21.83h-15V8.19h15Z" />
    </Svg>
);

export const CheckIcon = (props) => (
    <Svg {...props} viewBox="0 0 50 50" fill="green">
        <path d="M25,3C12.87,3,3,12.87,3,25s9.87,22,22,22s22-9.87,22-22S37.13,3,25,3z M35.83,16.56L24.32,33.53l-9-8.35 c-0.4-0.38-0.43-1.01-0.05-1.42c0.37-0.4,1.01-0.42,1.41-0.05l7.29,6.76l10.2-15.03c0.31-0.46,0.94-0.58,1.39-0.27 C36.02,15.48,36.14,16.1,35.83,16.56z"/>
    </Svg>
);

export const DepositLabel = styled.div`
    position: absolute;
    left: 62px;
    top: -120px;
    font-size: 103px;
    color: ${props => props.theme.palette.clrBackground};
    text-transform: uppercase;
`;
