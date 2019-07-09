/* eslint-disable react/no-danger */
import React from 'react';
import { compose, withProps } from 'recompose';
import { inject, observer } from 'mobx-react';
import findIndex from 'lodash/findIndex';
import { Tooltip } from 'react-tippy';
import { AutoSizer } from 'react-virtualized';
import { Textfit } from 'react-textfit';

import { STORE_KEYS } from '../../../stores';
import { renderSvg, format7DigitString, formatNegativeNumber } from '../../../utils';
import { Link } from '../../Router';
import {
    Wrapper, Middle, Bottom, AdditionalButton, Separator, TopText, TextfitWrapper
} from '../Component';
import {
    Ex, AddFundsIcon, St, Fr, Pg
} from '../icons';
// import TopItems from './TopItems';
import AddFundsModal from '../../YourAccount/AddFundsModal2';

const addFundsModal = (Modal, portalFromParameter, additionalVerticalSpace, heading1, heading2) => {
    const portal = ['/', '/trading'].indexOf(window.location.pathname) !== -1
        ? portalFromParameter
        : 'root';
    return Modal({
        portal,
        additionalVerticalSpace,
        ModalComponentFn: () => <AddFundsModal portal={portal} heading1={heading1} heading2={heading2}/>,
    });
};

const Items = ({
    handleSettingsOpen, handleExchangesOpen, pathname, settingsOpened, Modal, portfolioData, height,
}) => {
    const bctIndex = findIndex(portfolioData, { Coin: 'BCT' });
    let storeCredit = 0;

    if (bctIndex !== -1) {
        storeCredit = (portfolioData[bctIndex] && portfolioData[bctIndex].Amount) || 0;
    }

    const storeCreditStr = formatNegativeNumber(format7DigitString(storeCredit)).replace('+', '');

    return (
        <Wrapper settingsOpened={settingsOpened} className="items-wrapper" height={height}>
            <TopText>
                <AutoSizer>
                    {({ width, height }) => {
                        setTimeout(() => {
                            window.dispatchEvent(new Event('resize'));
                        }, 100);

                        return (
                            <TextfitWrapper width={width} height={height}>
                                <Textfit mode="multi">CROWS NEST PRO</Textfit>
                            </TextfitWrapper>
                        );
                    }}
                </AutoSizer>
            </TopText>

            <Middle>
                <Link
                    className={`nav-bar__item${pathname === '/' ? ' active' : ''}`}
                    to="/"
                >
                    <Pg/>
                    <p className="nav-bar__title">API</p>
                </Link>

                <Link
                    className={`nav-bar__item${pathname === '/ico' ? ' active' : ''}`}
                    to="/ico"
                >
                    <Pg/>
                    <p className="nav-bar__title">ICO</p>
                </Link>

                <Link
                    className={`nav-bar__item${pathname === '/charts' ? ' active' : ''}`}
                    to="/charts"
                >
                    <Pg/>
                    <p className="nav-bar__title">Charts</p>
                </Link>

                <Link
                    className={`nav-bar__item${pathname === '/stats' ? ' active' : ''}`}
                    to="/stats"
                >
                    <Pg/>
                    <p className="nav-bar__title">Stats</p>
                </Link>

                <Link
                    className={`nav-bar__item${pathname === '/news' ? ' active' : ''}`}
                    to="/news"
                >
                    <Pg/>
                    <p className="nav-bar__title">News</p>
                </Link>

                <div
                    className="nav-bar__item"
                    onClick={() => addFundsModal(
                        Modal,
                        'graph-chart-parent',
                        true,
                        `Your Store Credit: ${storeCreditStr}`,
                        'Add $1,000 to your store credit to access all apps. Instantly.'
                    )}
                >
                    <Tooltip
                        arrow={true}
                        animation="fade"
                        position="right"
                        placement="right"
                        distance={10}
                        theme="bct"
                        className="full-width"
                        html={(
                            <div className="advanced-tooltip text-left">
                                Store Credit: {storeCreditStr}
                            </div>
                        )}
                        popperOptions={
                            {
                                modifiers: {
                                    preventOverflow: {
                                        enabled: false,
                                    },
                                    flip: {
                                        enabled: false,
                                    },
                                    hide: {
                                        enabled: false,
                                    },
                                },
                            }
                        }
                    >
                        <AddFundsIcon />
                        <p className="nav-bar__title">Add Funds</p>
                    </Tooltip>
                </div>

                {/* <Separator/> */}
            </Middle>

            {/*
            <Bottom>
                <AdditionalButton
                    className="user-bar__btn"
                    data="tippy"
                    data-tippy-placement="right"
                    data-tippy-size="large"
                    title="Reload"
                    onClick={() => {
                        window.location.reload();
                    }}
                >
                    <Fr/>
                </AdditionalButton>

                <AdditionalButton
                    className="user-bar__btn"
                    data="tippy"
                    data-tippy-placement="right"
                    data-tippy-size="large"
                    title="Exchange"
                    onClick={handleExchangesOpen}
                >
                    <Ex/>
                </AdditionalButton>

                <AdditionalButton
                    onClick={handleSettingsOpen}
                    className="user-bar__btn"
                    data="tippy"
                    data-tippy-placement="right"
                    data-tippy-size="large"
                    title="Settings"
                    id="settings"
                >
                    <St/>
                </AdditionalButton>
            </Bottom>
            */}
        </Wrapper>
    );
};

const withStores = compose(
    inject(STORE_KEYS.MODALSTORE, STORE_KEYS.YOURACCOUNTSTORE),
    observer,
    withProps(
        ({
            [STORE_KEYS.MODALSTORE]: {
                Modal,
            },
            [STORE_KEYS.YOURACCOUNTSTORE]: {
                portfolioData,
            },
        }) => ({
            Modal,
            portfolioData,
        })
    )
);

export default withStores(Items);
