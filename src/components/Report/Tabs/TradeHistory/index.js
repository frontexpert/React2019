import React from 'react';
import styled from 'styled-components';

import TabHeader from '../../TabHeader';
import TabSubHeader from '../../TabSubHeader';
import TableHeader from '../../TableHeader';
import ReportTable from '../../Table';

import { tradeHistoryColumns, tradeHistoryDropdowns } from '../../constants';

const Wrapper = styled.div`
    width: 100%;
    text-align: center;
    background-color: #fff;
`;

const dropdowns = [
    'instrument',
    'account',
    'side',
    'makerTaker',
    'source'
];

class TradeHistory extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isExchBarOpen: false,
        };
    }

    render() {
        return (
            <Wrapper>
                <TabHeader tab="tradeHistory"/>
                <TabSubHeader
                    dropdowns={dropdowns}
                    tab="tradeHistory"
                />
                <TableHeader/>
                <ReportTable columns={tradeHistoryColumns}/>
                <TableHeader/>
            </Wrapper>
        );
    }
}

export default TradeHistory;
