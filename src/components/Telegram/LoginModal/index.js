import React from 'react';
import { inject, observer } from 'mobx-react';
import { FormattedMessage } from 'react-intl';
import { STORE_KEYS } from '../../../stores';

import {
    TelegramLoginModalWrapper,
    Close,
    Icon,
    InputAddonBtn,
    CheckAddon,
    ErrorMsg,
    InputWithAddonWrapper
} from './Components';
import PhoneInput from '../../../components-generic/PhoneInputCustom';
import DataLoader from '../../../components-generic/DataLoader';

import imgTelegram from './icons/telegram.svg';
import imgArrow from './icons/arrow.svg';
import imgLogo from './icons/bct-icon.svg';
import imgX from '../../../components-generic/Modal/x.svg';
import imgNextArrow from './icons/next-arrow.svg';
import imgCheck from './icons/check.svg';

class LoginModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            phoneNumber: '',
            inputStep: 0, // 0: phoneNumber, 1: code, 2: 2FA
            confirmCode: '',
            twoFactorCode: '',
            errorMsg: '',
        };
    }

    componentDidMount() {
        this.props[STORE_KEYS.TELEGRAMSTORE].initByTelegramLogin();
    }

    setStep = (inputStep) => {
        this.setState({
            inputStep,
        });
    };

    handleChangePhone = (number) => {
        this.setState({
            phoneNumber: number,
        });
    };

    handleChangeCode = (e) => {
        this.setState({
            confirmCode: e.target.value,
        });
    };

    handleChange2faCode = (e) => {
        this.setState({
            twoFactorCode: e.target.value,
        });
    };

    handleRequestCode = () => {
        // validate phone number
        if (this.state.phoneNumber.length <= 8) {
            this.setState({
                errorMsg: 'Please input phone number.',
            });
            return;
        }

        this.setState({
            errorMsg: '',
        });

        // update TelegramStore
        this.props.telegramStore.sendConfirmCode(this.state.phoneNumber)
            .then(() => {
                // move next step(enter code) if confirmation code sent successfully
                this.setState({
                    inputStep: 1,
                    errorMsg: '',
                });
            });
    };

    closePopup = () => {
        // setTimeout(() => {
        //     localStorage.clear();
        //     window.location.reload();
        // }, 100);
    };

    handleVerifyCodeAndLogin = () => {
        if (this.state.confirmCode.length <= 0) {
            this.setState({
                errorMsg: 'Please input confirm code.',
            });
            return;
        }

        this.setState({
            errorMsg: '',
        });

        // login with code
        this.props.telegramStore.loginWithCode(this.state.confirmCode)
            .then(() => {
                // move next step
                this.setState({
                    inputStep: 2,
                    errorMsg: '',
                });
            });
    };

    handleVerify2faAndLogin = () => {
        if (this.state.twoFactorCode.length <= 0) {
            this.setState({
                errorMsg: 'Please input 2FA code.',
            });
            return;
        }

        this.setState({
            errorMsg: '',
        });

        // send 2FA code to store
        this.props.telegramStore.loginWith2FA(this.state.twoFactorCode);
        // No need to catch promise, since login ends here
    };

    handleGotoFirstStep = () => {
        this.setState({
            inputStep: 0,
        });
    };

    render() {
        const {
            inputStep, confirmCode, twoFactorCode, errorMsg,
        } = this.state;
        const {
            [STORE_KEYS.TELEGRAMSTORE]: telegramStore,
        } = this.props;

        const isLoading = telegramStore.isSendingTelegramCode
            || telegramStore.isLoggingInWithCode
            || telegramStore.isLoggingInWith2FA;

        const step0Disabled = telegramStore.isSendingTelegramCode || inputStep > 0;
        const step1Disabled = telegramStore.isLoggingInWithCode || inputStep !== 1;
        const step2Disabled = telegramStore.isLoggingInWith2FA || inputStep !== 2;

        return (
            <TelegramLoginModalWrapper>
                <div className="telegram-login-modal">
                    {/*
                    {isLoading &&
                    <div className="loading-panel">
                        <DataLoader/>
                    </div>
                    }
                    */}

                    <div className={'content' + (isLoading ? ' loading' : '')}>
                        <div className="header-images">
                            <img className="header-images__telegram" alt="" src={imgTelegram}/>
                            <img className="header-images__arrow" alt="" src={imgArrow}/>
                            <img className="header-images__logo-wrapper" alt="" src={imgLogo}/>
                        </div>

                        <span className="telegram-login-text header-text__lead">
                            <FormattedMessage
                                id="telegram.login_modal.label_confirm_code"
                                defaultMessage="In order to be able to interact with your telegram messenger, you should confirm code one more time."
                            />
                        </span>

                        <span className="telegram-login-text header-text__instruction">
                            <FormattedMessage
                                id="telegram.login_modal.label_enter_number1"
                                defaultMessage="Please enter your number in the "
                            />
                            <br/>
                            {/* <a href="https://telegram.org/faq#login-and-sms" */}
                            {/* target="_blank" rel="noopener noreferrer" */}
                            {/* > */}
                            <FormattedMessage
                                id="telegram.login_modal.label_enter_number2"
                                defaultMessage="international format"
                            />
                            {/* </a> */}
                        </span>

                        <PhoneInput
                            onChange={this.handleChangePhone}
                            initialNumber=""
                            initialCountry="US"
                            disabled={step0Disabled}
                        >
                            {inputStep === 0
                                ? (
                                    <InputAddonBtn
                                        onClick={this.handleRequestCode}
                                        disabled={step0Disabled}
                                    >
                                        {telegramStore.isSendingTelegramCode
                                            ? <DataLoader width={40} height={40}/>
                                            : <img alt="" src={imgNextArrow}/>
                                        }
                                    </InputAddonBtn>
                                )
                                : (
                                    <CheckAddon>
                                        <img alt="" src={imgCheck}/>
                                    </CheckAddon>
                                )
                            }
                        </PhoneInput>

                        {inputStep === 0 &&
                        <span className="telegram-login-text header-text__tail">
                            <FormattedMessage
                                id="telegram.login_modal.label_receive_confirm_code"
                                defaultMessage="You will receive confirmation code in your Telegram account."
                            />
                        </span>
                        }

                        {inputStep === 1 && (
                            <div className="telegram-login-input-wrapper">
                                <span className="telegram-login-text">
                                    <span>
                                        <FormattedMessage
                                            id="telegram.login_modal.label_confirmation_code1"
                                            defaultMessage="Confirmation"
                                        /><br/>
                                        <FormattedMessage
                                            id="telegram.login_modal.label_confirmation_code2"
                                            defaultMessage="Code"
                                        /></span>
                                </span>
                                <InputWithAddonWrapper>
                                    <div className="text-field">
                                        <input
                                            type="text"
                                            placeholder=""
                                            value={confirmCode}
                                            onChange={this.handleChangeCode}
                                            readOnly={step1Disabled}
                                        />
                                    </div>

                                    <div className="addon">
                                        <InputAddonBtn
                                            onClick={this.handleVerifyCodeAndLogin}
                                            disabled={step1Disabled}
                                        >
                                            {telegramStore.isLoggingInWithCode
                                                ? <DataLoader width={40} height={40}/>
                                                : <img alt="" src={imgNextArrow}/>
                                            }
                                        </InputAddonBtn>
                                    </div>
                                </InputWithAddonWrapper>
                            </div>
                        )}

                        {(inputStep === 2 && telegramStore.is2FARequired) && (
                            <div className="telegram-login-input-wrapper text-wrapper-2fa">
                                <span className="telegram-login-text">
                                    <FormattedMessage
                                            id="telegram.login_modal.label_enter_2fa_code1"
                                            defaultMessage="Please enter"
                                    />
                                    <br/>
                                    <FormattedMessage
                                            id="telegram.login_modal.label_enter_2fa_code2"
                                            defaultMessage="2FA Code"
                                    />
                                </span>
                                <InputWithAddonWrapper>
                                    <div className="text-field">
                                        <input
                                            type="password"
                                            placeholder=""
                                            readOnly={step2Disabled}
                                            value={twoFactorCode}
                                            onChange={this.handleChange2faCode}
                                        />
                                    </div>

                                    <div className="addon">
                                        <InputAddonBtn
                                            onClick={this.handleVerify2faAndLogin}
                                            disabled={step2Disabled}
                                        >
                                            {telegramStore.isLoggingInWith2FA
                                                ? <DataLoader width={40} height={40}/>
                                                : <img alt="" src={imgNextArrow}/>
                                            }
                                        </InputAddonBtn>
                                    </div>
                                </InputWithAddonWrapper>
                            </div>
                        )}

                        <ErrorMsg>
                            {telegramStore.errMsg || errorMsg}
                        </ErrorMsg>
                    </div>

                    <Close onClick={this.closePopup}>
                        <Icon src={imgX}/>
                    </Close>
                </div>
            </TelegramLoginModalWrapper>
        );
    }
}

export default inject(
    STORE_KEYS.TELEGRAMSTORE
)(observer(LoginModal));
