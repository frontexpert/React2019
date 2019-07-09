import React from 'react';
import {observer} from 'mobx-react';
import {Table} from 'react-virtualized';
import styled from 'styled-components';

const StyledTable = styled(Table)`
    font-size: 0.75rem;
    color: ${props => props.theme.palette.clrtextD};
    .ReactVirtualized__Table {
        background: ${props => props.theme.palette.backgroundMedContrast} !important;
    }
    .ReactVirtualized__Table__row {
        border-bottom: 1px solid ${props => props.theme.palette.clrseparatorD};
        :last-child{
            border-bottom: none;
        }
    }
    .ReactVirtualized__Table__headerRow{
        border-bottom: 1px solid ${props => props.theme.palette.clrseparatorD};
        text-transform: none;
    }
`;

const cellToObservedCell = Cell => observer(({marketDataMap, index})=>{
    return (
        <React.Fragment>
            {
                marketDataMap.has(index) &&
                <Cell data={marketDataMap.get(index)} />
            }
        </React.Fragment>
    )
});

export const ObservedCellRenderer = Cell => {
    const ObservedCell = cellToObservedCell(Cell);
    return ({rowIndex:index, rowData:marketDataMap}) => {
        return (
            <ObservedCell 
                index={index}
                marketDataMap={marketDataMap}    
            />
        );
    }
}

//subtract material select out of height
export default ({
    children,
    width,
    height,
    rowHeight,
    marketDataMap,
    disableHeader=true,
    rowCount,
}) => {
    return (
        <StyledTable
            {...(
                disableHeader ? 
                {disableHeader} : 
                {headerHeight:40} 
            )}
            height={height}
            // borders on rows were 1px too wide
            width={width-1}
            rowCount={rowCount}
            rowHeight={rowHeight}
            overscanRowCount={0}
            rowGetter={()=>marketDataMap}
        >
            {children}
        </StyledTable>
    );
}