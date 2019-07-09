import React from 'react';
import { compose, withProps } from 'recompose';
import { inject, observer } from 'mobx-react';

import { STORE_KEYS } from '../../../stores';
import { BackgroundProgress } from './Components';
import { STATE_KEYS } from '../../../stores/ConvertStore';

class BackgroundProgressBar extends React.Component {
    state = {};
    render() {
        const {
            convertState,
            currentProgress,
            isCoinPairInversed,
        } = this.props;
        const isProgressing = (convertState === STATE_KEYS.submitOrder) || (convertState === STATE_KEYS.orderDone);

        return (
            <BackgroundProgress currentProgress={currentProgress} isCoinPairInversed={isCoinPairInversed} isProgressing={isProgressing}>
                <div className="progress"/>
            </BackgroundProgress>
        );
    }
}
export default compose(
    inject(
        STORE_KEYS.CONVERTSTORE,
        STORE_KEYS.ORDERBOOK,
    ),
    observer,
    withProps(
        ({
            [STORE_KEYS.CONVERTSTORE]: { convertState, currentProgress },
            [STORE_KEYS.ORDERBOOK]: { isCoinPairInversed },
        }) => ({
            convertState,
            currentProgress,
            isCoinPairInversed,
        })
    )
)(BackgroundProgressBar);
