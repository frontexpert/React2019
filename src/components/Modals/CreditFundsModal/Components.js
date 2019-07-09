import React from 'react';
import styled from 'styled-components';

export const CreditSection = styled.div.attrs({ className: 'add-funds2__credit-section' })`
    width: 100%;
    padding: 3px 15px 15px;
    display: flex;
    flex-direction: column;
    flex: 1;
    border: none;
    
    input {
        color: ${props => props.theme.palette.contrastText};
        
        &::placeholder {
            color: ${props => props.theme.palette.contrastText};
        }
    }
    
    .primary-solid {
        margin-top: 20px;
    }
`;

export const CreditUpper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
`;

export const CvcWrapper = styled.div.attrs({ className: 'add-funds2__cvc-section' })`
    width: 300px;
    display: flex;
    align-items: center;
    
    .horizontal-input-fields {
        flex: 1;
        
        &:not(:last-child) {
            margin-right: -1px;
        }
        
        &:first-child input {
            border-radius: ${props => `${props.theme.palette.borderRadius} 0 0 ${props.theme.palette.borderRadius}`};
        }
        
        &:last-child input {
            border-radius: ${props => `0 ${props.theme.palette.borderRadius} ${props.theme.palette.borderRadius} 0`};
        }
        
        input {
            text-align: center;
        }
    }
    
    .add-funds2__input-field__label-wrapper {
        display: none;
    }
`;

export const InputFieldGroup = styled.div`
    width: 300px;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: stretch;
    
    input {
        border-right: none !important;
        border-top-right-radius: 0 !important;
        border-bottom-right-radius: 0 !important;
    }
`;

export const InputFieldAddon = styled.div`
    width: 60px;
    height: 60px;
    margin: 38px 0 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-grow: 0;
    flex-shrink: 0;
    justify-content: center;
    background-color: ${props => props.theme.palette.depositInputBackground};
    border: 1px solid ${props => props.theme.palette.depositInputBorder};
    border-top-right-radius: ${props => props.theme.palette.borderRadius};
    border-bottom-right-radius: ${props => props.theme.palette.borderRadius};
    font-size: 14px;
    
    svg {
        fill: ${props => props.theme.palette.depositInputBorder};
    }
`;
