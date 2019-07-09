import React from 'react';
import styled from 'styled-components';

import TabHeader from '../../TabHeader';
import TabSubHeader from '../../TabSubHeader';
import TableHeader from '../../TableHeader';
import ReportTable from '../../Table';
import { paymentHistoryColumns, paymentHistoryDropdowns } from '../../constants';

const Wrapper = styled.div`
    width: 100%;
    text-align: center;
    background-color: #fff;
`;

class PaymentHistory extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isExchBarOpen: false,
        };
    }

    render() {
        return (
            <Wrapper>
                <TabHeader tab="paymentHistory"/>
                <TabSubHeader
                    dropdowns={paymentHistoryDropdowns}
                    tab="paymentHistory"
                />
                <TableHeader/>
                <ReportTable columns={paymentHistoryColumns}/>
                <TableHeader/>
            </Wrapper>
        );
    }
}

export default PaymentHistory;
