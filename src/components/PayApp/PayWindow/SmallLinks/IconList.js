import React, { Component } from 'react';
import styled from 'styled-components';

import imgIconWeb from './icon-web.svg';
import imgIconFacebook from './icon-facebook.svg';
import imgIconTwitter from './icon-twitter.svg';
import imgIconTelegram from './icon-telegram.svg';
import imgIconReddit from './icon-reddit.svg';
import imgIconDiscord from './icon-discord.svg';
import imgIconYoutube from './icon-youtube.svg';
import imgIconInstagram from './icon-instagram.svg';

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

const IconList = ({ links, handleClose }) => (
    <StyleWrapper>
        <div className="icon-list">
            <a
                href={(links && links.web) || 'https://www.tradingview.com'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Tradingview"
                title="Tradingview"
            >
                <img className="img-icon" alt="" src={imgIconWeb}/>
            </a>

            <a
                href={(links && links.facebook) || 'https://facebook.com'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                title="Facebook"
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
            </a>
        </div>

        {/* <CloseButton onClick={handleClose}/> */}
    </StyleWrapper>
);

export default IconList;
