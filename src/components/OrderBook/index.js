import React, { Fragment } from 'react';
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
        } = this.props;

        return (
            <AutoSizer>
                {({ height, width }) => {
                    const buyBookRowCount = getMaxRows(height, ROW_HEIGHT);
                    return (
                        <Fragment>
                            <SellBook
                                width={width}
                                height={buyBookRowCount * ROW_HEIGHT}
                                asks={asksForOrderBook}
                                rowHeight={ROW_HEIGHT}
                                rowCount={buyBookRowCount}
                                onSelect={selectAsk}
                                selectedExchange={selectedExchange}
                            />
                            <BuyBook
                                width={width}
                                height={height - buyBookRowCount * ROW_HEIGHT + 32}
                                bids={bidsForOrderBook}
                                rowHeight={ROW_HEIGHT}
                                rowCount={buyBookRowCount + 1}
                                onSelect={selectBid}
                                selectedExchange={selectedExchange}
                            />
                        </Fragment>
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
            },
            [STORE_KEYS.ORDERENTRY]: { selectAsk, selectBid },
            [STORE_KEYS.EXCHANGESSTORE]: { selectedExchange },
        }) => ({
            base,
            quote,
            bidsForOrderBook,
            asksForOrderBook,
            selectAsk,
            selectBid,
            selectedExchange,
            updateOrderBookBreakdownByExchange,
        })
    )
);

export default withOrderInstruments(OrderBook);
