import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { FormattedMessage } from 'react-intl';
import { AutoSizer, Table, Column } from 'react-virtualized';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { STORE_KEYS } from '../../../stores';
import {
    Wrapper, Header, TableWrapper, Item
} from './Components';
import { currencyList } from '../../../components-generic/CurrencyDropdown/currencies';

class FiatModal extends Component {
    state = {
        scrollTop: 0,
    };

    componentDidMount() {
        this.list = currencyList;
        if (this.scrollRef) {
            this.scrollRef.scrollTop = 0;
            this.setState({
                scrollTop: 0,
            });
        }
    }

    handleScroll = ({ scrollTop }) => {
        this.setState({ scrollTop });
    };

    handleRowClick = ({ rowData }) => {
        const { [STORE_KEYS.SETTINGSSTORE]: { countries, setFiatCurrency } } = this.props;
        for (let i = 0; i < countries.length; i++) {
            if (countries[i].currencyCode === rowData.code) {
                setFiatCurrency(rowData.code);
                return;
            }
        }
    };

    countryCellRenderer = ({ rowIndex }) => {
        if (this.list[rowIndex].countries && this.list[rowIndex].countries.length > 0) {
            return (
                <Fragment>
                    {this.list[rowIndex].countries.map((country, index) => (
                        <Item x={country.posX} y={country.posY} key={index}>
                            {country.name}
                        </Item>
                    ))}
                </Fragment>
            );
        }

        return <Fragment/>;
    };

    getRowClassname = ({ index }) => {
        if (index === -1) {
            return '';
        }

        const { [STORE_KEYS.SETTINGSSTORE]: { countries, defaultFiat } } = this.props;
        // let include = false;
        // for (let i = 0; i < countries.length; i++) {
        //     if (countries[i].currencyCode === this.list[index].code) {
        //         include = true;
        //     }
        // }
        //
        // if (!include) {
        //     return 'disabled';
        // }

        return (this.list[index].code === defaultFiat) ? 'active' : '';
    };

    render() {
        const { scrollTop } = this.state;
        if (this.scrollRef && this.scrollRef.scrollTop !== scrollTop) {
            this.scrollRef.scrollTop = scrollTop;
        }

        const { [STORE_KEYS.SETTINGSSTORE]: { countries, defaultFiat } } = this.props;

        this.list = [];
        for (let j = 0; j < currencyList.length; j++) {
            let include = false;
            for (let i = 0; i < countries.length; i++) {
                if (countries[i].currencyCode === currencyList[j].code) {
                    include = true;
                }
            }
            if (include) {
                this.list.push(currencyList[j]);
            }
        }

        return (
            <Wrapper>
                <Header>
                    <div>
                        <FormattedMessage
                            id="modal.fiat.label_currency"
                            defaultMessage="Currency"
                        />
                    </div>
                    <div>
                        <FormattedMessage
                            id="modal.fiat.label_symbol"
                            defaultMessage="Symbol"
                        />
                    </div>
                    <div>
                        <FormattedMessage
                            id="modal.fiat.label_name"
                            defaultMessage="Name"
                        />
                    </div>
                    <div>
                        <FormattedMessage
                            id="modal.fiat.label_country"
                            defaultMessage="Country"
                        />
                    </div>
                </Header>

                <AutoSizer>
                    {({ width, height }) => (
                        <TableWrapper width={width - 2} height={height - 47}>
                            <PerfectScrollbar
                                containerRef={ref => this.scrollRef = ref}
                                option={{
                                    suppressScrollX: true,
                                    minScrollbarLength: 50,
                                }}
                                onScrollY={this.handleScroll}
                            >
                                <Table
                                    autoHeight
                                    width={width - 2}
                                    height={height}
                                    headerHeight={0}
                                    disableHeader
                                    rowCount={this.list.length}
                                    rowGetter={({ index }) => this.list[index]}
                                    rowHeight={({ index }) => this.list[index].countries.length * 28 + 7}
                                    rowClassName={this.getRowClassname}
                                    overscanRowCount={0}
                                    scrollTop={scrollTop}
                                    onRowClick={this.handleRowClick}
                                >
                                    <Column
                                        width={width * 0.15}
                                        dataKey="code"
                                    />

                                    <Column
                                        width={width * 0.1}
                                        dataKey="symbol"
                                    />

                                    <Column
                                        width={width * 0.3}
                                        dataKey="name"
                                    />

                                    <Column
                                        width={width * 0.3}
                                        dataKey="name"
                                        cellRenderer={this.countryCellRenderer}
                                    />
                                </Table>
                            </PerfectScrollbar>
                        </TableWrapper>
                    )}
                </AutoSizer>
            </Wrapper>
        );
    }
}

export default inject(
    STORE_KEYS.SETTINGSSTORE,
)(observer(FiatModal));
