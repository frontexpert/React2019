import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { compose, withProps } from 'recompose';

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { WrapperCircle } from './Components';
import { STORE_KEYS } from '../../../../stores';

class OrderProgress extends Component {
    componentDidMount() {

    }

    render() {
        const { isLeft, downTimerCount, maxDownTimerCount } = this.props;
        return(
            <WrapperCircle isLeft={isLeft}>
                <CircularProgressbar
                    strokeWidth={10}
                    value={downTimerCount}
                    maxValue={maxDownTimerCount}
                    text=""
                    styles={buildStyles({
                        textSize: '34px',
                        textColor: '#fff',
                        pathColor: 'rgba(255, 255, 255, .5)',
                        trailColor: 'rgba(255, 255, 255, .15)',
                    })}
                />
            </WrapperCircle>
        );
    }
}

export default compose(
    inject(
        STORE_KEYS.ORDERHISTORY,
    ),
    observer,
    withProps(
        ({
            [STORE_KEYS.ORDERHISTORY]: { downTimerCount, maxDownTimerCount },
        }) => ({
            downTimerCount,
            maxDownTimerCount,
        })
    )
)(OrderProgress);
