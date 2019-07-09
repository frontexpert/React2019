import React from 'react';
import styled from 'styled-components';
import LeftTopSectionGrid from './LeftTopSectionGrid';
import RightTopSectionGrid from './RightTopSectionGrid';
import LeftLowerSectionGrid from './LeftLowerSectionGrid';
import {RightLowerSectionGrid} from './RightLowerSectionGrid';

const MainGridWrapper = styled.div`
    display: grid;
    grid-template-rows: 70vh auto;
    grid-template-areas: 
        "lefttopsection righttopsection"
        "leftlowersection rightlowersection";
    grid-gap: 15px;
    max-height: 100vh;
    min-height: 100vh;
    background: ${props => props.theme.palette.backgroundApp};

    /* GRID TEMPLATE COLUMNS */
    /* All Large Screens */
    @media (min-width: 4000px){
        grid-template-columns: 20% auto;
    }

    @media (min-width: 2700px) and (max-width: 4000px) {
        grid-template-columns: 25% auto;
    }

    @media (max-width: 2600px) {
        grid-template-columns: 30% auto;
    }

    @media (max-width: 2100px) {
        grid-template-columns: 32% auto;
    }

    @media (max-width: 1500px) {
        grid-template-columns: 36% auto;
    }
`;

const MainGrid = ({ProgramId, Symbols, ClientId, Route, themeType}) => {
    return (
        <MainGridWrapper>
            <LeftTopSectionGrid ProgramId={ProgramId} Symbols={Symbols} ClientId={ClientId} Route={Route} />
            <RightTopSectionGrid themeType={themeType} Symbols={Symbols} />
            <LeftLowerSectionGrid ProgramId={ProgramId} Symbols={Symbols} ClientId={ClientId} Route={Route}/>
            <RightLowerSectionGrid />
        </MainGridWrapper>
    )
};

export default MainGrid;