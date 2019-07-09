import React from 'react';
import styled  from 'styled-components';

export const ModalWrapper = styled.div.attrs({ className: 'trading-helper-modal-wrapper' })`
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    flex-direction: column;
    align-items: center;
    z-index: 100;
`;
export const Modal = styled.div.attrs({ className: 'trading-helper-modal' })`
    width: 328px;
    height: 197px;
    padding: 15px;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    border: 1px solid ${props => props.theme.palette.clrBorder};
    border-radius: 5px;
    background: ${props => props.theme.palette.clrMainWindow};
`;
export const Instruction = styled.div.attrs({ className: 'trading-helper-instruction' })`
    font-size: 14px;
    color: ${props => props.theme.palette.clrHighContrast};       //highlight contrast
    width: 100%;
    line-height: 1.5em;
`;
export const Slider = styled.div.attrs({ className: 'trading-helper-slider' })`
    height: 7.6px;
    width: 100%;
    margin-bottom: 15px;
    margin-top: auto;
    position: relative;
    display: flex;
    justify-content: center;
    svg {
        margin-right: 7.2px;
    }
    svg:last-child {
        margin-right: 0;
    }
`;

export const ControlWrapper = styled.div.attrs({ className: 'trading-helper-control' })`
    width: 100%;
    height: 28px;
    display: flex;
    text-align: center;
    span {
        display: inline-block;
        vertical-align: middle;
        font-weight: 500;
        color: ${props => props.theme.palette.clrHighContrast};   // highlight color
    }
`;
export const SkipButton = styled.div.attrs({ className: 'trading-helper-skip-button' })`
    width: 50px;
    border-radius: 5px;
    background-color: ${props => props.theme.palette.btnNegativeBg};  //negative-color
    cursor: pointer;
    &:hover {
        background-color: ${props => props.theme.palette.btnNegativeHoverBg};
    }
    &:active {
        color: ${props => props.theme.palette.btnNegativeActiveText};
    }
`;
export const PrevButton = styled.div.attrs({ className: 'trading-helper-back-button' })`
    width: 72px;
    border-radius: 5px;
    background-color: ${props => props.theme.palette.clrBlue};  //primary-color
    margin-right: 8px;
    margin-left: auto;
    position: relative;
    cursor: pointer;
    span {
        margin-left: 8px;
    }
    &:hover {
        background-color: ${props => props.theme.palette.clrDarkBlue};
    }
    &:active {
        color: ${props => props.theme.palette.clrLightBlue};
    }
`;

