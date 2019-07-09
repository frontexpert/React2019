import React from 'react';
import styled from 'styled-components';

import TabHeader from '../../TabHeader';
import TabSubHeader from '../../TabSubHeader';
import { navReportDropdowns } from '../../constants';

const Wrapper = styled.div`
    width: 100%;
    text-align: center;
    background-color: #fff;
`;

class NavReport extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isExchBarOpen: false,
        };
    }

    render() {
        return (
            <Wrapper>
                <TabHeader tab="navReport"/>
                <TabSubHeader
                    dropdowns={navReportDropdowns}
                    tab="navReport"
                />
            </Wrapper>
        );
    }
}

export default NavReport;
