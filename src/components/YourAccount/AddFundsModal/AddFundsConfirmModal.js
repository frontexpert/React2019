import React, { Component } from 'react';
import styled from 'styled-components';
import { compose, withProps } from 'recompose';
import { inject, observer } from 'mobx-react';
import { FormattedMessage } from 'react-intl';

import { STORE_KEYS } from '../../../stores';
import InputField from './InputField';
import checkIcon from './icons/check.png';
import { formatStringMinMax } from '../../../utils';

const Wrapper = styled.section`
    position: relative;
    width: 312px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    background-color: ${props => props.theme.palette.depositBackground};
    border: 1px solid ${props => props.theme.palette.depositBorder};
    border-radius: ${props => props.theme.palette.borderRadius};
    box-shadow: 0 3px 15px rgba(0, 0, 0, .5);
    color: ${props => props.theme.palette.depositText};
    
    input {
        color: ${props => props.theme.palette.contrastText};
        
        &::placeholder {
            color: ${props => props.theme.palette.contrastText};
        }
    }
`;

const HeaderImage = styled.div`
    width: 150px;
    height: 150px;
    margin: 0 calc(50% - 75px);
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.theme.palette.depositLink};
    border-radius: 50%;
`;

// const CheckSvg = styled.svg`
//     width: 30px;
//     height: 30px;
//     fill: none;
//     stroke: ${props => props.theme.palette.contrastText};
// `;
//
// const CheckIcon = props => (
//     <CheckSvg {...props} viewBox="0 0 9.04 6.71">
//         <polyline points="0.49 2.88 3.68 5.67 8.49 0.51"/>
//     </CheckSvg>
// );

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

class AddFundsConfirmModal extends Component {
    state = {
        orderId: '',
    };

    changeValue = field => value => {
        this.setState({
            [field]: value,
        });
    };

    render() {
        const { amount } = this.props;
        const { orderId } = this.state;

        return (
            <Wrapper>
                <HeaderImage>
                    {/* <CheckIcon/> */}
                    <img src={checkIcon} alt=""/>
                </HeaderImage>

                <Description>
                    <span>${formatStringMinMax(amount, 0, 0)}</span><br/>
                    <FormattedMessage
                        id="your_account.add_funds_modal.description"
                        defaultMessage="Your payment is complete."
                    />
                </Description>

                <InputField
                    label="Order ID"
                    placeholder="3HZV4FLuvJjoEgsAVbrcLAuWt691s"
                    value={orderId}
                    changeValue={this.changeValue('orderId')}
                />
            </Wrapper>
        );
    }
}

export default enchanced(AddFundsConfirmModal);
