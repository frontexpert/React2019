import React from 'react';
import {AutoSizer} from 'react-virtualized';
import RecentTradesTable from './Table';
import {inject} from 'mobx-react';
import {STORE_KEYS} from '../../stores';
const {RECENTTRADES:STORE_KEY} = STORE_KEYS;

const RecentTrades  = (
    {
        [STORE_KEY]:{
            recentTrades,
        },
    }
) => {
    const rowHeight = 25;
    return (
        <AutoSizer>
            {
                ({height, width})=>{
                    return (
                        <React.Fragment>
                            <RecentTradesTable
                                width={width}
                                height={height}
                                recentTrades={recentTrades}
                                rowHeight={rowHeight}
                                rowCount={parseInt((height-40)/rowHeight)}
                            />
                        </React.Fragment>
                    )
                }
            }
        </AutoSizer>
    );
}

export default inject(STORE_KEY)(RecentTrades);
