import React from 'react';
import { inject, observer } from 'mobx-react';
import { FormattedMessage } from 'react-intl';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { AutoSizer, Column, Table } from 'react-virtualized';
import moment from 'moment';

import {
    format2DigitString,
    getItemColor
} from '../../../utils';
import { STORE_KEYS } from '../../../stores';

import DataLoader from '../../../components-generic/DataLoader';
import TouchBlocker from '../../../components-generic/TouchBlocker';

import {
    Wrapper,
    HeaderWrapper,
    HeaderRightBtnSvg,
    ContentWrapper,
    AmountWrapper,
    InviteBtn,
    HeaderText,
    AvatarWrapper,
    DefaultAvatar,
    HistoryCell,
    ImageWrapper,
    List,
    LoadingWrapper,
    NoDataText,
    TableWrapper,
    TransactionAmount,
    TransactionDate,
    TransactionInfo,
    TransactionTitle,
    SettingsWrapper,
    SettingsItem,
    CloseIcon
} from './Components';

function ucfirst(string) {
    try {
        return string.charAt(0).toUpperCase() + string.slice(1);
    } catch (e) {
        return '';
    }
}

class HistoryViewV2 extends React.Component {
    state = {
        scrollTop: 0,
    };

    mounted = true;
    scrollRef = null;
    psRef = null;
    tableRef = null;

    componentDidMount() {
        const {
            [STORE_KEYS.SENDCOINSTORE]: {
                requestTransferHistory,
            },
        } = this.props;

        requestTransferHistory();
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.isVisible === true && this.props.isVisible === false) {
            const {
                [STORE_KEYS.SENDCOINSTORE]: {
                    requestTransferHistory,
                },
            } = this.props;

            requestTransferHistory()
                .then(res => {
                    if (this && this.mounted && this.psRef) {
                        this.psRef.updateScroll();
                    }
                });
        }
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    handleScroll = ({ scrollTop }) => {
        this.setState({ scrollTop });
    };

    handleSwipe = (direction) => {
        if (this.props.onSwipe) {
            const reach = (this.psRef && this.psRef._ps && this.psRef._ps.reach) || null;
            switch (direction) {
            case 'up':
                if (!reach || reach.y === 'end') {
                    this.props.onSwipe('up');
                }
                break;
            case 'down':
                if (!reach || reach.y === 'start') {
                    this.props.onSwipe('down');
                }
                break;
            case 'left':
                break;
            case 'right':
                break;
            default:
            }
        }
    };

    handleClose = () => {
        if (this.props.onClose) {
            this.props.onClose();
        }
    };

    historyCellRenderer = ({ rowData }) => {
        const {
            [STORE_KEYS.TELEGRAMSTORE]: {
                loggedInUser,
            },
            [STORE_KEYS.SENDCOINSTORE]: {
                requestCancelTransferRequest,
            },
            [STORE_KEYS.SETTINGSSTORE]: {
                getLocalFiatPrice, getCoinPrice, getFiatSymbolFromName, defaultFiat,
            },
        } = this.props;

        const {
            Amount,
            Coin,
            CreatedAt,
            DefaultCurrency,
            Executor,
            Initiator,
            IsMemberSender,
            Status, // canceled, claimed, pending
            TrId,
        } = rowData;

        let executorFullName = '';
        let executorUserName = '';
        let initiatorFullName = '';
        let initiatorUserName = '';

        if (Executor) {
            executorFullName = Executor.FullName || '';
            executorUserName = Executor.Username || '';
        }

        if (Initiator) {
            initiatorFullName = Initiator.FullName || '';
            initiatorUserName = Initiator.Username || '';
        }

        let userName = (loggedInUser && loggedInUser.username) || '';
        let isSend = false;

        let displayFullName = '';
        let displayUserName = '';
        let displayAvatar = '';

        if (userName === initiatorUserName) {
            displayFullName = executorFullName;
            displayUserName = executorUserName;
            displayAvatar = `https://t.me/i/userpic/320/${executorUserName}.jpg`;
        } else {
            displayFullName = initiatorFullName;
            displayUserName = initiatorUserName;
            displayAvatar = `https://t.me/i/userpic/320/${initiatorUserName}.jpg`;
        }
        switch (Status) {
        case 'pending':
            displayFullName = 'QR Code';
            displayAvatar = '/img/icon_qr.png';
            break;
        case 'canceled':
            displayFullName = 'QR Code';
            displayAvatar = '/img/icon_qr.png';
            break;
        default:
            break;
        }

        let createdAt = CreatedAt;

        try {
            const createdAtMoment = moment(CreatedAt);
            if (createdAtMoment.isValid()) {
                // createdAt = createdAtMoment.fromNow();
                createdAt = createdAtMoment.format('lll');
            }
        } catch (e) {
            console.log(e);
        }

        let labelAmount = '';
        if (defaultFiat !== '') {
            labelAmount = getFiatSymbolFromName(defaultFiat) + format2DigitString(getLocalFiatPrice(getCoinPrice(Coin.toUpperCase()) * Amount, defaultFiat));
        } else {
            labelAmount = format2DigitString(Amount) + ' ' + Coin.toUpperCase();
        }

        return (
            <HistoryCell>
                <ImageWrapper>
                    <AvatarWrapper>
                        <DefaultAvatar color={getItemColor(displayUserName).hexColor}>
                            {(displayFullName || ' ')[0].toUpperCase()}
                        </DefaultAvatar>
                        <img
                            alt=""
                            className="user-pic"
                            src={displayAvatar}
                        />
                    </AvatarWrapper>
                </ImageWrapper>

                <TransactionInfo>
                    <TransactionTitle>
                        <span>{displayFullName}</span>
                        <TransactionAmount className={Status === 'canceled' ? 'clr-red' : 'clr-green'} isCanceled={Status === 'canceled'}>
                            {IsMemberSender ? '-' : '+'} {labelAmount}
                        </TransactionAmount>
                    </TransactionTitle>

                    <TransactionDate isPending={Status === 'pending'} isCanceled={Status === 'canceled'}>
                        <span>
                            {createdAt}
                        </span>
                        <button onClick={() => {
                            requestCancelTransferRequest(TrId || '');
                        }}
                        >
                            <FormattedMessage
                                id="button.cancel"
                                defaultMessage="Cancel"
                            />
                        </button>
                        <span className="status">
                            {ucfirst(Status)}
                        </span>
                    </TransactionDate>
                </TransactionInfo>
            </HistoryCell>
        );
    };

