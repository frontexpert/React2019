import React from 'react';
import styled from 'styled-components';
import { Table, Column, AutoSizer } from 'react-virtualized';
import { format7DigitString } from '../../utils';

const ExchangePlansTableStyleWrapper = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: stretch;
    
    background: ${props => props.theme.palette.exchTableBg}; 
    
    .exchange-item__color {
        flex-shrink: 0;
        flex-grow: 0;
        margin: 0 auto;
        width: 34px;
        height: 34px;
        border: 2px solid ${props => props.theme.palette.exchTableExchIconBorder};
    }
    
    .exchange-plan-table-header {
        display: block;
        width: 100%;
        text-align: center;
        color: ${props => props.theme.palette.contrastText};
        font-size: 13px;
        font-weight: 500;
        letter-spacing: 0.1em;
    }
`;

const StyledTable = styled(Table).attrs({ className: 'exchange-plan-table' })`
    font-size: 12px;
    color: ${props => props.theme.palette.exchTableColor};
    font-weight: 400;
    
    .ReactVirtualized__Grid {
        :focus {
            outline: none !important;
        }
    }

    .ReactVirtualized__Table__Grid {
        /* width */
        &::-webkit-scrollbar {
            width: 6px;
            height: 6px;
            opacity: 0;
        }
        
        /* Track */
        &::-webkit-scrollbar-track {
            box-shadow: none;
            border-radius: 0px;
        }
        
        /* Handle */
        &::-webkit-scrollbar-thumb {
            background: transparent;
            min-height: 30px;
            border-radius: 10px;
        }
        
        &:hover {
            &::-webkit-scrollbar {
                opacity: 1;
            }
            
            &::-webkit-scrollbar-thumb {
                background: ${props => props.theme.palette.clrseparatorD};
            }
        }
    }

    .ReactVirtualized__Table__row {
        border-bottom: 1px solid ${props => props.theme.palette.exchTableBorder};
    }
    
    .ReactVirtualized__Table__headerRow {
        border-bottom: 1px solid ${props => props.theme.palette.exchTableBorder};
        text-transform: none;
        
        & span {
            white-space: normal;
        }
    }
    
    .ReactVirtualized__Table__headerColumn {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: stretch;
        margin: 0;
        padding: 0 15px;
        border-right: 1px solid ${props => props.theme.palette.exchTableBorder};
        
        :last-child {
            border-right: none;
        }
    }
    
    .ReactVirtualized__Table__rowColumn {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: stretch;
        margin: 0;
        padding: 0 15px;
        border-right: 1px solid ${props => props.theme.palette.exchTableBorder};
        
        :last-child {
            border-right: none;
        }
        text-overflow: inherit;
    }
`;

const headerRenderer = (label) => ({ dataKey }) => {
    return <span className="exchange-plan-table-header" key={dataKey}>{label}</span>;
};

const rowCellRenderer = ({ rowData: val, rowIndex: index }) => (
    <React.Fragment>
        <div className="exchange-item__color"
             style={{
                 background: val.exchangeColor,
             }}
        />
    </React.Fragment>
);

const exchangeCellRenderer = ({ rowData: val, rowIndex: index }) => (
    <React.Fragment>
        {val.exchange}
    </React.Fragment>
);

const splitAbsCellRenderer = ({ rowData: val, rowIndex: index }) => (
    <React.Fragment>
        {val.splitAbs === '-'
            ? '-'
            : format7DigitString(Number.parseFloat(val.splitAbs) || 0) + ' ' + val.quote
        }
    </React.Fragment>
);

const splitRelCellRenderer = ({ rowData: val, rowIndex: index }) => (
    <React.Fragment>
        {val.splitRel === '-'
            ? '-'
            : val.splitRel + ' %'
        }
    </React.Fragment>
);

const avgPriceCellRenderer = ({ rowData: val, rowIndex: index }) => (
    <React.Fragment>
        {val.avgPrice === '-'
            ? '-'
            : format7DigitString(Number.parseFloat(val.avgPrice) || 0) + ' ' + val.base
        }
    </React.Fragment>
);

const relMoreCellRenderer = ({ rowData: val, rowIndex: index }) => (
    <React.Fragment>
        {val.relMore === '-'
            ? '-'
            : val.relMore + ' %'
        }
    </React.Fragment>
);

const absMoreCellRenderer = ({ rowData: val, rowIndex: index }) => (
    <React.Fragment>
        {val.absMore === '-'
            ? '-'
            : format7DigitString(Number.parseFloat(val.absMore) || 0) + ' ' + val.base
        }
    </React.Fragment>
);

const ExchangePlansTableRV = ({ data }) => {
    return (
        <ExchangePlansTableStyleWrapper>
            <AutoSizer>
                {({ width, height }) => (
                    <StyledTable
                        width={width}
                        height={height}
                        disableHeader={false}
                        headerHeight={55}
                        rowHeight={52}
                        rowCount={data.length}
                        rowGetter={({ index }) => data[index]}
                    >
                        <Column
                            dataKey="background"
                            width={60}
                            flexShrink={0}
                            flexGrow={0}
                            headerRenderer={headerRenderer('Row')}
                            cellRenderer={rowCellRenderer}
                        />
                        <Column
                            dataKey="exchange"
                            width={100}
                            flexGrow={1}
                            headerRenderer={headerRenderer('Exchange')}
                            cellRenderer={exchangeCellRenderer}
                        />
                        <Column
                            dataKey="splitAbs"
                            width={150}
                            flexGrow={1}
                            headerRenderer={headerRenderer('Split (abs.)')}
                            cellRenderer={splitAbsCellRenderer}
                        />
                        <Column
                            dataKey="splitRel"
                            width={70}
                            flexGrow={1}
                            flexShrink={0}
                            headerRenderer={headerRenderer('Split (rel.)')}
                            cellRenderer={splitRelCellRenderer}
                        />
                        <Column
                            dataKey="avgPrice"
                            width={150}
                            flexGrow={1}
                            headerRenderer={headerRenderer('Avg. Price')}
                            cellRenderer={avgPriceCellRenderer}
                        />
                        <Column
                            dataKey="relMore"
                            width={100}
                            flexGrow={1}
                            headerRenderer={headerRenderer('Rel. More')}
                            cellRenderer={relMoreCellRenderer}
                        />
                        <Column
                            dataKey="absMore"
                            width={100}
                            flexGrow={1}
                            headerRenderer={headerRenderer('Abs. More')}
                            cellRenderer={absMoreCellRenderer}
                        />
                    </StyledTable>
                )}
            </AutoSizer>
        </ExchangePlansTableStyleWrapper>
    );
};

export default ExchangePlansTableRV;