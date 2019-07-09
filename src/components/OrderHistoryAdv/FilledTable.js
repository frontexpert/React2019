import React, { Component } from 'react';
import { AutoSizer, Column, Table } from 'react-virtualized';
import PerfectScrollbar from 'react-perfect-scrollbar';

import {
    List,
    StyleWrapper,
    HeaderWrapper
} from './Components';

const headerRenderer = (coin) => () => {
    return (
        <HeaderWrapper>
            {coin}
        </HeaderWrapper>
    );
};

class FilledTable extends Component {
    state = {};

    render() {
        const data = [];
        return (
            <List>
                <AutoSizer>
                    {({ width, height }) => {
                        return (
                            <StyleWrapper width={width} height={height}>
                                <PerfectScrollbar
                                    option={{
                                        suppressScrollX: true,
                                        minScrollbarLength: 50,
                                    }}
                                    onScrollY={this.handleScroll}
                                >
                                    <Table
                                        autoHeight={true}
                                        width={width}
                                        height={height}
                                        headerHeight={27}
                                        disableHeader={false}
                                        rowCount={data.length}
                                        rowGetter={({ index }) => data[index]}
                                        rowHeight={60}
                                        overscanRowCount={0}
                                    >
                                        <Column
                                            width={width * 0.07}
                                            dataKey="Time"
                                            headerRenderer={headerRenderer('Time')}
                                            cellRenderer={this.nameCellRenderer}
                                        />

                                        <Column
                                            width={width * 0.07}
                                            dataKey="OrderID"
                                            headerRenderer={headerRenderer('Order ID')}
                                            cellRenderer={this.priceCellRenderer}
                                        />

                                        <Column
                                            width={width * 0.07}
                                            dataKey="Instr"
                                            headerRenderer={headerRenderer('Instr.')}
                                            cellRenderer={this.apiCellRenderer}
                                        />
                                        <Column
                                            width={width * 0.08}
                                            dataKey="Account"
                                            headerRenderer={headerRenderer('Account')}
                                            cellRenderer={this.nameCellRenderer}
                                        />

                                        <Column
                                            width={width * 0.07}
                                            dataKey="Side"
                                            headerRenderer={headerRenderer('Side')}
                                            cellRenderer={this.priceCellRenderer}
                                        />

                                        <Column
                                            width={width * 0.08}
                                            dataKey="Amount"
                                            headerRenderer={headerRenderer('Amount')}
                                            cellRenderer={this.apiCellRenderer}
                                        />
                                        <Column
                                            width={width * 0.07}
                                            dataKey="Filled"
                                            headerRenderer={headerRenderer('Filled')}
                                            cellRenderer={this.nameCellRenderer}
                                        />

                                        <Column
                                            width={width * 0.06}
                                            dataKey="Price"
                                            headerRenderer={headerRenderer('Price')}
                                            cellRenderer={this.priceCellRenderer}
                                        />

                                        <Column
                                            width={width * 0.08}
                                            dataKey="AvgPrice"
                                            headerRenderer={headerRenderer('Avg. Price')}
                                            cellRenderer={this.apiCellRenderer}
                                        />
                                        <Column
                                            width={width * 0.08}
                                            dataKey="OrderType"
                                            headerRenderer={headerRenderer('Order Type')}
                                            cellRenderer={this.nameCellRenderer}
                                        />

                                        <Column
                                            width={width * 0.04}
                                            dataKey="TIF"
                                            headerRenderer={headerRenderer('TIF')}
                                            cellRenderer={this.priceCellRenderer}
                                        />

                                        <Column
                                            width={width * 0.04}
                                            dataKey="Source"
                                            headerRenderer={headerRenderer('Source')}
                                            cellRenderer={this.apiCellRenderer}
                                        />
                                        <Column
                                            width={width * 0.07}
                                            dataKey="Stop"
                                            headerRenderer={headerRenderer('Stop Price')}
                                            cellRenderer={this.nameCellRenderer}
                                        />

                                        <Column
                                            width={width * 0.05}
                                            dataKey="Status"
                                            headerRenderer={headerRenderer('Status')}
                                            cellRenderer={this.priceCellRenderer}
                                        />
                                    </Table>
                                </PerfectScrollbar>
                            </StyleWrapper>
                        );
                    }}
                </AutoSizer>
            </List>
        );
    }
}

export default FilledTable;
