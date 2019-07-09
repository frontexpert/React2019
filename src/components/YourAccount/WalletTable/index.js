import React, { Fragment } from 'react';
import { Column, Table, AutoSizer } from 'react-virtualized';
import { inject, observer } from 'mobx-react';
import { compose, withProps } from 'recompose';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Tooltip } from 'react-tippy';

import { STORE_KEYS } from '../../../stores';
import COIN_DATA_MAP from '../../../mock/coin-data-map';
import DepositModal from '../DepositModal';
import GraphRow from './GraphRow';
import { customDigitFormat, formatStringMinMax, unifyDigitString } from '../../../utils';
import AddFundsModal from '../AddFundsModal2';
import CombinedBalanceModal from '../../CombinedBalanceModal';
import SmallLinks from './SmallLinks';
// import { CoinsConversionRate } from '../../../lib/bct-ws';
import {
    StyleWrapper,
    NameCell,
    PriceCell,
    MarketcapCell,
    VolumeCell,
    DepositCell,
    InputWrapper,
    SearchSvg,
    CloseSvg
} from './Components';

const CoinIcon = ({ value, disabled, isBCT }) => (COIN_DATA_MAP[value] && COIN_DATA_MAP[value].file && !isBCT)
    ? (
        <div
            className="exch-dropdown__icon coin-icon"
            style={{
                background: COIN_DATA_MAP[value].file.indexOf('svg') < 0 ? `url('img/icons-coin/${COIN_DATA_MAP[value].file}') no-repeat`
                    : `url('img/sprite-coins-view.svg#coin-${value.toLowerCase()}') no-repeat`,
                backgroundSize: '100% 100% !important',
                marginRight: '10px',
            }}
        >
            {/* {disabled && <div className="coin-icon-disabled"/>} */}
        </div>
    )
    : (
        <div className="no-icon"/>
    );

const cellToObservedCell = Cell => observer(({ marketDataMap, index }) => {
    return (
        <Fragment>
            {marketDataMap.has(index) && (
                <Cell data={marketDataMap.get(index)} index={index}/>
            )}
        </Fragment>
    );
});

export const ObservedCellRenderer = Cell => {
    const ObservedCell = cellToObservedCell(Cell);
    return ({ rowIndex: index, rowData: marketDataMap }) => {
        return (
            <ObservedCell
                index={index}
                marketDataMap={marketDataMap}
            />
        );
    };
};

const depositModal = (Modal, portal, coin, minimum) => () => Modal({
    portal,
    additionalVerticalSpace: true,
    ModalComponentFn: () => <DepositModal coin={coin} minimum={minimum}/>,
});

const addFundsModal = (Modal, portal, additionalVerticalSpace, coin, isBuy) => () => Modal({
    portal,
    additionalVerticalSpace,
    ModalComponentFn: () => <AddFundsModal coin={coin} isBuy={isBuy}/>,
});

const combinedBalanceModal = (Modal, portal, additionalVerticalSpace) => () => Modal({
    portal,
    additionalVerticalSpace,
    ModalComponentFn: () => <CombinedBalanceModal/>,
});

class WalletTable extends React.Component {
    graphCellRenderer = ObservedCellRenderer(GraphRow);

    depositCellRenderer = ObservedCellRenderer(
        ({ data }) => {
            const modalStore = this.props[STORE_KEYS.MODALSTORE];
            const Modal = modalStore.Modal;
            const isWalletEnabled = data.IsWalletEnabled || false;

            return (
                <DepositCell>
                    {
                        data.Coin === 'BCT' ? (
                            <button
                                className="basic-table__btn"
                                transaction-fancybox=""
                                onClick={addFundsModal(Modal, 'graph-chart-parent', true, data.Coin, false)}
                            >
                                Add Funds
                            </button>
                        ) : isWalletEnabled ? (
                            <button
                                className="basic-table__btn"
                                transaction-fancybox=""
                                onClick={depositModal(Modal, 'graph-chart-parent', data.Coin, (Math.random() * 5).toFixed(8))}
                            >
                                {(data.Coin || '').replace('F:', '')}
                            </button>
                        ) : (
                            <Tooltip
                                arrow={true}
                                animation="shift"
                                // position="bottom"
                                followCursor
                                theme="bct"
                                title="Your Access is Restricted to Level 1"
                            >
                                <button
                                    className="basic-table__btn"
                                    transaction-fancybox=""
                                >
                                    {(data.Coin || '').replace('F:', '')}
                                </button>
                            </Tooltip>
                        )
                    }
                </DepositCell>
            );
        }
    );

