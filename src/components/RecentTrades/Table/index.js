import React from 'react';
import PriceCell from 'ComponentsGeneric/PriceCell';
import {Column} from 'react-virtualized';
import MarketDataTable, {ObservedCellRenderer} from '../../../components-generic/MarketDataTable';

const priceCellRenderer = ObservedCellRenderer(
    ({data:[,price,,isBuy]}) =>  (
        <React.Fragment>
            <PriceCell price={price} isBuy={isBuy} />
        </React.Fragment>
    )
);

const amountCellRenderer = ObservedCellRenderer(
    ({data:[,,amount]}) =>  (
        <React.Fragment>
            {amount}
        </React.Fragment>
    )
);

const exchangeCellRenderer = ObservedCellRenderer(
    ({data:[exchange]}) =>  (
        <React.Fragment>
            {exchange}
        </React.Fragment>
    )
);

const timestampCellRenderer = ObservedCellRenderer(
    ({data:[,,,,timestamp]}) =>  (
        <React.Fragment>
            {timestamp}
        </React.Fragment>
    )
);

export default ({width, height, recentTrades, rowHeight=25, rowCount}) => {
    const cellWidth = parseInt(width/3);
    return (
        <MarketDataTable
            disableHeader={false}
            height={height}
            width={width}
            rowHeight={rowHeight}
            marketDataMap={recentTrades}
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

             <Column 
                width={cellWidth}
                dataKey='timestamp'
                label='Time'
                cellRenderer={timestampCellRenderer}
            />           
        </MarketDataTable>
    )
}












