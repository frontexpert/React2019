import React, { useState } from 'react';
import { Column } from 'react-virtualized';

import MarketDataTable from '@/components-generic/MarketDataTable';
import { withOrderFormToggleData } from '@/hocs/OrderFormToggleData';
import { STORE_KEYS } from '@/stores';
import {
    progressCellRenderer,
    priceCellRenderer,
    amountCellRenderer,
    exchangeCellRenderer,
    cellRenderer
} from '../Cells/cellRenderers';
import { getScreenInfo, getOrderBookColumnWidth } from '@/utils';

let selectedOrderIndex = -1;
const IS_MOBILE_PORTRAIT = getScreenInfo().isMobilePortrait;

const SellBook = ({
    width,
    height,
    onSelect,
    asks,
    rowHeight = 30,
    rowCount,
    showOrderForm,
    showDepthChartMode,
    selectedQuote,
    selectedBase,
    maxAskPrice,
    minAskPrice,
    manualOrderBookHoverItem,
    amountIntLength,
    amountFractionDigits,
    amountQuoteIntLength,
    amountQuoteFractionDigits,
    priceIntLength,
    priceFractionDigits
}) => {
    const asksToShow = asks.slice(0, 10);
    const [hoverIdx, setHoverIdx] = useState(-1);
    const hoverRowIdx =
        manualOrderBookHoverItem && manualOrderBookHoverItem.type === 'sell'
            ? manualOrderBookHoverItem.index
            : hoverIdx;

    return (
        <MarketDataTable
            width={width}
            height={height}
            disableHeader={true}
            rowHeight={rowHeight}
            data={asksToShow}
            rowCount={rowCount}
            isBuy={false}
            priceFractionDigits={priceFractionDigits}
            id="global-order-sell-book"
            onRowClick={e => {
                if (!IS_MOBILE_PORTRAIT) {
                    try {
                        if (selectedOrderIndex === e.index) {
                            selectedOrderIndex = -1;
                        } else {
                            selectedOrderIndex = e.index;
                            showOrderForm();
                            showDepthChartMode(true);
                        }
                        onSelect({ index: e.index });
                    } catch (err) {
                        console.log(err.message);
                    }
                }
            }}
            onRowMouseOver={(e) => setHoverIdx(e.index)}
            onRowMouseOut={() => setHoverIdx(-1)}
        >
            <Column
                width={getOrderBookColumnWidth(width, 'exchange')}
                dataKey="exchange"
                cellRenderer={cellRenderer(exchangeCellRenderer())}
            />

            <Column
                width={getOrderBookColumnWidth(width, 'amount')}
                dataKey="amount"
                style={{ justifyContent: 'flex-end' }}
                cellRenderer={cellRenderer(
                    amountCellRenderer(amountIntLength, amountFractionDigits, hoverRowIdx, false, selectedBase)
                )}
            />

            <Column
                width={getOrderBookColumnWidth(width, 'amountQuote')}
                dataKey="amountQuote"
                style={{ justifyContent: 'flex-end' }}
                cellRenderer={cellRenderer(
                    amountCellRenderer(
                        amountQuoteIntLength,
                        amountQuoteFractionDigits,
                        hoverRowIdx,
                        false,
                        selectedQuote
                    )
                )}
            />


            <Column
                width={0}
                dataKey="price"
                cellRenderer={cellRenderer(progressCellRenderer(width, false, maxAskPrice, minAskPrice))}
                style={{ padding: 0, border: 0 }}
                headerStyle={{ display: 'none' }}
            />

            <Column
                width={getOrderBookColumnWidth(width, 'price')}
                dataKey="price"
                style={{ justifyContent: 'flex-end' }}
                cellRenderer={cellRenderer(priceCellRenderer('sell', priceIntLength, priceFractionDigits, hoverRowIdx))}
            />
        </MarketDataTable>
    );
};

export default withOrderFormToggleData(stores => {
    const { AsksForOrderBook, maxAskPrice, minAskPrice, manualOrderBookHoverItem } = stores[
        STORE_KEYS.ORDERBOOKBREAKDOWN
    ];

    return {
        asks: AsksForOrderBook,
        maxAskPrice,
        minAskPrice,
        manualOrderBookHoverItem
    };
})(SellBook);
