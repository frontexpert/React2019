import React, { Component } from 'react';
import { compose, withProps } from 'recompose';
import { inject, observer } from 'mobx-react';
import { FormattedMessage } from 'react-intl';

import { STORE_KEYS } from '../../../stores';
import {
    CreditSection,
    CreditUpper,
    CvcWrapper,
    InputFieldGroup,
    InputFieldAddon
} from './Components';
import InputField from '../InputField';
import CreditFundsConfirmModal from './CreditFundsConfirmModal';
import { Wrapper, Label, CreditIcon } from '../Components';
import TermsModal from '../../YourAccount/TermsModal';
import GradientButton from '../../../components-generic/GradientButtonSquare';
import DataLoader from '../../../components-generic/DataLoader';

const creditFundsConfirmModal = (Modal, portal, additionalVerticalSpace) => Modal({
    portal,
    additionalVerticalSpace,
    ModalComponentFn: () => <CreditFundsConfirmModal heading="Payment Complete" />,
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

        if (number.trim().length === 0 || expDate.trim().length === 0 || cvc.trim().length === 0) {
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
            heading = 'Credit Card Payment',
            Coin,
        } = this.props;

        const {
            name, number, expDate, cvc, isTermsModalOpen, isInProgress,
        } = this.state;

        let amount = '';
        if (Coin && Coin.price) {
            amount = `$1,000 ≈ ${(1000 / Coin.price).toFixed(2)} ${Coin.fullName}`;
        }

        const disabled = isInProgress || number.trim().length === 0 || expDate.trim().length === 0 || cvc.trim().length === 0;

        return (
            <Wrapper>
                <Label>
                    <span>{heading}</span>
                    <span className="terms" onClick={this.toggleTermsModal}>Terms</span>
                </Label>

                <CreditSection>
                    <CreditUpper>
                        <InputFieldGroup>
                            <InputField
                                label="Card Number"
                                placeholder="4242-4242-4242-4242"
                                value={number}
                                readOnly={false}
                                changeValue={this.changeValue('number')}
                            />

                            <InputFieldAddon>
                                <CreditIcon />
                            </InputFieldAddon>
                        </InputFieldGroup>

                        <CvcWrapper>
                            <InputField
                                className="horizontal-input-fields"
                                label="Exp. Date"
                                placeholder="MM/YY"
                                value={expDate}
                                readOnly={false}
                                changeValue={this.changeValue('expDate')}
                            />

                            <InputField
                                className="horizontal-input-fields"
                                label="CVV/CVC"
                                placeholder="CVC"
                                value={cvc}
                                readOnly={false}
                                changeValue={this.changeValue('cvc')}
                            />
                        </CvcWrapper>
                    </CreditUpper>

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
                                        id="modal.credit_funds.label_pay1000"
                                        defaultMessage="PAY $1,000"
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
