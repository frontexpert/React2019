import React from 'react';
import styled from 'styled-components';

const GradientButtonStyleWrapper = styled.button.attrs({ className: 'gradient-button' })`
    position: relative;
    overflow: hidden;
    padding: 0;
    width: ${props => props.width ? (props.width + 'px') : '100%'};
    height: ${props => props.height}px;
    border: none;
    border-radius: 3px;
    background: transparent;
    outline: none !important;
    cursor: pointer;

    .gradient-button__label {
        position: absolute;
        top: 0;
        right: ${props => props.height / 6}px;
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
    }
    
    .gradient-button__content {
        position: absolute;
        left: 0;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: -${props => props.height / 3}px;
        width: calc(100% + ${props => props.height / 4}px);
        height: 100%;
        transform: skewX(30deg);
        overflow: hidden;
        background: transparent;
        border: none;
        border-radius: 3px;
        z-index: 1;
        
        &:before {
            position: absolute;
            right: ${props => props.height / 1.72}px;
            bottom: 0;
            left: 0;
            top: 0;
            border-radius: 3px;
            transform: skewX(-50deg);
            transform-origin: bottom right;
            background: ${props => props.red ? props.theme.palette.gradientBtnCloseBg : props.theme.palette.gradientBtnNextBg};
            content: "";
            z-index: 1;
        }
        
        &:after {
            position: absolute;
            right: ${props => props.height / 1.72}px;
            bottom: 0;
            left: 0;
            top: 0;
            border-radius: 3px;
            transform: skewX(-30deg);
            transform-origin: bottom right;
            background: ${props => props.red ? props.theme.palette.gradientBtnCloseBg : props.theme.palette.gradientBtnNextBg};
            content: "";
            z-index: 2;
        }
        
        .gradient-button__content__glow {
            position: absolute;
            opacity: .4;
            top: -40%;
            left: -15%;
            right: -15%;
            bottom: 50%;
            background: radial-gradient(ellipse at center, rgba(255,255,255,.5) 0%, rgba(255,255,255,1) 100%);
            border-radius: 50%;
            transform: skewX(-30deg);
            transform-origin: bottom right;
            z-index: 3;
        }
    }
    
    &:hover, &:focus {
        .gradient-button__content {
            &:before {
                background: ${props => props.red ? props.theme.palette.gradientBtnCloseHoverBg : props.theme.palette.gradientBtnNextHoverBg};
            }
            
            &:after {
                background: ${props => props.red ? props.theme.palette.gradientBtnCloseHoverBg : props.theme.palette.gradientBtnNextHoverBg};
            }
            
            .gradient-button__content__glow {
                opacity: .5;
            }
        }
    }
    
    &[disabled], &.progress, &.completed {
        cursor: not-allowed;
    
        .gradient-button__label {
            &, & * {
                color: ${props => props.theme.palette.coinPairSelectText2} !important;
            }
        }

        .gradient-button__content {
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
                color: ${props => props.theme.palette.coinPairNextBtnText} !important;
            }
        }

        .gradient-button__content {
            &:before {
                background: ${props => props.theme.palette.coinPairNextBtnBg};
            }
            
            &:after {
                background: ${props => props.theme.palette.coinPairNextBtnBg};
            }
            
            .gradient-button__content__glow {
                opacity: .0 !important;
            }
        }
        
        // &:hover {
        //     .gradient-button__label {
        //         &, & * {
        //             color: ${props => props.theme.palette.coinPairNextBtnHoverText} !important;
        //         }
        //     }
        //
        //     .gradient-button__content {
        //         &:before {
        //             background: ${props => props.theme.palette.coinPairNextBtnHoverBg};
        //         }
        //        
        //         &:after {
        //             background: ${props => props.theme.palette.coinPairNextBtnHoverBg};
        //         }
        //     }
        // }
        
        &:active, &.active {
            .gradient-button__label {
                &, & * {
                    color: ${props => props.theme.palette.coinPairNextBtnActiveText} !important;
                }
            }
    
            .gradient-button__content {
                &:before {
                    background: ${props => props.theme.palette.coinPairNextBtnActiveBg};
                }
                
                &:after {
                    background: ${props => props.theme.palette.coinPairNextBtnActiveBg};
                }
            }
        }
        
        &.completed {
            .gradient-button__label {
                &, & * {
                    color: ${props => props.theme.palette.coinPairNextBtnText};
                }
            }
    
            .gradient-button__content {
                &:before {
                    background: ${props => props.theme.palette.coinPairNextBtnBg};
                }
                
                &:after {
                    background: ${props => props.theme.palette.coinPairNextBtnBg};
                }
            }
        }
        
        &[disabled], &.progress {
            .gradient-button__label {
                &, & * {
                    color: ${props => props.theme.palette.coinPairSelectText2} !important;
                }
            }
    
            .gradient-button__content {
                &:before {
                    background: ${props => props.theme.palette.coinPairSelectBg};
                }
                
                &:after {
                    background: ${props => props.theme.palette.coinPairSelectBg};
                }
            }
        }
    }
    
    &.positive-solid {
        .gradient-button__label {
            &, & * {
                color: ${props => props.theme.palette.coinPairDoneBtnText};
            }
        }

        .gradient-button__content {
            &:before {
                background: ${props => props.theme.palette.coinPairDoneBtnBg};
            }
            
            &:after {
                background: ${props => props.theme.palette.coinPairDoneBtnBg};
            }
            
            .gradient-button__content__glow {
                opacity: .0 !important;
            }
        }
        
        &:hover, &:focus {
            .gradient-button__label {
                &, & * {
                    color: ${props => props.theme.palette.btnPositiveHoverText};
                }
            }
    
            .gradient-button__content {
                &:before {
                    background: ${props => props.theme.palette.btnPositiveHoverBg};
                }
                
                &:after {
                    background: ${props => props.theme.palette.btnPositiveHoverBg};
                }
            }
        }
        
        &:active, &.active {
            .gradient-button__label {
                &, & * {
                    color: ${props => props.theme.palette.btnPositiveActiveText};
                }
            }
    
            .gradient-button__content {
                &:before {
                    background: ${props => props.theme.palette.btnPositiveActiveBg};
                }
                
                &:after {
                    background: ${props => props.theme.palette.btnPositiveActiveBg};
                }
            }
        }
        
        &.completed {
            .gradient-button__label {
                &, & * {
                    color: ${props => props.theme.palette.coinPairDoneBtnText};
                }
            }
    
            .gradient-button__content {
                &:before {
                    background: ${props => props.theme.palette.coinPairDoneBtnBg};
                }
                
                &:after {
                    background: ${props => props.theme.palette.coinPairDoneBtnBg};
                }
            }
        }
        
        &[disabled], &.progress {
            .gradient-button__label {
                &, & * {
                    color: ${props => props.theme.palette.coinPairSelectText2} !important;
                }
            }
    
            .gradient-button__content {
                &:before {
                    background: ${props => props.theme.palette.coinPairSelectBg};
                }
                
                &:after {
                    background: ${props => props.theme.palette.coinPairSelectBg};
                }
            }
        }
    }
    
    &.negative-solid {
        .gradient-button__label {
            &, & * {
                color: ${props => props.theme.palette.btnNegativeText};
            }
        }

        .gradient-button__content {
            &:before {
                background: ${props => props.theme.palette.btnNegativeBg};
            }
            
            &:after {
                background: ${props => props.theme.palette.btnNegativeBg};
            }
            
            .gradient-button__content__glow {
                opacity: .0 !important;
            }
        }
        
        &:hover, &:focus {
            .gradient-button__label {
                &, & * {
                    color: ${props => props.theme.palette.btnNegativeHoverText};
                }
            }
    
            .gradient-button__content {
                &:before {
                    background: ${props => props.theme.palette.btnNegativeHoverBg};
                }
                
                &:after {
                    background: ${props => props.theme.palette.btnNegativeHoverBg};
                }
            }
        }
        
        &:active, &.active {
            .gradient-button__label {
                &, & * {
                    color: ${props => props.theme.palette.btnNegativeActiveText};
                }
            }
    
            .gradient-button__content {
                &:before {
                    background: ${props => props.theme.palette.btnNegativeActiveBg};
                }
                
                &:after {
                    background: ${props => props.theme.palette.btnNegativeActiveBg};
                }
            }
        }
        
        &.completed {
            .gradient-button__label {
                &, & * {
                    color: ${props => props.theme.palette.btnNegativeText};
                }
            }
    
            .gradient-button__content {
                &:before {
                    background: ${props => props.theme.palette.btnNegativeBg};
                }
                
                &:after {
                    background: ${props => props.theme.palette.btnNegativeBg};
                }
            }
        }
        
        &[disabled], &.progress {
            .gradient-button__label {
                &, & * {
                    color: ${props => props.theme.palette.coinPairSelectText2} !important;
                }
            }
    
            .gradient-button__content {
                &:before {
                    background: ${props => props.theme.palette.coinPairSelectBg};
                }
                
                &:after {
                    background: ${props => props.theme.palette.coinPairSelectBg};
                }
            }
        }
    }
    
`;

const GradientButton = ({
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

export default GradientButton;