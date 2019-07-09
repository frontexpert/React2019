import COIN_DATA_MAP from '../../../../mock/coin-data-map';
import React from 'react';

const CoinIcon = ({ value }) => {
	if (typeof value === 'string') {
		return (COIN_DATA_MAP[value] && COIN_DATA_MAP[value].file)
		? (
			<div className="exch-dropdown__icon coin-icon"
				style={{
					// background: `url('img/coin/${COIN_DATA_MAP[value].file}') no-repeat`,
					background: COIN_DATA_MAP[value].file.indexOf('svg') < 0 ? `url('img/coin/${COIN_DATA_MAP[value].file}') no-repeat`
					: `url('img/sprite-coins-view.svg#coin-${value.toLowerCase()}') no-repeat`,
				}}
			>
			</div>
		)
		: (
			<div className="exch-dropdown__icon no-icon">
			{(value && value.length) ? value.charAt(0) : ''}
			</div>
		);
	} else {
		return (value && value.file && value.symbol)
		? (
			<div className="exch-dropdown__icon coin-icon"
				style={{
					// background: `url('img/coin/${value.file}') no-repeat`,
					background: value.file.indexOf('svg') < 0 ? `url('img/coin/${value.file}') no-repeat`
					: `url('img/sprite-coins-view.svg#coin-${value.symbol.toLowerCase()}') no-repeat`,
				}}
			>
			</div>
		)
		: (
			<div className="exch-dropdown__icon no-icon">
			{(value && value.symbol && value.symbol.length) ? value.symbol.charAt(0) : ''}
			</div>
		);
	}
}
export default CoinIcon;