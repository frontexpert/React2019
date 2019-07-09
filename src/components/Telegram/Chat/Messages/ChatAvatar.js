import React from 'react';
import styled from 'styled-components';

import { inject, observer } from 'mobx-react';
import { STORE_KEYS } from '../../../../stores';
import defaultImage from '../../avatars/default.png';

const Image = styled.img`
    border-radius: 50%;
    /* matching html/css version */
    width: 40px;
    height: 40px;
    min-width: 40px;
    min-height: 40px;
    /* if self (ie if it's you) - add space on the left side as avatar is located on the right side */
    margin: ${props => (props.self ? '0 0 0 14px' : '0 14px 0 0')};
`;

const getImage = image => (image !== '' ? image : defaultImage);

const DefaultAvatar = styled.div`
    width: 40px;
    height: 40px;
    background: ${props => props.color};
    color: #fff;
    font-size: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    min-width: 40px;
    min-height: 40px;
    /* if self (ie if it's you) - add space on the left side as avatar is located on the right side */
    margin: ${props => (props.self ? '0 0 0 14px' : '0 14px 0 0')};
`;

class ChatAvatar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            image: '',
        };

        this.isComponentMounted = true;
    }

    componentDidMount() {
        const { [STORE_KEYS.TELEGRAMSTORE]: telegramStore, photo } = this.props;

        if (photo !== null) {
            telegramStore.getImageFromTelegram(photo).then(value => {
                if (this.isComponentMounted) {
                    this.setState({
                        image: value,
                    });
                }
            });
        }
    }

    componentWillUnmount() {
        this.isComponentMounted = false;
    }

    render() {
        const { name, background, self } = this.props;
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
            <React.Fragment>
                {image !== '' && (
                    <Image self={self} src={getImage(image)} alt={name} />
                )}

                {image === '' && background && (
                    <DefaultAvatar self={self} color={background.hexColor}>
                        {symbolName.toUpperCase()}
                    </DefaultAvatar>
                )}

                {image === '' && !background && (
                    <Image self={self} src={defaultImage} alt={name} />
                )}
            </React.Fragment>
        );
    }
}

export default inject(STORE_KEYS.TELEGRAMSTORE)(observer(ChatAvatar));
