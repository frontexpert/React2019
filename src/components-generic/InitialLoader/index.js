import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import lock from './lock.png';

const keyFrameSpin = keyframes`
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
`;

const LoaderWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99999999;
    background: ${props => props.theme.palette.clrBackground};
`;

const Loader = styled.div`
    display: block;
    position: relative;
    left: 50%;
    top: 50%;
    width: 150px;
    height: 150px;
    margin: -75px 0 0 -75px;
    border-radius: 50%;
    border: 3px solid transparent;
    border-top-color: #3498db;
    animation: ${keyFrameSpin} 2s linear infinite;
    
    &:before {
        content: "";
        position: absolute;
        top: 5px;
        left: 5px;
        right: 5px;
        bottom: 5px;
        border-radius: 50%;
        border: 3px solid transparent;
        border-top-color: #e74c3c;
        animation: ${keyFrameSpin} 3s linear infinite;
    }
    
    &:after {
        content: "";
        position: absolute;
        top: 15px;
        left: 15px;
        right: 15px;
        bottom: 15px;
        border-radius: 50%;
        border: 3px solid transparent;
        border-top-color: #f9c922;
        animation: ${keyFrameSpin} 1.5s linear infinite;
    }
`;

const LockImg = styled.img`
    position: absolute;
    top: calc(50% - 15px);
    left: calc(50% - 15px);
`;

const InitialLoader = () => (
    <LoaderWrapper>
        <Loader/>
        <LockImg src={lock} alt=""/>
    </LoaderWrapper>
);

export default InitialLoader;
