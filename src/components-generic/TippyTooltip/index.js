import React from 'react';
import { Tooltip } from 'react-tippy';

const TippyTooltip = ({
    position, placement, distance, html, children,
}) => (
    <Tooltip
        arrow={true}
        animation="fade"
        position={position}
        placement={placement}
        distance={distance}
        theme="bct"
        className="full-width"
        html={html}
        popperOptions={{
            modifiers: {
                preventOverflow: { enabled: false },
                flip: { enabled: false },
                hide: { enabled: false },
            },
        }}
    >
        {children}
    </Tooltip>
);

export default TippyTooltip;
