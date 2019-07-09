import React from 'react';
import styled from 'styled-components/macro';
import { darkTheme } from '@/theme/core';
import NewCoinIcon from '@/components/NewCoinIcon';
import { BuyArrowIcon, SellArrowIcon } from '@/components-generic/ArrowIcon'
import AmountCell from './AmountCell';
import ProgressCell from './ProgressCell';
import PriceCell from './PriceCell';
import ExchangeCell from './ExchangeCell';
import { ZerosWrapper } from './PriceCell/styles';

const Wrapper = styled.div`
    position: relative;
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: flex-end;
    height: 100%;

    .wrapper_arrow {
        display: flex;
        align-items: center;
    }
    .arrow-icon {
        position: absolute;
        left: -8px;
        z-index: 100000;
    }
`;

export const cellRenderer = callback => ({ rowData, ...props }) =>
    rowData && rowData.price ? callback({ rowData, ...props }) : undefined;

export const exchangeCellRenderer = isBuy => ({ rowData: { exchange } }) => {
    return <ExchangeCell isBuy={isBuy} exchange={exchange} />;
};

export const amountCellRenderer = (intLength, fractionDigits, hoverIdx, isBuy, coin) => ({ cellData, rowIndex, columnIndex }) => {
    const isHovered = hoverIdx === rowIndex;
    const coinIconColor = isBuy ? darkTheme.palette.orderBookBuyIconFilter : darkTheme.palette.orderBookSellIconFilter;
    return (
        <Wrapper>
            {(isHovered && columnIndex === 2) && (isBuy ? <BuyArrowIcon className="arrow-icon" width="16px" /> : <SellArrowIcon className="arrow-icon" width="16px" />)}

            {isHovered &&
                <NewCoinIcon
                    filter={coinIconColor}
                    size="sm"
                    value={coin}
                />
            }
            <AmountCell
                intLength={intLength}
                fractionDigits={fractionDigits}
            >
                {cellData}
            </AmountCell>
        </Wrapper>
    );
}

export const progressCellRenderer = (width, isBuy, maxPrice, minPrice) => ({ cellData }) => (
    <ProgressCell price={cellData} totalWidth={width} isBuy={isBuy} maxPrice={maxPrice} minPrice={minPrice} />
);

export const priceCellRenderer = (type, intLength, fractionDigits, hoverIdx) => ({ cellData, rowIndex, columnIndex }) => {
    const isHovered = hoverIdx === rowIndex;
    return (
        <Wrapper>
            {(isHovered && columnIndex === 3) && (<ZerosWrapper position="leading">@</ZerosWrapper>)}
            <PriceCell
                type={type}
                intLength={intLength}
                fractionDigits={fractionDigits}
            >
                {cellData}
            </PriceCell>
        </Wrapper>
    );
}
