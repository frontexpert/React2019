import React from 'react';
import styled from 'styled-components/macro';
import { AutoSizer } from 'react-virtualized';
import { inject, observer } from 'mobx-react';

// import SideBar from '../components/SideBar';
import SideBar from '../components/SideBar/NewSideBar';
import { STORE_KEYS } from '../stores';

const StyledSideBarGrid = styled.div`
    grid-area: sidebar;
    margin-top: ${props => props.theme.palette.sidebarGap};
    margin-bottom: ${props => props.theme.palette.sidebarGap};
    background: ${props => props.theme.palette.clrBackground};
    border-right: 1px solid ${props => props.theme.palette.clrMouseClick};
`;

class SideBarGrid extends React.Component {
    state = {};

    render() {
        const { [STORE_KEYS.VIEWMODESTORE]: viewModeStore } = this.props;

        const {
            isSidebarOpen,
            toggleSidebarOpen,
        } = viewModeStore;

        return (
            <StyledSideBarGrid>
                {/* onMouseEnter={() => toggleSidebarOpen(true)} */}
                {/* onMouseLeave={() => toggleSidebarOpen(false)} */}
                <AutoSizer>
                    {
                        ({ height, width }) => {
                            return (
                                <SideBar height={height} width={width} isHover={isSidebarOpen}/>
                            );
                        }
                    }
                </AutoSizer>
            </StyledSideBarGrid>
        );
    }
}

export default inject(
    STORE_KEYS.VIEWMODESTORE
)(observer(SideBarGrid));
