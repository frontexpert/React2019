import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { HeaderMenu, Menu, DropMenuWrapper } from './Components';
import { activeSetStateKeys } from './index';
import DropMenu from './DropMenu';
import { STORE_KEYS } from '../../stores';

class HeaderMenuItems extends Component {
    state = {};
    render() {
        const { activeSet, setMenuItem, [STORE_KEYS.INSTRUMENTS]: instrumentsStore } = this.props;
        const instrumentData = ['All', instrumentsStore.selectedBase, instrumentsStore.selectedQuote];
        const statusData = ['All', 'Filled', 'Canceled', 'Rejected', 'Expired'];
        const tradeData = ['All', 'Yes', 'No'];
        const sourceData = ['All', 'FIX', 'WEB', 'REST', 'ADM'];

        return (
            <HeaderMenu>
                <Menu
                    active={activeSet === activeSetStateKeys.activeModeKey}
                    onClick={() => setMenuItem(activeSetStateKeys.activeModeKey)}
                >
                    Active
                </Menu>
                <Menu
                    active={activeSet === activeSetStateKeys.filledModeKey}
                    onClick={() => setMenuItem(activeSetStateKeys.filledModeKey)}
                >
                    Filled and Cancelled
                </Menu>
                <Menu
                    active={activeSet === activeSetStateKeys.myTradesModeKey}
                    onClick={() => setMenuItem(activeSetStateKeys.myTradesModeKey)}
                >
                    My Trades
                </Menu>

                <DropMenuWrapper>
                    <DropMenu data={instrumentData} label="Instrument"/>
                    {
                        activeSet === activeSetStateKeys.filledModeKey &&
                        <DropMenu data={statusData} label="Status"/>
                    }
                    {
                        activeSet !== activeSetStateKeys.myTradesModeKey &&
                        <DropMenu data={tradeData} label="Trade"/>
                    }
                    {
                        activeSet !== activeSetStateKeys.myTradesModeKey &&
                        <DropMenu data={sourceData} label="Source"/>
                    }
                </DropMenuWrapper>
            </HeaderMenu>
        );
    }
}

export default inject(
    STORE_KEYS.INSTRUMENTS,
)(observer(HeaderMenuItems));