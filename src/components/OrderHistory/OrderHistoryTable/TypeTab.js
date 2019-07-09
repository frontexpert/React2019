import React, { Component } from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

const TabWrapper = styled.div`
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Tab = styled.div`
    padding: 12px 8px;
    flex: 1;
    border-bottom: 1px solid ${props => props.active ? props.theme.palette.btnPrimaryActiveText : 'transparent'};
    font-size: 12px;
    color: ${props => props.active ? props.theme.palette.btnPrimaryActiveText : props.theme.palette.clrtextL};
    cursor: pointer;
`;

export default class TypeTab extends Component {
    state = {
        tab: 'open',
    };

    changeTab = tab => {
        this.setState({ tab });
    };

    render() {
        const { tab } = this.state;

        return (
            <TabWrapper>
                <Tab active={tab === 'open'} onClick={() => this.changeTab('open')}>
                    <FormattedMessage
                        id="order_history.label_open"
                        defaultMessage="Open"
                    />
                </Tab>
                <Tab active={tab === 'all'} onClick={() => this.changeTab('all')}>
                    <FormattedMessage
                        id="order_history.label_all"
                        defaultMessage="All"
                    />
                </Tab>
            </TabWrapper>
        )
    }
}
