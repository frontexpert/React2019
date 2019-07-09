import React from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import isEqual from 'lodash/isEqual';

import { STORE_KEYS } from '../../../stores';
import defaultImage from '../avatars/default.png';

const Wrapper = styled.div.attrs({ className: 'telegram-channel-avatar' })`
    width: 45px;
    height: 45px;
    min-width: 45px;
    min-height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    margin-right: 14px;
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    margin: 2px 4px 2px 0;
`;

const getImage = image => image !== '' ? image : defaultImage;

const DefaultAvatar = styled.div.attrs({ className: 'telegram-channel-avatar__default' })`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: ${props => props.color};
    color: #fff;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

class ChannelAvatar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            image: '',
        };

        this.isComponentMounted = true;
    }

    componentDidMount() {
        this.updateAvatar(this.props);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (!isEqual(nextProps.photo, this.props.photo)) {
            this.updateAvatar(nextProps);
        }
    }

    componentWillUnmount() {
        this.isComponentMounted = false;
    }

    updateAvatar = (props) => {
        const {
            [STORE_KEYS.TELEGRAMSTORE]: telegramStore,
            photo,
            updateImage,
        } = props;

        if (photo !== null) {
            telegramStore.getImageFromTelegram(photo)
                .then(value => {
                    if (this.isComponentMounted) {
                        if (typeof updateImage === 'function') {
                            updateImage(value);
                        }
                        this.setState({
                            image: value,
                        });
                    }
                });
        } else {
            this.setState({
                image: '',
            });
        }
    };

    render() {
        const {
            name,
            color,
            onClick,
            className,
        } = this.props;
        const { image } = this.state;

        let symbolName = '';
        let nameArray = name.split(' ');
        if (nameArray.length > 0 && nameArray[0].length > 0) {
            symbolName = nameArray[0][0];
        }
        if (nameArray.length > 1 && nameArray[1].length > 0) {
            symbolName += nameArray[1][0];
        }

        return (
            <Wrapper onClick={onClick} className={className}>
                {image !== '' ? (
                    <Image src={getImage(image)} alt={name}/>
                ) : (
                    <DefaultAvatar color={color.hexColor || '#000'}>
                        {symbolName.toUpperCase()}
                    </DefaultAvatar>
                )}
            </Wrapper>
        );
    }
}

export default inject(
    STORE_KEYS.TELEGRAMSTORE,
)(observer(ChannelAvatar));
