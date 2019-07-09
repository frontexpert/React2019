import React, { Component } from 'react';
import { Column, Table, AutoSizer } from 'react-virtualized';
import PerfectScrollbar from 'react-perfect-scrollbar';

import {
    Wrapper,
    Header,
    ModalBody,
    TableWrapper,
    TableHeader,
    TableHeaderColumn,
    ExchangeLogo,
    ExchangeName,
    ExchangeAPILink,
    BalanceAmount,
    IncludeCheckWrap
} from './Components';
import CheckBox from './CheckBox';

import mockData from './mock';

class CombinedBalanceModal extends Component {
    state = {
        scrollTop: 0,

        data: mockData,
    };

    handleScroll = ({ scrollTop }) => {
        this.setState({ scrollTop });
    };

    changeValue = field => value => {
        this.setState({
            [field]: value,
        });
    };

    exchangeCellRenderer = ({ rowData }) => {
        return (
            <React.Fragment>
                <ExchangeLogo src={`/img/exchange/${rowData.icon}`}/>
                <ExchangeName>{rowData.name}</ExchangeName>
                <ExchangeAPILink>API</ExchangeAPILink>
            </React.Fragment>
        );
    };

    balanceCellRenderer = ({ rowData }) => {
        return (
            <React.Fragment>
                <BalanceAmount>1.00 <span>BTC</span></BalanceAmount>
            </React.Fragment>
        );
    };

    includeCellRenderer = ({ rowData, index }) => {
        return (
            <React.Fragment>
                <IncludeCheckWrap>
                    <CheckBox
                        isChecked={rowData.status === 'active'}
                    />
                </IncludeCheckWrap>
            </React.Fragment>
        );
    };

    render() {
        const { scrollTop, data } = this.state;

        return (
            <Wrapper>
                <Header>
                    <span className="title">
                        Combined Balance 1.00<span className="unit">USDT</span>
                    </span>
                </Header>

                <ModalBody>
                    <AutoSizer>
                        {({ width, height }) => (
                            <React.Fragment>
                                <TableHeader width={width} height={46}>
                                    <TableHeaderColumn width={width * .42}>
                                        Exchange <br/>Name
                                    </TableHeaderColumn>
                                    <TableHeaderColumn width={width * .31}>
                                        Available <br/>Balance
                                    </TableHeaderColumn>
                                    <TableHeaderColumn width={width * .27}>
                                        Include in <br/>trades
                                    </TableHeaderColumn>
                                </TableHeader>
                                <TableWrapper width={width} height={height - 46}>
                                    <PerfectScrollbar
                                        option={{
                                            suppressScrollX: true,
                                            minScrollbarLength: 50,
                                        }}
                                        onScrollY={this.handleScroll}
                                    >
                                        <Table
                                            autoHeight={true}
                                            width={width}
                                            height={height - 46}
                                            headerHeight={0}
                                            disableHeader={true}
                                            rowCount={data.length}
                                            rowGetter={({ index }) => data[index]}
                                            rowHeight={30}
                                            overscanRowCount={0}
                                            scrollTop={scrollTop}
                                        >
                                            <Column
                                                width={width * .42}
                                                dataKey="Exchange"
                                                cellRenderer={this.exchangeCellRenderer}
                                            />
                                            <Column
                                                width={width * .31}
                                                dataKey="Balance"
                                                cellRenderer={this.balanceCellRenderer}
                                            />
                                            <Column
                                                width={width * .27}
                                                dataKey="Include"
                                                cellRenderer={this.includeCellRenderer}
                                            />
                                        </Table>
                                    </PerfectScrollbar>
                                </TableWrapper>
                            </React.Fragment>
                        )}
                    </AutoSizer>
                </ModalBody>
            </Wrapper>
        );
    }
}

export default CombinedBalanceModal;
