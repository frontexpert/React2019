import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import isEqual from 'lodash/isEqual';
import uuidv4 from 'uuid/v4';
import { debounce } from 'lodash';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { AutoSizer } from 'react-virtualized';
import Message from './Message';
import MessageInput from './MessageInput';
import loader from './icons/loader.gif';
import TelegramLogin from '../../../TelegramLogin';

const WrapperInner = styled.div`
    padding: 15px 30px;
`;

const Loadlabel = styled.div`
    position: absolute;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: ${props => (props.err ? '40px' : 0)};
    padding-right: 15px;
    width: 100%;
    height: 100%;
    color: ${props => props.theme.palette.clrPurple};
    font-size: 16px;
`;

const StyleWrapper = styled.section`
    overflow-y: overlay;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: stretch;
    width: ${props => props.width}px; //  - (props.viewMode ? 0 : 1)
    height: ${props => props.height - 61}px;
    background-color: ${props => props.theme.palette.telegramBackground};
    border-radius: ${props =>
        (props.viewMode &&
            `0 0 ${props.theme.palette.borderRadius} ${
                props.theme.palette.borderRadius
            }`) ||
        `0 0 ${props.theme.palette.borderRadius} 0`};
    border-top: 1px solid ${props => props.theme.palette.clrBorder};
`;

const StyleChatWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%; // ${props => (props.isLoggedIn ? '100%' : 'calc(100% -  56px)')};
    overflow-y: overlay;
    
    .ps__rail-y {
        background-color: ${props => props.theme.palette.telegramBackground} !important;
        border-left: 1px solid ${props => props.theme.palette.walletScrollBorder};
        opacity: 1 !important;
        
        .ps__thumb-y {
            z-index: 9999;
            cursor: pointer;
            
            &:before {
                background-color: ${props => props.theme.palette.walletScrollThumbBack};
            }
        }
    }
`;

const Loader = styled.img`
    width: 50px;
    height: 50px;
    position: absolute;
    top: 15px;
    left: calc(50% - 25px);
`;

const TopBar = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: calc(100% - 15px);
    height: 15px;
    background: ${props => props.theme.palette.clrBackground};
    z-index: 1;
`;

const BottomBar = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    width: calc(100% - 15px);
    height: 15px;
    background: ${props => props.theme.palette.clrBackground};
    z-index: 1;
`;

const ScrollBottom = styled.div`
    font-size: 9px;
    color: ${props => props.theme.palette.clrbackCI};
    border-radius: 50%;
    border: 1px solid ${props => props.theme.palette.telegramBackground2};
    position: absolute;
    right: 21px;
    bottom: 12px;
    background: ${props => props.theme.palette.telegramBackground2};
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    opacity: ${props => (props.isVisible ? 1 : 0)};
    transition: 0.3s;

    .scroll-bottom-button {
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        padding: 0 4px;
        width: 28px;
        height: 28px;
        text-align: center;
        line-height: 9px;
        color: ${props => props.theme.palette.clrbackCI};
        cursor: pointer;
        background: transparent;
        outline: none;

        .sprite-icon {
            width: 15px;
            height: 15px;
            fill: ${props => props.theme.palette.clricon};
            transform: rotateZ(180deg);
        }

        &:hover {
            outline: none;

            .sprite-icon {
                fill: ${props => props.theme.palette.clrtextL};
            }
        }

        &:active {
            outline: none;
        }
    }
