import React from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { Tooltip } from 'react-tippy';

import { STORE_KEYS } from '../../stores';
import { OrderBookIcon } from '../SideBar/icons';
import { viewModeKeys } from '../../stores/ViewModeStore';
import { orderFormToggleKeys } from '../../stores/OrderFormToggle';
import DataLoader from '../../components-generic/DataLoader';

const ImageWrapper = styled.div`
    position: relative;
    width: 60px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-right: 1px solid ${props => props.theme.palette.clrBorder};
    
    svg {
        fill: #7f8bc2;
    }
`;

class WorldBookIconComponent extends React.Component {
    state = {
        tooltipShow: true,
    };

    openGlobalOrderBook = () => {
        const {
            hide,
            [STORE_KEYS.VIEWMODESTORE]: {
                showDepthChartMode,
                setViewMode,
                setTradingViewMode,
                isGBExistMonitor,
                setGBExistMonitor,
            },
            [STORE_KEYS.ORDERFORMTOGGLE]: { showOrderFormWith },
            [STORE_KEYS.LOWESTEXCHANGESTORE]: { setExchange },
            [STORE_KEYS.EXCHANGESSTORE]: { updateExchange },
            [STORE_KEYS.YOURACCOUNTSTORE]: { setSelectedCoin },
        } = this.props;

        setSelectedCoin('');

        if (!hide) {
            if (!isGBExistMonitor) {
                setGBExistMonitor(true);
                setTimeout(() => {
                    const { isOrderBookStop } = this.props[STORE_KEYS.ORDERBOOK];
                    if (!isOrderBookStop) {
                        setViewMode(viewModeKeys.advancedModeKey);
                        showDepthChartMode(true);
                        showOrderFormWith(orderFormToggleKeys.onToggleKey);
                        setTradingViewMode(true);
                        updateExchange(0, '');
                        setExchange('Global');

                        this.setState({
                            tooltipShow: true,
                        });
                    } else {
                        this.setState({
                            tooltipShow: false,
                        });
                        setTimeout(() => {
                            this.setState({
                                tooltipShow: true,
                            });
                        }, 5000);
                    }
                    setGBExistMonitor(false);
                }, 3000);
            }
        } else {
            setViewMode(viewModeKeys.exchangesModeKey);
            showDepthChartMode(false);
            showOrderFormWith(orderFormToggleKeys.offToggleKey);
            setTradingViewMode(false);
            updateExchange(-1, '');
            setExchange('Global');
        }
    }

    render() {
        const { isGBExistMonitor } = this.props[STORE_KEYS.VIEWMODESTORE];
        const { tooltipShow } = this.state;

        return (
            <ImageWrapper>
                {
                    !isGBExistMonitor ? (
                        <Tooltip
                            open={!tooltipShow}
                            arrow={true}
                            animation="fade"
                            position="bottom"
                            placement="bottom"
                            distance={10}
                            theme="bct"
                            title="Your Access is Restricted to Level 1"
                        >
                            <OrderBookIcon
                                onClick={() => this.openGlobalOrderBook()}
                            />
                        </Tooltip>
                    ) : (
                        <DataLoader/>
                    )
                }

            </ImageWrapper>
        );
    }
}

export default inject(
    STORE_KEYS.VIEWMODESTORE,
    STORE_KEYS.ORDERFORMTOGGLE,
    STORE_KEYS.LOWESTEXCHANGESTORE,
    STORE_KEYS.EXCHANGESSTORE,
    STORE_KEYS.ORDERBOOK,
    STORE_KEYS.YOURACCOUNTSTORE,
)(observer(WorldBookIconComponent));
