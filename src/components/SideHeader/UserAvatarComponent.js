import React from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';

import { getItemColor } from '../../utils';
import { STORE_KEYS } from '../../stores';
import { STATE_KEYS } from '../../stores/ConvertStore';
import UserAvatarPopupMenu from './UserAvatarPopupMenu';
import { AvatarWrapper, DefaultAvatar } from '../SideBar/NewSettingsPop/Components';
import AvatarImage from './AvatarImage';

const Wrapper = styled.div.attrs({ className: 'user-avatar-wrapper' })`
    position: relative;
    display: flex;
    margin: 0;
    border: none;
    padding: 0;
    width: 100%;
    height: 100%;
    // border-right: 1px solid ${props => props.theme.palette.clrBorder};
`;

export const ImageWrapper = styled.div.attrs({ className: 'user-avatar-component' })`
    width: 100%;
    height: 100%;
    min-height: min-content;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    @media (max-width: 768px) {
        img {
            width: 50px !important;
            height: 50px !important;
        }
    }

    .user-avatar-component {
        position: absolute;
    }

    .login-title {
        bottom: 3px;
    }
`;

class UserAvatarComponent extends React.Component {
    state = {};

    toggleDropDown = () => {
        const {
            /*
            [STORE_KEYS.SETTINGSSTORE]: {
                isArbitrageMode,
            },
            [STORE_KEYS.CONVERTSTORE]: {
                convertState,
            },
            */
            [STORE_KEYS.VIEWMODESTORE]: {
                isUserDropDownOpen,
                setUserDropDownOpen,
            },
        } = this.props;
        /*
        const { isArbOpen } = this.state;
        if (isArbitrageMode && convertState !== STATE_KEYS.coinSearch) {
            this.setState({
                isArbOpen: !isArbOpen,
            });
        } else {
            setUserDropDownOpen(!isUserDropDownOpen);
        }
        */
        setUserDropDownOpen(!isUserDropDownOpen);
    };

    render() {
        const {
            [STORE_KEYS.TELEGRAMSTORE]: {
                isLoggedIn,
                loggedInUser,
                logoURL,
                isProfileLogoExists,
                setLoginBtnLocation,
            },
            [STORE_KEYS.VIEWMODESTORE]: {
                isUserDropDownOpen,
            },
            [STORE_KEYS.SETTINGSSTORE]: {
                isArbitrageMode,
            },
            [STORE_KEYS.CONVERTSTORE]: {
                convertState,
            },
            isMobile,
        } = this.props;

        // const { isArbOpen, isLogoutModalOpen } = this.state;

        let symbolName = '';
        let userName = '';
        if (isLoggedIn && loggedInUser) {
            const {
                firstname,
                lastname,
            } = loggedInUser;

            if (firstname && firstname.length > 0) { symbolName = firstname[0]; }
            if (lastname && lastname.length > 0) { symbolName += lastname[0]; }

            userName = loggedInUser.username;
        }

        // const isArbCondition = isArbitrageMode && convertState !== STATE_KEYS.coinSearch;
        return (
            <Wrapper>
                {isLoggedIn
                    ? (
                        <ImageWrapper onClick={this.toggleDropDown} isMobile={isMobile}>
                            <AvatarWrapper>
                                <DefaultAvatar color={getItemColor(userName).hexColor}>
                                    {symbolName.toUpperCase()}
                                </DefaultAvatar>

                                {isProfileLogoExists && (
                                    <img
                                        alt=""
                                        className="user-pic"
                                        src={logoURL}
                                    />
                                )}
                            </AvatarWrapper>
                        </ImageWrapper>
                    ) : (
                        <AvatarImage />
                    )
                }
            </Wrapper>
        );
    }
}

export default inject(
    STORE_KEYS.TELEGRAMSTORE,
    STORE_KEYS.VIEWMODESTORE,
    STORE_KEYS.SETTINGSSTORE,
    STORE_KEYS.CONVERTSTORE,
)(observer(UserAvatarComponent));
