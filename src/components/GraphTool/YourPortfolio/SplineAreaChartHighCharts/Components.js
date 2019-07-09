import React from 'react';
import styled, { keyframes } from 'styled-components';

const Svg = styled.svg`
    width: 30px;
    height: 30px;
    fill: ${props => props.theme.palette.clrPurple};
`;

export const GraphIcon = props => (
    <Svg
        role="img"
        aria-hidden="true"
        viewBox="0 0 346.258 346.258"
        {...props}
    >
        <g>
            <polygon points="49.455,301.231 49.455,0 4.411,0 4.411,346.258 341.847,346.258 341.847,301.231"/>
            <polygon points="154.729,155.021 222.294,201.737 325.595,84.203 291.783,54.473 214.931,141.892 145.602,94.016 69.229,190.469 104.544,218.395"/>
        </g>
    </Svg>
);

export const fadeOut = keyframes`
    0%   {transform: translate(0%, 0);}
    80%   {transform: translate(0%, 0);}
    100% {transform: translate(103%, 0);}
`;

export const LabelDemo = styled.img`
    position: absolute;
    bottom: 42px;
    left: 108px;
    z-index: 6;
    width: 104px;
    pointer-events: none;
`;

export const PortfolioContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    transform: translate(${props => props.isVisible ? '0' : '103%'}, 0);
    animation: ${props => (props.diableAnimation || props.isVisible) ? 'none' : fadeOut + '  2.5s linear'};
    display: ${props => props.switchMode ? '' : 'none'};

    .tooltipWrapper {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        text-align: center;
        font-size: 10px;
        color: #FFF;

        .x-tooltip {
            position: absolute;
            width: 80px;
            height: 28px;
            bottom: 0;
            left: -9999px;
            background-color: #7F88C2;
            border: solid 1px ${props => props.theme.palette.clrBorder};
            border-radius: 1px;
            line-height: 30px;
            letter-spacing: 2px;
            transform: translate(-40px, 0);
        }

        .x-grid-line {
            content: '';
            position: absolute;
            width: 2px;
            bottom: 27px;
            background-image: linear-gradient(to bottom, rgba(25, 29, 62, .2), rgba(25, 29, 62, 1));
        }

        .y-tooltip {
            position: absolute;
            width: 50px;
            height: 26px;
            left: 0;
            top: -9999px;
            background-color: #7F88C2;
            border: solid 1px ${props => props.theme.palette.clrBorder};
            border-radius: 1px;
            line-height: 26px;
            letter-spacing: 1px;
            transform: translate(0, -13px);
        }

        .y-grid-line {
            content: '';
            position: absolute;
            height: 2px;
            background-image: linear-gradient(to right, rgba(25, 29, 62, .2), rgba(25, 29, 62, 1));
        }
    }

    .portYourLabel {
        position: absolute;
        left: 15px;
        top: 10px;
        font-size: 18px;
        color: #fff;
        font-weight: 600;
        text-align: left;
    }
    
    .portfolioLabels {
        // pointer-events: none;
        position: absolute;
        bottom: 40px;
        left: 15px;
  
        .values {
             display: flex;
             justify-content: center;
             align-items: center;
             font-size: 21px;
             font-weight: 400;
            .label {
                text-align: left;
                color: ${props => props.theme.palette.clrPurple};
                margin-right: 10px;
                display: flex;
                justify-content: center;
                align-items: flex-end;
            }

            .totalPrice {
                display: flex;
                font-weight: 600;
                text-align: left;
            }
            
            .change24 {
                font-weight: 400;
                color: #f00;
                font-size: 16px;
                margin-left: 20px;
                margin-right: 20px; 
            }

            .dropdown-wrapper:nth-child(2) {
                height: 34px;
                color: white;
            }

            .back-testing {
                margin-left: 10px;
                text-align: left;
                display: flex;
                justify-content: center;
                align-items: center;
                color: ${props => props.theme.palette.clrPurple};

                .dropdown-wrapper {
                    margin-left: 5px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                span {
                    margin-right: 3px;
                    color: ${props => props.theme.palette.clrBlue};
                }
            }
        }
    }
    
    .lineForPortfolioChart {
        position: absolute;
        left: -9999px;
        pointer-events: none;
        z-index: 1;
    
        .circle {
            position: relative;
            width: 11px;
            height: 11px;
            transform: translateX(-50%) translateY(-50%);
            z-index: 1;
            
            &:before {
                content: " ";
                position: absolute;
                display: block;
                top: -6px;
                right: -6px;
                bottom: -6px;
                left: -6px;
                background: radial-gradient(circle closest-side,rgba(255,255,255,.6) 10%,rgba(255,255,255,.3) 40%,rgba(255,255,255,0) 90%);
                border-radius: 50%;
                z-index: 4;
            }
            
            &:after {
                content: " ";
                position: absolute;
                top: 0;
                left: 0;
                display: block;
                width: 100%;
                height: 100%;
                background: transparent;
                border: 2px solid ${props => props.theme.palette.portfolioTooltipBorderColor};
                border-radius: 50%;
                z-index: 3;
            }
        }
    
        .line {
            background: ${props => props.theme.palette.portfolioTooltipBorderColor};
            width: 2px;
            height: 1px;
            margin-top: -6px;
        }
    }
`;

export const ArbSwitcher = styled.div`
    position: absolute;
    bottom: 70px;
    right: 80px;
`;

export const BackGridItem = styled.div`
    border: 0.2px solid rgba(19, 40, 86, 0.4);
`;

export const ChartContainer = styled.div`
    position: absolute;
    height: 100%;
    width: ${props => props.width}px;
    
    .highcharts-container {
        position: inherit !important;
        border-top-left-radius: ${props => props.theme.palette.borderRadius};
        border: solid ${props => props.theme.palette.clrBorder};
        border-width: 1px 0 0 1px;
        
        svg defs clipPath rect {
            width: ${props => props.width}px;
        }
        .highcharts-plot-background {
            fill: ${props => props.theme.palette.clrMainWindow};
        }
        .highcharts-tooltip {
            display: none;
            text-align: center;
            line-height: 20px;
        }
    }
    
    .arrow_box.second:after {
        top: 50%;
    }

    .arrow_box.second:before {
        top: 50%;
    }

    .arrow_box:after {
        top: 75%;
        border: solid transparent;
        content: " ";
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
        border-color: rgba(136, 183, 213, 0);
        border-width: 7px;
        margin-top: -7px;
    }
    
    .arrow_box:before {
        top: 75%;
        border: solid transparent;
        content: " ";
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
        border-color: rgba(136, 183, 213, 0);
        border-width: 7px;
        margin-top: -7px;
        z-index: 2;
    }
    
    .arrow_box.right:before {
        left: calc(100% - 2px);
        border-left-color: ${props => props.theme.palette.portfolioTooltipBg};
    }
    
    .arrow_box.right:after {
        left: 100%;
        border-left-color: ${props => props.theme.palette.portfolioTooltipBorderColor};
    }
    
    .arrow_box.left:before {
        right: calc(100% - 2px);
        border-right-color: ${props => props.theme.palette.portfolioTooltipBg};
    }
    
    .arrow_box.left:after {
        right: 100%;
        border-right-color: ${props => props.theme.palette.portfolioTooltipBorderColor};
    }
    
    .arrow_box.bottom:before {
        bottom: 100%;
        border-top-color: ${props => props.theme.palette.portfolioTooltipBg};
        top: calc(100% + 5px);
        left: calc(50% - 6px);
    }
    
    .arrow_box.bottom:after {
        bottom: 100%;
        border-top-color: ${props => props.theme.palette.portfolioTooltipBorderColor};
        top: calc(100% + 7px);
        left: calc(50% - 6px);
    }
`;

export const LastChange = styled.div`
    display: flex;
    align-items: center;
    display: ${props => props.lastChange === 0 ? 'none' : 'flex'};

    &.positive {
        color: ${props => props.theme.palette.clrGreen};
    }

    &.negative {
        color: ${props => props.theme.palette.clrRed};
    }

    > span {
        display: block;
        // padding-top: 4px;
        padding-left: 2px;
    }
    
    .sprite-icon {
        width: 12px;
        height: 8px;
        margin-left: 4px;
        fill: ${props => props.lastChange > 0 ? props.theme.palette.clrGreen : (props.lastChange === 0 ? 'white' : props.theme.palette.clrDarkRed)} !important;
        transform: rotateZ(${props => props.lastChange > 0 ? 180 : 0}deg);
    }
`;

export const Prices = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: center;
    font-size: 33px;
    font-weight: 500;
    color: ${props => props.theme.palette.clrPurple};

    .dropdown-wrapper {
        position: relative;
    }

    span {
        display: block;
        // line-height: 18px;
        // padding-bottom: 9px;
        padding-left: 2px;
    }

    .lastChange {
        padding-left: 5px;
    }
`;
