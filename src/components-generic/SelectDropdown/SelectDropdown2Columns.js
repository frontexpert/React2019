import React, { Component } from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { AutoSizer, Table, Column } from 'react-virtualized';
import PerfectScrollbar from 'react-perfect-scrollbar';
import sortBy from 'lodash/sortBy';

import { highlightSearchDom } from '../../utils';
import {
    IconWrapper, ItemList, ListStyleWrapper, LanguageIcon,
    SearchIcon, SearchInput, SearchInputWrapper, ListItem2
} from './Components';

const SelectedItem = styled.div`
    cursor: pointer !important;

    border: 1px solid ${props => props.theme.palette.clrPurple};
    border-radius: 50%;
    padding: 8px;

    ${props => props.isChild ? `
    ` : `
        display: flex;
        align-items: center;
        justify-content: center;
        width: 45px;
        height: 45px;

        span,
        img,
        .exch-dropdown__icon {
            width: 40px;
            height: 40px;
            margin: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 20px;
            color: ${props.theme.palette.clrPurple};
            cursor: pointer;
        }

        img {
            width: auto;
            height: auto;
            margin-left: 13px;
        }

        span.exchange {
            border: 0;
            pointer-events: none;
        }

        svg {
            width: 45px;
            height: 45px;
            fill: ${props.theme.palette.clrBorder};
        }

        span {
            border: 1px solid ${props.theme.palette.clrBorder};

            &:hover {
                background-color: ${props.theme.palette.clrBorder};
                color: ${props.theme.palette.clrHighContrast};
            }
        }
    `};

    &:hover {
        color: ${props => props.theme.palette.clrBlue};
    }
`;

const Dropdown = styled.div.attrs({ className: 'lang-dropdown' })`
    position: absolute;
    display: none;
    top: 60px;
    left: 1px;
    right: 1px;
    z-index: 100000;
    // width: 360px;
    // height: 442px;
    height: calc(100% - 61px);
    margin: 0;
    padding: 0;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    background: ${props => props.theme.palette.clrBackground};
    // border: 1px solid ${props => props.theme.palette.clrBorder};
    // border-radius: ${props => `0 0 ${props.theme.palette.borderRadius} ${props.theme.palette.borderRadius}`};
    box-shadow: 2px 0 0 2px rgba(0, 0, 0, .2);
    
    .ReactVirtualized__Table__row {
        border: none;
        
        &:hover {
            background: none;
        }
    }
`;

class SelectDropdown2Columns extends Component {
    state = {
        searchValue: '',
        scrollTop: 0,
        tableItems: [],
    };

    wrapperRef = null;
    searchValueRef = null;

    componentDidMount() {
        this.updateTableItems(this.props);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.updateTableItems(nextProps);
    }

    handleChangeSearchValue = e => {
        this.setState({
            searchValue: (e && e.target && e.target.value) || '',
        });

        setTimeout(this.updateTableItems);
    };

    handleScroll = ({ scrollTop }) => {
        this.setState({ scrollTop });
    };

