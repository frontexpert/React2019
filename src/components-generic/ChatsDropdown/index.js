import React, { Component } from 'react';
import styled from 'styled-components';

const MenuDropdown = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    
    .menu-dropdown {
        position: absolute;
        font-size: 12px;
        padding: 0;
        margin: 0;
        list-style: none;
        right: 0;
        top: 100%;
        background: ${props => props.theme.palette.clrblock};
        transition: all 0.2s;
        opacity: ${props => props.open ? 1 : 0};
        visibility: ${props => props.open ? 'visible' : 'hidden'};
        border-radius: 5px;
        min-width: 80px;
        z-index: 10;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.45);
        
        &.open {
            opacity: 1;
            visibility: visible;
            transform: translate(-50%, 0);
    
            &.to-right {
                transform: translate(0, 0);
            }
    
            &.to-top {
                transform: translate(-50%, 0);
            }
    
            &.to-top-right {
                transform: translate(-85%, 0);
            }
        }
    
        &.to-right {
            left: auto;
            right: 0;
            transform: translate(0, 30px);
    
            &:before {
                left: auto;
                right: 30px;
                transform: translateX(0);
            }
    
            &:after {
                left: auto;
                right: 31px;
                transform: translateX(0);
            }
        }
    
        &.to-top {
            top: auto;
            bottom: calc(100% + 10px);
            transform: translate(-50%, -30px);
    
            &:before {
                top: auto;
                bottom: -11px;
                border-width: 11px 8px 0 8px;
                border-color: ${props => props.theme.palette.clrseparatorD} transparent transparent transparent;
            }
    
            &:after {
                top: auto;
                bottom: -10px;
                border-width: 11px 7px 0 7px;
                border-color: ${props => props.theme.palette.clrblock} transparent transparent transparent;
            }
        }
    
        &.to-top-right {
            top: auto;
            bottom: calc(100% + 10px);
            transform: translate(-85%, -30px);
    
            &:before {
                top: auto;
                left: auto;
                right: 13px;
                bottom: -11px;
                border-width: 11px 8px 0 8px;
                border-color: ${props => props.theme.palette.clrseparatorD} transparent transparent transparent;
                transform: translate(0);
            }
    
            &:after {
                top: auto;
                left: auto;
                right: 12px;
                bottom: -10px;
                border-width: 11px 7px 0 7px;
                border-color: ${props => props.theme.palette.clrblock} transparent transparent transparent;
                transform: translate(0);
            }
        }
    
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
                    color: ${props => props.theme.palette.clraccent};
                    background: ${props => props.theme.palette.clrback};
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
            font-size: 15px;
            width: 100%;
            line-height: 1.18;
            cursor: pointer;
            transition: all .1s ;
            padding: 5px 15px 5px 15px;
            align-items: center;
            white-space: nowrap;
            font-weight: 700;
    
            &:hover {
                color: ${props => props.theme.palette.clraccent};
            }
        }
    }
`;

const MenuDropdownItem = styled.span`
`;

const MenuDropdownLabel = styled.div`
    position: absolute;
    bottom: 0px;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    
    svg {
        * {
            fill: ${props => props.theme.palette.clrtext} !important;
        }
        width: 100%;
    }
`;


const Header = styled.div`
    position: absolute;
    width: 40px;
    height: 40px;
    
    .chat-settings-drop{
        position: absolute;
        top: 0;
        right: 0;
        width: 20px;
        height: 40px;
        background: transparent;
        cursor: pointer;
        border-radius: ${props => props.theme.palette.borderRadius};
        display: flex;
        align-items: center;
        justify-content: center;
    
        .arrow-drop-2 {
            width: 12px;
            height: 12px;
            fill: ${props => props.theme.palette.clrtext};
            margin-left: 5px;
            margin-top: 2px;
            background: url('/img/sprite-basic-view.svg#arrow-drop-2');
            background-size: 100% 100%;
        }
    }
`;

class AdvancedSelect extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
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

    handleSelect = (pos, handleSelectChange) => () => {
        handleSelectChange(pos);
        this.setState({
            open: false,
        });
    };

    isSelected = (pos, selectIndex) => pos === selectIndex;

    render() {
        const { handleSelectChange, selectIndex, options } = this.props;
        const { open } = this.state;

        return (
            <Header>
                <div className="chat-settings-drop" ref={this.setWrapperRef} onClick={() => { this.toggleMenu(open); }}>
                    <MenuDropdownLabel>
                        <svg
                            className="toggle-button__image"
                            aria-hidden="true"
                            data-prefix="fas"
                            data-icon="ellipsis-h"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                        >
                            <path
                                fill="currentColor"
                                d="M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z"
                            />
                        </svg>
                    </MenuDropdownLabel>

                    <MenuDropdown open={open}>
                        <ul className="menu-dropdown">
                            <MenuDropdownItem onClick={this.handleSelect(0, handleSelectChange)}>
                                <li className={this.isSelected(0, selectIndex) ? 'menu-dropdown__item active' : 'menu-dropdown__item'}>
                                    <button className="menu-dropdown__btn">Leave</button>
                                </li>
                            </MenuDropdownItem>
                        </ul>
                    </MenuDropdown>
                </div>
            </Header>
        );
    }
}

export default AdvancedSelect;
