import React, { Component } from 'react';
import styled from 'styled-components';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { CheckIcon, SubmitIcon } from '../DepositModal/icons';
import { formatStringMinMax } from '../../../utils';

const Wrapper = styled.div`
    position: relative;
    width: 100%;
    margin: 8px 0 10px;
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
    // font-weight: 700;
    line-height: 0.8;
    color: ${props => props.theme.palette.depositLabel};
`;

const StyleWrapper = styled.div`
    width: 230px;
    display: flex;
    align-items: flex-end;
`;

const InputWrapper = styled.div`
    width: ${props => props.showSubmit ? 'calc(100% - 40px)' : '100%'};
    margin-top: 10px;
    display: flex;
    align-items: center;
    background-color: ${props => props.theme.palette.depositInputBackground};
    border: 1px solid ${props => props.theme.palette.depositInputBorder};
    border-radius: ${props => props.opened
        ? (props.showSubmit ? `${props.theme.palette.borderRadius} 0 0 0` : `${props.theme.palette.borderRadius} ${props.theme.palette.borderRadius} 0 0`)
        : (props.showSubmit ? `${props.theme.palette.borderRadius} 0 0 ${props.theme.palette.borderRadius}` : props.theme.palette.borderRadius)
};
`;

const Input = styled.input`
    width: calc(100% - 40px);
    padding: 11px;
    flex: 1;
    background: transparent;
    border: none;
    font-size: 14px;
    font-weight: 600;
    color: ${props => props.theme.palette.contrastText};
    
    &:focus {
        outline: none;
    }
    
    &::placeholder {
        color: ${props => props.theme.palette.depositText};
    }
`;

const ArrowSvg = styled.svg`
    width: 16px;
    height: 16px;
    margin: 0 12px;
    transform: ${props => props.opened ? 'rotate(180deg)' : 'rotate(0)'};
    stroke: ${props => props.theme.palette.depositText};
    fill: none;
    cursor: pointer;
`;

const ArrowIcon = props => (
    <ArrowSvg {...props} viewBox="0 0 15 8.91">
        <path strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" d="M14 1L7.5 7.5 1 1"/>
    </ArrowSvg>
);

const Dropdown = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    // top: calc(100% + 10px);
    top: 100%;
    z-index: 5000;
    background-color: ${props => props.theme.palette.depositInputBackground};
    border: 1px solid ${props => props.theme.palette.depositInputBorder};
    border-top: 0;
    border-radius: 0 0 ${props => props.theme.palette.borderRadius} ${props => props.theme.palette.borderRadius};
    
    // &::before {
    //     content: '';
    //     position: absolute;
    //     right: 10px;
    //     top: -8px;
    //     width: 0;
    //     height: 0;
    //     border-style: solid;
    //     border-width: 0 10px 8px 10px;
    //     border-color: transparent transparent ${props => props.theme.palette.depositInputBorder} transparent;
    //     z-index: 1;
    // }
    //
    // &::after {
    //     content: '';
    //     position: absolute;
    //     right: 10px;
    //     top: -7px;
    //     width: 0;
    //     height: 0;
    //     border-style: solid;
    //     border-width: 0 10px 8px 10px;
    //     border-color: transparent transparent ${props => props.theme.palette.clrback} transparent;
    //     z-index: 2;
    // }
    
    .scrollbar-container {
        height: 167px;
    }
    
    .ps__rail-y {
        background-color: ${props => props.theme.palette.depositInputBackground} !important;
        border-left: 1px solid ${props => props.theme.palette.depositInputBorder};
        opacity: 1 !important;
        
        .ps__thumb-y {
            z-index: 9999;
            cursor: pointer;
            
            &:before {
                background-color: ${props => props.theme.palette.depositBorder};
            }
        }
    }
`;

const DropdownItem = styled.div`
    padding: 11px;
    border-top: 1px solid ${props => props.theme.palette.depositInputBorder};
    font-size: 14px;
    font-weight: normal;
    color: ${props => props.theme.palette.depositText};
    
    // &:not(:first-child) {
    & {
        cursor: pointer;
        
        &:hover {
            background: ${props => props.theme.palette.depositInputHover};
            color: ${props => props.theme.palette.depositActive};
        }
        
        &:active {
            background: ${props => props.theme.palette.depositActiveBack};
            font-weight: 600;
            color: ${props => props.theme.palette.contrastText};
        }
    }
    
    &:first-child {
    //     border-radius: ${props => props.theme.palette.borderRadius} ${props => props.theme.palette.borderRadius} 0 0;
    //     font-size: 18px;
    //     font-weight: bold;
    //     color: ${props => props.theme.palette.contrastText};
        border-top: 0;
    }
    
    &:last-child {
        border-radius: 0 0 ${props => props.theme.palette.borderRadius} ${props => props.theme.palette.borderRadius};
    }
`;

const Submit = styled.button`
    min-width: 40px;
    height: 41px;
    padding: 1px 7px;
    background-color: ${props => props.submitted ? props.theme.palette.depositActive : props.theme.palette.depositInputBackground};
    border: 1px solid ${props => props.submitted ? props.theme.palette.depositActive : props.theme.palette.depositInputBorder};
    border-left: 0;
    border-radius: 0 ${props => props.theme.palette.borderRadius} ${props => props.theme.palette.borderRadius} 0;
    display: ${props => props.show ? 'flex' : 'none'};
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
`;

const list = [
    1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000,
    11000, 12000, 13000, 14000, 15000, 16000, 17000, 18000, 19000, 20000
];

class SelectField extends Component {
    state = {
        opened: false,
    };

    toggleDropdown = () => {
        this.setState({ opened: !this.state.opened });
    };

    changeValue = value => {
        this.props.changeValue(value);
        this.toggleDropdown();

        if (value === '') {
            this.inputRef.focus();
        }
    };

    render() {
        const {
            label, value, changeValue, submitted,
        } = this.props;
        const { opened } = this.state;

        return (
            <Wrapper>
                <LabelWrapper>
                    <Label>{label}</Label>
                </LabelWrapper>

                <StyleWrapper>
                    <InputWrapper opened={opened} showSubmit={value !== ''}>
                        <Input
                            innerRef={ref => {
                                this.inputRef = ref;
                            }}
                            type="text"
                            value={`$${formatStringMinMax(value, 0, 0)}`}
                            // onChange={e => changeValue(e.target.value)}
                            readOnly
                            showSubmit={value !== ''}
                        />

                        <ArrowIcon opened={opened} onClick={this.toggleDropdown}/>
                    </InputWrapper>

                    <Submit show={value !== ''} submitted={submitted} onClick={this.props.onSubmit}>
                        {submitted ? <CheckIcon/> : <SubmitIcon/>}
                    </Submit>

                    {/* <a href="https://www.bct.io/buy" target="_blank" rel="noopener noreferrer"> */}
                    {/* <Submit show={value !== ''} submitted={submitted}> */}
                    {/* {submitted ? <CheckIcon/> : <SubmitIcon/>} */}
                    {/* </Submit> */}
                    {/* </a> */}
                </StyleWrapper>

                {opened && (
                    <Dropdown>
                        <PerfectScrollbar
                            option={{
                                suppressScrollX: true,
                                minScrollbarLength: 30,
                            }}
                        >
                            {list.map((item, i) => (
                                <DropdownItem key={i} onClick={() => this.changeValue(item)}>${formatStringMinMax(item, 0, 0)}</DropdownItem>
                            ))}
                        </PerfectScrollbar>
                    </Dropdown>
                )}
            </Wrapper>
        );
    }
}

export default SelectField;
