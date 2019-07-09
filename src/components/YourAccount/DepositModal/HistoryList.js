import React from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import moment from 'moment';

import { getHistoryMock } from './mock';
import { HistoryExchange, HistoryReceive, HistorySend } from './icons';
import { STORE_KEYS } from '../../../stores';
import { customDigitFormat } from '../../../utils';
import CoinIcon from '../../../components-generic/CoinIcon';
import PerfectSrollWrapper from '../../../components-generic/PerfectScrollWrapper';

const getIcon = type => {
    if (type === 'exchange') {
        return <HistoryExchange/>;
    }
    if (type === 'send') {
        return <HistorySend/>;
    }
    return <HistoryReceive/>;

};

const History = styled.div`
    position: relative;
    margin: 0;
    padding: 10px 30px 10px 15px;
    display: flex;
    align-items: center;
    font-size: 14px;
    line-height: 1.2;
    cursor: pointer;
    
    &:not(:first-child) {
        border-top: 1px solid ${props => props.theme.palette.depositToggleBorder};
    }
    
    &:hover {
        background-color: ${props => props.theme.palette.depositToggleHover};
        border-color: ${props => props.theme.palette.depositToggleHover};
        color: ${props => props.theme.palette.contrastText};
        
        .ml-2 {
            color: ${props => props.theme.palette.depositToggleText};
        }
    }
    
    &:active {
        background-color: ${props => props.theme.palette.depositActive};
        border-color: ${props => props.theme.palette.depositActive};
        color: ${props => props.theme.palette.contrastText};
        
        .ml-2 {
            color: ${props => props.theme.palette.contrastText} !important;
        }
    }
    
    * {
        flex-grow: 0;
        flex-shrink: 0;
    }
`;

const FullDate = styled.div`
    width: 50px;
    font-weight: 600;
`;

const IconWrapper = styled.div`
    width: 16px;
    height: 16px;
    margin-left: 4px;
    
    svg {
        width: 16px;
        height: 16px;
        fill: ${props => props.theme.palette.depositLink};
    }
`;

const Status = styled.div`
    width: calc(100% - 79px);
    margin-left: 12px;
    display: flex;
    align-items: center;
    font-weight: bold;
    
    .value {
        width: 50px;
    }
    
    .ml-2 {
        margin-left: 4px;
    }
    
    .light {
        font-weight: normal;
    }
    
    .flex-1 {
        flex: 1;
        text-overflow: ellipsis;
        overflow: hidden;
    }
`;

class HistoryList extends React.Component {
    componentDidMount() {
        const {
            coin,
            [STORE_KEYS.COINHISTORYSTORE]: coinHistoryStore,
        } = this.props;
        coinHistoryStore.getCoinHistory(coin);
    }

    getHistoryData = (history, coin) => {
        let historyData = [];
        /**
         *  We will enable below codes after Backend is ready to use. 🤨
         */
        // for (let i = 0; i < history.length; i++) {
        //     let hType = '';
        //     switch (history[i].order) {
        //     case 'deposit':
        //         hType = 'receive';
        //         break;
        //     case 'withdraw':
        //         hType = 'send';
        //         break;
        //     case 'order':
        //         hType = 'exchange';
        //         break;
        //     case 'telegram_transfer':
        //         hType = 'send';
        //         break;
        //     default:
        //         hType = 'exchange';
        //         break;
        //     }
        //
        //     let date = moment(history[i].created_at || '');
        //     let destination = (history[i].destination || '').toUpperCase();
        //     let side = history[i].side || '';
        //
        //     historyData.push({
        //         month: date.format('MMM') || '',
        //         date: date.format('D') || '',
        //         type: hType,
        //         value: Number(history[i].amount || ''),
        //         coin: coin.toUpperCase(),
        //         status: `${side} ${destination}`,
        //     });
        // }
        return historyData;
    };

    render() {
        const {
            coin,
            [STORE_KEYS.COINHISTORYSTORE]: coinHistoryStore,
        } = this.props;

        const historyData = this.getHistoryData(coinHistoryStore.coinHistory, coin);
        // const historyData = getHistoryMock(coin);

        return (
            <PerfectSrollWrapper>
                {historyData.map((data, index) => {
                    const {
                        month, date, type, value,
                    } = data;
                    const statuses = data.status.split(' ');

                    return (
                        <History key={index}>
                            <FullDate>
                                {month} {date}
                            </FullDate>

                            <IconWrapper>{getIcon(type)}</IconWrapper>

                            <Status>
                                <span className="value">{customDigitFormat(value)}</span>
                                <CoinIcon value={data.coin} size={14}/>
                                <span className="ml-2 light">{statuses[0]}</span>
                                {statuses[2] && <span className="ml-2">{customDigitFormat(statuses[2])}</span>}
                                {statuses[1].includes('0x')
                                    ? <span className="ml-2 flex-1">{statuses[1]}</span>
                                    : (statuses[1].includes('@')
                                        ? <span className="ml-2 flex-1">{statuses[1].split('@')}</span>
                                        : <CoinIcon value={statuses[1]} size={14}/>
                                    )
                                }
                            </Status>
                        </History>
                    );
                })}
            </PerfectSrollWrapper>
        );
    }
}

export default inject(
    STORE_KEYS.COINHISTORYSTORE,
)(observer(HistoryList));
