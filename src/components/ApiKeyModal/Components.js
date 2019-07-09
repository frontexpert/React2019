import React from 'react';
import styled from 'styled-components';

export const Wrapper = styled.section.attrs({ className: 'api-key-modal' })`
    position: relative;
    display: flex;
    flex-direction: column;
    margin: 0;
    border: 1px solid ${props => props.theme.palette.depositBorder};
    border-radius: ${props => props.submitted ? `${props.theme.palette.borderRadius} ${props.theme.palette.borderRadius} 0 0` : props.theme.palette.borderRadius};
    width: 295px;
    background-color: ${props => props.theme.palette.depositBackground};
    box-shadow: 0 3px 15px rgba(0, 0, 0, .5);
    color: ${props => props.theme.palette.depositText};
    
    .confirm-button:disabled {
        filter: drop-shadow(0px 0px 1px ${props => props.theme.palette.depositBorder}) !important;
    }
`;

export const ModalBody = styled.div.attrs({ className: 'api-key-modal__body' })`
    width: 100%;
    padding: 15px;
    display: flex;
    flex-direction: column;
    border: none;
    
    input {
        color: ${props => props.theme.palette.contrastText};
        
        &::placeholder {
            color: ${props => props.theme.palette.contrastText};
        }
    }
    
    .primary-solid {
        margin-top: 8px;
        
        .btn-text {
            font-size: 24px;
            font-weight: bold;
            line-height: 1em;
        }
    }
`;

export const Header = styled.span.attrs({ className: 'api-key-modal__header' })`
    width: 100%;
    padding: 15px;
    background: ${props => props.theme.palette.clrBackground};
    border-bottom: 1px solid ${props => props.theme.palette.clrBorderHover};
    border-radius: ${props => `${props.theme.palette.borderRadius} ${props.theme.palette.borderRadius} 0 0`};
    font-size: 18px;
    font-weight: 600;
    color: ${props => props.theme.palette.clrHighContrast};
    text-align: left;
`;

export const Text = styled.span`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: 4px 0 8px;
    width: 100%;
    text-align: left;
    font-size: 12px;
    color: ${props => props.theme.palette.clrHighContrast};
    cursor: pointer;

    > span {
        color: ${props => props.theme.palette.clrBlue};
    }
`;

const LockIconWrapper = styled.div`
    svg {
        width: 20px;
        height: 20px;

        &, & * {
            fill: ${props => props.theme.palette.depositLabel};
        }
    }
`;

export const LockIcon = () => (
    <LockIconWrapper>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path
                fill="currentColor"
                d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z"
            />
        </svg>
    </LockIconWrapper>
);
