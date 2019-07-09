import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { AutoSizer } from 'react-virtualized';
// import QRCode from 'qrcode.react';

import { STORE_KEYS } from '../../../stores';
import { claimModeKeys, payViewModeKeys } from '../../../stores/PayAppStore';
import { unifyDigitString } from '../../../utils';
import {
    QRSectionWrapper,
    QRInnerWrapper,
    QRWrapper,
    QRPayAmount,
    BackButton
} from '../Components';
import QRCode from '../../../components-generic/QRReactCustom';
import DataLoader from '../../../components-generic/DataLoader';
import DataLoaderDone from '../../../components-generic/DataLoaderDone';
import { BackIcon } from '../../SideBar/NewSettingsPop/Components';

import imgQrBack from '../../DepositView/qr_back_2-2.png';

class PayQRCode extends Component {
    state = {};

    closeQRCode = () => {
        const {
            [STORE_KEYS.PAYAPPSTORE]: { backMode, switchAppContentView },
        } = this.props;
        // if (backMode) {
        //     switchAppContentView(payViewModeKeys.payCalcModeKey);
        // } else {
        switchAppContentView(payViewModeKeys.payChooseModeKey);
        // }
    };

    render() {
        const {
            [STORE_KEYS.PAYAPPSTORE]: { claimNotify, payAmount },
            [STORE_KEYS.SENDCOINSTORE]: { uniqueAddress },
            [STORE_KEYS.SETTINGSSTORE]: { defaultFiatSymbol },
        } = this.props;
        let qrValue = '';

        if (uniqueAddress !== '') {
            try {
                qrValue = 'https://' + window.location.hostname + '/?cointransfer' + uniqueAddress;
            } catch (e) {
                qrValue = '';
            }
        }
        console.log('[qrValue]', qrValue);

        return (
            <QRSectionWrapper noborder={true}>
                <AutoSizer>
                    {({ width, height }) => {
                        let size = Math.min(width * 0.85, height);
                        return (qrValue && qrValue !== '') ? (
                            <Fragment>
                                <BackButton onClick={this.closeQRCode}><BackIcon/></BackButton>

                                {claimNotify === claimModeKeys.initialModeKey && (
                                    <Fragment>
                                        <QRInnerWrapper>
                                            <QRWrapper width={size} height={size}>
                                                <img src={imgQrBack} className="qr-code-back" alt=""/>
                                                <QRCode
                                                    value={qrValue}
                                                    size={1000}
                                                    bgColor="#d9c474"
                                                    fgColor="#010617"
                                                    level="H"
                                                    includemargin={true}
                                                    renderAs="svg"
                                                    // logo="/img/qr_logo_b.png"
                                                    className="qr-code"
                                                />
                                            </QRWrapper>
                                        </QRInnerWrapper>

                                        <QRPayAmount top={(height - size) / 4}>
                                            {'PAY ' + defaultFiatSymbol + unifyDigitString(payAmount)}
                                        </QRPayAmount>
                                    </Fragment>
                                )}

                                {claimNotify === claimModeKeys.loadingModeKey && (
                                    <DataLoader width={150} height={150}/>
                                )}
                                {claimNotify === claimModeKeys.doneModeKey && (
                                    <DataLoaderDone width={150} height={150}/>
                                )}
                            </Fragment>
                        ) : '';
                    }}
                </AutoSizer>
            </QRSectionWrapper>
        );
    }
}

export default inject(
    STORE_KEYS.SENDCOINSTORE,
    STORE_KEYS.SETTINGSSTORE,
    STORE_KEYS.YOURACCOUNTSTORE,
    STORE_KEYS.PAYAPPSTORE,
)(observer(PayQRCode));
