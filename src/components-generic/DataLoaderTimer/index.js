import React, { Component, Fragment } from 'react';
import styled, { keyframes } from 'styled-components';
import DataLoader from '../DataLoader';

class DataLoaderTimer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isTimeOut: false,
        };

        setTimeout(() => {
            this.setState({
                isTimeOut: true,
            });
        }, 20000);
    }

    render() {
        const { width, height } = this.props;
        const { isTimeOut } = this.state;

        return !isTimeOut ? (
            <DataLoader width={width} height={height}/>
        ) : <Fragment/>;
    }
}

export default DataLoaderTimer;
