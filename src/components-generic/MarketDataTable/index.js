import React from 'react';
import { defaultTableRowRenderer } from 'react-virtualized';

import { cellRenderer } from '@/components/OrderBook/Cells/cellRenderers';
import RowTooltip from './RowTooltip';
import { StyledTable } from './styles';

const rowRenderer = ({ rowCount, isBuy, height, priceFractionDigits }) => rowProps => {
    const {
        rowData: { price, exchange, total },
        index,
        key,
        style
    } = rowProps;

    return (
        <RowTooltip
            key={key}
            rowCount={rowCount}
            isBuy={isBuy}
            price={price}
            exchange={exchange}
            index={index}
            total={total}
            tableHeight={height}
            priceFractionDigits={priceFractionDigits}
            style={{ height: style.height }}
        >
            {defaultTableRowRenderer(rowProps)}
        </RowTooltip>
    );
};

export default ({ children, width, data, disableHeader = true, ...props }) => {
    return (
        <StyledTable
            {...props}
            {...(disableHeader ? { disableHeader } : { headerHeight: props.rowHeight })}
            // borders on rows were 1px too wide
            width={width - 2}
            overscanRowCount={0}
            rowGetter={({ index }) => (data && data.length - 1 >= index ? data[index] : {})}
            rowRenderer={cellRenderer(rowRenderer(props))}
        >
            {children}
        </StyledTable>
    );
};
