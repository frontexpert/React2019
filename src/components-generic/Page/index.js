import React from 'react';
import styled from 'styled-components';
import SideBarGrid from '../../grid/SideBarGrid';

const PageWrapper = styled.div`
    display: grid;
    grid-template-columns: 55px auto;
    grid-template-areas: "sidebar page";
    grid-gap: 10px;
    max-height: 100vh;
    min-height: 100vh;
    background: ${props => props.theme.palette.clrBackground};
    padding: ${({ theme:{ palette:{ contentGap } } }) => `${contentGap} ${contentGap} ${contentGap}`} 0;
`;

const Page = ({ themeType, refReceived }) => (
    <PageWrapper>
        <SideBarGrid themeType={themeType} />
        <div style={{ grid: 'page' }} ref={refReceived} />
    </PageWrapper>
);

export default Page;
