import React, { Fragment } from 'react';
import { AutoSizer, Column, Table } from 'react-virtualized';
import sortBy from 'lodash/sortBy';
import uuidv4 from 'uuid/v4';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Tooltip } from 'react-tippy';

import CoinIcon from './CoinIcon';
// import CoinName from './CoinName';
import CoinNameSmall from './CoinName/CoinNameSmall';
import CoinIconDropdown from './CoinIcon/CoinIconDropdown';
// import RatioInput from './RatioInput';
import ExchDeposit from './ExchDeposit';
import {
    ExchDropdownList,
    StyleWrapper,
    AddonWrapper,
    ItemButtonWrapper,
    ItemButton
} from './Components';
import {
    WalletButton,
    WalletSideIcon,
    WalletTopIcon
} from '../Components';
import { customDigitFormat, highlightSearchDom } from '../../../utils';
import DataLoader from '../../../components-generic/DataLoader';
import SMSVerification from '../../../components-generic/SMSVerification2';
import COIN_DATA_MAP from '../../../mock/coin-data-map';

class ExchDropdown extends React.PureComponent {
    constructor(props) {
        super(props);
        this.inputRef = null;
        this.id = `dropdown-id-${uuidv4()}`;

        this.state = {
            isSelected: false,
            searchInputValue: '',
            tableItems: [],
            scrollTop: 0,
            id: this.id,
            selectedValue: '',
            selectedIndex: -1,
            isRequestLoading: false,
            tooltipShow: false,
            isEmpty: true,
            isLoginBtnShow: false,
            isLeft: props.isLeft,
        };

        this.currentIndex = -1;
        this.scrollHeight = 0;
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
        this.updateTableItems(this.props);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.updateTableItems(nextProps);
        let i;
        for (i = 0; i < this.props.topGroupItems.length; i++) {
            if (this.props.topGroupItems[i].type !== 'label' && this.props.topGroupItems[i].symbol === this.props.value) {
                this.setState({ selectedValue: this.props.topGroupItems[i].symbol });
                this.currentIndex = i;
                let scrollTop = i * this.getRowHeight(i);
                if (scrollTop < this.scrollHeight) {
                    scrollTop = 0;
                }

                if (i < this.state.tableItems.length) {
                    this.scrollRef.scrollTop = scrollTop;
                }
                this.setState({ scrollTop });
                break;
            }
        }
    }