    priceCellRenderer = ObservedCellRenderer(
        ({ data }) => {
            const digitCount = Math.max(0, Math.min(2, 5 - parseInt(data.Price).toString().length));

            const deltaPrice = Number.parseFloat(data.Price) - Number.parseFloat(data.Change);
            const changeInPercent = deltaPrice !== 0 ? (Number.parseFloat(data.Price) / deltaPrice - 1) * 100 : 0;
            const changeInPercentSign = changeInPercent >= 0 ? '+' : changeInPercent < 0 ? '-' : '';
            const percentClassName = `change-in-percent ${(changeInPercent >= 0 ? ' positive' : ' negative')}`;

            return (
                <PriceCell /* disabled={data.Position <= 0.0001} */>
                    {/* <div className="smallChartInfo"> */}
                    {/* {showAltData */}
                    {/* ? ( */}
                    {/* <React.Fragment> */}
                    {/* <div> */}
                    {/* <span>${customDigitFormat(Number.parseFloat(data.Price) * Number.parseFloat(data.Position), 5)}</span> */}
                    {/* <span className={this.generateClassName(changeInUsd)}> */}
                    {/* {changeInUsdSign + "$" + customDigitFormat(Math.abs(changeInUsd), 5)} */}
                    {/* </span> */}
                    {/* </div> */}
                    {/* <span className="gray">Portfolio Value</span> */}
                    {/* </React.Fragment> */}
                    {/* ) */}
                    {/* : ( */}
                    {/* <React.Fragment> */}
                    {/* <div> */}
                    {/* <span>${formatStringMinMax(data.Price, 2, 2)}</span> */}
                    {/* <span className={disabled ? "smaller" : this.generateClassName(changeInPercent)}> */}
                    {/* {changeInPercentSign + Math.abs(changeInPercent.toFixed(2))}% */}
                    {/* </span> */}
                    {/* </div> */}
                    {/* <span className="gray">Coin Price</span> */}
                    {/* </React.Fragment> */}
                    {/* ) */}
                    {/* } */}
                    {/* </div> */}

                    <div className="d-flex-col">
                        <span className="price">${unifyDigitString(data.Price)}</span>
                        <span className={percentClassName}>
                            {changeInPercentSign + Math.abs(changeInPercent.toFixed(2))}%
                            <span/>
                        </span>
                    </div>
                </PriceCell>
            );
        }
    );

    marketCellRenderer = ObservedCellRenderer(
        ({ data }) => {
            const isBCT = data.Coin === 'BCT';
            return (
                <MarketcapCell /* disabled={data.Position <= 0.0001} */>
                    <div className="d-flex-col">
                        <span className="value">{(data.Marketcap > 0.0001 && !isBCT) ? customDigitFormat(data.Marketcap, 6) : 'N/A'}</span>
                        <span className="smaller">Mrkt. Cap</span>
                    </div>
                </MarketcapCell>
            );
        }
    );

    volumeCellRenderer = ObservedCellRenderer(
        ({ data }) => {
            // const deltaPrice = Number.parseFloat(data.Price) - Number.parseFloat(data.Change);
            // const changeInPercent = deltaPrice !== 0 ? (Number.parseFloat(data.Price) / deltaPrice - 1) * 100 : 0;
            // const changeInPercentSign = changeInPercent >= 0 ? '+' : changeInPercent < 0 ? '-' : '';

            return (
                <VolumeCell /* disabled={data.Position <= 0.0001} */>
                    <div className="d-flex flex-row justify-content-between align-items-center full-width">
                        <div className="d-flex-col">
                            <span className="value">{data.Volume24h > 0.0001 ? customDigitFormat(data.Volume24h, 6) : 'N/A'}</span>
                            <span className="smaller">Volume</span>
                        </div>
                        {/*
                        <span className={'change-in-percent' + (changeInPercent >= 0 ? ' positive' : ' negative')}>
                            {changeInPercentSign + Math.abs(changeInPercent.toFixed(2))}%
                        </span>
                        */}
                    </div>
                </VolumeCell>
            );
        }
    );

