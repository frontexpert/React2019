import React from 'react';
import styled from 'styled-components';
import { Tooltip } from 'react-tippy';

import IconList from './IconList';

const CircleIcon = styled.div`
    width: 23px;
    height: 23px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${props => props.theme.palette.walletSmallLinksToggleBg};
    border-radius: 50%;
    cursor: pointer;
    
    span {
        font-size: 16px;
        font-weight: 700;
        color: ${props => props.theme.palette.walletSmallLinksToggleText};
    }
`;

class SmallLinks extends React.Component {
    state = {
        tooltipShow: false,
    };
    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside = event => {
        if (this.state.tooltipShow) {
            if (!this.getClosest(event.target, '.wallet-theme')) {
                this.handleClose();
            }
        }
    };

    handleClose = () => {
        this.setState({
            tooltipShow: false,
        });
    };

    handleShow = () => {
        this.setState({
            tooltipShow: true,
        });
    };

    getClosest = (elem, selector) => {
        for (; elem && elem !== document; elem = elem.parentNode) {
            if (elem.matches(selector)) return elem;
        }
        return null;
    };

    render() {
        const { tooltipShow } = this.state;
        const {
            links = {}, className,
        } = this.props;

        return (
            <Tooltip
                open={tooltipShow}
                arrow={true}
                animation="fade"
                position="top"
                placement="top"
                distance={10}
                theme="wallet"
                className={className}
                html={(
                    <IconList links={links} handleClose={this.handleClose}/>
                )}
            >
                <CircleIcon onMouseEnter={() => this.handleShow()}>
                    <span>i</span>
                </CircleIcon>
            </Tooltip>
        );
    }
}

export default SmallLinks;
