import React, { Component, Fragment } from 'react';
import { AutoSizer } from 'react-virtualized';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { withOrderFormToggleData } from '../../hocs/OrderFormToggleData';
import {
    IconWrapper, DropdownFullHeight, ItemList, ListStyleWrapper
} from './Components';
import ExchangeList from '../PayApp/PayWindow/Header/ExchangeSelector/ExchangeList';

class ExchangeListComponent extends Component {
    wrapperRef = null;
    perfectScrollRef = null;

    state = {
        scrollTop: 0,
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

    render() {
        const {
            marketExchanges,
            exchanges,
        } = this.props;

        const {
            searchValue,
            scrollTop,
            contentHeight,
            selectedMenu,
            selectedExchange,
        } = this.state;

        let items = [{
            name: 'Global',
        }];
        items = items.concat(marketExchanges);

        const isShowingHeaderRow = (selectedMenu === 'transaction') || (selectedMenu === 'trading');

        return (
            <IconWrapper
                innerRef={ref => this.wrapperRef = ref}
                className="exchange-wrapper"
            >
                <DropdownFullHeight
                    alignRight
                    width={this.props.width}
                    height={this.props.height}
                >
                    <ItemList>
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
                                        <ExchangeList
                                            width={this.props.width || width}
                                            height={this.props.height || height - (isShowingHeaderRow ? 110 : 0)}
                                            rowHeight={110}
                                            headerHeight={110}
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
                                    </PerfectScrollbar>
                                </ListStyleWrapper>
                            )}
                        </AutoSizer>
                    </ItemList>
                </DropdownFullHeight>
            </IconWrapper>
        );
    }
}

export default withOrderFormToggleData(ExchangeListComponent);
