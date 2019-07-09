import React, { Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { AutoSizer } from 'react-virtualized';
import axios from 'axios';
import QRCode from 'qrcode-react';

import { STORE_KEYS } from '../../../stores';
import { claimModeKeys } from '../../../stores/PayAppStore';

import DataLoader from '../../../components-generic/DataLoader';
import imgQrBack from './coin-bg-04-26.png';

import {
    Wrapper,
    QRCodeWrapper,
    InnerCenterWrapper,
    QRCodePartial,
    PayAmountPartial,
    InputWrapper,
    Input,
    InputAddon,
    QRIcon,
    SendIcon,
    SpinnerIcon,
    Main
} from './Components';
import DataLoaderDone from '../../../components-generic/DataLoaderDone';

import qrCodeImage from './qr_code.png';
import arrowRightImage from './right-arrow.svg';
import spinnerImage from './spinner.svg';

const PAY_QR_VIEW_STEPS = {
    VIEW_QR: 'view-qr',
    ENTER_PAY_AMOUNT: 'enter-pay-amount',
    VIEW_QR_AGAIN: 'view-qr-again',
    VERIFY_SUCCESS: 'verify-success',
};

class PayQRCodeViewV2 extends React.Component {
    state = {
        currentView: PAY_QR_VIEW_STEPS.VIEW_QR,
        payAmount: 1,
        isSendingPayAmount: false,
        isPayAmountSent: false,
        loading: false,
        loaded: false,
        showPhoneArrow: false,
        phoneSubmitStatus: 'none',
        phoneNumber: '',
        codeInputAnimation: 'initial',
        unloadPhoneInput: false,
        unloadCodeInput: false,
        qrImageUrl: '',
    };
    inputRef = null;

    componentDidMount() {
        const { fiatPrice } = this.props;
        this.setState({
            isSendingPayAmount: false,
            isPayAmountSent: false,
            loading: false,
            loaded: false,
            showPhoneArrow: false,
            phoneSubmitStatus: 'none',
            phoneNumber: '',
            codeInputAnimation: 'initial',
            unloadPhoneInput: false,
            unloadCodeInput: false,
        });

        if (this.state.qrImageUrl === '') {
            this.setState({ qrImageUrl: imgQrBack });
        }

        if (this.state.payAmount === 1 || this.state.payAmount === fiatPrice) {
            this.setState({ payAmount: fiatPrice });
        }
    }

    componentWillReceiveProps(nextProps) {
        const { fiatPrice: prevFiatPrice } = this.props;
        const { fiatPrice } = nextProps;
        if (prevFiatPrice !== fiatPrice) {
            this.setState({
                payAmount: fiatPrice,
            });
        }
    }

    onQRCode() {
        console.log(this.state.unloadPhoneInput, this.state.loaded);
        this.props.onQRImageClick();
        if (this.state.unloadPhoneInput) {
            return;
        }
        if (this.state.loaded) {
            this.onSend();
            return;
        }
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loaded: true });
            document.getElementById('phoneInput').focus();
        }, 600);
    }

    onInputChange() {
        if (this.state.loaded) {
            this.setState({ showPhoneArrow: true, phoneSubmitStatus: 'none' });
        }
    }

    onSend = async () => {
        // let response = await axios.get(`http://54.211.137.40:8080/qr_coin?words=${this.state.payAmount}`);
        this.setState({ qrImageUrl: qrCodeImage });
        this.props.onGetAmount(this.state.payAmount);
        if (this.state.loaded) {
            //   this.phoneSubmitStatus = 'submitting';
            this.setState({ phoneSubmitStatus: 'submitting', unloadPhoneInput: false });

            // this.authenticationService
            //   .submitPhoneNumber(this.phoneInputElement.nativeElement.value)
            //   .subscribe(success => {
            //     if (success) {
            setTimeout(() => {
                // this.phoneSubmitStatus = 'submitted';
                this.setState({ phoneSubmitStatus: 'submitted' });
                this.setState({
                    codeSubmitStatus: 'submitted',
                    codeInputAnimation: 'done',
                    unloadPhoneInput: false,
                    loaded: false,
                });

                setTimeout(() => {
                    //   this.codeInputAnimation = 'final';
                    this.hidePhoneInput();
                    this.setState({ codeInputAnimation: 'final', unloadCodeInput: true });
                }, 500);
            }, 1000);
            // } else {
            //   this.phoneSubmitStatus = 'failed';
            // }
        }
    }

    onSendCode() {
        // this.codeSubmitStatus = 'submitting';
        this.setState({ codeSubmitStatus: 'submitting' });
        // this.authenticationService
        //   .submitVerificationCode(this.codeInputElement.nativeElement.value)
        //   .subscribe(success => {
        //     if (success) {
        setTimeout(() => {
            //   this.codeSubmitStatus = 'submitted';
            //   this.codeInputAnimation = 'done';

            setTimeout(() => {
                // this.unloadCodeInput = true;
                this.hidePhoneInput();
                this.setState({
                    unloadCodeInput: true,
                    unloadPhoneInput: false,
                    loading: false,
                    loaded: false,
                    showPhoneArrow: false,
                });
            }, 500);
        }, 1000);
        // } else {
        //   this.codeSubmitStatus = 'failed';
        // }
    }

    handleClickQR = e => {
        e.stopPropagation();

        this.setState({
            isPayAmountSent: false,
            isSendingPayAmount: false,
            currentView: PAY_QR_VIEW_STEPS.ENTER_PAY_AMOUNT,
        }, () => {
            if (this.inputRef) {
                this.inputRef.focus();
            }
        });
    };

    handlePayAmount = e => {
        e.stopPropagation();

        this.setState({
            isPayAmountSent: false,
            isSendingPayAmount: true,
        });

        setTimeout(() => {
            this.setState({
                isPayAmountSent: true,
                isSendingPayAmount: false,
                currentView: PAY_QR_VIEW_STEPS.VIEW_QR_AGAIN,
            });
        }, 1000);
    };

    handleChangePayAmount = e => {
        e.stopPropagation();

        this.setState({
            payAmount: e.target.value,
            isPayAmountSent: false,
        });
    };

    containerClass() {
        if (this.showCodeInput()) {
            return 'input-bar-containers shadow';
        }
        return 'input-bar-containers';
    }

    phoneContainerClass() {
        const { loading, unloadPhoneInput } = this.state;

        if (loading) {
            if (unloadPhoneInput) {
                return 'input-bar load unload';
            }
            return 'input-bar load';
        }
        return 'input-bar';
    }

    phoneSubmitIconUrl() {
        const { phoneSubmitStatus, unloadCodeInput, showPhoneArrow } = this.state;

        if (phoneSubmitStatus === 'submitted') {
            if (unloadCodeInput) {
                return this.state.qrImageUrl;
            }
            return spinnerImage;
        }
        if (phoneSubmitStatus === 'submitting') {
            return spinnerImage;
        }
        if (showPhoneArrow) {
            return arrowRightImage;
        }
        return this.state.qrImageUrl;
    }

    codeSubmitIconUrl() {
        const { codeSubmitStatus } = this.state;

        if (codeSubmitStatus === 'submitting') {
            return spinnerImage;
        }
        if (codeSubmitStatus === 'submitting') {
            return spinnerImage;
        }
        return arrowRightImage;
    }

    phoneSubmitIconClass() {
        const { phoneSubmitStatus, unloadPhoneInput, showPhoneArrow } = this.state;

        if (phoneSubmitStatus === 'submitted') {
            if (!unloadPhoneInput) {
                return 'qr-code-container none';
            }
            return 'qr-code-container';
        }
        if (phoneSubmitStatus === 'submitting') {
            return 'qr-code-container spinner';
        }
        if (showPhoneArrow) {
            return 'qr-code-container arrow';
        }
        return 'qr-code-container';
    }

    codeSubmitIconClass() {
        const { codeSubmitStatus } = this.state;

        if (codeSubmitStatus === 'submitted') {
            return 'qr-code-container none';
        }
        if (codeSubmitStatus === 'submitting') {
            return 'qr-code-container spinner';
        }
        return 'qr-code-container arrow';
    }

    showCodeInput() {
        return this.state.phoneSubmitStatus === 'submitted' && !this.state.unloadCodeInput;
    }

    hidePhoneInput() {
        // this.unloadPhoneInput = true;
        this.setState({ unloadPhoneInput: true });
        setTimeout(() => {
            this.componentDidMount();
        }, 1000);
    }

    render() {
        const {
            [STORE_KEYS.PAYAPPSTORE]: { claimNotify },
            [STORE_KEYS.SETTINGSSTORE]: {
                currentFiatPrice,
                defaultFiatSymbol,
            },
        } = this.props;

        const {
            currentView,
            payAmount,
            isPayAmountSent,
            isSendingPayAmount,
            codeInputAnimation,
        } = this.state;

        // if (uniqueAddress !== '') {
        //     try {
        //         qrValue = 'https://' + window.location.hostname + '/?cointransfer' + uniqueAddress;
        //     } catch (e) {
        //         qrValue = '';
        //     }
        // }
        let qrValue = `${payAmount}${defaultFiatSymbol}`;

        // According to the amount of the USD in the background
        // We need to change the class to match for the positioning.
        let qrCodePartialClassName = '';
        const coeffHeight = .7;

        switch (currentView) {
        case PAY_QR_VIEW_STEPS.VIEW_QR:
            break;
        case PAY_QR_VIEW_STEPS.VIEW_QR_AGAIN:
            qrCodePartialClassName = 'show-again';
            break;
        default:
            qrCodePartialClassName = 'hide';
        }

        const qrSize = 1000;
        return (
            <Main>
                <div className={this.containerClass()}>
                    <div className="input-bar-container">
                        <div className={this.phoneContainerClass()}>
                            <span className="number-prefix">Pay $</span>
                            <input
                                type="tel"
                                className="number-input"
                                id="phoneInput"
                                value={payAmount}
                                placeholder="Enter Pay Amount"
                                onKeyUp={(e) => {
                                    if (e.key === 'Enter') {
                                        this.onSend(e);
                                    }
                                }}
                                onChange={this.handleChangePayAmount}
                                readOnly={isSendingPayAmount}
                                ref={ref => {
                                    this.inputRef = ref;
                                }}
                                onKeyPress={(e) => this.onInputChange(e)}
                            />
                            <div className={this.phoneSubmitIconClass()} onClick={e => this.onQRCode(e)}>
                                <img
                                    src={this.phoneSubmitIconUrl()}
                                    className="qr-code"
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Main>
        // {this.showCodeInput && (
        //     <div className="input-bar-container" style={codeInputAnimation === 'initial' ? { opacity: 0 } : { opacity: 1 }}>
        //         <div className="input-bar load">
        //             <input
        //                 type="number"
        //                 className="number-input"
        //                 id="codeInput"
        //                 placeholder="What's the code?"
        //                 onKeyUp={e => {
        //                     if (e.key === 'Enter') {
        //                         this.onSendCode(e);
        //                     }
        //                 }}
        //             />
        //             <div className={this.codeSubmitIconClass()} onClick={e => this.onSendCode(e)}>
        //                 <img
        //                     src={this.codeSubmitIconUrl()}
        //                     className="qr-code"
        //                     alt=""
        //                 />
        //             </div>
        //         </div>
        //     </div>
        // )}
        // <Wrapper>
        //     {/* <BackButton onClick={this.props.onClose}><BackIcon/></BackButton> */}

        //     <AutoSizer>
        //         {({ width, height }) => {
        //             const size = Math.min(width * .85, height * coeffHeight);

        //             return (
        //                 <InnerCenterWrapper width={width} height={height}>
        //                     <QRCodePartial
        //                         className={qrCodePartialClassName}
        //                         width={size}
        //                         height={size}
        //                         onClick={this.handleClickQR}
        //                     >
        //                         {qrValue != null &&
        //                         <React.Fragment>
        //                             {claimNotify === claimModeKeys.initialModeKey &&
        //                             <Fragment>
        //                                 <QRCodeWrapper>
        //                                     <img src={imgQrBack} className="qr-code-back" alt="" />
        //                                     <QRCode
        //                                         value={qrValue}
        //                                         size={qrSize}
        //                                         bgColor="#f0d66e"
        //                                         fgColor="#292829"
        //                                         level="L"
        //                                         includemargin={true}
        //                                         renderAs="svg"
        //                                         // logo="/img/qr_logo_b.png"
        //                                         className="qr-code"
        //                                     />
        //                                 </QRCodeWrapper>
        //                             </Fragment>
        //                             }
        //                             {claimNotify === claimModeKeys.loadingModeKey &&
        //                             <DataLoader width={150} height={150} />
        //                             }
        //                             {claimNotify === claimModeKeys.doneModeKey &&
        //                             <DataLoaderDone width={150} height={150} />
        //                             }
        //                         </React.Fragment>
        //                         }
        //                     </QRCodePartial>

        //                     <PayAmountPartial
        //                         className={currentView}
        //                     >
        //                         <InputWrapper
        //                             className="pay-amount-input"
        //                         >
        //                             <Input
        //                                 placeholder="Enter Pay Amount"
        //                                 type="tel"
        //                                 value={payAmount}
        //                                 onChange={this.handleChangePayAmount}
        //                                 readOnly={isSendingPayAmount}
        //                                 innerRef={ref => {
        //                                     this.inputRef = ref;
        //                                 }}
        //                             />
        //                             {!isPayAmountSent &&
        //                             <InputAddon>
        //                                 {
        //                                     isSendingPayAmount
        //                                         ? <SpinnerIcon />
        //                                         : <SendIcon onClick={this.handlePayAmount} />
        //                                 }
        //                             </InputAddon>
        //                             }
        //                         </InputWrapper>
        //                     </PayAmountPartial>
        //                 </InnerCenterWrapper>
        //             );
        //         }}
        //     </AutoSizer>
        // </Wrapper>
        );
    }
}

export default inject(
    STORE_KEYS.SENDCOINSTORE,
    STORE_KEYS.SETTINGSSTORE,
    STORE_KEYS.YOURACCOUNTSTORE,
    STORE_KEYS.PAYAPPSTORE
)(observer(PayQRCodeViewV2));