export const NextButton = styled.div.attrs({ className: 'trading-helper-next-button' })`
    width: 72px;
    border-radius: 5px;
    background-color: ${props => props.theme.palette.clrBlue};  //primary-color
    cursor: pointer;
    span {
        margin-right: 8px;
    }
    &:hover {
        background-color: ${props => props.theme.palette.clrDarkBlue};
    }
    &:active {
        color: ${props => props.theme.palette.clrLightBlue};
    }   
`;
const ArrowSvg = styled.svg`
    width: 13px;
    height: 7px;
    fill: ${props => props.theme.palette.clrHighContrast};
`;
export const PrevIcon = props => (
    <ArrowSvg
        viewBox="0 0 11.112 7.1438"
        role="img"
        aria-hidden="true"
        {...props}
    >
        <g transform="translate(0 -289.86)">
            <path d="m1.9545 293.43h9.158" stroke="#fff" strokeMiterlimit="10" strokeWidth="1.8979"/>
            <path d="m5.3594 297-2.9002-3.5724 2.9002-3.5714h-2.4609l-2.8985 3.5714 2.8985 3.5724z"/>
        </g>
    </ArrowSvg>
);
export const NextIcon = props => (
    <ArrowSvg
        viewBox="0 0 11.112 7.1438"
        role="img"
        aria-hidden="true"
        {...props}
    >
        <g transform="translate(0 -289.86)">
            <path d="m0 293.43h9.1581" stroke="#fff" strokeMiterlimit="10" strokeWidth="1.8979"/>
            <path d="m5.7531 297 2.9003-3.5724-2.9003-3.5714h2.4609l2.8985 3.5714-2.8985 3.5724z"/>
        </g>
    </ArrowSvg>
);
const IndicatorSvg = styled.svg`
    width: 8.7px;
    height: 8.7px;
`;
export const Indicator = props => (
    <IndicatorSvg viewBox="0 0 2.6458 2.6458">
        <g transform="translate(0 -294.35)">
            <path d="m2.4954 295.68c0 0.64755-0.52469 1.1725-1.1725 1.1725-0.64754 0-1.1725-0.52498-1.1725-1.1725 0-0.64754 0.52499-1.1725 1.1725-1.1725 0.64784 0 1.1725 0.52499 1.1725 1.1725z" fill="none" stroke="#454c73" strokeMiterlimit="10" strokeWidth=".30077"/>
        </g>
    </IndicatorSvg>
);
export const IndicatorSelected = props => (
    <IndicatorSvg viewBox="0 0 2.6458 2.6458">
        <g transform="translate(0 -294.35)">
            <path d="m2.4946 295.68c0 0.6471-0.52433 1.1717-1.1717 1.1717-0.6471 0-1.1717-0.52463-1.1717-1.1717 0-0.64709 0.52463-1.1717 1.1717-1.1717 0.6474 0 1.1717 0.52463 1.1717 1.1717" fill="#454c73"/>
            <path d="m2.4946 295.68c0 0.6471-0.52433 1.1717-1.1717 1.1717-0.6471 0-1.1717-0.52463-1.1717-1.1717 0-0.64709 0.52463-1.1717 1.1717-1.1717 0.6474 0 1.1717 0.52463 1.1717 1.1717z" fill="none" stroke="#454c73" strokeMiterlimit="10" strokeWidth=".30238"/>
        </g>
    </IndicatorSvg>
);

export const StatusModal = styled.div.attrs({ className: 'trading-helper-status-modal' })`
    width: 714px;
    height: 98px;
    padding: 10px;
    border: 1px solid ${props => props.theme.palette.clrBorder};
    border-radius: 5px;
    background: ${props => props.theme.palette.clrMainWindow};
    flex-shrink: 0;
    margin-bottom: -134px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
export const StatusSection = styled.div.attrs({ className: 'trading-helper-status-section' })`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 142px;
    border-radius: 5px;
    height: 100%;
    font-size: 12px;
    color: ${props => props.theme.palette.clrPurple};
    span {
        margin-bottom: 4px;
    }
    .status-button {
        span {
            margin-bottom: 0px;
        }
        flex-grow: 1;
        width: 100%;
        font-size: 20px;
        font-weight: 500;
        border: 1px solid ${props => props.theme.palette.clrBorder};
        border-radius: 5px;
        display: flex;
        justify-content: space-between;
        padding-top: 5px;
        padding-bottom: 3px;
        align-items: center;
        flex-direction: column;
        cursor: pointer;
        .amount-control {
            display: flex;
            justify-content: space-between;
            padding: 0 27px;
            width: 100%;
        }
        .space-between {
            padding-left: 7px;
            padding-right: 20px;
            display: flex;
            justify-content: space-between;
            width: 100%;
        }
    }
    &.percentage-section {
        width: 114px;
        .status-button {
            margin: 0;
            border: 0;
            color: white;
            font-size: 16px;
            display: flex;
            justify-content: space-between;
            padding-top: 0;
            padding-bottom: 0;
            flex-direction: row;
            cursor: pointer;
        }
    }
    &.percentage-section.increased .status-button{
        background: ${props => props.theme.palette.btnPositiveBg};
        padding-left: 10px;
        padding-right: 15px;
        cursor: pointer;
    }
    &.percentage-section.decreased .status-button{
        background: ${props => props.theme.palette.btnNegativeBg};
        padding-left: 15px;
        padding-right: 10px;
        cursor: pointer;
    }
`;

const PercentageSvg = styled.svg`
    width: 18.7px;
    height: 18.7px;
    fill: ${props => props.theme.palette.clrHighContrast};
