import React, { Fragment } from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';

import { STORE_KEYS } from '../../../../../stores';
import { getItemColor } from '../../../../../utils';
import { CloseIcon, ReplyIcon } from './icons';

const StyleWrapper = styled.div`
    flex-shrink: 0;
    min-height: 56px;
    height: min-content;
    width: 100%;
    background-color: ${props => props.theme.palette.telegramBackground};
    border-top: 1px solid ${props => props.theme.palette.telegramBorder};
    
    .user-pic__avatar {
        font-size: 12px;
        color: #fff;
        max-width: 100%;
        max-height: 100%;
        z-index: 0;
    }
    
    .message-bar {
        position: relative;
        height: min-content;
        min-height: 56px;
        padding: 0 10px;
        display: flex;
        align-items: flex-start;
    
        --inner-accent: #607580;
    
        &.-clr-pink {
            --inner-accent: #f17cb1;
        }
    
        &.-clr-yellow {
            --inner-accent: #d4bf71;
        }
    
        &.-clr-green {
            --inner-accent: #72c16e;
        }
    
        &.-clr-blue {
            --inner-accent: #009FE3;
        }
    
        &__user-pic {
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 8px 2px 2px;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-image: url("/img/default-avatar.png");
            background-size: contain;
            overflow: hidden;
            z-index: 0;
        }
    
        &__input {
            display: block;
            background-color: ${props => props.theme.palette.telegramAppMessageBackground};
            border: 1px solid ${props => props.theme.palette.telegramInputText};
            border-radius: ${props => props.theme.palette.borderRadius};
            outline: none;
            height: 32px;
            min-width: 0;
            font-size: 13px;
            margin: 12px 2px 12px 14px;
            flex: 1 1;
            padding: 9px 65px 9px 9px;
            transition: all .1s;
            color: ${props => props.theme.palette.telegramInputText};
    
            &::placeholder {
                color: ${props => props.theme.palette.telegramInputText};
            }
    
            // &:focus {
            //     background: ${props => props.theme.palette.clrback};
            //     border-color: ${props => props.theme.palette.clrseparator};
            // }
        }
    
        &__btn {
            position: absolute;
            top: 0;
            right: 42px;
            width: 35px;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            transition: all .1s;
            border: none;
            background: transparent;
            outline: none;
    
            &:hover {
                .sprite-icon {
                    fill: ${props => props.theme.palette.contrastText};
                    outline: none;
                }
            }
    
            &.active {
                .sprite-icon {
                    fill: ${props => props.theme.palette.clraccent};
                    outline: none;
                }
            }
    
            .sprite-icon {
                width: 18px;
                height: 18px;
                fill: ${props => props.theme.palette.telegramInputText};
                transition: all 0.1s;
    
                &.chats-clip {
                    width: 18px;
                    height: 21px;
                }
    
                &.chats-image {
                    width: 24px;
                    height: 24px;
                }
    
                &.chats-mic {
                    width: 17px;
                    height: 22px;
                }
    
                &.chats-camera {
                    width: 24px;
                    height: 20px;
                }
            }
        }
    }
`;

const DefaultAvatar = styled.div`
    position: absolute;
    width: 40px;
    height: 40px;
    background: ${props => props.color};
    color: #fff;
    font-size: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    min-width: 40px;
    min-height: 40px;
    margin: 0;
    z-index: 0;
`;

const TelegramSvg = styled.svg`
    position: absolute;
    top: 28px;
    right: 18px;
    width: 24px;
    height: 24px;
    cursor: pointer;
    fill: ${props => props.theme.palette.telegramInputText};
    transform: translateY(-50%);
    transition: all 0.1s;

    &:hover {
        fill: ${props => props.theme.palette.contrastText};
    }

    &.active {
        fill: ${props => props.theme.palette.clraccent};
    }
`;

const ReplyWrapper = styled.div`
    flex-shrink: 0;
    min-height: 56px;
    height: min-content;
    width: 100%;
    background-color: ${props => props.theme.palette.telegramReplyBackground};
    border-top: 1px solid ${props => props.theme.palette.telegramBorder};
    display: flex;
    align-items: center;
`;

