import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { FormattedMessage } from 'react-intl';

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
        });
    };

    handleSendPhoneNumber = e => {
        e.stopPropagation();
        const { requestAuthCode } = this.props[STORE_KEYS.SMSAUTHSTORE];
        const { phoneNumber } = this.state;
        let phoneNumberTrimed = phoneNumber.replace(/\s+/g, '');
        phoneNumberTrimed = '+' + phoneNumberTrimed.replace(/\+/g, '');

        this.setState({
            isSendingPhoneNumber: true,
        });

        requestAuthCode(phoneNumberTrimed).then(() => {
            this.setState({
                isPhoneNumberSent: true,
                isSendingPhoneNumber: false,
                currentView: SMS_AUTH_VIEW_STEPS.ENTER_CODE,
            });
        }).catch(err => {
            this.setState({
                isSendingPhoneNumber: false,
            });
        });
    };

    handleSendCode = e => {
        e.stopPropagation();
        const { code : securityCode } = this.state;
        const { confirmAuthCode } = this.props[STORE_KEYS.SMSAUTHSTORE];

        this.setState({
            isSendingCode: true,
        });

        confirmAuthCode(securityCode)
            .then(() => {
                setTimeout(() => {
                    this.setState({
                        isCodeSent: true,
                        isSendingCode: false,
                        currentView: SMS_AUTH_VIEW_STEPS.VERIFY_SUCCESS,
                    });

                    setTimeout(() => {
                        const {
                            [STORE_KEYS.YOURACCOUNTSTORE]: yourAccountStore,
                            [STORE_KEYS.LOWESTEXCHANGESTORE]: lowestExchangeStore,
                            [STORE_KEYS.TELEGRAMSTORE]: telegramStore,
                            [STORE_KEYS.ORDERHISTORY]: orderHistoryStore,
                            [STORE_KEYS.PORTFOLIODATASTORE]: portfolioDataStore,
                            onClose,
                        } = this.props;
                        const mockUser = {
                            id: '1020',
                            username: '',
                            first_name: 'SMS',
                            last_name: 'User',
                        };

                        telegramStore.initByTelegramLogin();
                        orderHistoryStore.requestOrderHistory();
                        yourAccountStore.requestPositionWithReply();
                        portfolioDataStore.initPortfolioDataStore();
                        lowestExchangeStore.requestOrderEvents();
                        telegramStore.loginFinishWith(mockUser);

                        if (onClose) {
                            onClose();
                        }
                    }, 500);
                }, 500);
            })
            .catch(err => {
                this.setState({
                    isSendingCode: false,
                });
            });
    };

    handleGoBack = () => {
        this.setState({
            isPhoneNumberSent: false,
            isSendingPhoneNumber: false,
            currentView: SMS_AUTH_VIEW_STEPS.ENTER_PHONE_NUMBER,
        });
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
                            <InputAddon onClick={!phoneNumber ? handleBack : (isSendingPhoneNumber ? null : this.handleSendPhoneNumber)}>
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
                            <InputAddon onClick={isSendingCode ? null : this.handleSendCode}>
                                {isSendingCode
                                    ? <SpinnerIcon />
                                    : <SendIcon />
                                }
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
