import React from 'react';
import styled from 'styled-components';

export const Wrapper = styled.section`
    position: relative;
    padding: 40px 40px 20px;
    display: flex;
    flex-direction: column;
    background-color: ${props => props.theme.palette.depositBackground};
    border: 1px solid ${props => props.theme.palette.depositBorder};
    border-radius: ${props => props.submitted ? `${props.theme.palette.borderRadius} ${props.theme.palette.borderRadius} 0 0` : props.theme.palette.borderRadius};
    box-shadow: 0 3px 15px rgba(0, 0, 0, .5);
    color: ${props => props.theme.palette.depositText};
`;

export const HeaderImages = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    
    .coin-icon {
        width: 40px;
        height: 40px;
        background-size: cover !important;
    }
    
    .arrow {
        height: 20px;
        margin: 0 10px;
    }
`;

export const Description = styled.div`
    margin-top: 12px;
    font-size: 16px;
    font-weight: 400;
    color: ${props => props.theme.palette.depositText};
    text-align: center;

    span {
        font-weight: bold;
    }
`;

export const ModeWrapper = styled.div`
    width: 100%;
    margin-top: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    img {
        margin-left: 8px;
    }
`;

export const Mode = styled.div`
    height: 46px;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.theme.palette.depositInputBackground};
    border: 1px solid ${props => props.theme.palette.depositInputBorder};
    cursor: pointer;

    &:first-child {
        border-radius: ${props => props.theme.palette.borderRadius} 0 0 ${props => props.theme.palette.borderRadius};

        img {
            height: 30px;
        }
    }

    &:last-child {
        border-radius: 0 ${props => props.theme.palette.borderRadius} ${props => props.theme.palette.borderRadius} 0;

        img {
            height: 20px;
        }
    }

    &.active {
        background-color: ${props => props.theme.palette.depositActiveBack};
    }
`;

export const CreditSection = styled.div`
    position: absolute;
    top: calc(100% + 1px);
    left: -1px;
    right: -1px;
    z-index: 5000;
    padding: 40px 40px 20px;
    display: flex;
    flex-direction: column;
    background-color: ${props => props.theme.palette.depositBackground};
    border: 1px solid ${props => props.theme.palette.depositBorder};
    border-top: 0;
    border-radius: 0 0 ${props => props.theme.palette.borderRadius} ${props => props.theme.palette.borderRadius};
    box-shadow: 0 3px 15px rgba(0, 0, 0, .5);
    
    > div:first-child {
        margin-top: 0;
    }
    
    input {
        font-weight: 600;
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

export const CvcWrapper = styled.div`
    display: flex;
    align-items: center;
    
    .flex-1 {
        flex: 1;
        
        input {
            text-align: center;
        }
        
        &:first-child input {
            border-radius: ${props => props.theme.palette.borderRadius} 0 0 ${props => props.theme.palette.borderRadius};
        }
        
        &:last-child input {
            border-radius: 0 ${props => props.theme.palette.borderRadius} ${props => props.theme.palette.borderRadius} 0;
        }
    }
`;

export const PaypalSection = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 5000;
    padding: 0 25px 25px;
    background-color: ${props => props.theme.palette.clrback};
    border-radius: 0 0 ${props => props.theme.palette.borderRadius} ${props => props.theme.palette.borderRadius};
    // box-shadow: 0 3px 15px rgba(0, 0, 0, .5);
`;

export const Button = styled.button`
    width: 100%;
    padding: 0;
    background: transparent;
    border: 0;
    border-radius: 0;
    cursor: pointer;
    outline: none !important;

    img {
        width: 100%;
        border-radius: 8px;
    }
`;

const CustomSvg = styled.svg`
    width: 40px;
    height: 21px;
    margin: 0 10px;
    fill: ${props => props.theme.palette.depositBorder};
`;

export const Arrow = props => (
    <CustomSvg {...props} viewBox="0 0 39.86 20.79">
        <polygon points="1.7 13.1 29.89 13.1 29.89 16.61 37.01 10.44 29.89 4.18 29.89 7.88 1.87 7.88 0.17 5.98 27.99 5.98 27.99 0 39.86 10.44 27.99 20.79 27.99 15 0 15 1.7 13.1" />
    </CustomSvg>
);
