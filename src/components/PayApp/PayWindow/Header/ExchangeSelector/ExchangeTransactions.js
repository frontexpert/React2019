import React  from 'react';
import { Table, Column } from 'react-virtualized';
import sortBy from 'lodash/sortBy';
import isEqual from 'lodash/isEqual';
import moment from 'moment';

import { getItemColor, highlightSearchDom } from '../../../../../utils';
import { TransactionDetail } from '../Components';
import { ListItem } from '../../../../../components-generic/SelectDropdown/Components';
import { DefaultAvatar } from '../../../../SideBar/NewSettingsPop/Components';

class ExchangeTransactions extends React.Component {
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
        let srcStr = item.name ? item.name.toString().toLowerCase() : '';

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

    itemCellRenderer = ({ rowData }) => {
        const { value, searchValue } = this.props;
        const isSelected = rowData.name === value;

        let symbolName = '';
        const names = rowData.name.split(' ');
        if (names && names.length > 0) { symbolName = names[0][0] || ''; }
        if (names && names.length > 0) { symbolName += names[1][0] || ''; }

        return (
            <ListItem className="exchange-transaction-item">
                <DefaultAvatar color="#3269d1">
                    {symbolName.toUpperCase()}
                </DefaultAvatar>

                <TransactionDetail>
                    <div>
                        <div className="name">{highlightSearchDom(rowData.name, searchValue)}</div>
                        <div className="date">{moment(rowData.date).format('MMM D, YYYY H:mm A')}</div>
                    </div>

                    <div>
                        <div className="amount">{`${rowData.amount > 0 && '+'} $${rowData.amount}`}</div>
                        <div className="status">{rowData.status}</div>
                    </div>
                </TransactionDetail>
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

export default ExchangeTransactions;
