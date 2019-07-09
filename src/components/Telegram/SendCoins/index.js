import React from 'react';
import styled from 'styled-components';

import SendCoinsModal from '../../SendCoinsModal';

export const sendCoinsModal = (Modal, portal, name, image, color) => () =>
    Modal({
        portal,
        ModalComponentFn: () => (
            <SendCoinsModal
                coin="USDT"
                name={name}
                image={image}
                color={color}
            />
        ),
    });

export const SendCoinsButton = styled.button`
    margin: 0 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${props =>
        props.theme.palette.telegramSendCoinsButtonBackground};
    border: 0;
    border-radius: 50%;
    font-family: open_sans, sans-serif;
    font-size: 14px;
    color: ${props => props.theme.palette.telegramSendCoinsButtonText};
    white-space: nowrap;

    &:hover {
        filter: brightness(110%);
        cursor: pointer;
    }

    &:focus {
        outline: 0;
    }
`;
