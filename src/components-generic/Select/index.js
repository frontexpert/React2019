import React from 'react';
import styled from 'styled-components';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {withStateHandlers} from 'recompose';

const StyledSelect = styled(Select)`
    background: ${(props) => props.backgroundcolor ? props.backgroundcolor : props.theme.palette.backgroundMedContrast};
    width: 100%;
    text-align: center;
    font-size: .9rem;
`;

const StyledMenuItem = styled(MenuItem)`
    font-size: 0.9rem;
`;

const handleSelectChange = () => (event) => {
    return {selectIndex: event.target.value}
};

const withStateSimpleSelect = withStateHandlers(
    { selectIndex: 0 },
    { handleSelectChange }
);

const SimpleSelect = ({options, children=[], selectIndex, handleSelectChange, ...props}) => {
    children = [].concat(children);
    return (
        <React.Fragment>
            <StyledSelect value={selectIndex} onChange={handleSelectChange} {...props}>
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

export default withStateSimpleSelect(SimpleSelect)