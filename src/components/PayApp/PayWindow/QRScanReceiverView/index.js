import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import QRCode from '../../../../components-generic/QRReactCustom/index';
import { QRSectionWrapper } from '../SendCoinComponents';
import imgQrBack from '../../../DepositView/qr_back_2-1.png';

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

class QRScanReceiverView extends Component {
    state = {
        isQRLoaded: false,
        qrValue: '',
    };

    render() {
        const { width, height } = this.props;
        const url = window.location.href || '';

        let size = Math.min(width * 0.85, height);
        return (
            <QRSectionWrapper width={width} height={height} noborder={true}>
                {url && (url !== '') &&
                    <Fragment>
                        <QRWrapper width={size} height={size}>
                            <img src={imgQrBack} className="qr-code-back" alt=""/>
                            <QRCode
                                value={url}
                                size={1000}
                                bgColor="#ffffff00"
                                fgColor="#ffcf40"
                                level="H"
                                includemargin={true}
                                renderAs="svg"
                                logo="/img/qr_logo.png"
                                className="qr-code"
                            />
                        </QRWrapper>
                    </Fragment>
                }
            </QRSectionWrapper>
        );
    }
}

export default QRScanReceiverView;
