import React from 'react';
import {AutoSizer} from 'react-virtualized';
import BuyBook from 'Components/OrderBook/BuyBook';
import SellBook from 'Components/OrderBook/SellBook';
import Spread from 'Components/OrderBook/Spread';
import {inject} from 'mobx-react';
import {STORE_KEYS} from '../../stores';
const {ORDERBOOK:STORE_KEY} = STORE_KEYS;

// material select is 36px; must be subtracted from height
const OrderBook = (
    {
        [STORE_KEY]:{
            bids,
            asks,
            spread,
        },
    }
) => {
    const rowHeight = 25;
    return (
        <AutoSizer>
            {
                ({height, width})=>{
                    const buyBookRowCount = parseInt(((height-40-40)/2)/rowHeight)
                    return (
                        <React.Fragment>
                           <SellBook
                                width={width}
                                height={(height/2)}
                                asks={asks}
                                rowHeight={rowHeight}
                                rowCount={parseInt((((height-60)/2))/rowHeight)}
                            />
                            <Spread 
                                height='40' 
                                spread={spread} 
                                width={width}
                            />
                            <BuyBook
                                width={width}
                                height={((height-40)/2)}
                                bids={bids}
                                rowHeight={25}
                                rowCount={buyBookRowCount}
                            />
                        </React.Fragment>
                    )
                }
            }
        </AutoSizer>
    );
}

export default inject(STORE_KEY)(OrderBook);
