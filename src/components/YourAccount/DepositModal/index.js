import React, { Component } from 'react';
import { compose, withProps } from 'recompose';
import { inject, observer } from 'mobx-react';
import { FormattedMessage } from 'react-intl';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { find, sortBy } from 'lodash';
import {
    AutoSizer,
    Table,
    Column
} from 'react-virtualized';

import { STORE_KEYS } from '../../../stores';
import QR from './QR';
import InputField from './InputField';
import ToggleableList from './ToggleableList';
import AddFundsModal from '../AddFundsModal2';
import { mockData } from './mock';
import { format2DigitString, format7DigitString, highlightSearchDom, customDigitFormat } from '../../../utils';

import {
    Wrapper, DepositAddress, DropdownWrapper, Dropdown, StyleWrapper,
    Item, Logo, Name, InfoIcon, Option, HardwareKeyWrapper, PaymentWrapper,
    AmountInputsWrapper
} from './Components';

import {
    InputField as InputFieldTextOnly
} from '../AddFundsModal2/InputField';

import imgYubiKey from './icons/yubi-key.svg';
import imgVisa from './icons/visa.png';
import ChannelAvatar from '../../Telegram/Channels/ChannelAvatar';
import CoinIconStep2 from '../../CoinPairSearchV2/CoinIconStep2';

const addFundsModal = (Modal, portal, additionalVerticalSpace, coin, price) => () => Modal({
    portal,
    additionalVerticalSpace,
    ModalComponentFn: () => <AddFundsModal
        heading1={(
            <div className="d-flex flex-column align-items-center justify-content-center">
                <span>$1,000 PAYMENT</span>
                <span>with Credit Card</span>
            </div>
        )}
        heading2={(
            <span>({price > 0 ? format7DigitString(1000 / price) : 0} {coin})</span>
        )}
    />,
});

class DepositModal extends Component {
    constructor(props) {
        super(props);

        let price = 0;

        if (this.props.CoinsForWallet && this.props.CoinsForWallet.length) {
            const priceObject = find(this.props.CoinsForWallet, { coin: this.props.coin });

            if (priceObject && priceObject.price) {
                price = priceObject.price;
            }
        }

        this.state = {
            depositAddress: '3HZV4FLuvJjoEgsAVbrcLAuWt691s2gSFu',
            returnAddress: '',
            copied: false,
            submitted: false,
            coin: 'BTC',
            price,
            custodian: '',
            stableCoin: 'USDT',
            minimum: 0.08936524,
            opened: false,
            showAll: false,
            data: mockData,
            scrollTop: 0,
            dropdownOpened: false,
            exchange: null,
            amount: 0,
            receiverTelegramUser: null,
            isSendingCoins: false,
            coinSentSuccessfully: false,
        };
    }

    componentDidMount() {
        const coinAddressStore = this.props[STORE_KEYS.COINADDRESSSTORE];
        coinAddressStore.createDepositAddress(this.props.coin);

        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside = event => {
        if (this.dropdownRef && this.state.dropdownOpened && !this.dropdownRef.contains(event.target)) {
            this.setState({
                dropdownOpened: false,
                scrollTop: 0,
            });
        }
    };

    toggleDropdown = (value) => {
        this.setState(prevState => ({
            dropdownOpened: (typeof value === 'boolean') ? value : !prevState.dropdownOpened,
            scrollTop: 0,
        }));
    };

    changeDepositAddress = ({ target: { value } }) => {
        this.setState({
            depositAddress: value,
            copied: false,
        });
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

    changeReturnAddress = ({ target: { value } }) => {
        this.setState({
            returnAddress: value,
            submitted: false,
        });
    };

    copy = () => {
        this.setState({
            copied: true,
        });
    };

    handleOpen = element => {
        this.setState({
            opened: element,
        });
    };

    handleClose = () => {
        this.setState({
            opened: false,
        });
    };

    handleSelectCustodian = custodian => {
        this.setState({ custodian });
    };

    handleSelectStableCoin = stableCoin => {
        this.setState({ stableCoin });
    };

    changeShow = () => {
        this.setState(prevState => {
            return {
                showAll: !prevState.showAll,
            };
        });
    };

    handleScroll = ({ scrollTop }) => {
        this.setState({ scrollTop });
    };

    selectExchange = exchange => {
        this.setState({
            exchange,
            dropdownOpened: false,
        });
    };

    handleChangeAmount = amount => {
        this.setState({
            amount,
        });
    };

    selectTelegramUser = telegramUser => {
        this.setState({
            receiverTelegramUser: telegramUser,
            returnAddress: (telegramUser && telegramUser.name) || '',
            submitted: false,
        });

        this.toggleDropdown();
    };

    handleSendCoin = () => {
        const { amount, receiverTelegramUser, submitted } = this.state;
        const { coin } = this.props;

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
            })
            .catch(() => {
                this.setState({
                    isSendingCoins: false,
                });
            });
    };

    exchangeCellRenderer = ({ rowData }) => (
        <Item onClick={() => this.selectExchange(rowData.name)}>
            <Logo src={`/img/exchange/${rowData.icon}`} alt=""/>
            {rowData.name === 'Custom' ? (
                <Name selected={rowData.name === this.state.exchange} isCustom={true}>
                    <span>{rowData.name} {rowData.location !== '' ? '(' + rowData.location + ')' : ''}</span>
                    <InfoIcon selected={rowData.name === this.state.exchange}/>
                </Name>
            ) : (
                <Name selected={rowData.name === this.state.exchange} isCustom={false}>
                    {rowData.name} {rowData.location !== '' ? '(' + rowData.location + ')' : ''}
                </Name>
            )}
            <Option selected={rowData.name === this.state.exchange}/>
        </Item>
    );

