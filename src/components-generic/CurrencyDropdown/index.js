import React, { Component } from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { FormattedMessage } from 'react-intl';
import { compose, withProps } from 'recompose';
import sortBy from 'lodash/sortBy';
import { AutoSizer, Table, Column } from 'react-virtualized';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { STORE_KEYS } from '../../stores';
import { highlightSearchDom } from '../../utils';
import { currencyList } from './currencies';
import {
    SearchInputWrapper, SearchInput,
    ItemList, ListStyleWrapper, ListItem, SearchIcon
} from '../SelectDropdown/Components';
import CoinIcon from '../CoinIcon';

const Dropdown = styled.div`
    position: absolute;
    top: ${props => props.alignTop ? `-${props.height + 1}px` : (props.isChild ? '80px' : '100%')};
    ${props => props.alignLeft ? 'left: -1px' : ''};
    ${props => props.alignRight ? 'right: -1px' : ''};
    z-index: 100;
    width: ${props => (!props.alignLeft || !props.alignRight) ? props.width + 'px' : 'unset'};
    height: ${props => props.height}px;
    left: 12px;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    background: ${props => props.theme.palette.clrBackground};
    border: 1px solid ${props => props.theme.palette.clrBorder};
    ${props => props.hasBorder ? '' : (props.alignTop ? 'border-bottom: 0' : 'border-top: 0')};
    border-radius: ${props => props.hasBorder
        ? props.theme.palette.borderRadius
        : props.alignTop
            ? `${props.theme.palette.borderRadius} ${props.theme.palette.borderRadius} 0 0`
            : `0 0 ${props.theme.palette.borderRadius} ${props.theme.palette.borderRadius}`};
    box-shadow: 2px 0 0 2px rgba(0, 0, 0, .2);
    font-size: 18px;
    
    &.mobile {
        position: ${props => props.isMobileAbsolute ? 'absolute' : 'fixed'};
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        width: unset;
        height: unset;
        padding: 12px;
        font-size: 24px;
        
        &:before {
            content: '';
            position: absolute;
            left: 11px;
            top: 11px;
            right: 11px;
            bottom: 11px;
            border: 1px solid ${props => props.theme.palette.clrBorder};
            border-radius: ${props => props.theme.palette.borderRadius};
        }
    }
    
    &.fullscreen {
        position: fixed;
        left: 12px;
        top: 15px;
        bottom: 16px;
        width: calc(33% - 4px);
        min-width: 390px;
        height: unset !important;
    }
`;

class CurrencyDropdown extends Component {
    state = {
        searchValue: '',
        tableItems: [],
        scrollTop: 0,
    };

    searchValueRef = null;

    dropdownScrollRef = null;

    componentDidMount() {
        this.updateTableItems(this.props);

        setTimeout(() => {
            if (this.searchValueRef) {
                this.searchValueRef.focus();
            }
        });
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.updateTableItems(nextProps);
    }

    handleScroll = ({ scrollTop }) => {
        this.setState({ scrollTop });
    };

    handleChangeSearchValue = e => {
        this.setState({
            searchValue: (e && e.target && e.target.value) || '',
        });

        setTimeout(this.updateTableItems);
    };

    handleSelectItem = (currency, symbol, price, isDefaultCrypto) => () => {
        this.props.setDefaultCurrency(currency, symbol, price, isDefaultCrypto);

        this.setState({ searchValue: '' });

        setTimeout(() => {
            // let newQuote = isDefaultCrypto ? this.props[STORE_KEYS.SETTINGSSTORE].defaultCryptoSymbol : 'F:' + this.props[STORE_KEYS.SETTINGSSTORE].defaultFiat;
            let newQuote = '';

            if (isDefaultCrypto) {
                newQuote = this.props[STORE_KEYS.SETTINGSSTORE].defaultCryptoSymbol;
            } else {
                newQuote = 'USDT';
            }

            this.props.setQuote(newQuote);
            this.props.addRecentQuote(newQuote);

            if (this.props.onChange) {
                this.props.onChange(currency, symbol, price, isDefaultCrypto);
            }
        });

        this.props.toggleDropDown(false);

        // setTimeout(() => {
        //     this.updateTableItems();
        // });
    };