    constructor(props) {
        super(props);

        this.state = {
            scrollTop: 0,
            tooltip: -1,
        };

        this.tableRef = null;
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.baseCoinIndex !== nextProps.baseCoinIndex) {
            if (nextProps.baseCoinIndex > 3) {
                const rowHeight = 60;
                const scrollTop = nextProps.baseCoinIndex * rowHeight;
                this.setState({ scrollTop });
                if (this.scrollRef) {
                    this.scrollRef.scrollTop = scrollTop;
                }
            }
        }

        if (this.props.resetWalletTable !== nextProps.resetWalletTable) {
            this.scrollTop(50);
        }
    }

    nameCellRenderer = tooltip => ObservedCellRenderer(
        ({ data, index }) => {
            const modalStore = this.props[STORE_KEYS.MODALSTORE];
            const Modal = modalStore.Modal;

            const digitCount = Math.max(0, Math.min(2, 7 - parseInt(data.Position).toString().length));
            return (
                <NameCell
                    disabled={data.Position <= 0.0001 && data.Position >= 0}
                >
                    <span className="wallet-index">{index + 1}.</span>
                    <CoinIcon value={data.Coin} isBCT={data.Coin === 'BCT'}/>
                    <div className="d-flex-col">
                        <div className="wallet-box">
                            <span className="wallet">
                                {(data.Position <= 0.0001 && data.Coin !== 'BCT') ? 0 : (data.Position === 1 ? '1.00' : formatStringMinMax(data.Position, digitCount, digitCount))}
                            </span> {data.Coin !== 'BCT' ? (data.Coin || '').replace('F:', '') : ''}
                        </div>
                        <div className="smaller d-flex align-items-center">
                            {data.Name} <SmallLinks index={index} tooltipShow={tooltip === index} toggleTooltip={this.changeTooltip}/>
                            {/* {data.Coin === 'BCT' && <span className="link" onClick={addFundsModal(Modal, 'graph-chart-parent', true, data.Coin, false)}>Add Funds</span>} */}
                        </div>
                    </div>
                    {/*
                    <div
                        className="wallet-combined"
                        onClick={combinedBalanceModal(Modal, 'root', true)}
                    >
                        Combined
                    </div>
                    */}
                </NameCell>
            );
        }
    );

    generateClassName = position => {
        return parseFloat(position) > 0
            ? 'smaller clr-green'
            : parseFloat(position) < 0 ? 'smaller clr-darkRed' : 'smaller';
    };

    scrollTop = (duration = 300) => {
        if (duration > 0) {
            const difference = this.state.scrollTop;
            const perTick = (difference / duration) * 50;

            setTimeout(() => {
                const scrollTop = this.state.scrollTop - perTick;
                this.setState({ scrollTop });
                if (this.scrollRef) {
                    this.scrollRef.scrollTop = scrollTop;
                }

                this.scrollTop(duration - 10);
            }, 10);
        }
    };

    handleScroll = ({ scrollTop }) => {
        this.setState({ scrollTop });
    };

    scrollUp = () => {
        this.setState(prevState => {
            const rowHeight = this.tableRef.props.rowHeight || 60;
            const top = Math.max(0, prevState.scrollTop - rowHeight);
            const scrollTop = rowHeight * Math.floor(top / rowHeight);
            this.scrollRef.scrollTop = scrollTop;
            return {
                scrollTop,
            };
        });
    };

    scrollDown = () => {
        this.setState(prevState => {
            const rowHeight = this.tableRef.props.rowHeight || 60;
            const top = prevState.scrollTop + rowHeight;
            const scrollTop = rowHeight * Math.min(this.tableRef.props.rowCount - 1, Math.floor(top / rowHeight));
            this.scrollRef.scrollTop = scrollTop;
            return {
                scrollTop,
            };
        });
    };

    changeTooltip = tooltip => {
        this.setState({ tooltip });
    };

    render() {
        const { scrollTop, tooltip } = this.state;
        const { OrderEventsData } = this.props;
        const isLoggedIn = localStorage.getItem('authToken');

        return (
            <Fragment>
                <div
                    className="scroll__scrollup upper"
                    onClick={this.scrollUp}
                >
                    <button className="scroll-up-button">
                        <svg className="sprite-icon" role="img" aria-hidden="true">
                            <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="img/sprite-basic.svg#arrow-up"/>
                        </svg>
                    </button>
                </div>

                <div
                    className="scroll__scrollup"
                    onClick={this.scrollDown}
                >
                    <button className="scroll-up-button scroll-down">
                        <svg className="sprite-icon" role="img" aria-hidden="true">
                            <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="img/sprite-basic.svg#arrow-up"/>
                        </svg>
                    </button>
                </div>

                {/* <div */}
                {/* className={'scroll__scrollup' + (scrollTop > 0 ? '' : ' hide')} */}
                {/* onClick={() => this.scrollTop(300)} */}
                {/* > */}
                {/* <button className="scroll-up-button"> */}
                {/* <svg className="sprite-icon" role="img" aria-hidden="true"> */}
                {/* <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="img/sprite-basic.svg#arrow-up"/> */}
                {/* </svg> */}
                {/* </button> */}
                {/* </div> */}

                <AutoSizer>
                    {({ width, height }) => {
                        let lastColumnWidth = width * .2;
                        if (lastColumnWidth < 235) {
                            lastColumnWidth = 235;
                        }

                        return (
                            <StyleWrapper id="wallet-section" width={width} height={height}>
                                <PerfectScrollbar
                                    containerRef={ref => {
                                        this.scrollRef = ref;
                                    }}
                                    option={{
                                        suppressScrollX: true,
                                        minScrollbarLength: 50,
                                    }}
                                    onScrollY={this.handleScroll}
                                >
                                    <Table
                                        ref={el => {
                                            this.tableRef = el;
                                        }}
                                        autoHeight={true}
                                        width={width}
                                        height={height}
                                        headerHeight={20}
                                        disableHeader={true}
                                        rowCount={OrderEventsData.size} // should get length
                                        rowGetter={() => OrderEventsData}
                                        rowHeight={60}
                                        overscanRowCount={0}
                                        id="wallet-table"
                                        scrollTop={scrollTop}
                                    >
                                        <Column
                                            width={width * .2}
                                            dataKey="Name"
                                            cellRenderer={this.nameCellRenderer(tooltip)}
                                        />
                                        <Column
                                            width={width * .2}
                                            dataKey="Price"
                                            cellRenderer={this.priceCellRenderer}
                                        />
                                        <Column
                                            width={width * .2}
                                            dataKey="Market"
                                            cellRenderer={this.marketCellRenderer}
                                        />
                                        <Column
                                            width={width * .2}
                                            dataKey="Volume"
                                            cellRenderer={this.volumeCellRenderer}
                                        />
                                        {!isLoggedIn ? (
                                            <Column
                                                className="flex-shrink-0"
                                                width={lastColumnWidth}
                                                dataKey="Graph"
                                                cellRenderer={this.graphCellRenderer}
                                            />
                                        ) : (
                                            <Column
                                                width={lastColumnWidth}
                                                dataKey="Amount"
                                                cellRenderer={this.depositCellRenderer}
                                            />
                                        )}
                                    </Table>
                                </PerfectScrollbar>
                            </StyleWrapper>
                        );
                    }}
                </AutoSizer>
            </Fragment>
        );
    }
}

const withRecentInstruments = compose(
    inject(STORE_KEYS.YOURACCOUNTSTORE, STORE_KEYS.MODALSTORE),
    observer,
    withProps(
        ({
            [STORE_KEYS.YOURACCOUNTSTORE]: {
                OrderEventsData,
                baseCoinIndex,
                resetWalletTable,
            },
        }) => ({
            OrderEventsData,
            baseCoinIndex,
            resetWalletTable,
        })
    )
);

export default withRecentInstruments(WalletTable);
