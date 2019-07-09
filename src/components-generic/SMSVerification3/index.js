import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { FormattedMessage } from 'react-intl';
import axios from 'axios';

import {
    Wrapper,
    PhoneNumberPartial,
    InputWrapper,
    Input,
    InputAddon,
    QRIcon,
    SendIcon,
    SpinnerIcon
} from './Components';
import { STORE_KEYS } from '../../stores';

const SMS_AUTH_VIEW_STEPS = {
    ENTER_PHONE_NUMBER: 'enter-phone-number',
    ENTER_CODE: 'enter-code',
    VERIFY_SUCCESS: 'verify-success',
};

class SMSVerification extends Component {
    state = {
        currentView: SMS_AUTH_VIEW_STEPS.ENTER_PHONE_NUMBER,
        phoneNumber: '',
        code: '',
        isSendingPhoneNumber: false,
        isPhoneNumberSent: false,
        isSendingCode: false,
        isCodeSent: false,
    };

    handleChangePhoneNumber = e => {
        e.stopPropagation();

        this.setState({
            phoneNumber: e.target.value,
            code: '',
            isPhoneNumberSent: false,
        });
    };

    handleChangeCode = e => {
        e.stopPropagation();

        this.setState({
            code: e.target.value,
        }, () => {
            const { code } = this.state;
            if (code.length < 4) return;
            this.setState({
                isSendingCode: true,
            });
    
            axios.post('https://passport.bct.trade/api/auth/sms/verify_code', {
                code: this.state.code,
                userId: this.state.userId,
            })
                .then(res => {
                    if (res.data && res.data.success) {
                        setTimeout(() => {
                            this.setState({
                                isCodeSent: true,
                                isSendingCode: false,
                                currentView: SMS_AUTH_VIEW_STEPS.VERIFY_SUCCESS,
                            });
    
                            setTimeout(() => {
                                this.props.onClose();
                                // window.location.reload();
                            }, 500);
                        }, 500);
                    } else {
                        return Promise.reject(Error('No success code returned'));
                    }
                })
                .catch(err => {
                    console.log(err);
                    this.setState({
                        isSendingCode: false,
                    });
                });
        });
    };

    handleSendPhoneNumber = e => {
        e.stopPropagation();

        const { phoneNumber } = this.state;
        let phoneNumberTrimed = phoneNumber.replace(/\s+/g, '');
        phoneNumberTrimed = '+' + phoneNumberTrimed.replace(/\+/g, '');

        this.setState({
            isSendingPhoneNumber: true,
        });

        axios.post('https://passport.bct.trade/api/auth/sms/register', {
            phone_number: phoneNumberTrimed,
        })
            .then(res => {
                if (res.data && res.data.success && res.data.userId) {
                    this.setState({
                        isPhoneNumberSent: true,
                        isSendingPhoneNumber: false,
                        currentView: SMS_AUTH_VIEW_STEPS.ENTER_CODE,
                        userId: res.data.userId,
                    });
                } else {
                    return Promise.reject(Error('No success code returned'));
                }
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    isSendingPhoneNumber: false,
                });
            });
    };

    handleGoBack = () => {
        this.setState({
            isPhoneNumberSent: false,
            isSendingPhoneNumber: false,
            currentView: SMS_AUTH_VIEW_STEPS.ENTER_PHONE_NUMBER,
        });

        this.props.onClose();
    };

    render() {
        const {
            currentView,
            phoneNumber,
            code,
            isPhoneNumberSent,
            isSendingPhoneNumber,
            isCodeSent,
            isSendingCode,
        } = this.state;

        const { isMobile = false, handleBack } = this.props;

        return (
            <Wrapper isMobile={isMobile}>
                <PhoneNumberPartial className={currentView} isMobile={isMobile}>
                    <InputWrapper className="phone-number-input">
                        <FormattedMessage
                            id="sms_verification.label_enter_mobile_number"
                            defaultMessage="Enter Mobile Phone Number"
                        >
                            {placeholder =>
                                <Input
                                    type="tel"
                                    placeholder={placeholder}
                                    value={phoneNumber}
                                    onChange={this.handleChangePhoneNumber}
                                    readOnly={isSendingPhoneNumber || isSendingCode || isCodeSent}
                                />
                            }
                        </FormattedMessage>

                        {!isPhoneNumberSent && (
                            <InputAddon onClick={!phoneNumber ? (handleBack || this.handleGoBack) : (isSendingPhoneNumber ? null : this.handleSendPhoneNumber)}>
                                {!phoneNumber ? (
                                    isMobile
                                        ? <QRIcon />
                                        : (
                                            <svg className="sprite-icon close" role="img" aria-hidden="true">
                                                <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="img/sprite-basic.svg#arrow-drop-close"/>
                                            </svg>
                                        )
                                ) : (
                                    isSendingPhoneNumber
                                        ? <SpinnerIcon />
                                        : <SendIcon />
                                )}
                            </InputAddon>
                        )}
                    </InputWrapper>

                    <span className="separator" />

                    <InputWrapper className={`code-input ${currentView}`}>
                        <FormattedMessage
                            id="sms_verification.label_what_code"
                            defaultMessage="What is the code?"
                        >
                            {placeholder =>
                                <Input
                                    type="number"
                                    placeholder={placeholder}
                                    value={code}
                                    onChange={this.handleChangeCode}
                                    readOnly={!isPhoneNumberSent || isSendingPhoneNumber || isSendingCode || isCodeSent}
                                />
                            }
                        </FormattedMessage>

                        {(code && !isCodeSent) ? (
                            isSendingCode &&
                            <InputAddon>
                                <SpinnerIcon />
                            </InputAddon>
                        ) : (
                            <InputAddon onClick={this.handleGoBack}>
                                <svg className="sprite-icon close" role="img" aria-hidden="true">
                                    <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="img/sprite-basic.svg#arrow-drop-close"/>
                                </svg>
                            </InputAddon>
                        )}
                    </InputWrapper>
                </PhoneNumberPartial>
            </Wrapper>
        );
    }
}

export default inject(
    STORE_KEYS.SMSAUTHSTORE,
    STORE_KEYS.TELEGRAMSTORE,
    STORE_KEYS.ORDERHISTORY,
    STORE_KEYS.YOURACCOUNTSTORE,
    STORE_KEYS.PORTFOLIODATASTORE,
    STORE_KEYS.LOWESTEXCHANGESTORE
)(observer(SMSVerification));
