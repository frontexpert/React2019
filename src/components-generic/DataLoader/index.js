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
    border-top-color: #3498db;
    animation: ${keyFrameSpin} 2s linear infinite;
    
    position: absolute;
    left: calc(50% - ${props => props.width ? props.width / 2 : 25}px);
    top: calc(50% - ${props => props.height ? props.height / 2 : 25}px);
    z-index: 10;
    
    &:before {
        content: "";
        position: absolute;
        top: 4px;
        left: 4px;
        right: 4px;
        bottom: 4px;
        border-radius: 50%;
        border: 2px solid transparent;
        border-top-color: #e74c3c;
        animation: ${keyFrameSpin} 3s linear infinite;
    }
    
    &:after {
        content: "";
        position: absolute;
        top: 10px;
        left: 10px;
        right: 10px;
        bottom: 10px;
        border-radius: 50%;
        border: 2px solid transparent;
        border-top-color: #f9c922;
        animation: ${keyFrameSpin} 1.5s linear infinite;
    }
`;

const DataLoader = ({ width, height }) => (
    <Loader width={width} height={height}/>
);

export default DataLoader;
