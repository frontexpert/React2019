import React from 'react';
import styled from 'styled-components';
import { darkTheme } from '../../../theme/core';

const { palette } = darkTheme;

export const Wrapper = styled.div.attrs({ className: 'currency-choose-2' })`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: stretch;
    margin: 0;
    border: none;
    padding: 0;
    width: 100%;
    height: 100%;
    background: ${palette.mobile2Bg};
    
    &:before {
        content: "";
        position: absolute;
        top: 5%;
        left: 0;
        bottom: 5%;
        right: 0;
        display: block;
        background: linear-gradient(to bottom, rgba(12,26,88,0) 0%, rgba(12,26,88,0.5) 15%, rgba(12,26,88,1) 50%, rgba(12,26,88,0.5) 85%, rgba(12,26,88,0) 100%);
    }
`;

export const QROuterWrapper = styled.div.attrs({ className: 'qr-outer-wrapper' })`
    position: absolute;
    top: 8%;
    left: 0;
    display: flex;
    align-items: stretch;
    justify-content: stretch;
    margin: 0;
    border: none;
    padding: 0;
    width: 100%;
    height: 25%;
    
    background: ${props => props.hasBg ? palette.mobile2Bg : 'transparent'};
`;
