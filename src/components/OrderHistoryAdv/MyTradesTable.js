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

class MyTradesTable extends Component {
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
                                            width={width * 0.1}
                                            dataKey="Time"
                                            headerRenderer={headerRenderer('Time')}
                                            cellRenderer={this.nameCellRenderer}
                                        />

                                        <Column
                                            width={width * 0.1}
                                            dataKey="TradeID"
                                            headerRenderer={headerRenderer('Trade ID')}
                                            cellRenderer={this.priceCellRenderer}
                                        />

                                        <Column
                                            width={width * 0.1}
                                            dataKey="OrderID"
                                            headerRenderer={headerRenderer('Order ID')}
                                            cellRenderer={this.priceCellRenderer}
                                        />

                                        <Column
                                            width={width * 0.1}
                                            dataKey="Instr"
                                            headerRenderer={headerRenderer('Instr.')}
                                            cellRenderer={this.apiCellRenderer}
                                        />
                                        <Column
                                            width={width * 0.1}
                                            dataKey="Account"
                                            headerRenderer={headerRenderer('Account')}
                                            cellRenderer={this.nameCellRenderer}
                                        />

                                        <Column
                                            width={width * 0.1}
                                            dataKey="Side"
                                            headerRenderer={headerRenderer('Side')}
                                            cellRenderer={this.priceCellRenderer}
                                        />

                                        <Column
                                            width={width * 0.1}
                                            dataKey="Amount"
                                            headerRenderer={headerRenderer('Amount')}
                                            cellRenderer={this.apiCellRenderer}
                                        />

                                        <Column
                                            width={width * 0.1}
                                            dataKey="Price"
                                            headerRenderer={headerRenderer('Price')}
                                            cellRenderer={this.priceCellRenderer}
                                        />

                                        <Column
                                            width={width * 0.1}
                                            dataKey="Value"
                                            headerRenderer={headerRenderer('Value')}
                                            cellRenderer={this.priceCellRenderer}
                                        />

                                        <Column
                                            width={width * 0.1}
                                            dataKey="Fee"
                                            headerRenderer={headerRenderer('Fee')}
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

export default MyTradesTable;
