import React from 'react';
import styled from 'styled-components/macro';

import { inject, observer } from 'mobx-react';
import { compose, withProps } from 'recompose';

const ToggleButtonStyleWrapper = styled.button.attrs({ className: 'toggle-button' })`
    width: 100%;
    height: 100%;
    padding: 0;
    background: none;
    border: none;
    color: ${props => props.theme.palette.orderBookTableCellText};
    font-size: 12px;
    font-weight: bold;
    text-align: left !important;
    text-transform: uppercase;
    outline: none;
    overflow: hidden;
    text-overflow: ellipsis;

    &:hover {
        cursor: pointer;
        filter: brightness(110%);
    }
`;

const ToggleButton = ({
    onClick, text,
}) => (
    <ToggleButtonStyleWrapper
        onClick={onClick}
    >
        {text}
    </ToggleButtonStyleWrapper>
);

export default ToggleButton;
