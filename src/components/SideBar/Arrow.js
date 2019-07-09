/* eslint-disable react/no-danger */
import React from 'react';
import styled from 'styled-components';

import { renderSvg } from '../../utils';

const Wrapper = styled.div`
    content: '';
    width: 15px;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.theme.palette.sidebarBackground};
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.1s;
    border: 1px solid ${props => props.theme.palette.clrBorder};
    border-left: 0;
    border-radius: 0 ${props => props.theme.palette.borderRadius} ${props => props.theme.palette.borderRadius} 0;
    transform: translateX(15px);
`;

const Icon = styled.svg`
    transform: rotate(-90deg);
    width: 9px;
    height: 12px;
    fill: ${props => props.theme.palette.sidebarArrowIcon};
`;

const Arrow = props => (
    <Wrapper className="arrow-wrapper">
        <Icon
            role="img"
            aria-hidden="true"
            dangerouslySetInnerHTML={{
                __html: renderSvg('arrow-drop-2'),
            }}
        />
    </Wrapper>
);

export default Arrow;
