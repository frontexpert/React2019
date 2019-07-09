import React from 'react';
import styled from 'styled-components';

import imgChecked from './icons/checked.svg';
import imgUnChecked from './icons/unchecked.svg';

const StyleWrapper = styled.div.attrs({ className: 'combined-balance-modal__checkbox' })`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
`;

const Icon = styled.img`
    width: 19px;
    height: 19px;
`;

const Label = styled.span`
    margin-left: 7px;
    font-size: 14px;
    font-weight: normal;
    color: ${props => props.theme.palette.clrHighContrast};
`;

const CheckBox = ({ isChecked = false, onChange, label = '' }) => (
    <StyleWrapper
        onClick={() => {
            if (onChange) {
                onChange(!isChecked);
            }
        }}
    >
        <Icon src={isChecked ? imgChecked : imgUnChecked} alt=""/>
        {label &&
        <Label>{label}</Label>
        }
    </StyleWrapper>
);

export default CheckBox;