const MessageWrapper = styled.div`
    flex: 1;
`;

const Name = styled.p`
    margin: 0 0 3px 0;
    color: ${props => props.color};
`;

const Text = styled.p`
    margin: 0;
    color: ${props => props.theme.palette.clrHighContrast};
    word-break: break-all;
`;

class MessageInput extends React.Component {
    inputRef = null;

    state = {
        value: '',
    };

    handleInputChange = e => {
        this.setState({
            value: e.target.value,
        });
    };

    sendMessage = () => {
        const { isSendingMessage } = this.props[STORE_KEYS.TELEGRAMSTORE];

        if (!isSendingMessage) {
            // Reset input
            this.setState({
                value: '',
            });

            // Reset reply
            if (this.props.replyMessage) {
                this.handleCloseReply();
            }

            this.props
                .onSendText(this.state.value, this.props.replyMessage)
                .then(res => {
                    console.log('Message sent successful', res);

                    // Scroll to bottom
                    this.props.onSendFinish();

                    // Focus input
                    this.inputRef.focus();
                })
                .catch(err => {
                    console.log('Can not send message', err);
                });
        }
    };

    handleKeyDown = e => {
        if (e.key === 'Enter') {
            this.sendMessage();
        }
    };

    handleCloseReply = () => {
        this.setState({ value: '' });
        this.props.onCloseReply();
    };

