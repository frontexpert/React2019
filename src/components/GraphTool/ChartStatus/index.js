import React, { Component } from 'react';
import styled from 'styled-components';
import { compose, withProps } from 'recompose';
import { inject, observer } from 'mobx-react';

import { donutChartModeStateKeys } from '../../../stores/LowestExchangeStore';
import { STORE_KEYS } from '../../../stores';
import { STATE_KEYS } from '../../../stores/ConvertStore';
import { ChartIcon, DonutIcon, TradingViewIcon } from '../../SideBar/icons';

const ChartStatusWrapper = styled.div.attrs({ id: 'donut-portfolio-toggle' })`
    position: absolute;
    right: 45px;
    bottom: 65px;
    z-index: 1000;
    width: 40px;
    height: 40px;
    background: ${props => props.theme.palette.clrMainWindow};
`;

const ChartStatusItem = styled.div.attrs({ className: 'chart-status__item' })`
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${props => props.active ? props.theme.palette.sidebarIconOpenedBg : props.theme.palette.clrMouseHover};
    cursor: ${props => props.isClickable ? 'pointer' : 'auto'};
    
    &:hover {
        &:after {
            border-color: transparent transparent ${props => props.theme.palette.clrHighContrast} transparent !important;
        }
        
        ${props => props.isClickable ? `
            .top-bar__icon {
                fill: ${props.theme.palette.clrHighContrast};
            }
        ` : ''};
    }
    
    .top-bar__icon {
        fill: ${props => (props.current || props.active) ? props.theme.palette.sidebarIconActive : props.theme.palette.sidebarIcon};
    }
`;

class ChartStatus extends Component {
    render() {
        const {
            isLoggedIn, switchMode, changeSwitchMode,
        } = this.props;

        let isPortfolio = isLoggedIn && switchMode;
        let isDonutChart = !isPortfolio;

        return (
            <ChartStatusWrapper innerRef={ref => this.wrapperRef = ref}>
                <ChartStatusItem
                    current
                    onClick={() => changeSwitchMode(!switchMode)}
                    isClickable={true}
                >
                    {isPortfolio && <DonutIcon />}
                    {isDonutChart && <ChartIcon />}
                </ChartStatusItem>
            </ChartStatusWrapper>
        );
    }
}

export default compose(
    inject(
        STORE_KEYS.TELEGRAMSTORE,
    ),
    observer,
    withProps(
        ({
            [STORE_KEYS.TELEGRAMSTORE]: {
                isLoggedIn,
            },
        }) => ({
            isLoggedIn,
        })
    )
)(ChartStatus);
