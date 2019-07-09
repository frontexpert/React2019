import React, { Component } from 'react';
import { compose, withProps } from 'recompose';
import { inject, observer } from 'mobx-react';
import { FormattedMessage } from 'react-intl';

import {
    Wrapper, HeaderImages, Arrow, Description, ModeWrapper, CreditSection, CvcWrapper
} from './Components';
import CoinIcon from '../../CoinPairSearchV2/ExchDropdownRV/CoinIcon';
import { STORE_KEYS } from '../../../stores';
import InputField from './InputField';
import SelectField from './SelectField';
import AddFundsConfirmModal from './AddFundsConfirmModal';
import GradientButton from '../../../components-generic/GradientButtonArrow';
import imgVisa from './icons/visa.png';
import { customDigitFormat } from '../../../utils';
// import creditIcon from "./icons/credit.png";
// import paypalIcon from "./icons/paypal.png";
// import buyWithPaypalIcon from "./icons/buynow.png";

const enchanced = compose(
    inject(STORE_KEYS.MODALSTORE, STORE_KEYS.YOURACCOUNTSTORE),
    observer,
    withProps(
        ({
            [STORE_KEYS.MODALSTORE]: {
                Modal,
                onClose,
            },
            [STORE_KEYS.YOURACCOUNTSTORE]: {
                portfolioData,
            },
        }) => ({
            Modal,
            onClose,
            portfolioData,
        })
    )
);

const addFundsConfirmModal = (Modal, portal, additionalVerticalSpace, coin, amount) => Modal({
    portal,
    additionalVerticalSpace,
    ModalComponentFn: () => <AddFundsConfirmModal coin={coin} amount={amount}/>,
});

class AddFundsModal extends Component {
    state = {
        // mode: '',
        balance: 0,
        amount: 1000,
        name: '',
        number: '',
        expDate: '',
        cvc: '',
        submitted: false,
    };

    changeValue = field => value => {
        this.setState({
            [field]: value,
        });
    };

    // changeMode = mode => {
    //     this.setState({ mode });
    // };
    //
    // buyWithPaypal = () => {
    //
    // };

    onSubmit = () => {
        this.setState({
            submitted: true,
        });
    };

    render() {
        const {
            coin, Modal, isBuy, portfolioData,
        } = this.props;
        const {
            mode, balance, amount, name, number, expDate, cvc, submitted,
        } = this.state;

        let cryptoAmount = 0;
        const coinData = portfolioData.find(dt => dt.Coin === coin);
        if (coinData && coinData.Price !== 0) {
            cryptoAmount = amount / coinData.Price;
        }

        return (
            <Wrapper submitted={submitted}>
                <HeaderImages>
                    <CoinIcon value="USDT"/>
                    <Arrow/>
                    <CoinIcon value={coin}/>
                </HeaderImages>

                <SelectField
                    submitted={submitted}
                    label="Payment Amount"
                    value={amount}
                    changeValue={this.changeValue('amount')}
                    onSubmit={this.onSubmit}
                />

                {isBuy
                    ? (
                        <Description>
                            Enter Order Id to convert<br/><span>{customDigitFormat(amount)} BCT into {cryptoAmount.toFixed(2)} ETH.</span>
                        </Description>
                    )
                    : (
                        <Description>
                            <FormattedMessage
                                id="your_account.add_funds_modal.label_add_funds1"
                                defaultMessage="Add funds to your BCT."
                            />
                            <br/>
                            <span>
                                <FormattedMessage
                                    id="your_account.add_funds_modal.label_add_funds2"
                                    defaultMessage="Instantly."
                                />
                            </span>
                        </Description>
                    )
                }

                <InputField
                    isBuy={isBuy}
                    label={`${coin.toUpperCase()} ${isBuy ? 'Amount' : 'App Store Balance'}`}
                    value={cryptoAmount.toFixed(2)}
                    readOnly={true}
                    changeValue={null}
                />

                <ModeWrapper>
                    <span>
                        <FormattedMessage
                            id="your_account.add_funds_modal.label_we_accept"
                            defaultMessage="We accept"
                        />
                    </span>
                    <img src={imgVisa} height={21} alt=""/>
                </ModeWrapper>

                {/* <ModeWrapper> */}
                {/* <Mode className={mode === 'credit' ? 'active' : ''} onClick={() => this.changeMode('credit')}> */}
                {/* <img src={creditIcon} alt=""/> */}
                {/* </Mode> */}
                {/* <Mode className={mode === 'paypal' ? 'active' : ''} onClick={() => this.changeMode('paypal')}> */}
                {/* <img src={paypalIcon} alt=""/> */}
                {/* </Mode> */}
                {/* </ModeWrapper> */}

                {submitted && (
                    <CreditSection>
                        <InputField
                            label="Name on Card"
                            placeholder="John Wave"
                            value={name}
                            readOnly={false}
                            changeValue={this.changeValue('name')}
                        />

                        <InputField
                            label="Card Number"
                            placeholder="4242 4242 4242 4242"
                            value={number}
                            readOnly={false}
                            changeValue={this.changeValue('number')}
                        />

                        <CvcWrapper>
                            <InputField
                                className="flex-1"
                                label="Exp. Date"
                                placeholder="10/16"
                                value={expDate}
                                readOnly={false}
                                changeValue={this.changeValue('expDate')}
                            />

                            <InputField
                                className="flex-1"
                                label="CVV/CVC"
                                placeholder="123"
                                value={cvc}
                                readOnly={false}
                                changeValue={this.changeValue('cvc')}
                            />
                        </CvcWrapper>

                        <GradientButton
                            className="primary-solid"
                            height={60}
                            onClick={() => addFundsConfirmModal(Modal, 'graph-chart-parent', true, coin, amount)}
                        >
                            <span className="btn-text">
                                <FormattedMessage
                                    id="your_account.add_funds_modal.label_confirm"
                                    defaultMessage="CONFIRM"
                                />
                            </span>
                        </GradientButton>
                    </CreditSection>
                )}

                {/* {mode === 'paypal' && ( */}
                {/* <PaypalSection> */}
                {/* <Button onClick={() => this.buyWithPaypal()}> */}
                {/* <img src={buyWithPaypalIcon} alt=""/> */}
                {/* </Button> */}
                {/* </PaypalSection> */}
                {/* )} */}
            </Wrapper>
        );
    }
}

export default enchanced(AddFundsModal);
