import React from 'react';
import { FormattedMessage } from 'react-intl';

import { StyledNameWrapper, Name, ReplyButton } from './MessageComponents';
import { SendCoinsButton, sendCoinsModal } from '../../SendCoins';

const NameWrapper = ({
    color,
    name,
    avatar,
    modal,
    onMouseEnter,
    onMouseLeave,
    replyShown,
    isLoggedIn,
    onReplyClick,
}) => (
    <StyledNameWrapper>
        <Name color={color}>{name}</Name>
        <SendCoinsButton
            className="btn-send-coins"
            onClick={sendCoinsModal(modal, 'graph-chart-parent', name, avatar, color)}
        >
            $
        </SendCoinsButton>
        {replyShown &&
            <ReplyButton onClick={onReplyClick}>
                <FormattedMessage
                    id="telegram.chat.label_reply"
                    defaultMessage="Reply"
                />
            </ReplyButton>
        }
    </StyledNameWrapper>
);

export default NameWrapper;
