import React, { Component, Fragment } from 'react';
import styled, { keyframes } from 'styled-components';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const GradientButtonStyleWrapper = styled.button.attrs({ className: 'gradient-button' })`
    position: relative;
    display: flex;
    overflow: hidden;
    padding: 0;
    width: ${props => props.width ? (props.width + 'px') : '100%'};
    height: ${props => props.height ? (props.height + 'px') : '100%'};
    border: 1px ${props => props.theme.palette.clrBorder} solid;
    border-radius: 3px;
    background: ${props => props.disable ? 'transparent' : props.theme.palette.clrBlue};
    outline: none !important;
    cursor: pointer;

    svg.CircularProgressbar  {
        height: 90%;
    }

    svg.CircularProgressbar text {
        display: ${props => props.isArbitrageMode ? 'none' : ''};
    }

    &:hover {
        svg.CircularProgressbar text {
            display: none;
        }
        div.close {
            display: block;
        }
    }

    div.close {
        position: absolute;
        display: ${props => props.isArbitrageMode ? 'block' : 'none'};
        width: 40px;
        height: 40px;
        left: calc(50% - 20px);
        top: calc(50% - 20px);
        border-radius: 50%;
        background: transparent;
        padding: 6px;

        svg {
            fill: #FFF;
        }
    }
`;

class GradientButtonTimer extends Component {
    constructor(props) {
        super(props);


        this.state = {
            countdown: 0,
        };
        this.timer = setInterval(() => {
            let countdown = this.state.countdown + 1;
            if (countdown > props.maxTimer) {
                this.setState({
                    countdown: 0,
                });

                if (!this.props.disabled) {
                    this.props.onSubmitOrder();
                    clearInterval(this.timer);
                }
            } else {
                this.setState({
                    countdown,
                });
            }
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        const {
            onCancelOrder,
            isArbitrageMode,
            disabled,
            maxTimer,
        } = this.props;
        return (
            <GradientButtonStyleWrapper
                onClick={() => {
                    this.setState({
                        countdown: 0,
                    });
                    clearInterval(this.timer);
                    onCancelOrder();
                }}
                disable={disabled}
                isArbitrageMode={isArbitrageMode}
            >
                <CircularProgressbar
                    strokeWidth={10}
                    value={isArbitrageMode ? maxTimer : this.state.countdown}
                    maxValue={maxTimer}
                    text={`${isArbitrageMode ? '' : (maxTimer - this.state.countdown)}s`}
                    styles={buildStyles({
                        textSize: '34px',
                        textColor: '#fff',
                        pathColor: 'rgba(255, 255, 255, .5)',
                        trailColor: 'rgba(255, 255, 255, .15)',
                    })}
                />
                <div className="close">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 120" x="0px" y="0px">
                        <g><path d="M87.66,19.66,59.31,48,87.66,76.34A8,8,0,0,1,76.34,87.66L48,59.31,19.66,87.66A8,8,0,0,1,8.34,76.34L36.69,48,8.34,19.66A8,8,0,0,1,19.66,8.34L48,36.69,76.34,8.34A8,8,0,0,1,87.66,19.66Z"/></g>
                    </svg>
                </div>
            </GradientButtonStyleWrapper>
        );
    }
}

export default GradientButtonTimer;
