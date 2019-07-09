import React, { Component } from 'react';
import { compose, withProps } from 'recompose';
import { inject, observer } from 'mobx-react';
import { FormattedMessage } from 'react-intl';
import { find } from 'lodash';
import { Tooltip } from 'react-tippy';

import { STORE_KEYS } from '../../../stores';
import {
    QRSection,
    Code,
    FlexWrapper,
    Button
} from './Components';
import {
    Wrapper,
    Label,
    InnerWrapper,
    CopyIcon,
    PrintIcon,
    CreditIcon,
    HistoryIcon
} from '../Components';
import CreditFundsModal from '../CreditFundsModal';
import SeedWordsModal from '../../SeedWordsModal';
import ApiModal from '../ApiModal';

const showCreditFundsModal = (Modal, portal, additionalVerticalSpace, Coin) => () => Modal({
    portal,
    additionalVerticalSpace,
    ModalComponentFn: () => <CreditFundsModal heading="Credit Card Payment" Coin={Coin}/>,
});

const showApiModal = (Modal, portal) => () => Modal({
    portal,
    ModalComponentFn: () => <ApiModal/>,
});

const showBackUpModal = (Modal, portal) => () => Modal({
    portal,
    ModalComponentFn: () => (
        <SeedWordsModal isShow={false}/>
    ),
});

class QRModal extends Component {
    state = {};

    render() {
        const {
            Modal,
            heading = 'Deposit',
            coin,
            coinDepositAddress,
            CoinsForWallet,
        } = this.props;

        let Coin;
        if (CoinsForWallet && CoinsForWallet.length) {
            Coin = find(CoinsForWallet, { coin });
        }

        return (
            <Wrapper>
                <Label>
                    <span>
                        <FormattedMessage
                            id="modal.qr.label_your"
                            defaultMessage="Your"
                        />
                        {coin}
                        <FormattedMessage
                            id="modal.qr.label_address"
                            defaultMessage="Address"
                        />
                    </span>
                </Label>

                <InnerWrapper>
                    <QRSection>
                        <Code
                            value={coinDepositAddress}
                            level="L"
                            renderAs="svg"
                        />

                        <FlexWrapper>
                            <Tooltip
                                arrow
                                animation="shift"
                                position="bottom"
                                theme="bct"
                                title={`Copy address: ${coinDepositAddress}`}
                            >
                                <Button>
                                    <CopyIcon/>
                                </Button>
                            </Tooltip>
                            <Tooltip
                                arrow
                                animation="shift"
                                position="bottom"
                                theme="bct"
                                title="Print QR"
                            >
                                <Button onClick={showApiModal(Modal, 'graph-chart-parent')}>
                                    <PrintIcon/>
                                </Button>
                            </Tooltip>
                            <Tooltip
                                arrow
                                animation="shift"
                                position="bottom"
                                theme="bct"
                                title="Buy"
                            >
                                <Button onClick={showCreditFundsModal(Modal, 'graph-chart-parent', true, Coin)}>
                                    <CreditIcon/>
                                </Button>
                            </Tooltip>
                            {/*
                            <Tooltip
                                arrow
                                animation="shift"
                                position="bottom"
                                theme="bct"
                                title="Restore"
                            >
                                <Button onClick={showBackUpModal(Modal, 'graph-chart-parent')}>
                                    <HistoryIcon/>
                                </Button>
                            </Tooltip>
                            */}
                        </FlexWrapper>
                    </QRSection>
                </InnerWrapper>
            </Wrapper>
        );
    }
}

const enchanced = compose(
    inject(
        STORE_KEYS.MODALSTORE,
        STORE_KEYS.COINADDRESSSTORE,
        STORE_KEYS.YOURACCOUNTSTORE
    ),
    observer,
    withProps(
        ({
            [STORE_KEYS.MODALSTORE]: {
                Modal,
                onClose,
            },
            [STORE_KEYS.COINADDRESSSTORE]: {
                coinDepositAddress,
            },
            [STORE_KEYS.YOURACCOUNTSTORE]: {
                CoinsForWallet,
            },
        }) => ({
            Modal,
            onClose,
            coinDepositAddress,
            CoinsForWallet,
        })
    )
);

export default enchanced(QRModal);
