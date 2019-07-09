import React from 'react';
import Table from './Table';
import {AutoSizer} from 'react-virtualized';

const YourAccount = ({portfolioData}) => {
    return(
        <AutoSizer>
        {
            ({ width, height }) => {
                return (
                    <div style={{ width, height }}>
                        <Table portfolioData={portfolioData} height={height}/>
                    </div>
                )
            }
        }
        </AutoSizer>
    )
};

export default YourAccount;