    handleSelectItem = rowData => {
        if (this.props.onChange) {
            this.props.onChange(rowData);

            this.setState({
                searchValue: '',
                scrollTop: 0,
            });

            setTimeout(() => {
                this.updateTableItems();
            });
        }

        if (this.props.onSelect) {
            this.props.onSelect(rowData);
        }
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

    updateTableItems = propsInput => {
        let props = propsInput || this.props;
        let tableItems = [];

        if (props && props.items && props.items.length) {
            const items = props.items;
            for (let i = 0; i < items.length; i++) {
                const weight = this.isSearched(items[i], this.state.searchValue);

                if (weight >= 0) {
                    tableItems.push({
                        weight,
                        value: items[i],
                    });
                }
            }

            tableItems = sortBy(tableItems, item => item.weight).map(item => item.value);
        }

        this.setState({
            tableItems,
        });
    };

    itemCellRenderer = ({ cellData }) => {
        if (!cellData || !cellData.name) {
            return;
        }

        const isSelected = cellData.name === this.props.value;

        return (
            <ListItem2
                className={isSelected ? 'active' : ''}
                onClick={() => { this.handleSelectItem(cellData.name); }}
            >
                {highlightSearchDom(cellData.name, this.state.searchValue)}
            </ListItem2>
        );
    };

    render() {
        const {
            value,
            onClick,
            isSearchable = true,
        } = this.props;

        const {
            searchValue,
            scrollTop,
            tableItems,
        } = this.state;

        return (
            <IconWrapper
                innerRef={ref => this.wrapperRef = ref}
            >
                <SelectedItem
                    onClick={() => {
                        if (onClick) {
                            onClick();
                        }
                    }}
                >
                    <LanguageIcon/>
                </SelectedItem>

                <Dropdown alignRight>
                    {isSearchable && (
                        <SearchInputWrapper>
                            <SearchIcon/>
                            <FormattedMessage
                                id="settings.search_placeholder"
                                defaultMessage="Search..."
                            >
                                {placeholder =>
                                    <SearchInput
                                        value={searchValue}
                                        onChange={this.handleChangeSearchValue}
                                        placeholder={placeholder}
                                        innerRef={ref => { this.searchValueRef = ref; }}
                                    />
                                }
                            </FormattedMessage>
                        </SearchInputWrapper>
                    )}

                    <ItemList>
                        <AutoSizer>
                            {({ width, height }) => (
                                <ListStyleWrapper
                                    width={width}
                                    height={height}
                                    length={tableItems.length}
                                >
                                    <PerfectScrollbar
                                        className="d-flex"
                                        option={{
                                            suppressScrollX: true,
                                            minScrollbarLength: 50,
                                        }}
                                        onScrollY={this.handleScroll}
                                    >
                                        {/*
                                        {tableItems.map((item, index) => {
                                            if (index % 2 === 1) {
                                                return null;
                                            }

                                            return this.itemCellRenderer({ rowData: item });
                                        })}

                                        {tableItems.map((item, index) => {
                                            if (index % 2 === 0) {
                                                return null;
                                            }

                                            return this.itemCellRenderer({ rowData: item });
                                        })}
                                        */}

                                        <Table
                                            autoHeight
                                            width={width}
                                            height={height}
                                            headerHeight={0}
                                            disableHeader
                                            rowCount={Math.ceil(tableItems.length / 4)}
                                            rowGetter={({ index }) => [tableItems[index * 4], tableItems[index * 4 + 1], tableItems[index * 4 + 2], tableItems[index * 4 + 3]]}
                                            rowHeight={60}
                                            overscanRowCount={0}
                                            scrollTop={scrollTop}
                                        >
                                            <Column
                                                width={width}
                                                dataKey="Dropdown"
                                                cellDataGetter={({ rowData }) => rowData[0]}
                                                cellRenderer={this.itemCellRenderer}
                                            />
                                            <Column
                                                width={width}
                                                dataKey="Dropdown"
                                                cellDataGetter={({ rowData }) => rowData[1]}
                                                cellRenderer={this.itemCellRenderer}
                                            />
                                            <Column
                                                width={width}
                                                dataKey="Dropdown"
                                                cellDataGetter={({ rowData }) => rowData[2]}
                                                cellRenderer={this.itemCellRenderer}
                                            />
                                            <Column
                                                width={width}
                                                dataKey="Dropdown"
                                                cellDataGetter={({ rowData }) => rowData[3]}
                                                cellRenderer={this.itemCellRenderer}
                                            />
                                        </Table>
                                    </PerfectScrollbar>
                                </ListStyleWrapper>
                            )}
                        </AutoSizer>
                    </ItemList>
                </Dropdown>
            </IconWrapper>
        );
    }
}

export default SelectDropdown2Columns;
