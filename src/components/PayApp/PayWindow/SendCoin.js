import React from 'react';
import ReactDOM from 'react-dom';
import { compose, withProps } from 'recompose';
import { inject, observer } from 'mobx-react';
import { sortBy } from 'lodash';
import { AutoSizer, Column, Table } from 'react-virtualized';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Manager, Popper, Reference } from 'react-popper';

import { valueNormalized } from '../../../stores/utils/OrderEntryUtils';
import { STORE_KEYS } from '../../../stores/index';
import { customDigitFormat, format2DigitString, highlightSearchDom } from '../../../utils/index';
import ChannelAvatar from '../../Telegram/Channels/ChannelAvatar';
import InputAmount from '../../../components-generic/InputAmount/index';

import {
    SendFormWrapper,
    InputAddress,
    InputAmountGroup,
    InputAmountAddon,
    Dropdown,
    Item,
    Name,
    Option,
    StyleWrapper,
    SendButton,
    CompleteIcon,
    SendButtonArrow
} from './SendCoinComponents';
import {
    SendIcon, CrossIcon
} from './icons/index';
import { CloseIcon } from '../../Telegram/Chat/Messages/MessageInput/icons/index';
import DataLoader from '../../../components-generic/DataLoader/index';

class SendCoin extends React.Component {
    wrapperRef = null;
    amountInputRef = null;
    sendButtonRef = null;
    addressInputRef = null;

    constructor(props) {
        super(props);

        this.state = {
            // amount: Math.min(this.props.amountMax, 1) || 0,
            amount: 0,

            isOpened: true,
            scrollTop: 0,

            isAmtInputFocused: false,
            isAmtChangedAfterFocus: false,

            receiverAddress: '',
            receiverTelegramUser: null,
            isSendingCoins: false,
            submitted: false,
        };
    }

    componentDidMount() {
        const {
            setSendFormState,
        } = this.props;
        setSendFormState(true);

        document.addEventListener('mousedown', this.handleClickOutside);
        if (this.addressInputRef) {
            this.addressInputRef.focus();
        }
    }

