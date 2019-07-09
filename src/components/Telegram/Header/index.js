import React from 'react';
import styled from 'styled-components';

import Search from './Search';
import Room from './Room';
import SettingsMenu from './SettingsMenu';
import DomainTitle from './DomainTitle';

const Wrapper = styled.div.attrs({ className: 'search-header-wrapper' })`
    height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: ${props => props.theme.palette.leftTopHeaderBg};
    border-radius: ${props => props.theme.palette.cornerRadius} ${props => props.theme.palette.cornerRadius} 0 0;
    border: ${props => props.hasBorder ? `1px solid ${props.theme.palette.clrBorder}` : 'none'};
    border-bottom: 0;
    overflow: hidden;
`;

const Header = ({
    type,
    members,
    online,
    toggleDrawer,
    viewMode,
    onSearch,
    value,
    status,
    channelType,
    sidebar,
    isJoinable,
    joinChannelWith,
    className,
    isSearchOff,
    hasBorder,
}) => (
    <Wrapper type={type} viewMode={viewMode} className={className} hasBorder={hasBorder}>
        {type === 'search' && (
            <Search
                toggleDrawer={toggleDrawer}
                onSearch={onSearch}
                value={value}
                sidebar={sidebar}
                isSearchOff={isSearchOff}
            />
        )}
        {type === 'default' && (
            <Room
                members={members}
                online={online}
                toggleDrawer={toggleDrawer}
                viewMode={viewMode}
                onSearch={onSearch}
                status={status}
                channelType={channelType}
                isJoinable={isJoinable}
                joinChannelWith={joinChannelWith}
            />
        )}
        {type === 'settingsMenu' && (
            <SettingsMenu toggleDrawer={toggleDrawer} />
        )}
        {type === 'empty' && null}
        {type === 'domain' && (
            <DomainTitle sidebar={sidebar} />
        )}
    </Wrapper>
);

export default Header;
