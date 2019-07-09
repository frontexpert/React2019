import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import GradientButton from '../../../components-generic/GradientButtonArrow';

const ArbitrageSignsWrapper = styled.div`
    position: absolute;
    height: 0;
    width: ${props => props.width}px;
    bottom: 40px;

    div.portfolio-value {
        position: absolute;
        top: 0;
        color: #FFF;
        font-size: 20px;
        font-weight: 600;
        margin-top: 7px;

        &.before {
            left: 3%;
        }
        
        &.after {
            right: 3%;
        }
    }

`;

const ArbitrageCoinsWrapper = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 100%;

    button.arbitrage-button {
        width: 180px;
        margin-right: 13px;
        // background: ${props => props.theme.palette.arbitrageBtnBg};

        &.primary-solid {
            &:hover {
                .gradient-button__label {
                    &, & * {
                        color: #FFF !important;
                    }
                }
            }
        }

        &:hover {
            filter: brightness(130%);
        }

        &:active {
            filter: brightness(80%);
        }
    }

    svg {
        width: 50px;
        height: 20px;
        fill:  #BB2424;
        margin-right: -5px;
    }

    svg.buy {
        fill:  #01AC67 !important;
    }

    img {
        width: 40px;
        height: 40px;
        box-shadow: 0px 0px 10px 4px rgba(0, 0, 0, 0.4);
        margin-right: 20px;
        border-radius: 20px;
        color: #FFF;
        filter: grayscale(1);
    }

    img:first-child {
        margin-left: 7px;
    }

    img:last-child {
        margin-right: 0px;
    }

    .arbitrage-button {
        cursor: pointer;
    } 
`;

export const BuySigns = ({
    baseCur, quoteCur, buyPrice, sellPrice, coinPrice, totalAccountBalance, height, width, left, value, sellLeft, isArbitrageSigns, overLapLeft, overLapWidth, runArbitrage,
}) => {
    const arbitrageSignsY = 28;

    let horizontalClass = 'center';
    let wrapperleft = 0;
    if (left - sellLeft < 175 || left < 90) {
        horizontalClass = 'right';
    }

    if (isArbitrageSigns) {
        // wrapperleft = overLapLeft + overLapWidth;
        horizontalClass = 'normal';
        wrapperleft = left < 0 ? 0 : left;

        // temp code to enable Arbitrage benefit
        if (sellPrice > buyPrice) {
            const temp = sellPrice;
            sellPrice = buyPrice;
            buyPrice = temp;
        }

        /**
         * calc arbitrage benefit
         */
        const quoteCurAmount1 = coinPrice > 0 ? (totalAccountBalance / coinPrice) : 0;
        const baseCurAmount = sellPrice > 0 ? (quoteCurAmount1 / sellPrice) : 0;
        const quoteCurAmount2 = baseCurAmount * buyPrice;
        const newTotalAccountBalance = quoteCurAmount2 * coinPrice;
        const balanceLabel = parseInt(totalAccountBalance).toLocaleString('en');
        const newBalanceLabel = parseInt(newTotalAccountBalance).toLocaleString('en');

        return (
            <ArbitrageSignsWrapper width={width}>
                <div className="portfolio-value before">${balanceLabel}</div>

                <ArbitrageCoinsWrapper translateY={arbitrageSignsY} left={wrapperleft}>
                    <img src={'img/coin/coin-' + quoteCur.toLowerCase() + '.svg'} alt={quoteCur}/>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="20 0 52.86 20.79">
                        <polygon points="1.7 13.1 42.89 13.1 42.89 16.61 50.01 10.44 42.89 4.18 42.89 7.88 1.87 7.88 0.17 5.98 40.99 5.98 40.99 0 52.86 10.44 40.99 20.79 40.99 15 0 15 1.7 13.1"/>
                    </svg>
                    <img src={'img/coin/coin-' + baseCur.toLowerCase() + '.svg'} alt={baseCur}/>
                    <GradientButton
                        className="arbitrage-button primary-solid"
                        onClick={() => {
                            console.log('Clicked Arbitrage button!');
                            runArbitrage();
                        }}
                        disabled={false}
                        height={40}
                    >
                        <span className="btn-text-arbitrage">
                            <FormattedMessage
                                id="depth_chart.label_arbitrage"
                                defaultMessage="ARBITRAGE"
                            />
                        </span>
                    </GradientButton>

                    <img src={'img/coin/coin-' + baseCur.toLowerCase() + '.svg'} alt={baseCur}/>
                    <svg className="buy" xmlns="http://www.w3.org/2000/svg" viewBox="20 0 52.86 20.79">
                        <polygon points="1.7 13.1 42.89 13.1 42.89 16.61 50.01 10.44 42.89 4.18 42.89 7.88 1.87 7.88 0.17 5.98 40.99 5.98 40.99 0 52.86 10.44 40.99 20.79 40.99 15 0 15 1.7 13.1"/>
                    </svg>
                    <img src={'img/coin/coin-' + quoteCur.toLowerCase() + '.svg'} alt={quoteCur}/>
                </ArbitrageCoinsWrapper>

                <div className="portfolio-value after">${newBalanceLabel}</div>
            </ArbitrageSignsWrapper>
        );
    }

    wrapperleft = left < 0 ? 0 : left;

    return (
        <div></div>
    );

};

export default BuySigns;
