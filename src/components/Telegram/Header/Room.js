import React from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { FormattedMessage } from 'react-intl';
import { AutoSizer } from 'react-virtualized';
import { debounce } from 'lodash';
import { Tooltip } from 'react-tippy';

import { STORE_KEYS } from '../../../stores';
import COIN_DATA_MAP from '../../../mock/coin-data-map';
// import MattriotSwitch from '../../MattriotSwitch';
// import TopSwitch from '../../TopSwitch';
// import DropMenu from '../../../components-generic/ChatsDropdown';
import UserAvatarComponent from '../../SideHeader/UserAvatarComponent';

const Wrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    width: ${props => props.width}px;
    height: ${props => props.height - 1}px;
    margin-top: -30px;
`;

const InnerWrapper = styled.div`
    width: 65%;
    padding: 0 20px;
    text-align: left;
`;

const Name = styled.p`
    margin: 0;
    font-size: 18px;
    font-weight: bold;
    color: ${props => props.theme.palette.telegramRoomName};
    line-height: 1.1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-top: 4px;
    position: relative;
    cursor: pointer !important;
    max-width: ${props => props.width}px;
    display: inline-block;
`;

const Description = styled.div`
    display: flex;
    align-items: center;
`;

const Members = styled.p`
    margin: 0;
    color: ${props => props.theme.palette.telegramRoomMembers};
    font-size: 13px;
    display: inline-block;
`;

const JoinButton = styled.a`
    margin-left: 8px;
    font-size: 12px;
    font-weight: bold;
    color: ${props => props.theme.palette.telegramJoinBtn};
    text-decoration: underline;
    cursor: pointer;
    
    &:hover {
        color: ${props => props.theme.palette.contrastText};
    }
`;

const Chats = styled.div`
    height: 100%;
    margin: 0 8px 0 28px;
    display: flex;
    align-items: center;
    
    &:hover {
        cursor: pointer;
        
        .arrow {
            fill: ${props => props.theme.palette.contrastText};
        }
    }
    
    .arrow {
        width: 10px;
        fill: ${props => props.theme.palette.telegramRoomArrow};
    }
`;

const MenuWrapper = styled.div`
    position: absolute;
    right: 10px;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 40px;
    height: 100%;
    overflow: visible;
`;

class Room extends React.Component {
    componentDidMount() {}

    render() {
        const {
            members, online, toggleDrawer, viewMode, status, channelType, isJoinable, joinChannelWith,
        } = this.props;
        const {
            lastRender, participantsCount, getActiveName, isLoggedIn, leaveChannelWith,
        } = this.props[STORE_KEYS.TELEGRAMSTORE];
        const {
            lastPost, activeCoin, realName, participantsNum,
        } = this.props[STORE_KEYS.TELEGRAMPUBLICSTORE];

        const room = COIN_DATA_MAP[activeCoin] ? (COIN_DATA_MAP[activeCoin].name + ' Channel') : activeCoin;
        const activeRoomName = lastPost > lastRender ? room : getActiveName();
        let participants;

        if (channelType === 'channel') {
            participants = lastPost > lastRender ? participantsNum : participantsCount;
        } else if (channelType === 'chat') {
            participants = members;
        }

        return (
            <AutoSizer>
                {({ width, height }) => {
                    return lastPost > lastRender ? (
                        <Wrapper width={width} height={height}>
                            {/* <TopSwitch /> */}
                            <UserAvatarComponent />

                            <Tooltip
                                arrow={true}
                                animation="shift"
                                position="bottom"
                                distance={18}
                                followCursor
                                // theme="bct"
                                title={`Streaming from ${realName}`}
                            >
                                <InnerWrapper viewMode={viewMode}>
                                    <Name width={width}>
                                        {activeRoomName === 'Store Credit Channel' ? 'Blockchain Terminal Channel' : activeRoomName}
                                    </Name>

                                    {isLoggedIn && (
                                        <Description>
                                            {channelType !== 'person' ? '' : <Members>{status}</Members>}

                                            {isJoinable && (
                                                <JoinButton
                                                    onClick={debounce(() => {
                                                        joinChannelWith();
                                                    }, 500)}
                                                >
                                                    <FormattedMessage
                                                        id="button.join"
                                                        defaultMessage="Join"
                                                    />
                                                </JoinButton>
                                            )}
                                        </Description>
                                    )}
                                </InnerWrapper>
                            </Tooltip>
                        </Wrapper>
                    ) : (
                        <Wrapper width={width} height={height}>
                            {/* <TopSwitch /> */}
                            <UserAvatarComponent />

                            <InnerWrapper viewMode={viewMode}>
                                <Name width={width}>
                                    {activeRoomName === 'Store Credit Channel' ? 'Blockchain Terminal Channel' : activeRoomName}
                                </Name>

                                {isLoggedIn && (
                                    <Description>
                                        {channelType !== 'person' ? <Members>{ participants.toLocaleString('en') + ' members'}</Members> : <Members>{status}</Members>}

                                        {isJoinable && (
                                            <JoinButton
                                                onClick={debounce(() => {
                                                    joinChannelWith();
                                                }, 500)}
                                            >
                                                <FormattedMessage
                                                    id="button.join"
                                                    defaultMessage="Join"
                                                />
                                            </JoinButton>
                                        )}
                                    </Description>
                                )}
                            </InnerWrapper>
                        </Wrapper>
                    );
                }}
            </AutoSizer>
        );
    }
}

export default inject(
    STORE_KEYS.TELEGRAMSTORE,
    STORE_KEYS.TELEGRAMPUBLICSTORE,
)(observer(Room));
