import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components/macro';

import checkboxImg from './checkbox.png';
import checkboxCheckedImg from './checkbox_checked.png';
import transactionImg from './transactions.png';
import transactionActiveImg from './transactions_active.png';
import tradingImg from './trading.png';
import tradingActiveImg from './trading_active.png';
import balanceImg from './balance.png';
import balanceActiveImg from './balance_active.png';
import apiImg from './api.png';
import apiActiveImg from './api_active.png';
import apiSyncedImg from './api_synced.png';
import apiSyncedActiveImg from './api_synced_active.png';

const Svg = styled.svg`
`;

const SmallSvg = styled.svg`
    width: 16px;
    height: 16px;
`;

const MiddleSvg = styled.svg`
    width: 32px;
    height: 32px;
`;

export const CrossIconSvgWrapper = styled.svg`
    margin: 0 10px 0 0;
    width: 10px;
    height: 10px;

    &, & * {
        fill: ${props => props.theme.palette.clrPurple};
    }

    &:hover {
        &, & * {
            fill: ${props => props.theme.palette.clrHighContrast};
        }
    }
`;

const SendIconSvgWrapper = styled.svg`
    width: 23px;
    height: 38px;

    &, & * {
        fill: ${props => props.theme.palette.clrHighContrast};
    }
`;

export const CrossIcon = props => (
    <CrossIconSvgWrapper {...props}>
        <polygon points="9.38 0.8 8.59 0 4.69 3.89 0.8 0 0 0.8 3.89 4.69 0 8.59 0.8 9.38 4.69 5.49 8.59 9.38 9.38 8.59 5.49 4.69 9.38 0.8"/>
    </CrossIconSvgWrapper>
);

export const SendIcon = props => (
    <SendIconSvgWrapper {...props}>
        <path d="M23,19.4,4.4,38A2.49,2.49,0,0,1,.78,38a2.49,2.49,0,0,1,0-3.62l15-15-15-15A2.49,2.49,0,0,1,.78.78,2.49,2.49,0,0,1,4.4.78Z"/>
    </SendIconSvgWrapper>
);
export const CopyIcon = (props) => (
    <MiddleSvg {...props} viewBox="0 0 25.93 30.03">
        <path d="M19.1,0H2.73A2.74,2.74,0,0,0,0,2.73V21.84H2.73V2.73H19.1Zm4.1,5.46h-15A2.74,2.74,0,0,0,5.46,8.19v19.1A2.75,2.75,0,0,0,8.19,30h15a2.75,2.75,0,0,0,2.73-2.74V8.19A2.74,2.74,0,0,0,23.2,5.46Zm0,21.83h-15V8.19h15Z" />
    </MiddleSvg>
);

export const PrintIcon = (props) => (
    <MiddleSvg {...props} viewBox="0 0 38.35 34.51">
        <path d="M32.6,9.59H5.75A5.64,5.64,0,0,0,0,15.33V26.84H7.67v7.67h23V26.84h7.67V15.33A5.64,5.64,0,0,0,32.6,9.59ZM26.84,30.68H11.51V21.09H26.84ZM32.6,17.25a1.81,1.81,0,0,1-1.92-1.92,1.92,1.92,0,0,1,3.83,0,1.81,1.81,0,0,1-1.91,1.92ZM30.68,0h-23V7.67h23Z" />
    </MiddleSvg>
);

export const CreditIcon = (props) => (
    <MiddleSvg {...props} viewBox="0 0 33.9 35.65">
        <path d="M33,16.71,17.2.93a3.19,3.19,0,0,0-4.5,0L4.06,9.57a3.24,3.24,0,0,0,0,4.54l1.43,1.47H8.8L5.71,12.46a.93.93,0,0,1-.25-.62.91.91,0,0,1,.25-.61l1.14-1.11,5.42,5.46h5.21l-8-8.06,4.9-4.92a.88.88,0,0,1,.6-.25.86.86,0,0,1,.6.24L31.33,18.36a.86.86,0,0,1,.24.6.88.88,0,0,1-.27.6l-.89.87v3.31L33,21.21a3.19,3.19,0,0,0,0-4.5Z" />
        <path d="M25.57,17.06H3.26A3.24,3.24,0,0,0,0,20.23v8.45H28.72V20.23a3.15,3.15,0,0,0-3.15-3.17ZM7.8,25.8a2.33,2.33,0,0,1-1.61-.64,2.31,2.31,0,0,1-3.91-1.67,2.31,2.31,0,0,1,3.91-1.67,2.34,2.34,0,0,1,1.61-.65,2.32,2.32,0,0,1,0,4.63Z" />
        <path d="M0,32.45a3.26,3.26,0,0,0,3.26,3.2H25.57a3.17,3.17,0,0,0,3.15-3.2v-.18H0Z" />
    </MiddleSvg>
);

