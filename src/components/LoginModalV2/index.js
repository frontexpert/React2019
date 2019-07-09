import React, { Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { FormattedMessage } from 'react-intl';
import { STORE_KEYS } from '../../stores/index';

import {
    TelegramLoginModalWrapper,
    Close,
    Icon,
    InputAddonBtn,
    CheckAddon,
    ErrorMsg,
    InputWithAddonWrapper,
    ButtonWrapper
} from './Components';

import PhoneInput from '../../components-generic/PhoneInputCustom/index';
import DataLoader from '../../components-generic/DataLoader/index';
import OrderGradientButton from '../../components-generic/GradientButtonSquare/index';
import TelegramCodeInput from './TelegramCodeInput';

import imgX from '../../components-generic/Modal/x.svg';
import imgNextArrow from './icons/next-arrow.svg';
import imgCheck from './icons/check.svg';

class LoginModalV2 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            phoneNumber: '',
            inputStep: 0, // 0: phoneNumber, 1: code, 2: 2FA
            twoFactorCode: '',
            errorMsg: '',
            sendAble: false,
            confirmCode: '',
        };
    }

    componentDidMount() {
        this.props[STORE_KEYS.TELEGRAMSTORE].initByTelegramLogin();
    }

    setStep = (inputStep) => {
        this.setState({
            inputStep,
            errorMsg: '',
            sendAble: false,
            confirmCode: '',
        });
    };

    handleChangePhone = (number) => {
        this.setState({
            phoneNumber: number,
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
        this.props[STORE_KEYS.TELEGRAMSTORE].sendConfirmCode(this.state.phoneNumber)
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
        this.props[STORE_KEYS.TELEGRAMSTORE].loginWithCode(this.state.confirmCode)
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
        this.props[STORE_KEYS.TELEGRAMSTORE].loginWith2FA(this.state.twoFactorCode);
        // No need to catch promise, since login ends here
    };

    handleGotoFirstStep = () => {
        this.setState({
            inputStep: 0,
        });
    };

    changeSendAble = confirmCode => {
        this.setState({
            confirmCode,
            sendAble: confirmCode.length === 5,
        });
    };

    render() {
        const {
            inputStep, twoFactorCode, errorMsg, sendAble,
        } = this.state;
        const {
            [STORE_KEYS.TELEGRAMSTORE]: telegramStore,
        } = this.props;

        const {
            isLoggedIn,
            forceUpdate,
        } = telegramStore;

        const isLoading = telegramStore.isSendingTelegramCode
            || telegramStore.isLoggingInWithCode
            || telegramStore.isLoggingInWith2FA;

        const step0Disabled = telegramStore.isSendingTelegramCode || inputStep > 0;
        const step1Disabled = telegramStore.isLoggingInWithCode || inputStep !== 1;
        const step2Disabled = telegramStore.isLoggingInWith2FA || inputStep !== 2;

        const isSecondLogin = localStorage.getItem('authToken') && !isLoggedIn;

        return isSecondLogin ? (
            <TelegramLoginModalWrapper>
                {/* <div className={'telegram-login-modal' + (inputStep > 0 ? ' has-bottom-addon' : '')}> */}
                <div className="telegram-login-modal">
                    <div className={'content' + (isLoading ? ' loading' : '')}>

                        {/* Step 0 */}
                        <span className="telegram-login-text header-text__lead">
                            <FormattedMessage
                                id="modal.login_v2.label_2fa"
                                defaultMessage="Two Factor Authentication"
                            />
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
                        <span className="telegram-login-description header-text__tail">
                            <FormattedMessage
                                id="modal.login_v2.label_telegram_login"
                                defaultMessage="A message with a verification code will be sent to your Telegram. Please enter your phone number to continue."
                            />
                        </span>
                        }

                        {/* Step 0 End */}

                        {inputStep === 1 && (
                            <Fragment>
                                <div className="d-flex flex-row align-items-center">
                                    <span className="telegram-login-description">
                                        <FormattedMessage
                                            id="modal.login_v2.label_enter_code"
                                            defaultMessage="Enter your code here:"
                                        />
                                    </span>
                                    <span
                                        className="telegram-login__link"
                                        onClick={this.handleRequestCode}
                                    >
                                        <FormattedMessage
                                            id="modal.login_v2.label_resend_code"
                                            defaultMessage="Resend Code"
                                        />
                                    </span>
                                </div>

                                <TelegramCodeInput
                                    telegramStore={telegramStore}
                                    step1Disabled={step1Disabled}
                                    sendAble={sendAble}
                                    changeSendAble={this.changeSendAble}
                                    handleVerifyCodeAndLogin={this.handleVerifyCodeAndLogin}
                                />

                                <ButtonWrapper>
                                    {/* <OrderGradientButton */}
                                    {/* className="negative-solid" */}
                                    {/* disabled={step1Disabled} */}
                                    {/* onClick={() => this.setStep(0)} */}
                                    {/* width={145} */}
                                    {/* height={60} */}
                                    {/* > */}
                                    {/* Cancel */}
                                    {/* </OrderGradientButton> */}
                                    <OrderGradientButton
                                        className="primary-solid"
                                        disabled={!sendAble || step1Disabled}
                                        onClick={this.handleVerifyCodeAndLogin}
                                        width={145}
                                        height={60}
                                    >
                                        {telegramStore.isLoggingInWithCode
                                            ? <DataLoader width={40} height={40}/>
                                            : 'Confirm'
                                        }
                                    </OrderGradientButton>
                                </ButtonWrapper>
                            </Fragment>
                        )}

                        {(inputStep === 2 && telegramStore.is2FARequired) && (
                            <div className="telegram-login__2fa-form">
                                <span className="telegram-login-text">
                                    <FormattedMessage
                                        id="modal.login_v2.label_2fa_password"
                                        defaultMessage="Please enter 2FA Password"
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

                        {(telegramStore.errMsg || errorMsg) && (
                            <ErrorMsg>
                                {telegramStore.errMsg || errorMsg}
                            </ErrorMsg>
                        )}
                    </div>

                    {/* {inputStep > 0 && */}
                    {/* <div className="telegram-login-modal__bottom-addon"> */}
                    {/* </div> */}
                    {/* } */}

                    <Close onClick={this.closePopup}>
                        <Icon src={imgX}/>
                    </Close>
                </div>
            </TelegramLoginModalWrapper>
        ) : (
            <Fragment/>
        );
    }
}

export default inject(
    STORE_KEYS.TELEGRAMSTORE
)(observer(LoginModalV2));
