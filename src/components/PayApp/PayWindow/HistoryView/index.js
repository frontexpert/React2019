import React, { Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { FormattedMessage } from 'react-intl';
import { Column, Table, AutoSizer } from 'react-virtualized';
import PerfectScrollbar from 'react-perfect-scrollbar';
import moment from 'moment';

import {
    Wrapper,
    Header,
    Content,
    UserInfoWrapper,
    ImageWrapper,
    AvatarWrapper,
    DefaultAvatar,
    TotalPrice,
    List,
    DepositBtn,
    TableWrapper,
    HistoryCell,
    NoDataText,
    AvatarImage,
    TransactionInfo,
    TransactionTitle,
    TransactionDate,
    TransactionAmount,
    LoadingWrapper
} from './Components';

import { viewModeKeys } from '../../../../stores/ViewModeStore';
import {
    getItemColor,
    format2DigitString,
    formatNegativeNumberSecond,
    format7DigitString
} from '../../../../utils/index';
import { STORE_KEYS } from '../../../../stores/index';
import DataLoader from '../../../../components-generic/DataLoader/index';
import { history } from './mockData';
import COIN_DATA_MAP from '../../../../mock/coin-data-map';

const CoinIcon = ({ value }) =>
    value === 'USDT'
        ? '$'
        : (
            (COIN_DATA_MAP[value] && COIN_DATA_MAP[value].file)
                ? (
                    <div
                        className="coin-icon"
                        style={{
                            background: COIN_DATA_MAP[value].file.indexOf('svg') < 0
                                ? `url('img/icons-coin/${COIN_DATA_MAP[value].file}') no-repeat`
                                : `url('img/sprite-coins-view.svg#coin-${value.toLowerCase()}') no-repeat`,
                        }}
                    >
                    </div>
                )
                : (
                    <div className="no-icon"/>
                )
        );

class HistoryView extends React.Component {
    state = {
        tableData: history,
        scrollTop: 0,
    };

    scrollRef = null;
    tableRef = null;

    componentDidMount() {
        const {
            [STORE_KEYS.SENDCOINSTORE]: {
                requestTransferHistory,
            },
        } = this.props;

        requestTransferHistory();
    }

    handleScroll = ({ scrollTop }) => {
        this.setState({ scrollTop });
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

        if (Executor && Executor !== null) {
            executorFullName = Executor.FullName || '';
            executorUserName = Executor.Username || '';
        }

        if (Initiator && Initiator !== null) {
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

                    <TransactionDate isPending={Status === 'pending'}>
                        <span>
                            {createdAt}
                        </span>
                        <button onClick={() => {
                            requestCancelTransferRequest(TrId || '');
                        }}
                        >
                            <FormattedMessage
                                id="button.cancel"
                                defaultMessage="CANCEL"
                            />
                        </button>
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
            [STORE_KEYS.VIEWMODESTORE]: {
                setViewMode,
            },
            [STORE_KEYS.TELEGRAMSTORE]: {
                isLoggedIn,
                loggedInUser,
            },
            [STORE_KEYS.YOURACCOUNTSTORE]: {
                PortfolioData,
            },
            [STORE_KEYS.SENDCOINSTORE]: {
                transferHistory: tableData,
                isFetchingTransferHistory,
            },
        } = this.props;

        let symbolName = '';
        let userName = '';
        let fullName = '';

        if (isLoggedIn && loggedInUser) {
            const {
                firstname,
                lastname,
            } = loggedInUser;

            if (firstname && firstname.length > 0) {
                symbolName = firstname[0];
            }

            if (lastname && lastname.length > 0) {
                symbolName += lastname[0];
            }

            userName = loggedInUser.username;
            fullName = firstname + ' ' + lastname;
        }

        return (
            <Wrapper>
                <Content>
                    <List>
                        {isLoggedIn
                            ? (
                                isFetchingTransferHistory
                                    ? (
                                        <LoadingWrapper>
                                            <DataLoader width={120} height={120}/>
                                        </LoadingWrapper>
                                    )
                                    : (
                                        (tableData && tableData.length)
                                            ? (
                                                <AutoSizer>
                                                    {({ width, height }) => (
                                                        <TableWrapper width={width} height={height}>
                                                            <PerfectScrollbar
                                                                containerRef={ref => { this.scrollRef = ref; }}
                                                                option={{
                                                                    suppressScrollX: true,
                                                                    minScrollbarLength: 40,
                                                                    maxScrollbarLength: 60,
                                                                }}
                                                                onScrollY={this.handleScroll}
                                                            >
                                                                <Table
                                                                    ref={ref => { this.tableRef = ref; }}
                                                                    autoHeight
                                                                    width={width}
                                                                    height={height}
                                                                    disableHeader
                                                                    rowCount={tableData.length}
                                                                    rowGetter={({ index }) => tableData[index]}
                                                                    rowHeight={window.innerWidth < 768 ? 120 : 111}
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
                                                        id="pay_app.history_view.label_no_transaction_history"
                                                        defaultMessage="No transaction history to show"
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
                </Content>
            </Wrapper>
        );
    }
}

export default inject(
    STORE_KEYS.TELEGRAMSTORE,
    STORE_KEYS.VIEWMODESTORE,
    STORE_KEYS.YOURACCOUNTSTORE,
    STORE_KEYS.SENDCOINSTORE,
    STORE_KEYS.SETTINGSSTORE,
)(observer(HistoryView));
