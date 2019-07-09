import React from 'react';
import styled  from 'styled-components';

export const Wrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    background: ${props => props.isDonutMode && props.theme.palette.donutBackground};
    display: ${props => props.isDonutMode ? '' : 'none'};
`;

export const DonutChartWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    overflow: hidden;
    background: transparent;
    border-top-left-radius: ${props => props.theme.palette.borderRadius};
    border: solid ${props => props.theme.palette.clrBorder};
    border-width: 1px 0 0 1px;
    transition: ${props => props.disableTransition ? 'none' : 'transform .7s ease-out'};
    z-index: 3;
    display: ${props => props.switchMode ? 'none' : ''};

    .pie-center-label {
        position: absolute;
        top: calc(50% - 75px);
        left: calc(50% - ${props => props.height < 1000 ? 140 : 160}px);
        width: ${props => props.height < 1000 ? 280 : 320}px;
        height: 150px;
        display: none; // flex
        align-items: center;
        justify-content: center;
        flex-direction: column;
        font-size: ${props => props.height < 500 ? '20px' : (props.height < 600 ? '24px' : (props.height < 800 ? '30px' : (props.height < 1000 ? '32px' : '36px')))};
        font-weight: 600;
        line-height: 1.2;
        letter-spacing: 1.1px;
        color: ${props => props.theme.palette.donutCenterLabel};
        text-align: center;
        
        // div {
        //     &:nth-child(2) {
        //         color: ${props => props.theme.palette.contrastText};                
        //     }
        //    
        //     &:last-child {
        //         // font-size: 20px;
        //     }
        // }
        
        > div {
            width: 100%;
            display: flex;
            align-items: center;
        }

        .left {
            width: calc(95% - ${props => props.height < 1000 ? 90 : 120}px);
            color: ${props => props.theme.palette.donutCenterLabelHighlight};
            text-align: right;
            overflow: hidden;
            
            .gray {
                color: ${props => props.theme.palette.donutCenterLabel};
            }
        }

        .right {
            width: ${props => props.height < 1000 ? 90 : 120}px;
            margin-left: 5%;
            text-align: left;
        }

        .mt-2 {
            margin-top: 1rem;
        }
        
        .text-white {
            white-space: nowrap;
            color: ${props => props.theme.palette.clrHighContrast};
        }
    }
    
    .donut-placeholder {
        position: absolute;
        // bottom: 50px;
        // left: 50px;
        bottom: 0;
        left: 0;
        width: 70px;
        height: 30px;
        background-color: ${props => props.theme.palette.donutBackground};
    }
`;

export const Donut = styled.div`
    position: absolute;
    // left: 50px;
    // top: 50px;
    // width: ${props => props.width - 100}px;
    // height: ${props => props.height - 100}px;
    left: 0;
    top: -30px;
    z-index: 4;
    width: 100%;
    height: ${props => props.height + 60}px;
    // background: radial-gradient(closest-side, #2C0C47, #2C0C47, ${props => props.theme.palette.donutBackground});
    background: transparent;
    margin-top: ${props => props.width * 0.05}px;
    
    svg>g>g:last-child>g:last-child {
        display: none;
    }
`;

export const HoverLabel = styled.div.attrs({ className: 'pie-center-label' })`
    .saved,
    .title {
        justify-content: center;
        font-size: ${props => props.height < 800 ? '30px' : (props.height < 1000 ? '32px' : '36px')} !important;
        font-weight: 600;
        color: ${props => props.color} !important;
    }
    
    // font-size: 24px !important;
    //
    // > div {
    //     justify-content: center;
    // }
    //
    // .gray {
    //     margin-left: 0.5rem;
    // }
`;

export const SvgComplete = styled.div`
    svg {
        position: relative;
        z-index: 1;
        width: 100px;
        height: 100px;
        fill: #fff;
        position: absolute;
        left: calc(50% - ${props => props.width ? props.width / 2 : 50}px);
        top: calc(50% - ${props => props.height ? props.height / 2 : 50}px);
    }
`;

export const ArbSwitcher = styled.div`
    position: absolute;
    bottom: 70px;
    right: 80px;
`;