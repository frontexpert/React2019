import React from 'react';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import {withSnackBar} from "../../hocs/WithSnackBar";
import {compose} from "recompose";

const StyledOrderButton = styled(Button)`
    background: ${(props) => {
    return props.isbuy === 'true' ? props.theme.tradePalette.primaryBuy : props.theme.tradePalette.primarySell
}};
    margin-top : 1.2rem;
    color : ${props => props.theme.palette.light};
    font-size: 1.2rem;
    font-weight: bold;
    height: 3rem;
    @media (max-height: 1250px){
        height: .5rem;
        font-size: .8rem;
        margin-top: .75rem;
    }
`;

const OrderButton = (({snackbar, isBuy, onClick, orderButtonText = 'PLACE ORDER', disabled}) => {
        return (
            <StyledOrderButton data-dis-type="simultaneous" fullWidth variant="contained" isbuy={isBuy.toString()}
                onClick={(event) => {
                    onClick(event);
                    snackbar.Snackbar({message: 'Order Succeeded!'});
                }} 
                disabled={disabled}
            >
                {orderButtonText}
            </StyledOrderButton>
        )
    }
);

export default compose(
    withSnackBar,
)(OrderButton);