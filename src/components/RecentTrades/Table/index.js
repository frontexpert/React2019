import React from 'react';
import styled from 'styled-components';
import {Column} from 'react-virtualized';
import {compose} from 'recompose';
import {Tooltip} from 'react-tippy';
import moment from 'moment';

import PriceCell from '../../../components-generic/PriceCell';
import MarketDataTable, {ObservedCellRenderer} from '../../../components-generic/MarketDataTable';
import {withOrderFormToggleData} from '../../../hocs/OrderFormToggleData';
import {format7DigitString} from '../../../utils';

const Icon = styled.img`
    width: 10px;
    height: 10px;
`;

const ExchangeCell = styled.div`
    // font-weight: 600;
    // color: ${props => props.theme.palette.marketDataTableColor};
    text-align: left;
    
    div {
        display: block !important;
        width: 100% !important;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;

const AmountCell = styled.div`
    // font-weight: 600;
    color: ${props => props.theme.palette.contrastText};
    // color: ${props => props.theme.palette.marketDataTableColor};
    text-align: left;
    
    .sprite-icon.clock {
        width: 9px;
        height: 9px;
        fill: ${props => props.theme.palette.clrtextL}
    }
`;

const Text = styled.div`
    margin-top: -4px;
    // font-weight: normal;
    color: ${props => props.theme.palette.contrastText};
    
    span {
        height: unset !important;
        line-height: 0.8 !important;
        color: ${props => props.theme.palette.clrtext};
        // color: ${props => props.theme.palette.marketDataTableColor};
    }
`;

const priceCellRenderer = ObservedCellRenderer(
    ({data: [, price, , isBuy]}) => (
        <React.Fragment>
            <Tooltip
                arrow={true}
                animation={'fade'}
                position={'right'}
                placement={'right'}
                distance={166}
                theme={'bct'}
                title={moment().format('ddd, MMM D, YYYY, HH:mm:ss')}
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
                <PriceCell price={format7DigitString(price)} isBuy={isBuy}/>
            </Tooltip>
        </React.Fragment>
    )
);

const amountCellRenderer = ObservedCellRenderer(
    ({data: [, , amount]}) => (
        <AmountCell>
            <Tooltip
                arrow={true}
                animation={'fade'}
                position={'right'}
                placement={'right'}
                distance={104}
                theme={'bct'}
                title={moment().format('ddd, MMM D, YYYY, HH:mm:ss')}
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
                {format7DigitString(amount)}
            </Tooltip>
        </AmountCell>
    )
);

const exchangeCellRenderer = ObservedCellRenderer(
    ({data: [exchange]}) => {
        return (
            <ExchangeCell>
                <Tooltip
                    arrow={true}
                    animation={'fade'}
                    position={'right'}
                    placement={'right'}
                    distance={20}
                    theme={'bct'}
                    title={moment().format('ddd, MMM D, YYYY, HH:mm:ss')}
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
                    {exchange}
                </Tooltip>
            </ExchangeCell>
        )
    }
);

const timestampCellRenderer = ObservedCellRenderer(
    ({data: [, , , , timestamp]}) => (
        <AmountCell>
            <Tooltip
                arrow={true}
                animation={'fade'}
                position={'right'}
                placement={'right'}
                distance={20}
                theme={'bct'}
                title={moment().format('ddd, MMM D, YYYY, HH:mm:ss')}
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
                <svg className="sprite-icon clock" role="img" aria-hidden="true">
                    <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="img/sprite-basic.svg#clock-2"/>
                </svg>
            </Tooltip>
        </AmountCell>
    )
);

const headerRenderer = (label, data) => (cellData) => {
    return data ? <Text>{label} <span>{data}</span></Text> : <Text>{label}</Text>;
};

const RecentTrades = ({width, height, recentTrades, rowHeight = 22, rowCount, base, quote, showOrderForm, showDepthChartMode}) => {
    return (
        <MarketDataTable
            disableHeader={false}
            height={height}
            width={width}
            rowHeight={rowHeight}
            marketDataMap={recentTrades}
            rowCount={rowCount}
            onRowClick={() => {
                showOrderForm();
                showDepthChartMode(true);
            }}
        >
            <Column
                width={width * .3}
                dataKey='price'
                headerRenderer={headerRenderer('Price', quote)}
                cellRenderer={priceCellRenderer}
            />

            <Column
                width={width * .28}
                dataKey='amount'
                headerRenderer={headerRenderer('Amount', base)}
                cellRenderer={amountCellRenderer}
            />

            <Column
                width={width * .32}
                dataKey='exchange'
                headerRenderer={headerRenderer('Exchange', 165)}
                cellRenderer={exchangeCellRenderer}
            />

            {/*<Column*/}
            {/*width={width * .1}*/}
            {/*dataKey='timestamp'*/}
            {/*cellRenderer={timestampCellRenderer}*/}
            {/*/>*/}
        </MarketDataTable>
    );
};

export default compose(
    withOrderFormToggleData
)(RecentTrades);
