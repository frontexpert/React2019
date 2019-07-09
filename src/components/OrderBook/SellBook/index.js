import React from 'react';
import PriceCell from 'ComponentsGeneric/PriceCell';
import {Column} from 'react-virtualized';
import MarketDataTable, {ObservedCellRenderer} from '../../../components-generic/MarketDataTable';

const priceCellRenderer = ObservedCellRenderer(
    ({data:[price]}) =>  (
        <React.Fragment>
            <PriceCell price={price} isBuy={false} />
        </React.Fragment>
    )
);

const amountCellRenderer = ObservedCellRenderer(
    ({data:[,amount]}) =>  (
        <React.Fragment>
            {amount}
        </React.Fragment>
    )
);

const exchangeCellRenderer = ObservedCellRenderer(
    ({data:[,,exchange]}) =>  (
        <React.Fragment>
            {exchange}
        </React.Fragment>
    )
);

export default ({width, height, asks, rowHeight=25, rowCount}) => {
    const cellWidth = parseInt(width/3);
    return (
        <MarketDataTable
            height={height}
            width={width}
            rowHeight={rowHeight}
            marketDataMap={asks}
            disableHeader={false}
            rowCount={rowCount}
        >
            <Column 
                width={cellWidth}
                dataKey='Price'
                label='Price'
                cellRenderer={priceCellRenderer}
            />
            
            <Column 
                width={cellWidth}
                dataKey='Amount'
                label='Amount'
                cellRenderer={amountCellRenderer}
            />

            <Column 
                width={cellWidth}
                dataKey='Exchange'
                label='Exchange'
                cellRenderer={exchangeCellRenderer}
            />            
        </MarketDataTable>
    )
}