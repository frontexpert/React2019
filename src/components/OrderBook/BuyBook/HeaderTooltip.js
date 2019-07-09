import React from 'react';
import styled from 'styled-components';
import { Tooltip } from 'react-tippy';

const HeaderTooltip = styled(Tooltip).attrs({ className: 'order-buy-header' })`
    text-align: right;
    .tooltip-text-wrapper {
        span {
            font-size: 16px;
        }
    }
`;

const BuyHeaderTooltip = ({
    children,
    tooltipText,
}) => (
    <HeaderTooltip
        arrow={true}
        animation="fade"
        position="top"
        placement="top"
        distance={10}
        theme="bct"
        className="full-width"
        html={(
            <div className="tooltip-text-wrapper advanced-tooltip text-left">
                <span>{tooltipText}</span>
            </div>
        )}
        popperOptions={
            {
                modifiers: {
                    preventOverflow: {
                        enabled: false,
                    },
                    flip: {
                        enabled: false,
                    },
                    hide: {
                        enabled: false,
                    },
                },
            }
        }
    >
        {children}
    </HeaderTooltip>
);

export default BuyHeaderTooltip;
