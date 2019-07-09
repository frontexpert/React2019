import React from 'react';
import styled from 'styled-components';
import { compose, withProps } from 'recompose';
import { inject, observer } from 'mobx-react';
import { FormattedMessage } from 'react-intl';

import GoogleAuthModal from '../GoogleAuthModal';
import { STORE_KEYS } from '../../stores';
import GradientButtonSquare from '../../components-generic/GradientButtonSquare';
import GradientButtonArrow from '../../components-generic/GradientButtonArrow';

// ToDo: need to add standard modal bg color
const Wrapper = styled.div`
    background-color: ${props => props.theme.palette.backgroundHighContrast};
    color: ${props => props.theme.palette.contrastText};
    display: flex;
    flex-direction: column;
    padding: 10px;
    border-radius: ${props => props.theme.palette.borderRadius};
    box-shadow: 1px 2px 3px 3px rgba(0, 0, 0, .23);
`;

const Text = styled.p`
    margin: 1rem 1rem 1.5rem 1rem;
    text-align: center;
    font-size: 0.8rem;
    
    @media only screen and (min-width : 1920px) {
        font-size: 0.9rem;
    }
`;

const ButtonWrapper = styled.div`
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: 1fr 1fr;
`;

const ButtonText = styled.span`
    // font-size: 14px;
    // font-weight: normal;
    font-weight: bold;
    text-transform: uppercase;
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

const googleAuthModal = (Modal, portal, additionalVerticalSpace) => () => Modal({
    portal,
    additionalVerticalSpace,
    ModalComponentFn: () => <GoogleAuthModal/>,
});

const AdditionalWarningModal = ({ Modal, onClose, msg }) => (
    <Wrapper>
        <Text>
            {msg}
        </Text>
        <ButtonWrapper>
            <GradientButtonSquare
                className="negative-solid"
                height={35}
                red={true}
                onClick={onClose}
            >
                <ButtonText>
                    <FormattedMessage
                        id="button.cancel"
                        defaultMessage="Cancel"
                    />
                </ButtonText>
            </GradientButtonSquare>

            <GradientButtonArrow
                className="primary-solid"
                height={35}
                onClick={() => {
                    // TODO send coin
                    console.log('Do actual send');
                    onClose();
                }}
            >
                <ButtonText>
                    <FormattedMessage
                        id="button.confirm"
                        defaultMessage="Confirm"
                    />
                </ButtonText>
            </GradientButtonArrow>
        </ButtonWrapper>
    </Wrapper>
);

export default enchanced(AdditionalWarningModal);
