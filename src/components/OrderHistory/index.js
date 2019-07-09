import React from 'react';
import ReactTable from "react-table";
import styled from 'styled-components';
import 'react-table/react-table.css';
import 'crypto-icons/font.css';
import 'crypto-icons/styles.css';
import { compose } from "recompose";
import { withOrderHistoryData } from "../../hocs/OrderHistoryData/index";
import {AutoSizer} from 'react-virtualized';

const StyledTable = styled(ReactTable)`
    background: ${props => props.theme.palette.backgroundHighContrast} !important;
    color: ${props => props.theme.palette.clrtextD};
    .tableRows{
        border-bottom: 1px solid ${props => props.theme.palette.clrseparator};
    }
`;

const tableProps = () => ({ style: { "padding": "0px !important", "textAlign": "left" } });
const tHeadTHProps = () => ({ style: { "textAlign": "left" } });

const createColumns = [
    {
        Header: 'Ticket',
        accessor: 'ticketId', // temporary
    },
    {
        Header: 'Exchange',
        accessor: 'exchange',
    },
    {
        Header: 'Pair',
        accessor: 'product',
    },
    {
        Header: 'Type',
        accessor: 'type',
    },
    {
        Header: 'Side',
        accessor: 'side',
    },
    {
        Header: 'Average',
        accessor: 'average',
    },
    {
        Header: 'Price',
        accessor: 'price',
    },
    {
        Header: 'Size',
        accessor: 'size',
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
        Header: 'Filled',
        accessor: 'filled',
    },
    {
        Header: 'Status',
        accessor: 'orderStatus',
    }
];

const getTrProps = () => ({ className: "tableRows data-testid-orderhistory", "data-testid": "orderhistory" });

const OrderHistory = ({ orderHistoryData = [] }) => {
    return (
        <AutoSizer>
            {
                ({ width, height }) => {
                    /* subtract out material select height */
                    height = height - 0 - 35;
                    return (
                        <div style={{ width, height }}>
                            <StyledTable
                                columns={createColumns} data={orderHistoryData}
                                showPaginationBottom={false}
                                getTableProps={tableProps}
                                getTrProps={getTrProps}
                                className="-highlight"
                                getTheadThProps={tHeadTHProps}
                                defaultPageSize={orderHistoryData.length}
                                style={{height}}
                            />
                        </div>
                    )
                }
            }
        </AutoSizer>
    )
};

export default compose(
    withOrderHistoryData,
)(OrderHistory)