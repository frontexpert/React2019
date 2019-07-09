import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import ReactFullpage from '@fullpage/react-fullpage';
import { compose, withProps } from 'recompose';

import { STORE_KEYS } from '../../stores';
import { payViewModeKeys } from '../../stores/PayAppStore';
// import { contentModeKeys } from '../../stores/PayWindowStore';
// import HistoryViewV2 from './HistoryViewV2';
import PayAppHistory from './PayAppHistory';
import PayQRScanner from './PayQRScanner';
import PayCalc from './PayCalc';
import PayCurrencyChoose from './PayCurrencyChooseV2';
// import PayQRCode from './PayQRCode';
import PayQRCodeConfirm from './PayQRCodeConfirm';
// import MobileLogin from '../MobileLogin';
import CoinReceivePopup from '../Modals/CoinReceivePopup';
import PayMiddleScreen from './PayMiddleScreen';
import {
    Wrapper,
    // PayAppBody,
    FullpageWrapper,
    PageIndicator,
    Indicator
} from './Components';

class PayApp extends Component {
    constructor(props) {
        super(props);

        this.fullPageRef = null;
        this.fullPageRebuildTimerId = null;
        this.mounted = true;

        this.state = {
            isShowNotification: false,
            claimRet: '',
            currentSection: 0,
            currentSlide: 1,
            isSwiping: false,
        };
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
    }

    componentWillReceiveProps(props) {
        if (this.props.payViewMode !== props.payViewMode) {
            this.handleResize();
        }
    }

    componentWillUnmount() {
        this.mounted = false;
        clearTimeout(this.fullPageRebuildTimerId);
        window.removeEventListener('resize', this.handleResize);
    }

    handleResize = () => {
        clearTimeout(this.fullPageRebuildTimerId);

        setTimeout(() => {
            if (this.mounted && this.fullPageRef) {
                this.fullPageRef.reBuild();
            }
        }, 30);
    };

    setClaimRet = (claimRet) => {
        this.setState({
            claimRet,
            isShowNotification: true,
        });

        setTimeout(() => {
            this.setState({
                isShowNotification: false,
            });
            // setQrObject(null);
        }, 10000);
    };

    setAllowScrolling = (...value) => {
        if (this.fullPageRef) {
            this.fullPageRef.setAllowScrolling(...value);
        }
    };

    afterLoad = (origin, destination, direction) => {
        this.setState({
            currentSection: destination.index,
            isSwiping: false,
        });
    };

    afterSlideLoad = (section, origin, destination, direction) => {
        this.setState({
            currentSlide: destination.index,
            isSwiping: false,
        });
    };

    handleSwipe = (direction) => {
        if (this.state.isSwiping) {
            return;
        }

        this.setState({
            isSwiping: true,
        });

        if (this.fullPageRef) {
            switch (direction) {
            case 'up':
                this.fullPageRef.moveSectionDown();
                break;
            case 'down':
                this.fullPageRef.moveSectionUp();
                break;
            case 'left':
                this.fullPageRef.moveSlideRight();
                break;
            case 'right':
                this.fullPageRef.moveSlideLeft();
                break;
            default:
            }
        }
    };

    afterRender = () => {
        if (!this.props.isLoggedIn) {
            this.setAllowScrolling(false, 'up, down, left, right');
        }
    };

    toggleViewMode = (viewMode) => {
        this.props.switchAppContentView(viewMode);
    };

