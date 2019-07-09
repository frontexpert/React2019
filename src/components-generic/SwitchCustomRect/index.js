import React from 'react';
import styled from 'styled-components';

const width = 70;
const height = 32.5;
const iconWidth = 33;
const iconHeight = 30;

const SwitchStyleWrapper = styled.div.attrs({ className: 'switch-custom-component' })`
    position: relative;
    width: ${width}px;
    height: ${height}px;
    cursor: pointer;
    
    .back {
        position: relative;
        border: 2px solid ${props => props.theme.palette.clrBorder};
        border-radius: 2px;
        width: ${width}px;
        height: ${height}px;
        background: ${props => props.theme.palette.clrMainWindow};
    }
    
    .icon {
        position: absolute;
        top: -1px;
        left: ${(height - iconWidth) / 2 - 1}px;
        margin: 0;
        border: none;
        border-radius: 2px;
        padding: 0;
        width: ${iconWidth}px;
        height: ${iconHeight}px;
        background: ${props => props.theme.palette.clrBorderHover};
        transition: .3s;
        box-shadow: 0 0 2px 0 #000;
    }
    
    .toggleOn {
        position: absolute;
        color: ${props => props.theme.palette.clrHighContrast};
        font-size: 18px;
        top: 4px;
        right: 15px;
        left: auto;
        font-weight: 700;
    }
    
    &.open {
        .back {
            background: ${props => props.theme.palette.clrBorderHover};
            border: 2px solid ${props => props.theme.palette.clrBorderHover};
        }
        
        .icon {
            left: ${width - (height - iconWidth) / 2 - iconWidth - 2}px;
            background: ${props => props.theme.palette.clrHighContrast};
        }
    
        .toggleOn {
            position: absolute;
            left: 15px;
            right: auto;
        }
    }
    
    &:hover {
        .back {
            filter: brightness(1.2);
        }
    }
`;

class SwitchCustomRect extends React.Component {
    state = {};

    render() {
        const {
            checked,
            onChange,
            readOnly,
            ...props
        } = this.props;
        return (
            <SwitchStyleWrapper
                className={checked ? ' open' : ''}
                onClick={() => {
                    if (!readOnly && (typeof onChange === 'function')) {
                        onChange(!checked);
                    }
                }}
                {...props}
            >
                <div className="back">
                    <div className="icon"/>
                </div>
            </SwitchStyleWrapper>
        );
    }
}

export default SwitchCustomRect;
