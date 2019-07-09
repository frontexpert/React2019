import React from 'react';
import { inject, observer } from 'mobx-react';

import { STORE_KEYS } from '../../../stores';
import {
    SettingsPopupStyleWrapper,
    SettingsPopupHeader,
    SettingsPopupItem,
    CloseButton
} from './Components';
import SquareButton from '../../../components-generic/GradientButtonSquare';
// import SwitchCustom from '../../../components-generic/SwitchMui';
import SwitchCustom from '../../../components-generic/SwitchCustomRect';

class SettingsPopup extends React.Component {
    state = {
        isRealTrading: false,
    };

    handleClose = () => {
        this.props.onClick();
    };

    handleActiveRealTrading = () => this.setState(prevState => ({
        isRealTrading: !prevState.isRealTrading,
    }));

    handleResetBalance = () => {
        this.props[STORE_KEYS.YOURACCOUNTSTORE].resetDemoBalances();
        this.props[STORE_KEYS.PORTFOLIODATASTORE].resetPortfolioData();
        this.handleClose();
    };

    render() {
        const { isRealTrading } = this.state;

        return (
            <SettingsPopupStyleWrapper>
                <CloseButton onClick={this.handleClose}/>

                <div className="content">
                    <SettingsPopupHeader>
                        <svg role="img" aria-hidden="true">
                            <use
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                xlinkHref="img/sprite-basic.svg#gear-filled"
                            />
                        </svg>
                        Settings
                    </SettingsPopupHeader>

                    <SettingsPopupItem>
                        <span className="settings-popup-item__label">
                            Reset Demo Balance
                        </span>
                        <div className="settings-popup-item__control">
                            <SquareButton
                                className="negative-solid"
                                width={90}
                                height={30}
                                onClick={this.handleResetBalance}
                            >
                                <span className="settings-popup-item__btn-label">RESET</span>
                            </SquareButton>
                        </div>
                    </SettingsPopupItem>

                    <SettingsPopupItem>
                        <span className="settings-popup-item__label">
                            Activate Real Trading
                        </span>
                        <div className="settings-popup-item__control">
                            <SwitchCustom checked={isRealTrading} onChange={this.handleActiveRealTrading}/>
                        </div>
                    </SettingsPopupItem>
                </div>
            </SettingsPopupStyleWrapper>
        );
    }
}

export default inject(
    STORE_KEYS.VIEWMODESTORE,
    STORE_KEYS.YOURACCOUNTSTORE,
    STORE_KEYS.PORTFOLIODATASTORE,
)(observer(SettingsPopup));
