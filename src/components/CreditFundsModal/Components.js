import React from 'react';
import styled from 'styled-components';

export const Wrapper = styled.section.attrs({ className: 'add-funds2' })`
    position: relative;
    width: 550px;
    height: 455px;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    background-color: ${props => props.theme.palette.depositBackground};
    border: 1px solid ${props => props.theme.palette.clrBorderHover};
    border-radius: ${props => props.submitted ? `${props.theme.palette.borderRadius} ${props.theme.palette.borderRadius} 0 0` : props.theme.palette.borderRadius};
    box-shadow: 0 3px 15px rgba(0, 0, 0, .5);
    color: ${props => props.theme.palette.depositText};
    
    .confirm-button:disabled {
        filter: drop-shadow(0px 0px 1px ${props => props.theme.palette.clrBorderHover}) !important;
    }
`;

export const CreditSection = styled.div.attrs({ className: 'add-funds2__credit-section' })`
    width: 100%;
    padding: 3px 15px 15px;
    display: flex;
    flex-direction: column;
    // justify-content: center;
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
        
        .btn-text {
            font-size: 24px;
            font-weight: bold;
        }
    }
`;

export const CreditUpper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
`;

export const FlexWrapper = styled.div`
    display: flex;
    align-items: center;
    
    > *:not(:first-child) {
        margin-left: 15px;
    }
`;

export const CvcWrapper = styled.div.attrs({ className: 'add-funds2__cvc-section' })`
    display: flex;
    align-items: center;
    flex: 1;
    
    .horizontal-input-fields {
        flex: 1;
        
        &:not(:last-child) {
            margin-right: -1px;
        }
        
        p {
            // color: ${props => props.theme.palette.clrHighContrast};
        }
        
        &:first-child input {
            border-radius: ${props => `${props.theme.palette.borderRadius} 0 0 ${props.theme.palette.borderRadius}`};
        }
        
        &:last-child input {
            border-radius: ${props => `0 ${props.theme.palette.borderRadius} ${props.theme.palette.borderRadius} 0`};
        }
    }
`;

export const Label = styled.div.attrs({ className: 'add-funds2__label' })`
    width: 100%;
    min-height: 41px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0;
    padding: 5px 15px;
    background: ${props => props.theme.palette.clrBackground};
    border-bottom: 1px solid ${props => props.theme.palette.clrBorderHover};
    border-radius: ${props => `${props.theme.palette.borderRadius} ${props.theme.palette.borderRadius} 0 0`};
    font-size: 18px;
    font-weight: 600;
    color: ${props => props.theme.palette.clrHighContrast};
    
    span {
        display: flex;
        align-items: center;
    }

    .heading1 {
    }
    
    .heading2 {
        margin-top: 6px;
    }
`;

export const IconVisa = styled.img`
    height: 40px;
`;

export const Text = styled.span`
    width: 100%;
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 300;
    line-height: 1em;
    color: ${props => props.theme.palette.clrHighContrast};
    text-align: center;
    cursor: pointer;

    > span {
        color: ${props => props.theme.palette.clrBlue};
        text-decoration: underline;
    }
`;
