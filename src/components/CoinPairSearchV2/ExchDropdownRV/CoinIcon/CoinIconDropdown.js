import React, { Fragment } from 'react';
import { compose, withProps } from 'recompose';
import { inject, observer } from 'mobx-react';

import { STORE_KEYS } from '../../../../stores';
import { formatStringForMKTCAP, unifyDigitString } from '../../../../utils';
import CoinIcon from './index';
import {
    Wrapper,
    DropdownWrapper,
    Row,
    InfoIcon,
    InfoWrapper
} from './Components';
import CoinNameSmall from '../CoinName/CoinNameSmall';
import COIN_DATA_MAP from '../../../../mock/coin-data-map';

import imgIconFacebook from './icon-facebook.svg';
import imgIconTwitter from './icon-twitter.svg';
import imgIconTelegram from './icon-telegram.svg';
import imgIconReddit from './icon-reddit.svg';
import imgIconDiscord from './icon-discord.svg';
import imgIconYoutube from './icon-youtube.svg';
import imgIconInstagram from './icon-instagram.svg';
import imgIconGithub from './icon-github.svg';

class CoinIconDropdown extends React.Component {
    state = {
        isOpened: false,
        isMouseOver: false,
    };

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside = (event) => {
        if (this.state.isOpened && this.wrapperRef && this.wrapperRef.contains && !this.wrapperRef.contains(event.target)) {
            this.setState({
                isOpened: false,
            });
        }
    };

    toggleDropdown = (toggle) => {
        if (toggle) {
            this.timeoutOnMouseOver = setTimeout(() => {
                this.setState({ isOpened: true });
            }, 5000);
            this.setState({ isMouseOver: true });
        } else {
            if (this.timeoutOnMouseOver) {
                clearTimeout(this.timeoutOnMouseOver);
            }
            this.setState({
                isOpened: false,
                isMouseOver: false,
            });
        }
    };

