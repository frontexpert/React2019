import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Tooltip } from 'react-tippy';

import { ObservedCellRenderer } from '../../components-generic/MarketDataTable';
import OrderCellFormatter from '../../components-generic/OrderCellFormatter';
import OrderPriceFormatter from '../../components-generic/OrderPriceFormatter';
import OrderProgressCell from './OrderProgressCell';
import { formatString } from '../../utils';

const ExchangeCell = styled.div`
    text-align: left;
    display: block !important;
    width: 100% !important;
    color: ${({ isBuy, theme }) =>
        isBuy ? theme.palette.orderBookTableCellTextBuy : theme.palette.orderBookTableCellTextSell};
`;

const CellTooltipItem = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    ${({ isBest, isBuy }) => isBest && `
        color: ${isBuy ? '#68B168' : '#09f'}};
    `}

    .alt-arrow {
        fill: ${props => props.isBuy ? '#68B168' : '#09f'};
        width: 16px;
        height: 16px;
        transform: rotate(180deg);
        margin: 0 6px;
    }

    .exchange-list-item {
        min-width: 65px;
        text-align: left;
    }
    
    .right-value {
        position: relative;
        min-width: 70px;
        text-align: center;
        font-weight: bold;
        &.own-price {
            font-weight: bold;
            color: ${props => props.isBuy ? '#68B168' : '#09f'};
        }
    }
`;

const DotPlaceHolder = styled.div.attrs({ className: 'right-value' })`
    &:before {
        content: "";
        position: absolute;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(219, 63, 34, ${props => props.alpha});
    }
`;

const AltArrowIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448.012 512" className="alt-arrow">
        <path d="M32 212.573C32 201.211 41.211 192 52.572 192h171.437V75.021c0-7.125 8.612-10.695 13.653-5.66l172.303 172.083c8.046 8.036 8.047 21.076 0 29.112L237.662 442.64c-5.041 5.035-13.653 1.464-13.653-5.66V320H52.572C41.211 320 32 310.789 32 299.427v-86.854m-32 0v86.855C0 328.416 23.584 352 52.572 352h139.437v84.979c0 35.507 43.04 53.497 68.266 28.302l172.303-172.083c20.576-20.55 20.58-53.842 0-74.396L260.276 46.719c-25.122-25.091-68.266-7.351-68.266 28.302V160H52.572C23.584 160 0 183.584 0 212.573z"/>
    </svg>
);

export const orderProgressRenderer = (width, isBuy) =>
    ObservedCellRenderer(({ data: [price] }) => <OrderProgressCell price={price} totalWidth={width} isBuy={isBuy} />);

export const priceCellRenderer = type =>
    ObservedCellRenderer(({ data: [price] }) => {
        return <OrderPriceFormatter type={type}>{price}</OrderPriceFormatter>;
    });

export const baseAmountCellRenderer = ObservedCellRenderer(({ data: [, amount] }) => (
    <OrderCellFormatter>{amount}</OrderCellFormatter>
));

export const quoteAmountCellRenderer = ObservedCellRenderer(({ data: [price, amount] }) => {
    const priceFloat = Number.parseFloat(String(price || '0').replace(',', ''));
    const amountFloat = Number.parseFloat(String(amount || '0').replace(',', ''));
    return <OrderCellFormatter isQuote>{priceFloat * amountFloat}</OrderCellFormatter>;
});

export const exchangeCellRenderer = (rowCount, isBuy) =>
    ObservedCellRenderer(({ data: [price, , exchange, nextPrice], index }) => {
        const sellExchanges = exchange.split(',');
        const buyExchanges = sellExchanges.reverse();
        const exchanges = isBuy ? buyExchanges : sellExchanges;
        const tooltipHeight = 22 * exchanges.length + 10;

        const tooltipY = (isBuy ? 1 : -1) * (tooltipHeight / 2  - (isBuy ? index : (rowCount - index - 1)) * 32);

        return (
            <Tooltip
                arrow={true}
                animation="fade"
                position="right"
                placement="right"
                distance={20}
                theme="bct"
                offset={tooltipY}
                className="full-width"
                html={
                    <ul className="advanced-tooltip text-left">
                        {exchanges.map((val, idx) => {
                            const isBest = isBuy ? idx === 0 : (idx === exchanges.length - 1);
                            const isOwnPriceIdx = !isBuy ? idx === 0 : (idx === exchanges.length - 1);
                            const isNextPriceIdx = isBuy ? idx === 1 : (idx === exchanges.length - 2);
                            const alpha = (1 - 0.2) / (exchanges.length - 3) * (idx + 1) + 0.15;
                            return (
                                <CellTooltipItem key={idx} isBest={isBest} isBuy={isBuy}>
                                    <span className="exchange-list-item">{val}</span>
                                    {isBest ? <AltArrowIcon /> : <div style={{ width: 10 }} />}
                                    {isBest && <span className="right-value">BEST PRICE</span>}
                                    {isOwnPriceIdx && <span className="right-value own-price">{formatString(price, 2)}</span>}
                                    {isNextPriceIdx && <span className="right-value">{formatString(nextPrice, 2)}</span>}
                                    {!isOwnPriceIdx && !isNextPriceIdx && !isBest && <DotPlaceHolder alpha={alpha}/> }
                                </CellTooltipItem>
                            );
                        })}
                    </ul>
                }
                popperOptions={{
                    modifiers: {
                        preventOverflow: { enabled: false },
                        flip: { enabled: false },
                        hide: { enabled: false },
                    },
                }}
            >
                <ExchangeCell isBuy={isBuy}>{`${exchanges[0]}`} {exchanges.length > 1 && '...'}</ExchangeCell>
            </Tooltip>
        );
    });
