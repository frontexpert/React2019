import React, { Component } from 'react';
import {
    Wrapper, Checkbox
} from './Components';

class CheckboxButton extends Component {
    state={
        isOpenChart: false,
    };
    handleClick = () => {
        const {
            setMasterSwitchMode,
        } = this.props;
        const { isOpenChart } = this.state;
        this.setState(prevState => ({
            isOpenChart: !prevState.isOpenChart,
        }));
        setMasterSwitchMode(!isOpenChart);
    };
    render() {
        return (
            <Wrapper>
                <Checkbox
                    onClick={this.handleClick}
                    size={38}
                    active={this.state.isOpenChart}
                />
            </Wrapper>
        );
    }
}
export default CheckboxButton;