    componentDidUpdate() {
        this.scrollRef.scrollTop = this.state.scrollTop;
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    onChangeSearchInputValue = (e) => {
        if (e.target.value === '') {
            this.setState({ isEmpty: true });
        } else {
            this.setState({ isEmpty: false });
        }
        this.setState({
            searchInputValue: e.target.value,
            scrollTop: 0,
        });

        if (this.scrollRef) {
            this.scrollRef.scrollTop = 0;
        }
        setTimeout(this.updateTableItems, 0);
        window.dropDownFocusIndex = 0;
        this.currentIndex = -1;
    };

    onSelectItem = (value, rowIndex) => {
        this.toggleDropdown();
        this.props.onChange(value);
        this.setState({ selectedValue: value });
        if (this.props.isLeft) {
            this.props.setSelectedCoin(value);
        }
    };

    getRowHeight = ({ index }) => {
        if (this.state.tableItems[index] && this.state.tableItems[index].type && this.state.tableItems[index].type === 'label') {
            return 0;
        }

        return 110;
    };

    handleScroll = ({ scrollTop }) => {
        this.setState({ scrollTop });
    };

    handleClickOutside = (event) => {
        if (this.props.isOpen && this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            const qrCodePortal = document.getElementById('qr-code-portal');
            if (qrCodePortal && qrCodePortal.contains(event.target)) {
                return;
            }

            this.toggleDropdown();
        }
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

    toggleDropdown = () => {
        const {
            setCoinListOpen,
            toggleDroplist,
            isOpen,
        } = this.props;
        setCoinListOpen(!isOpen);
        toggleDroplist();

        if (!isOpen) {
            setTimeout(() => {
                this.updateTableItems();
                if (this.inputRef) {
                    this.inputRef.focus();
                }
                // this.toggleDropdownArrow(false);
            }, 300);
        } else {
            this.setState({
                searchInputValue: '',
                selectedIndex: -1,
            });
        }

        this.forceUpdate();
        window.dropDownFocusIndex = 0;
    };

    toggleDropdownArrow = (isSelected = null) => {
        if (isSelected) {
            this.setState({ isSelected });
        } else {
            this.setState(prevState => ({
                isSelected: !prevState.isSelected,
            }));
        }
    };

    updateTableItems = (propsInput) => {
        let props = propsInput || this.props;
        let tableItems = [];

        let searchedTopGroupItems = [];
        let searchedTopGroupItemsWeights = [];

        if (props && props.topGroupEnabled && props.topGroupItems && props.topGroupItems.length) {
            for (let i = 0; i < props.topGroupItems.length; i++) {
                const weight = this.isSearched(props.topGroupItems[i], this.state.searchInputValue);
                if (weight >= 0) {
                    searchedTopGroupItemsWeights.push({
                        weight,
                        item: props.topGroupItems[i],
                    });
                }
            }

            if (props.topGroupLabel && searchedTopGroupItemsWeights.length) {
                tableItems.push({
                    type: 'label',
                    name: '',
                    value: props.topGroupLabel,
                });
            }

            searchedTopGroupItemsWeights = sortBy(searchedTopGroupItemsWeights, item => item.weight);
            // searchedTopGroupItemsWeights.reverse();
            searchedTopGroupItems = searchedTopGroupItemsWeights.map(val => val.item);

            tableItems = tableItems.concat(searchedTopGroupItems);
        }

        let searchedMainItems = [];
        let searchedMainItemsWeights = [];

        if (props && props.mainItems && props.mainItems.length) {
            for (let i = 0; i < props.mainItems.length; i++) {
                const weight = this.isSearched(props.mainItems[i], this.state.searchInputValue);
                if (weight >= 0) {
                    searchedMainItemsWeights.push({
                        weight,
                        item: props.mainItems[i],
                    });
                }
            }

            if (searchedMainItemsWeights.length) {
                // Add `All coins` label separator only when top group items are enabled.
                if (props.topGroupEnabled) {
                    tableItems.push({
                        type: 'label',
                        name: '',
                        value: 'All Coins',
                    });
                }

                searchedMainItemsWeights = sortBy(searchedMainItemsWeights, item => item.weight);
                // searchedMainItemsWeights.reverse();
                searchedMainItems = searchedMainItemsWeights.map(val => val.item);

                tableItems = tableItems.concat(searchedMainItems);
            }
        }


        const { selectedValue } = this.state;
        tableItems.sort((x, y) => x.symbol === selectedValue ? -1 : y === selectedValue ? 1 : 0);

        this.setState({
            tableItems,
        });

        if (this.tableRef) {
            this.tableRef.recomputeRowHeights();
        }
    };

    isSearched = (item, query) => {
        const lowerCaseQuery = query.toLowerCase();
        let symbolSrcStr;
        let nameSrcStr;

        try {
            symbolSrcStr = ((item.symbol && item.symbol.length) ? item.symbol : '').replace('F:', '').toLowerCase();
            nameSrcStr = ((item.name && item.name.length) ? item.name : '').toLowerCase();
        } catch (e) {
            return -1;
        }

        if (!query) {
            return 999;
        }

        const symbolContains = symbolSrcStr.includes(lowerCaseQuery);
        const nameContains = nameSrcStr.includes(lowerCaseQuery);

        const symbolWeight = Math.abs(lowerCaseQuery.length - symbolSrcStr.length);
        const nameWeight = Math.abs(lowerCaseQuery.length - nameSrcStr.length);

        let weight = -1;

        if (symbolContains) {
            weight = symbolWeight;
        }

        if (nameContains) {
            weight = (weight < nameWeight && weight !== -1) ? weight : nameWeight;
        }

        return weight;
    };

    handleKeyDown = (e) => {
        if (!this.props.isOpen) {
            return;
        }

        const key = ['ArrowUp', 'Enter', 'ArrowDown'].indexOf(e.key);

        if (key === 1 && !!this.state.searchInputValue && this.state.tableItems.length) {
            let value = '';
            let i;
            for (i = 0; i < this.state.tableItems.length; i++) {
                if (this.state.tableItems[i].type !== 'label') {
                    value = this.state.tableItems[i].symbol;
                    break;
                }
            }

            // if (value) {
            //     this.onSelectItem(value, i);
            // }
        } else if (key === 0) {
            let prevSymbol = '';
            let itemValue = '';
            if (!this.state.selectedValue || this.state.selectedValue === '') {
                itemValue = this.props.value;
            } else {
                itemValue = this.state.selectedValue;
            }

            if (!itemValue || this.currentIndex <= 1) {
                return;
            }

            let i = this.currentIndex - 1;
            let blankHeight = 0;
            while (this.state.tableItems[i] && this.state.tableItems[i].type === 'label') {
                i--;
            }

            prevSymbol = this.state.tableItems[i].symbol;
            this.setState({ selectedValue: prevSymbol });
            if (this.props.topGroupLabel === 'Recent') {
                blankHeight = 5;
            }
            let scrollTop = (i - 1) * this.getRowHeight(i) - blankHeight;
            if (this.props.topGroupLabel === 'Recent') {
                scrollTop -= this.getRowHeight(i);
            }
            if (scrollTop < this.scrollHeight) {
                scrollTop = 0;
            }

            let offset = scrollTop - this.scrollRef.scrollTop;
            if (offset > 0 && offset < this.scrollHeight) {
                return;
            }

            this.scrollRef.scrollTop = scrollTop;
            this.setState({ scrollTop });
        } else if (key === 2) {
            let prevSymbol = '';
            let itemValue = '';
            if (!this.state.selectedValue || this.state.selectedValue === '') {
                itemValue = this.props.value;
            } else {
                itemValue = this.state.selectedValue;
            }

            let i = this.currentIndex + 1;
            if (!itemValue || i >= this.state.tableItems.length) {
                return;
            }

            let blankHeight = 0;
            while (this.state.tableItems[i] && this.state.tableItems[i].type === 'label') {
                i++;
            }

            prevSymbol = this.state.tableItems[i].symbol;
            this.setState({ selectedValue: prevSymbol });
            if (this.props.topGroupLabel === 'Recent') {
                blankHeight = 5;
            }
            let scrollTop = i * this.getRowHeight(i) + blankHeight - this.scrollHeight;
            if (this.props.topGroupLabel === 'Recent') {
                scrollTop -= this.getRowHeight(i);
            }
            if (scrollTop < 0) {
                scrollTop = 0;
            }

            let offset = this.scrollRef.scrollTop - scrollTop;
            if (offset > 0 && offset < this.scrollHeight) {
                return;
            }

            this.scrollRef.scrollTop = scrollTop;
            this.setState({ scrollTop });
        }
    };

    closeDepositView = () => {
        this.setState({
            selectedIndex: -1,
        });
    };

    changeDepositView = (symbol) => {
        const { isLeft } = this.state;
        const { createDepositAddress, notifyMsg } = this.props;

        if (!isLeft) {
            this.setState({
                isRequestLoading: true,
            });
            createDepositAddress(symbol).then(address => {
                if (address !== '') {
                    this.setState({
                        isLeft: !this.state.isLeft,
                        isRequestLoading: false,
                        tooltipShow: false,
                    });
                }
            });
            setTimeout(() => {
                if (this.props.coinDepositAddress === '') {
                    notifyMsg('No deposit address from backend');
                    this.setState({
                        isRequestLoading: false,
                        tooltipShow: true,
                    });
                    setTimeout(() => {
                        this.setState({
                            selectedIndex: -1,
                            tooltipShow: false,
                        });
                    }, 3000);
                }
            }, 20000);
        } else {
            this.setState({
                isLeft: !this.state.isLeft,
            });
        }
    };

    cellRenderer = ({ rowIndex }) => {
        let itemValue = '';
        const data = this.state.tableItems[rowIndex];
        const {
            addon,
            isArbitrageMode,
            isShortSell,
            defaultFiat,
            openDepositView,
            isLoggedIn,
            setLoginBtnLocation,
            createDepositAddress,
            coinDepositAddress,
            isMobile,
            notifyMsg,
        } = this.props;

        const {
            selectedIndex,
            isRequestLoading,
            tooltipShow,
            isLoginBtnShow,
            isLeft,
        } = this.state;

        if (!data) {
            return;
        }

        if (data.type && data.type === 'label') {
            // return <div className="exch-dropdown__list-title" key={rowIndex}>{data.value || ''}</div>;
            return <div className="exch-dropdown__list-title" key={rowIndex}/>;
        }

        if (!this.state.selectedValue || this.state.selectedValue === '') {
            itemValue = this.props.value;
        } else {
            itemValue = this.state.selectedValue;
        }

        const className = 'exch-dropdown__item' + (data.symbol === itemValue ? ' current' : '') + (!data.enabled ? ' disabled' : '');

        if (data.symbol === itemValue) {
            this.currentIndex = rowIndex;
        }

        const isActive = data.position > 0.0001;
        const balance = data.position !== 1 ? ((data.position && data.position >= 0.00001) ? customDigitFormat(data.position) : '0.00') : '1.00';

        return (
            <ItemButtonWrapper>
                { (!isLoggedIn && isLoginBtnShow && rowIndex === selectedIndex) ? (
                    <SMSVerification handleBack={this.handleLogin}/>
                ) : (
                    <Fragment>
                        <ItemButton
                            className={className}
                            key={rowIndex}
                            onClick={() => this.onSelectItem(data.symbol, rowIndex)}
                            id={`dropdown-btn-${data.symbol}`}
                            isActive={isLeft ? !isShortSell : isArbitrageMode}
                        >
                            {/* <div className="overlay"/> */}
                            <CoinIcon value={data} defaultFiat={defaultFiat}/> <CoinNameSmall value={data} search={this.state.searchInputValue} isMobile={isMobile}/>
                        </ItemButton>
                        {/*
                        {data.position === 'USDT' && (
                            <AddonWrapper isSelected={data.symbol === this.props.value}>
                                {addon}
                            </AddonWrapper>
                        )}
                        */}

                        <AddonWrapper isSelected={data.symbol === itemValue}>
                            <Tooltip
                                open={tooltipShow && selectedIndex === rowIndex}
                                arrow={true}
                                animation="shift"
                                position="bottom"
                                // followCursor
                                theme="bct"
                                title="Your Access is Restricted to Level 1"
                                className="full-width"
                            >
                                <WalletButton
                                    isActive={isActive}
                                    isCurrent={data.symbol === itemValue}
                                    isLoggedIn={isLoggedIn}
                                    onClick={() => {
                                        if (isLoggedIn) {
                                            if (!isRequestLoading && isLeft) {
                                                this.setState({
                                                    selectedIndex: rowIndex,
                                                    isRequestLoading: true,
                                                });
                                                createDepositAddress(data.symbol).then(address => {
                                                    if (address !== '') {
                                                        this.setState({
                                                            isRequestLoading: false,
                                                            tooltipShow: false,
                                                        });
                                                    }
                                                });
                                                setTimeout(() => {
                                                    if (this.props.coinDepositAddress === '') {
                                                        notifyMsg('No deposit address from backend');
                                                        this.setState({
                                                            isRequestLoading: false,
                                                            tooltipShow: true,
                                                        });
                                                        setTimeout(() => {
                                                            this.setState({
                                                                selectedIndex: -1,
                                                                tooltipShow: false,
                                                            });
                                                        }, 3000);
                                                    }
                                                }, 20000);
                                            }
                                            if (!isLeft) {
                                                this.setState({
                                                    selectedIndex: rowIndex,
                                                    isRequestLoading: false,
                                                    tooltipShow: false,
                                                });
                                            }
                                        } else {
                                            this.setState({
                                                selectedIndex: rowIndex,
                                                isLoginBtnShow: true,
                                            });
                                        }
                                    }}
                                >
                                    {(isRequestLoading && selectedIndex === rowIndex) ? (
                                        <DataLoader width={35} height={35} />
                                    ) : (
                                        <Fragment>
                                            <div className="DemoLabel">DEMO</div>
                                            <span className="value">{balance}</span>
                                        </Fragment>
                                    )}

                                    <WalletTopIcon />
                                    <WalletSideIcon />
                                </WalletButton>
                            </Tooltip>
                        </AddonWrapper>

                        {!isRequestLoading && (selectedIndex === rowIndex) && (coinDepositAddress !== '' || !isLeft) && (
                            <ExchDeposit
                                isLeft={isLeft}
                                symbol={data.symbol}
                                balance={balance}
                                position={data.position}
                                depositAddress={coinDepositAddress}
                                onCloseHandler={this.closeDepositView}
                                defaultFiat={defaultFiat}
                                onChangeDeposit={() => this.changeDepositView(data.symbol)}
                            />
                        )}
                    </Fragment>
                )}
            </ItemButtonWrapper>
        );
    };

    render() {
        const {
            isSelected,
            searchInputValue,
            tableItems,
            scrollTop,
            id,
            selectedValue,
            isEmpty,
        } = this.state;

        const {
            value,
            resetWalletTable,
            addon,
            isArbitrageMode,
            selectedBase,
            selectedQuote,
            isLeft,
            mainItems,
            topGroupItems,
            isOpen,
            defaultFiat,
        } = this.props;

        const totalItemLength = mainItems.length + topGroupItems.length;

        return (
            <div
                className={`exch-dropdown${isOpen ? ' open' : ''}`}
                id={id}
                ref={(node) => {
                    this.wrapperRef = node;
                }}
                tabIndex="0"
                onKeyDown={this.handleKeyDown}
            >
                <div
                    className="exch-dropdown__border"
                    onClick={this.props.onClick}
                >
                    <div className="exch-dropdown__current" onClick={this.toggleDropdown}>
                        <div className="flex-1">
                            {/* <CoinIcon value={value} defaultFiat={defaultFiat}/> */}
                            {COIN_DATA_MAP[value] ?
                                <Tooltip
                                    arrow={true}
                                    animation="shift"
                                    position="bottom"
                                    followCursor
                                    theme="bct"
                                    title={highlightSearchDom(COIN_DATA_MAP[value]).name}
                                >
                                    <CoinIconDropdown
                                        isSearchOpen={isOpen}
                                        isLeft={isLeft}
                                        value={value}
                                        defaultFiat={defaultFiat}
                                    />
                                </Tooltip> :
                                <CoinIconDropdown
                                    isSearchOpen={isOpen}
                                    isLeft={isLeft}
                                    value={value}
                                    defaultFiat={defaultFiat}
                                />
                            }
                            <CoinNameSmall value={value} isMobile={false}/>
                            {/* <CoinName value={value} isArbitrageMode={isArbitrageMode} selectedBase={selectedBase} selectedQuote={selectedQuote} isLeft={isLeft} defaultFiat={defaultFiat}/> */}
                        </div>

                        {/*
                        <div className="flex-1">
                            {isSelected ? (
                                <div className="exch-dropdown__handle" onClick={this.toggleDropdown}>
                                    <svg
                                        className="sprite-icon"
                                        role="img"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="15px"
                                        height="8.9px"
                                        viewBox="0 0 15 8.9"
                                    >
                                        <path d="M7.5,8.9L0.3,1.7c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l5.8,5.8l5.8-5.8c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4L7.5,8.9z"/>
                                    </svg>
                                </div>
                            ) : (
                                <div>
                                    <RatioInput className="ratio-input" isLeft={isLeft}/>
                                </div>
                            )}
                        </div>
                        */}
                    </div>

                    <div className={`exch-search${isOpen ? '' : ' hidden'}`}>
                        <input
                            className="exch-search__input"
                            type="text"
                            // placeholder={totalItemLength < 6 ? 'Select a currency or ticker' : 'Type a currency or ticker'}
                            placeholder="Search"
                            value={searchInputValue}
                            onChange={this.onChangeSearchInputValue}
                            // disabled={totalItemLength < 6}
                            ref={el => {
                                this.inputRef = el;
                            }}
                        />

                        <div className={`exch-dropdown__handle ${isEmpty ? 'hidden' : ''}`} onClick={this.toggleDropdown}>
                            {/* <svg className="sprite-icon arrow" role="img" aria-hidden="true"> */}
                            {/* <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="img/sprite-basic.svg#arrow-drop-2"/> */}
                            {/* </svg> */}
                            <svg className="sprite-icon close" role="img" aria-hidden="true" style={{ width: 20, height: 20 }}>
                                <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="img/sprite-basic.svg#arrow-drop-close"/>
                            </svg>
                        </div>
                        { !searchInputValue ?
                            <Tooltip
                                arrow={true}
                                animation="shift"
                                position="bottom"
                                followCursor
                                theme="bct"
                                title="Type a currency or ticker"
                            >
                                <svg className="exch-search__icon" role="img" aria-hidden="true" viewBox="0 0 10.583 10.583" xmlns="http://www.w3.org/2000/svg">
                                    <g transform="translate(0 -286.42)">
                                        <path d="m10.144 295.34-2.3931-2.3786c-0.35646 0.55128-0.82824 1.0202-1.3829 1.3745l2.3931 2.3784c0.382 0.37989 1.0015 0.37989 1.3829 0 0.382-0.37885 0.382-0.99463 0-1.3743"/>
                                        <path d="m3.9114 293.44c-1.618 0-2.9338-1.3079-2.9338-2.9157 0-1.608 1.3158-2.9157 2.9338-2.9157 1.6178 0 2.9336 1.3076 2.9336 2.9157 0 1.6078-1.3158 2.9157-2.9336 2.9157m3.9111-2.9157c0-2.1469-1.751-3.8877-3.9111-3.8877-2.1601 0-3.9114 1.7407-3.9114 3.8877 0 2.147 1.7513 3.8874 3.9114 3.8874 2.1601 0 3.9111-1.7404 3.9111-3.8874"/>
                                        <path d="m1.6296 290.52h0.65211c0-0.89326 0.73083-1.6199 1.6296-1.6199v-0.6479c-1.2579 0-2.2817 1.0173-2.2817 2.2678"/>
                                    </g>
                                </svg>
                            </Tooltip> : null}
                    </div>
                </div>

                <ExchDropdownList itemCount={tableItems.length} className="exch-dropdown__list">
                    <div className={`scroll__scrollup${scrollTop > 0 ? '' : ' hide'}`} onClick={() => this.scrollTop(300)}>
                        <button className="scroll-up-button">
                            <svg className="sprite-icon" role="img" aria-hidden="true">
                                <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="img/sprite-basic.svg#arrow-up"/>
                            </svg>
                        </button>
                    </div>

                    <div className="exch-dropdown__list__rvtable-wrapper">
                        <AutoSizer>
                            {({ width, height }) => {
                                this.scrollHeight = height;
                                return (
                                    <StyleWrapper width={width} height={height}>
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
                                                headerHeight={0}
                                                disableHeader={true}
                                                rowCount={tableItems.length} // should get length
                                                rowGetter={({ index }) => tableItems[index]}
                                                rowHeight={this.getRowHeight}
                                                overscanRowCount={0}
                                                id="wallet-table"
                                                scrollTop={scrollTop}
                                            >
                                                <Column
                                                    dataKey="name"
                                                    width={width}
                                                    cellRenderer={this.cellRenderer}
                                                />
                                            </Table>
                                            {/*
                                                addon &&
                                                <div className="addon">
                                                    {addon}
                                                </div>
                                            */}
                                        </PerfectScrollbar>
                                    </StyleWrapper>
                                );
                            }}
                        </AutoSizer>
                    </div>
                </ExchDropdownList>
            </div>
        );
    }
}

export default ExchDropdown;
