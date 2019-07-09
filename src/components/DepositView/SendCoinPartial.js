import React from 'react';
import styled from 'styled-components';
import { compose, withProps } from 'recompose';
import { inject, observer } from 'mobx-react';
import { FormattedMessage } from 'react-intl';
import ClipboardJS from 'clipboard';

import { STORE_KEYS } from '../../stores/index';

import {
    customDigitFormat,
    unifyDigitString
} from '../../utils/index';
import { valueNormalized } from '../../stores/utils/OrderEntryUtils';

import {
    Input,
    InputAddon,
    InputFieldWrapper,
    InputOuterWrapper,
    Label,
    AvatarWrapper,
    InputLabel
} from './InputComponents';

import {
    CopyIcon,
    CopySmallIcon,
    SendIcon,
    CheckIcon
} from './Icons';

import SliderInput from '../../components-generic/SliderInputThumb/index';
import DataLoader from '../../components-generic/DataLoader/index';
import UserAvatarComponent from '../SideHeader/UserAvatarComponent';

const InputFields = styled.div.attrs({ className: 'deposit-v2-send-coins-fields' })`
    flex: 1 1;
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: stretch;
    width: 100%;
    height: 100%;
    
    .range-slider {
        position: absolute;
        bottom: -6px;
        left: 0;
        right: 0;
    }
`;

class SendCoinPartial extends React.PureComponent {
    state = {
        selectedCoin: '',

        amount: 0,
        amountMax: 0,
        price: 0,

        isAmtInputFocused: false,
        isAmtChangedAfterFocus: false,

        returnAddress: '',
        isSendingCoins: false,
        submitted: false,
    };

    wrapperRef = null;
    amountInput = null;
    sendTimoutId = null;

    componentDidMount() {
        this.clipboard = new ClipboardJS('#deposit-send-coin-copy-my-address');
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.selectedCoin !== nextProps.selectedCoin) {
            let amountMax = 0;
            let amount = 0;
            let price = 0;

            for (let i = 0; i < nextProps.PortfolioData.length; i++) {
                if (nextProps.PortfolioData[i].Coin === nextProps.selectedCoin) {
                    amountMax = nextProps.PortfolioData[i].Position || 0;
                    // amount = Math.min(nextProps.PortfolioData[i].Position, 1) || 0;
                    amount = nextProps.PortfolioData[i].Position;
                    price = nextProps.PortfolioData[i].Price || 0;
                }
            }

            return {
                selectedCoin: nextProps.selectedCoin,
                amountMax,
                amount,
                price,
            };
        }

