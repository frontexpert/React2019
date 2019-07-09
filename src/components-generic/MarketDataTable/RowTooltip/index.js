import React, { memo } from 'react';
import { Tooltip } from 'react-tippy';
import { compose } from 'recompose';
import { inject } from 'mobx-react';

import { formatString } from '@/utils';
import { STORE_KEYS } from '@/stores';
import { BuyArrowIcon, SellArrowIcon } from '@/components-generic/ArrowIcon'

import { CellTooltipItem } from './styles';

const CellWithTooltip = memo(({
    rowCount, isBuy, price, exchange, index, total, bestPrice, tableHeight, style, children, priceFractionDigits
}) => {
    const sellExchanges = exchange.split(',');
    const exchanges = isBuy ? sellExchanges.reverse() : sellExchanges;
    const tooltipHeight = 22 * exchanges.length + 10;

    const tooltipY = (isBuy ? 1 : -1) * (tooltipHeight / 2 - (isBuy ? index : rowCount - index - 1) * 32);
    const bestPriceValue = index === rowCount - 1 ? bestPrice : total;

    const diff = Math.abs(bestPriceValue - price);
    const diffPerExchange = exchanges.length > 1 ? (diff / (exchanges.length - 1)) : diff;
    const direction = isBuy ? 1 : -1;

    const diffExchanges = () => {
        return exchanges.map((val, idx) => {
            const isOwnPriceIdx = !idx;
            const alpha = 1 - idx / ( 1.5 * (exchanges.length || 1));
            const exchangePrice = price + (direction * diffPerExchange * idx);
            return (
                <CellTooltipItem
                    key={idx}
                    isBuy={isBuy}
                    isOwnPriceIdx={isOwnPriceIdx}
                >
                    <span className={`exchange-list-item ${isOwnPriceIdx && 'own-price'}`} style={{ opacity: alpha }}>{val}</span>
                    {!idx && (isBuy ? <BuyArrowIcon className='alt-arrow' /> : <SellArrowIcon className='alt-arrow' />)}
                    <span className={`right-value ${isOwnPriceIdx && 'own-price'}`} style={{ opacity: alpha }}>{formatString(exchangePrice, priceFractionDigits, true)}</span>
                </CellTooltipItem>
            );
        })
    }

    return (
        <Tooltip
            arrow={true}
            animation="fade"
            position="right"
            placement="right"
            theme="bct"
            className="full-width d-flex align-items-center justify-content-end row-wrapper"
            style={style}
            html={
                <ul className="advanced-tooltip text-left">
                    {isBuy ? diffExchanges().reverse() : diffExchanges()}
                </ul>
            }
            popperOptions={{
                modifiers: {
                    preventOverflow: { enabled: true },
                    flip: { enabled: true },
                    hide: { enabled: false },
                },
            }}
        >
            {children}
        </Tooltip>
    );
});

export default compose(
    inject(stores => ({
        bestPrice: stores[STORE_KEYS.PRICECHARTSTORE].price,
    }))
)(CellWithTooltip);
