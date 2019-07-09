import React from 'react';
import styled from 'styled-components';

import TabHeader from '../../TabHeader';
import TabSubHeader from '../../TabSubHeader';
import TableHeader from '../../TableHeader';
import ReportTable from '../../Table';

import { gbxUtilizationColumns, gbxUtilizationDropdowns } from '../../constants';

const Wrapper = styled.div`
    width: 100%;
    text-align: center;
    background-color: #fff;
`;

class GbxUtilizationHistory extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isExchBarOpen: false,
        };
    }

    render() {
        return (
            <Wrapper>
                <TabHeader tab="gbxUtilizationHistory"/>
                <TabSubHeader
                    dropdowns={gbxUtilizationDropdowns}
                    tab="gbxUtilizationHistory"
                />
                <TableHeader/>
                <ReportTable columns={gbxUtilizationColumns}/>
                <TableHeader/>
            </Wrapper>
        );
    }
}

export default GbxUtilizationHistory;
