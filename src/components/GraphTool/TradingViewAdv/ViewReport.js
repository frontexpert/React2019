import React, { Component } from 'react';
import {
    ViewWrapper
} from './Components';


class ViewReport extends Component {
    state = {};

    render() {
        return (
            <ViewWrapper>
                <span>View recent payments in </span>
                <div>Reports</div>
            </ViewWrapper>
        );
    }
}

export default ViewReport;
