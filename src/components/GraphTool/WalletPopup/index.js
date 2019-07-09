import React, { Component, Fragment } from 'react';
import { compose, withProps } from 'recompose';
import { inject, observer } from 'mobx-react';
// import { FormattedMessage } from 'react-intl';

import TradingViewToggleButton from '../TradingViewToggleButton';
import { STORE_KEYS } from '../../../stores';
import { viewModeKeys } from '../../../stores/ViewModeStore';
import { formatStringForMKTCAP, unifyDigitString } from '../../../utils';
import {
    CoinPriceWrapper,
    Wrapper,
    CoinPriceBox,
    VolumeCell,
    LabelPrice,
    GlobalIcon,
    Logo,
    LogoWrapper,
    GlobalIconNew,
    StatusSection,
    SectionTitle,
    SectionValue,
    GlobalLabel
} from './Components';
import CurrencyDropdownWithSymbol from '../../../components-generic/CurrencyDropdown/CurrencyDropdownWithSymbol';
// import SmallLinks from './SmallLinks';
// import IconList from './SmallLinks/IconList';

class WalletPopup extends Component {
    state = {};

    render() {
        const {
            OrderEventsData, selectedCoin, changeInPercent, baseSymbol : selectedBase, quoteSymbol : selectedQuote,
            price, isGlobal, viewMode, isLoggedIn, getDefaultPrice, getLocalCurrency, selectedExchange, baseFiatPrice,
            exchanges, getActiveExchanges, marketExchanges, maxHeight,
        } = this.props;

        let activeCoin = (viewMode === viewModeKeys.advancedModeKey) ? selectedBase : selectedCoin;
        if (viewMode === viewModeKeys.exchangesModeKey && !isLoggedIn) {
            activeCoin = '';
        }

        for (let [key, data] of OrderEventsData) {
            if (data.Coin === activeCoin) {
                // const deltaPrice = Number.parseFloat(data.Price) - Number.parseFloat(data.Change);
                // const changeInPercent = deltaPrice !== 0 ? (Number.parseFloat(data.Price) / deltaPrice - 1) * 100 : 0;
                const changeInPercentSign = changeInPercent >= 0 ? '+' : changeInPercent < 0 ? '-' : '';
                const percentClassName = `change-in-percent ${(changeInPercent >= 0 ? ' positive' : ' negative')}`;
                const priceClassName = `price ${(changeInPercent >= 0 ? ' positive' : ' negative')}`;

                const isBCT = data.Coin === 'BCT';

                const marketCap = data.Marketcap;
                const volume24h = data.Volume24h;
                const Price = data.Price;
                let rate = unifyDigitString(getDefaultPrice(price, selectedQuote));

                let ratioPriceLeft = 1;
                let ratioPriceRight = rate;
                if (price < 1 && price !== 0) {
                    ratioPriceLeft = rate;
                    ratioPriceRight = 1;
                }


                let selectedTableItem = null;
                let activeExchanges = 0;
                let activeExchange = '';
                for (let i = 0; i < marketExchanges.length; i++) {
                    if (marketExchanges[i].name !== 'Global' && exchanges[marketExchanges[i].name] && exchanges[marketExchanges[i].name].active) {
                        activeExchanges++;
                        activeExchange = marketExchanges[i].name;
                        selectedTableItem = marketExchanges[i];
                    }
                }
                const activeMarketExchanges = marketExchanges.filter(m => m.status === 'active');
                const countExchange = (activeExchanges === 0) ? activeMarketExchanges.length : activeExchanges;
                if (this.props.value === 'Global' && activeExchanges === 0 && activeMarketExchanges.length === 1) {
                    for (let i = 0; i < marketExchanges.length; i++) {
                        if (marketExchanges[i].name !== 'Global' && marketExchanges[i].status === 'active') {
                            selectedTableItem = marketExchanges[i];
                        }
                    }
                }

                const selectedIcon = (selectedTableItem && selectedTableItem.icon) || null;
                const selectedName = (selectedTableItem && selectedTableItem.name) || null;

                return price ? (
                    <div>
                        {/*
                        <CoinPriceWrapper isGlobal={isGlobal} className="price-labels-wrapper">
                            {(selectedExchange.name === 'Global' && activeCoin !== '')
                                ? (
                                    <GlobalIcon/>
                                ) : (
                                    <LogoWrapper>
                                        <Logo src={`/img/exchange/${selectedExchange.icon}`} alt=""/>
                                    </LogoWrapper>
                                )
                            }

                            <CoinPriceBox>
                                <LabelPrice>
                                    <span>{ratioPriceLeft} {getLocalCurrency(selectedBase)} = {ratioPriceRight} {getLocalCurrency(selectedQuote)}</span>
                                </LabelPrice>
                            </CoinPriceBox>
                        </CoinPriceWrapper>
                        */}

                        <Wrapper isGlobal={true} className="price-labels-wrapper">
                            <StatusSection>
                                <SectionTitle>
                                    {(countExchange !== 1 || selectedName === '')
                                        ? (
                                            <GlobalIconNew/>
                                        ) : (
                                            <LogoWrapper>
                                                <Logo src={`/img/exchange/${selectedIcon}`} alt=""/>
                                            </LogoWrapper>
                                        )
                                    }
                                    <GlobalLabel>{getActiveExchanges(exchanges)}</GlobalLabel>
                                    <span>{`(${getLocalCurrency(selectedBase)}/${getLocalCurrency(selectedQuote)})`}&nbsp;</span>
                                </SectionTitle>

                                <SectionValue>
                                    <CoinPriceBox>
                                        <CurrencyDropdownWithSymbol
                                            alignRight={false}
                                            coinSize={33}
                                            symbolSize={33}
                                            maxHeight={maxHeight}
                                        />

                                        <LabelPrice>
                                            {rate}
                                        </LabelPrice>
                                        <div>
                                            {activeCoin !== '' && (
                                                <span className={percentClassName}>
                                                    {changeInPercentSign + Math.abs(changeInPercent.toFixed(2))}%

                                                    {/* <svg className="sprite-icon close" role="img" aria-hidden="true">
                                                        <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="img/sprite-basic.svg#arrow-drop"/>
                                                    </svg> */}
                                                </span>
                                            )}
                                        </div>
                                    </CoinPriceBox>
                                </SectionValue>
                                <TradingViewToggleButton />
                            </StatusSection>

                            {/*
                            <StatusSection>
                                <SectionTitle className="setAlignCenter">
                                    <span>
                                        {getLocalCurrency(selectedBase)}&nbsp;
                                        <FormattedMessage
                                            id="graph_tool.wallet_popup.label_mrkt_cup"
                                            defaultMessage="Mkt Cap"
                                        />
                                    </span>
                                </SectionTitle>
                                <SectionValue>
                                    {activeCoin !== '' && (
                                        <VolumeCell>
                                            {(marketCap > 0.0001 && !isBCT) ? (
                                                <CurrencyDropdownWithSymbol
                                                    alignRight={false}
                                                    coinSize={25}
                                                />
                                            ) : 'N/A'}
                                            {formatStringForMKTCAP(getDefaultPrice(marketCap, selectedQuote))}
                                        </VolumeCell>
                                    )}
                                </SectionValue>
                            </StatusSection>

                            <StatusSection>
                                <SectionTitle className="setAlignCenter">
                                    <span>
                                        {getLocalCurrency(selectedBase)}&nbsp;
                                        <FormattedMessage
                                            id="graph_tool.wallet_popup.label_volume"
                                            defaultMessage="Vol. (24hr)"
                                        />
                                    </span>
                                </SectionTitle>
                                <SectionValue>
                                    <VolumeCell>
                                        <div className="value">
                                            {volume24h > 0.0001 ? (
                                                <CurrencyDropdownWithSymbol
                                                    alignRight={false}
                                                    coinSize={25}
                                                />
                                            ) : 'N/A'}
                                        </div>
                                        {formatStringForMKTCAP(getDefaultPrice(volume24h, selectedQuote))}
                                    </VolumeCell>
                                </SectionValue>
                            </StatusSection>

                            {activeCoin !== '' && (
                                <StatusSection>
                                    <SectionTitle className="setAlignCenter">
                                        <span>{getLocalCurrency(selectedBase)}</span>
                                    </SectionTitle>
                                    <SectionValue className="linkWrapper">
                                        <SmallLinks />
                                    </SectionValue>
                                </StatusSection>
                            )}
                            */}
                        </Wrapper>
                    </div>
                ) : <Fragment/>;
            }
        }

        return null;
    }
}

