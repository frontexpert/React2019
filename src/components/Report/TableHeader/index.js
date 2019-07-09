import React from 'react';
import styled from 'styled-components';

import DropMenu from '../DropMenu';

import { rowsPerPageList } from '../constants';

const Wrapper = styled.div`
    display: flex;
    position: relative;
    padding: 5px 10px 5px 0;
    justify-content: space-between;
    align-items: center;
`;

const Description = styled.div`
    font-size: 12px;
`;

class TableHeader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isExchBarOpen: false,
        };
    }

    render() {
        return (
            <Wrapper>
                <DropMenu
                    data={rowsPerPageList}
                />
                <Description>0 - 25 of 0</Description>
            </Wrapper>
        );
    }
}

export default TableHeader;
