import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';

const keyFrameSpin = keyframes`
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
`;

const Loader = styled.div`
    display: block;
    width: ${props => props.width ? props.width : 50}px;
    height: ${props => props.height ? props.height : 50}px;
    // margin: -25px 0 0 -25px;
    border-radius: 50%;
    border: 2px solid transparent;
    border-top-color: ${props => props.theme.palette.clrHighContrast};
    animation: ${keyFrameSpin} 1s linear infinite;

    position: absolute;
    left: calc(50% - ${props => props.width ? props.width / 2 : 25}px);
    top: calc(50% - ${props => props.height ? props.height / 2 : 25}px);
    z-index: 99999;
`;

const DataLoader = ({ width, height }) => (
    <Loader width={width} height={height}/>
);

export default DataLoader;
