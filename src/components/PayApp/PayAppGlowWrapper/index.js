import React, { Component } from 'react';
import styled from 'styled-components';
import { AutoSizer } from 'react-virtualized';

import { StyleWrapper } from '../Components';

const Wrapper = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    pointer-events: none;
`;

const InnerWrapper = styled.div`
    position: relative;
    width: ${props => props.size}px;
    height: ${props => props.size}px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    box-shadow: inset 0 0 150px ${props => props.theme.palette.mobile2CircleMainBg}, 0 0 150px ${props => props.theme.palette.mobile2CircleMainBg};
`;

const GlowCircle = styled.div`
    width: ${props => props.size}px;
    height: ${props => props.size}px;
    border: 2px solid ${props => props.theme.palette.clrHighContrast};
    border-radius: 50%;
    box-shadow: inset 0 0 30px ${props => props.theme.palette.mobile2CircleGlowColor}, 0 0 50px ${props => props.theme.palette.mobile2CircleGlowColor};
`;

class PayAppGlowWrapper extends Component {
    state = {};

    componentDidMount() {}

    render() {
        return (
            <Wrapper>
                <AutoSizer>
                    {({ width, height }) => {
                        const size = Math.min(width, height);

                        return (
                            <StyleWrapper width={width} height={height}>
                                <InnerWrapper size={size}>
                                    <GlowCircle size={size * 0.8} />
                                </InnerWrapper>
                            </StyleWrapper>
                        );
                    }}
                </AutoSizer>
            </Wrapper>
        );
    }
}

export default PayAppGlowWrapper;
