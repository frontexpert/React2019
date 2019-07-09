import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

import {
    CodeInputWrapper,
    InputWrapper,
    ErrorLabel,
    Label
} from './Components';

class CodeInput extends Component {
    state = {};

    render() {
        const { errorMsg, hide } = this.props;

        return (
            <CodeInputWrapper hide={hide}>
                <InputWrapper>
                    <input id="digit1" readOnly />
                    <input id="digit2" readOnly />
                    <input id="digit3" readOnly />
                    <input id="digit4" readOnly />
                </InputWrapper>

                <ErrorLabel>{errorMsg}</ErrorLabel>

                <Label onClick={this.props.resendCode}>
                    <FormattedMessage
                        id="mobile_login.label_resend_code"
                        defaultMessage="Resend Code"
                    />
                </Label>
            </CodeInputWrapper>
        );
    }
}

export default CodeInput;
