/* eslint jsx-a11y/label-has-for: 0 */  // --> OFF
import React from 'react';
import styled from 'styled-components';
import { lifecycle } from 'recompose';
import ClipboardJS from 'clipboard';

import {
    CopyIcon,
    SubmitIcon,
    CheckIcon,
    SendArrowIcon
} from './icons';
import AdditionalWarningModal from '../../AdditionalWarningModal';

const Wrapper = styled.div`
    position: relative;
    width: 100%;
    margin: 6px 0 0;
    display: flex;
    flex-direction: column;
`;

const LabelWrapper = styled.div`
    position: absolute;
    margin: 0 0 5px 10px;
    padding: 2px;
    display: flex;
    align-items: center;
    background-color: ${props => props.theme.palette.depositBackground};
`;

const Label = styled.p`
    margin: -7px 0 0;
    font-size: 16px;
    font-weight: 600;
    line-height: 0.8;
    color: ${props => props.theme.palette.depositLabel};
`;

const InputWrapper = styled.div`
    display: flex;
    
    &:hover {
        input,
        button {
            border-color: ${props => props.theme.palette.depositActive};
        }
    }
`;

const Input = styled.input`
    width: 100%;
    padding: 11px;
    background-color: ${props => props.theme.palette.depositInputBackground};
    border: 1px solid ${props => (props.copied || props.dropdownOpened) ? props.theme.palette.depositActive : props.theme.palette.depositInputBorder};
    border-right: 0;
    border-radius: ${props => props.dropdownOpened
        ? `${props.theme.palette.borderRadius} 0 0 0`
        : `${props.theme.palette.borderRadius} 0 0 ${props.theme.palette.borderRadius}`};
    font-size: ${props => !props.isDeposit ? '14px' : '13px'};
    // color: ${props => !props.isDeposit ? props.theme.palette.contrastText : props.theme.palette.clrBorder};
    color: ${props => props.theme.palette.contrastText};
    text-overflow: ellipsis;
    
    &:focus {
        outline: none;
    }
    
    &::placeholder {
        color: ${props => props.theme.palette.depositText};
    }
`;

const Copy = styled.button`
    min-width: 40px;
    padding: 1px 7px;
    background-color: ${props => props.copied ? props.theme.palette.depositActive : props.theme.palette.depositInputBackground};
    border: 1px solid ${props => props.copied ? props.theme.palette.depositActive : props.theme.palette.depositInputBorder};
    border-radius: 0 ${props => props.theme.palette.borderRadius} ${props => props.theme.palette.borderRadius} 0;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    cursor: pointer;
    
    path {
        fill: ${props => props.copied ? props.theme.palette.contrastText : props.theme.palette.depositInputBorder};
    }
    
    &:hover {
        background-color: ${props => props.copied ? props.theme.palette.depositActive : props.theme.palette.depositInputHover};
        
        path {
            fill: ${props => props.copied ? props.theme.palette.contrastText : props.theme.palette.depositActive};
        }
    }
    
    &:active {
        background-color: ${props => props.copied ? props.theme.palette.depositActive : props.theme.palette.depositInputHover};
        
        path {
            fill: ${props => props.theme.palette.contrastText};
        }
    }
    
    &:focus {
        outline: none;
    }
`;

const Submit = styled.button`
    min-width: 40px;
    padding: 1px 7px;
    background-color: ${props => props.submitted ? props.theme.palette.depositActive : props.theme.palette.depositInputBackground};
    border: 1px solid ${props => (props.submitted || props.dropdownOpened) ? props.theme.palette.depositActive : props.theme.palette.depositInputBorder};
    border-radius: 0 ${props => props.theme.palette.borderRadius} ${props => props.theme.palette.borderRadius} 0;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    cursor: pointer;
    
    path {
        fill: ${props => props.submitted ? props.theme.palette.contrastText : props.theme.palette.depositInputBorder};
    }
    
    &:hover {
        background-color: ${props => props.submitted ? props.theme.palette.depositActive : props.theme.palette.depositInputHover};
        
        path {
            fill: ${props => props.submitted ? props.theme.palette.contrastText : props.theme.palette.depositActive};
        }
    }
    
    &:active {
        background-color: ${props => props.submitted ? props.theme.palette.depositActive : props.theme.palette.depositInputHover};
        
        path {
            fill: ${props => props.theme.palette.contrastText};
        }
    }
    
    &:focus {
        outline: none;
    }

    // svg {
    //     fill: ${props => props.submitted ? props.theme.palette.depositInputBackground : props.theme.palette.depositLink};
    // }
`;

const additionalWarningModal = (Modal, portal, additionalVerticalSpace, coin, depositAddress) => Modal({
    portal,
    additionalVerticalSpace,
    ModalComponentFn: () => <AdditionalWarningModal msg={`Confirm transfer of ${String(coin).toUpperCase()} to ${depositAddress}`}/>,
});

// actual copy to clipboard needs to be implemented
// got some troubles with refs and recompose when doing without a library
// maybe we are just to add clipboard library

const handleSubmit = ({
    submit, Modal, coin, depositAddress, value,
}) => () => {
    if (value) {
        submit();
        // additionalWarningModal(Modal, 'graph-chart', true, coin, depositAddress);
    }
};

const InputField = lifecycle({
    componentDidMount() {
        this.clipboard = new ClipboardJS('#copy_deposit');
        this.clipboard.on('success', () => {
            // self.props.copy();
        });
    },
})(({
    id,
    coin,
    depositAddress,
    value,
    changeValue,
    copied,
    copy,
    submit,
    submitted,
    label,
    Modal,
    placeholder,
    dropdownOpened,
    toggleDropdown,
    isDeposit,
    readOnly,
}) => {
    return (
        <Wrapper>
            <LabelWrapper>
                <Label>{label}</Label>
            </LabelWrapper>

            <InputWrapper>
                <Input
                    type="text"
                    id={id}
                    value={value}
                    onChange={changeValue}
                    placeholder={placeholder}
                    copied={copy && copied}
                    dropdownOpened={submit && dropdownOpened}
                    isDeposit={isDeposit}
                    readOnly={readOnly}
                    onFocus={() => {
                        if (toggleDropdown) {
                            toggleDropdown(true);
                        }
                    }}
                />

                {copy ? (
                    <Copy id="copy_deposit" onClick={copy} copied={copied} data-clipboard-target="#deposit_address">
                        {copied ? <CheckIcon/> : <CopyIcon/>}
                    </Copy>
                ) : (
                    <Submit
                        onClick={handleSubmit({
                            submit, Modal, coin, depositAddress, value,
                        })}
                        submitted={submitted}
                        dropdownOpened={dropdownOpened}
                    >
                        {submitted ? <CheckIcon/> : <SendArrowIcon/>}
                    </Submit>
                )}
            </InputWrapper>
        </Wrapper>
    );
});

export default InputField;
