import React, { Component } from 'react';
import styled from 'styled-components';

const TooltipWrapper = styled.div`
    position: absolute;
    left: 0;
    top: ${props => props.top}px;
    width: 100%;
    display: ${props => props.show ? 'flex' : 'none'};
    align-items: center;
    justify-content: center;
    transition: all 3s;
    z-index: 1;
`;

const DetailTooltip = styled.div`
    background: rgb(24, 32, 45);
    border: 1px solid #111;
    border-radius: 5px;
    padding: 10px;
    font-size: 12px;
    z-index: 999;
    color: #9ba6b2;
    
    span {
        font-weight: 600 !important;
        font-size: 13px;
    }
 
    .arrow-up {
        width: 0; 
        height: 0; 
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 8px solid #111;
        
        position: absolute;
        top: -7px;
        left: calc(50% - ${props => props.left}px);
        z-index: 1000;
    }
 
    .arrow-up-2 {
        width: 0; 
        height: 0; 
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-bottom: 6px solid #191e2e;
        
        position: absolute;
        top: -5px;
        left: calc(50% - ${props => (props.left - 2)}px);
        z-index: 1000;
    }
`;

class Tooltip extends Component {
    componentDidMount() {

    }

    render() {
        const {
            visible, content, top, left,
        } = this.props;

        return(
            <TooltipWrapper show={visible} top={top}>
                <DetailTooltip left={left}>
                    Streaming from <span>"{content}"</span>
                    <div className="arrow-up"/>
                    <div className="arrow-up-2"/>
                </DetailTooltip>
            </TooltipWrapper>
        );
    }
}

export default Tooltip;