    render() {
        const {
            scrollTop,
        } = this.state;

        const {
            [STORE_KEYS.TELEGRAMSTORE]: {
                isLoggedIn,
            },
            [STORE_KEYS.SENDCOINSTORE]: {
                transferHistory: tableData,
                isFetchingTransferHistory,
            },
        } = this.props;

        return (
            <Wrapper>
                <TouchBlocker onSwipe={this.handleSwipe} isBlockMouseScroll>
                    <ContentWrapper>

                        <HeaderWrapper>
                            <CloseIcon onClick={this.handleClose} />
                        </HeaderWrapper>

                        <InviteBtn>
                            <FormattedMessage
                                id="pay_app.history_view_v2.label_invite_friend"
                                defaultMessage="Invite Friends, Get $5"
                            />
                        </InviteBtn>

                        <List>
                            {isLoggedIn
                                ? (
                                    isFetchingTransferHistory
                                        ? (
                                            <LoadingWrapper>
                                                <DataLoader width={120} height={120} />
                                            </LoadingWrapper>
                                        )
                                        : (
                                            (tableData && tableData.length)
                                                ? (
                                                    <AutoSizer>
                                                        {({ width, height }) => (
                                                            <TableWrapper width={width} height={height}>
                                                                <PerfectScrollbar
                                                                    containerRef={ref => {
                                                                        this.scrollRef = ref;
                                                                    }}
                                                                    ref={ref => {
                                                                        this.psRef = ref;
                                                                    }}
                                                                    option={{
                                                                        suppressScrollX: true,
                                                                        minScrollbarLength: 40,
                                                                        maxScrollbarLength: 60,
                                                                    }}
                                                                    onScrollY={this.handleScroll}
                                                                >
                                                                    <Table
                                                                        ref={ref => {
                                                                            this.tableRef = ref;
                                                                        }}
                                                                        autoHeight
                                                                        width={width}
                                                                        height={height}
                                                                        disableHeader
                                                                        rowCount={tableData.length}
                                                                        rowGetter={({ index }) => tableData[index]}
                                                                        rowHeight={80}
                                                                        overscanRowCount={0}
                                                                        scrollTop={scrollTop}
                                                                    >
                                                                        <Column
                                                                            width={width}
                                                                            dataKey="History"
                                                                            cellRenderer={this.historyCellRenderer}
                                                                        >
                                                                        </Column>
                                                                    </Table>
                                                                </PerfectScrollbar>
                                                            </TableWrapper>
                                                        )}
                                                    </AutoSizer>
                                                )
                                                : (
                                                    <NoDataText>
                                                        <FormattedMessage
                                                            id="pay_app.history_view_v2.label_no_transaction"
                                                            defaultMessage="No Transaction Yet"
                                                        />
                                                    </NoDataText>
                                                )
                                        )
                                )
                                : (
                                    <NoDataText>
                                        <FormattedMessage
                                            id="pay_app.history_view_v2.label_login"
                                            defaultMessage="Please login to see transactions"
                                        />
                                    </NoDataText>
                                )
                            }
                        </List>

                        <SettingsWrapper>
                            <SettingsItem>
                                <FormattedMessage
                                    id="settings.label_settings"
                                    defaultMessage="Settings"
                                />
                            </SettingsItem>
                        </SettingsWrapper>
                    </ContentWrapper>
                </TouchBlocker>
            </Wrapper>
        );
    }
}

export default inject(
    STORE_KEYS.TELEGRAMSTORE,
    STORE_KEYS.SENDCOINSTORE,
    STORE_KEYS.SETTINGSSTORE,
)(observer(HistoryViewV2));
