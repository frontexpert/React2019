import React from 'react';

import COIN_DATA_MAP from '../../../../mock/coin-data-map';

const CoinName = ({
    value, defaultFiat,
}) => {
    if (typeof value === 'string') {
        let symbol = (value || '').replace('F:', '');
        if (symbol === 'USDT') {
            symbol = defaultFiat;
        }
        return (COIN_DATA_MAP[value] && COIN_DATA_MAP[value].name)
            ? (
                <p className="exch-dropdown__title">
                    <span>{symbol}</span>
                </p>
            )
            : (
                <p className="exch-dropdown__title"><span>{symbol}</span></p>
            );
    }

    const symbol = ((value && value.symbol) ? value.symbol : '').replace('F:', '');
    return (value && value.name)
        ? (
            <p className="exch-dropdown__title">
                <span>{symbol}</span>
            </p>
        )
        : (
            <p className="exch-dropdown__title"><span>{symbol}</span></p>
        );

};
export default CoinName;
