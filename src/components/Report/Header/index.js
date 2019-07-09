import React from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react/index';

import CloseIcon from '@material-ui/icons/Close';
import { STORE_KEYS } from '../../../stores';

const Wrapper = styled.div`
    width: 100%;
    text-align: center;
    padding-bottom: 27px;
    background: #e4e2e5;
    position: relative;
`;

const CloseIconWrapper = styled.div`
    position: absolute;
    top: 10px;
    right: 20px;
    cursor: pointer;
`;

const TabItem = styled.div`
    font-size: 13px;
    padding: 15px 20px;
    cursor: pointer;
    
    &:hover::after {
        width: 80%;
    }
    
    &::after {
        display: block;
        content: "";
        width: 0%;
        height: 1px;
        background: #09f;
        margin: 0 auto;
        -webkit-transition: .2s ease-in-out;
        transition:  .2s ease-in-out;
    }
`;

const TabItemSelected = styled(TabItem)`
    color: #09f;
    
    &::after {
        width: 80%;
    }
`;

const TabList = styled.div`
    display: flex;
    justify-content: center;
    background-color: #fff;
`;

const Title = styled.div`
    font-size: 22px;
    font-weight: 100;
    padding-top: 10px;
    background-color: #fff;
`;

const tabs = [
    'Order history',
    'Trade history',
    'GBX utilization history',
    'Payment history',
    'NAV report'
];

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isExchBarOpen: false,
        };
    }

    handleClickClose = () => {
        const { setReportMode } = this.props[STORE_KEYS.VIEWMODESTORE];

        setReportMode(false);
    };

    handleClickTabItem = (tabIndex) => {
        this.props.onTabChange(tabIndex);
    };

    render() {
        const { activeTabIndex } = this.props;

        return (
            <Wrapper>
                <Title>Reports</Title>
                <TabList>
                    {
                        tabs.map((tab, i) => {
                            if (activeTabIndex === i) {
                                return <TabItemSelected onClick={() => this.handleClickTabItem(i)}>{tab}</TabItemSelected>;
                            }

                            return <TabItem onClick={() => this.handleClickTabItem(i)}>{tab}</TabItem>;
                        })
                    }
                </TabList>
                <CloseIconWrapper onClick={this.handleClickClose}>
                    <CloseIcon/>
                </CloseIconWrapper>
            </Wrapper>
        );
    }
}

export default inject(
    STORE_KEYS.VIEWMODESTORE,
)(observer(Header));