    telegramUsersCellRenderer = ({ rowData }) => {
        const isSelected = this.state.receiverTelegramUser && (rowData.sysId === this.state.receiverTelegramUser.sysId);
        return (
            <Item onClick={() => this.selectTelegramUser(rowData)}>
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

    handleInputFocus = () => {
        this.setState({
            amount: '',
        });
    };

    handleInputBlur = (e) => {
        if (!e.target.value) {
            this.setState({
                amount: 0,
            });
        }
    };

    render() {
        const {
            depositAddress,
            returnAddress,
            copied,
            submitted,
            coin,
            price,
            custodian,
            stableCoin,
            minimum,
            opened,
            showAll,
            data,
            scrollTop,
            dropdownOpened,
            amount,
        } = this.state;

        const {
            Modal,
            viewMode,
            coinDepositAddress,
            coin: coinFromProps,
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

        const coinName = String(coinFromProps).replace('F:', '');
        const priceString = price !== 0
            ? `${format7DigitString(1000 / price)}`
            : '';

        return (
            <Wrapper submitted={submitted}>
                <InputField
                    id="deposit_address"
                    value={coinDepositAddress}
                    // changeValue={this.changeDepositAddress}
                    copied={copied}
                    copy={this.copy}
                    label={`Your ${coinName} Address`}
                    isDeposit={true}
                />
                <QR value={coinDepositAddress}/>

                {/* <DepositAddress><Textfit mode="single">{coinDepositAddress}</Textfit></DepositAddress> */}

                <AmountInputsWrapper>
                    <div
                        className="horizontal-input-fields"
                    >
                        <InputFieldTextOnly
                            label={`Amount ${coinFromProps.toUpperCase()}`}
                            placeholder=""
                            value={amount}
                            readOnly={false}
                            changeValue={this.handleChangeAmount}
                            handleInputFocus={this.handleInputFocus}
                            handleInputBlur={this.handleInputBlur}
                            type="number"
                        />
                        <div
                            className="coinIconWrapper"
                        >
                            <CoinIconStep2
                                value={coinFromProps.toUpperCase()}
                                onClick={null}
                            />
                        </div>
                    </div>

                    <div
                        className="horizontal-input-fields"
                    >
                        <InputFieldTextOnly
                            label="Amount USD"
                            placeholder=""
                            value={'$' + format7DigitString(amount * price)}
                            readOnly={true}
                        />
                        <div
                            className="coinIconWrapper"
                        >
                            <CoinIconStep2
                                value="USDT"
                                onClick={null}
                            />
                        </div>
                    </div>
                </AmountInputsWrapper>

                <DropdownWrapper innerRef={ref => { this.dropdownRef = ref; }}>
                    <InputField
                        id="withdrawl_address"
                        placeholder=""
                        value={returnAddress}
                        changeValue={this.changeReturnAddress}
                        submitted={submitted}
                        submit={this.handleSendCoin}
                        label={`Send to ${coinFromProps.toUpperCase()} Address`}
                        Modal={Modal}
                        coin={coinFromProps}
                        depositAddress={depositAddress}
                        dropdownOpened={dropdownOpened}
                        toggleDropdown={this.toggleDropdown}
                        isDeposit={false}
                    />

                    <PaymentWrapper>
                        <div
                            className="buy-with-visa-button"
                            onClick={addFundsModal(Modal, 'graph-chart-parent', true, coinFromProps, price)}
                        >
                            <span>Buy Crypto</span>
                            <img src={imgVisa} height={21} alt=""/>
                        </div>
                    </PaymentWrapper>

                    {dropdownOpened && (
                        <Dropdown>
                            <AutoSizer>
                                {({ width, height }) => {
                                    return (
                                        <StyleWrapper width={width} height={height} length={data.length}>
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
                                                    rowHeight={40}
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
                </DropdownWrapper>

                {/* <SelectField */}
                {/* coin={coinFromProps} */}
                {/* Modal={Modal} */}
                {/* handleOpen={this.handleOpen} */}
                {/* /> */}

                {opened && (
                    <ToggleableList
                        opened={opened}
                        close={this.handleClose}
                        coin={coinFromProps}
                        custodian={custodian}
                        onCustodianChange={this.handleSelectCustodian}
                        stableCoin={stableCoin}
                        onStableCoinChange={this.handleSelectStableCoin}
                        showAll={showAll}
                        changeShow={this.changeShow}
                    />
                )}

                {/*
                {submitted && (
                    <HardwareKeyWrapper>
                        <img src={imgYubiKey} alt=""/>
                        <p>Please insert your Hardware Key now</p>
                    </HardwareKeyWrapper>
                )}
                */}
            </Wrapper>
        );
    }
}

const enchanced = compose(
    inject(
        STORE_KEYS.MODALSTORE,
        STORE_KEYS.VIEWMODESTORE,
        STORE_KEYS.COINADDRESSSTORE,
        STORE_KEYS.YOURACCOUNTSTORE,
        STORE_KEYS.TELEGRAMSTORE
    ),
    observer,
    withProps(
        ({
            [STORE_KEYS.MODALSTORE]: {
                Modal,
            },
            [STORE_KEYS.VIEWMODESTORE]: {
                viewMode,
            },
            [STORE_KEYS.COINADDRESSSTORE]: {
                coinDepositAddress,
            },
            [STORE_KEYS.YOURACCOUNTSTORE]: {
                CoinsForWallet,
            },
            [STORE_KEYS.TELEGRAMSTORE]: {
                telDialogs,
                sendWalletMsg,
            },
        }) => ({
            Modal,
            viewMode,
            coinDepositAddress,
            CoinsForWallet,
            telDialogs,
            sendWalletMsg,
        })
    )
);

export default enchanced(DepositModal);
