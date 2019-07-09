import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
    padding: 0 20px 0 28px;
    height: 45px;
    display: flex;
    flex: 0 0 245px;
    align-items: center;
    background: #286bb4;
    color: #fff;
    cursor: pointer;
    margin: 0 0 0 16px;
    text-decoration: none;
    font-size: 23px;
    font-weight: 800;
    letter-spacing: -0.03em;
    transition: all 0.1s;
    justify-content: center;
    border: none;
    line-height: 1;
    width: 95%;
    border-radius: 5px;

    &:hover{
      background: #026ba0;
    }

    @media (max-width: 1550px) {
        font-size: 1.1rem;
    }
`;

const OrderNowButton = ({onClick}) => {
    return (
        <StyledButton onClick={onClick}>
            Convert &#8594;
        </StyledButton>
    )
};

export default OrderNowButton;