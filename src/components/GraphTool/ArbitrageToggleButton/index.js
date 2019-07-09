import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { compose, withProps } from 'recompose';

import { STORE_KEYS } from '../../../stores';
import { ArbitrageIcon } from '../icons';

const Wrapper = styled.div`
    position: absolute;
    right: 80px;
    top: 12px;
    z-index: 1000;
`;

const ArbitrageToggleButton = ({
    isArbitrageMode, setArbitrageMode,
}) => {
    return (
        <Wrapper>
            <ArbitrageIcon
                active={isArbitrageMode}
                onClick={() => setArbitrageMode(!isArbitrageMode)}
            />
        </Wrapper>
    );
};

export default compose(
    inject(STORE_KEYS.SETTINGSSTORE),
    observer,
    withProps(
        ({
            [STORE_KEYS.SETTINGSSTORE]: {
                isArbitrageMode,
                setArbitrageMode,
            },
        }) => {
            return ({
                isArbitrageMode,
                setArbitrageMode,
            });
        }
    )
)(ArbitrageToggleButton);
