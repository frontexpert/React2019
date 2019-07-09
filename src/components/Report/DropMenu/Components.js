import React from 'react';
import styled from 'styled-components';

export const Wrapper = styled.div.attrs({ className: 'dropmenu-wrapper' })`
    box-sizing: border-box;
    display: block;
    font-weight: 400;
    font-size: 11px;
    height: 35px;
    letter-spacing: 1px;
    padding: 10px;
    position: relative;
    user-select: none;
    
    &:after {
        background-image: url(/img/icon_dp_back.svg);
        background-position-x: 50%;
        background-position-y: 50%;
        background-size: 20px;
        content: " ";
        cursor: pointer;
        display: block;
        height: 10px;
        opacity: 0.6;
        position: absolute;
        right: 6px;
        top: 15px;
        width: 14px;
        z-index: 101;
    }
`;

export const Label = styled.div`
    box-sizing: border-box;
    cursor: pointer;
    display: block;
    height: 13px;
    padding-right: 13px;
    user-select: none;
    
    .label {
        box-sizing: border-box;
        color: #09f;
        cursor: pointer;
        display: inline;
        user-select: none;
    }
    
    .value {
        box-sizing: border-box;
        cursor: pointer;
        display: inline;
        margin-left: 6px;
        user-select: none;
    }
`;

export const DropdownList = styled.div`
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    box-sizing: border-box;
    background-color: #fff;
    box-shadow: 0 0 5px 0 rgba(0,0,0,0.3);
    display: ${props => props.opened ? 'block' : 'none'};
    position: absolute;
    right: 0px;
    top: 30px;
    user-select: none;
    width: auto;
    z-index: 1000;
    text-align: left;
`;

export const DropdownItem = styled.div`
    box-sizing: border-box;
    cursor: pointer;
    display: block;
    padding: 5px 14px;
    position: relative;
    text-overflow: ellipsis;
    user-select: none;
    white-space: nowrap;
    
    &:hover {
        background-color: #0057a3;
        color: #fff;
    }
    
    ${props => props.isActive ? `
        color: #0057a3;
    ` : ''}
`;