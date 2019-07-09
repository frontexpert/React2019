import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import { STORE_KEYS } from '../../../../stores/index';
import { IconWrapper, SelectedItem } from './Components';
import CurrencyDropdown from '../../../../components-generic/CurrencyDropdown/index';
import CoinIcon from '../../../../components-generic/CoinIcon/index';

class CurrencySelector extends Component {
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
        this.setState(prevState => ({
            isOpen: (typeof isOpen === 'boolean') ? isOpen : !prevState.isOpen,
        }));
    };

    render() {
        const { isOpen } = this.state;
        const {
            width, height, type, onClick,
        } = this.props;
        const {
            isDefaultCrypto, defaultFiat, defaultFiatSymbol, defaultCrypto, defaultCryptoSymbol,
        } = this.props[STORE_KEYS.SETTINGSSTORE];

        const isFiat = (type === 'fiat') || (type === 'currency' && !isDefaultCrypto);
        const value = isFiat ? defaultFiat : defaultCrypto;

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
                    {isFiat ? (
                        <span>{defaultFiatSymbol}</span>
                    ) : (
                        <CoinIcon value={defaultCryptoSymbol} size={65}/>
                    )}
                </SelectedItem>

                {isOpen && (
                    <CurrencyDropdown
                        hasBorder
                        alignRight
                        w={width}
                        h={height}
                        type={type}
                        value={value}
                        toggleDropDown={this.toggleDropDown}
                    />
                )}
            </IconWrapper>
        );
    }
}

export default inject(
    STORE_KEYS.SETTINGSSTORE,
)(observer(CurrencySelector));