const BackIconWrapper = styled.svg`
    width: 27px;
    height: 27px;
    fill: ${props => props.theme.palette.clrHighContrast};

    &:hover {
        fill: ${props => props.theme.palette.clrBorderHover};
    }

    &:active {
        fill: ${props => props.theme.palette.clrPurple};
    }
`;
const ClockIconWrapper = styled.svg`
    width: 40px;
    height: 40px;
    fill: ${props => props.theme.palette.clrHighContrast};

    &:hover {
        fill: ${props => props.theme.palette.clrBorderHover};
    }

    &:active {
        fill: ${props => props.theme.palette.clrPurple};
    }
`;

export const BackIcon = props => (
    <BackIconWrapper
        viewBox="0 0 41.756 41.756"
        role="img"
        aria-hidden="true"
        {...props}
    >
        <path d="M27.948,20.878L40.291,8.536c1.953-1.953,1.953-5.119,0-7.071c-1.951-1.952-5.119-1.952-7.07,0L20.878,13.809L8.535,1.465 c-1.951-1.952-5.119-1.952-7.07,0c-1.953,1.953-1.953,5.119,0,7.071l12.342,12.342L1.465,33.22c-1.953,1.953-1.953,5.119,0,7.071 C2.44,41.268,3.721,41.755,5,41.755c1.278,0,2.56-0.487,3.535-1.464l12.343-12.342l12.343,12.343 c0.976,0.977,2.256,1.464,3.535,1.464s2.56-0.487,3.535-1.464c1.953-1.953,1.953-5.119,0-7.071L27.948,20.878z"/>
    </BackIconWrapper>
);

export const ClockIcon = props => (
    <ClockIconWrapper
        viewBox="0 0 27.31 27.29"
        role="img"
        aria-hidden="true"
        {...props}
    >
        <g>
            <path d="M26.4,27.29H.91a1.35,1.35,0,0,1-.91-.9V10l.1-.24a1.75,1.75,0,0,1,1-1.08L22.43.12,22.76,0V9.09h.32c.67,0,1.35,0,2,0A2.14,2.14,0,0,1,27.24,11a23.91,23.91,0,0,1,0,2.68H20.41a4.55,4.55,0,0,0,.13,9.1h6.77c0,1.07,0,2.1,0,3.13A1.28,1.28,0,0,1,26.4,27.29ZM20.47,3.36,6.26,9l0,0H20.47Z"/>
            <path d="M27.3,15.94v4.5l-.16,0H20.45a2.26,2.26,0,0,1-.16-4.52c2.31,0,4.62,0,6.93,0Z"/>
        </g>
    </ClockIconWrapper>
);

export const CancelIcon = (props) => (
    <SmallSvg {...props} viewBox="0 0 100 100">
        <path d="M50,5.77A44.23,44.23,0,1,0,94.23,50,44.23,44.23,0,0,0,50,5.77Zm0,77.41A33.13,33.13,0,0,1,23,30.8L69.2,77A33,33,0,0,1,50,83.18Zm27-14L30.8,23A33.13,33.13,0,0,1,77,69.2Z"/>
    </SmallSvg>
);

