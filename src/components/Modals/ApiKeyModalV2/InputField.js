import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div.attrs({ className: 'api-key-modal-input-wrapper' })`
    position: relative;
    // width: 100%;
    height: 32px;
    padding: 0 10px;
    flex: 1;
    display: flex;
    align-items: center;
    background: ${props => props.theme.palette.clrBackground};
    border: 1px solid ${props => props.theme.palette.clrBorder};
`;

const Input = styled.input`
    flex: 1;
    background: transparent;
    border: 0;
    font-size: 13px;
    color: ${props => props.theme.palette.contrastText};
    
    &:focus {
        outline: none;
    }
    
    &::placeholder {
        color: ${props => props.theme.palette.depositText};
    }
`;

const Logo = styled.img`
    width: ${props => props.size ? props.size : 20}px;
    height: ${props => props.size ? props.size : 20}px;
    margin-right: 10px;
    border-radius: 50%;
`;

export const InputField = ({
    className, placeholder, icon, size, value, changeValue, readOnly,
}) => (
    <Wrapper className={className}>
        <Logo src={`/img/exchange/${icon}`} size={size} alt=""/>

        <Input
            type="text"
            placeholder={placeholder || ''}
            value={value}
            readOnly={readOnly}
            onChange={e => changeValue ? changeValue(e.target.value) : null}
        />
    </Wrapper>
);

export default InputField;
