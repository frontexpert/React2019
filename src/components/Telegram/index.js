import React, { Component } from 'react';
import styled from 'styled-components';
import { AutoSizer } from 'react-virtualized';
import { inject, observer } from 'mobx-react';

import Chat from './Chat';
import Channels from './Channels';
import { STORE_KEYS } from '../../stores';
import { viewModeKeys } from '../../stores/ViewModeStore';

const OuterWrapper = styled.div`
    height: 100%;
    /* background-color: ${props => props.theme.palette.clrBorder}; */
    /* border: 1px solid ${props => props.theme.palette.clrBorder}; */
    border-radius: ${props => props.theme.palette.borderRadius};
    grid-area: telegram;
    
    /* means that it's hidden in advanced mode in smaller screens */
    @media (max-width: 1600px) {
        display: ${props => (props.viewMode ? 'none' : 'block')};
    }
`;

const InnerWrapper = styled.section`
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    display: flex;
`;

class Telegram extends Component {
    constructor(props) {
        super(props);

        this.state = {
            left: false,
            right: false,
            channelType: 'channel',
            membersTotal: 0,
            membersOnline: 0,
            // empty by default then switch to search
            channelsHeader: 'search',
            sidebar: true, // Show friends list by default (for signed users)
            sysId: null,
        };

        if (!localStorage.getItem('authToken')) {
            this.state.sidebar = false; // Show chats list by default (for not-signed users)
        }
    }

    static getDerivedStateFromProps(props, state) {
        const {
            [STORE_KEYS.VIEWMODESTORE]: viewModeStore,
            [STORE_KEYS.TRADINGVIEWSTORE]: tradingViewStore,
        } = props;
        const { sidebar } = state;
        const { isCoinListOpen } = tradingViewStore;

        // if (viewModeStore.viewMode === viewModeKeys.friendModeKey && !state.sidebar) {
        //     return {
        //         sidebar: true,
        //     };
        // }
        if ((viewModeStore.viewMode === viewModeKeys.publicChatModeKey && state.sidebar) || (isCoinListOpen && sidebar)) {
            return {
                sidebar: false,
            };
        }
        return null;
    }

    handleRoomChange = (
        name,
        channelType,
        membersTotal,
        membersOnline,
        status,
        sysType,
        sysId,
        sysAccessHash,
    ) => () => {
        // --- grab Data ---
        const { [STORE_KEYS.TELEGRAMSTORE]: telegramStore } = this.props;
        telegramStore.getHistoryByIdHash(
            sysType,
            sysId,
            sysAccessHash,
            0,
            name,
        );

        // --- update state ---
        this.setState({
            channelType,
            membersTotal,
            membersOnline,
            status,
            sysId,
            sidebar: false,
        });
    };

    toggleDrawer = open => () => {
        this.setState({
            sidebar: open,
        });
    };

    render() {
        const {
            left,
            right,
            channelType,
            membersTotal,
            membersOnline,
            channelsHeader,
            status,
            sysId,
            sidebar,
        } = this.state;
        const {
            [STORE_KEYS.VIEWMODESTORE]: viewModeStore,
            [STORE_KEYS.TRADINGVIEWSTORE]: tradingViewStore,
        } = this.props;
        const { viewMode } = viewModeStore;
        const { isCoinListOpen } = tradingViewStore;
        const isAdvancedMode = viewMode === viewModeKeys.advancedModeKey;

        return (
            <OuterWrapper viewMode={isAdvancedMode}>
                <AutoSizer>
                    {({ width, height }) => {
                        return (
                            <InnerWrapper width={width} height={height}>
                                <Channels
                                    toggleDrawer={this.toggleDrawer}
                                    handleRoomChange={this.handleRoomChange}
                                    header={channelsHeader}
                                    viewMode={isAdvancedMode}
                                    sidebar={sidebar}
                                    sysId={sysId}
                                />

                                <Chat
                                    handleRoomChange={this.handleRoomChange}
                                    toggleDrawer={this.toggleDrawer}
                                    channelsOpened={left}
                                    settingsOpened={right}
                                    membersTotal={membersTotal}
                                    membersOnline={membersOnline}
                                    viewMode={isAdvancedMode}
                                    status={status}
                                    channelType={channelType}
                                    channelId={sysId}
                                />
                            </InnerWrapper>
                        );
                    }}
                </AutoSizer>
            </OuterWrapper>
        );
    }
}

export default inject(
    STORE_KEYS.TELEGRAMSTORE,
    STORE_KEYS.VIEWMODESTORE,
    STORE_KEYS.TRADINGVIEWSTORE,
)(observer(Telegram));
