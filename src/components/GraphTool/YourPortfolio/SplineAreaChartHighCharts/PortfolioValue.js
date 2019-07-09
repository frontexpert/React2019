import React, { Component } from 'react';
import { format2DigitString } from '../../../../utils';
import { Prices, LastChange } from './Components';
import CurrencyDropdownWithSymbol from '../../../../components-generic/CurrencyDropdown/CurrencyDropdownWithSymbol';

class PortfolioValue extends Component {
    state = {};

    render() {
        const {
            lastPortfolioValue, lastPortfolioValueChange, isActiveState,
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

        // let lastChangeStr = format2DigitString(PortfolioTotalValueChange);
        let lastChangeStr = format2DigitString(lastPortfolioValueChange);
        let lastChangePrice = '0';
        let lastChangePriceDecimal = '0';
        try {
            lastChangePrice = lastChangeStr.split('.')[0];
            lastChangePriceDecimal = lastChangeStr.split('.')[1];
        } catch (e) {
            lastChangePrice = '0';
            lastChangePriceDecimal = '0';
        }

        const lastChangeClassName = `lastChange ${lastChangePrice.indexOf('-') > -1 ? 'negative' : 'positive'}`;

        return (
            <Prices>
                {lastPrice.indexOf('-') > -1 && '-'}

                <CurrencyDropdownWithSymbol
                    alignRight={false}
                    coinSize={25}
                    showFiat={false}
                    symbolSize={33}
                />

                {lastPrice.indexOf('-') > -1 ? lastPrice.substr(1) : lastPrice}

                <span>.{lastPriceDecimal}</span>

                {isActiveState && (
                    <LastChange className={lastChangeClassName} lastChange={lastPortfolioValueChange}>
                        {lastChangePrice.indexOf('-') > -1 ? '-' : '+'}$
                        {lastChangePrice.indexOf('-') > -1 ? lastChangePrice.substr(1) : lastChangePrice}
                        <span>.{lastChangePriceDecimal}</span>
                    </LastChange>
                )}
            </Prices>
        );
    }
}

export default PortfolioValue;
