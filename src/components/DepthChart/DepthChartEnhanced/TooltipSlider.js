import React from 'react';
import styled, { css } from 'styled-components';

import { format7DigitString } from '../../../utils';

const Container = styled.div`
    transform: translate(0, ${props => props.y}px);
    cursor: grab;
    position: absolute;
    background: transparant;
    right: 0;
    display: none;

    ${({ isDragging }) => isDragging && css`
        cursor: grabbing;
    `};

    div.tooltip.second {
        font-family: 'open_sans', sans-serif;  
        -webkit-transition: none !important;
        -moz-transition: none !important;
        -o-transition: none !important;
        transition: none !important;

        opacity: 1;
        padding: 8px 12px;
        font-size: 16px !important;
        font-weight: 700;
        border-radius: 3px;
        line-height: 20px;
        background: ${props => props.theme.palette.clrback};
        border: 2px solid #FFF;
        box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.25);
        border-radius: 25px;
        
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        right: 12px;
        width: max-content;
        min-width: 201px;
        height: 50px;
        margin-top: -25px;
        z-index: 100;
                
        & > div {
            display: flex;
            align-items: center;
            justify-content: center;

            img {
                width: 16px;
                height: 16px;
                margin-left: 5px;
            }
        }
        span.value {
            color: ${props => props.theme.palette.clrtexttooltip};
        }
        .textCenter {
            text-align: center;
        }
        
        &.blackColor {
            color: ${props => props.theme.palette.clrtextD};
        }
    }
`;

export default class _TooltipSlider extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isDragging: false,
            originalY: 0,
            translateY: 0,
            lastTranslateY: 0,
        };

        this.tooltipLimit = this.props.tooltipLimit;
    }

    componentWillReceiveProps(nextProps) {
        // theme comes through here to react to dark/light toggle
        const { top, height, tooltipLimit } = nextProps;
        const { isDragging } = this.state;

        this.tooltipLimit = tooltipLimit;
        let translateY = top - height;
        if (translateY < -this.tooltipLimit) translateY = -this.tooltipLimit;

        if (!isDragging) {
            this.setState({
                translateY,
                originalY: 0,
                lastTranslateY: translateY,
            });
        }
    }

    componentWillUnmount() {
        window.removeEventListener('mousemove', this.handleMouseMove);
        window.removeEventListener('mouseup', this.handleMouseUp);
    }

    handleMouseDown = ({ clientY }) => {
        window.addEventListener('mousemove', this.handleMouseMove);
        window.addEventListener('mouseup', this.handleMouseUp);

        if (this.props.onDragStart) {
            this.props.onDragStart();
        }

        this.setState({
            originalY: clientY,
            isDragging: true,
        });
    };

    handleMouseMove = ({ clientY }) => {
        const { isDragging } = this.state;
        const { onDrag, height, tooltipLowLimit } = this.props;

        if (!isDragging) {
            return;
        }
        this.setState(prevState => {
            let translateY = clientY - prevState.originalY + prevState.lastTranslateY;
            if (translateY > -tooltipLowLimit) {
                translateY = -tooltipLowLimit;
            } else if (translateY < -this.tooltipLimit) {
                translateY = -this.tooltipLimit;
            } else if (translateY < -height) {
                translateY = -height;
            }

            return ({
                translateY,
            });
        }, () => {
            if (onDrag) {
                onDrag(this.state.translateY);
            }
        });
    };

    handleMouseUp = () => {
        window.removeEventListener('mousemove', this.handleMouseMove);
        window.removeEventListener('mouseup', this.handleMouseUp);

        this.setState({
            originalY: 0,
            lastTranslateY: this.state.translateY,

            isDragging: false,
        }, () => {
            if (this.props.onDragEnd) {
                this.props.onDragEnd(this.state.translateY);
            }
        });
    };

    render() {
        const {
            baseCur, value, width, colorMode, lineLeft, isArbitrageSigns,
        } = this.props;

        const { translateY, isDragging } = this.state;
        const tooltipClass = isArbitrageSigns ? 'normal' : '';
        // let sliderY = isArbitrageSigns && translateY > -20 ? -20 : translateY;
        let sliderY = translateY > -50 ? -50 : translateY;

        if (Number.isNaN(sliderY)) sliderY = -50;

        return (
            <Container
                onMouseDown={this.handleMouseDown}
                y={sliderY}
                isDragging={isDragging}
                width={width}
                colorMode={colorMode}
                lineLeft={lineLeft < 0 ? width : width - lineLeft}
            >
                <div className={'tooltip second ' + tooltipClass}>
                    <div className="textCenter">
                        <span className="value">{format7DigitString(value)} {baseCur}</span>
                    </div>
                </div>
            </Container>
        );
    }
}
