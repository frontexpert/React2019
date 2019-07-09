import React from 'react';
import styled from 'styled-components';

export const Wrapper = styled.section`
    position: relative;
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    border-radius: ${props => props.theme.palette.borderRadius};
    // overflow: hidden;
    opacity: ${props => props.isLoading ? 0.7 : 1};
`;

// const LoaderWrapper = styled.div`
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: ${props => props.width}px;
//     height: 100%;
//     z-index: 110000;
//     background-color: ${props => props.theme.palette.clrback};
//     border-bottom-right-radius: ${props => props.theme.palette.borderRadius};
//     border-bottom-left-radius: ${props => props.theme.palette.borderRadius};
// `;

export const DepthChartWrapper = styled.div`
    position: absolute;
    top: 0;
    border-radius: ${props => props.theme.palette.borderRadius};
    // overflow: hidden;

    .gray {
        color: #575D63;
    }
    
    .highcharts-tooltip {
        font-family: 'open_sans', sans-serif;  
        -webkit-transition: none !important;
        -moz-transition: none !important;
        -o-transition: none !important;
        transition: none !important;
        z-index: 2;

        div.tooltip-wrapper {
            position: relative;
            z-index: 9999;

            div.circle {
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background-color: rgba(255, 255, 255, .7);
                box-shadow: 0px 0px 1px 2px rgba(255, 255, 255, 0.25);
                margin-top: -6px;
                margin-left: -6px;
            }

            div.tooltip {
                position: relative;
                // margin-left: -50%;
                // margin-right: 50%;
                opacity: 1;
                padding: 1px 1px;
                color: #FFF;
                border: 1px solid ${props => props.theme.palette.clrseparatorD};
                border-radius: 11px;
                border-color: #747BA6;
                background-color: ${props => props.colorMode === 'Buy' ? '#01AF67' : props.theme.palette.dodgerBlue};
                transform: translate(0, 235px);
                box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.4);                

                @media(max-width: 1500px) {
                    transform: translate(0, ${(235 - 18) * 0.75}px);
                }
                @media(max-width: 1080px) {
                    transform: translate(0, ${(235 - 18) * 0.65}px);
                }
                @media(max-width: 940px) {
                    transform: translate(0, ${(235 - 18) * 0.55}px);
                }
                & > div {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 10px;
                    svg {
                        flex: auto;
                        width: 20px;
                        height: 12px;
                        padding-top: 1px;
                        fill: #FFF;
                    }
                    img {
                        width: 12px;
                        height: 12px;
                        margin: 0;

                        &.left {
                            margin-left: 4px;
                        }
                        &.right {
                            margin-right: 4px;
                        }
                    }
                }

                .textCenter {
                    text-align: center;
                }
                &.tooltip-left {
                    margin: 0;
                }
            }
            
            span svg {
                width: 20px;
                height: 20px;
                position: relative;
                margin: 0px 3px 0px 0px;
                flex: 0 0 20px;
            }
            
            .bold {
                font-weight: bold;
            }
            
            .light {
                font-weight: 100;
                font-size: 10px;
            }
        }
    }
        

    .lineForDepthChart {
        position: absolute;
        pointer-events: none;
        left: -9999px;
        z-index: 10;
    
        .circle {
            position: relative;
            width: 9px;
            height: 9px;
            background-color: rgba(14, 21, 33, 1);
            border: 1.2px solid;
            border-radius: 50%;
            border-color: ${props => props.colorMode === 'Buy' ? props.theme.tradePalette.primaryBuy : props.theme.tradePalette.primarySell};
            transform: translateX(-50%) translateY(-50%);
            z-index: 1;
        }
    
        .line {
            position: absolute;
            background: ${props => props.colorMode === 'Buy' ? props.theme.tradePalette.primaryBuy : props.theme.tradePalette.primarySell};
            width: 1px;
            height: 1px;
        }

        .line-horizontal {
            position: absolute;
            border-top: 1px dashed;
            border-color: ${props => props.colorMode === 'Buy' ? props.theme.tradePalette.primaryBuy : props.theme.tradePalette.primarySell};
            width: ${props => props.width - 120}px;
            height: 0;
            display: none;
        }    
    }
    
    #depth_chart_container {
        height: fit-content;
        width: fit-content;
        border-radius: ${props => props.theme.palette.borderRadius};

        .highcharts-axis-labels {
            color: ${props => props.theme.palette.clrPurple} !important;
            fill: ${props => props.theme.palette.clrPurple} !important;
            
            span {
                color: ${props => props.theme.palette.clrPurple} !important;
                fill: ${props => props.theme.palette.clrPurple} !important;
                font-size: 14px !important;
                font-weight: 200 !important;
                transform: translate(0, -5px) !important;

                img {
                    width: 15px;
                    height: 15px;
                    transform: translate(0, 2px);
                    margin-left: 5px;
                    filter: grayscale(1) brightness(80%);
                }
            }
        }

        .highcharts-root {
            height: 100%;
            border-bottom-right-radius: ${props => props.theme.palette.borderRadius};
            border-bottom-left-radius: ${props => props.theme.palette.borderRadius};
        }
    }
`;

