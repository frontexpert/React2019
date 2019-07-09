import React, { Component } from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

const MenuDropdown = styled.div`
    .menu-dropdown {
        font-size: 12px;
        padding: 0;
        margin: 0;
        list-style: none;
        position: absolute;
        left: 0;
        top: 36px;
        background: ${props => props.theme.palette.clrblock};
        transition: all 0.2s;
        transform: translate(-50%, 0);
        opacity: ${props => props.open ? 1 : 0};
        visibility: ${props => props.open ? 'visible' : 'hidden'};
        border-radius: 5px;
        min-width: 80px;
        z-index: 10;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.45);
        overflow: hidden;
            
        .menu-dropdown__item {
            position: relative;
            display: block;
            width: 100%;
            height: 30px;
            border-top: 1px solid ${props => props.theme.palette.clrseparator};
            background: #141824;
            overflow: hidden;
    
            &.active {
                .menu-dropdown__btn {
                    color: ${props => props.theme.palette.coinPairTitleActiveColor};
                    background: ${props => props.theme.palette.coinPairDropDownItemActiveBg};
                }
            }
    
            &.first {
                border: none;
                border-radius: 3px 3px 0 0;
            }

            &.last {
                border-radius: 0 0 3px 3px;
            }

            &.separated {
                border-top: 2px solid ${props => props.theme.palette.clraccent};
            }
        }
    
        .menu-dropdown__btn {
            position: relative;
            display: flex;
            width: 100%;
            height: 100%;
            border: none;
            background: transparent;
            cursor: pointer;
            color: ${props => props.theme.palette.clrtextL};
            font-size: 12px;
            width: 100%;
            line-height: 1.18;
            cursor: pointer;
            transition: all .1s ;
            padding: 5px 10px;
            align-items: center;
            white-space: nowrap;
            font-weight: 700;
    
            &:hover {
                color: ${props => props.theme.palette.coinPairTitleActiveColor};
            }
        }
    }
`;

const MenuDropdownItem = styled.span`
`;

const TypeDropWrapper = styled.div`
    .basic-table__drop__label {
        color: ${props => props.theme.palette.clrtext};
    }
`;

class TypeDrop extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            label: 'All',
        };
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    setWrapperRef = (node) => {
        this.wrapperRef = node;
    };

    handleClickOutside = (event) => {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.setState({
                open: false,
            });
        }
    };

    toggleMenu = (open) => {
        this.setState({
            open: !open,
        });
    };

    handleSelect = (label) => {
        this.setState({
            open: false,
            label,
        });
    };

    render() {
        const { open, label } = this.state;

        return (
            <TypeDropWrapper>
                <div className="basic-table__drop" onClick={() => this.toggleMenu(open)} ref={this.setWrapperRef}>
                    <span className="basic-table__drop__label">{label}</span>

                    <svg className="sprite-icon arrow-drop-2" role="img" aria-hidden="true">
                        <use
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            xlinkHref="img/sprite-basic.svg#arrow-drop-2"
                        >
                        </use>
                    </svg>

                    <MenuDropdown open={open}>
                        <ul className="menu-dropdown">
                            <MenuDropdownItem onClick={() => this.handleSelect('All')}>
                                <li className={'menu-dropdown__item ' + (label === 'All' ? 'active' : '')}>
                                    <button className="menu-dropdown__btn">
                                        <FormattedMessage
                                            id="order_history.label_all"
                                            defaultMessage="All"
                                        />
                                    </button>
                                </li>
                            </MenuDropdownItem>
                            <MenuDropdownItem onClick={() => this.handleSelect('Open')}>
                                <li className={'menu-dropdown__item ' + (label === 'Open' ? 'active' : '')}>
                                    <button className="menu-dropdown__btn">
                                        <FormattedMessage
                                            id="order_history.label_open"
                                            defaultMessage="Open"
                                        />
                                    </button>
                                </li>
                            </MenuDropdownItem>
                        </ul>
                    </MenuDropdown>
                </div>
            </TypeDropWrapper>
        );
    }
}

export default TypeDrop;
