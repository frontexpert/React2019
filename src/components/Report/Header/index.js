import React from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react/index';

import CloseIcon from '@material-ui/icons/Close';
import { STORE_KEYS } from '../../../stores';

const Wrapper = styled.div`
    width: 100%;
    text-align: center;
    background-color: ${props => props.theme.palette.clrBackground};
    position: relative;
    color: ${props => props.theme.palette.clrPurple};
    border: 1px solid #454c73;
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
    color: ${props => props.theme.palette.clrPurple};
    
    &:hover::after {
        width: 80%;
        color: ${props => props.theme.palette.clrHighContrast};
    }
    
    &::after {
        display: block;
        content: "";
        width: 0%;
        height: 1px;
        background: #fff;
        margin: 0 auto;
        -webkit-transition: .2s ease-in-out;
        transition:  .2s ease-in-out;
    }
`;

const TabItemSelected = styled(TabItem)`
    color: ${props => props.theme.palette.clrHighContrast};
    &::after {
        width: 80%;
    }
`;

const TabList = styled.div`
    display: flex;
    justify-content: center;
    font-weight: 700;
    font-family: 'open_sans',sans-serif;
    color: ${props => props.theme.palette.clrPurple};
    background-color: ${props => props.theme.palette.clrMainWindow};
    border-bottom: 1px solid #454c73;
`;

const Title = styled.div`
    font-size: 22px;
    font-weight: 700;
    font-family: 'open_sans',sans-serif;
    padding-top: 10px;
    color: ${props => props.theme.palette.clrHighContrast};
    background-color: ${props => props.theme.palette.clrMainWindow};
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
        const { setRightTopSectionGridMode } = this.props[STORE_KEYS.VIEWMODESTORE];

        setRightTopSectionGridMode('graph');
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
                                return <TabItemSelected onClick={() => this.handleClickTabItem(i)} key={i}>{tab}</TabItemSelected>;
                            }

                            return <TabItem onClick={() => this.handleClickTabItem(i)} key={i}>{tab}</TabItem>;
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
