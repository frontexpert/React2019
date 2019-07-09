import React from 'react';
import { AutoSizer } from 'react-virtualized';

import GraphPrices from '../Styles/graphprices';
import ExchangeCells from '../ExchangeCellsV2';

const ExchangeBar = ({
    width,
    open,
    isCoinSearch,
}) => {
    return (
        <GraphPrices.Graphprices open={open} width={width} isCoinSearch={isCoinSearch} id="exchange-bar">
            <AutoSizer>
                {({ height }) => (
                    <GraphPrices.Wrapper width={width} height={height} id="exchange-bar-wrapper">
                        <ExchangeCells open={open}/>
                    </GraphPrices.Wrapper>
                )}
            </AutoSizer>
        </GraphPrices.Graphprices>
    );
};

export default ExchangeBar;