    render() {
        const {
            payViewMode,
            qrObj,
            contentViewMode,
            isLoggedIn,
        } = this.props;

        const {
            isShowNotification,
            claimRet,
            currentSection,
            currentSlide,
        } = this.state;

        return (
            <Fragment>
                {/*
                {(isLoggedIn && payViewMode === payViewModeKeys.payQRCodeModeKey) ? (
                    <PayQRCode />
                ) : (
                */}

                {(isLoggedIn && payViewMode === payViewModeKeys.payScanConfirmModeKey) ? (
                    <Wrapper>
                        <PayQRCodeConfirm qrObj={qrObj} setClaimRet={this.setClaimRet} />

                        {isShowNotification && (qrObj !== null) && (
                            <CoinReceivePopup qrObj={qrObj} claimRet={claimRet} />
                        )}
                    </Wrapper>
                ) : (
                    (isLoggedIn && payViewMode === payViewModeKeys.payHistoryModeKey) ? (
                        <Wrapper>
                            <PayAppHistory onClose={() => this.toggleViewMode(payViewModeKeys.payChooseModeKey)} />
                        </Wrapper>
                    ) : (
                        <FullpageWrapper>
                            <ReactFullpage
                                navigation={false}
                                scrollBar={false}
                                autoScrolling={true}
                                fitToSection={true}
                                scrollOverflow={false}
                                slidesNavigation={false}
                                loopHorizontal={false}
                                controlArrows={false}
                                afterLoad={this.afterLoad}
                                afterSlideLoad={this.afterSlideLoad}
                                allowScrolling={false}
                                afterRender={this.afterRender}
                                keyboardScrolling={false}
                                render={({ state, fullpageApi }) => {
                                    this.fullPageRef = fullpageApi;

                                    return (
                                        <div id="fullpage-wrapper">
                                            {/*
                                            <div className="section" id="section1">
                                                <HistoryViewV2 onSwipe={this.handleSwipe} isVisible={currentSection === 0} />
                                            </div>
                                            */}

                                            <div className="section active" id="section2">
                                                <div className="slide">
                                                    <PayQRScanner
                                                        onSwipe={this.handleSwipe}
                                                        isVisible={currentSection === 0 && currentSlide === 0}
                                                    />
                                                </div>
                                                <div className="slide active">
                                                    <PayMiddleScreen
                                                        onSwipe={this.handleSwipe}
                                                        showHistoryMode={() => this.toggleViewMode(payViewModeKeys.payHistoryModeKey)}
                                                        isLoggedIn={isLoggedIn}
                                                        isVisible={currentSection === 0 && currentSlide === 1}
                                                    />
                                                </div>
                                                <div className="slide">
                                                    <PayCurrencyChoose
                                                        onSwipe={this.handleSwipe}
                                                        isVisible={currentSection === 0 && currentSlide === 2}
                                                    />
                                                </div>
                                            </div>

                                            <div className="section" id="section3">
                                                <PayCalc
                                                    onSwipe={this.handleSwipe}
                                                    isVisible={currentSection === 1}
                                                />
                                            </div>
                                        </div>
                                    );
                                }}
                            />

                            {!((currentSection === 0 && currentSlide === 0) || (currentSection === 0 && currentSlide === 2) || currentSection === 1) && (
                                <PageIndicator className="page-indicator">
                                    {/* <Indicator className="indicator-0"><span className="thumb" /></Indicator> */}
                                    <Indicator className="indicator-1-0" isVisible={currentSection === 0 && currentSlide === 0}>
                                        <span className="thumb" />
                                    </Indicator>
                                    <Indicator className="indicator-1-1" isVisible={currentSection === 0 && currentSlide === 1}>
                                        <span className="thumb" />
                                    </Indicator>
                                    <Indicator className="indicator-1-2" isVisible={(currentSection === 0 && currentSlide === 2) || currentSection === 1}>
                                        <span className="thumb" />
                                    </Indicator>
                                    {/* <Indicator className="indicator-2"><span className="thumb" /></Indicator> */}
                                </PageIndicator>
                            )}
                        </FullpageWrapper>
                    )
                )}

                {/*
                )}

                {isLoggedIn ? (
                    <Wrapper
                        overflowVisible={contentViewMode === contentModeKeys.historyModeKey}
                    >
                        <PayAppBody>
                            {payViewMode === payViewModeKeys.payHistoryModeKey && (
                                <HistoryViewV2/>
                            )}

                            {payViewMode === payViewModeKeys.payCalcModeKey && (
                                <PayCalc/>
                            )}

                            {payViewMode === payViewModeKeys.payChooseModeKey && (
                                <PayCurrencyChoose/>
                            )}

                            {payViewMode === payViewModeKeys.payScanModeKey && (
                                <PayQRScanner/>
                            )}

                            {payViewMode === payViewModeKeys.payQRCodeModeKey && (
                                <PayQRCode/>
                            )}

                            {payViewMode === payViewModeKeys.payScanConfirmModeKey && (
                                <PayQRCodeConfirm qrObj={qrObj} setClaimRet={this.setClaimRet} />
                            )}
                        </PayAppBody>

                        {isShowNotification && (qrObj !== null) && (
                            <CoinReceivePopup qrObj={qrObj} claimRet={claimRet} />
                        )}
                    </Wrapper>
                ) : (
                    <MobileLogin />
                )}
                */}
            </Fragment>
        );
    }
}

export default compose(
    inject(
        STORE_KEYS.PAYAPPSTORE,
        STORE_KEYS.PAYWINDOWSTORE,
        STORE_KEYS.TELEGRAMSTORE
    ),
    observer,
    withProps(
        ({
            [STORE_KEYS.PAYAPPSTORE]: {
                payViewMode,
                qrObj,
                switchAppContentView,
            },
            [STORE_KEYS.PAYWINDOWSTORE]: {
                contentViewMode,
            },
            [STORE_KEYS.TELEGRAMSTORE]: {
                isLoggedIn,
            },
        }) => {
            return ({
                payViewMode,
                qrObj,
                switchAppContentView,
                contentViewMode,
                isLoggedIn,
            });
        }
    )
)(PayApp);
