import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Column, Table, AutoSizer } from 'react-virtualized';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { compose, withProps } from 'recompose';
import { inject, observer } from 'mobx-react';
import { FormattedMessage } from 'react-intl';
import { STORE_KEYS } from '../../../stores';

import {
    Wrapper, Modal,
    Header, Close,
    List, StyleWrapper, LabelAPI,
    Item, Logo, Name, Link, Check, BackButton, BackIcon
} from './Components';
import { Ex } from '../icons';
import { mockData } from './mock';
import { marginExchanges } from './margin-de-exchanges';

import ApiKeyModal from '../../ApiKeyModal';

class ExchangePop extends Component {
    state = {
        scrollTop: 0,
        selected: [],
    };

    componentDidMount() {
        // document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        // document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside = (event) => {
        if (this.modalRef && !this.modalRef.contains(event.target)) {
            this.props.toggle();
        }
    };

    handleScroll = ({ scrollTop }) => {
        this.setState({ scrollTop });
    };

    openKeyModal = (included, name) => {
        if (included) {
            this.apiKeyModal(name);
        }
    };

    cellRenderer = ({ rowData }) => {
        let isApiConnected = false;
        let isActive = true;

        if (this.props.exchanges && this.props.exchanges[rowData.name]) {
            const exchangeValue = this.props.exchanges[rowData.name];
            isApiConnected = exchangeValue && !!exchangeValue.enabled;
            isActive = exchangeValue && (typeof exchangeValue.active === 'undefined' ? true : exchangeValue.active);
        }

        const included = marginExchanges.includes(rowData.name);

        return (
            <Item>
                <Logo src={`/img/exchange/${rowData.icon}`} alt=""/>
                <Name
                    href={rowData.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    status={rowData.status}
                >
                    {rowData.name}
                    <span>{rowData.location !== '' ? '(' + rowData.location + ')' : ''}</span>
                </Name>
                {/* <Link href={rowData.link}/> */}
                {isApiConnected && (
                    <Check
                        checked={isActive}
                        onClick={() => this.props.setExchangeActive(rowData.name, !isActive)}
                    />
                )}

                <LabelAPI
                    included={included}
                    onClick={() => this.openKeyModal(included, rowData.name)}
                    isVerified={isApiConnected}
                >
                    API
                </LabelAPI>
            </Item>
        );
    };

    apiKeyModal = (exchange) => {
        this.props.Modal({
            portal: 'graph-chart-parent',
            additionalVerticalSpace: true,
            ModalComponentFn: () => <ApiKeyModal exchange={exchange}/>,
        });
        // this.props.toggle();
    };

    render() {
        const { scrollTop } = this.state;
        let data = mockData;

        return (
            <Modal innerRef={ref => { this.modalRef = ref; }} id="exchange-popup-wrapper">
                <Header>
                    <BackButton onClick={this.props.toggle}><BackIcon/></BackButton>
                    {/* <Ex/> */}
                    <span>
                        <FormattedMessage
                            id="sidebar.label_exchanges_live_data"
                            defaultMessage="Exchanges in Live Data Stream"
                        />
                    </span>
                    {/* <Close className="ml-auto" onClick={this.props.toggle}/> */}
                </Header>

                <List>
                    <AutoSizer>
                        {({ width, height }) => {
                            return (
                                <StyleWrapper width={width} height={height} length={data.length}>
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
                                            height={height}
                                            headerHeight={20}
                                            disableHeader={true}
                                            rowCount={data.length}
                                            rowGetter={({ index }) => data[index]}
                                            rowHeight={56}
                                            overscanRowCount={0}
                                            scrollTop={scrollTop}
                                        >
                                            <Column
                                                width={width}
                                                dataKey="Exchange"
                                                cellRenderer={this.cellRenderer}
                                            />
                                        </Table>
                                    </PerfectScrollbar>
                                </StyleWrapper>
                            );
                        }}
                    </AutoSizer>
                </List>
            </Modal>
        );
    }
}

const withStores = compose(
    inject(STORE_KEYS.MODALSTORE, STORE_KEYS.EXCHANGESSTORE),
    observer,
    withProps(
        ({
            [STORE_KEYS.MODALSTORE]: {
                Modal,
            },
            [STORE_KEYS.EXCHANGESSTORE]: {
                exchanges,
                setExchangeActive,
            },
        }) => ({
            Modal,
            exchanges,
            setExchangeActive,
        })
    )
);

export default withStores(ExchangePop);
