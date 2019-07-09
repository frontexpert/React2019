import React from 'react';
import MuiTabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import styled from 'styled-components';
import {withStateHandlers} from 'recompose';

const StyledMuiTabs = styled(MuiTabs)`
    color: ${props => props.theme.palette.clrtextD};
    background: ${props => props.theme.palette.backgroundHighContrast};
    > * span {
        text-transform: none;
        font-size: .9rem;
        font-weight: 400;
    }
    > div button {
        min-height: 30px !important;
    }
`;

const withStatefulTabs = withStateHandlers(
    () => {
        return {
            tabIndex: 0,
        }
    },
    {
        handleTabChange : () => (event, tabIndexVal) => {
            return {tabIndex: tabIndexVal}
        },
    }
);

const Tabs = ({tabIndex, handleTabChange, tabs, children}) => {
    return (
        <React.Fragment>
            <StyledMuiTabs value={tabIndex} onChange={handleTabChange}>
                {
                    tabs && tabs.map((tab, idx) => {
                        return (
                            <Tab key={idx} label={tab}>
                            </Tab>
                        )
                    })
                }
            </StyledMuiTabs>
            {children[tabIndex] || <div />}
        </React.Fragment>
    )
};

export default withStatefulTabs(Tabs);