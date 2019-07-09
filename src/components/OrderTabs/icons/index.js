import React from 'react';
import styled from 'styled-components';

const LargeIcon = styled.svg`
    width: 27px;
    height: 27px;
`;

export const MarketIcon = props => (
    <LargeIcon
        className="tabs-header__icon"
        viewBox="0 0 27.29 27.29"
        role="img"
        aria-hidden="true"
        {...props}
    >
        <path d="M0,0H2.27V25h25v2.29H0Z"/>
        <path
            d="M7.94,5.6,21.63,19.29l4-4,.56.55c.31.31.63.62.93.94a.42.42,0,0,1,.12.28c0,1.85,0,3.71,0,5.56a.89.89,0,0,1,0,.15H4.54v-.3c0-4.29,0-8.58,0-12.87a1,1,0,0,1,.32-.79c1-.94,1.93-1.91,2.88-2.87A2.57,2.57,0,0,0,7.94,5.6Z"
        />
        <path d="M13.06,7.46l2.87-2.87,5.62,5.63L25.7,6.07c.19.22.33.42.49.59l1,1a.42.42,0,0,1,.12.28c0,1.85,0,3.71,0,5.56a.83.83,0,0,1,0,.13l-1.53-1.56-4,4.05Z"/>
    </LargeIcon>
);

export const MarketHistoryIcon = props => (
    <LargeIcon
        className="tabs-header__icon"
        viewBox="0 0 27.27 27.22"
        role="img"
        aria-hidden="true"
        {...props}
    >
        <path d="M0,18a5.66,5.66,0,0,1,.55-.8c1.1-1.12,2.22-2.23,3.33-3.34l.17-.16,1.61,1.62L3.9,17h.33c1.42,0,2.85,0,4.27,0a5.12,5.12,0,0,1,.74,10.18H0V25H1.52c2.34,0,4.69,0,7,0a2.83,2.83,0,0,0,2.75-3.47A2.87,2.87,0,0,0,8.41,19.3c-1.42,0-2.85,0-4.27,0l-.28,0,1.77,1.75L4,22.69a2,2,0,0,0-.16-.2C2.79,21.42,1.72,20.37.67,19.3A9.56,9.56,0,0,1,0,18.43Z"/>
        <path d="M27.27,25H15.94V22.72h9V2.27H9.11V14.73H6.84V0H27.27Z"/>
        <path d="M11.38,6.78V4.53H22.73V6.78Z"/>
        <path d="M22.73,11.33H11.38V9.08H22.73Z"/>
        <path d="M22.73,13.64v2.23H13.66V13.64Z"/>
        <path d="M15.94,18.18h6.79v2.25H15.94Z"/>
    </LargeIcon>
);