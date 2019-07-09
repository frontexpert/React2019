import React, { Component, Fragment } from 'react';
import { AutoSizer } from 'react-virtualized';
import styled from 'styled-components/macro';
import { compose, withProps } from 'recompose';
import { inject, observer } from 'mobx-react';
import { Swipeable } from 'react-swipeable';

import BuyBook from './BuyBook';
import SellBook from './SellBook';
import ExchangeListComponent from '../SideHeader/ExchangeListComponent';
import { STORE_KEYS } from '@/stores';
import DataLoader from '@/components-generic/DataLoader';
import { ORDER_BOOK_ROWS_COUNT } from '@/config/constants';

const defaultCellMaxNumberOfDigits = 9;
const defaultPriceMaxNumberOfDigits = 7;

const OrderBookWrapper = styled.div`
    padding: ${props => props.theme.palette.gapSize};
`;

class OrderBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
        };
    }

    swipeHandler = event => {
        const { setPageIndexOfSmart, setIsPayApp, setArbMode } = this.props;

        if (event.dir === 'Left') {
            setPageIndexOfSmart(1);
            setIsPayApp(true);
        } else if (event.dir === 'Right') {
            this.setState({
                isLoading: true,
            });
            setPageIndexOfSmart(-1);
            setIsPayApp(false);
            setArbMode(true);
        }
    };

    setSettingsExchangeViewMode = event => {
        const {
            isLoggedIn,
            isUserDropDownOpen,
            setUserDropDownOpen,
            setSettingsExchangeViewMode,
            setAppStoreDropDownOpen,
        } = this.props;

        if (isLoggedIn) {
            setUserDropDownOpen(!isUserDropDownOpen);
            setSettingsExchangeViewMode(true);
            setAppStoreDropDownOpen(false);
        }
    };

    render() {
        const {
            selectAsk,
            selectBid,
            selectExchangeActive,
            setExchangeActive,
            toggleExchangeViewMode,
            isExchangeViewMode,
            exchangeSearchValue,
            updateOrderBookBreakdownByExchange,
            openOrderBook,
            maxAskPrice,
            maxBidPrice,
            maxOrderSize,
            totalOrderSize
        } = this.props;
        const { isLoading } = this.state;

        return (
            <AutoSizer onResize={updateOrderBookBreakdownByExchange}>
                {({ height, width }) => {

                    const priceLimit = Math.max(maxBidPrice, maxAskPrice);
                    const amountIntLength = `${parseInt(maxOrderSize, 10)}`.length;
                    const amountFractionDigits = Math.max(defaultCellMaxNumberOfDigits - amountIntLength, 0);
                    const amountQuoteIntLength = `${parseInt(totalOrderSize, 10)}`.length;
                    const amountQuoteFractionDigits = Math.max(defaultCellMaxNumberOfDigits - amountQuoteIntLength, 0);
                    const priceIntLength = `${parseInt(priceLimit, 10)}`.length;
                    const priceFractionDigits = priceIntLength > 3 ? 2 : Math.max(defaultPriceMaxNumberOfDigits - priceIntLength, 0);
                    // x2 - for asks and bids. +1 for the header
                    const rowHeight = height / (ORDER_BOOK_ROWS_COUNT * 2 + 1);

                    if (isLoading) {
                        return false;
                    }

                    return (
                        <Swipeable onSwiped={eventData => this.swipeHandler(eventData)}>
                            {!isExchangeViewMode &&
                                <Fragment>
                                    <SellBook
                                        width={width}
                                        height={rowHeight * 10}
                                        rowHeight={rowHeight}
                                        rowCount={10}
                                        onSelect={selectAsk}
                                        amountIntLength={amountIntLength}
                                        amountFractionDigits={amountFractionDigits}
                                        amountQuoteIntLength={amountQuoteIntLength}
                                        amountQuoteFractionDigits={amountQuoteFractionDigits}
                                        priceIntLength={priceIntLength}
                                        priceFractionDigits={priceFractionDigits}
                                    />
                                    <BuyBook
                                        width={width}
                                        height={rowHeight * 11}
                                        rowHeight={rowHeight}
                                        rowCount={11}
                                        onSelect={selectBid}
                                        setSettingsExchangeViewMode={this.setSettingsExchangeViewMode}
                                        amountIntLength={amountIntLength}
                                        amountFractionDigits={amountFractionDigits}
                                        amountQuoteIntLength={amountQuoteIntLength}
                                        amountQuoteFractionDigits={amountQuoteFractionDigits}
                                        priceIntLength={priceIntLength}
                                        priceFractionDigits={priceFractionDigits}
                                    />
                                </Fragment>
                            }
                            {isExchangeViewMode && (
                                <ExchangeListComponent
                                    isFromOrderBook
                                    searchValue={exchangeSearchValue}
                                    selectExchangeActive={selectExchangeActive}
                                    setExchangeActive={setExchangeActive}
                                    toggleExchangeViewMode={toggleExchangeViewMode}
                                />
                            )}
                            {isLoading &&
                                <DataLoader width={100} height={100} />
                            }
                        </Swipeable>
                    );
                }}
            </AutoSizer>
        );
    }
}

const withOrderInstruments = compose(
    inject(
        STORE_KEYS.ORDERBOOKBREAKDOWN,
        STORE_KEYS.ORDERENTRY,
        STORE_KEYS.EXCHANGESSTORE,
        STORE_KEYS.VIEWMODESTORE,
        STORE_KEYS.CONVERTSTORE,
        STORE_KEYS.TELEGRAMSTORE
    ),
    observer,
    withProps(
        ({
            [STORE_KEYS.ORDERBOOKBREAKDOWN]: {
                updateOrderBookBreakdownByExchange,
                maxAskPrice,
                maxBidPrice,
                maxOrderSize,
                totalOrderSize,
            },
            [STORE_KEYS.ORDERENTRY]: { selectAsk, selectBid },
            [STORE_KEYS.EXCHANGESSTORE]: { setExchangeActive, selectExchangeActive, exchangeSearchValue },
            [STORE_KEYS.CONVERTSTORE]: { setForceStartArbitrageExchange },
            [STORE_KEYS.VIEWMODESTORE]: {
                isExchangeViewMode,
                toggleExchangeViewMode,
                setSettingsExchangeViewMode,
                setAppStoreDropDownOpen,
                setPageIndexOfSmart,
                setIsPayApp,
                isUserDropDownOpen,
                setUserDropDownOpen,
                setArbMode,
            },
            [STORE_KEYS.TELEGRAMSTORE]: {
                isLoggedIn,
            },
        }) => ({
            selectAsk,
            selectBid,
            setExchangeActive,
            selectExchangeActive,
            updateOrderBookBreakdownByExchange,
            isExchangeViewMode,
            setForceStartArbitrageExchange,
            toggleExchangeViewMode,
            setSettingsExchangeViewMode,
            setAppStoreDropDownOpen,
            setPageIndexOfSmart,
            setIsPayApp,
            exchangeSearchValue,
            isUserDropDownOpen,
            setUserDropDownOpen,
            isLoggedIn,
            maxAskPrice,
            maxBidPrice,
            maxOrderSize,
            totalOrderSize,
            setArbMode,
        })
    )
);

export default withOrderInstruments(OrderBook);
