import React from 'react';
import styled from 'styled-components';
import LoadingGif from './mobile-loading.gif';

const Container = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #020408;
`;

const Wrapper = styled.div`
    position: relative;
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    
    svg {
        position: absolute;
        left: 0;
        top: 0;
        overflow: visible;
        z-index: 50;
        
        &:first-child {
            z-index: 100;
        }
        
        &:last-child {
            z-index: 150;
        }
        
        circle {
            transform: rotate(-90deg);
            transform-origin: center;
        }
        
        ellipse {
            transform-origin: center;
        }
    }   
    .LoadingGif {
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;
    }
`;

class ProgressRing extends React.Component {
    constructor(props) {
        super(props);

        const { radius, stroke } = this.props;

        this.state = {
            progress: 0,
        };

        this.normalizedRadius = radius - stroke * 2;
        this.circumference = this.normalizedRadius * 2 * Math.PI;
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            const { progress } = this.state;
            if (progress < 100) {
                this.setState({ progress: progress + 0.5 });
            }

            if (progress === 100) {
                clearInterval(this.interval);
                // setLoaded(true)
            }
        }, 5);
        setTimeout(() => {
            this.props.setLoaded(true);
        }, 6000);
    }

    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
        const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

        return {
            x: centerX + (radius * Math.cos(angleInRadians)),
            y: centerY + (radius * Math.sin(angleInRadians)),
        };
    };

    render() {
        const { progress } = this.state;
        const { radius, stroke } = this.props;
        const strokeDashoffset = this.circumference - progress / 100 * this.circumference;
        const angleInDegrees = progress / 100 * 360;
        const position = this.polarToCartesian(radius, radius, radius - stroke * 2, angleInDegrees);

        return (
            <Container>
                <Wrapper>
                    <img src={LoadingGif} className="LoadingGif" alt="loading"/>
                </Wrapper>
            </Container>
        );
    }
}

export default ProgressRing;
