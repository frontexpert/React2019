import React from 'react';
import { inject, observer } from 'mobx-react';
import { FormattedMessage } from 'react-intl';
import { find } from 'lodash';
import ClipboardJS from 'clipboard';

import { STORE_KEYS } from '../../stores';

import {
    Wrapper,
    ModalHeader,
    ModalBody,
    Title,
    MainContent,
    BottomLinks,
    BottomLink,
    ContentSeparator
} from './Components';
import {
    InputField,
    InputAddon
} from './InputComponents';
import {
    CopySmallIcon,
    QrIcon,
    CheckIcon
} from './Icons';

import QR from './QR';
import CreditFundsModal from '../CreditFundsModal';
import ExchangeListPartial from './ExchangeListPartial';
import SendCoinPartial from './SendCoinPartial';
import SeedWordsModal from '../SeedWordsModal';
import ApiPartial from './ApiPartial';

const addCreditFundsModal = (Modal, portal, additionalVerticalSpace, Coin) => () => Modal({
    portal,
    additionalVerticalSpace,
    ModalComponentFn: () => <CreditFundsModal heading1="Credit Card Payment" Coin={Coin}/>,
});

const showBackUpModal = (Modal, portal) => () => Modal({
    portal,
    ModalComponentFn: () => (
        <SeedWordsModal isShow={true} />
    ),
});

class DepositModalV2 extends React.Component {
    state = {
        qrOpened: false,
        addressCopied: false,
        isExchangeListOpen: false,
        isApiOpen: false,
        selectedExchange: '',
        isSelectedExchangeIncluded: false,
    };

    componentDidMount() {
        this.clipboard = new ClipboardJS('#copy_deposit2');
        this.clipboard.on('success', () => {
            // self.props.copy();
        });
    }

    handleAmountChange = e => {
        this.setState({
            amount: e.target.value,
        });
    };

    handleClickCopy = () => {
        this.setState({
            addressCopied: true,
        });
    };

    handleSendFinish = () => {
        const { onClose } = this.props[STORE_KEYS.MODALSTORE];
        if (onClose) {
            onClose();
        }
    };

    toggleQR = () => {
        this.setState(prevState => ({
            qrOpened: !prevState.qrOpened,
        }));
    };

    handleToggleExchangeList = () => {
        this.setState(prevState => ({
            isExchangeListOpen: !prevState.isExchangeListOpen,
        }));
    };

    handleToggleApi = (isApiOpen) => {
        this.setState(prevState => ({
            isApiOpen: (typeof isApiOpen === 'boolean') ? isApiOpen : !prevState.isApiOpen,
        }));
    };

    handleOpenApi = ({ exchange, included }) => {
        this.setState({
            selectedExchange: exchange,
            isSelectedExchangeIncluded: included,
        });

        this.handleToggleApi(true);
    };

    render() {
        const {
            qrOpened,
            addressCopied,
            isExchangeListOpen,
            isApiOpen,
            selectedExchange,
            isSelectedExchangeIncluded,
        } = this.state;

        const {
            coin,
            [STORE_KEYS.COINADDRESSSTORE]: coinAddressStore,
            [STORE_KEYS.MODALSTORE]: { Modal },
            [STORE_KEYS.YOURACCOUNTSTORE]: { CoinsForWallet },
        } = this.props;

        const {
            coinDepositAddress,
        } = coinAddressStore;

        let Coin;
        if (CoinsForWallet && CoinsForWallet.length) {
            Coin = find(CoinsForWallet, { coin });
        }

        return (
            <Wrapper>
                <ModalHeader>
                    <Title>
                        <FormattedMessage
                            id="modal.deposit_v2.label_send_receive"
                            defaultMessage="Send/Receive"
                        />
                        {coin}
                    </Title>
                </ModalHeader>

                <ModalBody>
                    <MainContent>
                        <SendCoinPartial selectedCoin={coin} onSendFinish={this.handleSendFinish}/>

                        <ContentSeparator/>

                        <InputField
                            label={`Your ${coin} Address`}
                            value={coinDepositAddress}
                            id="deposit_address2"
                            readOnly
                            addons={[
                                <InputAddon
                                    key="1"
                                    id="copy_deposit2"
                                    data-clipboard-target="#deposit_address2"
                                    onClick={this.handleClickCopy}
                                >
                                    {addressCopied
                                        ? <CheckIcon/>
                                        : <CopySmallIcon/>
                                    }
                                </InputAddon>,
                                <InputAddon
                                    key="2"
                                    onClick={this.toggleQR}
                                >
                                    <QrIcon/>
                                </InputAddon>
                            ]}
                        />
                    </MainContent>

                    <BottomLinks>
                        <BottomLink onClick={addCreditFundsModal(Modal, 'graph-chart-parent', true, Coin)}>
                            <FormattedMessage
                                id="modal.deposit_v2.btn_credit_card"
                                defaultMessage="Credit Card"
                            />
                        </BottomLink>
                        <BottomLink
                            onClick={this.handleToggleExchangeList}
                        >
                            <FormattedMessage
                                id="modal.deposit_v2.btn_api"
                                defaultMessage="API"
                            />
                        </BottomLink>
                        <BottomLink onClick={showBackUpModal(Modal, 'graph-chart-parent')}>
                            <FormattedMessage
                                id="modal.deposit_v2.btn_restore"
                                defaultMessage="Restore"
                            />
                        </BottomLink>
                    </BottomLinks>

                    <QR
                        opened={qrOpened}
                        toggleQR={this.toggleQR}
                        value={coinDepositAddress}
                    />

                    <ExchangeListPartial
                        opened={isExchangeListOpen}
                        toggle={this.handleToggleExchangeList}
                        onOpenApi={this.handleOpenApi}
                    />
                </ModalBody>

                {isApiOpen &&
                <ApiPartial onClose={this.handleToggleApi} exchange={selectedExchange} included={isSelectedExchangeIncluded}/>
                }
            </Wrapper>
        );
    }
}

export default inject(
    STORE_KEYS.MODALSTORE,
    STORE_KEYS.YOURACCOUNTSTORE,
    STORE_KEYS.COINADDRESSSTORE
)(observer(DepositModalV2));
