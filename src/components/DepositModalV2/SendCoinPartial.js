import React from 'react';
import styled from 'styled-components';
import { compose, withProps } from 'recompose';
import { inject, observer } from 'mobx-react';
import { sortBy } from 'lodash';
import { AutoSizer, Column, Table } from 'react-virtualized';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { STORE_KEYS } from '../../stores';

import {
    Input,
    InputAddon,
    InputFieldWrapper,
    InputOuterWrapper,
    Label
} from './InputComponents';
import { CopyIcon, SendIcon, CheckIcon } from './Icons';
import SliderInput from '../../components-generic/SliderInputThumb';
import { valueNormalized } from '../../stores/utils/OrderEntryUtils';
import {
    customDigitFormat,
    format2DigitString,
    format7DigitString,
    highlightSearchDom,
    unifyDigitString
} from '../../utils';

import {
    Dropdown,
    Item,
    Name,
    Option,
    StyleWrapper,
    SuccessfulIcon
} from './SendCoinsPartialComponents';
import ChannelAvatar from '../Telegram/Channels/ChannelAvatar';
import DataLoader from '../../components-generic/DataLoader';

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

class SendCoinPartial extends React.Component {
    state = {
        selectedCoin: '',
        coinsInWallet: [],

        amount: 0,
        amountMax: 0,
        price: 0,

        isOpened: false,

        isAmtInputFocused: false,
        isAmtChangedAfterFocus: false,

        returnAddress: '',
        receiverTelegramUser: null,
        isSendingCoins: false,
        submitted: false,
        scrollTop: 0,
    };

