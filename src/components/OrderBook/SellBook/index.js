import React from 'react';
import { Column } from 'react-virtualized';
import { compose } from 'recompose';
import styled from 'styled-components';
import { Tooltip } from 'react-tippy';

import PriceCell from '../../../components-generic/PriceCell';
import MarketDataTable, { ObservedCellRenderer } from '../../../components-generic/MarketDataTable';
import { withOrderFormToggleData } from '../../../hocs/OrderFormToggleData';
import { customDigitFormatWithNoTrim, unifyDigitString } from '../../../utils';

let exchangeNamesColumnWidth = 0;
let selectedOrderIndex = -1;
let unit1 = 0;
let unit2 = 0;

const ExchangeCell = styled.div`
    text-align: left;
    display: block !important;
    width: 100% !important;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${props => props.theme.palette.orderBookTableCellTextNegative};
`;

const AmountCell = styled.div`
    color: ${props => props.theme.palette.orderBookTableCellTextAmount};
    text-align: left;
`;

const Text = styled.div.attrs({ className: 'sell-book-header-text' })`
    width: 100%;
    // overflow: hidden;
    // text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 13px;
    font-weight: 400;
    color: ${props => props.theme.palette.orderBookTableHeaderText};

    span {
        height: unset !important;
        line-height: 1em !important;
        font-size: 12px;
        font-weight: 300;
        color: ${props => props.theme.palette.orderBookTableHeaderText2};
    }
`;

const priceCellRenderer = ObservedCellRenderer(
    ({ data: [price, , exchange, nextPrice] }) => {
        return (
            <PriceCell price={customDigitFormatWithNoTrim(price)} isBuy={false} nextPrice={nextPrice}/>
        );
    }
);

const amountQuoteCellRenderer = ObservedCellRenderer(
    ({ data: [price, amount, exchange, highlight] }) => {
        const priceFloat = Number.parseFloat(String(price || '0').replace(',', ''));
        const amountFloat = Number.parseFloat(String(amount || '0').replace(',', ''));
        return (
            <AmountCell>{customDigitFormatWithNoTrim(priceFloat * amountFloat, 6, unit2)}</AmountCell>
        );
    }
);

const amountCellRenderer = ObservedCellRenderer(
    ({ data: [, amount] }) => {
        return (
            <AmountCell>{customDigitFormatWithNoTrim(amount, 6, unit1)}</AmountCell>
        );
    }
);

const exchangeCellRenderer = ObservedCellRenderer(
    ({ data: [, , exchange] }) => {
        const exchanges = exchange.split(',').reverse();
        const regex = /,/gi;

        let pixelWidth = require('string-pixel-width');
        const width = pixelWidth((exchanges.toString() || '').replace(regex, ' • '), { size: 16 });
        let isOverflow = width < exchangeNamesColumnWidth;
        return (
            <Tooltip
                disabled={isOverflow}
                arrow={true}
                animation="fade"
                position="right"
                placement="right"
                distance={20}
                theme="bct"
                className="full-width"
                html={(
                    <div className="advanced-tooltip text-left">
                        {exchanges.map((val, key) => (
                            <React.Fragment key={key}>
                                {val}<br/>
                            </React.Fragment>
                        ))}
                    </div>
                )}
                popperOptions={
                    {
                        modifiers: {
                            preventOverflow: {
                                enabled: false,
                            },
                            flip: {
                                enabled: false,
                            },
                            hide: {
                                enabled: false,
                            },
                        },
                    }
                }
            >
                <ExchangeCell>
                    {(exchanges.toString() || '').replace(regex, ' • ').toUpperCase()}
                </ExchangeCell>
            </Tooltip>
        );
    }
);

// Shauns request to have +1 if 0 since we will have our own exchange
const exchangeCountCellRenderer = ObservedCellRenderer(
    ({ data: [, , exchange] }) => {
        const exchanges = exchange.split(',');
        const exchangesCount = exchanges.length - 1 || 0;

        const exchangesMock = [
            'BITFINEX',
            'ETORO',
            '24 OPTION',
            'COINBULL',
            'LUNO',
            'PAXFOREX',
            'BINANCE',
            'COINBASE',
            'LOCALBITCOINS',
            'CEX IO',
            'CHANGELLY'
        ];
        const exchangesMockCount = exchangesMock.length;

        return (
            <AmountCell>
                {exchangesMockCount === 0 ? '+ 1' : `+ ${exchangesMockCount}`}
            </AmountCell>
        );
    }
);

const headerRenderer = (label, data) => (cellData) => {
    return data ? <Text>{label} <span>{data}</span></Text> : <Text>{label}</Text>;
};

const SellBook = ({
    width,
    height,
    asks,
    onSelect,
    rowHeight = 30,
    rowCount,
    selectedQuote,
    selectedBase,
    showOrderForm,
    showDepthChartMode,
    selectedExchange,
    toggleViewMode,
}) => {
    // width needs to add to 1.0
    const isGlobalExchange = selectedExchange && (selectedExchange.name === 'Global');
    exchangeNamesColumnWidth = width - 300;

    const ary = Object.values(asks.toJSON());
    const ar1 = ary.map(item => item.get(1));
    const maxAmount = Math.max(...ar1);
    if (ary.length > 0) {
        unit1 = maxAmount > 1000000 ? 2 : maxAmount > 100000 ? 1 : 0;
    }

    const ar2 = ary.map(item => item.get(0) * item.get(1));
    const maxAmountQuote = Math.max(...ar2);
    if (ary.length > 0) {
        unit2 = maxAmountQuote > 1000000 ? 2 : maxAmountQuote > 100000 ? 1 : 0;
    }

    return (
        <MarketDataTable
            width={width}
            height={height}
            disableHeader={true}
            rowHeight={rowHeight}
            marketDataMap={asks}
            rowCount={rowCount}
            id="global-order-sell-book"
            onRowClick={(e) => {
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
            {isGlobalExchange && (
                <Column
                    width={width * .5}
                    dataKey="Exchange"
                    // headerRenderer={headerRenderer('Exchange', 165)}
                    // headerRenderer={headerRenderer('Exchanges')}
                    cellRenderer={exchangeCellRenderer}
                />
            )}

            <Column
                width={isGlobalExchange ? width * .166 : (width * .3)}
                dataKey="Amount"
                // headerRenderer={headerRenderer('Amount', selectedBase)}
                // headerRenderer={headerRenderer(selectedBase)}
                cellRenderer={amountCellRenderer}
            />

            <Column
                width={isGlobalExchange ? width * .166 : (width * .3)}
                dataKey="AmountQuote"
                // headerRenderer={headerRenderer('Price', selectedQuote)}
                // headerRenderer={headerRenderer(selectedQuote)}
                cellRenderer={amountQuoteCellRenderer}
            />

            <Column
                width={isGlobalExchange ? width * .166 : (width * .4)}
                dataKey="Price"
                // headerRenderer={headerRenderer('Price', selectedQuote)}
                // headerRenderer={headerRenderer(`${selectedBase} / ${selectedQuote}`)}
                cellRenderer={priceCellRenderer}
            />
        </MarketDataTable>
    );
};

export default compose(
    withOrderFormToggleData
)(SellBook);
