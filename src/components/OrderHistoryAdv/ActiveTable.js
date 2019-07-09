import React, { Component } from 'react';
import { AutoSizer, Column, Table } from 'react-virtualized';
import PerfectScrollbar from 'react-perfect-scrollbar';

import {
    List,
    StyleWrapper,
    HeaderWrapper,
    ImgCancel
} from './Components';

const headerRenderer = (coin) => () => {
    return (
        <HeaderWrapper>
            {coin}
        </HeaderWrapper>
    );
};

const headerCancelRenderer = () => () => {
    return (
        <ImgCancel/>
    );
};

class ActiveTable extends Component {
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
                                            dataKey="Name"
                                            headerRenderer={headerRenderer('Time')}
                                            cellRenderer={this.nameCellRenderer}
                                        />

                                        <Column
                                            width={width * 0.07}
                                            dataKey="Price"
                                            headerRenderer={headerRenderer('Order ID')}
                                            cellRenderer={this.priceCellRenderer}
                                        />

                                        <Column
                                            width={width * 0.07}
                                            dataKey="Api"
                                            headerRenderer={headerRenderer('Instr.')}
                                            cellRenderer={this.apiCellRenderer}
                                        />
                                        <Column
                                            width={width * 0.08}
                                            dataKey="Name"
                                            headerRenderer={headerRenderer('Account')}
                                            cellRenderer={this.nameCellRenderer}
                                        />

                                        <Column
                                            width={width * 0.07}
                                            dataKey="Price"
                                            headerRenderer={headerRenderer('Side')}
                                            cellRenderer={this.priceCellRenderer}
                                        />

                                        <Column
                                            width={width * 0.08}
                                            dataKey="Api"
                                            headerRenderer={headerRenderer('Amount')}
                                            cellRenderer={this.apiCellRenderer}
                                        />
                                        <Column
                                            width={width * 0.07}
                                            dataKey="Name"
                                            headerRenderer={headerRenderer('Filled')}
                                            cellRenderer={this.nameCellRenderer}
                                        />

                                        <Column
                                            width={width * 0.08}
                                            dataKey="Price"
                                            headerRenderer={headerRenderer('Price')}
                                            cellRenderer={this.priceCellRenderer}
                                        />

                                        <Column
                                            width={width * 0.09}
                                            dataKey="Api"
                                            headerRenderer={headerRenderer('Avg. Price')}
                                            cellRenderer={this.apiCellRenderer}
                                        />
                                        <Column
                                            width={width * 0.08}
                                            dataKey="Name"
                                            headerRenderer={headerRenderer('Order Type')}
                                            cellRenderer={this.nameCellRenderer}
                                        />

                                        <Column
                                            width={width * 0.07}
                                            dataKey="Price"
                                            headerRenderer={headerRenderer('TIF')}
                                            cellRenderer={this.priceCellRenderer}
                                        />

                                        <Column
                                            width={width * 0.07}
                                            dataKey="Api"
                                            headerRenderer={headerRenderer('Source')}
                                            cellRenderer={this.apiCellRenderer}
                                        />
                                        <Column
                                            width={width * 0.07}
                                            dataKey="Name"
                                            headerRenderer={headerRenderer('Stop Price')}
                                            cellRenderer={this.nameCellRenderer}
                                        />

                                        <Column
                                            width={width * 0.03}
                                            dataKey="Price"
                                            headerRenderer={headerCancelRenderer()}
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

export default ActiveTable;