    wrapperRef = null;
    amountInput = null;

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.selectedCoin !== nextProps.selectedCoin) {
            let amountMax = 0;
            let amount = 0;
            let price = 0;

            for (let i = 0; i < nextProps.PortfolioData.length; i++) {
                if (nextProps.PortfolioData[i].Coin === nextProps.selectedCoin) {
                    amountMax = nextProps.PortfolioData[i].Position || 0;
                    amount = Math.min(nextProps.PortfolioData[i].Position, 1) || 0;
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

    toggleDropDown = (isOpened) => {
        this.setState(prevState => ({
            isOpened: (typeof isOpened === 'boolean') ? isOpened : !prevState.isOpened,
        }));
    };

    handleClickOutside = event => {
        if (this.state.isOpened && this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.toggleDropDown();
        }
    };

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

    handleKeyDown = (e) => {
        if (e.key === 'Enter' && this.amountInput) {
            this.amountInput.blur();
        }
    };

    handleSelectTelegramUser = telegramUser => {
        this.setState({
            receiverTelegramUser: telegramUser,
            returnAddress: (telegramUser && telegramUser.name) || '',
            submitted: false,
        });

        this.toggleDropDown();
    };

    handleChangeReturnAddress = ({ target: { value } }) => {
        this.setState({
            returnAddress: value,
            submitted: false,
        });
    };

    handleScroll = ({ scrollTop }) => {
        this.setState({ scrollTop });
    };

    handleSendCoin = () => {
        const {
            amount,
            receiverTelegramUser,
            submitted,
            selectedCoin: coin,
        } = this.state;

        if (
            !(receiverTelegramUser && receiverTelegramUser.sysId && receiverTelegramUser.sysAccessHash)
            || amount <= 0
            || submitted
        ) {
            return;
        }

        const defaultURL = localStorage.getItem('defaultURL') || 'ourbit.io';
        const notification = `I just sent you ${customDigitFormat(amount)} ${coin.replace('F:', '')}. Please login into ${defaultURL} to receive it.`;

        this.setState({
            isSendingCoins: true,
        });

        this.props.sendWalletMsg(notification, coin, amount, {
            id: receiverTelegramUser.sysId,
            hash: receiverTelegramUser.sysAccessHash,
            name: receiverTelegramUser.name,
        })
            .then(res => {
                this.setState({
                    coinSentSuccessfully: res,
                    isSendingCoins: false,
                    submitted: true,
                    opened: false,
                });

                if (this.props.onSendFinish) {
                    clearTimeout(this.timerId);
                    this.timerId = setTimeout(this.props.onSendFinish, 1000);
                }
            })
            .catch(() => {
                this.setState({
                    isSendingCoins: false,
                });
            });
    };

    handlePaste = (e) => {
        if (!this.state.receiverTelegramUser) {
            let pasteText = document.querySelector('#return-address2');
            pasteText.focus();
            document.execCommand('paste');
        }
    };

    telegramUsersCellRenderer = ({ rowData }) => {
        const isSelected = this.state.receiverTelegramUser && (rowData.sysId === this.state.receiverTelegramUser.sysId);
        return (
            <Item onClick={() => this.handleSelectTelegramUser(rowData)}>
                <ChannelAvatar
                    name={rowData.name}
                    photo={rowData.photo}
                    color={rowData.color}
                />
                <Name
                    selected={isSelected}
                    isCustom={false}
                >
                    {highlightSearchDom(rowData.name, this.state.returnAddress)}
                </Name>
                <Option selected={isSelected}/>
            </Item>
        );
    };

    isSearched = (item, query) => {
        const lowerCaseQuery = query.toString().toLowerCase();
        let srcStr = item.toString().toLowerCase();

        if (!query) {
            return 999;
        }

        const srcContains = srcStr.includes(lowerCaseQuery);
        const srcWeight = Math.abs(lowerCaseQuery.length - srcStr.length);

        return srcContains ? srcWeight : -1;
    };

    render() {
        const {
            amount,
            amountMax,
            price,
            isAmtInputFocused,
            isAmtChangedAfterFocus,
            returnAddress,
            selectedCoin: coin,
            isOpened,
            scrollTop,
            receiverTelegramUser,
            isSendingCoins,
            submitted,
        } = this.state;

        const {
            telDialogs,
        } = this.props;

        let telUsers = telDialogs.reduce((acc, value) => {
            if (value.sendCoins) {
                const weight = this.isSearched(value.name, returnAddress);
                if (weight >= 0) {
                    acc.push({
                        weight,
                        value,
                    });
                }
            }
            return acc;
        }, []);

        telUsers = sortBy(telUsers, item => item.weight);

        return (
            <InputOuterWrapper>
                <Label>Send {customDigitFormat(amount)} {coin} to</Label>

                <InputFieldWrapper>

                    <InputFields
                        innerRef={ref => {
                            this.wrapperRef = ref;
                        }}
                    >
                        <Input
                            value={returnAddress}
                            onChange={this.handleChangeReturnAddress}
                            onFocus={() => this.toggleDropDown(true)}
                            id="return-address2"
                        />

                        {isOpened && (
                            <Dropdown>
                                <AutoSizer>
                                    {({ width, height }) => {
                                        return (
                                            <StyleWrapper width={width} height={height} length={telUsers.length}>
                                                <PerfectScrollbar
                                                    option={{
                                                        suppressScrollX: true,
                                                        minScrollbarLength: 50,
                                                    }}
                                                    onScrollY={this.handleScroll}
                                                >
                                                    <Table
                                                        autoHeight={true}
                                                        width={width}
                                                        height={height}
                                                        headerHeight={20}
                                                        disableHeader={true}
                                                        rowCount={telUsers.length}
                                                        rowGetter={({ index }) => telUsers[index].value}
                                                        rowHeight={60}
                                                        overscanRowCount={0}
                                                        scrollTop={scrollTop}
                                                    >
                                                        <Column
                                                            width={width}
                                                            dataKey="Exchange"
                                                            cellRenderer={this.telegramUsersCellRenderer}
                                                        />
                                                    </Table>
                                                </PerfectScrollbar>
                                            </StyleWrapper>
                                        );
                                    }}
                                </AutoSizer>
                            </Dropdown>
                        )}

                        <Input
                            innerRef={ref => {
                                this.amountInput = ref;
                            }}
                            value={isAmtInputFocused ? isAmtChangedAfterFocus ? amount : '' : customDigitFormat(amount)}
                            onChange={(e) => this.handleAmountChange(e.target.value)}
                            onFocus={this.handleAmtInputFocus}
                            onBlur={this.handleAmtInputBlur}
                            textAlign="right"
                            fontSize={40}
                        />

                        {!isOpened &&
                        <SliderInput
                            value={amount}
                            currentValue={unifyDigitString(price * amount)}
                            max={amountMax}
                            readOnly={false}
                            onChange={e => this.handleAmountChange(e.target.value)}
                        />
                        }
                    </InputFields>

                    <InputAddon
                        onClick={this.handlePaste}
                    >
                        {!!receiverTelegramUser
                            ? (
                                <ChannelAvatar
                                    name={receiverTelegramUser.name}
                                    photo={receiverTelegramUser.photo}
                                    color={receiverTelegramUser.color}
                                />
                            )
                            : <CopyIcon/>
                        }
                    </InputAddon>
                    <InputAddon
                        onClick={this.handleSendCoin}
                        disabled={submitted || isSendingCoins}
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
    inject(STORE_KEYS.MODALSTORE, STORE_KEYS.YOURACCOUNTSTORE, STORE_KEYS.TELEGRAMSTORE),
    observer,
    withProps(
        ({
            [STORE_KEYS.MODALSTORE]: {
                Modal,
                onClose,
            },
            [STORE_KEYS.YOURACCOUNTSTORE]: {
                PortfolioData,
                portfolioData,
            },
            [STORE_KEYS.TELEGRAMSTORE]: {
                sendWalletMsg,
                isLoggedIn,
                telDialogs,
            },
        }) => ({
            Modal,
            onClose,
            PortfolioData,
            portfolioData,
            sendWalletMsg,
            isLoggedIn,
            telDialogs,
        })
    )
);

export default withStore(SendCoinPartial);
