import React, { Fragment } from 'react';
import { Table, Column } from 'react-virtualized';
import sortBy from 'lodash/sortBy';
import isEqual from 'lodash/isEqual';
import { Tooltip } from 'react-tippy';
import { inject, observer } from 'mobx-react/index';

import { highlightSearchDom } from '../../../../../utils';
import { Logo, LogoWrapper } from '../Components';
import { ListItem } from '../../../../../components-generic/SelectDropdown/Components';
import { GlobalIcon } from '../../../../OrderTabs/Components';
import {
    Checkbox, InfoIcon, ApiIcon, TransactionIcon, TradingIcon, BalanceIcon
} from '../../icons';
import ApiKey from './ApiKey';

import { STORE_KEYS } from '../../../../../stores';

class ExchangeList extends React.Component {
    state = {
        tableItems: [],
    };

    componentDidMount() {
        this.updateTableItems(this.props);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (
            this.props.searchValue !== nextProps.searchValue
            || !isEqual(this.props.items, nextProps.items)
        ) {
            this.updateTableItems(nextProps);
        }
    }

    isSearched = (item, query) => {
        const lowerCaseQuery = query.toString().toLowerCase();
        let srcStr = item.name ? (item.name === 'Global' ? 'all' : item.name.toString().toLowerCase()) : '';

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
                const weight = this.isSearched(items[i], props.searchValue);

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

        this.props.setContentHeight(tableItems.length * props.rowHeight + props.headerHeight);
    };

    handleSelectItem = rowData => {
        if (rowData.name === 'Global') {
            this.props.setExchangeActive('Global', true);
            this.props.toggleDropDown();
        } else if (rowData.status === 'active') {
            this.props.selectExchangeActive(rowData.name);
        }
    };

    changeMenu = (menu) => (e) => {
        const { setReportMode } = this.props[STORE_KEYS.VIEWMODESTORE];

        e.stopPropagation();
        // this.props.changeMenu(menu);
        if (menu === 'transaction') {
            setReportMode(true);
        }
    };

    itemCellRenderer = ({ rowData }) => {
        const {
            value, items, searchValue, exchanges, selectedExchange, selectedMenu,
        } = this.props;

        const isSelected = rowData.name === value;
        let isApiConnected = false;
        let isActive = false;
        let isApiSynced = false;
        if (exchanges && exchanges[rowData.name]) {
            const exchangeValue = exchanges[rowData.name];
            isApiConnected = exchangeValue && !!exchangeValue.enabled;
            isActive = exchangeValue && exchangeValue.active;
            isApiSynced = exchangeValue && exchangeValue.apiSynced;
        }

        const isGlobal = rowData.name === 'Global';
        const name = (rowData.name === 'Global') ? 'All' : rowData.name;
        const isExchangeSelected = selectedExchange && selectedExchange.name === rowData.name;
        const activeExchange = isGlobal || (rowData.status === 'active');

        return (
            <ListItem
                className={`exchange-item${activeExchange ? '' : ' disabled'}`} // {isSelected ? 'exchange-item active' : 'exchange-item'}
                onClick={() => this.handleSelectItem(rowData)}
                onMouseLeave={() => { this.props.leaveMenu(); }}
                // onMouseLeave={this.props.toggleMenu}
            >
                {isGlobal
                    ? (
                        <GlobalIcon size={38} marginRight={15} color="#fff"/>
                    ) : (
                        <LogoWrapper size={38}>
                            <Logo src={`/img/exchange/${rowData.icon}`} alt=""/>
                        </LogoWrapper>
                    )
                }

                {highlightSearchDom(name, searchValue)}

                {!isExchangeSelected && <InfoIcon
                    marginLeft={15}
                    onMouseEnter={() => { this.props.toggleMenu(rowData); }}
                />}

                {isExchangeSelected && (
                    <Fragment style={{ marginTop: 7 }}>
                        <ApiIcon
                            marginLeft={5.5}
                            active={selectedMenu === 'api'}
                            isApiSynced={isApiSynced}
                            onClick={this.changeMenu('api')}
                        />

                        <Tooltip
                            arrow
                            animation="shift"
                            position="bottom"
                            // followCursor
                            theme="bct"
                            title="Your Access is Restricted to Level 1"
                            distance={30}
                            style={{ marginLeft: 15 }}
                        >
                            <TransactionIcon
                                // marginLeft={15}
                                active={selectedMenu === 'transaction'}
                                onClick={this.changeMenu('transaction')}
                            />
                        </Tooltip>

                        <Tooltip
                            arrow
                            animation="shift"
                            position="bottom"
                            // followCursor
                            theme="bct"
                            title="Your Access is Restricted to Level 1"
                            distance={30}
                            style={{ marginLeft: 15 }}
                        >
                            <TradingIcon
                                // marginLeft={15}
                                active={selectedMenu === 'trading'}
                                onClick={this.changeMenu('trading')}
                            />
                        </Tooltip>

                        <Tooltip
                            arrow
                            animation="shift"
                            position="bottom"
                            // followCursor
                            theme="bct"
                            title="Your Access is Restricted to Level 1"
                            distance={30}
                            style={{ marginLeft: 15 }}
                        >
                            <BalanceIcon
                                // marginLeft={15}
                                active={selectedMenu === 'balance'}
                                // onClick={this.changeMenu('balance')}
                            />
                        </Tooltip>
                    </Fragment>
                )}

                {activeExchange && (
                    <div
                        className="api-link"
                        onClick={(e) => { e.stopPropagation(); }}
                    >
                        <Checkbox
                            size={38}
                            active={isActive}
                            onClick={() => this.props.setExchangeActive(rowData.name, !isActive)}
                        />
                    </div>
                )}

                {selectedMenu === 'api' && isExchangeSelected && (
                    <ApiKey
                        selectedExchange={selectedExchange}
                        onClick={(e) => e.stopPropagation()}
                        onCloseHandler={() => this.props.toggleMenu(rowData)}
                    />
                )}
            </ListItem>
        );
    };

    render() {
        const { tableItems } = this.state;
        const {
            scrollTop, width, height, rowHeight, headerHeight,
        } = this.props;

        return(
            <Table
                autoHeight
                width={width}
                height={height}
                headerHeight={headerHeight}
                disableHeader
                rowCount={tableItems.length}
                rowGetter={({ index }) => tableItems[index]}
                rowHeight={rowHeight}
                overscanRowCount={0}
                scrollTop={scrollTop}
            >
                <Column
                    width={width}
                    dataKey="Dropdown"
                    cellRenderer={this.itemCellRenderer}
                />
            </Table>
        );
    }
}

export default inject(
    STORE_KEYS.VIEWMODESTORE,
)(observer(ExchangeList));
