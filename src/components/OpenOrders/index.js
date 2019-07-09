import React from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import 'crypto-icons/font.css';
import 'crypto-icons/styles.css';
import styled from 'styled-components';
import SkinnyButton from 'ComponentsGeneric/SkinnyButton';
import { AutoSizer } from 'react-virtualized';

const StyledTable = styled(ReactTable)`
    background: ${props => props.theme.palette.backgroundHighContrast} !important;
    color: ${props => props.theme.palette.clrtextD};
    .tableRows{
        border-bottom: 1px solid ${props => props.theme.palette.clrseparator};
    }
`;

const createColumns = (onCancelFactory) => {
    return (
        [
            {
                Header: 'Exchange',
                accessor: 'exchange',
            },
            {
                Header: 'Product',
                accessor: 'product',
            },
            {
                Header: 'Size',
                accessor: 'size',
            },
            {
                Header: 'Price',
                accessor: 'price',
            },
            {
                Header: 'Fee',
                accessor: 'fee',
            },
            {
                Header: 'Time',
                accessor: 'time',
            },
            {
                Header: 'Cancel',
                id: 'cancel',
                Cell: ({ original: { ticketId } }) => {
                    return (
                        <SkinnyButton buttonText={'Cancel'} onClick={onCancelFactory(ticketId)} />
                    )
                },
            }
        ]
    )
}

const getTrProps = () => ({ className: "tableRows" });

const OpenOrders = (props) => {
    const { openOrders = [], onCancelFactory } = props;
    return (
        <AutoSizer>
            {
                ({ width, height }) => {
                    /* subtract out material select height */
                    height = height - 0 - 35;
                    return (
                        <div style={{ width, height }}>
                            <StyledTable
                                columns={createColumns(onCancelFactory)} data={openOrders}
                                showPaginationBottom={false}
                                getTableProps={
                                    () => ({ style: { "padding": "0px !important", "textAlign": "left" } })
                                }
                                getTrProps={getTrProps}
                                className="-highlight"
                                getTheadThProps={
                                    () => ({ style: { "textAlign": "left" } })
                                }
                                defaultPageSize={openOrders.length}
                                style={{height}}
                            />
                        </div>
                    )
                }
            }
        </AutoSizer>
    )
};

export default OpenOrders;