`;
export const DecreasedIcon = props => (
    <PercentageSvg viewBox="0 0 6.6146 6.6146" {...props}>
        <defs>
            <clipPath id="clipPath2902">
                <path d="m0 1080h1920v-1080h-1920z"/>
            </clipPath>
        </defs>
        <g transform="translate(0 -290.39)">
            <g transform="matrix(.35211 0 0 -.35278 -317.2 359.05)">
                <g clipPath="url(#clipPath2902)">
                    <g transform="translate(918.53 175.89)">
                        <path d="m0 0h-16.666c-0.55 0-1 0.45-1 1v3c0 0.55 0.45 1 1 1h16.666c0.551 0 1-0.45 1-1v-3c0-0.55-0.449-1-1-1"/>
                    </g>
                    <g transform="translate(919.65 193.68)">
                        <path d="m0 0v-16.667c0-0.55-0.45-1-1-1h-3c-0.55 0-1 0.45-1 1v16.667c0 0.55 0.45 1 1 1h3c0.55 0 1-0.45 1-1"/>
                    </g>
                    <g transform="translate(904.69 194.38)">
                        <path d="m0 0 11.785-11.785c0.389-0.389 0.389-1.025 0-1.414l-2.121-2.121c-0.39-0.389-1.025-0.389-1.415 0l-11.785 11.785c-0.389 0.389-0.389 1.025 0 1.414l2.122 2.121c0.389 0.389 1.025 0.389 1.414 0"/>
                    </g>
                </g>
            </g>
        </g>
    </PercentageSvg>
);
export const IncreasedIcon = props => (
    <PercentageSvg viewBox="0 0 6.6146 6.6146" {...props}>
        <defs>
            <clipPath id="clipPath2776">
                <path d="m0 1080h1920v-1080h-1920z"/>
            </clipPath>
        </defs>
        <g transform="translate(0 -290.39)">
            <g transform="matrix(.35211 0 0 -.35211 -542.06 358.58)">
                <g clipPath="url(#clipPath2776)">
                    <g transform="translate(1557.1 193.68)">
                        <path d="m0 0h-16.667c-0.55 0-1-0.45-1-1v-3c0-0.55 0.45-1 1-1h16.667c0.55 0 1 0.45 1 1v3c0 0.55-0.45 1-1 1"/>
                    </g>
                    <g transform="translate(1558.2 175.89)">
                        <path d="m0 0v16.667c0 0.55-0.45 1-1 1h-3c-0.55 0-1-0.45-1-1v-16.667c0-0.55 0.45-1 1-1h3c0.55 0 1 0.45 1 1"/>
                    </g>
                    <g transform="translate(1543.3 175.18)">
                        <path d="m0 0 11.785 11.785c0.389 0.389 0.389 1.026 0 1.415l-2.121 2.121c-0.389 0.389-1.025 0.389-1.414 0l-11.785-11.785c-0.39-0.389-0.39-1.026 0-1.414l2.121-2.122c0.389-0.389 1.025-0.389 1.414 0"/>
                    </g>
                </g>
            </g>
        </g>
    </PercentageSvg>
);

const SmallSvg = styled.svg`
    width: 12px;
    height: 12px;
    fill: ${props => props.theme.palette.clrPurple};
`;
export const PluseIcon = props => (
    <SmallSvg viewBox="0 0 5.2917 5.2917" {...props}>
        <g fill="#7f8bc2" stroke="#7f8bc2" strokeWidth=".29621">
            <rect x=".14811" y="2.3177" width="4.9955" height=".68275"/>
            <rect x=".14811" y="2.3177" width="4.9955" height=".68275"/>
            <rect transform="rotate(90)" x=".14811" y="-2.9864" width="4.9955" height=".68275"/>
        </g>
    </SmallSvg>
);
export const MinusIcon = props => (
    <SmallSvg viewBox="0 0 5.2917 5.2917" {...props}>
        <g fill="#7f8bc2" stroke="#7f8bc2" strokeWidth=".29621">
            <rect x="1.5058" y="2.4081" width="2.2915" height=".88843" fill="#7f8bc2" stroke="#7f8bc2" strokeWidth=".30511"/>
        </g>
    </SmallSvg>
);