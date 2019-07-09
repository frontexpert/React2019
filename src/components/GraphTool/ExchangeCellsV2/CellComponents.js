import React, { Fragment } from 'react';
import styled from 'styled-components';

import COIN_DATA_MAP from '../../../mock/coin-data-map';

export const ItemNormal = styled.div.attrs({ className: 'exch-bar-item--normal' })`
    position: relative;
    width: 100%;
    height: 12.5%;
    margin: 0;
    padding-left: 8px;
    padding-right: 13px;
    display: flex;
    background: ${props => props.theme.palette.exchBarItemBg};
    border: 1px solid ${props => props.color || props.theme.palette.clrInnerBorder};
    color: ${props => props.theme.palette.clrtext};
    cursor: ${props => props.disabled ? 'initial' : 'pointer'};

    .exch-bar-progress-bar .track {
        background: ${props => props.theme.palette.exchBarItemBg};
    } 

    ${props => ((props.active || props.isOpen || props.hover) && !props.disabled) ? `
        background: ${props.theme.palette.exchBarActiveItem};
        color: ${props.theme.palette.clrHighContrast};

        .exch-bar-progress-bar .track {
            background: ${props.theme.palette.exchBarHoverItem};
        }

        .exch-bar-item__title,
        .exch-bar-item__ratio-text,
        .exchange-name {
            color: ${props.theme.palette.clrHighContrast} !important;
        }
    ` : ''};

    .exch-bar-coin-icon {
        opacity: ${props => (props.isPlan || props.active || props.isOpen || props.hover) ? 1 : 0.3};

        .icon-wrapper {
            // filter: ${props => props.active ? 'none !important' : ''};
            filter: ${props => props.isPlan ? 'none !important' : ''};
        }

        &:after {
            display: ${props => props.isPlan ? 'none !important' : 'block'};
        }
    }
     
    ${props => !props.disabled ? `   
        &:hover {
            background: ${(props.active || props.isOpen) ? '' : props.theme.palette.clrMouseHover};
            color: ${props.theme.palette.clrHighContrast};
            
            span {
                color: ${props.theme.palette.clrHighContrast};
            }
            
            .exch-bar-coin-icon {
                opacity: 1;
    
                .icon-wrapper {
                    filter: none !important;
                }
    
                &:after {
                    display: none !important;
                }
            }
            
            .exch-bar-item__title {
                color: ${props.theme.palette.clrHighContrast} !important;
            }
        }
    
        &:active {
            background: ${props.theme.palette.clrMouseClick};
            color: ${props.theme.palette.clrHighContrast};
            
            .exch-bar-coin-icon {
                .icon-wrapper {
                    filter: none !important;
                }
                &:after {
                    display: none !important;
                }
            }
        }
    ` : ''};
    
    &:last-child {
        border-bottom: 1px solid ${props => props.theme.palette.exchBarItemBorder};
    }
`;

export const ItemTitle = styled.span.attrs({ className: 'exch-bar-item__title' })`
    display: block;
    margin: 0;
    border: none;
    padding: 0;
    width: 100%;
    font-size: 23.29px;
    line-height: 27.95px;
    font-weight: bold;
    color: ${props => props.hover ? props.theme.palette.clrHighContrast : props.theme.palette.clrPurple};

    span {
        margin-left: 8px;
    }
`;

export const ItemExchPair = styled.div.attrs({ className: 'exch-bar-item__pairs' })`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: stretch;
    margin: 0;
    border: none;
    padding: 0;
    width: 100%;
`;

export const ItemExchPairSimple = styled.div.attrs({ className: 'exch-bar-item__pairs-simple' })`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 10;
    height: 100%;
    width: 100%;
    // font-size: 15px;
    line-height: 27.95px;
    // color: ${props => !props.active ? props.theme.palette.exchBarItemLabel : props.theme.palette.exchBarItemTitle};
    // color: ${props => props.hover ? props.theme.palette.clrHighContrast : props.theme.palette.clrBorder};
    color: ${props => props.theme.palette.clrBorder};
    
    .coin-name {
        height: 50px;
        display: flex;
        align-items: center;
        font-size: 35px;
        font-weight: 600;
        line-height: 1;
    }
    
    .flex-1 {
        flex: 1;
        // max-width: 190px;
        overflow: hidden;
        white-space: nowrap;
        text-align: center;
    }
    .flex-between{
        width: 44%;
    }
    
    .d-flex {
        display: flex;
        align-items: center;
        justify-content: center;
        white-space: nowrap;
        font-size: 30px;
    }
    
    .gray {
        color: ${props => props.theme.palette.clrtext} !important;
        padding-left: 10px;
        padding-right: 10px;
    }
    
    ${props => !props.isProgress ? `
        span {
            color: ${props.theme.palette.clrBorder} !important;
        }
    ` : ''};
`;