export const Overlapper = styled.div`
    position: absolute;
    top: 0;
    left: ${props => props.left}px;
    width: ${props => props.width}px;
    height: 100%;
    pointer-events: none;
    background-image: ${props => props.isSpread ? 'linear-gradient(to right, rgba(50, 200, 153, .07), rgba(102, 203, 255, .7))' : 'linear-gradient(to top right, rgba(102, 203, 255, .2), rgba(102, 203, 255, .08), transparent, transparent)'};
    border-left: 1px dashed ${props => props.isSpread ? 'rgba(50, 200, 153, .7)' : 'rgba(102, 203, 255, .7)'};
    border-right: 1px dashed ${props => props.isSpread ? 'rgba(102, 203, 255, .7)' : 'rgba(50, 200, 153, .7)'};
    border-width: ${props => props.border ? '1px' : '0'};
`;

export const OverlapperMask = styled.div`
    position: absolute;
    top: 0;
    left: ${props => props.left + 1}px;
    width: ${props => props.width - 2}px;
    height: 100%;
    pointer-events: none;
    background-image: linear-gradient(to top left, rgba(50, 200, 153, .2), rgba(50, 200, 153, .08), transparent, transparent);
`;

export const MidMarketWrapper = styled.div`
    position: absolute;
    z-index: 1;
    // left: 2%;
    // bottom: 13%;
    top: 40px;
    left: ${props => props.left}px;
    color: ${props => props.theme.palette.clrBorder};
    text-align: center;
`;

export const ExchangeLabel = styled.div`
    position: absolute;
    z-index: 1;
    left: 10px;
    bottom: 4px;
    margin: 0;
    padding: 4px;
    padding-bottom: 20px;
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: 300;
    color: ${props => props.theme.palette.orderFormHeaderTabHoverText};

    > span {
        margin-right: 4px;
        font-weight: 600;
        color: ${props => props.theme.palette.orderFormHeaderText};
        text-transform: uppercase;
    }
`;

export const ZoomWrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ZoomOut = styled.img`
    width: ${props => props.isMobile ? '3rem' : '2rem'};
    height: ${props => props.isMobile ? '3rem' : '2rem'};
    border: 2px solid ${props => props.theme.palette.clrBorder};
    background-color: ${props => props.theme.palette.clrBackground};
    padding: 8px;
    margin: 2px;
    border-radius: 50%;
    transform: translate(-100%, 0);
    
    &:hover {
        cursor: pointer;
        filter: brightness(150%);
        z-index: 1;
    }
`;

export const ZoomIn = styled(ZoomOut)`
    position: relative;
    left: -1px;
    border-radius: 50%;
`;

