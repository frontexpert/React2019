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
    border: none;
    border-radius: 3px;
    // background: ${props => props.disable ? 'transparent' : props.theme.palette.clrBlue};
    background: transparent;
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
            display: flex;
        }
        .left-arrow, .right-arrow {
            display: block;
        }
    }

    div.close {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 40px;
        left: calc(50% - 20px);
        top: calc(50% - 20px);
        border-radius: 50%;
        background: transparent;
        padding: 8px;

        svg {
            width: 17px;
            height: 20px;
            fill: #FFF;
        }
    }
`;

const LeftArrowSvg = styled.svg.attrs({ className: 'left-arrow' })`
    width: 16px;
    height: 18px;
    position: absolute;
    top: calc(50% - 8px);
    left: 17px;
    display: none;

    &, & * {
        fill: white !important;
    }
`;

const LeftArrow = props => (
    <LeftArrowSvg
        viewBox="0 0 970.477 970.477"
        {...props}
    >
        <path d="M842.849,970.477c26.601,0,53.5-8.8,75.7-27c51.4-41.9,59.101-117.4,17.2-168.8l-234.6-288l237-290.9
            c41.899-51.399,34.1-127-17.2-168.8c-51.4-41.899-127-34.1-168.8,17.2l-298.8,366.7c-36,44.1-36,107.399,0,151.6l296.4,363.9
            C773.45,955.377,808.049,970.477,842.849,970.477z"
        />
        <path d="M328.85,926.276c23.7,29.101,58.301,44.2,93.101,44.2c26.6,0,53.5-8.8,75.7-27c51.399-41.9,59.1-117.4,17.199-168.8
            l-234.599-288l237-290.9c41.9-51.399,34.1-127-17.2-168.8c-51.399-41.899-127-34.1-168.799,17.2l-298.9,366.7
            c-36,44.1-36,107.5,0,151.6L328.85,926.276z"
        />
        {/* <path
            className="st0"
            d="M7.5,8.9L0.3,1.7c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l5.8,5.8l5.8-5.8c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4L7.5,8.9z"
        /> */}
    </LeftArrowSvg>
);

const RightArrowSvg = styled.svg.attrs({ className: 'right-arrow' })`
    width: 16px;
    height: 18px;
    transform: rotateZ(180deg);
    position: absolute;
    top: calc(50% - 8px);
    right: 17px;
    display: none;

    &, & * {
        fill: white !important;
    }
`;

const RightArrow = props => (
    <RightArrowSvg
        viewBox="0 0 970.477 970.477"
        {...props}
    >
        <path d="M842.849,970.477c26.601,0,53.5-8.8,75.7-27c51.4-41.9,59.101-117.4,17.2-168.8l-234.6-288l237-290.9
            c41.899-51.399,34.1-127-17.2-168.8c-51.4-41.899-127-34.1-168.8,17.2l-298.8,366.7c-36,44.1-36,107.399,0,151.6l296.4,363.9
            C773.45,955.377,808.049,970.477,842.849,970.477z"
        />
        <path d="M328.85,926.276c23.7,29.101,58.301,44.2,93.101,44.2c26.6,0,53.5-8.8,75.7-27c51.399-41.9,59.1-117.4,17.199-168.8
            l-234.599-288l237-290.9c41.9-51.399,34.1-127-17.2-168.8c-51.399-41.899-127-34.1-168.799,17.2l-298.9,366.7
            c-36,44.1-36,107.5,0,151.6L328.85,926.276z"
        />
    </RightArrowSvg>
);


class GradientButtonTimer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            countdown: 0,
            isPaused: props.isPaused,
        };

        const maxTimer = props.maxTimer > 0 ? props.maxTimer : 4;

        this.timer = setInterval(() => {
            if (this.state.isPaused) return;
            let countdown = this.state.countdown + 1;
            if (countdown > maxTimer) {
                this.submitOrder();
            } else {
                this.setState({
                    countdown,
                });
                this.props.setDownTimerCount(countdown);
            }
        }, 1000);
    }

    componentWillReceiveProps(nextProps) {
        nextProps.setMaxDownTimerCount(nextProps.maxTimer);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    submitOrder = () => {
        this.setState({
            countdown: 0,
        });

        if (!this.props.disabled) {
            this.props.onSubmitOrder();
            clearInterval(this.timer);
        }
    }

    pauseAndPlay = (e) => {
        const {
            onPauseOrder,
            onResumeOrder,
        } = this.props;
        if (this.state.isPaused) {
            onResumeOrder();
            this.setState({
                isPaused: false,
            });
        } else {
            onPauseOrder();
            this.setState({
                isPaused: true,
            });
        }
        e.stopPropagation();
    }

    cancel = (e) => {
        const {
            onCancelOrder,
        } = this.props;
        this.setState({
            countdown: 0,
        });
        clearInterval(this.timer);
        onCancelOrder();
        e.stopPropagation();
    }

    fastForward = (e) => {
        const {
            onResumeOrder,
        } = this.props;
        if (this.state.isPaused) {
            onResumeOrder();
            this.setState({
                isPaused: false,
            });
        }
        this.submitOrder();
        e.stopPropagation();
    }

    render() {
        const {
            isArbitrageMode,
            disabled,
            maxTimer,
        } = this.props;
        return (
            <GradientButtonStyleWrapper
                onClick={() => {
                    this.submitOrder();
                }}
                disable={disabled}
                isArbitrageMode={isArbitrageMode}
            >
                <CircularProgressbar
                    strokeWidth={10}
                    value={this.state.countdown}
                    maxValue={maxTimer}
                    text={`${maxTimer - this.state.countdown}s`}
                    background={true}
                    styles={buildStyles({
                        textSize: '34px',
                        textColor: '#fff',
                        pathColor: 'rgba(255, 255, 255, .5)',
                        trailColor: 'rgba(255, 255, 255, .15)',
                        backgroundColor: '#2780ff',
                    })}
                />
                <div
                    className="close"
                    onClick={this.pauseAndPlay}
                >
                    {this.state.isPaused ?
                        (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="white" d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path></svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path fill="white" d="M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z"></path>
                            </svg>
                        )
                    }
                    {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 120" x="0px" y="0px">
                        <g><path d="M87.66,19.66,59.31,48,87.66,76.34A8,8,0,0,1,76.34,87.66L48,59.31,19.66,87.66A8,8,0,0,1,8.34,76.34L36.69,48,8.34,19.66A8,8,0,0,1,19.66,8.34L48,36.69,76.34,8.34A8,8,0,0,1,87.66,19.66Z"/></g>
                    </svg> */}
                </div>
                <LeftArrow
                    onClick={this.cancel}
                >
                </LeftArrow>
                <RightArrow
                    onClick={this.fastForward}
                >
                </RightArrow>
            </GradientButtonStyleWrapper>
        );
    }
}

export default GradientButtonTimer;