export const ItemExchPairRatioText = styled.span.attrs({ className: 'exch-bar-item__ratio-text' })`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    font-size: 33px;
    font-weight: bold;
    line-height: 1;
    text-align: center;
    padding-left: 10px;
    padding-right: 10px;

    ${props => props.active ? `
        color: ${props.theme.palette.clrHighContrast};

        svg {
            fill: ${props.theme.palette.clrHighContrast};
        }
    ` : ''}
    
    > div {
        flex-shrink: 0;
        color: ${props => props.active ? props.theme.palette.clrHighContrast : ''};
    }
`;

export const ExchangeWrapper = styled.div`
    max-width: 165px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
    line-height: 24px;
    
    > div {
        font-size: 16px;
        margin-bottom: -5px;
    }
`;

export const ItemExchPairSide = styled.div.attrs({ className: 'exch-bar-item__pairs__side' })`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 0;
    border: none;
    border-radius: 3px;
    padding: 0;
    width: 65px;
    height: 33px;
    background: ${props => props.theme.palette.exchBarItemBorder};
`;

const IconStyleWrapper = styled.div.attrs({ className: 'exch-bar-coin-icon' })`
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 2px;
    border: none;
    padding: 0;
    height: ${props => props.size || '20'}px;
    border-radius: 50% !important;
    
    .icon-wrapper {
        width: ${props => props.size || '20'}px;
        height: ${props => props.size || '20'}px;
        filter: ${props => ((!props.isSearchState && !props.isOpen) && !props.hover) ? 'grayscale(1) brightness(80%) contrast(200%)' : ''};
        background-size: cover !important;
        border-radius: 50% !important;
    }
    
    .no-icon {
        border-radius: 50%;
        font-weight: bold;
        background: ${props => props.theme.tradePalette.primaryBuy};
        color: ${props => props.theme.palette.contrastText};
    }

    &:after {
        display: ${props => ((!props.isSearchState && !props.isOpen) && !props.hover) ? 'block' : 'none'};
        content: '';
        position: absolute;
        width: ${props => props.size || '20'}px;
        height: ${props => props.size || '20'}px;
        border-radius: 50% !important;
        background-color: rgba(0, 0, 250, .2);
    }
`;

export const ItemExchPairSideIcon = ({
    value, size, isSearchState, defaultFiat, type, ...props
}) => {
    if (typeof value === 'string') {
        if (type === 'ExchangeIcon') {
            return (
                <IconStyleWrapper
                    size={size}
                    isSearchState={isSearchState}
                    {...props}
                >
                    <div
                        className="icon-wrapper"
                        style={{ background: `url('img/exchange/${value}.png') no-repeat` }}
                    />
                </IconStyleWrapper>
            );
        }
        return (COIN_DATA_MAP[value] && COIN_DATA_MAP[value].file)
            ? (
                <IconStyleWrapper
                    size={size}
                    isSearchState={isSearchState}
                    {...props}
                >
                    <div
                        className="icon-wrapper"
                        style={{
                            background: value === 'USDT'
                                ? `url('img/icons-coin/${defaultFiat.toLowerCase()}.png') no-repeat` :
                                COIN_DATA_MAP[value].file.indexOf('svg') < 0
                                    ? `url('img/icons-coin/${COIN_DATA_MAP[value].file}') no-repeat`
                                    : `url('img/sprite-coins-view.svg#coin-${value.toLowerCase()}') no-repeat`,
                        }}
                    />
                </IconStyleWrapper>
            )
            : (
                <IconStyleWrapper className="no-icon" isSearchState={isSearchState} size={size} {...props}>
                    {(value && value.length) ? value.charAt(0) : ''}
                </IconStyleWrapper>
            );
    }
    return (value && value.file)
        ? (
            <IconStyleWrapper
                size={size}
                isSearchState={isSearchState}
                {...props}
            >
                <div
                    className="icon-wrapper"
                    style={{
                        background: value.file.indexOf('svg') < 0 ? `url('img/icons-coin/${value.file}') no-repeat`
                            : `url('img/sprite-coins-view.svg#coin-${value.symbol.toLowerCase()}') no-repeat`,
                    }}
                />
            </IconStyleWrapper>
        )
        : (
            <IconStyleWrapper className="no-icon" isSearchState={isSearchState} size={size} {...props}>
                {(value && value.symbol && value.symbol.length) ? value.symbol[0] : ''}
            </IconStyleWrapper>
        );

};