    isCryptoSearched = (item, query) => {
        const lowerCaseQuery = query.toLowerCase();
        let symbolSrcStr;
        let nameSrcStr;

        try {
            symbolSrcStr = ((item.Coin && item.Coin.length) ? item.Coin : '').replace('F:', '').toLowerCase();
            nameSrcStr = ((item.Name && item.Name.length) ? item.Name : '').toLowerCase();
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

    isSearched = (item, query) => {
        const lowerCaseQuery = query.toLowerCase();
        let codeSrcStr;
        let nameSrcStr;

        try {
            codeSrcStr = ((item.code && item.code.length) ? item.code : '').toLowerCase();
            nameSrcStr = ((item.name && item.name.length) ? item.name : '').toLowerCase();
        } catch (e) {
            return -1;
        }

        if (!query) {
            return 999;
        }

        const symbolContains = codeSrcStr.includes(lowerCaseQuery);
        const nameContains = nameSrcStr.includes(lowerCaseQuery);

        const symbolWeight = Math.abs(lowerCaseQuery.length - codeSrcStr.length);
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

    updateTableItems = (propsInput) => {
        const { searchValue } = this.state;
        const { type, isMobile } = this.props;

        let activeOptionIdx = 0;
        let tableItems = [];
        if (type !== 'crypto' && currencyList && currencyList.length) {
            const items = currencyList;
            for (let i = 0; i < items.length; i++) {
                const weight = this.isSearched(items[i], searchValue);

                if (weight >= 0) {
                    tableItems.push({
                        weight,
                        value: items[i],
                    });
                }
            }

            tableItems = sortBy(tableItems, item => item.weight).map(item => ({
                ...item.value,
                isCrypto: false,
            }));

            activeOptionIdx = tableItems.findIndex(item => item.code === this.props.value);
        }

        let props = propsInput || this.props;
        let cryptoTable = [];
        if (type !== 'fiat' && props && props.portfolioData && props.portfolioData.length) {
            const portfolioData = props.portfolioData;
            for (let i = 0; i < portfolioData.length; i++) {
                try {
                    if (!portfolioData[i].Coin.startsWith('F:') && portfolioData[i].coin !== 'USDT') {
                        const weight = this.isCryptoSearched(portfolioData[i], searchValue);
                        if (weight >= 0) {
                            cryptoTable.push({
                                weight,
                                value: portfolioData[i],
                            });
                        }
                    }
                } catch (e) {
                    console.log(e);
                }
            }

            cryptoTable = sortBy(cryptoTable, item => item.weight).map(item => ({
                ...item.value,
                isCrypto: true,
            }));
            activeOptionIdx = cryptoTable.findIndex(item => item.Name === this.props.value);
        }

        this.setState({ tableItems: tableItems.concat(cryptoTable) }, () => {
            this.dropdownScrollRef.scrollTop = activeOptionIdx * (isMobile ? 80 : 60);
        });
    };

    itemCellRenderer = ({ rowData }) => {
        const { value, isMobile } = this.props;
        const { searchValue } = this.state;

        if (rowData.isCrypto) {
            const isSelected = rowData.Name === value;
            const coinSymbol = rowData.Coin.replace('F:', '');
            return (
                <ListItem
                    className={isSelected ? 'active' : ''}
                    isMobile={isMobile}
                    onClick={this.handleSelectItem(rowData.Name, coinSymbol, rowData.Price || 0, true)}
                >
                    <CoinIcon value={coinSymbol} size={28}/>&nbsp;&nbsp;
                    <div className="bigger">{highlightSearchDom(rowData.Coin.replace('F:', ''), searchValue)} - {highlightSearchDom(rowData.Name, searchValue)}</div>
                </ListItem>
            );
        }

        const isSelected = rowData.code === value;
        return (
            <ListItem
                className={isSelected ? 'active' : ''}
                isMobile={isMobile}
                onClick={this.handleSelectItem(rowData.code, rowData.symbol, 1, false)}
            >
                <img src={`/img/icons-coin/${rowData.code.toLowerCase()}.png`} className="flag" alt=""/>
                <div className="bigger">{highlightSearchDom(rowData.symbol, searchValue)} - {highlightSearchDom(rowData.code, searchValue)} ({highlightSearchDom(rowData.name, searchValue)})</div>
            </ListItem>
        );
    };

    render() {
        const { searchValue, tableItems, scrollTop } = this.state;
        const {
            w, h, isChild, hasBorder, alignTop, alignLeft, alignRight, isDisabled, isMobile, isMobileAbsolute, isFullScreen,
        } = this.props;

        return (
            <Dropdown
                width={w || 350}
                height={h}
                isChild={isChild}
                hasBorder={hasBorder}
                alignTop={alignTop}
                alignLeft={alignLeft}
                alignRight={alignRight}
                className={`${isMobile ? 'mobile' : (isFullScreen ? 'fullscreen' : '')}`}
                isMobileAbsolute={isMobileAbsolute}
            >
                <SearchInputWrapper isMobile={isMobile} isBigger>
                    <SearchIcon isMobile={isMobile}/>
                    <FormattedMessage
                        id="settings.search_placeholder"
                        defaultMessage="Search..."
                    >
                        {placeholder =>
                            <SearchInput
                                isBigger
                                innerRef={ref => this.searchValueRef = ref}
                                value={searchValue}
                                readOnly={isDisabled}
                                onChange={this.handleChangeSearchValue}
                                isMobile={isMobile}
                                placeholder={placeholder}
                            />
                        }
                    </FormattedMessage>

                </SearchInputWrapper>

                <ItemList>
                    <AutoSizer>
                        {({ width, height }) => (
                            <ListStyleWrapper
                                width={width}
                                height={height}
                                isMobile={isMobile}
                                length={tableItems.length}
                            >
                                <PerfectScrollbar
                                    option={{
                                        suppressScrollX: true,
                                        minScrollbarLength: 50,
                                    }}
                                    onScrollY={this.handleScroll}
                                    containerRef={ref => this.dropdownScrollRef = ref}
                                >
                                    <Table
                                        autoHeight
                                        width={width}
                                        height={height}
                                        headerHeight={0}
                                        disableHeader
                                        rowCount={tableItems.length}
                                        rowGetter={({ index }) => tableItems[index]}
                                        rowHeight={isMobile ? 80 : 60}
                                        overscanRowCount={0}
                                        scrollTop={scrollTop}
                                    >
                                        <Column
                                            width={width}
                                            dataKey="Dropdown"
                                            cellRenderer={this.itemCellRenderer}
                                        />
                                    </Table>
                                </PerfectScrollbar>
                            </ListStyleWrapper>
                        )}
                    </AutoSizer>
                </ItemList>
            </Dropdown>
        );
    }
}

const withStore = compose(
    inject(
        STORE_KEYS.YOURACCOUNTSTORE,
        STORE_KEYS.SETTINGSSTORE,
        STORE_KEYS.INSTRUMENTS,
    ),
    observer,
    withProps(
        ({
            [STORE_KEYS.YOURACCOUNTSTORE]: {
                portfolioData,
            },
            [STORE_KEYS.SETTINGSSTORE]: {
                setDefaultCurrency,
                defaultFiat,
                defaultCryptoSymbol,
            },
            [STORE_KEYS.INSTRUMENTS]: {
                setQuote,
                addRecentQuote,
            },
        }) => ({
            portfolioData,
            setDefaultCurrency,
            defaultFiat,
            defaultCryptoSymbol,
            setQuote,
            addRecentQuote,
        })
    )
);

export default withStore(CurrencyDropdown);
