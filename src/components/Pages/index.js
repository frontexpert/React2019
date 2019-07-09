import React from 'react';
import styled from 'styled-components/macro';
import { FormattedMessage } from 'react-intl';

import SideBarGrid from '../../grid/SideBarGrid';

const PageWrapper = styled.div`
    display: grid;
    grid-template-columns: 15px auto;
    grid-template-areas:
        "sidebar page";
    grid-gap: 10px;
    max-height: 100vh;
    min-height: 100vh;
    background: ${props => props.theme.palette.clrBackground};
    padding: ${({ theme: { palette: { contentGap } } }) => `${contentGap} ${contentGap} ${contentGap}`} 0;
`;

const OtherPage = styled.div`
    grid: "page";
    color: #ffffff;
`;

export const Other = ({ themeType }) => (
    <PageWrapper>
        <SideBarGrid themeType={themeType}/>
        <OtherPage>
            <FormattedMessage
                id="pages.label_other_content"
                defaultMessage="Other content goes here."
            />
        </OtherPage>
    </PageWrapper>
);

export const NotFound = ({ themeType }) => (
    <PageWrapper>
        <SideBarGrid themeType={themeType}/>
        <OtherPage>
            <FormattedMessage
                id="pages.label_404_page"
                defaultMessage="404 Page Not Found."
            />
        </OtherPage>
    </PageWrapper>
);
