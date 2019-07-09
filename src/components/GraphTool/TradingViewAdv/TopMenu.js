import React, { Component } from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';

import CloseIcon from '@material-ui/icons/Close';

import {
    Menu,
    HeaderTitle,
    DropMenuWrapper
} from './Components';
import DropMenu from './DropMenu';
import { STORE_KEYS } from '../../../stores';

const CloseIconWrapper = styled.div`
    position: absolute;
    top: 10px;
    right: 20px;
    cursor: pointer;
`;

class TopMenu extends Component {
    state = {};

    handleClickClose = () => {
        const { setRightTopSectionGridMode } = this.props[STORE_KEYS.VIEWMODESTORE];

        setRightTopSectionGridMode('graph');
    };

    render() {
        const accountData = ['All accounts', 'Filled', 'Canceled', 'Rejected', 'Expired'];
        const currencyData = ['All currency', 'Filled', 'Canceled', 'Rejected', 'Expired'];
        const TotalData = ['Total', 'Filled', 'Canceled', 'Rejected', 'Expired'];
        return (
            <Menu>
                <HeaderTitle>Accounts</HeaderTitle>
                <DropMenuWrapper>
                    <DropMenu data={accountData} label="All accounts"/>
                    <DropMenu data={currencyData} label="All currency"/>
                    <DropMenu data={TotalData} label="Total"/>
                </DropMenuWrapper>

                <CloseIconWrapper onClick={this.handleClickClose}>
                    <CloseIcon/>
                </CloseIconWrapper>
            </Menu>
        );
    }
}

export default inject(
    STORE_KEYS.VIEWMODESTORE,
)(observer(TopMenu));
