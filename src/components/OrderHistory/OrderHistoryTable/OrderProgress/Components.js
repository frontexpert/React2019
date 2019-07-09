import React from 'react';
import styled, { keyframes } from 'styled-components';

export const WrapperCircle = styled.div`
    position: absolute;
    width: 42px;
    height: 42px;
    ${props => props.isLeft ? 'left: -21px' : 'right: -18px'};    
`;
