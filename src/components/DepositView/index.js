import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { FormattedMessage } from 'react-intl';
import { AutoSizer } from 'react-virtualized';
import QRCode from 'qrcode.react';

import SendCoinPartial from './SendCoinPartial';
import {
    CloseIcon
} from './Icons';
import {
    getScreenInfo
} from '../../utils/index';
import { STORE_KEYS } from '../../stores';

export const QRSectionWrapper = styled.div`
    position: relative;
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #FFF;
    border-radius: ${props => props.theme.palette.borderRadius};
    border: ${props => !props.noborder ? '1px solid ' + props.theme.palette.clrBorder : ''};
    background: ${props => props.theme.palette.clrMainWindow};
    
    > .price {
        font-size: 240px;
        line-height: 240px;
    }
    
    .qr-code-back {
        width: 100%;
        height: 100%;
    }
    
    canvas, .qr-code {
        position: absolute;
    }
`;

const QRWrapper = styled.div`
    flex-shrink: 0;
    position: relative;
    width: ${props => props.width ? props.width + 'px' : '100%'};
    height: ${props => props.height ? props.height + 'px' : '100%'};
    display: flex;
    align-items: center;
    justify-content: center;
    // background: #fff;
    
    .qr-code-back {
        position: absolute;
        width: 100%;
        height: 100%;
    }
    
    canvas, .qr-code {
        width: 66.47% !important;
        height: 66.47% !important;
        margin-top: -0.5% !important;
        margin-left: -0.5% !important;
    }
`;

const HeaderWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    margin: 0;
    border: none;
    padding: 20px;
    width: 100%;
`;

const Code = styled(QRCode)`
    pointer-events: none !important;

    & path:nth-child(1) {
        /* background */
        fill: ${props => props.theme.palette.clrBackground};
        display: none;
    }
    
    & path:nth-child(2) {
        /* foreground */
        fill: ${props => props.theme.palette.clrHighContrast};
    }
`;

const QRLabel = styled.h3`
    margin: 10px;
    width: 100%;
    font-size: 18px;
    color: ${props => props.theme.palette.clrMouseClick};
    font-weight: 400;
    text-align: center;
`;

class DepositView extends Component {
    state = {};

    render() {
        const {
            [STORE_KEYS.VIEWMODESTORE]: {
                depositActiveCoin,
                openDepositView,
            },
            [STORE_KEYS.COINADDRESSSTORE]: {
                coinDepositAddress,
            },
        } = this.props;

        const {
            isMobileDevice,
            isMobilePortrait,
        } = getScreenInfo();

        return (
            <AutoSizer>
                {({ width, height }) => {
                    return (
                        <QRSectionWrapper width={width} height={height}>
                            <HeaderWrapper>
                                <CloseIcon
                                    onClick={() => openDepositView(null)}
                                />
                            </HeaderWrapper>

                            <QRWrapper width={width - 30} height={width - 30}>
                                <Code
                                    value={coinDepositAddress}
                                    size={1000}
                                    level="H"
                                    includemargin={true}
                                    renderAs="svg"
                                    logo="/img/qr_logo.png"
                                />
                            </QRWrapper>

                            <QRLabel>
                                <FormattedMessage
                                    id="deposit_view.label_my"
                                    defaultMessage="My"
                                />
                                {depositActiveCoin}
                                <FormattedMessage
                                    id="deposit_view.label_address"
                                    defaultMessage="Address"
                                />
                            </QRLabel>

                            {!(isMobileDevice && isMobilePortrait) &&
                            <SendCoinPartial
                                coinDepositAddress={coinDepositAddress}
                                selectedCoin={depositActiveCoin}
                            />
                            }
                        </QRSectionWrapper>
                    );
                }}
            </AutoSizer>
        );
    }
}

export default inject(
    STORE_KEYS.VIEWMODESTORE,
    STORE_KEYS.COINADDRESSSTORE,
)(observer(DepositView));
