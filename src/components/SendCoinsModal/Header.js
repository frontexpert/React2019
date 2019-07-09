import React from 'react';
import styled from 'styled-components';

import defaultImage from "../Telegram/avatars/default.png";

const Wrapper = styled.div`
    background-color: ${props => props.theme.palette.sendCoinsModalHeaderBg};
    padding: 10px 12px;
    display: flex;
    align-items: center;
    border-radius: ${props => props.theme.palette.borderRadius} ${props => props.theme.palette.borderRadius} 0 0;
`;

const Text = styled.div`
    max-width: 270px;
    // margin: 0;
    margin-right: 1rem;
    flex: 1;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
    font-weight: bold;
    font-size: 13px;
    color: ${props => props.theme.palette.sendCoinsModalHeaderText};
`;


const Header = ({ coin, name, image, color }) => {
    let symbolName = '';
    let nameArray = name.split(" ");
    if (nameArray.length > 0 && nameArray[0].length > 0) {
        symbolName = nameArray[0][0];
    }
    if (nameArray.length > 1 && nameArray[1].length > 0) {
        symbolName += nameArray[1][0];
    }

    return (
        <Wrapper>
            <Text>Send {coin} to {name}</Text>
            {image !== '' ? (
                <Image src={getImage(image)} alt={''} />
            ) : (
                <DefaultAvatar color={color.hexColor || '#000'}>
                    {symbolName.toUpperCase()}
                </DefaultAvatar>
            )}
        </Wrapper>
    );
};

export default Header
