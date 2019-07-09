import React from 'react';
import ClipboardJS from 'clipboard';
import { inject, observer } from 'mobx-react';

import { STORE_KEYS } from '../../../../stores';
import { toFixedWithoutRounding, convertToFloat } from '../../../../utils';
import { valueNormalized } from '../../../../stores/utils/OrderEntryUtils';
import InputField from './InputField';
import {
    Wrapper,
    InnerWrapper,
    InputAddon,
    PortalWrapper,
    PortalInnerWrapper,
    WithdrawInfo,
    ModalWrapper,
    InputFieldWrapper,
    DataLoaderWrapper
} from './Components';
import SliderInput from './SliderInput';
import QRCodePortal from '../../../QRCodePortal';
import BillsInner from '../../../Modals/BillsModal/BillsInnerV2';
import DataLoader from '../../../../components-generic/DataLoader';

class ExchDeposit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            withdrawAddress: '',
            isInProgress: false,
            addressCopied: false,
            isQRShowing: false,
            isStorageShowing: false,
            isDepositShowing: false,
            isClosing: false,
            isOpenedBig: false,
            isDepositColdStorageLoaded: false,
            isWithdrawColdStorageLoaded: false,
            amount: convertToFloat(props.balance),
        };

        const {
            [STORE_KEYS.BILLCHIPSTORE]: { showBillChips },
            balance,
            symbol,
            position,
        } = this.props;

        showBillChips(symbol, balance, position);
    }

    componentDidMount() {
        this.clipboard = new ClipboardJS('#copy_deposit');
        this.clipboard.on('success', () => {
            // self.props.copy();
        });
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside = (event) => {
        if (
            (
                this.state.isDepositShowing &&
                this.state.isClosing &&
                this.state.isOpenedBig &&
                this.portalInnerWrapperRef &&
                this.portalInnerWrapperRef.contains &&
                !this.portalInnerWrapperRef.contains(event.target)
            ) || (
                this.state.isQRShowing &&
                this.state.isClosing &&
                this.state.isOpenedBig &&
                this.portalInnerWrapperRef &&
                this.portalInnerWrapperRef.contains &&
                !this.portalInnerWrapperRef.contains(event.target)
            )
        ) {
            this.closeDeposit();
        }
    };

    handleChange = field => value => {
        this.setState({
            [field]: value,
        });
    };

    handleClickCopy = () => {
        if (this.state.isQRShowing) {
            this.props.onCloseHandler();
            return;
        }
        this.setState({
            addressCopied: true,
            isQRShowing: true,
        });
    };

    showDeposit = (event) => {
        if (!this.state.isDepositShowing) {
            this.setState({
                isDepositShowing: true,
                isInProgress: true,
            });

            const {
                [STORE_KEYS.BILLCHIPSTORE]: { showBillChips },
                balance,
                symbol,
                position,
            } = this.props;

            showBillChips(symbol, balance, position);

            setTimeout(() => {
                this.setState({
                    isInProgress: false,
                });
            }, 400);
        } else if (
            this.state.isDepositShowing &&
            (
                (
                    event &&
                    event.target &&
                    event.target.id === 'withdraw-addon'
                ) ||
                (
                    this.withdrawAddonRef &&
                    this.withdrawAddonRef.contains &&
                    this.withdrawAddonRef.contains(event.target) &&
                    !event.target.classList.contains('exch-deposit')
                )
            )
        ) {
            this.props.onCloseHandler();
        }
    };

    closeDeposit = () => {
        if (this.state.isDepositShowing || this.state.isQRShowing) {
            this.setState({
                isDepositShowing: false,
                isClosing: false,
                isOpenedBig: false,
                isQRShowing: false,
                isStorageShowing: false,
            });
        }
    };

    handleAmountChange = value => {
        const valueParsed = Number.parseFloat(value);
        const { amount } = this.state;
        const {
            [STORE_KEYS.BILLCHIPSTORE]: { setWithdrawAmount },
            balance,
        } = this.props;

        if (valueParsed > balance) {
            return;
        }

        let oldValue = String(amount);
        let newValue = valueNormalized(oldValue, value);

        setWithdrawAmount(newValue || 0);

        this.setState({
            amount: newValue || 0,
        });
    };

    handleDepositColdStorageLoad = () => {
        if (this.state.isDepositColdStorageLoaded) {
            return;
        }
        this.setState({ isDepositColdStorageLoaded: true });
    };

    handleWithdrawColdStorageLoad = () => {
        if (this.state.isWithdrawColdStorageLoaded) {
            return;
        }
        this.setState({ isWithdrawColdStorageLoaded: true });
    };

    render() {
        const {
            withdrawAddress, isOpenedBig, amount, isDepositColdStorageLoaded, isWithdrawColdStorageLoaded,
        } = this.state;
        const {
            isLeft, symbol, depositAddress, position, onChangeDeposit, rowBaseWidth, rowHeight,
            [STORE_KEYS.TELEGRAMSTORE]: {
                isLoggedIn,
            },
            balance,
        } = this.props;

        const phone = isLoggedIn
            ? localStorage.getItem('phoneNumber') || ''
            : '';

        // Set center position to render decimal point in cold storage table (BillsInner)
        let centerPos = 9;
        const count = Math.log10(position);
        if (count > 5) {
            centerPos = count + 1;
        }
        // 16 total amount of columns in cold storage table (BillsInner)
        const newPosition = toFixedWithoutRounding(position, 16 - centerPos);

        // Coins list padding
        const rowPadding = 30;
        const innerWrapperWidth = rowBaseWidth;
        const innerWrapperHeight = (innerWrapperWidth - 60) * 11 / 16 + rowHeight;

        const portalWrapperWidth = rowBaseWidth - 2 * rowPadding;
        const portalWrapperHeight = (innerWrapperWidth - 60) * 11 / 16 - 10;

        const modalWrapperWidth = portalWrapperWidth;
        const modalWrapperHeight = portalWrapperHeight;

        const chipHeight = modalWrapperHeight * 0.83;
        const chipWidth = Math.floor(chipHeight * 3192 / 1800);
        const addonWidth = Math.max((modalWrapperWidth - chipWidth) / 2 + Math.floor(chipWidth * 749 / 3192), 100);

        // Provide selected bill for BillsInner deposit view
        let selected = symbol
            ? {
                index: 0,
                level: 0,
                symbol,
                disabled: false,
                deno: centerPos - 1,
                publicAddress: depositAddress,
                serial: '',
            }
            : null;

        return (
            <Wrapper id="exch-deposit-wrapper">
                <QRCodePortal
                    wrapperId="exch-deposit-wrapper"
                    id="qr-code-portal"
                >
                    <InnerWrapper
                        width={innerWrapperWidth}
                        height={innerWrapperHeight}
                    >
                        <PortalWrapper
                            width={portalWrapperWidth}
                            height={portalWrapperHeight}
                        >
                            <PortalInnerWrapper
                                innerRef={ref => this.portalInnerWrapperRef = ref}
                                className={isLeft ? '' : 'flip'}
                            >
                                <WithdrawInfo className="deposit-info">
                                    <ModalWrapper
                                        width={modalWrapperWidth}
                                        height={modalWrapperHeight}
                                        className={isDepositColdStorageLoaded ? '' : 'hide'}
                                    >
                                        <BillsInner
                                            isOpen={isOpenedBig}
                                            centerPos={centerPos}
                                            newPosition={newPosition}
                                            onClose={this.closeDeposit}
                                            selected={selected}
                                            isDeposit={true}
                                            onChangeDeposit={onChangeDeposit}
                                            handleColdStorageLoad={this.handleDepositColdStorageLoad}
                                        />
                                    </ModalWrapper>

                                    {!isDepositColdStorageLoaded && (
                                        <DataLoaderWrapper>
                                            <DataLoader width={50} height={50} />
                                        </DataLoaderWrapper>
                                    )}
                                </WithdrawInfo>

                                <WithdrawInfo className="withdraw-info">
                                    <ModalWrapper
                                        width={modalWrapperWidth}
                                        height={modalWrapperHeight}
                                        className={isDepositColdStorageLoaded ? '' : 'hide'}
                                    >
                                        <BillsInner
                                            isOpen={isOpenedBig}
                                            centerPos={centerPos}
                                            newPosition={newPosition}
                                            onClose={this.closeDeposit}
                                            onChangeDeposit={onChangeDeposit}
                                            handleColdStorageLoad={this.handleWithdrawColdStorageLoad}
                                        />
                                    </ModalWrapper>

                                    {!isWithdrawColdStorageLoaded && (
                                        <DataLoaderWrapper>
                                            <DataLoader width={50} height={50} />
                                        </DataLoaderWrapper>
                                    )}
                                </WithdrawInfo>
                            </PortalInnerWrapper>
                        </PortalWrapper>

                        <InputFieldWrapper
                            width={rowBaseWidth}
                            height={rowHeight}
                        >
                            <InputField
                                id="withdraw_address"
                                label={`Withdraw ${symbol}`}
                                placeholder={`Enter ${symbol} Wallet Address`}
                                size={20}
                                value={withdrawAddress}
                                readOnly={false}
                                changeValue={this.handleChange('withdrawAddress')}
                                addonWidth={addonWidth}
                                addon={
                                    <InputAddon
                                        key="2"
                                        width={addonWidth}
                                        id="withdraw-addon"
                                        onClick={this.showDeposit}
                                        innerRef={ref => this.withdrawAddonRef = ref}
                                    >
                                        <span>Withdraw</span>
                                    </InputAddon>
                                }
                                slider={
                                    <SliderInput
                                        value={amount}
                                        max={balance}
                                        addonWidth={addonWidth}
                                        onChange={this.handleAmountChange}
                                    />
                                }
                            />
                        </InputFieldWrapper>
                    </InnerWrapper>
                </QRCodePortal>
            </Wrapper>
        );
    }
}

export default inject(
    STORE_KEYS.BILLCHIPSTORE,
    STORE_KEYS.TELEGRAMSTORE
)(observer(ExchDeposit));
