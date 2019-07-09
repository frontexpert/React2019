import React, { Component } from 'react';

import {
    Wrapper, Content, AlertIcon
} from './Components';

class WarningModal extends Component {
    state = {};

    render() {
        const { msg } = this.props;
        return (
            <Wrapper>
                <AlertIcon/>
                <Content>
                    { msg }
                </Content>
            </Wrapper>
        );
    }
}

export default WarningModal;
