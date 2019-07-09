import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { FormattedMessage } from 'react-intl';

import {
    Wrapper, Content, AlertIcon
} from './Components';
import { STORE_KEYS } from '../../../stores';
import { customDigitFormat } from '../../../utils';

class CoinReceivePopup extends Component {
    componentDidMount() {
    }

    render() {
        const { qrObj, claimRet } = this.props;

        return (
            <Wrapper>
                <AlertIcon/>
                <Content>
                    <FormattedMessage
                        id="modal.coin_receive_popup.label_received"
                        defaultMessage="You received "
                    />
                    {qrObj.labelAmount}
                    <FormattedMessage
                        id="modal.coin_receive_popup.label_from"
                        defaultMessage=" from"
                    />{qrObj.fullName}.<br/>
                    {!qrObj.isLoggedIn &&
                        <FormattedMessage
                            id="modal.coin_receive_popup.label_login"
                            defaultMessage="Please login to claim funds."
                        />
                    }
                    { claimRet ? (claimRet[0].toUpperCase() + claimRet.substring(1)) : '' }
                </Content>
            </Wrapper>
        );
    }
}

export default inject(
    STORE_KEYS.SENDCOINSTORE,
)(observer(CoinReceivePopup));
