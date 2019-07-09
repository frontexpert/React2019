import React from 'react';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import { inject, observer } from 'mobx-react';

import { STORE_KEYS } from '../../../stores';
import Header from '../Header';
import Messages from './Messages';
// import SideHeader from '../../SideHeader';

const styles = theme => {
    return {
        paper: {
            width: '30%',
        },
    };
};

const Wrapper = styled.div`
    position: relative;
    height: 100%;
    font-size: 0.8rem;
    flex: 1;
    z-index: 1;
    border: 1px solid ${props => props.theme.palette.clrBorder};
    border-radius: ${props => props.theme.palette.cornerRadius};
`;

const InnerWrapper = styled.div`
    position: relative;
    height: 100%;
    display: grid;
    grid-template-rows: 60px auto;
    // grid-gap: 1px;
    filter: ${props => (props.opened ? 'blur(2px)' : 'none')};
`;

const Chat = ({
    toggleDrawer,
    channelsOpened,
    settingsOpened,
    classes,
    membersTotal,
    membersOnline,
    viewMode,
    handleRoomChange,
    simple,
    status,
    channelType,
    channelId,
    [STORE_KEYS.TELEGRAMSTORE]: telegramStore,
    [STORE_KEYS.TELEGRAMPUBLICSTORE]: telegramPublicStore,
}) => {
    const {
        activeChats,
        lastRender,
        sendText,
        activePeerChatAvailable,
        getNextRoundHistory,
        activeRound,
        joinChannelWith,
        isLoggedIn,
        loginBtnLocation,
    } = telegramStore;
    const {
        activeCoinData, lastPost, errMsg, isJoinable,
    } = telegramPublicStore;
    const isChannel = lastPost >= lastRender;
    const chats = isChannel ? activeCoinData : activeChats;

    return (
        <Wrapper>
            <InnerWrapper opened={channelsOpened || settingsOpened}>
                <Header
                    type="default"
                    members={membersTotal}
                    online={membersOnline}
                    toggleDrawer={toggleDrawer}
                    viewMode={viewMode}
                    status={status}
                    channelType={channelType}
                    isJoinable={!isChannel ? false : isJoinable}
                    joinChannelWith={joinChannelWith}
                />

                {/* <SideHeader isTelegram={true}/> */}

                <Messages
                    channelId={channelId}
                    chats={chats}
                    errMsg={errMsg}
                    inputChatAvailable={activePeerChatAvailable && !isChannel}
                    sendText={sendText}
                    getNextRoundHistory={getNextRoundHistory}
                    activeRound={activeRound}
                    viewMode={viewMode}
                    isLoggedIn={isLoggedIn}
                    loginBtnLocation={loginBtnLocation}
                />
            </InnerWrapper>
        </Wrapper>
    );
};

export default withStyles(styles)(
    inject(STORE_KEYS.TELEGRAMSTORE, STORE_KEYS.TELEGRAMPUBLICSTORE)(
        observer(Chat),
    ),
);
