import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';

import { STORE_KEYS } from '../../stores';
import CurrencyDropdown from './index';
import { SelectedItem } from '../../components/PayApp/PayWindow/Header/Components';
import { CoinIcon, BTCFontIcon } from '../CoinIcon';

class CurrencyDropdownWithSymbol extends Component {
    state = {
        isOpen: false,
    };

    wrapperRef = null;

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
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

    toggleDropDown = isOpen => {
        const {
            isClickable = true,
        } = this.props;

        if (isClickable) {
            this.setState(prevState => ({
                isOpen: (typeof isOpen === 'boolean') ? isOpen : !prevState.isOpen,
            }));
        }

        setTimeout(() => {
            if (this.props.onToggleDropdown) {
                this.props.onToggleDropdown(this.state.isOpen);
            }
        });
    };

    render() {
        const { isOpen } = this.state;
        const {
            isColorfulToggle = false,
            isChild = false,
            isDisabled = false,
            isMobile = false,
            isMobileAbsolute = false,
            type = 'currency',
            hasBorder = true,
            alignLeft = false,
            alignRight = true,
            alignTop = true,
            width = 350,
            height = 500,
            maxHeight,
            coinSize = 35,
            onChange,
            showFiat,
            symbolSize,
            symbol = false,
            disableCrypto,
        } = this.props;
        const {
            defaultFiat, defaultFiatSymbol, defaultCrypto, defaultCryptoSymbol, isDefaultCrypto,
        } = this.props[STORE_KEYS.SETTINGSSTORE];

        const isFiat = (type === 'fiat') || (type === 'currency' && !isDefaultCrypto);
        const value = isFiat ? defaultFiat : defaultCrypto;

        const refreshHeight = height > (maxHeight - 100) ? (maxHeight - 100) : height;

        return (
            <div
                ref={ref => this.wrapperRef = ref}
                className="dropdown-wrapper btc-wrapper"
                style={this.props.style}
            >
                <SelectedItem isChild onClick={this.toggleDropDown} size={symbolSize} isColorfulToggle={isColorfulToggle}>
                    {isFiat ? (
                        <Fragment>
                            {showFiat && (
                                <span className="fiat-label">{value}</span>
                            )}
                            {symbol ? <span className="CurrencySymbol">{defaultFiat}</span> : <span>{defaultFiatSymbol}</span>}
                        </Fragment>
                    ) : (/* defaultCryptoSymbol === 'BTC' ? <BTCFontIcon /> : */(
                        /* <CoinIcon value={defaultCryptoSymbol} size={coinSize}/> */
                        <span className="CurrencySymbol">{defaultCryptoSymbol}</span>
                    ))}
                </SelectedItem>

                {isOpen && (
                    <CurrencyDropdown
                        isChild={isChild}
                        isMobile={isMobile}
                        isMobileAbsolute={isMobileAbsolute}
                        hasBorder={hasBorder}
                        alignLeft={alignLeft}
                        alignRight={alignRight}
                        alignTop={alignTop}
                        w={width}
                        h={refreshHeight}
                        type={type}
                        value={value}
                        toggleDropDown={this.toggleDropDown}
                        isDisabled={isDisabled}
                        onChange={onChange}
                        disableCrypto={disableCrypto}
                    />
                )}
            </div>
        );
    }
}

export default inject(
    STORE_KEYS.SETTINGSSTORE,
)(observer(CurrencyDropdownWithSymbol));
