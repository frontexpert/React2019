import React from 'react';

import { Wrapper, ToggleButton } from './components';

class SidebarToggleButton extends React.Component {
    state = { isShow: true };
    toggleSidebarShow = (e) => {
        e.stopPropagation();
        const { sidebarStatus, setSidebarStatus } = this.props;
        if (sidebarStatus === 'closed') {
            setSidebarStatus('open');
        } else setSidebarStatus('closed');
        this.setState({ isShow: false });
        setTimeout(() => { this.setState({ isShow: true }); }, 1000);
    };
    render() {
        const { sidebarStatus } = this.props;
        const { isShow } = this.state;
        return (
            <Wrapper isOpen={sidebarStatus === 'open'} onClick={this.toggleSidebarShow}>
                {isShow && <ToggleButton isOpen={sidebarStatus === 'open'}/>}
            </Wrapper>
        );
    }
}
export default SidebarToggleButton;