import React from 'react';
import Grid from '@material-ui/core/Grid';
import StyledInputOrderCell from './InputOrderCell';
import styled from 'styled-components';

const StyledRowHeader = styled(Grid)`
    text-align: center;
    font-size : 1rem;
    color : ${props => props.theme.tradePalette.contrastText};
    display: flex;
    align-items: center;
    justify-content: center;
    @media (max-height: 1250px){
        font-size: .7rem;
    }
`;

export const Row = ({header, amount, coin, onChange, userInputMistake}) => {
    return(
        <Grid container style={{"display": "flex", "alignItems" : "baseline"}}>
            <StyledRowHeader item xs={3}>
                <div style={{"paddingRight" : "4px"}}>{header}</div>
            </StyledRowHeader>
            {/* boxes */}
            <Grid item xs={9}>
                <StyledInputOrderCell amount={amount} coin={coin} onChange={onChange} who={header} userInputMistake={userInputMistake}/>
            </Grid>
        </Grid>
    )
};

export default Row;