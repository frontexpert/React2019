import React from 'react';
import { observer } from 'mobx-react';
import { Table } from 'react-virtualized';
import styled from 'styled-components';

const StyledTable = styled(Table)`
    width: ${props => props.width}px;
    // height: ${props => props.height}px;
    // border-top: 1px solid ${props => props.theme.palette.orderBookTableSpreadBorder};
    font-size: 16px;
    font-weight: 600;
    color: ${props => props.theme.palette.orderBookTableCellText};
    
    .ReactVirtualized__Grid {
        overflow: hidden !important;
        
        :focus {
            outline: none !important;
        }
    
        ::-webkit-scrollbar {
            display: none;
        }
    }
    
    .ReactVirtualized__Table__row {
        border-bottom: 2px solid ${props => props.theme.palette.orderBookHistoryCellInnerborder};
        // background: ${props => props.theme.palette.orderBookTableCellBg};
        
        :last-child {
            border-bottom: none;
        }
        
        :hover {
            background: ${props => props.theme.palette.orderBookTableCellHoverBg};
            cursor: pointer !important;
        }
        
        :focus {
            background: ${props => props.theme.palette.orderBookTableCellHoverBg};
            outline: none !important;
        }
    }
    
    .ReactVirtualized__Table__rowColumn {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin: 0;
        padding: 0 15px;
        height: 100%;
        text-overflow: inherit;
        color: ${props => props.theme.palette.orderBookTableCellText};
        
        &:not(:last-child) {
            border-right: 2px solid ${props => props.theme.palette.orderBookHistoryCellInnerborder};
        }
    }
    
    .ReactVirtualized__Table__headerRow {
        background: ${props => props.theme.palette.orderBookTableHeaderBg};
        border-bottom: 2px solid ${props => props.theme.palette.orderBookHeaderBorder};
        color: ${props => props.theme.palette.orderBookTableCellText};
        text-transform: none;
        
        .line-break {
            text-align: center;

            span {
                display: block;
            }
        }
    }
    
    .ReactVirtualized__Table__headerColumn {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: stretch;
        margin: 0;
        padding: 0 15px;
        height: 100%;
        
        &:not(:last-child) {
            border-right: 2px solid ${props => props.theme.palette.orderBookHeaderBorder}7f;
        }
        &:first-child {
            white-space: nowrap;
            justify-content: center;
        }
        &:last-child {
            // padding: 0;
        }
        &:first-child {
            padding: 0 0 0 15px;
        }
        &:last-child>div, &:first-child .max-order-size-wrapper{
            width: auto; 
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
`;

const cellToObservedCell = Cell => observer(({ marketDataMap, index }) => {
    return (
        <React.Fragment>
            {marketDataMap && marketDataMap.has(index) && (
                <Cell index={index} data={marketDataMap.get(index)} />
            )}
        </React.Fragment>
    );
});

export const ObservedCellRenderer = Cell => {
    const ObservedCell = cellToObservedCell(Cell);
    return ({ rowIndex: index, rowData: marketDataMap }) => {
        return (
            <ObservedCell
                index={index}
                marketDataMap={marketDataMap}
            />
        );
    };
};

// subtract material select out of height
export default ({
    children,
    width,
    height,
    rowHeight,
    marketDataMap,
    disableHeader = true,
    rowCount,
    ...props
}) => {
    return (
        <StyledTable
            {...props}
            {...(
                disableHeader
                    ? { disableHeader }
                    : { headerHeight: 32 }
            )}
            height={height}
            // borders on rows were 1px too wide
            width={width - 2}
            rowCount={rowCount}
            rowHeight={rowHeight}
            overscanRowCount={0}
            rowGetter={() => marketDataMap}
        >
            {children}
        </StyledTable>
    );
};
