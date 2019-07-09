import React from 'react';
import MuiTabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import styled from 'styled-components';
import {withStateHandlers} from 'recompose';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => {
    return{
        tabsRoot: {
            minHeight: '36px',
            borderBottom: `1px solid ${theme.appTheme.palette.clrseparatorD}`,
        },
        tabsIndicator: {
            backgroundColor: '#0089cb',
        },
    }
};

const StyledMuiTabs = styled(MuiTabs)`
    color: ${props => props.theme.palette.clrtextD};
    background: ${props => props.theme.palette.clrBackground};
    > * span {
        text-transform: none;
        font-size: .9rem;
        font-weight: 400;
    }
    > div button {
        min-height: 36px !important;
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

const Tabs = ({tabIndex, handleTabChange, tabs, children, classes}) => {
    return (
        <React.Fragment>
            <StyledMuiTabs value={tabIndex} onChange={handleTabChange} classes={{root: classes.tabsRoot, indicator: classes.tabsIndicator }}>
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

export default withStyles(styles)(withStatefulTabs(Tabs));