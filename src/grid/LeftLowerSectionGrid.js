import React from 'react';
import styled from 'styled-components';
import {AutoSizer} from 'react-virtualized';
import {MarketOrderFormSideBySide} from 'Components/BuySellOrderTypes/MarketOrder';
import {LimitOrderFormSideBySide} from 'Components/BuySellOrderTypes/LimitOrder';
import Tabs from 'ComponentsGeneric/Tabs';

const StyledLeftLowerSectionGrid = styled.div`
    grid-area: leftlowersection;
    background: ${props => props.theme.palette.backgroundHighContrast};
    outline: 1px solid ${props => props.theme.palette.clrseparatorD};
    /* container does not move grid out but contents are too wide when width gets small */
    /* temporary - will make different layout when width gets small */
    overflow-x: scroll;
`;

const OrderWrapper = styled.div`
    height: ${props => props.height}px;
    width: ${props => props.width}px;
    max-width: ${props => props.width}px;
`;

const BuySellOrderWrapper = styled.div`
    padding-top: .2rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    
`;

const LeftLowerSectionGrid = ({ProgramId, ClientId, Route, Symbols}) => {
    return(
        <StyledLeftLowerSectionGrid>
            <AutoSizer>
                {
                    ({width, height}) => {
                        /* subtract out material tab height */
                        height = height - 0 - 30;
                        return(
                            <OrderWrapper height={height} width={width}>
                                <Tabs tabs={['Market', 'Limit']}>
                                    <BuySellOrderWrapper>
                                        <MarketOrderFormSideBySide ProgramId={ProgramId} ClientId={ClientId} Symbols={Symbols} Route={Route}/>
                                    </BuySellOrderWrapper>
                                    <BuySellOrderWrapper>
                                        <LimitOrderFormSideBySide ProgramId={ProgramId} ClientId={ClientId} Symbols={Symbols} Route={Route}/>
                                    </BuySellOrderWrapper>
                                </Tabs>
                            </OrderWrapper>
                        )
                    }
                }
            </AutoSizer>
        </StyledLeftLowerSectionGrid>
    )
};

export default LeftLowerSectionGrid;