    render() {
        const { value } = this.state;
        const {
            isSendingMessage, loggedInUser, logoURL, isProfileLogoExists,
        } = this.props[
            STORE_KEYS.TELEGRAMSTORE
        ];

        const { replyMessage, onCloseReply } = this.props;

        let symbolName = '';
        let userName = '';
        let colorStr = '';
        if (loggedInUser) {
            const { firstname, lastname } = loggedInUser;

            if (firstname && firstname.length > 0) {
                symbolName = firstname[0];
                colorStr = firstname;
            }
            if (lastname && lastname.length > 0) {
                symbolName += lastname[0];
                colorStr += ` ${lastname}`;
            }
            userName = loggedInUser.username;
        }

        return (
            <Fragment>
                {replyMessage && (
                    <ReplyWrapper>
                        <ReplyIcon />
                        <MessageWrapper>
                            <Name color={replyMessage.user.color}>
                                {replyMessage.user.name}
                            </Name>
                            {replyMessage.text && (
                                <Text>{replyMessage.text}</Text>
                            )}
                            {replyMessage.media && (
                                <Text>Media</Text>
                            )}
                        </MessageWrapper>
                        <CloseIcon onClick={this.handleCloseReply} />
                    </ReplyWrapper>
                )}

                <StyleWrapper className="telegram-chat-messages-input">
                    <div className="message-bar">
                        <div className="message-bar__user-pic user-pic">
                            <DefaultAvatar
                                color={getItemColor(colorStr).hexColor}
                            >
                                {symbolName.toUpperCase()}
                            </DefaultAvatar>
                            {
                                isProfileLogoExists &&
                                <img
                                    alt=""
                                    className="user-pic__avatar"
                                    src={logoURL}
                                />
                            }
                        </div>

                        <input
                            className="message-bar__input"
                            placeholder="Write a message..."
                            ref={el => {
                                this.inputRef = el;
                            }}
                            value={value}
                            onChange={this.handleInputChange}
                            onKeyDown={this.handleKeyDown}
                            disabled={isSendingMessage}
                        />

                        {/* <button className="message-bar__btn"> */}
                        {/* <svg */}
                        {/* className="sprite-icon chats-camera" */}
                        {/* role="img" */}
                        {/* aria-hidden="true" */}
                        {/* > */}
                        {/* <use */}
                        {/* xmlnsXlink="http://www.w3.org/1999/xlink" */}
                        {/* xlinkHref="img/sprite-basic.svg#camera" */}
                        {/* /> */}
                        {/* </svg> */}
                        {/* </button> */}

                        <TelegramSvg viewBox="0 0 24 24" onClick={this.sendMessage}>
                            <path d="M 20.302734 2.984375 C 20.013769 2.996945 19.748583 3.080055 19.515625 3.171875 C 19.300407 3.256634 18.52754 3.5814726 17.296875 4.0976562 C 16.06621 4.61384 14.435476 5.2982348 12.697266 6.0292969 C 9.2208449 7.4914211 5.314238 9.1361259 3.3125 9.9785156 C 3.243759 10.007156 2.9645852 10.092621 2.65625 10.328125 C 2.3471996 10.564176 2.0039062 11.076462 2.0039062 11.636719 C 2.0039062 12.088671 2.2295201 12.548966 2.5019531 12.8125 C 2.7743861 13.076034 3.0504903 13.199244 3.28125 13.291016 L 3.28125 13.289062 C 4.0612776 13.599827 6.3906939 14.531938 6.9453125 14.753906 C 7.1420423 15.343433 7.9865895 17.867278 8.1875 18.501953 L 8.1855469 18.501953 C 8.3275588 18.951162 8.4659791 19.243913 8.6582031 19.488281 C 8.7543151 19.610465 8.8690398 19.721184 9.0097656 19.808594 C 9.0637596 19.842134 9.1235454 19.868148 9.1835938 19.892578 C 9.191962 19.896131 9.2005867 19.897012 9.2089844 19.900391 L 9.1855469 19.894531 C 9.2029579 19.901531 9.2185841 19.911859 9.2363281 19.917969 C 9.2652427 19.927926 9.2852873 19.927599 9.3242188 19.935547 C 9.4612233 19.977694 9.5979794 20.005859 9.7246094 20.005859 C 10.26822 20.005859 10.601562 19.710937 10.601562 19.710938 L 10.623047 19.695312 L 12.970703 17.708984 L 15.845703 20.369141 C 15.898217 20.443289 16.309604 21 17.261719 21 C 17.829844 21 18.279025 20.718791 18.566406 20.423828 C 18.853787 20.128866 19.032804 19.82706 19.113281 19.417969 L 19.115234 19.416016 C 19.179414 19.085834 21.931641 5.265625 21.931641 5.265625 L 21.925781 5.2890625 C 22.011441 4.9067171 22.036735 4.5369631 21.935547 4.1601562 C 21.834358 3.7833495 21.561271 3.4156252 21.232422 3.2226562 C 20.903572 3.0296874 20.591699 2.9718046 20.302734 2.984375 z M 19.908203 5.1738281 C 19.799442 5.7198576 17.33401 18.105877 17.181641 18.882812 L 13.029297 15.041016 L 10.222656 17.414062 L 11 14.375 C 11 14.375 16.362547 8.9468594 16.685547 8.6308594 C 16.945547 8.3778594 17 8.2891719 17 8.2011719 C 17 8.0841719 16.939781 8 16.800781 8 C 16.675781 8 16.506016 8.1197812 16.416016 8.1757812 C 15.272368 8.8887854 10.401283 11.664685 8.0058594 13.027344 C 7.8617016 12.96954 5.6973962 12.100458 4.53125 11.634766 C 6.6055146 10.76177 10.161156 9.2658083 13.472656 7.8730469 C 15.210571 7.142109 16.840822 6.4570977 18.070312 5.9414062 C 19.108158 5.5060977 19.649538 5.2807035 19.908203 5.1738281 z M 17.152344 19.025391 C 17.152344 19.025391 17.154297 19.025391 17.154297 19.025391 C 17.154252 19.025621 17.152444 19.03095 17.152344 19.03125 C 17.153615 19.024789 17.15139 19.03045 17.152344 19.025391 z" />
                        </TelegramSvg>
                    </div>
                </StyleWrapper>
            </Fragment>
        );
    }
}

export default inject(STORE_KEYS.TELEGRAMSTORE)(observer(MessageInput));
