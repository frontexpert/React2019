import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';

const StyledDaysChange = styled(Grid)`
    color: ${props => props.theme.tradePalette.primaryBuy};
    justify-content: flex-start;
    display : flex;
    align-items : center;
`;

const StyledArrowUp = styled(KeyboardArrowUp)`
    color: ${props => props.theme.tradePalette.primaryBuy};
`;

export const AmtDaysChangeHeader = () => {
    return (
        <Grid container>
            <Grid item xs={6}>
                Amount
            </Grid>
            <Grid item xs={6}>
                Day's Change
            </Grid>
        </Grid>
    )
};

export const AmtDaysChangeCell = ({amount, daysChange}) => {
    return (
        <Grid container>
            <Grid item xs={6}>
                <div>{amount}</div>
            </Grid>
            <StyledDaysChange item xs={6}>
                <StyledArrowUp />
                <div>{daysChange}%</div>
            </StyledDaysChange>
        </Grid>
    )
};