import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    position: relative;
    width: 100%;
    margin: 12px 0 0;
    display: flex;
    flex-direction: column;
`;

const LabelWrapper = styled.div`
    position: absolute;
    margin: 0 0 5px 10px;
    padding: 2px;
    display: flex;
    align-items: center;
    background-color: ${props => props.theme.palette.clrback};
`;

const Label = styled.p`
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    line-height: 0.8;
    color: ${props => props.theme.palette.depositLabel};
`;

const InputWrapper = styled.div`
    margin-top: 10px;
    display: flex;
`;

const Input = styled.input`
    width: 100%;
    padding: 11px;
    background-color: ${props => props.theme.palette.depositInputBackground};
    border: 1px solid ${props => props.theme.palette.depositInputBorder};
    border-radius: ${props => props.theme.palette.borderRadius};
    font-size: 14px;
    font-weight: 600;
    color: ${props => props.theme.palette.contrastText};
    // color: ${props => props.theme.palette.depositText};
    
    &:focus {
        outline: none;
    }
    
    &::placeholder {
        color: ${props => props.theme.palette.depositText};
    }
`;

const InputField = ({
    className, label, placeholder, value, changeValue, readOnly,
}) => (
    <Wrapper className={className}>
        <LabelWrapper>
            <Label>{label}</Label>
        </LabelWrapper>

        <InputWrapper>
            <Input
                type="text"
                placeholder={placeholder || ''}
                value={value}
                readOnly={readOnly}
                onChange={e => changeValue ? changeValue(e.target.value) : null}
            />
        </InputWrapper>
    </Wrapper>
);

export default InputField;
