import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { FormattedMessage } from 'react-intl';
import Cookies from 'universal-cookie';
import { formatPhoneNumber, formatPhoneNumberIntl } from 'react-phone-number-input';
import {
    Wrapper,
    InputWrapper,
    Input,
    InputAddon,
    // SendIcon,
    SpinnerIcon,
    PhoneIcon,
    SendIcon2
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

    componentDidMount() {
        const cookies = new Cookies();
        let phoneNum = this.getInternationPhoneNumberFormat(cookies.get('phoneNumber') || '');
        this.setState({ phoneNumber: phoneNum });
    }

    getInternationPhoneNumberFormat = value => {
        let intFormatValue = '';
        if (value.includes('+')) {
            intFormatValue = formatPhoneNumberIntl(value);
        } else {
            intFormatValue = formatPhoneNumberIntl('+' + value);
        }

        if (intFormatValue.length === 0) {
            intFormatValue = value;
        }
        return intFormatValue;
    }
    handleChangePhoneNumber = e => {
        e.stopPropagation();
        let phoneNum = this.getInternationPhoneNumberFormat(e.target.value);
        this.setState({
            phoneNumber: phoneNum,
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
        const { code: securityCode } = this.state;
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

        const { handleBack } = this.props;

        return (
            <Wrapper>
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
                                <PhoneIcon/>
                            ) : (
                                isSendingPhoneNumber
                                    ? <SpinnerIcon />
                                    : <SendIcon2 />
                            )}
                        </InputAddon>
                    )}
                </InputWrapper>

                {isPhoneNumberSent &&
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
                                : <SendIcon2 className={code == null ? 'disabled' : ''} />
                            }
                        </InputAddon>
                    ) : (
                        <InputAddon onClick={this.handleGoBack}>
                            <svg className="sprite-icon close" role="img" aria-hidden="true">
                                <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="img/sprite-basic.svg#arrow-drop-close" />
                            </svg>
                        </InputAddon>
                    )}
                </InputWrapper>
                }
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
