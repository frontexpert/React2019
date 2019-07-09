import React, { Component } from 'react';
import {
    Wrapper,
    InnerWrapper
} from './Components';
import HeaderMenuItems from './HeaderMenuItems';
import ActiveTable from './ActiveTable';
import FilledTable from './FilledTable';
import MyTradesTable from './MyTradesTable';

export const activeSetStateKeys = {
    activeModeKey: 'active',
    filledModeKey: 'filled',
    myTradesModeKey: 'trades',
};

class OrderHistoryAdv extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeSet: activeSetStateKeys.activeModeKey,
        };
    }

    setMenuItem = (mode) => {
        this.setState({
            activeSet: mode,
        });
    };

    render() {
        const { activeSet } = this.state;
        return (
            <Wrapper>
                <HeaderMenuItems
                    activeSet={activeSet}
                    setMenuItem={this.setMenuItem}
                />
                <InnerWrapper>
                    {
                        activeSet === activeSetStateKeys.activeModeKey &&
                        <ActiveTable/>
                    }
                    {
                        activeSet === activeSetStateKeys.filledModeKey &&
                        <FilledTable/>
                    }
                    {
                        activeSet === activeSetStateKeys.myTradesModeKey &&
                        <MyTradesTable/>
                    }
                </InnerWrapper>
            </Wrapper>
        );
    }
}

export default OrderHistoryAdv;
