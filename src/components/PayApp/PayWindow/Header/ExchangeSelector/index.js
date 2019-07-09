import React, { Component, Fragment } from 'react';
import PT from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { AutoSizer } from 'react-virtualized';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { withOrderFormToggleData } from '../../../../../hocs/OrderFormToggleData';
import {
    IconWrapper, DropdownFullHeight, SelectedItem,
    Logo, LogoWrapper, SearchIcon, ExchangeHeader
} from '../Components';
import {
    Checkbox, TransactionIcon, TradingIcon, BalanceIcon, ApiIcon
} from '../../icons';
import { GlobalIcon } from '../../../../OrderTabs/Components';
import {
    ItemList, ListStyleWrapper,
    SearchInput, SearchInputWrapper
} from '../../../../../components-generic/SelectDropdown/Components';
import ExchangeList from './ExchangeList';
import ExchangeTransactions from './ExchangeTransactions';
import { transactions } from './mock';

const HeaderRow = ({
    height, menu, changeMenu, selectedExchange,
}) => (
    <ExchangeHeader height={height}>
        <GlobalIcon size={38} marginRight={15} color="#fff" />

        <span>
            <FormattedMessage
                id="pay_app.pay_window.label_all"
                defaultMessage="All"
            />
        </span>

        {selectedExchange && (
            <Fragment>
                <ApiIcon
                    marginLeft={30}
                    active={menu === 'api'}
                    onClick={() => changeMenu('api')}
                />

                <TransactionIcon
                    marginLeft={15}
                    active={menu === 'transaction'}
                    onClick={() => changeMenu('transaction')}
                />

                <TradingIcon
                    marginLeft={15}
                    active={menu === 'trading'}
                    onClick={() => changeMenu('trading')}
                />

                <BalanceIcon
                    marginLeft={15}
                    active={menu === 'balance'}
                    onClick={() => changeMenu('balance')}
                />
            </Fragment>
        )}

        <Checkbox className="checkbox" marginRight={15} />
    </ExchangeHeader>
);

class ExchangeSelector extends Component {
    static propTypes = {
        onClick: PT.func,
    }

    static defaultProps = {
        onClick: () => {},
    }

    wrapperRef = null;
    searchValueRef = null;
    perfectScrollRef = null;

    state = {
        searchValue: '',
        isOpen: false,
        scrollTop: 0,
        selectedMenu: 'exchange',
        selectedExchange: null,
        contentHeight: 0,
    };


    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside = (event) => {
        if (this.state.isOpen && this.wrapperRef && this.wrapperRef.contains && !this.wrapperRef.contains(event.target) && !this.props.isApiKeyModalOpened) {
            this.setState({
                isOpen: false,
            });
        }
    };

    handleChangeSearchValue = e => {
        this.setState({
            searchValue: (e && e.target && e.target.value) || '',
        });
    };

    toggleDropDown = isOpen => {
        this.setState(prevState => ({
            isOpen: (typeof isOpen === 'boolean') ? isOpen : !prevState.isOpen,
        }));

        setTimeout(() => {
            if (this.searchValueRef && this.state.isOpen) {
                this.searchValueRef.focus();
            }

            if (this.state.isOpen) {
                this.handleScroll({ scrollTop: 0 });
                this.forceUpdate();
            }
        });
    };

    handleScroll = ({ scrollTop }) => {
        this.setState({ scrollTop });
    };

    setContentHeight = (contentHeight) => {
        this.setState({ contentHeight });
    };

    changeMenu = (menu) => {
        this.setState(prevState => {
            if (prevState.selectedMenu === menu) {
                return {
                    selectedMenu: 'exchange',
                };
            }

            return {
                selectedMenu: menu,
            };
        });
    };

    toggleMenu = (exchange) => {
        this.setState(prevState => {
            if (prevState.selectedExchange && prevState.selectedExchange.name === exchange.name) {
                return {
                    selectedExchange: null,
                    selectedMenu: 'exchange',
                };
            }

            return {
                selectedExchange: exchange,
                selectedMenu: 'exchange',
            };
        });
    };

    scrollTop = (duration = 300) => {
        const difference = this.perfectScrollRef.scrollTop || 0;
        const perTick = (difference / duration) * 10;

        setTimeout(() => {
            if (!this.perfectScrollRef) {
                return;
            }
            this.perfectScrollRef.scrollTop = this.perfectScrollRef.scrollTop - perTick;
            if (this.perfectScrollRef.scrollTop === 0) {
                return;
            }
            this.scrollTop(duration - 10);
        }, 10);
    };

    leaveMenu = () => {
        this.setState(() => {
            return {
                selectedExchange: null,
                selectedMenu: 'exchange',
            };
        });
    };

    selectExActive = (exch) => {
        this.props.selectExchangeActive(exch);
        this.setState({
            isOpen: false,
        });
    };

    handleClickIcon = () => {
        this.toggleDropDown();
        this.props.onClick();
    }

