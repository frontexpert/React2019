import React from 'react';
import styled from 'styled-components';
import { compose, withProps } from 'recompose';
import { inject, observer } from 'mobx-react';
import { FormattedMessage } from 'react-intl';

import { STORE_KEYS } from '../../../stores/index';
import defaultImage from '../../Telegram/avatars/default.png';
import GradientButtonSquare from '../../../components-generic/GradientButtonSquare';
import GradientButtonArrow from '../../../components-generic/GradientButtonArrow';

const Wrapper = styled.div`
    background-color: ${props => props.theme.palette.telegramAppMessageBackground};
    display: flex;
    flex-direction: column;
    padding: 10px;
    border-radius: ${props => props.theme.palette.borderRadius};
`;

const HeaderWrapper = styled.div`
    margin: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Text = styled.div`
    // margin: 0;
    margin-right: 1rem;
    flex: 1;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 14px;
    color: ${props => props.theme.palette.telegramText};
`;

const Image = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
`;

const getImage = image => image !== '' ? image : defaultImage;

const DefaultAvatar = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: ${props => props.color};
    color: #fff;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ButtonWrapper = styled.div`
    padding-right: 5px;
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: 1fr 1fr;
`;

const ButtonText = styled.span`
    font-weight: bold;
    text-transform: uppercase;
`;

const enchanced = compose(
    inject(STORE_KEYS.MODALSTORE, STORE_KEYS.TELEGRAMSTORE),
    observer,
    withProps(
        ({
             [STORE_KEYS.MODALSTORE]: {
                 Modal,
                 onClose,
             },
             [STORE_KEYS.TELEGRAMSTORE]: {
                 sendWalletMsg,
             },
         }) => ({
            Modal,
            onClose,
            sendWalletMsg,
        })
    )
);

const SendConfirmModal = ({ Modal, onClose, msg, sendWalletMsg, notification, coin, name, image, color, amount, symbol }) => {
    let symbolName = '';
    let nameArray = name.split(' ');
    if (nameArray.length > 0 && nameArray[0].length > 0) {
        symbolName = nameArray[0][0];
    }
    if (nameArray.length > 1 && nameArray[1].length > 0) {
        symbolName += nameArray[1][0];
    }

    return (
        <Wrapper>
            <HeaderWrapper>
                <Text>{msg}</Text>

                {image !== '' ? (
                    <Image src={getImage(image)} alt={''}/>
                ) : (
                    <DefaultAvatar color={color.hexColor || '#000'}>
                        {symbolName.toUpperCase()}
                    </DefaultAvatar>
                )}
            </HeaderWrapper>

            <ButtonWrapper>
                <GradientButtonSquare
                    className="negative-solid"
                    height={35}
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
                        sendWalletMsg(notification, symbol, amount);
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
};

export default enchanced(SendConfirmModal);