export const LanguageIcon = (props) => (
    <Svg {...props} x="0px" y="0px" viewBox="0 0 100 75.446">
        <path d="M19.198,44.002v-8.201h-8.575c-3.319,0-6.021-2.874-6.021-6.406V10.903c0-3.533,2.701-6.408,6.021-6.408h38.345   c3.319,0,6.019,2.875,6.019,6.408v18.492c0,3.532-2.7,6.406-6.019,6.406v4.496c5.797,0,10.514-4.891,10.514-10.902V10.903   C59.482,4.892,54.766,0,48.968,0H10.623C4.824,0,0.107,4.892,0.107,10.903v18.492c0,6.011,4.717,10.902,10.516,10.902h4.08v7.968   c0,1.223,0.789,2.332,1.963,2.764c0.334,0.123,0.677,0.184,1.014,0.184c0.821,0,1.609-0.354,2.165-1.01l8.369-9.905h8.353v-4.496   H26.128L19.198,44.002z" />
        <path d="M89.377,24.233h-25.96v4.496h25.96c3.319,0,6.021,2.875,6.021,6.408v18.489c0,3.533-2.701,6.408-6.021,6.408h-8.574v8.205   l-6.931-8.203H51.031c-3.318,0-6.019-2.875-6.019-6.408V35.137c0-3.533,2.701-6.408,6.019-6.408v-4.496   c-5.797,0-10.515,4.892-10.515,10.903v18.491c0,6.014,4.717,10.904,10.515,10.904h20.754l8.372,9.91   c0.555,0.652,1.342,1.004,2.161,1.004c0.337,0,0.68-0.059,1.014-0.182c1.176-0.432,1.967-1.543,1.967-2.768V64.53h4.078   c5.799,0,10.516-4.891,10.516-10.904V35.137C99.893,29.125,95.176,24.233,89.377,24.233z" />
        <path d="M26.532,7.437l-7.952,20.951h4.665l1.644-4.665h7.834l1.584,4.665h4.782L31.255,7.437H26.532z M26.093,20.29l2.729-7.688   h0.058l2.641,7.688H26.093z" />
        <path d="M60.12,49.114c0,2.297,1.468,3.787,3.862,3.787c2.876-0.061,5.721-1.887,6.647-2.711c0.926-0.826,3.42-3.693,4.521-5.963   c1.393,0.658,2.053,1.76,2.053,2.98c0,2.639-2.542,4.17-6.599,4.635l1.968,2.725c6.354-0.832,8.516-3.5,8.516-7.408   c0-3.301-2.077-5.305-4.74-6.183c0.049-0.242,0.138-0.495,0.188-0.74l-3.611-0.643c-0.024,0.365-0.097,0.432-0.168,0.798   c-1.297-0.074-2.738,0.121-3.202,0.219c0-0.66,0.024-2.421,0.049-3.055c3.006-0.122,5.962-0.365,8.699-0.781l-0.318-3.566   c-2.81,0.562-5.523,0.856-8.186,1.003c0.072-0.71,0.172-2.717,0.172-2.717l-3.813-0.291c-0.05,0.978-0.072,2.127-0.121,3.128   c-1.688,0.024-3.689,0.024-4.742,0l0.171,3.446h0.414c1.003,0,2.641-0.051,4.109-0.099c0,0.952,0.023,3.005,0.048,3.934   C62.589,43.051,60.12,45.717,60.12,49.114z M71.606,43.59c-0.514,1.025-1.124,1.957-1.808,2.736   c-0.1-0.807-0.148-1.637-0.196-2.516C69.87,43.762,70.945,43.59,71.606,43.59z M66.229,45.008c0.123,1.369,0.27,2.688,0.489,3.885   c-0.634,0.318-1.244,0.514-1.809,0.539c-1.223,0.049-1.223-0.732-1.223-1.076C63.687,47.059,64.689,45.864,66.229,45.008z" />
    </Svg>
);

const ScanSvg = styled.svg`
    width: 40px;
    height: 40px;
    fill: ${props => props.theme.palette.clrHighContrast};
    margin-left: auto;
    cursor: pointer;
`;

export const ScanIcon = (props) => (
    <ScanSvg {...props} viewBox="0 0 36.79 36.72">
        <path d="M0,30.3H13.77V16.53H0Zm2.75-11H11v8.24H2.75Z"/>
        <rect x="5.51" y="22.04" width="2.75" height="2.75"/>
        <path d="M0,13.77H13.77V0H0Zm2.75-11H11V11H2.75Z"/>
        <rect x="5.51" y="5.51" width="2.75" height="2.75"/>
        <path d="M16.53,0V13.77H30.3V0Zm11,11H19.28V2.75h8.27Z"/>
        <rect x="22.04" y="5.51" width="2.75" height="2.75"/>
        <path d="M36.23,33.45l-3.91-3.91a8.53,8.53,0,1,0-2.7,2.71l3.9,3.9a1.91,1.91,0,1,0,2.71-2.7Zm-6.74-4a6.24,6.24,0,1,1,0-8.82,6.23,6.23,0,0,1,0,8.82Z"/>
    </ScanSvg>
);

const AnimationWrapper = styled.div`
    // @keyframes push{
    //     50%  {transform: scale(0.5);}
    // }
    // :active {
    //     animation: push 0.2s linear 1;
    //     animation-delay: 0s;
    // }
`;

const ImageWrapper = styled.div`
    position: relative;
    width: ${props => props.size || 35}px;
    height: ${props => props.size || 35}px;
    margin-left: ${props => props.marginLeft || 0}px;
    margin-right: ${props => props.marginRight || 0}px;
    margin-top: ${props => props.marginRight || 0}px;
    cursor: pointer;

    img {
        width: 100%;
    }

    .label {
        position: absolute;
        top: 100%;
        left: 50%;
        display: ${props => props.active ? 'block' : 'none'};
        font-size: 13px !important;
        font-weight: normal !important;
        color: ${props => props.theme.palette.clrHighContrast};
        transform: translateX(-50%);
        white-space: nowrap;
    }

    .active {
        display: none;
    }

    &:hover {
        cursor: pointer;
        transition-duration: 0.3s;
        transform: scale(1.2);
    }

    ${props => props.active ? `
        .active {
            display: block;
        }

        .inactive {
            display: none;
        }
    ` : ''};
`;

