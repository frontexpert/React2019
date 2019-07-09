import React from 'react';
import styled from 'styled-components';

import imgMenuIcon from './ellipsis-h-solid.svg';

const StyleWrapper = styled.div`
    position: relative;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: visible;
    
    .toggle-button {
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        width: 40px;
        height: 40px;
        background: transparent;
        cursor: pointer;
        
        &, &:hover, &:active {
            outline: none;
        }
        
        &__image {
            * {
                fill: ${props => props.theme.palette.clrtext} !important;
            }
            width: 100%;
        }
    }
`;

class DropMenu extends React.Component {
    state = {
        isOpen: false,
    };

    toggleMenu = (e) => {
        e.preventDefault();

        this.setState(prevState => ({
            isOpen: !prevState.isOpen,
        }));
    };

    render () {
        const { isOpen } = this.state;

        return (
            <StyleWrapper>
                <button className="toggle-button" onClick={this.toggleMenu}>
                    <svg className="toggle-button__image" aria-hidden="true" data-prefix="fas" data-icon="ellipsis-h"
                         role="img" xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 512 512"
                    >
                        <path fill="currentColor"
                              d="M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z"/>
                    </svg>
                </button>
                <div className="toggle-menu">

                </div>
            </StyleWrapper>
        );
    }
}

export default DropMenu;