    getSocialLinkItems = () => {
        const { value } = this.props;

        let socialInfo = [];
        if (COIN_DATA_MAP[value] === undefined) {
            socialInfo = [];
        } else {
            socialInfo = COIN_DATA_MAP[value].social_info;
        }

        const socialLinkItems = [];
        for (let i = 0; i < socialInfo.length; i++) {
            let splitArray = socialInfo[i].split('//');
            let domainArray = splitArray[1].split('/');
            let title = domainArray[0].split('.');

            let toolTip = '';
            if (title.length === 3) {
                toolTip = title[1];
            } else if (title.length === 2) {
                toolTip = title[0];
            }

            let imgSrc = 'SocialLinks/' + domainArray[0] + '.png';
            if (socialInfo[i].indexOf('https://facebook.com') !== -1 || socialInfo[i].indexOf('https://www.facebook.com') !== -1) {
                imgSrc = imgIconFacebook;
            } else if (socialInfo[i].indexOf('https://twitter.com') !== -1 || socialInfo[i].indexOf('https://www.twitter.com') !== -1) {
                imgSrc = imgIconTwitter;
            } else if (socialInfo[i].indexOf('https://discord.com') !== -1 || socialInfo[i].indexOf('https://www.discord.com') !== -1) {
                imgSrc = imgIconDiscord;
            } else if (socialInfo[i].indexOf('https://github.com') !== -1 || socialInfo[i].indexOf('https://www.github.com') !== -1) {
                imgSrc = imgIconGithub;
            } else if (socialInfo[i].indexOf('https://telegram.org') !== -1 || socialInfo[i].indexOf('https://www.telegram.org') !== -1) {
                imgSrc = imgIconTelegram;
            } else if (socialInfo[i].indexOf('https://reddit.com') !== -1 || socialInfo[i].indexOf('https://www.reddit.com') !== -1) {
                imgSrc = imgIconReddit;
            } else if (socialInfo[i].indexOf('https://youtube.com') !== -1 || socialInfo[i].indexOf('https://www.youtube.com') !== -1) {
                imgSrc = imgIconYoutube;
            } else if (socialInfo[i].indexOf('https://instagram.com') !== -1 || socialInfo[i].indexOf('https://www.instagram.com') !== -1) {
                imgSrc = imgIconInstagram;
            }

            socialLinkItems.push(
                <a
                    href={socialInfo[i]}
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

        return socialLinkItems;
    };

    render() {
        const { isOpened, isMouseOver } = this.state;
        const {
            width,
            height,
            isLeft,
            value,
            defaultFiat,
            OrderEventsData,
            baseSymbol: selectedBase,
            quoteSymbol: selectedQuote,
            price,
            getLocalCurrency,
            getDefaultPrice,
            isSearchOpen,
        } = this.props;
        if (isSearchOpen && (isOpened || isMouseOver)) {
            this.setState({ isOpened: false });
        }
        const activeCoin = isLeft ? selectedBase : selectedQuote;

        let ratioPriceLeft = 1;
        let ratioPriceRight = 1;
        let marketCap = 0;
        let volume24h = 0;
        for (let [key, data] of OrderEventsData) {
            if (data.Coin === activeCoin && data.Price) {
                marketCap = data.Marketcap;
                volume24h = data.Volume24h;
                const Price = data.Price;
                ratioPriceRight = unifyDigitString(getDefaultPrice(Price < 1 ? 1 / Price : Price));
            }
        }

        return (
            <Wrapper
                innerRef={ref => this.wrapperRef = ref}
                isOpened={isMouseOver}
                width={width}
                height={height}
                onClick={(e) => {
                    e.stopPropagation();
                    this.setState({ isOpened: true });
                }}
                onMouseLeave={() => {
                    this.setState({ isOpened: false });
                }}
            >
                <InfoIcon className="info-icon-wrapper"/>
                <div className="coin-icon-wrapper">
                    <CoinIcon
                        value={value}
                        defaultFiat={defaultFiat}
                        // toggleDropdown={this.toggleDropdown}
                    />
                </div>
                {isOpened && (
                    <DropdownWrapper>
                        <Row>
                            <CoinIcon
                                showTether
                                value={value}
                                defaultFiat={defaultFiat}
                            />
                            <span>{`${ratioPriceLeft} ${isLeft ? selectedBase : selectedQuote} = ${ratioPriceRight} ${defaultFiat}`}</span>
                        </Row>
                        <div className="social-link-wrapper">
                            <div className="social-link-list">
                                {this.getSocialLinkItems()}
                            </div>
                            <InfoWrapper>
                                <div>Market Cap:
                                    $<span>{formatStringForMKTCAP(getDefaultPrice(marketCap, activeCoin))}</span>
                                </div>
                                <div>24h Volume:
                                    $<span>{formatStringForMKTCAP(getDefaultPrice(volume24h, activeCoin))}</span>
                                </div>
                            </InfoWrapper>
                        </div>
                    </DropdownWrapper>
                )}
            </Wrapper>
        );
    }
}

export default compose(
    inject(
        STORE_KEYS.YOURACCOUNTSTORE,
        STORE_KEYS.INSTRUMENTS,
        STORE_KEYS.PRICECHARTSTORE,
        STORE_KEYS.SETTINGSSTORE,
    ),
    observer,
    withProps(
        ({
            [STORE_KEYS.YOURACCOUNTSTORE]: {
                OrderEventsData,
            },
            [STORE_KEYS.INSTRUMENTS]: {
                selectedInstrumentPair: [baseSymbol, quoteSymbol],
            },
            [STORE_KEYS.PRICECHARTSTORE]: {
                price,
            },
            [STORE_KEYS.SETTINGSSTORE]: {
                getDefaultPrice,
                getLocalCurrency,
            },
        }) => ({
            OrderEventsData,
            baseSymbol,
            quoteSymbol,
            price,
            getDefaultPrice,
            getLocalCurrency,
        })
    )
)(CoinIconDropdown);
