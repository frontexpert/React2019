import React, { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    background: ${props => props.theme.palette.clrMainWindow};
    width: 100%;
    height: 100%;
    border-radius: ${props => props.theme.palette.borderRadius};
    color: ${props => props.theme.palette.welcomePageText};
    position: relative;
    border: 1px solid ${props => props.theme.palette.welcomePageBorder};

    & > div {
        width: 100%;
        height: 100%;

        iframe {
            width: 100%;
            height: 100%;
        }
    }
`;

class DemoWelcome extends Component {
    componentDidMount() {
    }

    render() {

        return (
            <Wrapper id="graph-chart"/>
        );
    }
}

export default DemoWelcome;
