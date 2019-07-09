import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { AutoSizer, Table, Column } from 'react-virtualized';
import PerfectScrollbar from 'react-perfect-scrollbar';
import sortBy from 'lodash/sortBy';

import { highlightSearchDom } from '../../../../utils/index';
import { IconWrapper, Dropdown, SelectedItem } from './Components';
import { LanguageIcon } from '../icons/index';
import {
    ItemList, ListItem, ListStyleWrapper,
    SearchIcon, SearchInput, SearchInputWrapper
} from '../../../../components-generic/SelectDropdown/Components';

class LanguageDropdown extends Component {
    state = {
        searchValue: '',
        isOpen: false,
        scrollTop: 0,
        tableItems: [],
    };

    wrapperRef = null;
    searchValueRef = null;

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
        this.updateTableItems(this.props);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.updateTableItems(nextProps);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside = (event) => {
        if (this.state.isOpen && this.wrapperRef && this.wrapperRef.contains && !this.wrapperRef.contains(event.target)) {
            this.setState({
                isOpen: false,
            });
        }
    };

    handleChangeSearchValue = e => {
        this.setState({
            searchValue: (e && e.target && e.target.value) || '',
        });

        setTimeout(this.updateTableItems);
    };

    toggleDropDown = isOpen => {
        this.setState(prevState => ({
            isOpen: (typeof isOpen === 'boolean') ? isOpen : !prevState.isOpen,
        }));

        setTimeout(() => {
            if (this.searchValueRef && this.state.isOpen) {
                this.searchValueRef.focus();
            }
        });
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

            this.toggleDropDown(false);

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

    itemCellRenderer = ({ rowData }) => {
        const isSelected = rowData === this.props.value;

        return (
            <ListItem
                className={isSelected ? 'active' : ''}
                onClick={() => { this.handleSelectItem(rowData); }}
            >
                {highlightSearchDom(rowData, this.state.searchValue)}
            </ListItem>
        );
    };

    render() {
        const { value, onClick } = this.props;

        const {
            searchValue,
            isOpen,
            scrollTop,
            tableItems,
        } = this.state;

        return (
            <IconWrapper
                innerRef={ref => this.wrapperRef = ref}
                className={isOpen ? '' : 'close'}
            >
                <SelectedItem
                    onClick={() => {
                        this.toggleDropDown();

                        if (onClick) {
                            onClick();
                        }
                    }}
                >
                    <LanguageIcon/>
                </SelectedItem>

                {isOpen && (
                    <Dropdown alignRight>
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

                        <ItemList>
                            <AutoSizer>
                                {({ width, height }) => (
                                    <ListStyleWrapper
                                        width={width}
                                        height={height}
                                        length={tableItems.length}
                                    >
                                        <PerfectScrollbar
                                            option={{
                                                suppressScrollX: true,
                                                minScrollbarLength: 50,
                                            }}
                                            onScrollY={this.handleScroll}
                                        >
                                            <Table
                                                autoHeight
                                                width={width}
                                                height={height}
                                                headerHeight={0}
                                                disableHeader
                                                rowCount={tableItems.length}
                                                rowGetter={({ index }) => tableItems[index]}
                                                rowHeight={40}
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
                )}
            </IconWrapper>
        );
    }
}

export default LanguageDropdown;
