import React from 'react';
import { observer } from 'mobx-react';
import { Table } from 'react-virtualized';
import styled from 'styled-components';

const StyledTable = styled(Table)`
    width: ${props => props.width}px;
    font-size: 16px;
    font-weight: 400;
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
        border-bottom: 1px solid ${props => props.theme.palette.orderBookHistoryCellInnerborder};
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
        padding: 0 12px;
        height: 100%;
        text-overflow: inherit;
        color: ${props => props.theme.palette.orderBookTableCellText};
        
        &:not(:last-child) {
            border-right: 1px solid ${props => props.theme.palette.orderBookHistoryCellInnerborder};
        }
    }
    
    .ReactVirtualized__Table__headerRow {
        background: ${props => props.theme.palette.orderBookTableHeaderBg};
        border-color: ${props => props.theme.palette.orderBookHeaderBorder};
        border-style: solid;
        border-width: 1px 0;
        border-top: 1px solid ${props => props.theme.palette.orderBookHeaderBorder};
        color: ${props => props.theme.palette.orderBookHeaderText2};
        text-transform: none;
        font-size: 16px;
        
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
        padding: 0 12px;
        height: 100%;
        
        &:not(:last-child) {
            border-right: 1px solid ${props => props.theme.palette.orderBookHistoryCellInnerborder};
        }
        &:first-child {
            white-space: nowrap;
            justify-content: center;
        }
        &:last-child {
            // padding: 0;
        }
        &:first-child > .full-width {
            display: flex !important;
            justify-content: center;
        }
        &:last-child>div, &:first-child .max-order-size-wrapper{
            width: auto; 
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }

    &#global-order-sell-book {
        .ReactVirtualized__Table__row {
            &:nth-last-child(2) {
                border-bottom: 0;
            }
        }
    }

    @media (max-width: 1856px) {
        .ReactVirtualized__Table__headerRow {
            font-size: 14px;
        }
    }

    @media (max-width: 1652px) {
        .ReactVirtualized__Table__headerRow {
            font-size: 12px;
        }
    }

    @media (max-width: 1500px) {
        .ReactVirtualized__Table__headerRow {
            font-size: 14px;
        }
    }

    @media (max-width: 1252px) {
        .ReactVirtualized__Table__headerRow {
            font-size: 12px;
        }
    }

    @media (max-width: 849px) {
        .ReactVirtualized__Table__headerRow {
            font-size: 16px;
        }
    }

    @media (max-width: 664px) {
        .ReactVirtualized__Table__headerRow {
            font-size: 14px;
        }
    }

    @media (max-width: 565px) {
        .ReactVirtualized__Table__headerRow {
            font-size: 12px;
        }
    }

    @media (max-width: 505px) {
        .ReactVirtualized__Table__headerRow {
            font-size: 10px;
        }
    }
`;

const cellToObservedCell = Cell =>
    observer(({ marketDataMap, index }) => {
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
        return <ObservedCell index={index} marketDataMap={marketDataMap} />;
    };
};

// subtract material select out of height
export default ({
    children, width, height, rowHeight, marketDataMap, disableHeader = true, rowCount, ...props
}) => {
    return (
        <StyledTable
            {...props}
            {...(disableHeader ? { disableHeader } : { headerHeight: 32 })}
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