const RatioStyleWrapper = styled.div.attrs({ className: 'exch-bar-ratio-icon' })`
    flex-grow: 1;
    flex-shrink: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: 0 8px;
    width: 100%;
    
    svg.arrow {
        margin: 1px 0;
        width: 100%;
        height: 18px;
        fill: ${props => props.theme.palette.exchBarItemLabel};
    }
    
    span.ratio {
        width: 100%;
        font-size: 12px;
        font-weight: bold;
        line-height: 1em;
        text-align: center;
        
        span {
            font-size: 11px;
            font-weight: 300;
        }
    }
`;

export const ItemExchPairRatio = ({ active, value, coin }) => {
    return (
        <RatioStyleWrapper active={active}>
            <svg
                className="arrow"
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 52.86 20.79"
            >
                <polygon
                    className="cls-1"
                    points="1.7 13.1 42.89 13.1 42.89 16.61 50.01 10.44 42.89 4.18 42.89 7.88 1.87 7.88 0.17 5.98 40.99 5.98 40.99 0 52.86 10.44 40.99 20.79 40.99 15 0 15 1.7 13.1"
                />
            </svg>
            <span className="ratio">@{value} <span>{coin}</span></span>
        </RatioStyleWrapper>
    );
};

export const ItemExchPairArrow = () => (
    <svg
        className="arrow"
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 52.86 20.79"
    >
        <polygon
            points="1.7 13.1 42.89 13.1 42.89 16.61 50.01 10.44 42.89 4.18 42.89 7.88 1.87 7.88 0.17 5.98 40.99 5.98 40.99 0 52.86 10.44 40.99 20.79 40.99 15 0 15 1.7 13.1"
        />
    </svg>
);

export const ItemValue = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    min-height: min-content;
    margin: 0 0 7px;
    font-size: 12px;
    font-weight: 400;
    color: ${props => props.theme.palette.exchBarItemLabel};

    span {
        font-size: 11px;
        font-weight: 300;
    }
    
    span.spacer {
        margin: 0 3px;
        font-size: 12px;
        font-weight: 400;
    }
`;

const ItemValueCoinPriceWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin-left: ${props => props.align === 'right' ? 'auto' : '4px'};
    font-size: 12px;
    font-weight: 400;
    color: ${props => props.theme.palette.exchBarItemLabel};
`;

export const ItemValueCoinPrice = ({ value, coin, align }) => {
    return (
        <ItemValueCoinPriceWrapper align={align}>
            {value}<ItemExchPairSideIcon value={coin} size={12}/>
        </ItemValueCoinPriceWrapper>
    );
};

const ItemProgressBarStyleWrapper = styled.div.attrs({ className: 'exch-bar-progress-bar' })`
    height: 100%;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    width: 100%;
    margin: 0;
    border: none;
    padding: 0;
    
    .track {
        position: relative;
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        background: ${props => props.theme.palette.exchBarItemBg};
        border-radius: 0;
        overflow: hidden;
    }
    
    .progress {
        position: absolute;
        margin: 0;
        padding: 0;
        top: 0;
        left: 0;
        bottom: 0;
        width: 0;
        // background: linear-gradient(to left, rgba(0, 0, 0, .5), rgba(0, 0, 0, 0));
        transition: .5s linear;
    }
    
    .thumb {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        margin-left: -12px;
        border: 1px solid ${props => props.theme.palette.exchBarItemBorder};
        background: ${props => props.theme.palette.exchBarItemBg};
        border-radius: 6px;
        width: 24px;
        height: 100%;
        transition: .5s linear;
    }
`;

export const ItemProgressBar = ({ hover, color, progress }) => {
    let color1 = 'red';
    let color2 = '';

    if (Array.isArray(color) && color.length) {
        color1 = color[0];
        color2 = color[1] || null;
    } else {
        color1 = color;
    }

    return (
        <ItemProgressBarStyleWrapper hover={hover} color={color1}>
            <div className="track">
                <div
                    className="progress"
                    style={(color1 && color2)
                        ? {
                            width: `calc(${progress}%)`,
                            backgroundColor: color1,
                            background: `linear-gradient(to left, ${color1}, ${color2})`,
                        }
                        : {
                            width: `calc(${progress}%)`,
                            backgroundColor: color1,
                        }
                    }
                />
            </div>
            {/* <div className="thumb" style={{
                left: `${progress}%`,
                background: color,
            }}/> */}
        </ItemProgressBarStyleWrapper>
    );
};

