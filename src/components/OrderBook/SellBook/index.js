import React from 'react';
import { Column } from 'react-virtualized';
import { compose } from 'recompose';

import MarketDataTable from '../../../components-generic/MarketDataTable';
import { withOrderFormToggleData } from '../../../hocs/OrderFormToggleData';
import {
    orderProgressRenderer,
    priceCellRenderer,
    baseAmountCellRenderer,
    quoteAmountCellRenderer,
    exchangeCellRenderer
} from '../orderBookHelpers';

let selectedOrderIndex = -1;

const SellBook = ({
    width,
    height,
    asks,
    onSelect,
    rowHeight = 30,
    rowCount,
    showOrderForm,
    showDepthChartMode,
    toggleViewMode,
}) => {
    return (
        <MarketDataTable
            width={width}
            height={height}
            disableHeader={true}
            rowHeight={rowHeight}
            marketDataMap={asks}
            rowCount={rowCount}
            id="global-order-sell-book"
            onRowClick={e => {
                if (selectedOrderIndex === e.index) {
                    toggleViewMode();
                    showDepthChartMode(false);
                } else {
                    showOrderForm();
                    showDepthChartMode(true);
                }

                try {
                    if (selectedOrderIndex === e.index) {
                        selectedOrderIndex = -1;
                    } else {
                        selectedOrderIndex = e.index;
                    }
                    onSelect({ index: e.index });
                } catch (err) {
                    console.log(err.message);
                }
            }}
        >
            <Column width={width * 0.25} dataKey="Exchange" cellRenderer={exchangeCellRenderer(rowCount)} />

            <Column
                width={width * 0.25}
                dataKey="Amount"
                style={{ justifyContent: 'flex-end' }}
                cellRenderer={baseAmountCellRenderer}
            />

            <Column
                width={width * 0.25}
                dataKey="AmountQuote"
                style={{ justifyContent: 'flex-end' }}
                cellRenderer={quoteAmountCellRenderer}
            />

            <Column
                width={0}
                dataKey="progress"
                cellRenderer={orderProgressRenderer(width)}
                style={{ padding: 0, border: 0 }}
                headerStyle={{ display: 'none' }}
            />

            <Column
                width={width * 0.25}
                dataKey="Price"
                style={{ justifyContent: 'flex-end' }}
                cellRenderer={priceCellRenderer('sell')}
            />
        </MarketDataTable>
    );
};

export default compose(withOrderFormToggleData)(SellBook);
