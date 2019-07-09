import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';

import {
    Wrapper,
    BackCurrency,
    Controller,
    InnerWrapper,
    ScannerIcon,
    QRWrapper,
    CopyIcon,
    QRBalanceButton
} from './Components';
import QRScanner from './QRScanner';
import AppHistory from './AppHistory';
import PayQRCodeV2InCurrency from './PayQRCodeV2InCurrency';
import SMSVerification from '../../components-generic/SMSVerification';
import { STORE_KEYS } from '../../stores';
import PaymentData from './PaymentData';
import Congratulations from './Congratulations';

class CryptoApp extends Component {
    state = {
        isHistoryShowing: false,
        isScannerShowing: false,
        isBalanceShowing: false,
        amount: 1,
        isCongratsShowing: false,
    };

    componentDidMount() {}

    toggleScanner = () => {
        this.setState(prevState => ({
            isScannerShowing: !prevState.isScannerShowing,
        }));
    };

    toggleHistory = () => {
        this.setState(prevState => ({
            isHistoryShowing: !prevState.isHistoryShowing,
        }));
    };

    handleCloseQR = () => {
        console.log('[close-qr]');
    };

    handleQRImageClick  = () => {
        this.setState({ isBalanceShowing: !this.state.isBalanceShowing });
    }

    handleGetAmount = (value) => {
        this.setState({ amount: value });
    }

    onQRCodeScanned = (data) => {
        this.setState({
            isCongratsShowing: true,
        });
        // const {
        //     [STORE_KEYS.TELEGRAMSTORE]: {
        //         isLoggedIn,
        //     },
        //     [STORE_KEYS.MODALSTORE]: {
        //         Modal,
        //     },
        // } = this.props;
        // if (isLoggedIn) {
        //     this.setState({
        //         isCongratsShowing: true,
        //     });
        // } else {
        //     Modal({
        //         portal: 'root',
        //         additionalVerticalSpace: true,
        //         showClose: false,
        //         ModalComponentFn: () => <SMSVerification portal="root" onClose={this.onCloseSMSVerification} isMobile />,
        //     });
        // }
    }

    onCloseSMSVerification = () => {
        const {
            [STORE_KEYS.MODALSTORE]: {
                onClose,
            },
        } = this.props;
        onClose();
        this.setState({
            isCongratsShowing: true,
        });
    }

    closeCongrats = () => {
        this.setState({
            isCongratsShowing: false,
        });
        this.toggleScanner();
    }

    render() {
        const {
            isScannerShowing,
            isHistoryShowing,
            isBalanceShowing,
            isCongratsShowing,
            amount,
        } = this.state;

        return (
            <Wrapper>
                {isBalanceShowing && (
                    <QRBalanceButton onClick={this.toggleHistory}>Balance: $1</QRBalanceButton>
                )};
                {isScannerShowing ? (
                    <QRScanner isVisible onScanned={this.onQRCodeScanned} />
                ) : (
                    isHistoryShowing ? (
                        <AppHistory onClose={this.toggleHistory} />
                    ) : (
                        <Fragment>
                            <BackCurrency src={process.env.PUBLIC_URL + '/img/fiat_90/USD/USD_general.png'} alt="" />
                            <PaymentData amount={amount}/>
                            <QRWrapper>
                                <PayQRCodeV2InCurrency onClose={this.handleCloseQR} onQRImageClick={this.handleQRImageClick} onGetAmount={this.handleGetAmount}/>
                            </QRWrapper>
                        </Fragment>
                    )
                )}
                <Controller onClick={this.toggleScanner} className={isScannerShowing ? 'crypto-scanner--on' : ''}>
                    {isScannerShowing ? (
                        <InnerWrapper>
                            <div className="inner-circle">$</div>
                        </InnerWrapper>
                    ) : (
                        <ScannerIcon src={process.env.PUBLIC_URL + '/img/scanner_icon.png'}/>
                    )}
                </Controller>

                {isCongratsShowing && (
                    <Congratulations onClose={this.closeCongrats} />
                )}
            </Wrapper>
        );
    }
}

export default inject(
    STORE_KEYS.TELEGRAMSTORE,
    STORE_KEYS.MODALSTORE,
)(observer(CryptoApp));
