import React, { Component, Fragment } from 'react';
import { compose, withProps } from 'recompose';
import { inject, observer } from 'mobx-react';
// import { FormattedMessage } from 'react-intl';

import TradingViewToggleButton from '../TradingViewToggleButton';
import { STORE_KEYS } from '../../../stores';
import { viewModeKeys } from '../../../stores/ViewModeStore';
import { formatStringForMKTCAP, unifyDigitString, numberWithCommas } from '../../../utils';
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
    SectionValue
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
            exchanges, getActiveExchanges, marketExchanges, maxHeight, tradingViewMode,
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

                let rate = getLocalCurrency(selectedBase) === getLocalCurrency(selectedQuote) ?
                    1 :
                    numberWithCommas(getDefaultPrice(price, selectedQuote));

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
                        <Wrapper isGlobal={true} className="price-labels-wrapper">
                            <StatusSection>
                                {!isGlobal && (
                                    <Fragment>
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
                                            <div>
                                                &nbsp;<span>{`${getLocalCurrency(selectedBase)}/`}</span>
                                            </div>
                                            <CurrencyDropdownWithSymbol
                                                alignRight={false}
                                                coinSize={25}
                                                showFiat={false}
                                                symbolSize={33}
                                                symbol={true}
                                                disableCrypto
                                            />
                                        </SectionTitle>
                                        &nbsp;
                                        <SectionValue>
                                            <CoinPriceBox>
                                                <LabelPrice>
                                                    {rate}
                                                </LabelPrice>
                                                <div>
                                                    {activeCoin !== '' && (
                                                        <span className={percentClassName}>
                                                            {changeInPercentSign + Math.abs(changeInPercent.toFixed(2))}%
                                                        </span>
                                                    )}
                                                </div>
                                            </CoinPriceBox>
                                        </SectionValue>
                                    </Fragment>
                                )}
                                <TradingViewToggleButton />
                            </StatusSection>
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
                tradingViewMode,
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
            tradingViewMode,
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
