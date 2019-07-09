import React from 'react';
import styled from 'styled-components';

const GradientButtonStyleWrapper = styled.button.attrs({ className: 'gradient-button' })`
    position: relative;
    overflow: hidden;
    padding: 0;
    width: ${props => props.width ? (props.width + 'px') : '100%'};
    height: ${props => props.height ? props.height : '30'}px;
    border: none;
    border-radius: 3px;
    background: transparent;
    outline: none !important;
    cursor: pointer;

    .gradient-button__label {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        line-height: 1em;
        color: white;
        font-weight: 400;
        z-index: 2;
        
        svg {
            height: 30px;
            width: 30px;
            fill: white;
        }
    }

    @media only screen and (max-width : 1550px) {
        .gradient-button__label > span {
            font-size: 20px;
        }
    }

    @media only screen and (max-width : 550px) {
        .gradient-button__label > span {
            font-size: 18px;
        }
    }
    
    .gradient-button__content {
        position: absolute;
        top: -1px;
        right: -1px;
        bottom: -1px;
        left: -1px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0;
        overflow: hidden;
        background: ${props => props.red ? props.theme.palette.gradientBtnCloseBg : props.theme.palette.gradientBtnNextBg};
        border: none;
        border-radius: 3px;
        z-index: 1;
        
        .gradient-button__content__glow {
            position: absolute;
            opacity: .4;
            top: -40%;
            left: -15%;
            right: -15%;
            bottom: 50%;
            background: radial-gradient(ellipse at center, rgba(255,255,255,.5) 0%, rgba(255,255,255,1) 100%);
            border-radius: 50%;
            transform-origin: bottom right;
            z-index: 3;
        }
    }
    
    &:hover, &:focus {
        .gradient-button__content {
            background: ${props => props.red ? props.theme.palette.gradientBtnCloseHoverBg : props.theme.palette.gradientBtnNextHoverBg};

            .gradient-button__content__glow {
                opacity: .5;
            }
        }
    }
    
    &.exchange-progress {
        cursor: pointer;
        border: 1px ${props => props.theme.palette.clrBorder} solid;

        .gradient-button__content {
            background: transparent;
        }
        .gradient-button__content__glow {
            background: transparent;
        }
    }
    
    &[disabled], &.progress, &.completed {
        cursor: url('/img/not-allowed1.cur'), not-allowed !important;
        border: 1px ${props => props.theme.palette.clrBorder} solid;

        .gradient-button__label {
            &, & * {
                color: ${props => props.theme.palette.coinPairSelectText2} !important;
                // border: 1px ${props => props.theme.palette.orderFormSellBtnDisabledText} solid;
                
                svg {
                    fill: ${props => props.theme.palette.coinPairSelectText2} !important;
                }
            }
        }

        .gradient-button__content {
            // background: ${props => props.theme.palette.orderFormSellBtnDisabledBg};
        
            &:before {
                background: ${props => props.theme.palette.coinPairSelectBg};
            }
            
            &:after {
                background: ${props => props.theme.palette.coinPairSelectBg};
            }
            
            .gradient-button__content__glow {
                opacity: .05;
            }
        }
    }
    
    &.primary-solid {
        .gradient-button__label {
            &, & * {
                color: ${props => props.theme.palette.coinPairNextBtnText};
                
                svg {
                    fill: ${props => props.theme.palette.coinPairNextBtnText};
                }
            }
        }
        
        .gradient-button__content {
            background: ${props => props.theme.palette.coinPairNextBtnBg};

            .gradient-button__content__glow {
                opacity: 0 !important;
            }
        }
        
        // &:hover, &:focus {
        //     .gradient-button__label {
        //         &, & * {
        //             color: ${props => props.theme.palette.btnPrimaryHoverText};
        //         }
        //     }
        //    
        //     .gradient-button__content {
        //         background: ${props => props.theme.palette.btnPrimaryHoverBg};
        //     }
        // }
        
        &:active, &.active {
            .gradient-button__label {
                &, & * {
                    color: ${props => props.theme.palette.coinPairNextBtnActiveText};
                
                    svg {
                        fill: ${props => props.theme.palette.coinPairNextBtnActiveText};
                    }
                }
            }
            
            .gradient-button__content {
                background: ${props => props.theme.palette.coinPairNextBtnActiveBg};
            }
        }

        &.completed {
            .gradient-button__label {
                &, & * {
                    color: ${props => props.theme.palette.coinPairNextBtnText};
                
                    svg {
                        fill: ${props => props.theme.palette.coinPairNextBtnText};
                    }
                }
            }
    
            .gradient-button__content {
                background: ${props => props.theme.palette.coinPairNextBtnText};
            }
        }
        
        &[disabled], &.progress {
            .gradient-button__label {
                &, & * {
                    color: ${props => props.theme.palette.coinPairSelectText2} !important;
                
                    svg {
                        fill: ${props => props.theme.palette.coinPairSelectText2} !important;
                    }
                }
            }
    
            .gradient-button__content {
                background: ${props => props.theme.palette.coinPairSelectBg};
            }
        }
    }

    &.positive-solid {
        .gradient-button__label {
            &, & * {
                color: ${props => props.theme.palette.coinPairDoneBtnText};
            
                svg {
                    fill: ${props => props.theme.palette.coinPairDoneBtnText};
                    height: 30px;
                }
            }
        }
        
        .gradient-button__content {
            background: ${props => props.theme.palette.coinPairDoneBtnBg};

            .gradient-button__content__glow {
                opacity: 0 !important;
            }
        }
        
        &:hover, &:focus {
            .gradient-button__label {
                &, & * {
                    color: ${props => props.theme.palette.btnPositiveHoverText};
                
                    svg {
                        fill: ${props => props.theme.palette.btnPositiveHoverText};
                    }
                }
            }
            
            .gradient-button__content {
                background: ${props => props.theme.palette.btnPositiveHoverBg};
            }
        }
        
        &:active, &.active {
            .gradient-button__label {
                &, & * {
                    color: ${props => props.theme.palette.btnPositiveActiveText};
                
                    svg {
                        fill: ${props => props.theme.palette.btnPositiveActiveText};
                    }
                }
            }
            
            .gradient-button__content {
                background: ${props => props.theme.palette.btnPositiveActiveBg};
            }
        }

        &.completed {
            .gradient-button__label {
                &, & * {
                    color: ${props => props.theme.palette.coinPairDoneBtnText};
                
                    svg {
                        fill: ${props => props.theme.palette.coinPairDoneBtnText};
                    }
                }
            }
    
            .gradient-button__content {
                background: ${props => props.theme.palette.coinPairDoneBtnBg};
            }
        }
        
        &[disabled], &.progress {
            border: 1px solid ${props => props.theme.palette.btnPositiveBg};
            .gradient-button__label {
                &, & * {
                    color: ${props => props.theme.palette.coinPairDoneBtnText} !important;
                
                    svg {
                        fill: ${props => props.theme.palette.coinPairDoneBtnText} !important;
                    }
                }
            }
    
            .gradient-button__content {
                background: ${props => props.theme.palette.coinPairDoneBtnBg};
                opacity: 0.3;
            }
        }
    }

    &.negative-solid {
        border: 2px solid ${props => props.theme.palette.btnNegativeBg};

        .gradient-button__label {
            &, & * {
                color: ${props => props.theme.palette.btnNegativeText};
            
                svg {
                    fill: ${props => props.theme.palette.btnNegativeText};
                }
            }
        }
        
        .gradient-button__content {
            background: ${props => props.theme.palette.btnNegativeBg};

            .gradient-button__content__glow {
                opacity: 0 !important;
            }
        }
        
        &:hover, &:focus {
            .gradient-button__label {
                &, & * {
                    color: ${props => props.theme.palette.btnNegativeHoverText};
                
                    svg {
                        fill: ${props => props.theme.palette.btnNegativeHoverText};
                    }
                }
            }
            
            .gradient-button__content {
                background: ${props => props.theme.palette.btnNegativeHoverBg};
            }
        }
        
        &:active, &.active {
            .gradient-button__label {
                &, & * {
                    color: ${props => props.theme.palette.btnNegativeActiveText};
                
                    svg {
                        fill: ${props => props.theme.palette.btnNegativeActiveText};
                    }
                }
            }
            
            .gradient-button__content {
                background: ${props => props.theme.palette.btnNegativeActiveBg};
            }
        }

        &.completed {
            .gradient-button__label {
                &, & * {
                    color: ${props => props.theme.palette.btnNegativeText};
                
                    svg {
                        fill: ${props => props.theme.palette.btnNegativeText};
                    }
                }
            }
    
            .gradient-button__content {
                background: ${props => props.theme.palette.btnNegativeBg};
            }
        }
        
        &[disabled], &.progress {
            border: 1px solid ${props => props.theme.palette.btnNegativeBg};
            .gradient-button__label {
                &, & * {
                    color: ${props => props.theme.palette.coinPairDoneBtnText} !important;
                
                    svg {
                        fill: ${props => props.theme.palette.coinPairDoneBtnText} !important;
                    }
                }
            }
    
            .gradient-button__content {
                background: ${props => props.theme.palette.btnNegativeBg};
                opacity: 0.3;
            }
        }
    }
    
    &.search-btn .gradient-button__content {
        background: ${props => props.theme.palette.clrBlue};
    }
    &.search-btn:hover .gradient-button__content {
        background: ${props => props.theme.palette.clrDarkBlue};
    }
`;

const OrderGradientButton = ({
    children, width, height, red, ...props
}) => (
    <GradientButtonStyleWrapper width={width} height={height} red={red} {...props}>
        <div className="gradient-button__label">
            {children}
        </div>
        <div className="gradient-button__content">
            <div className="gradient-button__content__glow"/>
        </div>
    </GradientButtonStyleWrapper>
);

export default OrderGradientButton;
