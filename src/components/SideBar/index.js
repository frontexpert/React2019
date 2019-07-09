/* eslint-disable react/no-danger */
import React, { Component } from 'react';

// import Portal from './Portal';
// import Arrow from './Arrow';
import Items from './Items';
import ExchangePop from './ExchangePop';
import NewSettingsPop from './NewSettingsPop';
import TermsModal from '../YourAccount/TermsModal';
import KeyModal from '../KeyModal';
import { SideBarWrapper, Head } from './Component';

import avatarImg from './icons/avatar.svg';

class Sidebar extends Component {
    state = {
        settingsOpened: false,
        exchangesOpened: false,
        isTermsModalOpen: false,
        isKeyModalOpen: false,
    };

    handleSettingsOpen = () => {
        this.setState(prevState => ({
            settingsOpened: !prevState.settingsOpened,
            exchangesOpened: !prevState.settingsOpened ? false : prevState.exchangesOpened,
        }));
    };

    handleExchangesOpen = () => {
        this.setState(prevState => ({
            exchangesOpened: !prevState.exchangesOpened,
            settingsOpened: !prevState.exchangesOpened ? false : prevState.settingsOpened,
        }));
    };

    toggleTermsModal = () => {
        this.setState(prevState => ({
            isTermsModalOpen: !prevState.isTermsModalOpen,
        }));
    };

    toggleKeyModal = (isKeyModalOpen) => {
        this.setState(prevState => ({
            isKeyModalOpen: (typeof isKeyModalOpen === 'boolean') ? isKeyModalOpen : !prevState.isKeyModalOpen,
        }));
    };

    render() {
        const {
            settingsOpened,
            exchangesOpened,
            isTermsModalOpen,
            isKeyModalOpen,
        } = this.state;
        const { height, width, isHover } = this.props;

        return (
            <React.Fragment>
                <SideBarWrapper
                    width={width}
                    settingsOpened={settingsOpened}
                    exchangesOpened={exchangesOpened}
                    isHover={isHover}
                >
                    <Head>
                        <img src={avatarImg} width={35} height={35} alt="" />
                    </Head>

                    <Items
                        handleSettingsOpen={this.handleSettingsOpen}
                        handleExchangesOpen={this.handleExchangesOpen}
                        pathname={window.location.pathname}
                        settingsOpened={settingsOpened}
                        exchangesOpened={exchangesOpened}
                        height={height - 75}
                    />

                    {/* <Arrow/> */}

                    {/* <Portal */}
                    {/* opened={settingsOpened} */}
                    {/* onClick={this.handleSettingsOpen} */}
                    {/* /> */}

                    {isTermsModalOpen && <TermsModal show={this.toggleTermsModal}/>}

                    {/* {isKeyModalOpen && <KeyModal toggleModal={this.toggleKeyModal} isHoverMode/>} */}
                    <KeyModal
                        toggleModal={this.toggleKeyModal}
                        hoverMode
                        inLineMode
                        isModalOpen={isKeyModalOpen}
                    />
                </SideBarWrapper>

                {exchangesOpened && <ExchangePop toggle={this.handleExchangesOpen}/>}

                {settingsOpened && (
                    <NewSettingsPop
                        toggle={this.handleSettingsOpen}
                        toggleTermsModal={this.toggleTermsModal}
                        toggleKeyModal={this.toggleKeyModal}
                    />
                )}
            </React.Fragment>
        );
    }
}

export default Sidebar;
