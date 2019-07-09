import React, { Fragment } from 'react';
import { AutoSizer, Column, Table } from 'react-virtualized';
import sortBy from 'lodash/sortBy';
import uuidv4 from 'uuid/v4';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Tooltip } from 'react-tippy';
import { compose, withProps } from 'recompose';
import { inject, observer } from 'mobx-react';

import CoinIcon from './CoinIcon';
import CoinNameSmall from './CoinName/CoinNameSmall';
import CoinWrapper from './CoinIcon/CoinWrapper';
import { BTCFontIcon } from './CoinIcon/Components';
import ExchDeposit from './ExchDeposit';
import {
    ExchDropdownList,
    StyleWrapper,
    AddonWrapper,
    ItemButtonWrapper,
    ItemButton,
    CoinItemWrapper
} from './Components';
import {
    WalletButton,
    WalletSideIcon,
    WalletTopIcon
} from '../Components';
import {
    customDigitFormat, convertToFloat, numberWithCommas
} from '../../../utils';
import DataLoader from '../../../components-generic/DataLoader';
import SMSVerification from '../../../components-generic/SMSVerification2';
import COIN_DATA_MAP from '../../../mock/coin-data-map';
import { STORE_KEYS } from '../../../stores';

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
            isLeft: true,
        };

        this.currentIndex = -1;
        this.scrollHeight = 0;

        this.width = 0;
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
        this.updateTableItems(this.props);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.updateTableItems(nextProps);
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
        if (value && value.fiat) {
            this.props.setFiatCurrency(value.symbol.substring(2, value.symbol.length - 1));
            this.toggleDropdown();
            return;
        }
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
            this.scrollRef.scrollTop = 0;
            this.setState({ scrollTop: 0 });
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
                if (weight >= 0 && props.topGroupItems[i].file) {
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
                if (weight >= 0 && props.mainItems[i].file) {
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

        let searchedCurrencyItems = [];
        let searchedCurrencyItemsWeights = [];

        if (COIN_DATA_MAP && this.state.searchInputValue) {
            const keys = Object.keys(COIN_DATA_MAP);
            for (let i = 0; i < keys.length; i++) {
                const coinRaw = COIN_DATA_MAP[keys[i]];
                const coin = { ...coinRaw, symbol: coinRaw.symbol + 't' };
                if (coin.fiat) {
                    const weight = this.isSearched(coin, this.state.searchInputValue);
                    if (weight >= 0) {
                        searchedCurrencyItemsWeights.push({
                            weight,
                            item: coin,
                        });
                    }
                }
            }

            if (searchedCurrencyItemsWeights.length) {
                // Add `All coins` label separator only when top group items are enabled.
                if (props.topGroupEnabled) {
                    tableItems.push({
                        type: 'label',
                        name: '',
                        value: 'Currency',
                    });
                }

                searchedCurrencyItemsWeights = sortBy(searchedCurrencyItemsWeights, item => item.weight);
                // searchedCurrencyItemsWeights.reverse();
                searchedCurrencyItems = searchedCurrencyItemsWeights.map(val => val.item);

                tableItems = tableItems.concat(searchedCurrencyItems);
            }
        }
        const isLeftDirection = (props.isLeft && !props.isCoinPairInversed) || (!props.isLeft && props.isCoinPairInversed);
        if (isLeftDirection) {
            tableItems = tableItems.filter(item => {
                if (props.accessLevel === 'Level 1') {
                    return item.symbol === 'BTC';
                }
                if (props.accessLevel === 'Level 2') {
                    return item.symbol === 'BTC' || item.symbol === 'ETH';
                }
                return true;
            });
        } else {
            tableItems = tableItems.filter(item => {
                if (props.accessLevel === 'Level 1') {
                    return item.symbol === 'USDT';
                }
                if (props.accessLevel === 'Level 2') {
                    return item.symbol === 'USDT' || item.symbol === 'BTC';
                }
                return true;
            });
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
            return <div className="exch-dropdown__list-title" key={rowIndex} />;
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
        const isDemo = convertToFloat(balance) > 0;

        return (
            <ItemButtonWrapper>
                {(!isLoggedIn && isLoginBtnShow && rowIndex === selectedIndex) ? (
                    <SMSVerification handleBack={this.handleLogin} />
                ) : (
                    <Fragment>
                        <ItemButton
                            className={className}
                            key={rowIndex}
                            onClick={() => this.onSelectItem(data.fiat ? data : data.symbol, rowIndex)}
                            id={`dropdown-btn-${data.symbol}`}
                            isActive={isLeft ? !isShortSell : isArbitrageMode}
                        >
                            <CoinIcon value={data} defaultFiat={defaultFiat} />
                            <CoinNameSmall value={data} search={this.state.searchInputValue} defaultFiat={defaultFiat} isMobile={isMobile} />
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
                                            // setTimeout(() => {
                                            const el = document.querySelector(`#dropdown-btn-${data.symbol}`);
                                            if (el) {
                                                const wrapperEl = el.closest('.ReactVirtualized__Table__rowColumn');
                                                if (wrapperEl) {
                                                    wrapperEl.scrollIntoView(true);
                                                }
                                            }
                                            // }, 100);
                                            setTimeout(() => {
                                                const el = document.querySelector(`#dropdown-btn-${data.symbol}`);
                                                if (el) {
                                                    const wrapperEl = el.closest('.ReactVirtualized__Table__rowColumn');
                                                    if (wrapperEl) {
                                                        wrapperEl.scrollIntoView(true);
                                                    }
                                                }
                                            }, 200);

                                            if (!isRequestLoading) {
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
                                            {isDemo && <div className="DemoLabel">DEMO</div>}
                                            <span className="value">{balance}</span>
                                        </Fragment>
                                    )}

                                    <WalletTopIcon />
                                    <WalletSideIcon />
                                </WalletButton>
                            </Tooltip>
                        </AddonWrapper>

                        {/* {!isRequestLoading && (selectedIndex === rowIndex) && (coinDepositAddress !== '') && ( */}
                        {(selectedIndex === rowIndex) && (
                            <ExchDeposit
                                isLeft={isLeft}
                                symbol={data.symbol}
                                isDemo={isDemo}
                                balance={balance}
                                position={data.position}
                                depositAddress={coinDepositAddress}
                                onCloseHandler={this.closeDepositView}
                                defaultFiat={defaultFiat}
                                onChangeDeposit={() => this.changeDepositView(data.symbol)}
                                rowBaseWidth={this.width}
                                rowHeight={this.getRowHeight({ index: rowIndex })}
                                isRequestLoading={isRequestLoading}
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
            isCoinPairInversed,
            mainItems,
            topGroupItems,
            isOpen,
            defaultFiat,
            toggleDroplist,
            price,
            getDefaultPrice,
            getLocalCurrency,
            defaultFiatSymbol,
            isDefaultCrypto,
        } = this.props;

        const totalItemLength = mainItems.length + topGroupItems.length;
        const isLeftDirection = (isLeft && !isCoinPairInversed) || (!isLeft && isCoinPairInversed);
        const rate = getLocalCurrency(selectedBase) === getLocalCurrency(selectedQuote) ? 1 : numberWithCommas(getDefaultPrice(price, selectedQuote));
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
                    <CoinItemWrapper onClick={this.toggleDropdown}>
                        {isLeftDirection ? (
                            <Fragment>
                                <CoinWrapper
                                    isSearchOpen={isOpen}
                                    isLeft={isLeft}
                                    isLeftDirection={true}
                                    value={value}
                                    defaultFiat={defaultFiat}
                                />
                                <div>
                                    <p className="exch-dropdown__title"><span>1</span></p>
                                </div>
                            </Fragment>
                        ) : (
                            <Fragment>
                                <div>
                                    <p className="exch-dropdown__title">
                                        <span>{isDefaultCrypto ? <BTCFontIcon /> : defaultFiatSymbol} {rate}</span>
                                    </p>
                                </div>
                                <CoinNameSmall value={value} isMobile={false} defaultFiat={defaultFiat} />
                            </Fragment>
                        )}
                    </CoinItemWrapper>

                    <div className={`exch-search${isOpen ? '' : ' hidden'}`}>
                        <svg className="exch-search__icon" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 100 100" x="0px" y="0px">
                            <path d="M38,76.45A38.22,38.22,0,1,1,76,38.22,38.15,38.15,0,0,1,38,76.45Zm0-66.3A28.08,28.08,0,1,0,65.84,38.22,28,28,0,0,0,38,10.15Z" />
                            <rect x="73.84" y="54.26" width="10.15" height="49.42" transform="translate(-32.73 79.16) rotate(-45.12)" />
                        </svg>
                        <input
                            className="exch-search__input"
                            type="text"
                            value={searchInputValue}
                            onChange={this.onChangeSearchInputValue}
                            onClick={toggleDroplist}
                            ref={el => {
                                this.inputRef = el;
                            }}
                        />
                    </div>
                </div>

                <ExchDropdownList itemCount={tableItems.length} className="exch-dropdown__list">
                    <div className={`scroll__scrollup${scrollTop > 0 ? '' : ' hide'}`} onClick={() => this.scrollTop(300)}>
                        <button className="scroll-up-button">
                            <svg className="sprite-icon" role="img" aria-hidden="true">
                                <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="img/sprite-basic.svg#arrow-up" />
                            </svg>
                        </button>
                    </div>

                    <div className="exch-dropdown__list__rvtable-wrapper">
                        <AutoSizer>
                            {({ width, height }) => {
                                this.scrollHeight = height;
                                this.width = width;
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

const withStore = compose(
    inject(
        STORE_KEYS.SETTINGSSTORE,
        STORE_KEYS.PRICECHARTSTORE,
        STORE_KEYS.SETTINGSSTORE,
    ),
    observer,
    withProps(
        ({
            [STORE_KEYS.SETTINGSSTORE]: {
                setFiatCurrency,
                defaultFiatSymbol,
                isDefaultCrypto,
            },
            [STORE_KEYS.PRICECHARTSTORE]: {
                price,
            },
            [STORE_KEYS.SETTINGSSTORE]: {
                getDefaultPrice,
                getLocalCurrency,
                price: baseFiatPrice,
            },
        }) => ({
            setFiatCurrency,
            price,
            getDefaultPrice,
            getLocalCurrency,
            defaultFiatSymbol,
            isDefaultCrypto,
        })
    )
);
export default withStore(ExchDropdown);
