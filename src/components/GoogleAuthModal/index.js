import React from 'react';
import styled from 'styled-components';
import { compose, withProps } from 'recompose';
import { inject, observer } from 'mobx-react';
import { FormattedMessage } from 'react-intl';

import { STORE_KEYS } from '../../stores';
import logo from './icons/google-auth.png';
import Button from '../YourAccount/Button/Button';

const Wrapper = styled.section`
    background-color: ${props => props.theme.palette.backgroundHighContrast};
    color: ${props => props.theme.palette.depositText};
    padding: 10px;
    display: flex;
    flex-direction: column;
    width: 260px;
    border-radius: ${props => props.theme.palette.borderRadius};
`;

const TitleWrapper = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
`;

const Logo = styled.img`
    width: 46px;
    height: 46px;
    margin-right: 8px;
`;

const Title = styled.p`
    margin: 0;
    font-size: 0.8rem;
`;

const InputWrapper = styled.div`
    margin-bottom: 20px;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 8px;
    border-radius: ${props => props.theme.palette.borderRadius};
`;

const Input = styled.input`
    width: 100%;
    padding: 8px;
    border: 0;
    font-size: 1rem;
    text-align: center;
    background-color: ${props => props.theme.palette.modalCancelBackground};
    color: ${props => props.theme.palette.depositModalButtonsColor};
`;

const ButtonWrapper = styled.div`
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: 1fr 1fr;
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

// proper handling of input can be added later on
// so no 10+ can be entered, only 0-9

const GoogleAuthModal = ({ Modal, onClose }) => (
    <Wrapper>
        <TitleWrapper>
            <Logo src={logo} alt="Google Auth logo" />
            <Title>
                <FormattedMessage
                    id="modal.google_auth.label1"
                    defaultMessage="Input Code from"
                />
                <br />
                <FormattedMessage
                    id="modal.google_auth.label2"
                    defaultMessage="Google Authentificator"
                /></Title>
        </TitleWrapper>
        <InputWrapper>
            <Input type="number" name="1" maxLength="1" />
            <Input type="number" name="2" maxLength="1" />
            <Input type="number" name="3" maxLength="1" />
            <Input type="number" name="4" maxLength="1" />
            <Input type="number" name="5" maxLength="1" />
            <Input type="number" name="6" maxLength="1" />
        </InputWrapper>
        <ButtonWrapper>
            <Button
                text="Cancel"
                width="100%"
                onClick={onClose}
            />
            <Button
                text="Confirm"
                background
                width="100%"
                onClick={onClose}
            />
        </ButtonWrapper>
    </Wrapper>
);

export default enchanced(GoogleAuthModal);
