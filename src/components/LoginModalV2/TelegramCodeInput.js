import React, { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div.attrs({ className: 'telegram-code-input' })`
    width: 430px;
    margin-bottom: 22px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    input.form-control {
        margin: 0 6px 0 0;
        border: 1px solid ${props => props.theme.palette.telegramLoginControlBorderColor};
        border-radius: 4px;
        width: 67px;
        height: 61px;
        text-align: center;
        background-color: ${props => props.theme.palette.telegramLoginControlBackground};
        color: ${props => props.theme.palette.telegramLoginControlTextColor};
        font-size: 18px;
        line-height: 2.5;

        &:focus {
            border-color: ${props => props.theme.palette.clrPurple};
            outline: none;
        }

        &:last-child {
            margin-left: 0 !important;
        }
    }
`;

class TelegramCodeInput extends Component {
    state = {
        codes: ['', '', '', '', ''],
        sendAble: false,
    };

    componentDidMount() {
        this.addKeyEvents();
    }

    addKeyEvents = () => {
        const codeInputs = document.getElementsByClassName('code');
        for (let i = 0; i < codeInputs.length; i++) {
            codeInputs[i].addEventListener('keydown', e => {
                const { codes } = this.state;

                const id = parseInt(codeInputs[i].id.substr(4));
                if (e.keyCode > 47 && e.keyCode < 58) {
                    if (!codes[id]) {
                        codes[id] = e.keyCode - 48;
                        this.setState({ codes: codes.splice(0) });
                        this.handleChange();

                        this.goNextInput(id);
                    }
                } else if (e.keyCode === 37) {
                    // Left Arrow
                    this.goPreviousInput(id);
                } else if (e.keyCode === 39) {
                    // Right Arrow
                    this.goNextInput(id);
                } else if (e.keyCode === 8) {
                    // Backspace
                    if (codes[id]) {
                        codes[id] = '';
                        this.setCodes(codes);
                    } else {
                        if (id > 0) {
                            codes[id - 1] = '';
                            this.setCodes(codes);
                        }
                        this.goPreviousInput(id);
                    }
                } else if (e.keyCode === 46) {
                    // Delete
                    if (codes[id]) {
                        codes[id] = '';
                        this.setCodes(codes);
                    }
                }
            });
        }

        document.getElementById('code0').focus();
    };

    setCodes = codes => {
        this.setState({
            codes: codes.splice(0),
        });
        this.handleChange();
    };

    goNextInput = id => {
        if (id < 4) {
            document.getElementById('code' + (id + 1)).focus();
        }
    };

    goPreviousInput = id => {
        if (id > 0) {
            document.getElementById('code' + (id - 1)).focus();
        }
    };

    handleChange = () => {
        const confirmCode = this.state.codes.join('');
        this.props.changeSendAble(confirmCode);
    };

    render() {
        const { step1Disabled } = this.props;
        const { codes } = this.state;

        return (
            <Wrapper>
                <input
                    type="text"
                    id="code0"
                    className="form-control code"
                    readOnly={step1Disabled}
                    value={codes[0]}
                />

                <input
                    type="text"
                    id="code1"
                    className="form-control code"
                    readOnly={step1Disabled}
                    value={codes[1]}
                />

                <input
                    type="text"
                    id="code2"
                    className="form-control code"
                    readOnly={step1Disabled}
                    value={codes[2]}
                />

                <input
                    type="text"
                    id="code3"
                    className="form-control code"
                    readOnly={step1Disabled}
                    value={codes[3]}
                />

                <input
                    type="text"
                    id="code4"
                    className="form-control code"
                    readOnly={step1Disabled}
                    value={codes[4]}
                />
            </Wrapper>
        );
    }
}

export default TelegramCodeInput;
