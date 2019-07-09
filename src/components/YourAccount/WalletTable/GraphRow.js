/* eslint-disable react/no-unused-state */
import React from 'react';
import styled from 'styled-components';
import { AutoSizer } from 'react-virtualized';

const GraphRowWrapper = styled.div.attrs({ className: 'graph-row-wrapper' })`
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 100%;
    
    // &:hover {
    //     .change-in-percent {
    //         display: block !important;
    //     }
    //    
    //     //.graph-row-image {
    //     //    margin-left: 40px !important;
    //     //}
    // }
    
    .change-in-percent {
        display: none;
        position: absolute;
        top: -11px;
        width: 100%;
        text-align: center;
        
        &.positive {
            color: ${props => props.theme.palette.clrGreen};
        }

        &.negative {
            color: ${props => props.theme.palette.clrRed};
        }
    }
    
    .graph-row-image {
        transition: .2s;
    }
`;

const GraphImage = styled.div.attrs({ className: 'graph-row-image' })`
    // filter: grayscale(1) brightness(4);
    background-image: url('/charts/mini-charts.png') !important;
    // opacity: ${props => !props.disabled ? '1' : '0.4 !important'};
    // transform-origin: left center;
    // transform: scale(${props => props.width / 276});
    
    margin-left: auto;
    margin-right: auto;
    
    &.clr-green {
        filter: brightness(0) saturate(100%) invert(58%) invert(46%) sepia(99%) saturate(588%) hue-rotate(111deg) brightness(89%) contrast(99%);
    }
    
    &.clr-darkRed {
        filter: none !important;
    }
`;

class GraphRow extends React.Component {
    state = {
        showAltData: false,
    };

    handleMouseEnter = () => {
        this.setState({
            showAltData: true,
        });
    };

    handleMouseLeave = () => {
        this.setState({
            showAltData: false,
        });
    };

    render() {
        const { showAltData } = this.state;
        const { data } = this.props;

        const disabled = data.Position <= 0.01;
        const deltaPrice = Number.parseFloat(data.Price) - Number.parseFloat(data.Change);
        const changeInPercent = deltaPrice !== 0 ? (Number.parseFloat(data.Price) / deltaPrice - 1) * 100 : 0;
        const changeInPercentSign = changeInPercent >= 0 ? '+' : changeInPercent < 0 ? '-' : '';
        const className = data.Coin.toLowerCase().replace('*', '_').replace(':', '_');
        const percentClassName = `change-in-percent ${(changeInPercent >= 0 ? ' positive' : ' negative')}`;
        const chartClassName = ` coin-graph-${className}`;
        const isLoggedIn = localStorage.getItem('authToken');

        return (
            <GraphRowWrapper isLoggedIn={isLoggedIn}>
                <GraphImage
                    className={'smallCurrencyChart' + chartClassName}
                    disabled={disabled}
                    onMouseEnter={this.handleMouseEnter}
                    onMouseLeave={this.handleMouseLeave}
                />
                <span className={percentClassName}>
                    {changeInPercentSign + Math.abs(changeInPercent.toFixed(2))}%
                </span>
            </GraphRowWrapper>
        );
    }
}

export default GraphRow;