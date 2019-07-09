import React, { Component } from 'react';
import styled from 'styled-components';
import { compose, withProps } from 'recompose';
import { inject, observer } from 'mobx-react';
import { FormattedMessage } from 'react-intl';

import { STORE_KEYS } from '../../../stores';
import { formatStringMinMax } from '../../../utils';
import InputField from '../InputField';
import { Wrapper, Label, InnerWrapper } from '../Components';

import checkIcon from '../icons/check.png';

const HeaderImage = styled.div`
    width: 130px;
    height: 130px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.theme.palette.depositLink};
    border-radius: 50%;
`;

const Description = styled.div`
    margin-top: 10px;
    font-size: 16px;
    font-weight: 400;
    color: ${props => props.theme.palette.depositText};
    text-align: center;
    
    span {
        font-size: 38px;
        font-weight: bold;
        color: ${props => props.theme.palette.contrastText};
    }
`;

const enchanced = compose(
    inject(STORE_KEYS.MODALSTORE),
    observer,
    withProps(
        ({
            [STORE_KEYS.MODALSTORE]: {
                Modal,
                onClose,
            },
        }) => ({
            Modal,
            onClose,
        })
    )
);

class CreditFundsConfirmModal extends Component {
    state = {
        orderId: '',
    };

    changeValue = field => value => {
        this.setState({
            [field]: value,
        });
    };

    render() {
        const {
            amount = 1000,
            heading = 'Payment Complete',
        } = this.props;
        const { orderId } = this.state;

        return (
            <Wrapper>
                <Label>
                    <span>{heading}</span>
                </Label>

                <InnerWrapper>
                    <HeaderImage>
                        <img src={checkIcon} alt=""/>
                    </HeaderImage>

                    <Description>
                        <span>${formatStringMinMax(amount, 0, 0)}</span><br/>
                        <FormattedMessage
                            id="modal.credit_funds_confirm.label_payment_complete"
                            defaultMessage="Your payment is complete."
                        />
                    </Description>

                    <InputField
                        label="Order ID"
                        placeholder="3HZV4FLuvJjoEgsAVbrcLAuWt691s"
                        value={orderId}
                        changeValue={this.changeValue('orderId')}
                    />
                </InnerWrapper>
            </Wrapper>
        );
    }
}

export default enchanced(CreditFundsConfirmModal);
