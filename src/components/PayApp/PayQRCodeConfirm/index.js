import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { AutoSizer } from 'react-virtualized';
// import QRCode from 'qrcode.react';

import { STORE_KEYS } from '../../../stores';
import { payViewModeKeys } from '../../../stores/PayAppStore';
import {
    QRSectionWrapper,
    QRInnerWrapper,
    QRWrapper,
    BackButton
} from '../Components';
import { BackIcon } from '../../SideBar/NewSettingsPop/Components';
import QRCode from '../../../components-generic/QRReactCustom';
import DataLoader from '../../../components-generic/DataLoader';

import imgCheck from './check.png';
import imgQrBack from '../../DepositView/qr_back_2-2.png';

const QRPayButton = styled.div`
    position: absolute;
    bottom: ${props => props.bottom}px;
    width: 80%;
    padding: 10px 0;
    border: 2px solid ${props => props.theme.palette.mobile2PayViewPayBtnBorderColor};
    border-radius: 100px;
    font-family: 'Exo 2';
    font-weight: 500;
    font-size: 32px;
    text-align: center;
    color: ${props => props.theme.palette.clrHighContrast};
    transform: translateY(50%);
    
    &:hover {
        background: ${props => props.theme.palette.clrMouseClick};
    }
`;

const CheckboxWrapper = styled.div`
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #606060;
    border-radius: 50%;
`;

const Label = styled.div`
    position: absolute;
    bottom: ${props => props.bottom}px;
    width: 80%;
    padding: 10px 0;
    font-family: 'Exo 2';
    font-weight: 500;
    font-size: 32px;
    text-align: center;
    color: ${props => props.theme.palette.clrHighContrast};
    text-transform: uppercase;
    transform: translateY(50%);
`;

class PayQRCodeConfirm extends Component {
    state = {
        isConfirming: false,
        isConfirmed: false,
    };

    closeQRCode = () => {
        const {
            [STORE_KEYS.PAYAPPSTORE]: { switchAppContentView },
        } = this.props;
        switchAppContentView(payViewModeKeys.payChooseModeKey);
    };

    claimTransfer = () => {
        if (!this.state.isConfirming) {
            const {
                [STORE_KEYS.SENDCOINSTORE]: { claimTransfer },
                qrObj,
                setClaimRet,
            } = this.props;

            this.setState({
                isConfirming: true,
            });

            if (qrObj.isLoggedIn && qrObj.uniqueId !== '' && qrObj.uniqueId) {
                claimTransfer(qrObj.uniqueId).then(res => {
                    setClaimRet(res.msg || '');

                    this.setState({
                        isConfirmed: true,
                    });
                });
            }
        }
    };

    render() {
        const url = window.location.href || '';
        const { isConfirming, isConfirmed } = this.state;
        const { qrObj } = this.props;

        return (
            <QRSectionWrapper noborder={true}>
                <AutoSizer>
                    {({ width, height }) => {
                        let size = Math.min(width * 0.85, height);
                        return (url && url !== '') ? (
                            <Fragment>
                                <BackButton onClick={this.closeQRCode}><BackIcon/></BackButton>

                                {isConfirmed ? (
                                    <Fragment>
                                        <CheckboxWrapper width={size * 0.8} height={size * 0.8}>
                                            <img src={imgCheck} width={size * 0.3} alt="" />
                                        </CheckboxWrapper>

                                        <Label bottom={(height - size) / 4}>Done</Label>
                                    </Fragment>
                                ) : (
                                    isConfirming ? (
                                        <DataLoader width={size / 2} height={size / 2} />
                                    ) : (
                                        <Fragment>
                                            <QRInnerWrapper>
                                                <QRWrapper width={size} height={size}>
                                                    <img src={imgQrBack} className="qr-code-back" alt=""/>
                                                    <QRCode
                                                        value={url}
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

                                            <QRPayButton bottom={(height - size) / 4} onClick={this.claimTransfer}>
                                                {'ACCEPT ' + (qrObj !== null ? qrObj.labelAmount : '')}
                                            </QRPayButton>
                                        </Fragment>
                                    )
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
    STORE_KEYS.SETTINGSSTORE,
    STORE_KEYS.PAYAPPSTORE,
    STORE_KEYS.SENDCOINSTORE,
)(observer(PayQRCodeConfirm));
