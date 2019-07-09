import React, { Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { FormattedMessage } from 'react-intl';

import { STORE_KEYS } from '../../stores';
import {
    Wrapper, UpperWrapper,
    LoginTitle, SocialTitle, SocialWrapper, InputAddonBtn,
    FacebookIcon, MessengerIcon, TelegramIcon, TelegramWrapper,
    KeyPadWrapper, Row, KeyPad, EmptyPad, BackSpaceIcon
} from './Components';
import PhoneInput from './PhoneInput';
import CodeInput from './CodeInput';
import DataLoader from '../../components-generic/DataLoader';
import TelegramLogin, { LoaderWrapper } from '../TelegramLogin';
import imgNextArrow from '../Telegram/LoginModal/icons/next-arrow.svg';
import ProgressRing from '../PayApp/ProgressRing';

class MobileLogin extends React.Component {
    state = {
        inputStep: 0,
        phoneNumber: '',
        code: '',
        format: '',
        isLoading: false,
        errorMsg: '',
        progress: 0,
    };

    componentDidMount() {
        this.interval = setInterval(() => {
            const { progress } = this.state;
            if (progress < 100) {
                this.setState({ progress: progress + 5 });
            }

            if (progress === 100) {
                clearInterval(this.interval);
            }
        }, 1000);
    }

    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    handleChangePhone = (code, number, countryCode, countryName, format) => {
        this.setState({
            code,
            format,
        });
    };

    handleRequestCode = () => {
        const { code, format } = this.state;

        let phoneNumber = document.getElementById('login-phone').value;
        if (phoneNumber.length !== format.length) {
            this.setState({
                errorMsg: 'Please input phone number.',
            });
            return;
        }
        phoneNumber = code + phoneNumber.replace(/ /g, '');

        this.setState({
            inputStep: 1,
            phoneNumber,
            errorMsg: '',
        });
    };

    handleResendCode = () => {
        // Reset values
        document.getElementById('login-phone').value = '';
        document.getElementById('login-phone-placeholder').innerHTML = this.getPlaceholder('');
        document.getElementById('digit1').value = '';
        document.getElementById('digit2').value = '';
        document.getElementById('digit3').value = '';
        document.getElementById('digit4').value = '';

        this.setState({
            inputStep: 0,
            phoneNumber: '',
            errorMsg: '',
        });
    };

    handleConfirmCode = (code) => {
        console.log(code);
    };

    handleKeyClick = (key) => {
        if (this.state.inputStep === 0) {
            const phoneEl = document.getElementById('login-phone');
            const phonePlaceholderEl = document.getElementById('login-phone-placeholder');
            phoneEl.focus();

            // Trigger keyboard event
            // let keyCode = key.charCodeAt(0);
            // if (key === 'Backspace') {
            //     keyCode = 8;
            // }
            // const evt = new KeyboardEvent('keydown', {
            //     altKey:false,
            //     bubbles: true,
            //     cancelBubble: false,
            //     cancelable: true,
            //     code: key,
            //     composed: true,
            //     ctrlKey: false,
            //     currentTarget: null,
            //     defaultPrevented: true,
            //     detail: 0,
            //     eventPhase: 0,
            //     isComposing: false,
            //     isTrusted: true,
            //     key,
            //     keyCode,
            //     location: 0,
            //     metaKey: false,
            //     repeat: false,
            //     returnValue: false,
            //     shiftKey: false,
            //     type: 'keydown',
            //     which: keyCode,
            // });
            // phoneEl.dispatchEvent(evt);

            const originalValue = phoneEl.value;
            let newValue = originalValue;
            const maxLength = phoneEl.maxLength;
            if (key === 'Backspace') {
                newValue = originalValue && originalValue.substr(0, originalValue.length - 1) || '';
                newValue = newValue.trim();
            } else if (originalValue.length < maxLength) {
                newValue = originalValue + key;
            }

            newValue = this.getPlaceholder(newValue);
            phoneEl.value = newValue.replace(/_/g, '').trim();
            phonePlaceholderEl.innerHTML = newValue;

            // if (newValue.indexOf('_') === -1) {
            //     this.handleRequestCode();
            // }
        } else {
            const digitEl1 = document.getElementById('digit1');
            const digitEl2 = document.getElementById('digit2');
            const digitEl3 = document.getElementById('digit3');
            const digitEl4 = document.getElementById('digit4');

            if (key === 'Backspace') {
                if (digitEl4.value) {
                    digitEl4.value = '';
                } else if (digitEl3.value) {
                    digitEl3.value = '';
                } else if (digitEl2.value) {
                    digitEl2.value = '';
                } else if (digitEl1.value) {
                    digitEl1.value = '';
                }
            } else if (!digitEl1.value) {
                digitEl1.value = key;
            } else if (!digitEl2.value) {
                digitEl2.value = key;
            } else if (!digitEl3.value) {
                digitEl3.value = key;
            } else if (!digitEl4.value) {
                digitEl4.value = key;

                const code = digitEl1.value + digitEl2.value + digitEl3.value + digitEl4.value;
                this.handleConfirmCode(code);
            }
        }
    };

    getPlaceholder = (value) => {
        const { format } = this.state;
        for (let i = 0; i < format.length; i++) {
            if (value.length > i) {
                if (format[i] === ' ' && value[i] !== ' ') {
                    value = value.substr(0, i) + ' ' + value.substr(i);
                }
            } else {
                value += format[i] === 'X' ? '_' : ' ';
            }
        }

        return value;
    };

    setLoading = (isLoading) => {
        this.setState({ isLoading });

        if (!isLoading) {
            this.setState({
                progress: 100,
            });
        } else {
            this.setState({
                progress: 0,
            });
        }
    };

    render() {
        const {
            inputStep, phoneNumber, isLoading, errorMsg, progress,
        } = this.state;
        const {
            [STORE_KEYS.TELEGRAMSTORE]: telegramStore,
        } = this.props;

        return (
            <Wrapper>
                <UpperWrapper>
                    <div>
                        <LoginTitle>
                            {inputStep === 0 ? 
                                <FormattedMessage
                                    id="mobile_login.label_whatis_number"
                                    defaultMessage="What's your Number?"
                                /> : 
                                <FormattedMessage
                                    id="mobile_login.label_whatis_code"
                                    defaultMessage="What's the code?"
                                />
                            }
                            {inputStep === 1 && (
                                <span>
                                    <FormattedMessage
                                        id="mobile_login.label_sent_to"
                                        defaultMessage="Sent to"
                                    />{phoneNumber}
                                </span>
                            )}
                        </LoginTitle>

                        <PhoneInput
                            initialNumber=""
                            initialCountry="US"
                            errorMsg={errorMsg}
                            hide={inputStep === 1}
                            onChange={this.handleChangePhone}
                            requestCode={this.handleRequestCode}
                        >
                            <InputAddonBtn
                                onClick={this.handleRequestCode}
                            >
                                {telegramStore.isSendingTelegramCode
                                    ? <DataLoader width={40} height={40}/>
                                    : <img alt="" src={imgNextArrow} />
                                }
                            </InputAddonBtn>
                        </PhoneInput>

                        <CodeInput
                            errorMsg={errorMsg}
                            hide={inputStep === 0}
                            resendCode={this.handleResendCode}
                        />
                    </div>

                    {!isLoading ? (
                        <div>
                            <SocialTitle>
                                <FormattedMessage
                                    id="mobile_login.label_or"
                                    defaultMessage="or login with"
                                />
                            </SocialTitle>

                            <SocialWrapper>
                                <FacebookIcon />
                                <MessengerIcon />
                                <TelegramWrapper>
                                    <TelegramLogin
                                        width={300}
                                        height={60}
                                        setLoading={this.setLoading}
                                    />
                                    <TelegramIcon/>
                                </TelegramWrapper>
                            </SocialWrapper>
                        </div>
                    ) : (
                        <Fragment>
                            <ProgressRing
                                radius={200}
                                stroke={4}
                                progress={progress}
                            />
                            {/*
                            <LoaderWrapper>
                                <DataLoader width={60} height={60} />
                            </LoaderWrapper>
                            */}
                        </Fragment>
                    )}
                </UpperWrapper>

                <KeyPadWrapper>
                    <Row>
                        <KeyPad onClick={() => this.handleKeyClick('1')}>
                            <span>1</span>
                            <span className="small" />
                        </KeyPad>
                        <KeyPad onClick={() => this.handleKeyClick('2')}>
                            <span>2</span>
                            <span className="small">ABC</span>
                        </KeyPad>
                        <KeyPad onClick={() => this.handleKeyClick('3')}>
                            <span>3</span>
                            <span className="small">DEF</span>
                        </KeyPad>
                    </Row>
                    <Row>
                        <KeyPad onClick={() => this.handleKeyClick('4')}>
                            <span>4</span>
                            <span className="small">GHI</span>
                        </KeyPad>
                        <KeyPad onClick={() => this.handleKeyClick('5')}>
                            <span>5</span>
                            <span className="small">JKL</span>
                        </KeyPad>
                        <KeyPad onClick={() => this.handleKeyClick('6')}>
                            <span>6</span>
                            <span className="small">MNO</span>
                        </KeyPad>
                    </Row>
                    <Row>
                        <KeyPad onClick={() => this.handleKeyClick('7')}>
                            <span>7</span>
                            <span className="small">PQRS</span>
                        </KeyPad>
                        <KeyPad onClick={() => this.handleKeyClick('8')}>
                            <span>8</span>
                            <span className="small">TUV</span>
                        </KeyPad>
                        <KeyPad onClick={() => this.handleKeyClick('9')}>
                            <span>9</span>
                            <span className="small">WXYZ</span>
                        </KeyPad>
                    </Row>
                    <Row>
                        <EmptyPad />
                        <KeyPad onClick={() => this.handleKeyClick('0')}>
                            <span>0</span>
                        </KeyPad>
                        <KeyPad onClick={() => this.handleKeyClick('Backspace')}>
                            <BackSpaceIcon />
                        </KeyPad>
                    </Row>
                </KeyPadWrapper>
            </Wrapper>
        );
    }
}

export default inject(
    STORE_KEYS.TELEGRAMSTORE
)(observer(MobileLogin));