`;

const generateMessages = (activeChats, width, isLoggedIn, handleReplyClick) => {
    return activeChats.map(item => (
        <Message
            item={item}
            key={uuidv4()}
            parentWidth={width}
            isLoggedIn={isLoggedIn}
            onReplyClick={handleReplyClick(item)}
        />
    ));
};

class Messages extends React.PureComponent {
    messageInput = null;

    constructor(props) {
        super(props);

        this.perfectScrollRef = null;
        this.isLoader = false;
        this.lazyLoadIndex = 0;

        this.lazyReload = debounce(() => {
            this.isLoader = true;
            if (this.lazyLoadIndex > 0 && this.lazyLoadIndex < 4) {
                console.log('Round level:', this.lazyLoadIndex);
                this.moveScrollToPosition();
                this.props.getNextRoundHistory(this.lazyLoadIndex);
            }
            this.lazyLoadIndex = this.lazyLoadIndex + 1;
            this.isLoader = false;
        }, 100);

        this.state = {
            isScrollBottomVisible: false,
            replyMessage: null,
        };
    }

    componentDidMount() {
        setTimeout(this.handleScrollBottom, 10);
    }

    componentWillReceiveProps(props) {
        if (props.activeRound === 0) {
            this.lazyLoadIndex = 0;
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let lastMsgPrev = null;
        if (prevProps.chats && prevProps.chats.length) {
            lastMsgPrev = prevProps.chats[prevProps.chats.length - 1];
        }

        let lastMsg = null;
        if (this.props.chats && this.props.chats.length) {
            lastMsg = this.props.chats[this.props.chats.length - 1];
        }

        if (!isEqual(lastMsg, lastMsgPrev)) {
            setTimeout(this.handleScrollBottom, 10);
        }

        if (prevProps.channelId !== this.props.channelId) {
            this.handleCloseReply();
        }
    }

    moveScrollToPosition = () => {
        if (this.perfectScrollRef) {
            const topPos =
                this.perfectScrollRef.scrollHeight / (this.lazyLoadIndex + 1);
            if (topPos > 0) {
                this.perfectScrollRef.scrollTop = topPos;
            }
        }
    };

    handleScrollBottom = () => {
        if (this.perfectScrollRef) {
            this.perfectScrollRef.scrollTop = this.perfectScrollRef.scrollHeight;
        }
    };

    handleScrollBottomSmooth = (duration = 300) => {
        if (!this.perfectScrollRef) { return; }
        const difference =
            this.perfectScrollRef.scrollHeight -
            this.perfectScrollRef.clientHeight -
            this.perfectScrollRef.scrollTop;
        const perTick = (difference / duration) * 10;

        setTimeout(() => {
            if (!this.perfectScrollRef) { return; }
            this.perfectScrollRef.scrollTop =
                this.perfectScrollRef.scrollTop + perTick;
            if (
                this.perfectScrollRef.scrollTop ===
                this.perfectScrollRef.scrollHeight -
                    this.perfectScrollRef.clientHeight
            ) {
                return;
            }
            this.handleScrollBottomSmooth(duration - 10);
        }, 10);
    };

    handleScrollY = () => {
        if (this.perfectScrollRef) {
            this.setState({
                isScrollBottomVisible:
                    this.perfectScrollRef.scrollTop !==
                    this.perfectScrollRef.scrollHeight -
                        this.perfectScrollRef.clientHeight,
            });
        }
    };

    handleScrollYEnd = () => {
        this.setState({
            isScrollBottomVisible: false,
        });
    };

    handleReplyClick = item => () => {
        this.setState({ replyMessage: item });
        // this needs to be tested
        this.messageInput.wrappedInstance.inputRef.focus();
    };

    handleCloseReply = () => {
        this.setState({ replyMessage: null });
    };

    render() {
        const {
            chats,
            errMsg,
            inputChatAvailable,
            sendText,
            viewMode,
            isLoggedIn,
            loginBtnLocation,
        } = this.props;
        const { isScrollBottomVisible, replyMessage } = this.state;

        return (
            <AutoSizer>
                {({ width, height }) => (
                    <StyleWrapper
                        className="telegram-chat-messages"
                        width={width}
                        height={height}
                        viewMode={viewMode}
                    >
                        <StyleChatWrapper isLoggedIn={isLoggedIn || loginBtnLocation}>
                            <ScrollBottom isVisible={isScrollBottomVisible}>
                                <button
                                    className="scroll-bottom-button"
                                    onClick={() =>
                                        this.handleScrollBottomSmooth(300)
                                    }
                                >
                                    <svg
                                        className="sprite-icon"
                                        role="img"
                                        aria-hidden="true"
                                    >
                                        <use
                                            xmlnsXlink="http://www.w3.org/1999/xlink"
                                            xlinkHref="img/sprite-basic.svg#arrow-up"
                                        />
                                    </svg>
                                </button>
                            </ScrollBottom>

                            <TopBar/>
                            <BottomBar/>

                            <PerfectScrollbar
                                containerRef={element => {
                                    this.perfectScrollRef = element;
                                }}
                                onYReachStart={() => {
                                    this.lazyReload();
                                }}
                                onScrollY={this.handleScrollY}
                                onYReachEnd={this.handleScrollYEnd}
                                option={{ suppressScrollX: true, minScrollbarLength: 40, maxScrollbarLength: 60 }}
                            >
                                <WrapperInner className="telegram-chat-messages-inner">
                                    {generateMessages(
                                        chats,
                                        width,
                                        isLoggedIn,
                                        this.handleReplyClick,
                                    )}
                                </WrapperInner>
                            </PerfectScrollbar>

                            {chats.length <= 0 && errMsg.length === 0 && (
                                <Loadlabel err={false}>
                                    <span>
                                        <FormattedMessage
                                            id="telegram.chat.label_lodaing"
                                            defaultMessage="Loading..."
                                        />
                                    </span>
                                </Loadlabel>
                            )}

                            {chats.length <= 0 && errMsg.length !== 0 && (
                                <Loadlabel err={true}>{errMsg}</Loadlabel>
                            )}

                            {this.isLoader && <Loader src={loader} alt="" />}
                        </StyleChatWrapper>

                        {inputChatAvailable && (
                            <MessageInput
                                ref={el => {
                                    this.messageInput = el;
                                }}
                                onSendText={sendText}
                                onSendFinish={this.handleScrollBottom}
                                replyMessage={replyMessage}
                                onCloseReply={this.handleCloseReply}
                            />
                        )}

                        {/*
                        {!isLoggedIn && !loginBtnLocation && (
                            <TelegramLogin/>
                        )}
                        */}
                    </StyleWrapper>
                )}
            </AutoSizer>
        );
    }
}

export default Messages;
