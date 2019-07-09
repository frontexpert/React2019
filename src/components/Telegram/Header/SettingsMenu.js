import React from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { FormattedMessage } from 'react-intl';

import { STORE_KEYS } from '../../../stores';
import { getItemColor } from '../../../utils';

const Wrapper = styled.div`
    padding: 19px;
    display: flex;
    align-items: center;
`;

const Name = styled.p`
    margin: 0;
    /* pxs used just to match the html/css version */
    font-size: 16px;
    color: #6D7885;
    text-align: left;
    font-weight: 700;
    flex: 1;
`;

const DefaultAvatar = styled.div`
    position: absolute;
    width: 35px;
    height: 35px;
    background: ${props => props.color};
    color: #fff;
    font-size: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    min-width: 35px;
    min-height: 35px;
    margin: 0;
    z-index: 1;
`;

const AvatarWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-image: url("/img/default-avatar.png");
    background-size: contain;
    overflow: hidden;
    z-index: 2;
    
    .user-pic {
        z-index: 2;
        width: 35px;
        height: 35px;
    }
`;

const FullName = styled.div`
    font-size: 16px;
    color: #6D7885;
    font-weight: 400;
    width: 120px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-right: 10px;
`;

class SettingsMenu extends React.Component {
    componentDidMount() {

    }

    render() {
        const {
            isLoggedIn, loggedInUser, logoURL, isProfileLogoExists,
        } = this.props[STORE_KEYS.TELEGRAMSTORE];

        let symbolName = '';
        let userName = '';
        let fullName = '';
        if (isLoggedIn && loggedInUser) {
            const {
                firstname,
                lastname,
            } = loggedInUser;

            if (firstname && firstname.length > 0) { symbolName = firstname[0]; }
            if (lastname && lastname.length > 0) { symbolName += lastname[0]; }

            userName = loggedInUser.username;
            fullName = firstname + ' ' + lastname;
        }

        return (
            <Wrapper>
                <Name>
                    <FormattedMessage
                        id="settings.label_settings"
                        defaultMessage="Settings"
                    />
                </Name>
                {isLoggedIn && (
                    <React.Fragment>
                        <FullName>
                            {fullName}
                        </FullName>
                        <AvatarWrapper>
                            <DefaultAvatar color={getItemColor(userName).hexColor}>
                                {symbolName.toUpperCase()}
                            </DefaultAvatar>
                            {
                                isProfileLogoExists &&
                                <img alt="" className="user-pic" src={logoURL}/>
                            }
                        </AvatarWrapper>
                    </React.Fragment>
                )}
            </Wrapper>
        );
    }
}

export default inject(
    STORE_KEYS.TELEGRAMSTORE,
)(observer(SettingsMenu));
