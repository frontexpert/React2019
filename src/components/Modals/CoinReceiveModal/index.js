import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { FormattedMessage } from 'react-intl';

import {
    Wrapper, Content, AlertIcon
} from './Components';
import { STORE_KEYS } from '../../../stores';
import { customDigitFormat } from '../../../utils';

class CoinReceiveModal extends Component {

    componentDidMount() {
        const {
            [STORE_KEYS.SENDCOINSTORE]: { claimTransfer },
            isLoggedIn,
            uniqueId,
        } = this.props;

        if (isLoggedIn && uniqueId !== '' && uniqueId) {
            claimTransfer(uniqueId);
        }
    }

    handleConfirmButton = () => {
        this.props[STORE_KEYS.MODALSTORE].onClose();
    }

    render() {
        const {
            fullName, labelAmount, coinAmount, isLoggedIn,
        } = this.props;

        return (
            <Wrapper>
                <AlertIcon/>
                <Content>
                    <FormattedMessage
                        id="modal.coin_receive.label_received"
                        defaultMessage="You received "
                    />
                    {labelAmount}
                    <FormattedMessage
                        id="modal.coin_receive.label_from"
                        defaultMessage=" from"
                    />{fullName}
                </Content>
            </Wrapper>
        );
    }
}

export default inject(
    STORE_KEYS.SENDCOINSTORE,
    STORE_KEYS.MODALSTORE,
)(observer(CoinReceiveModal));
