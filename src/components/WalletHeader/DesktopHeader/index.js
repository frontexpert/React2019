import React, { Fragment } from 'react';
import { compose, withProps } from 'recompose';
import { inject, observer } from 'mobx-react';

import { STORE_KEYS } from '@/stores';
import { animateButton } from '@/utils/CustomControls';
import AppStoreControls from './AppStoreControls'
import { Wrapper, ThreeDotIcon } from './Components';

class DesktopHeader extends React.Component {
    state = {
        showAppStoreMenu: false
    }

    toggleAppStoreMenu = open => e => {
        const {
            setAppStoreControlsOpen,
        } = this.props;
        this.setState({ showAppStoreMenu: open });
        setAppStoreControlsOpen(true);
    }

    render() {
        const { showAppStoreMenu } = this.state;
        const {
            isLoggedIn,
            toggleDropDown,
            defaultFiat,
            selectedBase,
            selectedQuote,
            width,
            isCoinPairInversed,
            isMenuOpened,
            isAppStoreControlsOpen,
            setAppStoreDropDownOpen,
        } = this.props;
        const base = (isCoinPairInversed ? selectedQuote : selectedBase) || '';
        const symbol1 = base.replace('F:', '');
        const value1 = symbol1 === 'USDT'
            ? (defaultFiat === 'USD'
                ? 'USDT'
                : defaultFiat)
            : symbol1;
        const quote = (isCoinPairInversed ? selectedBase : selectedQuote) || '';
        const symbol2 = quote.replace('F:', '');
        const value2 = symbol2 === 'USDT'
            ? (defaultFiat === 'USD'
                ? 'USDT'
                : defaultFiat)
            : symbol2;

        return (
            <Wrapper width={width} onMouseLeave={this.toggleAppStoreMenu(false)} isMenuOpened={isMenuOpened} isLoggedIn={isLoggedIn}>
                {isLoggedIn &&
                    <Fragment>
                        <ThreeDotIcon
                            id="threeDotIcon"
                            isMenuOpened={isMenuOpened}
                            onClick={(e) => {
                                animateButton('threeDotIcon');
                                toggleDropDown();
                                setAppStoreDropDownOpen(true);
                            }}
                            toggleAppStoreMenu={this.toggleAppStoreMenu}
                        />
                    </Fragment>
                }
                {
                    !isMenuOpened && showAppStoreMenu && isAppStoreControlsOpen &&
                    <AppStoreControls
                        isMenuOpened={isMenuOpened}
                    />
                }
            </Wrapper>
        );
    }
};

const withStore = compose(
    inject(
        STORE_KEYS.BILLSMODALSTORE,
        STORE_KEYS.SETTINGSSTORE,
        STORE_KEYS.INSTRUMENTS,
        STORE_KEYS.ORDERBOOK,
        STORE_KEYS.VIEWMODESTORE,
    ),
    observer,
    withProps(
        ({
            [STORE_KEYS.BILLSMODALSTORE]: {
                showBillChips,
            },
            [STORE_KEYS.SETTINGSSTORE]: {
                defaultFiat,
            },
            [STORE_KEYS.INSTRUMENTS]: {
                selectedBase,
                selectedQuote,
            },
            [STORE_KEYS.ORDERBOOK]: {
                isCoinPairInversed,
            },
            [STORE_KEYS.VIEWMODESTORE]: {
                isAppStoreControlsOpen,
                setAppStoreControlsOpen,
                setAppStoreDropDownOpen,
            }
        }) => ({
            showBillChips,
            defaultFiat,
            selectedBase,
            selectedQuote,
            isCoinPairInversed,
            isAppStoreControlsOpen,
            setAppStoreControlsOpen,
            setAppStoreDropDownOpen,
        })
    )
);

export default withStore(DesktopHeader);
