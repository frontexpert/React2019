import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';

import QRCode from '../../../../components-generic/QRReactCustom/index';
import { QRSectionWrapper } from '../SendCoinComponents';
import { STORE_KEYS } from '../../../../stores/index';
import imgQrBack from '../../../DepositView/qr_back_2-1.png';
import DataLoader from '../../../../components-generic/DataLoader/index';
import DataLoaderDone from '../../../../components-generic/DataLoaderDone/index';
import { claimModeKeys } from '../../../../stores/PayWindowStore';

const QRWrapper = styled.div`
    flex-shrink: 0;
    position: relative;
    width: ${props => props.width ? props.width + 'px' : '100%'};
    height: ${props => props.height ? props.height + 'px' : '100%'};
    display: flex;
    align-items: center;
    justify-content: center;
    
    .qr-code-back {
        position: absolute;
        width: 100%;
        height: 100%;
    }
    
    .qr-code, canvas {
        width: 66% !important;
        height: 66% !important;
    }
`;

class QRScanView extends Component {
    state = {
        isQRLoaded: false,
        qrValue: '',
    };

    componentWillReceiveProps(props) {
        const {
            [STORE_KEYS.SENDCOINSTORE]: { uniqueAddress },
        } = props;

        let qrValue = '';
        try {
            qrValue = 'https://' + window.location.hostname + '/?cointransfer' + uniqueAddress;
        } catch (e) {
            qrValue = '';
        }

        if (uniqueAddress !== '') {
            this.setState({
                qrValue,
            });
        }
    }

    render() {
        const { qrValue } = this.state;
        const {
            width,
            height,
        } = this.props;
        const {
            claimNotify,
        } = this.props[STORE_KEYS.PAYWINDOWSTORE];
        console.log('[qrValue]', qrValue);

        let size = Math.min(width * 0.85, height);
        return (
            <QRSectionWrapper width={width} height={height} noborder={true}>
                {qrValue && qrValue !== '' &&
                    <Fragment>
                        {claimNotify === claimModeKeys.initialModeKey && (
                            <QRWrapper width={size} height={size}>
                                <img src={imgQrBack} className="qr-code-back" alt=""/>
                                <QRCode
                                    value={qrValue}
                                    size={1000}
                                    bgColor="#ffffff00"
                                    fgColor="#ffcf40"
                                    level="H"
                                    includemargin={true}
                                    renderAs="svg"
                                    logo="/img/qr_logo_b.png"
                                    className="qr-code"
                                />
                            </QRWrapper>
                        )}
                        {claimNotify === claimModeKeys.loadingModeKey && (
                            <DataLoader width={100} height={100}/>
                        )}
                        {claimNotify === claimModeKeys.doneModeKey && (
                            <DataLoaderDone width={150} height={150}/>
                        )}
                    </Fragment>
                }
            </QRSectionWrapper>
        );
    }
}

export default inject(
    STORE_KEYS.SENDCOINSTORE,
    STORE_KEYS.YOURACCOUNTSTORE,
    STORE_KEYS.PAYWINDOWSTORE,
)(observer(QRScanView));
