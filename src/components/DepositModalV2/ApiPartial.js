import React from 'react';
import styled from 'styled-components';
import { compose, withProps } from 'recompose';
import { inject, observer } from 'mobx-react';

import {
    ModalHeader,
    ModalBody,
    Title,
    MainContent
} from './Components';
import x from '../../components-generic/Modal/x.svg';
import GradientButton from '../../components-generic/GradientButtonSquare';
import DataLoader from '../../components-generic/DataLoader';
import {
    InputField,
    InputOuterWrapper
} from './InputComponents';
import { STORE_KEYS } from '../../stores';

const Wrapper = styled.div.attrs({ className: 'api-modal-partial' })`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    margin: 0;
    border: none;
    border-radius: ${props => props.theme.palette.borderRadius};
    width: 100%;
    height: 100%;
    background-color: ${props => props.theme.palette.depositBackground};
    z-index: 9999;

    .input-field-outer-wrapper {
        padding: 10px 15px 15px;
    }
`;

const Close = styled.button`
    border-radius: 50%;
    border: 0;
    position: absolute;
    top: -1px;
    right: -1px;
    transform: translate(50%, -50%);
    background-color: ${props => props.theme.palette.modalCloseBackground};
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 21px;
    height: 21px;
    z-index: 999;
    box-shadow: -1px 1px 5px 0px rgba(0,0,0,0.75);

    &:hover {
        cursor: pointer;
    }

    &:focus {
        outline: none;
    }
`;

const Icon = styled.img`
    width: 11px;
    height: 11px;
`;

const ExchangeIconWrapper = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    overflow: hidden;
    font-size: 40px;
    font-weight: bold;
    color: ${props => props.theme.palette.clrPurple};
`;

class ApiPartial extends React.PureComponent {
    state = {
        apiKey: '',
        apiSecret: '',
        isInProgress: false,
    };

    handleChange = (field, value) => {
        this.setState({
            [field]: value,
        });
    };

    handleConfirmButton = () => {
        this.setState({
            isInProgress: true,
        });

        setTimeout(() => {
            this.props.updateExchange(this.props.exchange, {
                apiKey: this.state.apiKey,
                apiSecret: this.state.apiSecret,
                enabled: true,
                active: true,
            });
            this.props.onClose();
        }, 3000);
    };

    render() {
        const {
            onClose,
            exchange,
            included,
        } = this.props;

        const {
            apiKey,
            apiSecret,
            isInProgress,
        } = this.state;

        return (
            <Wrapper>
                <ModalHeader>
                    <Title>{exchange} API</Title>

                    <Close onClick={onClose}>
                        <Icon src={x}/>
                    </Close>
                </ModalHeader>

                <ModalBody>
                    <MainContent>
                        <ExchangeIconWrapper>
                            <span>{exchange}</span>
                        </ExchangeIconWrapper>

                        <InputField
                            label="API Key"
                            value={apiKey}
                            onChange={e => this.handleChange('apiKey', e.target.value)}
                        />

                        <InputField
                            label="API Secret"
                            value={apiSecret}
                            onChange={e => this.handleChange('apiSecret', e.target.value)}
                        />

                        <InputOuterWrapper>
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
                        </InputOuterWrapper>
                    </MainContent>
                </ModalBody>
            </Wrapper>
        );
    }
}

const withStores = compose(
    inject(STORE_KEYS.EXCHANGESSTORE),
    observer,
    withProps(
        ({
            [STORE_KEYS.EXCHANGESSTORE]: {
                updateExchange,
            },
        }) => ({
            updateExchange,
        })
    )
);

export default withStores(ApiPartial);
