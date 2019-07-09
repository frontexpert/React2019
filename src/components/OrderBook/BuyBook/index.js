import React, { useState } from 'react';
import { Column } from 'react-virtualized';

import MarketDataTable from '@/components-generic/MarketDataTable';
import { withOrderFormToggleData } from '@/hocs/OrderFormToggleData';
import ToggleButton from './ToggleButton';
import TotalBaseHeader from './TotalBaseHeader';
import TotalQuoteHeader from './TotalQuoteHeader';
import PriceHeader from './PriceHeader';
import { STORE_KEYS } from '@/stores';
import {
    progressCellRenderer,
    priceCellRenderer,
    amountCellRenderer,
    exchangeCellRenderer,
    cellRenderer
} from '../Cells/cellRenderers';
import ExchangesLabel from '@/components/OrderTabs/ExchangesLabel';
import { getScreenInfo, getOrderBookColumnWidth } from '@/utils';

let selectedOrderIndex = -1;
const IS_MOBILE_PORTRAIT = getScreenInfo().isMobilePortrait;

const BuyBook = ({
    width,
    height,
    onSelect,
    bids,
    rowHeight = 30,
    rowCount,
    selectedQuote,
    selectedBase,
    setSettingsExchangeViewMode,
    maxBidPrice,
    minBidPrice,
    totalOrderAmount,
    totalOrderSize,
    manualOrderBookHoverItem,
    amountIntLength,
    amountFractionDigits,
    amountQuoteIntLength,
    amountQuoteFractionDigits,
    priceIntLength,
    priceFractionDigits
}) => {
    const bidsToShow = bids.slice(0, 10);
    const [hoverIdx, setHoverIdx] = useState(-1);
    const hoverRowIdx =
        manualOrderBookHoverItem && manualOrderBookHoverItem.type === 'buy' ? manualOrderBookHoverItem.index : hoverIdx;

    return (
        <MarketDataTable
            width={width}
            height={height}
            disableHeader={false}
            rowHeight={rowHeight}
            data={bidsToShow}
            rowCount={rowCount}
            isBuy
            priceFractionDigits={priceFractionDigits}
            id="global-order-buy-book"
            onRowClick={e => {
                if (!IS_MOBILE_PORTRAIT) {
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
                }
            }}
            onRowMouseOver={e => setHoverIdx(e.index)}
            onRowMouseOut={() => setHoverIdx(-1)}
        >
            <Column
                width={getOrderBookColumnWidth(width, 'exchange')}
                dataKey="exchange"
                headerRenderer={() => (
                    <ToggleButton
                        text={<ExchangesLabel className="exchanges-label" />}
                        onClick={setSettingsExchangeViewMode}
                    />
                )}
                cellRenderer={cellRenderer(exchangeCellRenderer(true))}
            />

            <Column
                width={getOrderBookColumnWidth(width, 'amount')}
                dataKey="amount"
                style={{ justifyContent: 'flex-end' }}
                headerStyle={{ position: 'relative' }}
                headerRenderer={() => (
                    <TotalBaseHeader
                        coin={selectedBase}
                        amount={totalOrderAmount}
                        intLength={amountIntLength}
                        fractionDigits={amountFractionDigits}
                    />
                )}
                cellRenderer={cellRenderer(
                    amountCellRenderer(amountIntLength, amountFractionDigits, hoverRowIdx, true, selectedBase)
                )}
            />

            <Column
                width={getOrderBookColumnWidth(width, 'amountQuote')}
                dataKey="amountQuote"
                style={{ justifyContent: 'flex-end' }}
                headerRenderer={() => (
                    <TotalQuoteHeader
                        coin={selectedQuote}
                        amount={totalOrderSize}
                        intLength={amountQuoteIntLength}
                        fractionDigits={amountQuoteFractionDigits}
                    />
                )}
                cellRenderer={cellRenderer(
                    amountCellRenderer(
                        amountQuoteIntLength,
                        amountQuoteFractionDigits,
                        hoverRowIdx,
                        true,
                        selectedQuote
                    )
                )}
            />

            <Column
                width={0}
                dataKey="price"
                cellRenderer={cellRenderer(progressCellRenderer(width, true, maxBidPrice, minBidPrice))}
                style={{ padding: 0, border: 0 }}
                headerStyle={{ display: 'none' }}
            />

            <Column
                width={getOrderBookColumnWidth(width, 'price')}
                dataKey="price"
                style={{ justifyContent: 'flex-end' }}
                headerStyle={{ justifyContent: 'flex-end' }}
                headerClassName="price-header"
                headerRenderer={() => <PriceHeader intLength={priceIntLength} fractionDigits={priceFractionDigits} />}
                cellRenderer={cellRenderer(priceCellRenderer('buy', priceIntLength, priceFractionDigits, hoverRowIdx))}
            />
        </MarketDataTable>
    );
};

export default withOrderFormToggleData(stores => {
    const {
        [STORE_KEYS.ORDERBOOKBREAKDOWN]: {
            BidsForOrderBook,
            maxBidPrice,
            minBidPrice,
            totalOrderAmount,
            totalOrderSize,
            manualOrderBookHoverItem
        }
    } = stores;
    return {
        bids: BidsForOrderBook,
        maxBidPrice,
        minBidPrice,
        totalOrderAmount,
        totalOrderSize,
        manualOrderBookHoverItem
    };
})(BuyBook);
