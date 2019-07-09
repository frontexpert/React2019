import React from 'react';

import Chart from './AreaChart';

class DepthChartContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isHover: false,
        };
        this.shouldUpdate = true;
    }
    componentDidMount() {
        setTimeout(() => {
            this.shouldUpdate = false;
        }, 3000);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (this.shouldUpdate || (nextProps.showDepthChart && !nextState.isHover));
    }

    onMouseEnter = () => {
        this.setState({
            isHover: true,
        });
    };

    onMouseLeave = () => {
        this.setState({
            isHover: false,
        });
    };

    render() {
        const { depthChartData, ...restProps } = this.props;

        return (
            <Chart
                buy={depthChartData.get('buys')}
                sell={depthChartData.get('sells')}
                midMarket={depthChartData.get('midMarket')}
                spreadMin={depthChartData.get('spreadMin')}
                spreadMax={depthChartData.get('spreadMax')}
                symbol={depthChartData.get('symbol')}
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
                isHover={this.state.isHover}
                {...restProps}
            />
        );
    }
}

export default DepthChartContainer;
