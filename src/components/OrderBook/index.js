import React from 'react';
import { AutoSizer } from 'react-virtualized';
import { compose, withProps } from 'recompose';
import { inject, observer } from 'mobx-react';

import BuyBook from './BuyBook';
import SellBook from './SellBook';
// import Spread from './Spread';
import { STORE_KEYS } from '../../stores';
import { ROW_HEIGHT } from '../../config/constants';
import { getMaxRows } from '../../utils';

class OrderBook extends React.Component {
    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
    }

    updateDimensions = () => {
        this.props.updateOrderBookBreakdownByExchange();
    };

    render() {
        const {
            base,
            quote,
            bidsForOrderBook,
            asksForOrderBook,
            selectAsk,
            selectBid,
            selectedExchange,
            marketExchanges,
            wrapperWidth,
            wrapperHeight,
            isRegularMarket,
        } = this.props;

        return (
            <AutoSizer>
                {({ height, width }) => {
                    const buyBookRowCount = getMaxRows(height, ROW_HEIGHT);
                    return (
                        <React.Fragment>
                            <SellBook
                                width={width}
                                height={buyBookRowCount * ROW_HEIGHT - 32}
                                asks={asksForOrderBook}
                                rowHeight={ROW_HEIGHT}
                                rowCount={buyBookRowCount + 1}
                                onSelect={selectAsk}
                                base={base}
                                quote={quote}
                                selectedExchange={selectedExchange}
                            />
                            {/*
                        <Spread
                            height={42}
                            width={width - 2}
                            base={base}
                            quote={quote}
                        />
                        */}
                            <BuyBook
                                width={width}
                                height={height - buyBookRowCount * ROW_HEIGHT + 32}
                                bids={bidsForOrderBook}
                                rowHeight={ROW_HEIGHT}
                                rowCount={buyBookRowCount + 1}
                                onSelect={selectBid}
                                selectedExchange={selectedExchange}
                                exchangesCnt={marketExchanges.length}
                                wrapperWidth={wrapperWidth}
                                wrapperHeight={wrapperHeight}
                                isRegularMarket={isRegularMarket}
                            />
                        </React.Fragment>
                    );
                }}
            </AutoSizer>
        );
    }
}

const withOrderInstruments = compose(
    inject(STORE_KEYS.ORDERBOOKBREAKDOWN, STORE_KEYS.ORDERENTRY, STORE_KEYS.EXCHANGESSTORE),
    observer,
    withProps(
        ({
            [STORE_KEYS.ORDERBOOKBREAKDOWN]: {
                bidsForOrderBook,
                asksForOrderBook,
                base,
                quote,
                updateOrderBookBreakdownByExchange,
                isRegularMarket,
            },
            [STORE_KEYS.ORDERENTRY]: {
                selectAsk,
                selectBid,
            },
            [STORE_KEYS.EXCHANGESSTORE]: {
                selectedExchange,
                marketExchanges,
            },
        }) => ({
            base,
            quote,
            bidsForOrderBook,
            asksForOrderBook,
            selectAsk,
            selectBid,
            selectedExchange,
            marketExchanges,
            updateOrderBookBreakdownByExchange,
            isRegularMarket,
        })
    )
);

export default withOrderInstruments(OrderBook);