const LargeIcon = styled.svg`
    width: 100px;
    fill: ${props => props.theme.palette.clrPurple};
    
    @media (max-width: 1700px) {
        width: 70px;
    }
    
    @media (max-width: 1600px) {
        width: 60px;
    }
    
    @media (max-width: 1024px) {
        width: 54px;
    }
`;

export const ArrowIcon = props => (
    <Fragment>
        <LargeIcon
            className="top-bar__icon"
            viewBox="0 0 180 30"
            role="img"
            aria-hidden="true"
            {...props}
        >
            <polygon points="180,15 161,0 161,10 0,10 0,20 161,20 161,30 " />
        </LargeIcon>
    </Fragment>
);

const LargeIcon1 = styled.svg`
    width: 23px;
    fill: ${props => props.theme.palette.clrBorder};
`;

export const ArrowIcon1 = props => (
    <Fragment>
        <LargeIcon1
            className="top-bar__icon"
            viewBox="0 0 3.175 1.5875"
            role="img"
            aria-hidden="true"
            {...props}
        >
            <g transform="translate(0 -295.41)">
                <path d="m0.072164 296.49h2.1819v0.43298c0 0.0193 0.0071 0.0364 0.021441 0.0506 0.014335 0.0143 0.03112 0.0215 0.050722 0.0215 0.020951 0 0.038226-6e-3 0.051825-0.0202l0.72164-0.72176c0.013477-0.0135 0.020216-0.0308 0.020216-0.0519 0-0.0209-0.00674-0.0382-0.020338-0.0518l-0.71919-0.71931c-0.018133-0.0149-0.036144-0.0226-0.054276-0.0226-0.021074 0-0.038349 6e-3 -0.051703 0.0202-0.013476 0.0135-0.020338 0.0308-0.020338 0.052v0.43298h-2.1819c-0.019603 0-0.03651 7e-3 -0.050722 0.0213s-0.021441 0.03116-0.021441 0.05088v0.43285c0 0.0195 0.0072306 0.0364 0.021441 0.0509 0.014212 0.0141 0.03112 0.0213 0.050722 0.0213"/>
            </g>
        </LargeIcon1>
    </Fragment>
);

export const ExCellTable = styled.div`
    height: 100%;
    ${props => props.isDonutMode ? `
        position: absolute !important;
        top: 0;
        left: 0;
        width: 50%;
    ` : ''};
`;

export const ExCellContainer = styled.div`
    position: relative;
    height: ${props => props.isDonutMode ? '100%' : 'calc(100% - 72px)'};
    margin-top: ${props => props.isDonutMode ? '0' : '12px'};
    border: 1px solid ${props => props.theme.palette.clrBorder};
    // border-right: 1px solid ${props => props.theme.palette.clrBorder};
    // border-top: 0;
    border-radius: ${props => props.theme.palette.borderRadius};
    
    .ps__rail-y {
        background-color: ${props => props.theme.palette.walletScrollBack} !important;
        // border-left: 1px solid ${props => props.theme.palette.walletScrollBorder};
        border-top: 1px solid ${props => props.theme.palette.clrBorder};
        opacity: 0 !important;
        
        .ps__thumb-y {
            z-index: 9999;
            cursor: pointer;
            
            &:before {
                background-color: ${props => props.theme.palette.walletScrollThumbBack};
            }
        }
    }
    
    .scroll__scrollup {
        right: 21px !important;
        z-index: 100;
    }
    
    .exchange_cells {
        padding-right: ${props => props.hasPadding ? '15px' : 0};
        height: 100%;
        // border-top: 1px solid ${props => props.theme.palette.clrBorder};
    }
`;

export const TopSwitchWrapper = styled.div`
    border-bottom: 1px solid ${props => props.theme.palette.clrBorder};
    height: 54px;
    overflow: hidden;
`;

export const StyleWrapper = styled.div`
    width: ${props => props.width}px;
    height: ${props => props.height}px;
`;
export const ExchangeInfoWrapper = styled.div.attrs({ className: 'exchange-info-wrapper' })`
    height: 100%;
    margin-right: 10px;
    display: flex;
    align-items: center;
    border-right: 1px solid ${props => props.theme.palette.clrInnerBorder};
    ${IconStyleWrapper} {
        padding-right: 10px;
    }
    ${props => props.active && `color: ${props.theme.palette.clrHighContrast};`}
    .exchange-name {
        width: 117px;
        font-size: 20px;
        font-weight: bold;
        overflow: hidden;
        text-overflow: ellipsis;
        padding-right: 10px;
        ${props => props.active && `color: ${props.theme.palette.clrHighContrast};`}
    }
    .display-flex {
        width: 100%;
        height: 100px;
        display: flex;
        align-items: center;
    }
`;