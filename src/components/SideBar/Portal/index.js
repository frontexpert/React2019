import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

// import Settings from '../Settings';
// import Settings from '../SettingsPayment';
import Settings from '../SettingsPop';

const DrawerZone = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    /* crazy number because other parts z indexes should be standardized */
    z-index: 9998;
`;

const InnerWrapper = styled.div`
    height: 100%;
    width: auto;
    display: flex;
`;

const SettingsDrawer = styled.div`
    // height: calc(100% - 30px);
    height: 100%;
    // transform: ${props => props.settingsOpened ? 'translate(0, 15px)' : 'translate(-400px, 15px)'};
    transform: ${props => props.settingsOpened ? 'translate(0, 0)' : 'translate(-400px, 0)'};
    // box-shadow: ${props => props.settingsOpened ? '5px 0 7px 0 rgba(0, 0, 0, 0.4)' : 'none'};
    transition: 200ms cubic-bezier(.4,0,.2,1) 0ms;
    display: flex;
`;

const handleClick = onClick => ({ target: { dataset } }) => {
    if (dataset && dataset.zone === 'settings-wrapper') {
        onClick();
    }
};

const Portal = ({ opened, onClick }) => (
    opened ? ReactDOM.createPortal(
        <DrawerZone data-zone="settings-wrapper" onClick={handleClick(onClick)}>
            <InnerWrapper data-zone="settings-wrapper">
                <SettingsDrawer settingsOpened={opened}>
                    <Settings onClick={onClick}/>
                </SettingsDrawer>
            </InnerWrapper>
        </DrawerZone>,
        document.getElementById('modal'),
    ) : null
);

export default Portal;