    render() {
        const {
            value, items, exchanges, isEnabled,
        } = this.props;

        const {
            searchValue,
            isOpen,
            scrollTop,
            contentHeight,
            selectedMenu,
            selectedExchange,
        } = this.state;

        let selectedTableItem = null;

        // Get selected Table Item
        let activeExchanges = 0;
        for (let i = 0; i < items.length; i++) {
            if (items[i].name !== 'Global' && exchanges[items[i].name] && exchanges[items[i].name].active) {
                activeExchanges++;
                selectedTableItem = items[i];
            }
        }

        const activeMarketExchanges = items.filter(m => m.status === 'active');
        const countExchange = (activeExchanges === 0) ? activeMarketExchanges.length : activeExchanges;
        if (this.props.value === 'Global' && activeExchanges === 0 && activeMarketExchanges.length === 1) {
            for (let i = 0; i < items.length; i++) {
                if (items[i].name !== 'Global' && items[i].status === 'active') {
                    selectedTableItem = items[i];
                }
            }
        }

        const selectedIcon = (selectedTableItem && selectedTableItem.icon) || null;
        const selectedName = (selectedTableItem && selectedTableItem.name) || null;

        const isShowingHeaderRow = (selectedMenu === 'transaction') || (selectedMenu === 'trading');

        return (
            <IconWrapper
                innerRef={ref => this.wrapperRef = ref}
                className={isOpen ? 'exchange-wrapper' : `exchange-wrapper${isEnabled ? ' close' : ''}`}
            >
                <SelectedItem
                    isEnabled={isEnabled}
                    onClick={this.handleClickIcon}
                >
                    {isEnabled ? (
                        this.props.value === 'Global' ? (
                            countExchange !== 1
                                ? <span className="exchange-name">{`${countExchange} Exchanges`}</span>
                                : (
                                    <Fragment>
                                        <LogoWrapper size={35}>
                                            <Logo src={`/img/exchange/${selectedIcon}`} alt="" />
                                        </LogoWrapper>
                                        <span className="exchange-name">{selectedName}</span>
                                    </Fragment>
                                )
                        ) : (
                            <span className="exchange-name">{this.props.value}</span>
                        )
                    ) : (
                        <span className="best-execution">Best Execution</span>
                    )}
                </SelectedItem>

                {isOpen && (
                    <DropdownFullHeight
                        alignRight
                        width={this.props.width}
                        height={this.props.height}
                    >
                        <SearchInputWrapper className="exchange-search">
                            <SearchIcon />

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

                        <ItemList isMarginTop>
                            <div
                                className={'scroll__scrollup' + (scrollTop ? '' : ' hide')}
                                onClick={() => this.scrollTop(300)}
                            >
                                <button className="scroll-up-button">
                                    <svg className="sprite-icon" role="img" aria-hidden="true">
                                        <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="img/sprite-basic.svg#arrow-up" />
                                    </svg>
                                </button>
                            </div>
                            <AutoSizer>

                                {({ width, height }) => (
                                    <ListStyleWrapper
                                        width={this.props.width || width}
                                        height={this.props.height - 62 || (height + 10)}
                                        contentHeight={contentHeight}
                                        isMarginTop
                                    >
                                        <PerfectScrollbar
                                            containerRef={element => {
                                                this.perfectScrollRef = element;
                                            }}
                                            option={{
                                                suppressScrollX: true,
                                                minScrollbarLength: 50,
                                            }}
                                            onScrollY={this.handleScroll}
                                        >
                                            {isShowingHeaderRow && (
                                                <HeaderRow
                                                    height={110}
                                                    menu={selectedMenu}
                                                    changeMenu={this.changeMenu}
                                                    selectedExchange={selectedExchange}
                                                />
                                            )}

                                            {(selectedMenu !== 'transaction') && (selectedMenu !== 'trading') && (
                                                <ExchangeList
                                                    width={this.props.width || width}
                                                    height={this.props.height || height - (isShowingHeaderRow ? 110 : 0)}
                                                    rowHeight={110}
                                                    headerHeight={110}
                                                    value={value}
                                                    searchValue={searchValue}
                                                    scrollTop={scrollTop}
                                                    items={items}
                                                    exchanges={exchanges}
                                                    setExchangeActive={this.props.setExchangeActive}
                                                    setExchangeApiSynced={this.props.setExchangeApiSynced}
                                                    selectExchangeActive={this.selectExActive}
                                                    toggleDropDown={this.toggleDropDown}
                                                    setContentHeight={this.setContentHeight}
                                                    toggleMenu={this.toggleMenu}
                                                    leaveMenu={this.leaveMenu}
                                                    changeMenu={this.changeMenu}
                                                    selectedMenu={selectedMenu}
                                                    selectedExchange={selectedExchange}
                                                />
                                            )}

                                            {selectedMenu === 'transaction' && (
                                                <ExchangeTransactions
                                                    width={this.props.width || width}
                                                    height={this.props.height || height - (isShowingHeaderRow ? 110 : 0)}
                                                    rowHeight={54}
                                                    headerHeight={110}
                                                    value={value}
                                                    items={transactions}
                                                    searchValue={searchValue}
                                                    scrollTop={scrollTop}
                                                    setContentHeight={this.setContentHeight}
                                                />
                                            )}
                                        </PerfectScrollbar>
                                    </ListStyleWrapper>
                                )}
                            </AutoSizer>
                        </ItemList>
                    </DropdownFullHeight>
                )}
            </IconWrapper>
        );
    }
}

export default withOrderFormToggleData(ExchangeSelector);
