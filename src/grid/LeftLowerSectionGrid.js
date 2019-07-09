import React from 'react';
import { inject, observer } from 'mobx-react';
import { FormattedMessage } from 'react-intl';
import { compose } from 'recompose';
import styled from 'styled-components/macro';
import { AutoSizer } from 'react-virtualized';
import { STORE_KEYS } from '../stores';
import MarketOrderEntryForm from '../components/OrderEntry/MarketOrder';
import LimitOrderEntryForm from '../components/OrderEntry/LimitOrder';
import StopOrderEntryForm from '../components/OrderEntry/StopOrder';
import ApiKeyModal from '../components/Modals/ApiKeyModal';
import ApiModal from '../components/Modals/ApiModal';
import OrderTabs from '../components/OrderTabs';

const showApiModal = (Modal, portal) => () => Modal({
    portal,
    additionalVerticalSpace: true,
    ModalComponentFn: () => <ApiModal/>,
});

const showApiKeyModal = (Modal, portal, exchange) => () => Modal({
    portal,
    additionalVerticalSpace: true,
    ModalComponentFn: () => <ApiKeyModal exchange={exchange}/>,
});

const StyledLeftLowerSectionGrid = styled.div`
    grid-area: leftlowersection;
    border-radius: 4px 4px 0 0;
`;

const OrderWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    height: ${props => props.height}px;
    width: ${props => props.width}px;
    max-width: ${props => props.width}px;
    border-radius: ${props => props.theme.palette.borderRadius};
    background: ${props => props.theme.palette.orderFormBg};
    border: 1px solid ${props => props.theme.palette.orderFormBorder};
    overflow: hidden;
`;

const BuySellOrderWrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: stretch;
    height: ${props => props.height}px;
    width: ${props => props.width}px;
    
    & > * {
      width: 50%;
    }
`;

const LeftLowerSectionGrid = ({
    [STORE_KEYS.EXCHANGESSTORE]: {
        selectedExchange,
    },
    [STORE_KEYS.MODALSTORE]: {
        Modal,
    },
    [STORE_KEYS.ORDERENTRY]: {
        LimitOrderFormBuy: {
            amount: buyAmount,
        },
        LimitOrderFormSell: {
            amount: sellAmount,
        },
    },
    [STORE_KEYS.VIEWMODESTORE]: {
        setUserDropDownOpen,
        setSettingsExchangeViewMode,
    },
    [STORE_KEYS.MARKETMAKER]: {
        requestMarketTrading,
    },
}) => {
    // if (selectedExchange && selectedExchange.name !== 'Global') {
    //     showModal = showApiKeyModal(Modal, 'graph-chart-parent', selectedExchange.name);
    // } else {
    //     showModal = showApiModal(Modal, 'graph-chart-parent');
    // }

    // TODO refactoring: move to a separate method
    const showModal = (side) => ()=> {
        const amount = side === 'buy' ? buyAmount : sellAmount;
        requestMarketTrading({ side, amount });
        setUserDropDownOpen(true);
        setSettingsExchangeViewMode(true);
    };

    return (
        <StyledLeftLowerSectionGrid id="left-lower-section">
            <AutoSizer>
                {({ width, height }) => {
                    /* subtract out material tab height */
                    const wrapperHeight = height - 38;
                    const list = [
                        [
                            <FormattedMessage
                                id="grid.good_till_canceled"
                                defaultMessage="Good Till Canceled"
                            />,
                            <FormattedMessage
                                id="grid.good_till_date"
                                defaultMessage="Good Till Date"
                            />,
                            <FormattedMessage
                                id="grid.fill_or_kill"
                                defaultMessage="Fill or Kill"
                            />,
                            <FormattedMessage
                                id="grid.immediate_or_cancel"
                                defaultMessage="Immediate or Cancel"
                            />,
                            <FormattedMessage
                                id="grid.day_valid_till_utc"
                                defaultMessage="Day (Valid till 00:00 UTC)"
                            />
                        ],
                        [
                            <FormattedMessage
                                id="grid.label_market"
                                defaultMessage="Market"
                            />,
                            <FormattedMessage
                                id="grid.label_limit"
                                defaultMessage="Limit"
                            />,
                            <FormattedMessage
                                id="grid.label_stop"
                                defaultMessage="Stop"
                            />,
                            <FormattedMessage
                                id="grid.label_stop_limit"
                                defaultMessage="Stop Limit"
                            />
                        ]
                    ];

                    return (
                        <OrderWrapper height={height} width={width} id="order-wrapper">
                            <OrderTabs tabs={list}>
                                <BuySellOrderWrapper id="buy-sell-wrapper-market" height={wrapperHeight} width={width}>
                                    <MarketOrderEntryForm showModal={showModal}/>
                                </BuySellOrderWrapper>

                                <BuySellOrderWrapper id="buy-sell-wrapper-limit" height={wrapperHeight} width={width}>
                                    <LimitOrderEntryForm showModal={showModal}/>
                                </BuySellOrderWrapper>

                                <BuySellOrderWrapper id="buy-sell-wrapper-stop" height={height} width={width}>
                                    <StopOrderEntryForm showModal={showModal}/>
                                </BuySellOrderWrapper>

                                <BuySellOrderWrapper id="buy-sell-wrapper-limit" height={wrapperHeight} width={width}>
                                    <StopOrderEntryForm showModal={showModal}/>
                                </BuySellOrderWrapper>
                            </OrderTabs>
                        </OrderWrapper>
                    );
                }}
            </AutoSizer>
        </StyledLeftLowerSectionGrid>
    );
};

export default compose(
    inject(
        STORE_KEYS.EXCHANGESSTORE,
        STORE_KEYS.MODALSTORE,
        STORE_KEYS.VIEWMODESTORE,
        STORE_KEYS.MARKETMAKER,
        [STORE_KEYS.ORDERENTRY],
    ),
    observer,
)(LeftLowerSectionGrid);
