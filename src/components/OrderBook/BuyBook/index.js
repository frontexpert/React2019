import React from 'react';
import { Column } from 'react-virtualized';
import { compose } from 'recompose';
// import styled from 'styled-components';
// import { Tooltip } from 'react-tippy';

import MarketDataTable from '../../../components-generic/MarketDataTable';
import { withOrderFormToggleData } from '../../../hocs/OrderFormToggleData';
// import ExchangeSelectorWrapper from './ExchangeSelectorWrapper';
// import CoinIcon from '../../../components-generic/CoinIcon';
// import PriceHeaderLabel from './PriceHeaderLabel';
import TotalBaseHeader from './TotalBaseHeader';
import TotalQuoteHeader from './TotalQuoteHeader';
import PriceHeader from './PriceHeader';
import {
    orderProgressRenderer,
    priceCellRenderer,
    baseAmountCellRenderer,
    quoteAmountCellRenderer,
    exchangeCellRenderer
} from '../orderBookHelpers';

let selectedOrderIndex = -1;

// const Text = styled.div.attrs({ className: 'buy-book-header-text' })`
//     width: 100%;
//     white-space: nowrap;
//     font-size: 15px;
//     font-weight: 700;
//     color: ${props => props.theme.palette.orderBookTableHeaderText};
//     overflow: hidden;

//     span {
//         height: unset !important;
//         line-height: 1em !important;
//         font-size: 12px;
//         font-weight: 300;
//         color: ${props => props.theme.palette.orderBookTableHeaderText2};
//     }
// `;

// const TotalWithExchangeCellWrapper = styled.div`
//     display: flex;
//     flex-direction: row;
//     align-items: center;
//     justify-content: center;
//     width: 100%;

//     .text-wrapper {
//         flex: 1;
//         display: flex;
//         align-items: center;
//         justify-content: center;
//     }
// `;

// const HeaderWrapper = styled.div`
//     width: 100%;
//     height: 100%;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     color: ${props => props.theme.palette.clrPurple};

//     span {
//         height: unset !important;
//         margin-left: 4px;
//     }
// `;

// Shauns request to have +1 if 0 since we will have our own exchange
// const exchangeCountCellRenderer = ObservedCellRenderer(({ data: [, , exchange] }) => {
//     const exchanges = exchange.split(',');
//     const exchangesCount = exchanges.length - 1 || 0;

//     const exchangesMock = [
//         'BITFINEX',
//         'ETORO',
//         '24 OPTION',
//         'COINBULL',
//         'LUNO',
//         'PAXFOREX',
//         'BINANCE',
//         'COINBASE',
//         'LOCALBITCOINS',
//         'CEX IO',
//         'CHANGELLY'
//     ];
//     const exchangesMockCount = exchangesMock.length;
//     return <AmountCell>{exchangesMockCount === 0 ? '+ 1' : `+ ${exchangesMockCount}`}</AmountCell>;
// });

// const headerRenderer = (coin, tooltipText) => () => {
//     return (
//         <Tooltip
//             arrow={true}
//             animation="fade"
//             position="right"
//             placement="right"
//             distance={20}
//             theme="bct"
//             className="full-width"
//             html={<div>{tooltipText}</div>}
//             popperOptions={{
//                 modifiers: {
//                     preventOverflow: {
//                         enabled: false,
//                     },
//                     flip: {
//                         enabled: false,
//                     },
//                     hide: {
//                         enabled: false,
//                     },
//                 },
//             }}
//         >
//             <HeaderWrapper>{coin}</HeaderWrapper>
//         </Tooltip>
//     );
// };
// const headerRenderer = (label, data, lineBreak) => (cellData) => {
//     let header = <Text>{label}</Text>;
//     if (data) {
//         const className = lineBreak ? 'line-break' : '';
//         header = <Text className={className}>{label} <span>{data}</span></Text>;
//     }
//     return header;
// };

// const priceHeaderRenderer = (base, quote) => () => {
//     return (
//         <Tooltip
//             arrow={true}
//             animation="fade"
//             position="right"
//             placement="right"
//             distance={20}
//             theme="bct"
//             className="full-width"
//             html={
//                 <div className="advanced-tooltip text-left">
//                     Price ({base} / {quote})
//                 </div>
//             }
//             popperOptions={{
//                 modifiers: {
//                     preventOverflow: {
//                         enabled: false,
//                     },
//                     flip: {
//                         enabled: false,
//                     },
//                     hide: {
//                         enabled: false,
//                     },
//                 },
//             }}
//         >
//             <HeaderWrapper>
//                 <PriceHeaderLabel />
//             </HeaderWrapper>
//         </Tooltip>
//     );
// };

// const TotalWithExchangeHeaderRenderer = (
//     label,
//     data,
//     lineBreak,
//     isGlobalExchange,
//     wrapperWidth,
//     wrapperHeight
// ) => cellData => {
//     let header = <Text>{label}</Text>;
//     if (data) {
//         const className = lineBreak ? 'line-break' : '';
//         header = (
//             <Text className={className}>
//                 {label} <span>{data}</span>
//             </Text>
//         );
//     }

//     return (
//         <TotalWithExchangeCellWrapper>
//             <div className="text-wrapper">{header}</div>
//             {/* {!isGlobalExchange && <ExchangeSelectorWrapper wrapperWidth={wrapperWidth} wrapperHeight={wrapperHeight} />} */}
//         </TotalWithExchangeCellWrapper>
//     );
// };

const BuyBook = ({
    width,
    height,
    onSelect,
    bids,
    rowHeight = 30,
    rowCount,
    showOrderForm,
    showDepthChartMode,
    selectedQuote,
    selectedBase,
    toggleViewMode,
}) => {
    return (
        <MarketDataTable
            width={width}
            height={height}
            disableHeader={false}
            rowHeight={rowHeight}
            marketDataMap={bids}
            rowCount={rowCount}
            id="global-order-buy-book"
            onRowClick={e => {
                if (selectedOrderIndex === e.index) {
                    toggleViewMode();
                    showDepthChartMode(false);
                } else {
                    showOrderForm();
                    showDepthChartMode(true);
                }

                // Don't remove try-catch here for now.
                // When switch view from other pages to Trading page,
                // onSelect is not function & global order book doesn't work.
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
            <Column
                width={width * 0.25}
                dataKey="exchange"
                cellRenderer={exchangeCellRenderer(rowCount, true)}
            />

            <Column
                width={width * 0.25}
                dataKey="amount"
                style={{ justifyContent: 'flex-end' }}
                headerStyle={{ position: 'relative' }}
                headerRenderer={() => <TotalBaseHeader coin={selectedBase} />}
                cellRenderer={baseAmountCellRenderer}
            />

            <Column
                width={width * 0.25}
                dataKey="amountQuote"
                style={{ justifyContent: 'flex-end' }}
                headerRenderer={() => <TotalQuoteHeader coin={selectedQuote} />}
                cellRenderer={quoteAmountCellRenderer}
            />

            <Column
                width={0}
                dataKey="progress"
                cellRenderer={orderProgressRenderer(width, true)}
                style={{ padding: 0, border: 0 }}
                headerStyle={{ display: 'none' }}
            />

            <Column
                width={width * 0.25}
                dataKey="price"
                style={{ justifyContent: 'flex-end' }}
                headerStyle={{ justifyContent: 'flex-end' }}
                headerClassName="price-header"
                headerRenderer={() => <PriceHeader />}
                cellRenderer={priceCellRenderer('buy')}
            />
        </MarketDataTable>
    );
};

export default compose(withOrderFormToggleData)(BuyBook);
