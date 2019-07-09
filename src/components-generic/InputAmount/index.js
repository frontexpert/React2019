import styled from 'styled-components';
import React from 'react';

const InputIntegerAmount = styled.input`
    margin: 0;
    border: none;
    width: 100%;
    min-width: 30px;
    height: 100%;
    text-align: right;
    font-size: 25px;
    font-weight: bold;
    line-height: 1em;
    color: ${props => props.theme.palette.clrHighContrast};
    background: transparent;
    outline: none !important;
`;

const InputDecimalAmount = styled.input`
    width: 0;
    margin: 0;
    padding: 0;
    padding-bottom: 6px;
    border: none;
    height: 60%;
    text-align: left;
    font-size: 16px;
    font-weight: bold;
    line-height: 1em;
    margin-left: 1px;
    color: ${props => props.theme.palette.clrHighContrast};
    background: transparent;
    outline: none !important;

    &::-webkit-input-placeholder {
        color: rgba(127, 139, 194, .8);
    }
`;

const InputAmountWrapper = styled.div`
    flex: 1 1;
    justify-content: flex-end;
    margin: 0;
    border: none;
    width: 100%;
    height: 60%;

    position: relative;
    display: contents;
    padding: 0;
    color: #999;
    background: transparent;
    outline: none !important;
`;

class InputAmount extends React.Component {
    constructor(props) {
        super(props);

        this.integerFocus = false;
        this.decimalFocus = false;
        this.ignoreFocus = false;
    }

    componentDidUpdate() {
        const {
            value,
        } = this.props;

        const integerVal = value.split('.')[0];
        const decimalVal = value.split('.').length === 2 ? value.split('.')[1] : '';
        if (this.amountIntegerInputRef) {
            this.amountIntegerInputRef.setAttribute('style', 'width:' + (integerVal.length * 20) + 'px;');
        }
        if (this.amountDecimalInputRef && this.decimalFocus && decimalVal.length < 2) {
            this.amountDecimalInputRef.setAttribute('style', 'min-width: 20px;');
        } else if (this.amountDecimalInputRef) {
            this.amountDecimalInputRef.setAttribute('style', 'width:' + (decimalVal.length * 11) + 'px;');
        }
    }

    handleIntegerKeyDown = (e) => {
        if (this.amountIntegerInputRef) {
            if (e.key === 'Enter') this.amountIntegerInputRef.blur();
            if (e.key === '.') {
                this.ignoreFocus = true;
                setTimeout(() => {
                    this.ignoreFocus = false;
                }, 200);
                this.amountDecimalInputRef.focus();
            }
        }
    };

    handleDecimalKeyDown = (e) => {
        if (this.amountDecimalInputRef) {
            if (e.key === 'Enter') this.amountDecimalInputRef.blur();
            if (e.key === 'Backspace' && this.amountDecimalInputRef.value === '') {
                this.ignoreFocus = true;
                setTimeout(() => {
                    this.ignoreFocus = false;
                }, 200);
                this.amountIntegerInputRef.focus();
            }
        }
    };

    handleAmountChange = () => {
        const {
            onChange,
        } = this.props;
        const val = this.amountIntegerInputRef.value + '.' + this.amountDecimalInputRef.value;
        onChange(val);
    };

    render() {
        const {
            value,
            onFocus,
            onBlur,
        } = this.props;

        let integerVal = value.split('.')[0];
        const decimalVal = value.split('.').length === 2 ? value.split('.')[1] : '';
        if (this.decimalFocus && integerVal === '') integerVal = '0';

        return (
            <InputAmountWrapper>
                <InputIntegerAmount
                    innerRef={ref => {
                        this.amountIntegerInputRef = ref;
                    }}
                    value={integerVal}
                    onChange={() => {
                        if (!this.ignoreFocus) this.handleAmountChange();
                    }}
                    onKeyDown={this.handleIntegerKeyDown}
                    onFocus={() => {
                        if (!this.ignoreFocus) onFocus();
                    }}
                    onBlur={() => {
                        if (!this.ignoreFocus) onBlur();
                    }}
                />
                <InputDecimalAmount
                    innerRef={ref => {
                        this.amountDecimalInputRef = ref;
                    }}
                    value={decimalVal}
                    placeholder="00"
                    onChange={this.handleAmountChange}
                    onKeyDown={this.handleDecimalKeyDown}
                    onFocus={() => {
                        this.decimalFocus = true;
                        if (!this.ignoreFocus) {
                            onFocus();
                            this.ignoreFocus = true;
                            setTimeout(() => {
                                this.ignoreFocus = false;
                            }, 200);
                            this.amountIntegerInputRef.focus();
                        }
                    }}
                    onBlur={() => {
                        this.decimalFocus = false;
                        if (!this.ignoreFocus) onBlur();
                    }}
                />
            </InputAmountWrapper>
        );
    }
}
export default InputAmount;