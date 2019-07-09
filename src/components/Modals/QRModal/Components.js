import React from 'react';
import styled from 'styled-components';
import QRCode from 'qrcode.react';

export const QRSection = styled.div`
    .qr-code {
        width: 240px;
        height: 240px;
        fill: ${props => props.theme.palette.depositText};
        // filter: drop-shadow(0px 0px 10px rgba(39, 128, 255, 1));
    }
`;

export const Code = styled(QRCode).attrs({ className: 'qr-code' })`
    & path:nth-child(1) {
        /* background */
        fill: ${props => props.theme.palette.clrBackground};
        display: none;
    }
    
    & path:nth-child(2) {
        /* foreground */
        fill: ${props => props.theme.palette.clrHighContrast};
    }
`;

export const FlexWrapper = styled.div`
    margin-top: 5px;
    display: flex;
    align-items: center;
    border: 1px solid ${props => props.theme.palette.clrBorder};
    border-radius: ${props => props.theme.palette.borderRadius};
    justify-content: center;
`;

export const Button = styled.button`
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: 0;
    cursor: pointer;
    outline: none !important;
    
    &:first-child {
        border-radius: ${props => `${props.theme.palette.borderRadius} 0 0 ${props.theme.palette.borderRadius}`};
    }
    
    &:last-child {
        border-radius: ${props => `0 ${props.theme.palette.borderRadius} ${props.theme.palette.borderRadius} 0`};
    }
    
    &:not(:first-child) {
        border-left: 1px solid ${props => props.theme.palette.clrBorder};
    }
    
    svg {
        fill: ${props => props.theme.palette.clrBorder};
    }
    
    &:hover,
    &.active {
        background: ${props => props.theme.palette.clrBorder};

        svg {
            fill: ${props => props.theme.palette.clrHighContrast};
        }
    }
`;
