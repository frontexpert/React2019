import React from 'react';
import styled from 'styled-components';
import { Tooltip } from 'react-tippy';

import IconList from './IconList';

const CircleIcon = styled.div`
    width: 13px;
    height: 13px;
    margin-left: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${props => props.theme.palette.walletSmallLinksToggleBg};
    border-radius: 50%;
    
    span {
        font-size: 11px;
        color: ${props => props.theme.palette.walletSmallLinksToggleText};
    }
`;

class SmallLinks extends React.Component {
    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside = event => {
        if (this.props.tooltipShow) {
            if (!this.getClosest(event.target, '.wallet-theme')) {
                this.handleClose();
            }
        }
    };

    handleClose = () => {
        this.props.toggleTooltip(-1);
    };

    getClosest = (elem, selector) => {
        for (; elem && elem !== document; elem = elem.parentNode) {
            if (elem.matches(selector)) return elem;
        }
        return null;
    };

    render() {
        const {
            links = {}, index, tooltipShow, toggleTooltip, className,
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
                <CircleIcon onMouseEnter={() => toggleTooltip(index)}>
                    <span>i</span>
                </CircleIcon>
            </Tooltip>
        );
    }
}

export default SmallLinks;
