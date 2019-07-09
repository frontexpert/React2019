import React from 'react';
import PriceCell from 'ComponentsGeneric/PriceCell';
import {Column} from 'react-virtualized';
import MarketDataTable, {ObservedCellRenderer} from '../../../components-generic/MarketDataTable';

const priceCellRenderer = ObservedCellRenderer(
    ({data:[price]}) =>  (
        <React.Fragment>
            <PriceCell price={price} isBuy={true} />
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

export default ({width, height, bids, rowHeight=25, rowCount}) => {
    const cellWidth = parseInt(width/3);
    return (
        <MarketDataTable
            disableHeader={true}
            height={height}
            width={width}
            rowHeight={rowHeight}
            marketDataMap={bids}
            rowCount={rowCount}
        >
            <Column 
                width={cellWidth}
                dataKey='price'
                label='Price'
                cellRenderer={priceCellRenderer}
            />
            
            <Column 
                width={cellWidth}
                dataKey='amount'
                label='Amount'
                cellRenderer={amountCellRenderer}
            />

            <Column 
                width={cellWidth}
                dataKey='exchange'
                label='Exchange'
                cellRenderer={exchangeCellRenderer}
            />            
        </MarketDataTable>
    )
}