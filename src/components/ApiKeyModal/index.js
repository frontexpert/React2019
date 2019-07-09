import React, { Component } from 'react';
import { compose, withProps } from 'recompose';
import { inject, observer } from 'mobx-react';

import { STORE_KEYS } from '../../stores';

import {
    Wrapper,
    ModalBody,
    Header,
    Text,
    LockIcon
} from './Components';
import { InputField, InputFieldGroup, InputFieldAddon } from './InputField';
import GradientButton from '../../components-generic/GradientButtonSquare';
import DataLoader from '../../components-generic/DataLoader';

const withStores = compose(
    inject(STORE_KEYS.MODALSTORE, STORE_KEYS.EXCHANGESSTORE),
    observer,
    withProps(
        ({
            [STORE_KEYS.MODALSTORE]: {
                onClose,
            },
            [STORE_KEYS.EXCHANGESSTORE]: {
                updateExchange,
            },
        }) => ({
            onClose,
            updateExchange,
        })
    )
);

class ApiKeyModal extends Component {
    state = {
        apiKey: '',
        apiSecret: '',
        isInProgress: false,
    };

    changeValue = field => value => {
        this.setState({
            [field]: value,
        });
    };

    handleConfirmButton = () => {
        const { exchange } = this.props;
        this.setState({
            isInProgress: true,
        });

        setTimeout(() => {
            this.props.onClose();
            this.props.updateExchange(exchange, {
                apiKey: this.state.apiKey,
                apiSecret: this.state.apiSecret,
                enabled: true,
                active: true,
            });
        }, 3000);
    };

    render() {
        const { exchange } = this.props;
        const {
            apiKey, apiSecret, isInProgress,
        } = this.state;

        return (
            <Wrapper>
                <Header>{exchange} API</Header>

                <ModalBody>
                    <InputFieldGroup>
                        {/* <InputFieldAddon> */}
                        {/* <LockIcon/> */}
                        {/* </InputFieldAddon> */}
                        <InputField
                            label="API Key"
                            placeholder=""
                            value={apiKey}
                            readOnly={false}
                            changeValue={this.changeValue('apiKey')}
                        />
                    </InputFieldGroup>

                    <Text>
                        Please paste in your {exchange} api key.
                    </Text>

                    <InputFieldGroup>
                        {/* <InputFieldAddon> */}
                        {/* <LockIcon/> */}
                        {/* </InputFieldAddon> */}
                        <InputField
                            label="API Secret"
                            placeholder=""
                            value={apiSecret}
                            readOnly={false}
                            changeValue={this.changeValue('apiSecret')}
                        />
                    </InputFieldGroup>

                    <Text>
                        Please paste in your {exchange} api secret.
                    </Text>

                    <GradientButton
                        className="primary-solid confirm-button"
                        height={60}
                        disabled={isInProgress}
                        onClick={() => {
                            if (apiKey && apiSecret && !isInProgress) {
                                this.handleConfirmButton();
                            }
                        }}
                    >
                        {isInProgress
                            ? (
                                <DataLoader/>
                            )
                            : (
                                <span className="btn-text">Connect {exchange}</span>
                            )
                        }
                    </GradientButton>
                </ModalBody>
            </Wrapper>
        );
    }
}

export default withStores(ApiKeyModal);
