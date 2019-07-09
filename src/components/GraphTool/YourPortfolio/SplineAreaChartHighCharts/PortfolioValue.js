import React, { Component } from 'react';
import { format2DigitString } from '../../../../utils';
import { Prices, LastChange } from './Components';
import CurrencyDropdownWithSymbol from '../../../../components-generic/CurrencyDropdown/CurrencyDropdownWithSymbol';
import { BTCFontIcon } from '../../../../components-generic/CoinIcon';

class PortfolioValue extends Component {
    state = {};

    render() {
        const {
            lastPortfolioValue, isDefaultCrypto, defaultFiatSymbol,
        } = this.props;
        const portfolioPrice = lastPortfolioValue;

        let lastPrice = '0';
        let lastPriceDecimal = '0';
        try {
            const lastPortfolioValueStr = format2DigitString(portfolioPrice);
            lastPrice = lastPortfolioValueStr.split('.')[0];
            lastPriceDecimal = lastPortfolioValueStr.split('.')[1];
        } catch (e) {
            lastPrice = '0';
            lastPriceDecimal = '0';
        }

        return (
            <Prices>

                {/* {isDefaultCrypto ? <BTCFontIcon /> : defaultFiatSymbol}
                {lastPrice.indexOf('-') > -1 && '-'}

                {lastPrice.indexOf('-') > -1 ? lastPrice.substr(1) : lastPrice}

                <span>.{lastPriceDecimal}</span> */}

                <CurrencyDropdownWithSymbol
                    isColorfulToggle={true}
                    alignRight={false}
                    coinSize={25}
                    showFiat={false}
                    symbolSize={33}
                    symbol={true}
                    style={{ position: 'absolute', right: '20px', top: '5px' }}
                />
            </Prices>
        );
    }
}

export default PortfolioValue;