    componentWillUnmount() {
        const {
            setSendFormState,
        } = this.props;
        setSendFormState(false);

        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside = event => {
        if (
            (this.wrapperRef && !this.wrapperRef.contains(event.target))
            && (this.sendButtonRef && !this.sendButtonRef.contains(event.target))
        ) {
            if (this.state.isOpened) {
                this.toggleDropDown();
            } else {
                this.props.onClose();
            }
        }
    };

    toggleDropDown = (isOpened) => {
        this.setState(prevState => ({
            isOpened: (typeof isOpened === 'boolean') ? isOpened : !prevState.isOpened,
        }));
    };

    handleAmountChange = value => {
        const valueParsed = Number.parseFloat(value);
        if (valueParsed > this.props.amountMax) {
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
        if (e.key === 'Enter' && this.amountInputRef) {
            this.amountInputRef.blur();
        }
    };

    handleSelectTelegramUser = telegramUser => {
        this.setState({
            receiverTelegramUser: telegramUser,
            receiverAddress: (telegramUser && telegramUser.name) || '',
            submitted: false,
        });

        this.toggleDropDown();
    };

    handleChangeReceiverAddress = ({ target: { value } }) => {
        this.setState({
            receiverAddress: value,
            receiverTelegramUser: null,
            submitted: false,
        });
    };

    handleScroll = ({ scrollTop }) => {
        this.setState({ scrollTop });
    };

    handleSendCoin = () => {
        const {
            amount,
            receiverAddress,
            receiverTelegramUser,
            submitted,
        } = this.state;

        const {
            selectedCoin: coin,
            withdrawalRequestWith,
        } = this.props;

        if (amount <= 0 || submitted) {
            return;
        }

        if (receiverTelegramUser && receiverTelegramUser.sysId && receiverTelegramUser.sysAccessHash) {
            const defaultURL = localStorage.getItem('defaultURL') || 'ourbit.io';
            const notification = `I just sent you ${format2DigitString(amount)} ${coin.replace('F:', '')}. Please login into ${defaultURL} to receive it.`;

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

                    if (this.props.onClose) {
                        clearTimeout(this.timerId);
                        this.timerId = setTimeout(this.props.onClose, 200);
                    }
                })
                .catch(() => {
                    this.setState({
                        isSendingCoins: false,
                    });
                });
        } else if (receiverAddress) {
            withdrawalRequestWith(coin, amount, receiverAddress);

            this.setState({
                isSendingCoins: true,
            });

            setTimeout(() => {
                this.setState({
                    coinSentSuccessfully: true,
                    isSendingCoins: false,
                    submitted: true,
                    opened: false,
                });

                if (this.props.onClose) {
                    clearTimeout(this.timerId);
                    this.timerId = setTimeout(this.props.onClose, 1000);
                }
            }, 1000);
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
                    {highlightSearchDom(rowData.name, this.state.receiverAddress)}
                </Name>
                {/* <Option selected={isSelected}/> */}
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

            isAmtInputFocused,
            isAmtChangedAfterFocus,

            isOpened,
            scrollTop,

            receiverAddress,
            receiverTelegramUser,
            isSendingCoins,
            submitted,
        } = this.state;

        const {
            amountMax,
            selectedCoin: coin,
            telDialogs,
        } = this.props;

        let telUsers = telDialogs.reduce((acc, value) => {
            if (value.sendCoins) {
                const weight = this.isSearched(value.name, receiverAddress);
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
            <SendFormWrapper
                innerRef={ref => {
                    this.wrapperRef = ref;
                }}
            >
                <div
                    className="address-label"
                    onClick={() => {
                        if (receiverTelegramUser) {
                            this.handleChangeReceiverAddress({ target: { value: '' } });
                        }

                        this.toggleDropDown(true);
                    }}
                > To :
                </div>
                {receiverTelegramUser &&
                <ChannelAvatar
                    className="send-coin-avatar-2"
                    name={receiverTelegramUser.name}
                    photo={receiverTelegramUser.photo}
                    color={receiverTelegramUser.color}
                    onClick={() => {
                        if (receiverTelegramUser) {
                            this.handleChangeReceiverAddress({ target: { value: '' } });
                        }

                        this.toggleDropDown(true);
                    }}
                />
                }

                <InputAddress
                    className={receiverTelegramUser ? '' : 'is-address'}
                    value={receiverAddress}
                    placeholder="Name, Address"
                    onChange={this.handleChangeReceiverAddress}
                    onFocus={() => {
                        if (receiverTelegramUser) {
                            this.handleChangeReceiverAddress({ target: { value: '' } });
                        }

                        this.toggleDropDown(true);
                    }}
                    innerRef={ref => { this.addressInputRef = ref; }}
                    id="receiver-address"
                />

                {receiverTelegramUser &&
                <CrossIcon
                    onClick={() => {
                        this.handleChangeReceiverAddress({ target: { value: '' } });
                        this.toggleDropDown(false);
                    }}
                />
                }

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
                <Manager>
                    <Reference>
                        {({ ref }) => (
                            <InputAmountGroup
                                innerRef={ref}
                                onClick={() => {
                                    if (this.amountInputRef) {
                                        this.amountInputRef.focus();
                                    }
                                }}
                            >
                                <InputAmount
                                    innerRef={ref => {
                                        this.amountInputRef = ref;
                                    }}
                                    value={isAmtInputFocused ? isAmtChangedAfterFocus ? amount : '' : customDigitFormat(amount)}
                                    onChange={this.handleAmountChange}
                                    onFocus={this.handleAmtInputFocus}
                                    onBlur={this.handleAmtInputBlur}
                                />

                                <InputAmountAddon>
                                    {coin}
                                </InputAmountAddon>
                            </InputAmountGroup>
                        )}
                    </Reference>
                    {/* <Tooltip open={true} position="right" distance={-100}> */}
                    {ReactDOM.createPortal(
                        <Popper
                            placement="right"
                            modifiers={{
                                flip: { enabled: false },
                                offset: { enabled: true, offset: '0px,2px' },
                                preventOverflow: { enabled: false },
                                hide: { enabled: false },
                            }}
                            positionFixed
                        >
                            {({
                                ref,
                                style,
                                placement,
                                arrowProps,
                            }) => {
                                return (
                                    <div
                                        ref={(r) => {
                                            ref(r);
                                            this.sendButtonRef = r;
                                        }}
                                        style={{ ...style, zIndex: 999999 }}
                                        data-placement={placement}
                                        className="d-flex flex-row align-items-center justify-content-start"
                                    >
                                        <SendButtonArrow/>
                                        <SendButton
                                            className={isSendingCoins ? 'is-sending' : (submitted ? 'is-submitted' : '')}
                                            onClick={this.handleSendCoin}
                                            disabled={submitted || isSendingCoins}
                                        >
                                            {isSendingCoins
                                                ? (
                                                    <DataLoader/>
                                                )
                                                : submitted
                                                    ? <CompleteIcon/>
                                                    : <SendIcon/>
                                            }
                                        </SendButton>
                                        <div ref={arrowProps.ref} style={arrowProps.style}/>
                                    </div>
                                );
                            }}
                        </Popper>,
                        document.querySelector('#popper-send-coin')
                    )}
                </Manager>
                {/* </Tooltip> */}
            </SendFormWrapper>
        );
    }
}

const withStore = compose(
    inject(
        STORE_KEYS.TELEGRAMSTORE,
        STORE_KEYS.COINTRANSFERSTORE
    ),
    observer,
    withProps(
        ({
            [STORE_KEYS.TELEGRAMSTORE]: {
                sendWalletMsg,
                isLoggedIn,
                telDialogs,
            },
            [STORE_KEYS.COINTRANSFERSTORE]: {
                withdrawalRequestWith,
                DepositAddressRequest,
                TelegramIdRequest,
            },
        }) => ({
            sendWalletMsg,
            isLoggedIn,
            telDialogs,
            withdrawalRequestWith,
            DepositAddressRequest,
            TelegramIdRequest,
        })
    )
);

export default withStore(SendCoin);
