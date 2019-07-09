import React from 'react';
import styled from 'styled-components';

import TabHeader from '../../TabHeader';
import TabSubHeader from '../../TabSubHeader';
import TableHeader from '../../TableHeader';
import ReportTable from '../../Table';

import { orderHistoryColumns, orderHistoryDropdowns } from '../../constants';

const Wrapper = styled.div`
    width: 100%;
    text-align: center;
    background-color: #fff;
`;

const Table = styled.table`
    width: 100%;
    border-top: 1px solid #dedede;
    border-bottom: 1px solid #dedede;
`;

const TableCell = styled.td`
    font-size: 11px;
    color: #a8a8a8;
`;


class OrderHistory extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isExchBarOpen: false,
        };
    }

    render() {
        return (
            <Wrapper>
                <TabHeader tab="orderHistory"/>
                <TabSubHeader
                    dropdowns={orderHistoryDropdowns}
                    tab="orderHistory"
                />
                <TableHeader/>
                <ReportTable columns={orderHistoryColumns}/>
                <TableHeader/>
            </Wrapper>
        );
    }
}

export default OrderHistory;
