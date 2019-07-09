import React from 'react';
import styled from 'styled-components';
import checkboxImg from '../../../PayApp/PayWindow/icons/checkbox.png';
import checkboxCheckedImg from '../../../PayApp/PayWindow/icons/checkbox_checked.png';

export const Wrapper = styled.div`
    position: relative;
`;

const ImageWrapper = styled.div`
    position: relative;
    width: ${props => props.size || 35}px;
    height: ${props => props.size || 35}px;
    margin-left: ${props => props.marginLeft || 0}px;
    margin-right: ${props => props.marginRight || 0}px;
    margin-top: ${props => props.marginRight || 0}px;
    cursor: pointer;

    img {
        width: 100%;
    }
    .active {
        display: none;
    }

    &:hover {
        cursor: pointer;
    }

    ${props => props.active ? `
        .active {
            display: block;
        }

        .inactive {
            display: none;
        }
    ` : ''};
`;
export const Checkbox = (props) => (
    <ImageWrapper {...props}>
        <img src={checkboxImg} className="inactive" alt="" />
        <img src={checkboxCheckedImg} className="active" alt="" />
    </ImageWrapper>
);