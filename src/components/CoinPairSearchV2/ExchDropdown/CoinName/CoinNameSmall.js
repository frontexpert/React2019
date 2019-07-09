import COIN_DATA_MAP from '../../../../mock/coin-data-map';
import React from 'react';

const highlight = (src, search) => {
  if (!src || !search) {
    return src;
  }

  let regex = new RegExp(search, 'gi');
  let positions = [];
  src.replace(regex, (match, offset) => {
    positions.push(offset);
  });

  if (positions.length === 0) {
    return src;
  }

  let results = [];
  let endCursor = 0;

  for (let i = 0; i < positions.length; i++) {
    results.push(<React.Fragment key={i + 't'}>{src.substring(endCursor, positions[i])}</React.Fragment>);
    results.push(<span key={i + 's'}>{src.substring(positions[i], positions[i] + search.length)}</span>);
    endCursor = positions[i] + search.length;
  }

  results.push(src.substring(endCursor));
  return results;
};

const CoinNameSmall = ({ value, search }) => {
  if (typeof value === 'string') {
    return (COIN_DATA_MAP[value] && COIN_DATA_MAP[value].name)
      ? (
        <p className="exch-dropdown__title">{highlight(value, search)} - {highlight(COIN_DATA_MAP[value].name, search)}
        </p>
      )
      : (
        <p className="exch-dropdown__title">{highlight(value, search)}</p>
      );
  } else {
    return (value && value.name)
      ? (
        <p
          className="exch-dropdown__title">{highlight(value.symbol || value.name, search)} - {highlight(value.name, search)}
        </p>
      )
      : (
        <p className="exch-dropdown__title">{highlight((value && value.symbol) ? value.symbol : '', search)}</p>
      );
  }
};

export default CoinNameSmall;