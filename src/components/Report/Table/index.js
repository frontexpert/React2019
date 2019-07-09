import React from 'react';
import styled from 'styled-components';

const Table = styled.table`
    width: 100%;
    border-top: 1px solid #dedede;
    border-bottom: 1px solid #dedede;
    padding-bottom: 25px;
`;

const TableCell = styled.td`
    font-size: 11px;
    color: #a8a8a8;
`;

class ReportTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isExchBarOpen: false,
        };
    }

    render() {
        const { columns } = this.props;

        return (
            <Table>
                <thead>
                    <tr>
                        {
                            columns.map(column => <TableCell>{column}</TableCell>)
                        }
                    </tr>
                </thead>
            </Table>
        );
    }
}

export default ReportTable;
