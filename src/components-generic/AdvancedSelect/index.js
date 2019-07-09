import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react';
import { FormattedMessage } from 'react-intl';
import { compose, withProps } from 'recompose';
import { STORE_KEYS } from "../../stores";
import { viewModeKeys } from "../../stores/ViewModeStore"
import { MenuDropdown, MenuDropdownItem, MenuDropdownLabel } from "../MenuDropdown"

const Header = styled.div`
    position: absolute;
    z-index: 99;
    
    .portfolio-drop{
        position: absolute;
        top: 8px;
        left: 20px;
        width: auto;
        height: 30px;
        background: transparent;
        z-index: 1000;
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
        
        @media (min-height:900px) {
            left: 20px;
        }
    }
    
    .c-block-head__title{
        font-size: 14px;
		margin: 0;
		color: ${props => props.theme.palette.clrtext};
		font-weight: 700;

		span{
			font-size: 14px;
		}

		&.btn{
			cursor: pointer;
		}
    }
`;

class AdvancedSelect extends Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false,
        }
    }

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
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
    }

    handleSelect = (pos, handleSelectChange) => () => {
        handleSelectChange(pos);
        this.setState({
            open: false,
        });
        if ((pos === 1) && (this.props.viewMode === viewModeKeys.basicModeKey)) {
            this.props.setViewMode(viewModeKeys.advancedModeKey);
        } else if ((pos !== 1) && (this.props.viewMode === viewModeKeys.advancedModeKey)) {
            this.props.setViewMode(viewModeKeys.basicModeKey);
        }
    }

    isSelected = (pos, selectIndex) => pos === selectIndex

    render() {
        const { children, handleSelectChange, selectIndex, options } = this.props;
        const { open } = this.state;

        return (
            <Fragment>
                <Header>
                    <div className="portfolio-drop" ref={this.setWrapperRef}
                         onMouseEnter={() => this.toggleMenu(false)} onMouseLeave={() => this.toggleMenu(true)}>
                        <MenuDropdownLabel className="c-block-head__title">
                            {options[selectIndex]}
                        </MenuDropdownLabel>
                        <div className="arrow-drop-2" />

                        <MenuDropdown open={open}>
                            <ul className="menu-dropdown">
                                <MenuDropdownItem onClick={this.handleSelect(0, handleSelectChange)}>
                                    <li className={this.isSelected(0, selectIndex) ? "menu-dropdown__item first active" : "menu-dropdown__item first"}>
                                        <button className="menu-dropdown__btn">
                                            <FormattedMessage
                                                id="advanced_select.btn_wallet"
                                                defaultMessage="Wallet"
                                            />
                                        </button>
                                    </li>
                                </MenuDropdownItem>
                                {/*<MenuDropdownItem onClick={this.handleSelect(1, handleSelectChange)}>*/}
                                    {/*<li className={this.isSelected(1, selectIndex) ? "menu-dropdown__item active" : "menu-dropdown__item"}>*/}
                                        {/*<button className="menu-dropdown__btn">Portfolio</button>*/}
                                    {/*</li>*/}
                                {/*</MenuDropdownItem>*/}
                                {/*<MenuDropdownItem onClick={this.handleSelect(2, handleSelectChange)}>*/}
                                    {/*<li className={this.isSelected(2, selectIndex) ? "menu-dropdown__item active" : "menu-dropdown__item"}>*/}
                                        {/*<button className="menu-dropdown__btn">History</button>*/}
                                    {/*</li>*/}
                                {/*</MenuDropdownItem>*/}
                                <MenuDropdownItem onClick={this.handleSelect(1, handleSelectChange)}>
                                    <li className={this.isSelected(1, selectIndex) ? "menu-dropdown__item last active" : "menu-dropdown__item last"}>
                                        <button className="menu-dropdown__btn">
                                            <FormattedMessage
                                                id="advanced_select.btn_advanced"
                                                defaultMessage="Advanced"
                                            /></button>
                                    </li>
                                </MenuDropdownItem>
                            </ul>
                        </MenuDropdown>
                    </div>
                </Header>
                {children[selectIndex]}
            </Fragment>
        );
    }
}

export default compose(
    inject(STORE_KEYS.VIEWMODESTORE),
    observer,
    withProps(
        ({
            [STORE_KEYS.VIEWMODESTORE]: {
                setViewMode,
                viewMode,
            },
        }) => {
            return ({
                setViewMode,
                viewMode,
            })
        }
    )
)(AdvancedSelect);
