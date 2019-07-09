import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';

import CoinIcon from './CoinIcon';
import CoinName from './CoinName';
import CoinNameSmall from './CoinName/CoinNameSmall';

class ExchDropdown extends React.PureComponent {
    constructor(props) {
        super(props);
        this.perfectScrollRef = null;
        this.inputRef = null;
    }

    state = {
        isOpen: false,
        isScrollTopVisible: false,
        searchInputValue: '',
    };

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    onChangeSearchInputValue = (e) => {
        this.setState({
            searchInputValue: e.target.value,
        });
        window.dropDownFocusIndex = 0;
    };

    onSelectItem = (value) => {
        this.toggleDropdown();
        this.props.onChange(value);
    };

    setWrapperRef = (node) => {
        this.wrapperRef = node;
    };

    handleClickOutside = (event) => {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.setState({
                isOpen: false,
            });
        }
    };

    toggleDropdown = () => {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen,
            searchInputValue: '',
        }));

        window.dropDownFocusIndex = 0;
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

    handleScrollReachedStart = () => {
        this.setState({
            isScrollTopVisible: false,
        });
    };

    handleScrollY = () => {
        this.setState({
            isScrollTopVisible: !!this.perfectScrollRef.scrollTop,
        });
    };

    handleKeyDown = (e) => {
        if (!this.state.isOpen) {
            return;
        }

        // Handle keyboard Arrow event
        const key = ['ArrowUp', 'Middle', 'ArrowDown'].indexOf(e.key);
        if (key !== -1 && this.itemRefs && this.itemRefs.length) {
            e.preventDefault();
            const direction = key - 1;
            window.dropDownFocusIndex = (window.dropDownFocusIndex || 0) + direction;

            if (!window.dropDownFocusIndex) {
                window.dropDownFocusIndex = (this.itemRefs.length - 1) || 1;
            }
            if (window.dropDownFocusIndex >= (this.itemRefs.length)) {
                window.dropDownFocusIndex = 1;
            }

            if (this.itemRefs[window.dropDownFocusIndex]) {
                this.itemRefs[window.dropDownFocusIndex].focus();
            }
        }
    };

    isSearched = (item, query) => {
        const lowerCaseQuery = query.toLowerCase();

        return (item.symbol && item.symbol.length && item.symbol.toLowerCase().includes(lowerCaseQuery))
            || (item.name && item.name.length && item.name.toLowerCase().includes(lowerCaseQuery));
    };

    render() {
        const {
            isOpen,
            isScrollTopVisible,
            searchInputValue,
        } = this.state;

        const {
            value,
            topGroupLabel,
            openExchBar,
            mainItems,
            topGroupItems,
        } = this.props;

        let uniqueIndex = 0;
        this.itemRefs = [];

        let filteredTopGroupItems = topGroupItems.filter(x => this.isSearched(x, searchInputValue));
        let filteredMainGroupItems = mainItems.filter(x => this.isSearched(x, searchInputValue));

        return (
            <div
                className={'exch-dropdown ' + (isOpen ? 'open' : '')}
                ref={this.setWrapperRef}
                tabIndex="0"
                onKeyDown={this.handleKeyDown}
                onMouseEnter={() => {
                    openExchBar(false);
                }}
            >
                <div className="exch-dropdown__border">
                    <div className={'exch-dropdown__current ' + (isOpen ? 'hidden' : '')} onClick={this.toggleDropdown}>
                        <CoinIcon value={value}/>
                        <CoinName value={value}/>

                        <div className="exch-dropdown__handle">
                            <svg
                                className="sprite-icon"
                                role="img"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="15px"
                                height="8.9px"
                                viewBox="0 0 15 8.9"
                            >
                                <path
                                    className="st0"
                                    d="M7.5,8.9L0.3,1.7c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l5.8,5.8l5.8-5.8c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4L7.5,8.9z"
                                />
                            </svg>
                        </div>
                    </div>

                    <div className={'exch-search ' + (isOpen ? '' : 'hidden')}>

                        <svg className="exch-search__icon" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 100 100" x="0px" y="0px">
                            <path d="M38,76.45A38.22,38.22,0,1,1,76,38.22,38.15,38.15,0,0,1,38,76.45Zm0-66.3A28.08,28.08,0,1,0,65.84,38.22,28,28,0,0,0,38,10.15Z"/>
                            <rect x="73.84" y="54.26" width="10.15" height="49.42" transform="translate(-32.73 79.16) rotate(-45.12)"/>
                        </svg>
                        {/* <svg className="exch-search__icon" role="img" aria-hidden="true">
                            <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="img/sprite-basic.svg#search"/>
                        </svg> */}

                        <input
                            className="exch-search__input"
                            type="text"
                            placeholder="Type a currency or ticker"
                            value={searchInputValue}
                            onChange={this.onChangeSearchInputValue}
                            ref={el => {
                                this.inputRef = el;
                            }}
                        />

                        <div className="exch-dropdown__handle" onClick={this.toggleDropdown}>
                            <svg className="sprite-icon arrow" role="img" aria-hidden="true">
                                <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="img/sprite-basic.svg#arrow-drop-2"/>
                            </svg>
                            <svg className="sprite-icon close" role="img" aria-hidden="true">
                                <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="img/sprite-basic.svg#arrow-drop-close"/>
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="exch-dropdown__list">
                    <div
                        className={'scroll__scrollup' + (isScrollTopVisible ? '' : ' hide')}
                        onClick={() => this.scrollTop(300)}
                    >
                        <button className="scroll-up-button">
                            <svg className="sprite-icon" role="img" aria-hidden="true">
                                <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="img/sprite-basic.svg#arrow-up"/>
                            </svg>
                        </button>
                    </div>

                    <div className="exch-dropdown__scroll scroll-y scrollbar-right outer">
                        <PerfectScrollbar
                            containerRef={element => {
                                this.perfectScrollRef = element;
                            }}
                            onYReachStart={this.handleScrollReachedStart}
                            onScrollY={this.handleScrollY}
                            option={{
                                suppressScrollX: true,
                                minScrollbarLength: 30,
                            }}
                        >
                            {filteredTopGroupItems.length > 0 && (
                                <div className="exch-dropdown__list-title">{topGroupLabel}</div>
                            )}

                            {filteredTopGroupItems.map(val => {
                                uniqueIndex++;
                                const className = 'exch-dropdown__item' + (val.symbol === value ? ' current' : '')
                                    + (!val.enabled ? ' disabled' : '');
                                return (
                                    <button
                                        className={className}
                                        key={uniqueIndex}
                                        onClick={() => this.onSelectItem(val.symbol)}
                                        ref={((uniqueIndex) => el => {
                                            this.itemRefs[uniqueIndex] = el;
                                        })(uniqueIndex)}
                                    >
                                        <div className="overlay"/>
                                        <CoinIcon value={val}/> <CoinNameSmall value={val} search={searchInputValue}/>
                                    </button>
                                );
                            })}

                            <div className="exch-dropdown__list-title">All</div>

                            {filteredMainGroupItems.map(val => {
                                uniqueIndex++;
                                const className = 'exch-dropdown__item' + (val.symbol === value ? ' current' : '')
                                    + (!val.enabled ? ' disabled' : '');
                                return (
                                    <button
                                        className={className}
                                        key={uniqueIndex}
                                        onClick={() => this.onSelectItem(val.symbol)}
                                        ref={((uniqueIndex) => el => {
                                            this.itemRefs[uniqueIndex] = el;
                                        })(uniqueIndex)}
                                    >
                                        <div className="overlay"/>
                                        <CoinIcon value={val}/> <CoinNameSmall value={val} search={searchInputValue}/>
                                    </button>
                                );
                            })}
                        </PerfectScrollbar>
                    </div>
                </div>
            </div>
        );
    }
}

export default ExchDropdown;
