import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';

import { STORE_KEYS } from '../../../stores';
import Header from '../Header';
import List from './List';
// import SideHeader from '../../SideHeader';

const Wrapper = styled.section`
    left: ${props =>
        props.sidebar
            ? '0px !important'
            : !props.viewMode
                ? '0'
                : 'calc(-100% - 40px)'};
    width: 100%;
    height: 100%;
    flex: 1;
    transition: all 600ms;
    margin-right: ${props => props.theme.palette.regularSpacer};
    border: 1px solid ${props => props.theme.palette.clrBorder};
    border-radius: ${props => props.theme.palette.cornerRadius};
    z-index: 2;
    box-shadow: 7px 6px 11px rgba(0, 0, 0, 0.25);
    position: absolute;
    left: calc(-100% - 40px);
`;

class Channels extends Component {
    state = {
        searchValue: '',
    };

    componentDidMount() {
        const { [STORE_KEYS.TELEGRAMSTORE]: telegramStore } = this.props;
        telegramStore.getDialogsFrom();
    }

    handleSearch = e => {
        this.setState({ searchValue: e.target.value });
    };

    render() {
        const {
            viewMode,
            sidebar,
            toggleDrawer,
            handleRoomChange,
            header,
            sysId,
            [STORE_KEYS.TELEGRAMSTORE]: telegramStore,
        } = this.props;
        const { isLoggedIn } = telegramStore;
        const { searchValue } = this.state;

        return (
            <Fragment>
                {
                    isLoggedIn ? (
                        <Wrapper viewMode={viewMode} sidebar={sidebar}>
                            <Header
                                type={header}
                                toggleDrawer={toggleDrawer}
                                onSearch={this.handleSearch}
                                value={searchValue}
                                sidebar={sidebar}
                                isJoinable={false}
                                viewMode={viewMode}
                            />

                            {/* <SideHeader isTelegram={false}/> */}

                            <List
                                viewMode={viewMode}
                                toggleDrawer={toggleDrawer}
                                handleRoomChange={handleRoomChange}
                                data={telegramStore.telDialogs}
                                sysId={sysId}
                                searchValue={searchValue.toLowerCase()}
                            />
                        </Wrapper>
                    ) : (
                        <Fragment/>
                    )
                }
            </Fragment>
        );
    }
}

export default inject(STORE_KEYS.TELEGRAMSTORE)(observer(Channels));
