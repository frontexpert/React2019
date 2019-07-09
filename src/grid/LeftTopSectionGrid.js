import React from 'react';
import styled from 'styled-components';
import OrderBookRecentTradesContainer from '../components/OrderBookRecentTradesContainer';
import Telegram from '../components/Telegram';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {layoutKeys} from '../stores/GridStore';
import {inject, observer} from 'mobx-react'
import {STORE_KEYS} from '../stores';

const StyledLeftTopSectionGrid = styled.div`
    grid-area: lefttopsection;
    background: ${props => props.theme.palette.backgroundHighContrast};
`;

const StyledSimpleSelect = styled(Select)`
    width: 100%;
    text-align : left;
    padding-left : 10px;
    background: ${props => props.theme.palette.backgroundMedContrast};
    color: ${props => props.theme.palette.clrtextD};
    font-size: .9rem;
    border: 1px solid ${props => props.theme.palette.clrseparatorD};
    :before{
        border-bottom: none;
    }
`;

const StyledMenuItem = styled(MenuItem)`
    font-size: 0.9rem;
`;

const layoutFragmentMap = {
    [layoutKeys.telegramSelectKey]: Telegram,
    [layoutKeys.globalOrderBookSelectKey]: OrderBookRecentTradesContainer,
};


const LeftTopSectionGrid = observer(
    (
        {
            [STORE_KEYS.GRIDSTORE]:{selectedLayout, selectLayout},
        }
    ) => {
        const SelectedComponent = layoutFragmentMap[selectedLayout];
        return (
            <StyledLeftTopSectionGrid>
                <StyledSimpleSelect value={selectedLayout} onChange={(e) => {selectLayout(e.target.value)}}>
                    <StyledMenuItem value={layoutKeys.telegramSelectKey}>Telegram</StyledMenuItem>
                    <StyledMenuItem value={layoutKeys.globalOrderBookSelectKey}>Global Order Book</StyledMenuItem>
                </StyledSimpleSelect>
                <SelectedComponent />
            </StyledLeftTopSectionGrid>
        )
    }
);

export default inject(
    STORE_KEYS.GRIDSTORE
)(LeftTopSectionGrid);