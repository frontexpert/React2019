import React from 'react';
import styled from 'styled-components';

import PerfectSrollWrapper from '../../../components-generic/PerfectScrollWrapper';
import iconCheck from './mock/check.png';
import COIN_DATA_MAP from '../../../mock/coin-data-map';

const mock = [
    {
        name: 'Tether',
        symbol: 'USDT',
    },
    {
        name: 'Trust Token',
        symbol: 'TrueUSD',
    },
    {
        name: 'Centre',
        symbol: 'USDC',
    },
    {
        name: 'Stable USD',
        symbol: 'USDS',
    },
    {
        name: 'Gemini Dollar',
        symbol: 'GUSD',
    },
    {
        name: 'Paxos Standard',
        symbol: 'PAX',
    }
];

const StableCoin = styled.div`
    position: relative;
    width: 100%;
    margin: 0;
    padding: 0 20px 0 5px;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: stretch;
    font-size: 14px;
    line-height: 1.2;
    cursor: pointer;
    
    &:not(:first-child) {
        border-top: 1px solid ${props => props.theme.palette.depositToggleBorder};
        
        .stable-coin__name {
            border-right: 1px solid ${props => props.theme.palette.depositToggleBorder};
        }
    }
    
    &:hover {
        background-color: ${props => props.theme.palette.depositToggleHover};
        border-color: ${props => props.theme.palette.depositToggleHover};
        color: ${props => props.theme.palette.contrastText};
    }
    
    &:active {
        background-color: ${props => props.theme.palette.depositActive};
        border-color: ${props => props.theme.palette.depositActive};
        color: ${props => props.theme.palette.contrastText};
    }
    
    ${props => props.isActive ? `
        background-color: ${props.theme.palette.depositActive} !important;
        border-color: ${props => props.theme.palette.depositActive} !important;
        font-weight: 600;
        color: ${props.theme.palette.contrastText};
    ` : ''}
    
    .stable-coin__name {
        flex: 1 0 60%;
        padding: 10px;
        height: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .stable-coin__symbol {
        flex: 1 0 40%;
        padding: 10px;
        height: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;

const CheckMark = styled.img`
    position: absolute;
    right: 26px;
    top: 9px;
    width: 18px;
    height: 18px;
    display: ${props => props.isActive ? 'block' : 'none'};
    display: none;
    filter: brightness(1000%);
`;

const StableCoinList = ({ value, onChange }) => {
    return(
        <PerfectSrollWrapper>
            {Object.entries(COIN_DATA_MAP).map((item, index) => {
                let symbol = item[1].symbol.replace('F:', '');
                return(
                    item[1].fiat ? (
                        <StableCoin
                            key={symbol + index}
                            onClick={() => onChange(symbol)}
                            isActive={value === symbol}
                        >
                            {/* <span className="stable-coin__name">{item.name}</span> */}
                            <span className="stable-coin__symbol">{symbol}</span>

                            <CheckMark
                                src={iconCheck}
                                isActive={value === symbol}
                            />
                        </StableCoin>
                    ) : (
                        <React.Fragment/>
                    )
                );
            })}
        </PerfectSrollWrapper>
    );
};

export default StableCoinList;