export const Checkbox = (props) => (
    <AnimationWrapper id={props.name}>
        <ImageWrapper {...props}>
            <img src={checkboxImg} className="inactive" alt="" />
            <img src={checkboxCheckedImg} className="active" alt="" />
        </ImageWrapper>
    </AnimationWrapper>
);

export const TransactionIcon = (props) => (
    <AnimationWrapper id="transaction">
        <ImageWrapper {...props} id="reports">
            <img src={transactionImg} className="inactive" alt="" />
            <img src={transactionActiveImg} className="active" alt="" />
            <div className="label">
                <FormattedMessage
                    id="pay_app.pay_window.label_transactions"
                    defaultMessage="Transactions"
                />
            </div>
        </ImageWrapper>
    </AnimationWrapper>
);

export const TradingIcon = (props) => (
    <AnimationWrapper id="trading">
        <ImageWrapper {...props}>
            <img src={tradingImg} className="inactive" alt="" />
            <img src={tradingActiveImg} className="active" alt="" />
            <div className="label">
                <FormattedMessage
                    id="pay_app.pay_window.label_trading"
                    defaultMessage="Trading"
                />
            </div>
        </ImageWrapper>
    </AnimationWrapper>
);

export const BalanceIcon = (props) => (
    <AnimationWrapper id="balance">
        <ImageWrapper {...props}>
            <img src={balanceImg} className="inactive" alt="" />
            <img src={balanceActiveImg} className="active" alt="" />
            <div className="label">
                <FormattedMessage
                    id="pay_app.pay_window.label_balance"
                    defaultMessage="Balance"
                />
            </div>
        </ImageWrapper>
    </AnimationWrapper>
);

export const ApiIcon = (props) => (
    <AnimationWrapper id="api">
        <ImageWrapper {...props}>
            <img src={props.isApiSynced === true ? apiSyncedImg : apiImg} className="inactive" alt="" />
            <img src={props.isApiSynced === true ? apiSyncedActiveImg : apiActiveImg} className="active" alt="" />
        </ImageWrapper>
    </AnimationWrapper>
);

const InfoSvg = styled.svg`
    width: ${props => props.size ? props.size : 16}px;
    height: ${props => props.size ? props.size : 16}px;
    margin-left: ${props => props.marginLeft || 0}px;
    margin-top: 7px;
    fill: ${props => props.theme.palette.clrPurple};

    &:hover {
        fill: ${props => props.theme.palette.clrHighContrast};
    }

    .cls-2 {
        font-size: 13px;
        fill: ${props => props.theme.palette.clrMainWindow};
    }
`;

export const InfoIcon = (props) => (
    <InfoSvg {...props} viewBox="0 0 16.21 16.77">
        <path
            d="M16.21,8.11a8.37,8.37,0,0,1-.15,1.58,8.88,8.88,0,0,1-.46,1.52,9,9,0,0,1-.75,1.4,9.18,9.18,0,0,1-1,1.23,9.18,9.18,0,0,1-1.23,1,9,9,0,0,1-1.4.75,8.88,8.88,0,0,1-1.52.46,8.37,8.37,0,0,1-1.58.15,8.48,8.48,0,0,1-1.59-.15A9.16,9.16,0,0,1,5,15.6a9.42,9.42,0,0,1-1.4-.75,9.18,9.18,0,0,1-1.23-1,8.4,8.4,0,0,1-1-1.23,7.54,7.54,0,0,1-.75-1.4A7.4,7.4,0,0,1,.16,9.69,7.63,7.63,0,0,1,0,8.11,7.73,7.73,0,0,1,.16,6.52,7.59,7.59,0,0,1,.62,5a7.88,7.88,0,0,1,.75-1.4,8.4,8.4,0,0,1,1-1.23,8.4,8.4,0,0,1,1.23-1A7.88,7.88,0,0,1,5,.62,7.59,7.59,0,0,1,6.52.16,7.73,7.73,0,0,1,8.11,0,7.63,7.63,0,0,1,9.69.16a7.4,7.4,0,0,1,1.52.46,7.54,7.54,0,0,1,1.4.75,8.4,8.4,0,0,1,1.23,1,9.18,9.18,0,0,1,1,1.23A9.42,9.42,0,0,1,15.6,5a9.16,9.16,0,0,1,.46,1.52A8.48,8.48,0,0,1,16.21,8.11Z"
            transform="translate(0 0)"
        />
        <text className="cls-2" transform="translate(6.51 13.06)">i</text>
    </InfoSvg>
);
