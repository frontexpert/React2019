import React from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';

import { STORE_KEYS } from '../../../../stores';
import imgIconWeb from './icon-web.svg';
import imgIconFacebook from './icon-facebook.svg';
import imgIconTwitter from './icon-twitter.svg';
import imgIconTelegram from './icon-telegram.svg';
import imgIconReddit from './icon-reddit.svg';
import imgIconDiscord from './icon-discord.svg';
import imgIconYoutube from './icon-youtube.svg';
import imgIconInstagram from './icon-instagram.svg';
import imgIconGithub from './icon-github.svg';
import imgIconDefault from './icon-default.png';
import { TradingViewIcon } from '../../icons';
import COIN_DATA_MAP from '../../../../mock/coin-data-map';

const StyleWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    
    .coin-info {
        margin-right: 8px;
        font-size: 18px !important;
        font-weight: 600;
        color: #fff;
    }
    
    a {
        display: flex;
        padding: 0;
        margin: 0 4px 0 0;
    }

    .tradingview-toggle {
        display: flex;
        padding: 0;
        margin: 0 4px 0 0;
    }
    
    .icon-list {
        margin: 0;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }
    
    .img-icon {
        margin: 0;
        width: 26px;
        height: 26px;
        border-radius: 50%;
        cursor: pointer;

        &:hover {
            filter: brightness(1.1);
        }
    }
`;

export const CloseButton = styled.button`
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: 0;
    padding: 0;
    width: 20px;
    height: 20px;
    color: white;
    font-size: 20px;
    font-weight: 200;
    line-height: 20px;
    background-color: #2780ff;
    transform: translate(50%, -50%);
    transform-origin: center;
    z-index: 10;
    cursor: pointer;
    user-select: initial;

    &:hover {
        filter: brightness(110%);
    }

    &:focus {
        outline: none;
    }
    
    &:before {
        margin-top: -1.5px;
        content: "\00d7";
    }
`;

class IconList extends React.Component {
    componentDidMount() {
    }

    UppercaseFirst = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    render() {
        const {
            [STORE_KEYS.VIEWMODESTORE]: { tradingViewMode, setTradingViewMode },
            [STORE_KEYS.INSTRUMENTS]: { selectedBase },
            links, handleClose,
        } = this.props;

        var socialinfo = [];
        var i;
        var socialLinkItems = [];

        if (COIN_DATA_MAP[selectedBase] === undefined) {
            socialinfo = [];
        } else {
            socialinfo = COIN_DATA_MAP[selectedBase].social_info;
        }

        for (i = 0; i < socialinfo.length; i++) {
            let splitArray = socialinfo[i].split('//');
            let domainArray = splitArray[1].split('/');
            let title = domainArray[0].split('.');
            // console.log(title);
            let toolTip = '';
            if (title.length === 3) {
                toolTip = title[1];
            } else if (title.length === 2) {
                toolTip = title[0];
            }

            let filename = 'SocialLinks/' + domainArray[0] + '.png';
            let imgSrc = filename;

            if (socialinfo[i].indexOf('https://facebook.com') !== -1 || socialinfo[i].indexOf('https://www.facebook.com') !== -1) {
                imgSrc = imgIconFacebook;
            } else if (socialinfo[i].indexOf('https://twitter.com') !== -1 || socialinfo[i].indexOf('https://www.twitter.com') !== -1) {
                imgSrc = imgIconTwitter;
            } else if (socialinfo[i].indexOf('https://discord.com') !== -1 || socialinfo[i].indexOf('https://www.discord.com') !== -1) {
                imgSrc = imgIconDiscord;
            } else if (socialinfo[i].indexOf('https://github.com') !== -1 || socialinfo[i].indexOf('https://www.github.com') !== -1) {
                imgSrc = imgIconGithub;
            } else if (socialinfo[i].indexOf('https://telegram.org') !== -1 || socialinfo[i].indexOf('https://www.telegram.org') !== -1) {
                imgSrc = imgIconTelegram;
            } else if (socialinfo[i].indexOf('https://reddit.com') !== -1 || socialinfo[i].indexOf('https://www.reddit.com') !== -1) {
                imgSrc = imgIconReddit;
            } else if (socialinfo[i].indexOf('https://youtube.com') !== -1 || socialinfo[i].indexOf('https://www.youtube.com') !== -1) {
                imgSrc = imgIconYoutube;
            } else if (socialinfo[i].indexOf('https://instagram.com') !== -1 || socialinfo[i].indexOf('https://www.instagram.com') !== -1) {
                imgSrc = imgIconInstagram;
            }

            socialLinkItems.push(
                <a
                    href={socialinfo[i]}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={toolTip}
                    title={toolTip}
                    key={i}
                >
                    <img className="img-icon" alt="" src={imgSrc} />
                </a>
            );
        }

        return (
            <StyleWrapper
                onMouseLeave={() => handleClose()}
            >
                <div className="icon-list">
                    <div
                        className="tradingview-toggle"
                        aria-label="Tradingview"
                        title="Tradingview"
                        onClick={() => {
                            setTradingViewMode(!tradingViewMode);
                        }}
                    >
                        <TradingViewIcon className="img-icon" tradingViewMode={tradingViewMode}/>
                    </div>

                    {socialLinkItems}

                    {/* <a
                        href={(links && links.facebook) || 'https://facebook.com'}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Facebook111"
                        title="Facebook111"
                    >
                        <img className="img-icon" alt="" src={imgIconFacebook}/>
                    </a>

                    <a
                        href={(links && links.twitter) || 'https://twitter.com'}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Twitter"
                        title="Twitter"
                    >
                        <img className="img-icon" alt="" src={imgIconTwitter}/>
                    </a>

                    <a
                        href={(links && links.telegram) || 'https://telegram.org'}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Telegram"
                        title="Telegram"
                    >
                        <img className="img-icon" alt="" src={imgIconTelegram}/>
                    </a>

                    <a
                        href={(links && links.reddit) || 'https://reddit.com'}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Reddit"
                        title="Reddit"
                    >
                        <img className="img-icon" alt="" src={imgIconReddit}/>
                    </a>

                    <a
                        href={(links && links.discord) || 'https://discord.com'}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Discord"
                        title="Discord"
                    >
                        <img className="img-icon" alt="" src={imgIconDiscord}/>
                    </a>

                    <a
                        href={(links && links.youtube) || 'https://youtube.com'}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Youtube"
                        title="Youtube"
                    >
                        <img className="img-icon" alt="" src={imgIconYoutube}/>
                    </a>

                    <a
                        href={(links && links.instagram) || 'https://instagram.com'}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                        title="Instagram"
                    >
                        <img className="img-icon" alt="" src={imgIconInstagram}/>
                    </a> */}
                </div>

                {/* <CloseButton onClick={handleClose}/> */}
            </StyleWrapper>
        );
    }
}

export default inject(
    STORE_KEYS.VIEWMODESTORE,
    STORE_KEYS.INSTRUMENTS,
)(observer(IconList));
