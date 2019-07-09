import React from 'react';
import ClipboardJS from 'clipboard';
import { inject, observer } from 'mobx-react';

import { STORE_KEYS } from '../../../../stores';
import { toFixedWithoutRounding, convertToFloat } from '../../../../utils';
import InputField from './InputField';
import {
    Wrapper,
    InnerWrapper,
    InputAddon,
    PortalWrapper,
    PortalInnerWrapper,
    CoinBlurOverlay,
    Code,
    WithdrawInfo,
    ModalWrapper
} from './Components';
import SliderInput from './SliderInput';
import { valueNormalized } from '../../../../stores/utils/OrderEntryUtils';
import QRCodePortal from '../../../QRCodePortal';
// import BillsInner from '../../../Modals/BillsModal/BillsInner';
import BillsInner from '../../../Modals/BillsModal/BillsInnerV2';
import CoinIcon from '../CoinIcon';

class ExchDeposit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            withdrawAddress: '',
            isInProgress: false,
            addressCopied: false,
            isQRShowing: false,
            isDepositShowing: false,
            isClosing: false,
            isOpenedBig: false,
            amount: convertToFloat(props.balance),
        };
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
            this.state.isDepositShowing && this.state.isClosing && this.state.isOpenedBig
            && this.portalInnerWrapperRef && this.portalInnerWrapperRef.contains && !this.portalInnerWrapperRef.contains(event.target)
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

    showDeposit = () => {
        if (!this.state.isDepositShowing) {
            this.setState({
                isDepositShowing: true,
                isInProgress: true,
            });

            setTimeout(() => {
                this.setState({
                    isInProgress: false,
                });
            }, 400);
        }
    };

    closeDeposit = () => {
        if (this.state.isDepositShowing) {
            this.setState({
                isDepositShowing: false,
                isClosing: false,
                isOpenedBig: false,
            });
        }
    };

    showBillPopup = () => {
        if (this.state.isOpenedBig) {
            this.closeDeposit();
        } else {
            const {
                [STORE_KEYS.BILLCHIPSTORE]: { showBillChips },
                balance,
                symbol,
                position,
            } = this.props;
            const { amount } = this.state;

            this.setState({
                isClosing: true,
                isInProgress: true,
            });

            showBillChips(symbol, balance, position);

            setTimeout(() => {
                this.setState({
                    isOpenedBig: true,
                    isInProgress: false,
                });
            }, 500);
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

    render() {
        const {
            withdrawAddress, isInProgress, addressCopied,
            isQRShowing, isDepositShowing, isClosing, isOpenedBig, amount,
        } = this.state;
        const {
            isLeft, balance, symbol, depositAddress, position, defaultFiat, onChangeDeposit,
        } = this.props;

        let centerPos = 5;
        const count = Math.log10(position);
        if (count > 5) {
            centerPos = count + 1;
        }
        const newPosition = toFixedWithoutRounding(position, 10 - centerPos);

        return (
            <Wrapper>
                {isLeft ? (
                    <InnerWrapper column>
                        <InputField
                            id="deposit_address"
                            label={`Deposit ${symbol}`}
                            multiLine
                            size={20}
                            readOnly
                            value={depositAddress}
                            addonWidth={136}
                            addon={
                                <InputAddon
                                    key="1"
                                    width={136}
                                    id="copy_deposit"
                                    data-clipboard-target="#deposit_address"
                                    onClick={this.handleClickCopy}
                                >
                                    <span>Deposit</span>
                                    <span className="exch-deposit" onClick={onChangeDeposit}>WITHDRAW</span>

                                    {isQRShowing && (
                                        <QRCodePortal wrapperId="copy_deposit">
                                            <PortalWrapper width={136} height={136}>
                                                <Code
                                                    value={depositAddress}
                                                    size={120}
                                                    level="L"
                                                    includemargin="true"
                                                    renderAs="svg"
                                                    logo="/img/qr_logo.png"
                                                />
                                            </PortalWrapper>
                                        </QRCodePortal>
                                    )}
                                </InputAddon>
                            }
                        />
                    </InnerWrapper>
                ) : (
                    <InnerWrapper>
                        <SliderInput
                            value={amount}
                            max={balance}
                            onChange={this.handleAmountChange}
                        />
                        <InputField
                            id="withdraw_address"
                            label={`Withdraw ${symbol}`}
                            placeholder={`Enter ${symbol} Wallet Address`}
                            size={20}
                            value={withdrawAddress}
                            readOnly={false}
                            changeValue={this.handleChange('withdrawAddress')}
                            addonWidth={136}
                            addon={
                                <InputAddon
                                    key="2"
                                    width={136}
                                    id="withdraw-addon"
                                    onClick={this.showDeposit}
                                >
                                    <span>Withdraw</span>
                                    <span className="exch-deposit" onClick={onChangeDeposit}>DEPOSIT</span>

                                    {isDepositShowing && (
                                        <QRCodePortal
                                            id="qr-code-portal"
                                            className={`qr-portal${isClosing ? ' close' : ''}`}
                                            wrapperId="withdraw-addon"
                                        >
                                            <PortalWrapper
                                                width={136}
                                                height={136}
                                            >
                                                <PortalInnerWrapper
                                                    innerRef={ref => this.portalInnerWrapperRef = ref}
                                                    className={isClosing && 'close'}
                                                    maxFontSize={Math.round((window.innerHeight - 30) / 16)}
                                                >
                                                    <CoinIcon
                                                        showTether
                                                        value={symbol}
                                                        defaultFiat={defaultFiat}
                                                    />

                                                    {/*
                                                    <CoinBlurOverlay>
                                                        <CoinIcon
                                                            showTether
                                                            value={symbol}
                                                            defaultFiat={defaultFiat}
                                                        />
                                                    </CoinBlurOverlay>
                                                    */}

                                                    {!isInProgress && (
                                                        <WithdrawInfo>
                                                            {/* <span>{newPosition} {symbol}</span> */}
                                                            <ModalWrapper
                                                                maxHeight={Math.round((window.innerHeight - 30) * 0.45)}
                                                                className={isClosing && 'close'}
                                                                onClick={isClosing ? null : this.showBillPopup}
                                                            >
                                                                <BillsInner
                                                                    height={55}
                                                                    isOpen={isOpenedBig}
                                                                    centerPos={centerPos}
                                                                    newPosition={newPosition}
                                                                    onClose={this.closeDeposit}
                                                                />
                                                            </ModalWrapper>
                                                            {/* <span>In Cold Storage</span> */}
                                                        </WithdrawInfo>
                                                    )}
                                                </PortalInnerWrapper>
                                            </PortalWrapper>
                                        </QRCodePortal>
                                    )}
                                </InputAddon>
                            }
                        />
                    </InnerWrapper>
                )}
            </Wrapper>
        );
    }
}

export default inject(
    STORE_KEYS.BILLCHIPSTORE
)(observer(ExchDeposit));
