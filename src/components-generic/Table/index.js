import React from 'react';
import styled, {css} from 'styled-components';
import MuiTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const TableHeader = ({headers}) => {
    return (
        <TableHead>
            <TableRow style={{"height" : "0"}}>
                {
                    headers && headers.map((header, idx) => {
                        return(
                            <TableCell key={idx}>{header}</TableCell>
                        )
                    })
                }
            </TableRow>
        </TableHead>
    )
};

const StyledTableBody = styled(TableBody)`
    max-height: 100%;
    overflow-y: scroll;
`;

//accepts array or arrays right now...
const TableData = ({columnData}) => {
    return (
        <StyledTableBody>
            {
                columnData.map((row, idx) => {
                    return (
                        <TableRow key={idx} hover={true} style={{"height" : "0"}}>
                            {row.map((cell, idx) => {
                                return(
                                    <TableCell key={idx}>
                                        {cell}
                                    </TableCell>
                                )
                            })}
                        </TableRow>
                    )
                })
            }
        </StyledTableBody>
    )
};

const TableStyles = css`
`;

const Table = ({className, headers, columnData}) => {
    return (
        <MuiTable className={className}>
            <TableHeader headers={headers} />
            <TableData columnData={columnData}/>
        </MuiTable>   
    )
}

export default styled(Table)`${TableStyles}`