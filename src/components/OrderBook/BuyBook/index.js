import React, { Fragment } from 'react';
import { Column } from 'react-virtualized';
import { compose } from 'recompose';
import styled from 'styled-components';
import { Tooltip } from 'react-tippy';

import { customDigitFormatWithNoTrim, unifyDigitString } from '../../../utils';
import PriceCell from '../../../components-generic/PriceCell';
import MarketDataTable, { ObservedCellRenderer } from '../../../components-generic/MarketDataTable';
import { withOrderFormToggleData } from '../../../hocs/OrderFormToggleData';
import ExchangeSelectorWrapper from './ExchangeSelectorWrapper';
import CoinIcon from '../../../components-generic/CoinIcon';
import MaxOrderSizeLabel from './MaxOrderSizeLabel';
import PriceHeaderLabel from './PriceHeaderLabel';

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
    color: ${props => props.theme.palette.orderBookTableCellTextPositive};
`;

const AmountCell = styled.div`
    color: ${props => props.theme.palette.orderBookTableCellTextAmount};
    text-align: left;
`;

const Text = styled.div.attrs({ className: 'buy-book-header-text' })`
    width: 100%;
    white-space: nowrap;
    font-size: 15px;
    font-weight: 700;
    color: ${props => props.theme.palette.orderBookTableHeaderText};
    overflow: hidden;

    span {
        height: unset !important;
        line-height: 1em !important;
        font-size: 12px;
        font-weight: 300;
        color: ${props => props.theme.palette.orderBookTableHeaderText2};
    }
`;

const TotalWithExchangeCellWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;

    .text-wrapper {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

const HeaderWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => props.theme.palette.clrPurple};

    span {
        height: unset !important;
        margin-left: 4px;
    }
`;

const priceCellRenderer = ObservedCellRenderer(
    ({ data: [price, , exchange, nextPrice] }) => {
        return (
            <PriceCell price={customDigitFormatWithNoTrim(price)} isBuy={true} nextPrice={nextPrice}/>
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
        // const regex = /,/gi;
        // return (
        //     <ExchangeCell>{(exchange || '').replace(regex, ' • ')}</ExchangeCell>
        // );
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
                    {(exchanges.toString() || '').replace(regex, ' • ')}
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

const headerRenderer = (coin, tooltipText) => () => {
    return (
        <Tooltip
            arrow={true}
            animation="fade"
            position="right"
            placement="right"
            distance={20}
            theme="bct"
            className="full-width"
            html={(
                <div>
                    {tooltipText}
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
            <HeaderWrapper>
                {coin}
            </HeaderWrapper>
        </Tooltip>
    );
};
// const headerRenderer = (label, data, lineBreak) => (cellData) => {
//     let header = <Text>{label}</Text>;
//     if (data) {
//         const className = lineBreak ? 'line-break' : '';
//         header = <Text className={className}>{label} <span>{data}</span></Text>;
//     }
//     return header;
// };

const priceHeaderRenderer = (base, quote) => () => {
    return (
        <Tooltip
            arrow={true}
            animation="fade"
            position="right"
            placement="right"
            distance={20}
            theme="bct"
            className="full-width"
            html={(
                <div className="advanced-tooltip text-left">
                    Price ({base} / {quote})
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
            <HeaderWrapper>
                <PriceHeaderLabel/>
            </HeaderWrapper>
        </Tooltip>
    );
};

const TotalWithExchangeHeaderRenderer = (label, data, lineBreak, isGlobalExchange, wrapperWidth, wrapperHeight) => (cellData) => {
    let header = <Text>{label}</Text>;
    if (data) {
        const className = lineBreak ? 'line-break' : '';
        header = <Text className={className}>{label} <span>{data}</span></Text>;
    }

    return (
        <TotalWithExchangeCellWrapper>
            <div className="text-wrapper">
                {header}
            </div>
            {/* {!isGlobalExchange && <ExchangeSelectorWrapper wrapperWidth={wrapperWidth} wrapperHeight={wrapperHeight} />} */}
        </TotalWithExchangeCellWrapper>
    );
};

const ExchangeHeaderRenderer = (wrapperWidth, wrapperHeight) => () => {
    return (
        <Fragment>
            <MaxOrderSizeLabel/>
            {/* <ExchangeSelectorWrapper wrapperWidth={wrapperWidth} wrapperHeight={wrapperHeight} /> */}
        </Fragment>
    );
};

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
    selectedExchange,
    exchangesCnt,
    wrapperWidth,
    wrapperHeight,
    isRegularMarket,
    toggleViewMode,
}) => {
    const isGlobalExchange = selectedExchange && (selectedExchange.name === 'Global');
    // width needs to add to 1.0
    exchangeNamesColumnWidth = width - 300;

    // if (!isRegularMarket) {
    //     const buf = selectedBase;
    //     selectedBase = selectedQuote;
    //     selectedQuote = buf;
    // }
    const ary = Object.values(bids.toJSON());
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
            disableHeader={false}
            rowHeight={rowHeight}
            marketDataMap={bids}
            rowCount={rowCount}
            id="global-order-buy-book"
            onRowClick={(e) => {
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
            {isGlobalExchange && (
                <Column
                    width={width * .5}
                    dataKey="exchange"
                    headerRenderer={ExchangeHeaderRenderer(wrapperWidth, wrapperHeight)}
                    cellRenderer={exchangeCellRenderer}
                />
            )}

            <Column
                width={isGlobalExchange ? width * .166 : (width * .3)}
                dataKey="amount"
                headerRenderer={headerRenderer(selectedBase, 'Amount')}
                // headerRenderer={headerRenderer('Amount', `(${selectedBase})`, true)}
                cellRenderer={amountCellRenderer}
            />

            <Column
                width={isGlobalExchange ? width * .166 : (width * .3)}
                dataKey="amountQuote"
                headerRenderer={headerRenderer(selectedQuote, 'Total')}
                // headerRenderer={TotalWithExchangeHeaderRenderer('Total', `(${selectedQuote})`, true, isGlobalExchange, wrapperWidth, wrapperHeight)}
                cellRenderer={amountQuoteCellRenderer}
            />

            <Column
                width={isGlobalExchange ? width * .166 : (width * .4)}
                dataKey="price"
                // headerRenderer={headerRenderer(`${selectedBase || ''} / ${selectedQuote || ''}`)}
                // headerRenderer={headerRenderer('Price', `(${selectedBase}/${selectedQuote})`, true)}
                headerRenderer={priceHeaderRenderer(selectedBase, selectedQuote)}
                cellRenderer={priceCellRenderer}
            />
        </MarketDataTable>
    );
};

export default compose(
    withOrderFormToggleData
)(BuyBook);
