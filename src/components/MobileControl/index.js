import React, { Component, Fragment } from 'react';
import { FullScreenIcon, RefreshIcon } from '../SideBar/icons';

class MobileControl extends Component {
    state = {};

    render() {
        const {
            isMobileDevice, isMobileBrowser, goFull, refresh,
        } = this.props;

        return (
            <Fragment>
                <FullScreenIcon
                    onClick={goFull}
                    isMobile={isMobileDevice && !isMobileBrowser}
                />
                <RefreshIcon
                    onClick={refresh}
                    isMobile={isMobileDevice && !isMobileBrowser}
                />
            </Fragment>
        );
    }
}

export default MobileControl;
