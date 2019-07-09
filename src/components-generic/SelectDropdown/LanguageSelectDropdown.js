import React from 'react';

import { DropdownWrapper, SelectedItemLabel } from './Components';
import LanguageDropdown from '../LanguageDropdown';
import icon from './icon_drop.png';

class LanguageSelectDropdown extends React.Component {
    state = {
        isOpen: false,
    };

    wrapperRef = null;

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside = (event) => {
        if (this.state.isOpen && this.wrapperRef && this.wrapperRef.contains && !this.wrapperRef.contains(event.target)) {
            this.setState({
                isOpen: false,
            });
        }
    };

    toggleDropDown = isOpen => {
        this.setState(prevState => ({
            isOpen: (typeof isOpen === 'boolean') ? isOpen : !prevState.isOpen,
        }));
    };

    render() {
        const { isOpen } = this.state;
        const {
            width, height, value, items, onClick, isFullScreen, onChange,
        } = this.props;

        return (
            <DropdownWrapper
                width={width}
                innerRef={ref => this.wrapperRef = ref}
                isOpen={isOpen}
                className={isOpen ? '' : 'close'}
            >
                <SelectedItemLabel
                    onClick={() => {
                        this.toggleDropDown();

                        if (onClick) {
                            onClick();
                        }
                    }}
                >
                    <span>{value}</span>
                    <img src={icon} alt=""/>
                </SelectedItemLabel>

                {isOpen && (
                    <LanguageDropdown
                        alignLeft
                        alignRight
                        alignTop
                        h={height}
                        value={value}
                        items={items}
                        isFullScreen={isFullScreen}
                        toggleDropDown={this.toggleDropDown}
                        onChange={onChange}
                    />
                )}
            </DropdownWrapper>
        );
    }
}

export default LanguageSelectDropdown;