export const Loading = styled.div`
    position: absolute;
    display: block;
    width: ${props => props.isMobile ? '3rem' : '2rem'};
    height: ${props => props.isMobile ? '3rem' : '2rem'};
    border-radius: 50%;
    border: 2px solid transparent;
    border-top-color: #fff;
    -webkit-animation: iECmZH 1s linear infinite;
    animation: iECmZH 1s linear infinite;
    z-index: 99999;
    left: ${props => props.mode === 'in' ? '5px' : props.isMobile ? '-46px' : '-30px'};
`;

const GlobalSvg = styled.svg`
    width: 12px;
    height: 12px;
    margin-right: 4px;
    fill: ${props => props.theme.palette.orderFormHeaderText};
`;

export const GlobalIcon = props => (
    <GlobalSvg viewBox="0 0 12.33 12.33" {...props}>
        <path d="M1.1,3.78a5.21,5.21,0,0,0,1.67.64A7.55,7.55,0,0,1,4.26.89l-.73.33-.23.13a.27.27,0,0,1-.4-.08c-.1-.15,0-.3.12-.41A5.9,5.9,0,0,1,5,.12,6.16,6.16,0,1,1,.19,7.63,6,6,0,0,1,1.65,2c.1-.12.21-.2.37-.12s.2.29.06.48c-.3.39-.57.79-.85,1.19C1.18,3.6,1.15,3.69,1.1,3.78Zm10.35.56c-.28.12-.55.25-.83.35S10,4.87,9.74,5c-.11,0-.1.1-.1.18,0,.59,0,1.18,0,1.76a.26.26,0,0,1-.35.28c-.18,0-.21-.18-.21-.35,0-.37,0-.75,0-1.12,0-.2,0-.4,0-.57l-2.64.23V8.59h.1a14.85,14.85,0,0,0,3.18-.37,5,5,0,0,0,1.64-.66A.63.63,0,0,0,11.69,7c0-.13,0-.26.05-.39A5.32,5.32,0,0,0,11.45,4.34ZM5.85,8.62V5.36L3.26,5.13a0,0,0,0,0,0,0A10.1,10.1,0,0,0,3.43,8.3a.22.22,0,0,0,.12.11c.22,0,.43.07.65.09C4.75,8.55,5.29,8.58,5.85,8.62ZM9,4.57A6.5,6.5,0,0,0,7.63,1.31,2.25,2.25,0,0,0,6.78.69L6.44.58V4.8ZM5.85,4.8V.6l-.09,0a2.39,2.39,0,0,0-1.27.94,6.21,6.21,0,0,0-1,2.32c0,.21-.09.43-.14.69Zm-5-.48a.93.93,0,0,0-.05.1A5.24,5.24,0,0,0,.59,6.61c.08.77,0,.78.88,1.24a5.24,5.24,0,0,0,1.36.42V8.16A10.48,10.48,0,0,1,2.69,5.1c0-.1,0-.13-.12-.15A6.1,6.1,0,0,1,.89,4.32ZM8,.91A7.13,7.13,0,0,1,9.56,4.42a5.3,5.3,0,0,0,1.66-.64A5.44,5.44,0,0,0,8,.91Zm-1.6,10.8c1-.1,1.94-1.47,2.25-2.68l-2.25.16Zm-.58,0V9.19L3.62,9a4.52,4.52,0,0,0,1.6,2.43A5.29,5.29,0,0,0,5.85,11.76Zm-1.57-.33s0-.06,0-.06A6.22,6.22,0,0,1,3,9a.2.2,0,0,0-.19-.16,6.36,6.36,0,0,1-.78-.2c-.36-.11-.71-.25-1.09-.38A5.72,5.72,0,0,0,4.28,11.43Zm7.09-3.19a7.64,7.64,0,0,1-1.93.63.34.34,0,0,0-.15.18c-.17.39-.29.81-.48,1.19s-.48.78-.72,1.18A5.73,5.73,0,0,0,11.37,8.24Z" />
    </GlobalSvg>
);

export const Logo = styled.img`
    width: 12px;
    border-radius: 50%;
    margin-right: 10px;
`;
