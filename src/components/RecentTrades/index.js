import React from 'react';
import { AutoSizer } from 'react-virtualized';
import { compose, withProps } from 'recompose';
import { inject, observer } from 'mobx-react';

import RecentTradesTable from './Table';
import { STORE_KEYS } from '../../stores';

const RecentTrades = ({
    recentTrades,
    base,
    quote,
}) => {
    const rowHeight = 22;
    return (
        <AutoSizer>
            {({ height, width }) => {
                return (
                    <React.Fragment>
                        <RecentTradesTable
                            width={width}
                            height={height}
                            recentTrades={recentTrades}
                            rowHeight={rowHeight}
                            rowCount={parseInt((height - 30) / rowHeight) + 1}
                            base={base}
                            quote={quote}
                        />
                    </React.Fragment>
                );
            }}
        </AutoSizer>
    );
};

const withRecentInstruments = compose(
    inject(STORE_KEYS.RECENTTRADES),
    observer,
    withProps(
        ({
            [STORE_KEYS.RECENTTRADES]: {
                recentTrades,
                base,
                quote,
            },
        }) => ({
            recentTrades,
            base,
            quote,
        })
    )
);

export default withRecentInstruments(RecentTrades);
