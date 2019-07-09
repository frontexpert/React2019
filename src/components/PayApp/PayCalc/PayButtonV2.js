import React from 'react';
import styled from 'styled-components';
import { darkTheme } from '../../../theme/core';

const { palette } = darkTheme;

const Wrapper = styled.div`
    width: ${props => props.width ? (props.width + 'px') : '60%'};
    height: 60px;
    margin: 0;
    padding: 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: ${palette.clrBackground};
    border: 2px solid ${props => props.disabled ? palette.mobile2PayViewPayBtnDisabled : palette.mobile2PayViewPayBtnBorderColor};
    border-radius: 100px;
    font-size: 24px;
    font-weight: 300;
    line-height: 1em;
    color: ${props => props.disabled ? palette.mobile2PayViewPayBtnDisabled : palette.mobile2PayViewPayBtnColor};
    box-shadow: 0 0 24px 0 ${props => props.disabled ? palette.mobile2PayViewPayBtnDisabled : palette.clrBlue};
    
    .selected-item {
        color: ${props => props.disabled ? palette.mobile2PayViewPayBtnDisabled : palette.mobile2PayViewPayBtnColor} !important;
    }
    
    &:hover {
        background: ${props => props.disabled ? palette.mobile2PayViewPayBtnDisabled : palette.clrMouseClick};
    }
    
    @media screen and (min-width: 768px) {
        height: 120px;
        font-size: 48px;
    }
`;

class PayButtonV2 extends React.Component {
    state = {};

    render() {
        const {
            width,
            children,
        } = this.props;

        return (
            <Wrapper width={width} {...this.props}>
                {children}
            </Wrapper>
        );
    }
}

export default PayButtonV2;