export default compose(
    inject(
        STORE_KEYS.YOURACCOUNTSTORE,
        STORE_KEYS.ORDERBOOK,
        STORE_KEYS.PRICECHARTSTORE,
        STORE_KEYS.VIEWMODESTORE,
        STORE_KEYS.TELEGRAMSTORE,
        STORE_KEYS.SETTINGSSTORE,
        STORE_KEYS.EXCHANGESSTORE,
    ),
    observer,
    withProps(
        ({
            [STORE_KEYS.YOURACCOUNTSTORE]: {
                OrderEventsData,
                selectedCoin,
                changeInPercent,
            },
            [STORE_KEYS.ORDERBOOK]: {
                base : baseSymbol,
                quote : quoteSymbol,
            },
            [STORE_KEYS.PRICECHARTSTORE]: {
                price,
            },
            [STORE_KEYS.VIEWMODESTORE]: {
                viewMode,
            },
            [STORE_KEYS.TELEGRAMSTORE]: {
                isLoggedIn,
            },
            [STORE_KEYS.SETTINGSSTORE]: {
                getDefaultPrice,
                getLocalCurrency,
                price: baseFiatPrice,
            },
            [STORE_KEYS.EXCHANGESSTORE]: {
                selectedExchange,
                exchanges,
                getActiveExchanges,
                marketExchanges,
            },
        }) => ({
            OrderEventsData,
            selectedCoin,
            changeInPercent,
            baseSymbol,
            quoteSymbol,
            price,
            viewMode,
            isLoggedIn,
            getDefaultPrice,
            baseFiatPrice,
            getLocalCurrency,
            selectedExchange,
            exchanges,
            getActiveExchanges,
            marketExchanges,
        })
    )
)(WalletPopup);
