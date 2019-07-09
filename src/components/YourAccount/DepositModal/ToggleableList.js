import React from 'react';
import styled from 'styled-components';

import CustodianList from './CustodianList';
import HistoryList from './HistoryList';
import StableCoinList from './StableCoinList';
import x from './icons/x.svg';

const Shadow = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0,0,0,0.7);
    border-radius: ${props => props.theme.palette.borderRadius};
`;

const Content = styled.div`
    position: absolute;
    top: 13%;
    left: ${props => props.opened !== 'history' ? '50px' : 0};
    right: ${props => props.opened !== 'history' ? '50px' : 0};
    bottom: 0;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    background-color: ${props => props.theme.palette.depositToggleBackground};
    border: 1px solid ${props => props.theme.palette.depositBorder};
    border-radius: ${props => props.theme.palette.borderRadius};
`;

const Header = styled.div`
    position: relative;
    padding: 10px 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid ${props => props.theme.palette.depositToggleBorder};
`;

const Title = styled.p`
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: ${props => props.theme.palette.contrastText};
`;

const TabList = styled.div`
    position: absolute;
    right: 15px;
    bottom: 0;
    display: flex;
    align-items: center;
`;

const Tab = styled.div`
    padding: 8px;
    border-bottom: 2px solid ${props => props.active ? props.theme.palette.depositLink : 'transparent'};
    font-size: 14px;
    font-weight: ${props => props.active ? 600 : 400};
    color: ${props => props.active ? props.theme.palette.depositLink : props.theme.palette.depositText};
    cursor: pointer;
`;

const Close = styled.button`
    width: 10px;
    height: 10px;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
    border: 0;
    border-radius: 50%;

    &:hover {
        cursor: pointer;
        filter: brightness(75%);
    }

    &:focus {
        outline: none;
    }
`;

const Icon = styled.img`
    width: 100%;
    height: 100%;
`;

const List = styled.div`
    flex: 1;
    color: ${props => props.theme.palette.depositToggleText};
    overflow-y: scroll;
    
    .ps__rail-y {
        background-color: ${props => props.theme.palette.depositToggleBackground} !important;
        border-left: 1px solid ${props => props.theme.palette.depositToggleBorder};
        opacity: 1 !important;
        
        .ps__thumb-y {
            z-index: 9999;
            cursor: pointer;
            
            &:before {
                background-color: ${props => props.theme.palette.depositToggleScrollThumb};
            }
        }
    }
    
    .scroll__scrollup {
        right: 21px;
        bottom: 6px;
    }
`;

const handleClick = (close, manual) => ({ target: { dataset } }) => {
    if (manual || (dataset && dataset.zone === 'list-wrapper')) {
        close();
    }
};

const ToggleableList = ({
    opened, close, coin, custodian, onCustodianChange, stableCoin, onStableCoinChange, showAll, changeShow,
}) => (
    <Shadow
        onClick={handleClick(close)}
        data-zone="list-wrapper"
    >
        <Content opened={opened}>
            <Header>
                <Title>
                    {opened === 'custodians' && 'Custodian'}
                    {opened === 'history' && 'History'}
                    {opened === 'stablecoin' && 'Stablecoin'}
                </Title>

                {opened === 'history' && (
                    <TabList>
                        <Tab active={!showAll} onClick={changeShow}>{(coin || '').replace('F:', '')}</Tab>
                        <Tab active={showAll} onClick={changeShow}>All Coins</Tab>
                    </TabList>
                )}
                {/* <Close onClick={handleClick(close, "manual")}><Icon src={x} alt='Close'/></Close> */}
            </Header>

            <List>
                {opened === 'history' && <HistoryList coin={coin}/>}
                {opened === 'custodians' && <CustodianList value={custodian} onChange={onCustodianChange}/>}
                {opened === 'stablecoin' && <StableCoinList value={stableCoin} onChange={onStableCoinChange}/>}
            </List>
        </Content>
    </Shadow>
);

export default ToggleableList;
