import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.button`
    position: relative;
    width: ${props => props.width};
    min-height: 32px;
    margin-bottom: ${props => props.bottomSpace};
    background: ${props => props.background
        ? props.theme.palette.sendCoinsModalConfirmBackground
        : props.theme.palette.modalCancelBackground};
    border: none;
    border-radius: ${props => props.theme.palette.borderRadius};
    font-size: 0.8rem;
    font-weight: bold;
    color: ${props => props.theme.palette.contrastText};
    text-transform: uppercase;
    align-self: center;
    
    &:after {
        content: "";
        position: absolute;
        top: 50%;
        right: -4px;
        bottom: 0;
        z-index: 0;
        width: 19px;
        height: 18px;
        display: ${props => props.background ? 'block' : 'none'};
        background: ${props => props.theme.palette.sendCoinsModalConfirmBackground};
        border-radius: 5px 3px 5px;
        transform: rotate(45deg) skew(20deg,20deg) translateY(-50%);
        transition: all 0.1s;
    }
    
    &:hover {
        cursor: pointer;
        filter: brightness(110%);
    }
    
    &:focus {
        outline: none;
    }
    
    @media only screen and (min-width : 1920px) {
        font-size: 1rem;
    }
`;

const Button = ({
    onClick, background, text, bottomSpace, width,
}) => (
    <Wrapper
        onClick={onClick}
        background={background}
        bottomSpace={bottomSpace}
        width={width}
    >
        {text}
    </Wrapper>
);

export default Button;
