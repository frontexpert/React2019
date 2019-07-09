import React, { Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { AutoSizer } from 'react-virtualized';
import axios from 'axios';
import QRCode from 'qrcode-react';

// import QRCode from '../../../components-generic/QRReactCustom';

import { STORE_KEYS } from '../../../stores';
import { claimModeKeys } from '../../../stores/PayAppStore';

import DataLoader from '../../../components-generic/DataLoader';
import imgQrBack from './coin-bg-04-26.png';

import {
    Wrapper,
    QRCodeWrapper,
    InnerCenterWrapper,
    QRCodePartial,
    PhoneNumberPartial,
    InputWrapper,
    Input,
    InputAddon,
    QRIcon,
    SendIcon,
    SpinnerIcon
} from './Components';
import DataLoaderDone from '../../../components-generic/DataLoaderDone';
import { BackIcon } from '../../SideBar/NewSettingsPop/Components';
import { BackButton } from '../Components';

const PAY_QR_VIEW_STEPS = {
    VIEW_QR: 'view-qr',
    ENTER_PHONE_NUMBER: 'enter-phone-number',
    ENTER_CODE: 'enter-code',
    VIEW_QR_AGAIN: 'view-qr-again',
    VERIFY_SUCCESS: 'verify-success',
};

class PayQRCodeViewV2 extends React.Component {
    state = {
        currentView: PAY_QR_VIEW_STEPS.VIEW_QR,
        phonenumber: '',
        code: '',
        isSendingPhonenumber: false,
        isPhonenumberSent: false,
        isSendingCode: false,
        isCodeSent: false,
        userId: '',
    };

    handleClickQR = e => {
        e.stopPropagation();

        this.setState({
            currentView: PAY_QR_VIEW_STEPS.ENTER_PHONE_NUMBER,
        });
    };

    handleSendPhonenumber = e => {
        e.stopPropagation();

        this.setState({
            isSendingPhonenumber: true,
        });

        axios.post('https://passport.bct.trade/api/auth/sms/register', {
            phone_number: this.state.phonenumber,
        })
            .then(res => {
                if (res.data && res.data.success && res.data.userId) {
                    this.setState({
                        isPhonenumberSent: true,
                        isSendingPhonenumber: false,
                        currentView: PAY_QR_VIEW_STEPS.ENTER_CODE,
                        userId: res.data.userId,
                    });
                } else {
                    return Promise.reject(Error('No success code returned'));
                }
            })
            .catch(err => {
                this.setState({
                    isSendingPhonenumber: false,
                });
            });
    };

    handleSendCode = e => {
        e.stopPropagation();

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
                            currentView: PAY_QR_VIEW_STEPS.VERIFY_SUCCESS,
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
                this.setState({
                    isSendingCode: false,
                });
            });
    };

    handleViewQRAgain = e => {
        e.stopPropagation();

        this.setState({
            currentView: PAY_QR_VIEW_STEPS.VIEW_QR_AGAIN,
        });
    };

    handleChangePhonenumber = e => {
        e.stopPropagation();

        this.setState({
            phonenumber: e.target.value,
            code: '',
            isPhonenumberSent: false,
        });
    };

    handleChangeCode = e => {
        e.stopPropagation();

        this.setState({
            code: e.target.value,
        });
    };

    render() {
        const {
            [STORE_KEYS.PAYAPPSTORE]: { claimNotify },
            [STORE_KEYS.SENDCOINSTORE]: { uniqueAddress },
            [STORE_KEYS.SETTINGSSTORE]: { currentFiatPrice },
        } = this.props;

        const {
            currentView,
            phonenumber,
            code,
            isPhonenumberSent,
            isSendingPhonenumber,
            isCodeSent,
            isSendingCode,
            userId,
        } = this.state;

        let qrValue = '';

        if (uniqueAddress !== '') {
            try {
                qrValue = 'https://' + window.location.hostname + '/?cointransfer' + uniqueAddress;
            } catch (e) {
                qrValue = '';
            }
        }

        console.log('[qrValue]', qrValue);

        // According to the amount of the USD in the background
        // We need to change the class to match for the positioning.
        let qrCodePartialClassName = 'size-1';
        const coeffHeight = .7;

        switch (currentFiatPrice) {
        case 1:
            break;
        case 10:
            qrCodePartialClassName = 'size-10';
            break;
        case 100:
            qrCodePartialClassName = 'size-100';
            break;
        default:
            qrCodePartialClassName = 'size-1';
        }

        switch (currentView) {
        case PAY_QR_VIEW_STEPS.VIEW_QR:
            break;
        case PAY_QR_VIEW_STEPS.VIEW_QR_AGAIN:
            qrCodePartialClassName += 'show-again';
            break;
        default:
            qrCodePartialClassName += 'hide';
        }

        // const qrSize = (window.innerWidth < window.innerHeight ? window.innerWidth : window.innerHeight) || 1000;
        const qrSize = 1000;

        return (
            <Wrapper>
                {/* <BackButton onClick={this.props.onClose}><BackIcon/></BackButton> */}

                <AutoSizer>
                    {({ width, height }) => {
                        const size = Math.min(width * .85, height * coeffHeight);

                        return (
                            <InnerCenterWrapper width={width} height={height}>
                                <QRCodePartial
                                    // className={qrCodePartialClassName}
                                    width={size}
                                    height={size}
                                    onClick={this.handleClickQR}
                                >
                                    {qrValue != null &&
                                    <React.Fragment>
                                        {claimNotify === claimModeKeys.initialModeKey &&
                                        <Fragment>
                                            <QRCodeWrapper>
                                                <img src={imgQrBack} className="qr-code-back" alt="" />
                                                <QRCode
                                                    value={qrValue}
                                                    size={qrSize}
                                                    bgColor="#f0d66e"
                                                    fgColor="#292829"
                                                    level="L"
                                                    includemargin={true}
                                                    renderAs="svg"
                                                    // logo="/img/qr_logo_b.png"
                                                    className="qr-code"
                                                />
                                            </QRCodeWrapper>
                                        </Fragment>
                                        }
                                        {claimNotify === claimModeKeys.loadingModeKey &&
                                        <DataLoader width={150} height={150} />
                                        }
                                        {claimNotify === claimModeKeys.doneModeKey &&
                                        <DataLoaderDone width={150} height={150} />
                                        }
                                    </React.Fragment>
                                    }
                                </QRCodePartial>

                                <PhoneNumberPartial
                                    className={currentView}
                                >
                                    <InputWrapper
                                        className="phone-number-input"
                                    >
                                        <Input
                                            type="tel"
                                            placeholder="Enter Mobile Phone Number"
                                            value={phonenumber}
                                            onChange={this.handleChangePhonenumber}
                                            readOnly={isSendingPhonenumber || isSendingCode || isCodeSent}
                                        />
                                        {!isPhonenumberSent &&
                                        <InputAddon>
                                            {!phonenumber
                                                ? <QRIcon onClick={this.handleViewQRAgain} />
                                                : (
                                                    isSendingPhonenumber
                                                        ? <SpinnerIcon />
                                                        : <SendIcon onClick={this.handleSendPhonenumber} />
                                                )
                                            }
                                        </InputAddon>
                                        }
                                    </InputWrapper>

                                    <span className="separator" />

                                    <InputWrapper
                                        className={'code-input ' + currentView}
                                    >
                                        <Input
                                            placeholder="What is the code?"
                                            value={code}
                                            onChange={this.handleChangeCode}
                                            readOnly={!isPhonenumberSent || isSendingPhonenumber || isSendingCode || isCodeSent}
                                        />
                                        {(code && !isCodeSent) &&
                                        <InputAddon onClick={this.handleSendCode}>
                                            {isSendingCode
                                                ? <SpinnerIcon />
                                                : <SendIcon />
                                            }
                                        </InputAddon>
                                        }
                                    </InputWrapper>
                                </PhoneNumberPartial>
                            </InnerCenterWrapper>
                        );
                    }}
                </AutoSizer>
            </Wrapper>
        );
    }
}

export default inject(
    STORE_KEYS.SENDCOINSTORE,
    STORE_KEYS.SETTINGSSTORE,
    STORE_KEYS.YOURACCOUNTSTORE,
    STORE_KEYS.PAYAPPSTORE
)(observer(PayQRCodeViewV2));
