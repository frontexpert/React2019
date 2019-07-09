import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    position: relative;
    max-width: 100%;
    height: 50px;
    flex: 1;
    display: flex;
    align-items: center;
    background: ${props => props.theme.palette.clrBackground};
    border: 1px solid ${props => props.theme.palette.clrBorder};
    border-radius: ${props => props.theme.palette.borderRadius};
`;

const LabelWrapper = styled.div`
    position: absolute;
    margin: -16px 0 0 6px;
    padding: 2px;
    display: none;
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

const InputFieldWrapper = styled.div.attrs({ className: 'exch-deposit-input' })`
    max-width: 100%;
    height: 100%;
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: stretch;
    overflow: visible;
`;

const Input = styled.input`
    width: ${props => props.addonWidth ? `calc(100% - ${props.addonWidth}px)` : '100%'};
    padding: 0 10px;
    background: transparent;
    border: 0;
    font-size: 18px;
    color: ${props => props.theme.palette.contrastText};
    
    &:focus {
        outline: none;
    }
    
    &::placeholder {
        color: ${props => props.theme.palette.depositText};
    }
`;

const InputMulti = styled.textarea`
    width: ${props => props.addonWidth ? `calc(100% - ${props.addonWidth}px)` : '100%'};
    padding: 0 10px;
    background: transparent;
    border: 0;
    font-size: 18px;
    color: ${props => props.theme.palette.contrastText};
    resize: none;

    &:focus {
        outline: none;
    }
    
    &::placeholder {
        color: ${props => props.theme.palette.depositText};
    }
`;

export const InputField = ({
    className, id, addonWidth, label, placeholder, icon, size, value, changeValue, readOnly, addon, multiLine,
}) => (
    <Wrapper className={className}>
        <LabelWrapper>
            <Label>{label}</Label>
        </LabelWrapper>

        <InputFieldWrapper>
            {multiLine ? (
                <InputMulti
                    autoFocus
                    type="text"
                    id={id}
                    addonWidth={addonWidth}
                    placeholder={placeholder || ''}
                    value={value}
                    readOnly={readOnly}
                    onChange={e => changeValue ? changeValue(e.target.value) : null}
                />
            ) : (
                <Input
                    autoFocus
                    type="text"
                    id={id}
                    addonWidth={addonWidth}
                    placeholder={placeholder || ''}
                    value={value}
                    readOnly={readOnly}
                    onChange={e => changeValue ? changeValue(e.target.value) : null}
                />)
            }
            {addon}
        </InputFieldWrapper>
    </Wrapper>
);

export default InputField;