        return null;
    }

    handleAmountChange = value => {
        const valueParsed = Number.parseFloat(value);

        if (valueParsed > this.state.amountMax) {
            return;
        }

        let oldValue = String(this.state.amount);
        let newValue = valueNormalized(oldValue, value);

        this.setState({
            amount: newValue || 0,
            isAmtChangedAfterFocus: true,
        });
    };

    handleAmtInputFocus = () => {
        this.setState({
            isAmtInputFocused: true,
            isAmtChangedAfterFocus: false,
        });

        this.setState({
            amount: '0',
        });

        if (this.state.isOpened) {
            this.toggleDropDown();
        }
    };

    handleAmtInputBlur = () => {
        this.setState({
            isAmtInputFocused: false,
        });
    };

    handleChangeReturnAddress = ({ target: { value } }) => {
        this.setState({
            returnAddress: value,
            submitted: false,
            isSendingCoins: false,
        });
    };

    handleSendCoin = (e) => {
        e.preventDefault();

        const {
            amount,
            selectedCoin,
            returnAddress,
            isSendingCoins,
            submitted,
        } = this.state;

        const {
            withdrawalRequestWith,
            showConvertState,
        } = this.props;

        if (
            amount > 0 &&
            selectedCoin &&
            returnAddress &&
            !isSendingCoins &&
            !submitted
        ) {
            this.setState({
                isSendingCoins: true,
            });

            withdrawalRequestWith(selectedCoin, amount, returnAddress)
                .then(res => {
                    if (res.Status === 'Not Sent') {
                        return Promise.reject(res);
                    }

                    showConvertState(res.Status || 'Coin sent successfully!');

                    this.setState({
                        isSendingCoins: false,
                        submitted: true,
                    });
                })
                .catch(err => {
                    if (this.state.isSendingCoins) {
                        showConvertState(err.Status || 'Can not send coin!');

                        this.setState({
                            isSendingCoins: false,
                            submitted: false,
                        });
                    }
                });

            clearTimeout(this.sendTimoutId);

            this.sendTimoutId = setTimeout(() => {
                if (this.state.isSendingCoins) {
                    showConvertState('Not Sent');

                    this.setState({
                        isSendingCoins: false,
                        submitted: false,
                    });
                }
            }, 20000);
        }
    };

    render() {
        const {
            amount,
            amountMax,
            price,
            selectedCoin,
            isAmtInputFocused,
            isAmtChangedAfterFocus,
            returnAddress,
            submitted,
            isSendingCoins,
        } = this.state;

        const {
            coinDepositAddress = '',
        } = this.props;

        return (
            <InputOuterWrapper>
                <InputFieldWrapper>
                    <InputLabel>
                        <span>
                            {selectedCoin}
                            <FormattedMessage
                                id="deposit_view.label_deposit_address"
                                defaultMessage="Deposit Address"
                            />
                        </span>
                    </InputLabel>
                    {/*
                    <AvatarWrapper
                        className="pointer-disabled"
                    >
                        <UserAvatarComponent/>
                    </AvatarWrapper>
                    */}

                    <InputFields>
                        <Input
                            id="deposit-send-coin-my-address"
                            // className="pl-none"
                            value={coinDepositAddress}
                            readOnly
                        />
                    </InputFields>

                    <InputAddon>
                        <CopySmallIcon
                            id="deposit-send-coin-copy-my-address"
                            data-clipboard-target="#deposit-send-coin-my-address"
                        />
                    </InputAddon>
                </InputFieldWrapper>

                <InputFieldWrapper>
                    <InputLabel>
                        <span>
                            {selectedCoin}
                            <FormattedMessage
                                id="deposit_view.label_return_address"
                                defaultMessage="Return Address"
                            />
                        </span>
                    </InputLabel>

                    {/*
                    <AvatarWrapper>
                        To
                    </AvatarWrapper>
                    */}
                    <InputFields
                        className={isSendingCoins ? 'pointer-disabled' : ''}
                        innerRef={ref => {
                            this.wrapperRef = ref;
                        }}
                    >
                        <Input
                            // className="pl-none"
                            style={{ flex: 6 }}
                            value={returnAddress}
                            readOnly={isSendingCoins}
                            onChange={this.handleChangeReturnAddress}
                            id="return-address2"
                        />

                        {/*
                        <Input
                            className="pl-none"
                            style={{ flex: 4 }}
                            innerRef={ref => {
                                this.amountInput = ref;
                            }}
                            value={isAmtInputFocused ? isAmtChangedAfterFocus ? amount : '' : customDigitFormat(amount)}
                            readOnly={isSendingCoins}
                            onChange={(e) => this.handleAmountChange(e.target.value)}
                            onFocus={this.handleAmtInputFocus}
                            onBlur={this.handleAmtInputBlur}
                            textAlign="right"
                        />
                        */}

                        {/*
                        <SliderInput
                            value={amount}
                            currentValue={unifyDigitString(price * amount)}
                            max={amountMax}
                            readOnly={false}
                            onChange={e => this.handleAmountChange(e.target.value)}
                        />
                        */}
                    </InputFields>

                    <InputAddon
                        onClick={this.handleSendCoin}
                        disabled={submitted}
                    >
                        {submitted
                            ? (<CheckIcon/>)
                            : (
                                isSendingCoins
                                    ? (<DataLoader width={40} height={40}/>)
                                    : (<SendIcon/>)
                            )
                        }
                    </InputAddon>
                </InputFieldWrapper>
            </InputOuterWrapper>
        );
    }
}

const withStore = compose(
    inject(
        STORE_KEYS.YOURACCOUNTSTORE,
        STORE_KEYS.TELEGRAMSTORE,
        STORE_KEYS.COINTRANSFERSTORE,
        STORE_KEYS.CONVERTSTORE,
    ),
    observer,
    withProps(
        ({
            [STORE_KEYS.YOURACCOUNTSTORE]: {
                PortfolioData,
                portfolioData,
            },
            [STORE_KEYS.TELEGRAMSTORE]: {
                isLoggedIn,
            },
            [STORE_KEYS.COINTRANSFERSTORE]: {
                withdrawalRequestWith,
            },
            [STORE_KEYS.CONVERTSTORE]: {
                showConvertState,
            },
        }) => ({
            PortfolioData,
            portfolioData,
            isLoggedIn,
            withdrawalRequestWith,
            showConvertState,
        })
    )
);

export default withStore(SendCoinPartial);
