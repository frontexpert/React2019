import React from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { compose, withProps } from 'recompose';

import { navReportDropdowns } from '../../constants';
import { STORE_KEYS } from '../../../../stores';

import TabHeader from '../../TabHeader';
import TabSubHeader from '../../TabSubHeader';
import ReportTable from '../../Table';
import { checkDateIsBetweenTwo } from '../..';

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    text-align: center;
    overflow: hidden;
`;

class NavReport extends React.Component {
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
        const navReportColumns = this.props.OrderHistoryData;
        let filteredColumns = [];
        const { startDate, endDate } = this.state;
        for (let i = 0; i < navReportColumns.length; i++) {
            let ithDate = new Date(navReportColumns[i].timeUnFormatted);
            if (checkDateIsBetweenTwo(ithDate, startDate, endDate) === true) {
                filteredColumns.push(navReportColumns[i]);
            }
        }
        return (
            <Wrapper>
                <TabHeader
                    tab="navReport"
                    changeStartDate={this.changeStartDate}
                    changeEndDate={this.changeEndDate}
                >
                </TabHeader>
                <TabSubHeader
                    dropdowns={navReportDropdowns}
                    tab="navReport"
                />
                <ReportTable columns={filteredColumns}/>
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
)(NavReport);
