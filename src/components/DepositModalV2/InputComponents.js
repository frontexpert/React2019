import React from 'react';
import styled from 'styled-components';

export const InputOuterWrapper = styled.div.attrs({ className: 'input-field-outer-wrapper' })`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    margin: 0;
    border: none;
    width: 100%;
    padding: 24px 15px;
`;

export const Label = styled.span.attrs({ className: 'input-field-label' })`
    margin: 0 0 10px;
    padding: 0;
    width: 100%;
    text-align: left;
    font-size: 16px;
    font-weight: 500;
    color: ${props => props.theme.palette.clrPurple};
    line-height: 1em;
`;

export const InputFieldWrapper = styled.div.attrs({ className: 'input-field-wrapper' })`
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: stretch;
    margin: 0;
    border: 1px solid ${props => props.theme.palette.clrPurple};
    border-radius: ${props => props.theme.palette.borderRadius};
    padding: 0;
    width: 100%;
    height: 60px;
    background: ${props => props.theme.palette.clrBackground};
    overflow: visible;
`;

export const Input = styled.input.attrs({ className: 'input-field-input' })`
    flex: 1 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    text-align: ${props => props.textAlign ? props.textAlign : 'left'};
    margin: 0;
    border: none;
    padding: 5px 15px;
    width: 100%;
    height: 100%;
    background: transparent;
    outline: none !important;
    font-size: ${props => props.fontSize ? props.fontSize : 18}px;
    font-weight: 300;
    color: ${props => props.theme.palette.clrHighContrast};
`;

export const InputAddon = styled.div.attrs({ className: 'input-addon' })`
    flex: 0 0 60px;
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 0;
    border: none;
    border-left: 1px solid ${props => props.theme.palette.clrPurple};
    padding: 0;
    height: 100%;
    cursor: pointer;

    color: ${props => props.theme.palette.clrMouseClick};

    svg {
        &, & * {
            fill: ${props => props.theme.palette.clrMouseClick};
        }
    }

    &:hover {
        background: ${props => props.theme.palette.clrMouseClick};
        color: ${props => props.theme.palette.clrHighContrast};

        svg {
            &, & * {
                fill: ${props => props.theme.palette.clrHighContrast};
            }
        }
    }

    &:disabled {
      cursor: not-allowed;
    }
    
    .telegram-channel-avatar {
        margin: 0;
    }
`;

export class InputField extends React.PureComponent {
    state = {};

    render() {
        const {
            label,
            onChange,
            value,
            addons,
            ...props
        } = this.props;

        return (
            <InputOuterWrapper>
                <Label>{label}</Label>

                <InputFieldWrapper>
                    <Input onChange={onChange} value={value} {...props}/>

                    {addons}
                </InputFieldWrapper>
            </InputOuterWrapper>
        );
    }
}

export default InputField;
