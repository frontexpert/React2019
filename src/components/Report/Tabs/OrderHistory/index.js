import React from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { compose, withProps } from 'recompose';

import { orderHistoryDropdowns } from '../../constants';
import { STORE_KEYS } from '../../../../stores';

import TabHeader from '../../TabHeader';
import TabSubHeader from '../../TabSubHeader';
import TableHeader from '../../TableHeader';
import ReportTable from '../../Table';
import { checkDateIsBetweenTwo } from '../..';

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    text-align: center;
    overflow: hidden;
`;

class OrderHistory extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isExchBarOpen: false,
            startDate: undefined,
            endDate: undefined,
        };
    }

    changeStartDate = (date) => {
        this.setState({
            startDate: date,
        });
    }

    changeEndDate = (date) => {
        this.setState({
            endDate: date,
        });
    }

    render() {
        const orderHistoryColumns = this.props.OrderHistoryData;
        let filteredColumns = [];
        const { startDate, endDate } = this.state;
        for (let i = 0; i < orderHistoryColumns.length; i++) {
            let ithDate = new Date(orderHistoryColumns[i].timeUnFormatted);
            if (checkDateIsBetweenTwo(ithDate, startDate, endDate) === true) {
                filteredColumns.push(orderHistoryColumns[i]);
            }
        }
        return (
            <Wrapper>
                <TabHeader
                    tab="orderHistory"
                    changeStartDate={this.changeStartDate}
                    changeEndDate={this.changeEndDate}
                >
                </TabHeader>
                <TabSubHeader
                    dropdowns={orderHistoryDropdowns}
                    tab="orderHistory"
                />
                <TableHeader/>
                <ReportTable columns={filteredColumns}/>
                <TableHeader/>
            </Wrapper>
        );
    }
}

export default compose(
    inject(
        STORE_KEYS.ORDERHISTORY
    ),
    observer,
    withProps(
        ({
            [STORE_KEYS.ORDERHISTORY]: { OrderHistoryData },
        }) => ({ OrderHistoryData })
    )
)(OrderHistory);
