import React, { Component } from 'react';
import styled from 'styled-components';
import { compose, withProps } from 'recompose';
import { inject, observer } from 'mobx-react';

import { STORE_KEYS } from '../../../stores';
import InputField from './InputField';
import GradientButton from '../../../components-generic/GradientButtonSquare';
import DataLoader from '../../../components-generic/DataLoader';

const Wrapper = styled.section.attrs({ className: 'api-key-modal' })`
    position: relative;
    width: 100%;
    margin: 0;
    display: flex;
    flex-direction: column;
    color: ${props => props.theme.palette.depositText};

    .confirm-button {
        &:disabled {
            filter: drop-shadow(0px 0px 1px ${props => props.theme.palette.clrBorder}) !important;
        }
        
        .btn-text {
            font-size: 14px !important;
            font-weight: 600;
            text-transform: uppercase;
        }
    }
    
    .cancel-button {
        width: 48px;
        height: 32px;
        margin: 0 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: ${props => props.theme.palette.clrLightRed};
        border: 0;
        border-radius: ${props => props.theme.palette.borderRadius};
        cursor: pointer;
        
        .sprite-icon {
            width: 22px;
            height: 22px;
            fill: ${props => props.theme.palette.clrHighContrast};
        }
        
        &:focus {
            outline: none;
        }
    }
`;

const InnerWrapper = styled.div`
    width: 100%;
    height: 32px;
    display: flex;
    
    &:not(:first-child) {
        margin-top: 15px;
    }
`;

const withStores = compose(
    inject(STORE_KEYS.MODALSTORE, STORE_KEYS.EXCHANGESSTORE),
    observer,
    withProps(
        ({
            [STORE_KEYS.MODALSTORE]: {
                onClose,
                setApiKeyModalOpenState,
            },
            [STORE_KEYS.EXCHANGESSTORE]: {
                updateExchange,
            },
        }) => ({
            onClose,
            updateExchange,
            setApiKeyModalOpenState,
        })
    )
);

class ApiKeyModal extends Component {
    state = {
        apiKey: '',
        apiSecret: '',
        isInProgress: false,
    };

    componentDidMount() {
        if (this.props.setApiKeyModalOpenState) this.props.setApiKeyModalOpenState(true);
    }

    componentWillUnmount() {
        if (this.props.setApiKeyModalOpenState) this.props.setApiKeyModalOpenState(false);
    }

    handleChange = field => value => {
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
            if (this.props.onCloseHandler) {
                this.props.onCloseHandler();
            }
        }, 3000);
    };

    render() {
        const { exchange, icon } = this.props;
        const { apiKey, apiSecret, isInProgress } = this.state;
        const disabled = !apiKey || !apiSecret || isInProgress;

        return (
            <Wrapper>
                <InnerWrapper>
                    <InputField
                        icon={icon}
                        size={20}
                        placeholder={`${exchange} API Key`}
                        value={apiKey}
                        readOnly={false}
                        changeValue={this.handleChange('apiKey')}
                    />
                </InnerWrapper>

                <InnerWrapper>
                    <InputField
                        icon={icon}
                        size={20}
                        placeholder={`${exchange} API Secret`}
                        value={apiSecret}
                        readOnly={false}
                        changeValue={this.handleChange('apiSecret')}
                    />

                    <button type="button" className="cancel-button" onClick={this.props.onCloseHandler}>
                        <svg className="sprite-icon" role="img" aria-hidden="true">
                            <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="img/sprite-basic.svg#close-2"/>
                        </svg>
                    </button>

                    <GradientButton
                        className="primary-solid confirm-button"
                        width={92}
                        height={32}
                        disabled={disabled}
                        onClick={() => {
                            if (!disabled) {
                                this.handleConfirmButton();
                            }
                        }}
                    >
                        {isInProgress
                            ? (
                                <DataLoader width={30} height={30}/>
                            )
                            : (
                                <span className="btn-text">Sync</span>
                            )
                        }
                    </GradientButton>
                </InnerWrapper>
            </Wrapper>
        );
    }
}

export default withStores(ApiKeyModal);
