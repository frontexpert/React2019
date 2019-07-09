import React from 'react';
import styled from 'styled-components';
import { compose, withProps } from 'recompose';
import { inject, observer } from 'mobx-react';

import { STORE_KEYS } from '../../../stores';
import ChannelAvatar from './ChannelAvatar';
import groupIcon from './icons/group.png';
import { sendCoinsModal, SendCoinsButton } from '../SendCoins';

const ItemWrapper = styled.section`
    display: flex;
    padding: 6px 25px 6px 20px;
    height: 62px !important;
    align-items: center;
    position: relative;
    
    &:not(:last-child) {
        /* border-bottom: 1px solid ${props => props.theme.palette.telegramSeparator}; */
        &:after {
            content: '';
            position: absolute;
            left: 0;
            bottom: 0;
            right: 10px;
            height: 1px;
            background-color: ${props => props.theme.palette.telegramBackground};
        }
    }
    
    &:hover {
        cursor: pointer;
        background-color: ${props => props.theme.palette.telegramChannelsHover};

        p, span {
            color: ${props => props.theme.palette.telegramChannelsItemHover};
        }
        
        &:not(:last-child) {
            &:after {
                background-color: transparent;
            }
        }
    }
    
    &.active {
        background-color: ${props => props.theme.palette.telegramChannelsActive};
        
        * {
            color: #ffffff !important;
        }
        
        .unread {
            // background-color: #7BA4CB;
            // color: #2B5379 !important;
        }
        
        .btn-send-coins {
            // background-color: #047fda !important;
        }
    }
`;

const GroupIcon = styled.img`
    // width: 18px;
    height: 10px;
    margin-right: 4px;
`;

const Name = styled.p`
    margin: 0;
    font-size: 13px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${props => props.theme.palette.telegramChannelName};
`;

const Date = styled.p`
    color: ${props => props.theme.palette.telegramChannelDate};
    font-size: 12px;
    margin: 0 0 0 auto;
`;

const LastMessage = styled.div`
    margin: 4px 0 0;
    display: flex;
    align-items: center;
    font-size: 13px;
    font-weight: normal;
    color: ${props => props.theme.palette.telegramChannelUnreadMessage};

    p {
        margin: 0;
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    span {
        color: ${props => props.theme.palette.telegramSender};
    }
`;

const ContentWrapper = styled.div`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1;
`;

const AdditionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`;

const NameWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const Unread = styled.div`
    min-width: 17px;
    height: 17px;
    padding: 0 5px;
    margin: 0 0 0 8px;
    background-color: ${props => props.theme.palette.telegramTotalMessagesBackground};
    border-radius: 10px;
    font-size: 11px;
    color: ${props => props.theme.palette.telegramTotalMessagesText};
    display: flex;
    align-items: center;
    justify-content: center;
`;

class Item extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            imageUrl: '',
        };
    }

    componentDidMount() {}

    updateImage = url => {
        this.setState({
            imageUrl: url,
        });
    };

    render() {
        const { data, Modal, handleRoomChange } = this.props;
        const { imageUrl } = this.state;
        const {
            photo,
            name,
            date,
            lastMessage,
            unread,
            sendCoins,
            active,
            from,
            type,
            membersTotal,
            membersOnline,
            status,
            sysType,
            sysId,
            sysAccessHash,
            color,
        } = data;

        return (
            <ItemWrapper
                className={this.props.sysId === sysId ? 'active' : ''}
                onClick={handleRoomChange(
                    name,
                    type,
                    membersTotal,
                    membersOnline,
                    status,
                    sysType,
                    sysId,
                    sysAccessHash,
                )}
            >
                <ChannelAvatar
                    name={name}
                    photo={photo}
                    updateImage={url => this.updateImage(url)}
                    color={color}
                />

                <ContentWrapper>
                    <NameWrapper>
                        {type === 'channel' && (
                            <GroupIcon src={groupIcon} alt="" />
                        )}
                        <Name>{name}</Name>
                        {sendCoins && (
                            <SendCoinsButton
                                onClick={sendCoinsModal(
                                    Modal,
                                    'graph-chart-parent',
                                    name,
                                    imageUrl,
                                    color,
                                )}
                                className="btn-send-coins"
                            >
                                $
                            </SendCoinsButton>
                        )}
                        <Date>{date}</Date>
                    </NameWrapper>

                    <LastMessage>
                        <p>
                            {from ? <span>{from}</span> : null} {lastMessage}
                        </p>
                        {unread > 0 && (
                            <Unread className="unread" active={active}>
                                {unread}
                            </Unread>
                        )}
                    </LastMessage>
                </ContentWrapper>
            </ItemWrapper>
        );
    }
}

export default compose(
    inject(STORE_KEYS.MODALSTORE),
    observer,
    withProps(({ [STORE_KEYS.MODALSTORE]: { Modal } }) => ({
        Modal,
    })),
)(Item);
