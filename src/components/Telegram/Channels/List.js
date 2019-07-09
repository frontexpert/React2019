import React from 'react';
import styled from 'styled-components';
import {
    AutoSizer, Table, Column, defaultTableRowRenderer
} from 'react-virtualized';
import PerfectScrollbar from 'react-perfect-scrollbar';

import Item from './Item';

const StyleWrapper = styled.div`
    /* somehow we have additional pixels down the road, applying border */
    width: ${props => props.width - 2}px;
    height: ${props => props.height - 62}px;
    background-color: ${props => props.theme.palette.telegramBackground};
    border-radius: ${props =>
        (props.viewMode && `0 0 ${props.theme.palette.borderRadius} ${props.theme.palette.borderRadius}`) ||
        `0 0 0 ${props.theme.palette.borderRadius}`};
    color: #9aa6b0;
    border-top: 1px solid ${props => props.theme.palette.clrBorder};
    // border-left: 1px solid ${props => props.theme.palette.clrBorder};

    .ps__rail-y {
        background-color: ${props => props.theme.palette.telegramBackground} !important;
        border-left: 1px solid ${props => props.theme.palette.walletScrollBorder};
        opacity: 1 !important;
        
        .ps__thumb-y {
            z-index: 9999;
            cursor: pointer;
            
            &:before {
                background-color: ${props => props.theme.palette.walletScrollThumbBack};
            }
        }
    }

    .ReactVirtualized__Table__rowColumn {
        margin: 0 !important;
    }

    .ReactVirtualized__Table__row {
        width: ${props => props.width - 2}px !important;
        padding-right: 0 !important;
    }

    .ReactVirtualized__Table__Grid {
        width: ${props => props.width - 2}px !important;
        outline: none !important;
        box-shadow: 7px 6px 11px rgba(0, 0, 0, 0.05);

        /* width */
        &::-webkit-scrollbar {
            width: 6px;
            height: 6px;
            display: none;
        }

        /* Track */
        &::-webkit-scrollbar-track {
            box-shadow: none;
            border-radius: 0px;
        }

        /* Handle */
        &::-webkit-scrollbar-thumb {
            background: ${props => props.theme.palette.clrseparatorD};
            min-height: 30px;
            border-radius: 10px;
        }

        &:hover {
            &::-webkit-scrollbar {
                display: block;
            }
        }
    }
`;

class ChannelList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            scrollTop: 0,
        };
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (this.props.searchValue !== nextProps.searchValue) {
            this.tableRef.recomputeRowHeights();
        }
    }

    tableCellRenderer = ({
        cellData,
        columnData,
        columnIndex,
        dataKey,
        isScrolling,
        rowData,
        rowIndex,
    }) => {
        return (
            <Item
                key={rowIndex}
                sysId={this.props.sysId}
                data={this.props.data[rowIndex]}
                toggleDrawer={this.props.toggleDrawer}
                handleRoomChange={this.props.handleRoomChange}
            />
        );
    };

    tableRowRenderer = props => {
        if (
            !props.rowData.name ||
            !props.rowData.name.toLowerCase().includes(this.props.searchValue)
        ) { return null; }
        return defaultTableRowRenderer(props);
    };

    tableRowHeight = ({ index }) => {
        const { data, searchValue } = this.props;
        if (
            !data[index].name ||
            !data[index].name.toLowerCase().includes(searchValue)
        ) {
            return 0;
        }
        return 70;
    };

    handleScroll = ({ scrollTop }) => {
        this.setState({ scrollTop });
    };

    render() {
        const { scrollTop } = this.state;
        const { data, viewMode } = this.props;

        return (
            <AutoSizer>
                {({ width, height }) => {
                    return (
                        <StyleWrapper
                            width={width}
                            height={height}
                            viewMode={viewMode}
                        >
                            <PerfectScrollbar
                                option={{ suppressScrollX: true, minScrollbarLength: 40, maxScrollbarLength: 60 }}
                                onScrollY={this.handleScroll}
                            >
                                <Table
                                    ref={elmRef => {
                                        this.tableRef = elmRef;
                                    }}
                                    autoHeight={true}
                                    width={width}
                                    height={height}
                                    headerHeight={0}
                                    disableHeader={true}
                                    rowCount={data.length}
                                    rowGetter={({ index }) => data[index]}
                                    rowHeight={this.tableRowHeight}
                                    rowRenderer={this.tableRowRenderer}
                                    overscanRowCount={0}
                                    scrollTop={scrollTop}
                                >
                                    <Column
                                        dataKey="channel"
                                        cellRenderer={this.tableCellRenderer}
                                        width={100}
                                        flexGrow={1}
                                    />
                                </Table>
                            </PerfectScrollbar>
                        </StyleWrapper>
                    );
                }}
            </AutoSizer>
        );
    }
}

export default ChannelList;
