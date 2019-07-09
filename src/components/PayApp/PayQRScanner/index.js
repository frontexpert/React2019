import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { AutoSizer } from 'react-virtualized';
import QrReader from 'react-qr-reader';

import { BodyWrapper, QRScanLine } from '../Components';
import {
    QRWrapper,
    QRInnerWrapper,
    QRImageTrigger,
    PopupWrapper
} from '../PayWindow/Components';
import TouchBlocker from '../../../components-generic/TouchBlocker';
// import PayAppGlowWrapper from '../PayAppGlowWrapper';

import legacyImg from './legacy.png';
import rayImg from './ray.png';

class PayQRScanner extends Component {
    state = {
        error: null,
        isLoaded: false,
        result: null,
        legacyMode: false,
        isScanning: false,
    };

    handleScan = data => {
        if (data) {
            this.setState({
                result: data,
            });
            window.location.href = data;
        }
    };

    handleError = err => {
        this.setState({
            error: (err && err.message) || 'Unknown error',
        });
    };

    handleImageLoad = () => {
        this.setState({
            isScanning: true,
        });

        setTimeout(() => {
            this.setState({
                isScanning: false,
            });

            if (!this.state.result) {
                this.setState({
                    error: 'Sorry. We can\'t detect QR code from image.\nPlease try again.',
                });
            }
        }, 3000);
    };

    resetError = () => {
        if (this.state.error !== 'Requested device not found') {
            this.setState({
                error: null,
            });

            this.openImageDialog();
        }
    };

    openImageDialog = () => {
        this.qrReader.openImageDialog();
    };

    toggleLegacyMode = () => {
        this.setState(prevState => ({
            legacyMode: !prevState.legacyMode,
        }), () => {
            if (this.state.legacyMode) {
                this.openImageDialog();
            }
        });
    };

    handleSwipe = (direction) => {
        if (this.props.onSwipe) {
            if (direction === 'left') {
                this.props.onSwipe(direction);
            }
        }
    };

    render() {
        const {
            result, error, legacyMode, isScanning,
        } = this.state;

        return (
            <BodyWrapper fullScreen>
                <TouchBlocker onSwipe={this.handleSwipe} isBlockMouseScroll>
                    <AutoSizer>
                        {({ width, height }) => {
                            const pos = (height / 2) + (width * 0.4) + 30;
                            return (
                                <QRInnerWrapper width={width} height={height}>
                                    {this.props.isVisible && (
                                        <QrReader
                                            ref={ref => this.qrReader = ref}
                                            delay={300}
                                            facingMode="environment"
                                            legacyMode={legacyMode}
                                            onError={this.handleError}
                                            onScan={this.handleScan}
                                            onImageLoad={this.handleImageLoad}
                                            style={{ width: '100%', height: '100%' }}
                                        />
                                    )}

                                    <QRImageTrigger top={pos} onClick={this.toggleLegacyMode}>
                                        <img src={legacyImg} alt="" />
                                    </QRImageTrigger>

                                    <QRScanLine maxHeight={height}>
                                        <img src={rayImg} alt="" />
                                    </QRScanLine>

                                    {legacyMode && isScanning && (
                                        <PopupWrapper>
                                            <div>
                                                <FormattedMessage
                                                    id="pay_app.pay_qr_scanner.label_scanning"
                                                    defaultMessage="Scanning ..."
                                                /><br />
                                                <FormattedMessage
                                                    id="pay_app.pay_qr_scanner.label_please_wait"
                                                    defaultMessage="Please wait."
                                                />
                                            </div>
                                        </PopupWrapper>
                                    )}

                                    {error && (
                                        <PopupWrapper onClick={this.resetError}>
                                            <div className="error">
                                                {error}
                                            </div>
                                        </PopupWrapper>
                                    )}
                                </QRInnerWrapper>
                            );
                        }}
                    </AutoSizer>

                    {/* <PayAppGlowWrapper /> */}
                </TouchBlocker>
            </BodyWrapper>
        );
    }
}

export default PayQRScanner;
