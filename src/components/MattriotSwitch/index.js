import React from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';

import { STORE_KEYS } from '../../stores';
import { viewModeKeys } from '../../stores/ViewModeStore';

const MattriotSwitchWrapper = styled.div.attrs({ className: 'btn-mattriot-switch' })`
    width: 60px;
    height: 100%;
    padding: ${props => props.isLoggedIn ? '10px' : '14px'};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: ${props => props.theme.palette.leftTopHeaderBg};
    border-right: 1px solid ${props => props.theme.palette.clrBorder};
    border-radius: ${props => props.theme.palette.cornerRadius} 0 0 0;
    cursor: pointer;
    
    // &:hover {
    //    opacity: 0.8;
    // }
`;

const SwitchItem = styled.div.attrs({ className: 'mt-switch-item' })`
    width: ${props => props.isActive ? '100%' : 'calc(100% - 3px)'};
    height: 4px;
    border-radius: 3px;
    background: ${props => props.isActive ? props.theme.palette.clrPurple : props.theme.palette.clrMouseClick};
    margin-left: auto;
    margin-right: auto;
`;

class MattriotSwitch extends React.Component {
    componentDidMount() {}

    render() {
        const {
            [STORE_KEYS.TELEGRAMSTORE]: telegramStore,
            [STORE_KEYS.ORDERBOOK]: orderBookStore,
            [STORE_KEYS.VIEWMODESTORE]: viewModeStore,
        } = this.props;

        const {
            isLoggedIn,
        } = telegramStore;

        const {
            isOrderBookStop,
        } = orderBookStore;

        const {
            viewMode,
            progressState,
        } = viewModeStore;

        return (
            <MattriotSwitchWrapper
                isLoggedIn={isLoggedIn}
                onClick={() => {
                    if (viewMode === viewModeKeys.basicModeKey && !isLoggedIn) {
                        progressState();
                    } else if (viewMode === viewModeKeys.publicChatModeKey && isOrderBookStop) {
                        progressState();
                    }
                    progressState();
                }}
            >
                <SwitchItem isActive={viewMode === viewModeKeys.basicModeKey}/>
                {isLoggedIn && <SwitchItem isActive={viewMode === viewModeKeys.friendModeKey}/>}
                <SwitchItem isActive={viewMode === viewModeKeys.publicChatModeKey}/>
                {!isOrderBookStop && <SwitchItem isActive={viewMode === viewModeKeys.advancedModeKey}/>}
            </MattriotSwitchWrapper>
        );
    }
}

export default inject(
    STORE_KEYS.TELEGRAMSTORE,
    STORE_KEYS.VIEWMODESTORE,
    STORE_KEYS.ORDERBOOK
)(observer(MattriotSwitch));
