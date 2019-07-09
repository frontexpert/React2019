import React from 'react';
import styled from 'styled-components';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';

//need to get at options within select
const styles = (theme) => {
    return{
        dropdownStyle:
            {
                background: `${theme.appTheme.palette.backgroundHighContrast}`,
                color: `${theme.appTheme.palette.contrastText}`,
            },
    }
};

const StyledSelect = styled(Select)`
    background: ${(props) => props.backgroundcolor ? props.backgroundcolor : props.theme.palette.backgroundMedContrast};
    border-bottom: 1px solid ${props => props.theme.palette.clrseparatorD};
    padding-left: 1rem;
    text-align: center;
    align-items: center;
    font-size: 1rem;
    height: 36px;
    :before{
        content: none;
    }
    :after{
        content: none;
    }
`;

const StyledMenuItem = styled(MenuItem)`
    font-size: 0.9rem;
`;

const SimpleSelect = ({options, children=[], selectIndex=0, handleSelectChange, classes, ...props}) => {
    children = [].concat(children);
    return (
        <React.Fragment>
            <StyledSelect value={selectIndex} onChange={handleSelectChange}
                {...props}
                MenuProps={{ classes: { paper: classes.dropdownStyle } }}
            >
                {
                    options.map(
                        (Component, idx) => (
                            <StyledMenuItem key={idx} value={idx}>
                                {Component}
                            </StyledMenuItem>
                        )
                    )
                }
            </StyledSelect>
            {children[selectIndex]}
        </React.Fragment>
    )
};

export default withStyles(styles)(SimpleSelect);