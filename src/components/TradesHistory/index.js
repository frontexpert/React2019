import React from 'react';
import ReactTable from "react-table";
import styled from 'styled-components';
import 'react-table/react-table.css';
import {genTradeHistory} from '../../mock/dataGeneratingUtils';
import {AutoSizer} from 'react-virtualized';

const tradeHistoryData = genTradeHistory(12);

const StyledTable = styled(ReactTable)`
    background: ${props => props.theme.palette.backgroundHighContrast} !important;
    color: ${props => props.theme.palette.clrtextD};
    .tableRows{
        border-bottom: 1px solid ${props => props.theme.palette.clrseparator};
    }
`;

const tableProps = () => ({style: {"padding": "0px !important", "textAlign": "left"}});
const tHeadTHProps = () => ({style: {"textAlign": "left"}});

const createColumns = [
    {
        Header: 'Time',
        accessor: 'time',
    },
    {
        Header: 'Pair',
        accessor: 'pair',
    },
    {
        Header: 'Type',
        accessor: 'type',
    },
    {
        Header: 'Price',
        accessor: 'price',
    },
    {
        Header: 'Filled',
        accessor: 'filled',
    },
    {
        Header: 'Fee',
        accessor: 'fee',
    },
    {
        Header: 'Total',
        accessor: 'total',
    }
];

const getTrProps=() => ({className: "tableRows"});

const TradesHistory = () => {
    return (
        <AutoSizer>
            {
                ({width, height}) => {
                    /* subtract out material select height */
                    height = height - 0 - 36;
                    return(
                        <div style={{width, height}}>
                            <StyledTable
                                columns={createColumns} data={tradeHistoryData}
                                showPaginationBottom={false}
                                getTableProps={tableProps}
                                getTrProps={getTrProps}
                                className="-highlight"
                                getTheadThProps={tHeadTHProps}
                                defaultPageSize={tradeHistoryData.length}
                                style={{height}}
                            />
                        </div>
                    )
                }
            }
        </AutoSizer>
    )
};

export default TradesHistory;


