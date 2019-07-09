import React, { Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { AutoSizer } from 'react-virtualized';

import { STORE_KEYS } from '../../../stores';
import { formatIntegerString } from '../../../utils';
import {
    CenterLabel,
    TelegramWrapper,
    TelegramIcon
} from './Components';
import { BodyWrapper, StyleWrapper } from '../Components';
import PayAppGlowWrapper from '../PayAppGlowWrapper';
// import TelegramLogin from '../../TelegramLogin';
// import HistoryViewV2 from '../HistoryViewV2';
import CurrencyDropdownWithSymbol from '../../../components-generic/CurrencyDropdown/CurrencyDropdownWithSymbol';
import TouchBlocker from '../../../components-generic/TouchBlocker';
import SMSVerification from '../../../components-generic/SMSVerification';

const showLoginModal = (Modal, onClose, portal, additionalVerticalSpace) => () => {
    return Modal({
        portal,
        additionalVerticalSpace,
        showClose: false,
        ModalComponentFn: () => <SMSVerification portal={portal} onClose={onClose} isMobile />,
    });
};

class PayMiddleScreen extends React.Component {
    state = {
        isSwipeEnabled: true,
        isToggleOpen: false,
        isHistoryViewOpen: false,
    };

    handleCurrencyChange = () => {

    };

    toggleSwipeEnabled = (isSwipeEnabled) => {
        this.setState({
            isSwipeEnabled,
            isToggleOpen: !isSwipeEnabled,
        });
    };

    toggleHistoryView = (value) => {
        this.setState(prevState => {
            const isHistoryViewOpen = (typeof value === 'boolean') ? value : !prevState.isHistoryViewOpen;

            return {
                isHistoryViewOpen,
                isSwipeEnabled: !isHistoryViewOpen,
                isToggleOpen: false,
            };
        });
    };

    handleSwipe = (direction) => {
        if (
            this.props.onSwipe
            && this.state.isSwipeEnabled
            && (
                direction === 'left'
                || direction === 'right'
            )
        ) {
            this.props.onSwipe(direction);
        }
    };

    render() {
        const {
            [STORE_KEYS.SETTINGSSTORE]: {
                getDefaultPrice,
                defaultFiat,
            },
            [STORE_KEYS.YOURACCOUNTSTORE]: {
                PortfolioTotalValue,
            },
            [STORE_KEYS.MODALSTORE]: { Modal, onClose },
            isLoggedIn,
        } = this.props;

        const {
            isToggleOpen,
            isHistoryViewOpen,
        } = this.state;

        const balanceMaxValue = formatIntegerString(getDefaultPrice(PortfolioTotalValue));

        return (
            <BodyWrapper>
                <TouchBlocker onSwipe={this.handleSwipe} isBlockMouseScroll>
                    {/*
                    {isHistoryViewOpen && (
                        <HistoryViewV2 onSwipe={this.handleSwipe} onClose={this.toggleHistoryView} />
                    )}
                    */}

                    <AutoSizer>
                        {({ width, height }) => (
                            <StyleWrapper width={width} height={height}>
                                <CenterLabel size={Math.min(width, height) * 0.8} isSmallFont={balanceMaxValue && balanceMaxValue.length > 6}>
                                    {isLoggedIn ? (
                                        <Fragment>
                                            <div className="amount-wrapper">
                                                <CurrencyDropdownWithSymbol
                                                    alignRight={false}
                                                    alignTop={false}
                                                    isDisabled={false}
                                                    isClickable={true}
                                                    isMobile
                                                    onChange={this.handleCurrencyChange}
                                                    onToggleDropdown={isToggleOpen => this.toggleSwipeEnabled(!isToggleOpen)}
                                                    type="fiat"
                                                />
                                                <span
                                                    className="amount"
                                                    onClick={() => {
                                                        if (this.props.showHistoryMode) {
                                                            this.props.showHistoryMode();
                                                        }
                                                    }}
                                                >
                                                    {balanceMaxValue}
                                                </span>

                                                <div className="label">{defaultFiat}</div>
                                            </div>
                                        </Fragment>
                                    ) : (
                                        <TelegramWrapper
                                            onClick={() => {
                                                showLoginModal(Modal, onClose, 'root', true)();
                                            }}
                                        >
                                            {/*
                                            <TelegramLogin
                                                width={300}
                                                height={60}
                                                setLoading={this.setLoading}
                                            />
                                            */}
                                            <TelegramIcon />
                                        </TelegramWrapper>
                                    )}
                                </CenterLabel>
                            </StyleWrapper>
                        )}
                    </AutoSizer>

                    {!isToggleOpen && (
                        <PayAppGlowWrapper />
                    )}
                </TouchBlocker>
            </BodyWrapper>
        );
    }
}

export default inject(
    STORE_KEYS.YOURACCOUNTSTORE,
    STORE_KEYS.SETTINGSSTORE,
    STORE_KEYS.MODALSTORE,
)(observer(PayMiddleScreen));
