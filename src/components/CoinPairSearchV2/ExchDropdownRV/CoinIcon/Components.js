import React from 'react';
import styled from 'styled-components';

export const Wrapper = styled.div`
    position: ${props => props.isOpened ? 'absolute' : 'relative'};
    width: ${props => props.isOpened ? '100%' : `${props.width || 38}px`};
    height: ${props => props.height || 60}px;
    display: flex;
    align-items: center;
    
    ${props => props.isOpened ? `
        left: 0;
        top: 0;
        z-index: 10;
        padding: 0 10px;
        background-color: ${props.theme.palette.coinPairSelectBg};
        border: 1px solid ${props.theme.palette.coinPairSelectBorder};
        border-radius: ${props.theme.palette.borderRadius};
    ` : ''};
    &:hover {
        .coin-icon-wrapper {
            display: none;
        }
    }
    .social-link-wrapper {
        display: flex;
        width: max-content;
    }
    .social-link-list {
        display: flex;
        flex-direction: column;
        a {
            margin-bottom: 10px;
        }
    }
`;

export const DropdownWrapper = styled.div`
    position: absolute;
    top: 100%;
    z-index: 100;
    width: 38px;
    padding-top: 12px;
    cursor: initial;
    
    > * {
        margin-top: 10px;
    }
    
    .img-icon {
        width: 38px;
        height: 38px;
    }
    
    a {
        width: 38px;
        height: 38px;
        display: block;
    }
`;

export const Row = styled.div`
    display: flex;
    align-items: center;
    white-space: nowrap;
    
    span {
        margin-left: 10px;
        font-size: 20px;
        font-weight: 500;
        color: ${props => props.theme.palette.clrHighContrast};
    }
`;

const IconSvg = styled.svg`
    width: ${props => props.size || 38}px;
    height: ${props => props.size || 38}px;
    cursor: pointer;
    
    .cls-1 {
        fill: ${props => props.theme.palette.clrHighContrast};
    }
    
    .cls-2 {
        fill: none;
        stroke: ${props => props.theme.palette.clrHighContrast};
        stroke-miterlimit: 10;
        stroke-width: 1.52px;
    }
`;

export const InfoIcon = (props) => (
    <IconSvg {...props} viewBox="0 0 38.62 38.62">
        <path className="cls-1" d="M31.17,10.19a.76.76,0,1,0,.76-.76.76.76,0,0,0-.76.76Z"/>
        <path
            className="cls-1"
            d="M34.21,19.31a14.76,14.76,0,0,1-.29,2.89.75.75,0,0,0,.59.89l.15,0a.77.77,0,0,0,.75-.61,16.2,16.2,0,0,0,.32-3.19,15.88,15.88,0,0,0-1.54-6.85.76.76,0,1,0-1.38.66,14.2,14.2,0,0,1,1.4,6.19Z"
        />
        <path
            className="cls-1"
            d="M23.11,26.15h-.76V16.27a.76.76,0,0,0-.76-.76H15.51a.76.76,0,0,0-.76.76v3a.76.76,0,0,0,.76.76h.76v6.08h-.76a.76.76,0,0,0-.76.76v3a.76.76,0,0,0,.76.76h7.6a.76.76,0,0,0,.76-.76v-3a.76.76,0,0,0-.76-.76Zm-.76,3H16.27V27.67H17a.76.76,0,0,0,.76-.76v-7.6a.76.76,0,0,0-.76-.76h-.76V17h4.56v9.88a.76.76,0,0,0,.76.76h.76Z"
        />
        <path className="cls-1" d="M19.31,14a3,3,0,1,0-3-3,3,3,0,0,0,3,3Zm0-4.56A1.52,1.52,0,1,1,17.79,11a1.52,1.52,0,0,1,1.52-1.52Z"/>
        <circle className="cls-2" cx="19.31" cy="19.31" r="18.55"/>
    </IconSvg>
);

export const InfoWrapper = styled.div`
    height: 100%;
    margin-left: auto;
    padding: 0 0 0 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    // border-left: 1px solid ${props => props.theme.palette.coinPairSelectBorder};
    font-size: 16px;
    color: ${props => props.theme.palette.clrPurple};
    white-space: nowrap;

    span {
        color: ${props => props.theme.palette.clrHighContrast};
    }
`;
