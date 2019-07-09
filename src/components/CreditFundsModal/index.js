import React, { Component } from 'react';
import { compose, withProps } from 'recompose';
import { inject, observer } from 'mobx-react';
import { FormattedMessage } from 'react-intl';

import { STORE_KEYS } from '../../stores';
import {
    Wrapper,
    CreditSection,
    CreditUpper,
    FlexWrapper,
    CvcWrapper,
    Label,
    IconVisa,
    Text
} from './Components';
import { InputField, InputFieldGroup, InputFieldAddon } from './InputField';
import GradientButton from '../../components-generic/GradientButtonSquare';
import CreditFundsConfirmModal from './CreditFundsConfirmModal';
import TermsModal from '../YourAccount/TermsModal';
import DataLoader from '../../components-generic/DataLoader';

import imgIconVisa from './icons/icon-visa.svg';

const creditFundsConfirmModal = (Modal, portal, additionalVerticalSpace) => Modal({
    portal,
    additionalVerticalSpace,
    ModalComponentFn: () => <CreditFundsConfirmModal/>,
});

class CreditFundsModal extends Component {
    state = {
        name: '',
        number: '',
        expDate: '',
        cvc: '',
        isTermsModalOpen: false,
        isInProgress: false,
    };

    changeValue = field => value => {
        this.setState({
            [field]: value,
        });
    };

    toggleTermsModal = () => {
        this.setState(prevState => ({
            isTermsModalOpen: !prevState.isTermsModalOpen,
        }));
    };

    handleConfirmBtn = () => {
        const {
            Modal,
            portal,
            sendPaymentRequest,
        } = this.props;

        // validation
        const {
            name, number, expDate, cvc,
        } = this.state;

        if (name.trim().length === 0 || number.trim().length === 0 || expDate.trim().length === 0 || cvc.trim().length === 0) {
            return;
        }

        this.setState({
            isInProgress: true,
        });

        setTimeout(() => {
            // connect mobx store to connect backend
            sendPaymentRequest('visa', name.trim(), number.trim(), expDate.trim(), cvc.trim());
            creditFundsConfirmModal(Modal, portal || 'graph-chart-parent', true);
        }, 2000);
    };

    render() {
        const {
            Modal,
            heading1 = 'Credit Card Payment',
            heading2,
            portal,
            Coin,
        } = this.props;

        const {
            name, number, expDate, cvc, isTermsModalOpen, isInProgress,
        } = this.state;

        let amount = '';
        if (Coin && Coin.price) {
            amount = `$1,000 ≈ ${(1000 / Coin.price).toFixed(2)} ${Coin.fullName}`;
        }

        const disabled = isInProgress || name.trim().length === 0 || number.trim().length === 0 || expDate.trim().length === 0 || cvc.trim().length === 0;

        return (
            <Wrapper>
                <Label>
                    <span className="heading1">
                        {heading1}
                    </span>

                    {heading2 && (
                        <span className="heading2">
                            {heading2}
                        </span>
                    )}
                </Label>

                <CreditSection>
                    <CreditUpper>
                        <FlexWrapper>
                            <InputField
                                className="add-funds-name-input-field"
                                label="Amount"
                                placeholder="$1,000 ≈ 0.24 Bitcoin"
                                value={amount}
                                readOnly
                            />

                            <InputField
                                className="add-funds-name-input-field"
                                label="Name on Card"
                                placeholder="John Wave"
                                value={name}
                                readOnly={false}
                                changeValue={this.changeValue('name')}
                            />
                        </FlexWrapper>

                        <FlexWrapper>
                            <InputFieldGroup>
                                <InputField
                                    label="Card Number"
                                    placeholder="4242 4242 4242 4242"
                                    value={number}
                                    readOnly={false}
                                    changeValue={this.changeValue('number')}
                                />

                                <InputFieldAddon>
                                    <IconVisa src={imgIconVisa}/>
                                </InputFieldAddon>
                            </InputFieldGroup>

                            <CvcWrapper>
                                <InputField
                                    className="horizontal-input-fields"
                                    label="Exp. Date"
                                    placeholder="10/16"
                                    value={expDate}
                                    readOnly={false}
                                    changeValue={this.changeValue('expDate')}
                                />

                                <InputField
                                    className="horizontal-input-fields"
                                    label="CVV/CVC"
                                    placeholder="123"
                                    value={cvc}
                                    readOnly={false}
                                    changeValue={this.changeValue('cvc')}
                                />
                            </CvcWrapper>
                        </FlexWrapper>
                    </CreditUpper>

                    <Text>
                        <FormattedMessage
                            id="modal.credit_funds.label_term_description"
                            defaultMessage="By clicking on the button below I agree with"
                        />
                        &nbsp;
                        <span onClick={this.toggleTermsModal}>
                            <FormattedMessage
                                id="modal.credit_funds.label_term"
                                defaultMessage="Terms"
                            />
                        </span>
                    </Text>

                    <GradientButton
                        className="primary-solid confirm-button"
                        height={60}
                        disabled={disabled}
                        onClick={() => {
                            if (!disabled) {
                                this.handleConfirmBtn();
                            }
                        }}
                    >
                        {isInProgress
                            ? (
                                <DataLoader/>
                            )
                            : (
                                <span className="btn-text">
                                    <FormattedMessage
                                        id="modal.credit_funds.label_complete_payment"
                                        defaultMessage="COMPLETE PAYMENT"
                                    />
                                </span>
                            )
                        }
                    </GradientButton>
                </CreditSection>

                {isTermsModalOpen && <TermsModal show={this.toggleTermsModal}/>}
            </Wrapper>
        );
    }
}

const enchanced = compose(
    inject(STORE_KEYS.MODALSTORE, STORE_KEYS.PAYMENTSTORE),
    observer,
    withProps(
        ({
            [STORE_KEYS.MODALSTORE]: {
                Modal,
                onClose,
            },
            [STORE_KEYS.PAYMENTSTORE]: {
                sendPaymentRequest,
            },
        }) => ({
            Modal,
            onClose,
            sendPaymentRequest,
        })
    )
);

export default enchanced(CreditFundsModal);
