import React from 'react';
import styled from 'styled-components';

import Header from './Header';
import OrderHistoryTab from './Tabs/OrderHistory';
import TradeHistoryTab from './Tabs/TradeHistory';
import GbxUtilizationHistoryTab from './Tabs/GbxUtilizationHistory';
import PaymentHistoryTab from './Tabs/PaymentHistory';
import NavReportTab from './Tabs/NavReport';

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    background: #fff;
`;

const TabContent = styled.div`
    position: relative,
`;

class Report extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTabIndex: 0,
        };
    }

    handleTabChange = (tabIndex) => {
        this.setState({
            activeTabIndex: tabIndex,
        });
    };

    render() {
        const { activeTabIndex } = this.state;

        return (
            <Wrapper>
                <Header
                    activeTabIndex={activeTabIndex}
                    onTabChange={this.handleTabChange}
                />
                <TabContent>
                    { activeTabIndex === 0 && <OrderHistoryTab/> }
                    { activeTabIndex === 1 && <TradeHistoryTab/> }
                    { activeTabIndex === 2 && <GbxUtilizationHistoryTab/> }
                    { activeTabIndex === 3 && <PaymentHistoryTab/> }
                    { activeTabIndex === 4 && <NavReportTab/> }
                </TabContent>
            </Wrapper>
        );
    }
}

export default Report;
