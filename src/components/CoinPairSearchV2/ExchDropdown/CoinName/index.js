import COIN_DATA_MAP from '../../../../mock/coin-data-map';
import React from 'react';

const CoinName = ({ value }) => {
  if (typeof value === 'string') {
    return (COIN_DATA_MAP[value] && COIN_DATA_MAP[value].name)
      ? (
        <p className="exch-dropdown__title"><span>{value}</span><br/> {COIN_DATA_MAP[value].name} </p>
      )
      : (
        <p className="exch-dropdown__title"><span>{value}</span></p>
      );
  } else {
    return (value && value.name)
      ? (
        <p className="exch-dropdown__title"><span>{value.symbol || value.name}</span><br/> {value.name} </p>
      )
      : (
        <p className="exch-dropdown__title"><span>{(value && value.symbol) ? value.symbol : ''}</span></p>
      );
  }
};
export default CoinName;