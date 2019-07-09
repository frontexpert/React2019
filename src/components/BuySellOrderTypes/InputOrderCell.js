import React from 'react';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import styled, {css} from 'styled-components';
import { withStyles } from '@material-ui/core/styles';

const OrderStyles = css`
    font-size : .8rem;
    background: ${props => props.theme.tradePalette.orderBackground};
    margin-bottom: 1.2rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    outline: 1px solid ${props => props.theme.tradePalette.orderBorder};
    @media (max-height: 1250px){
        margin-bottom: .5rem;
        font-size: .5rem;
    }

    [data-section]{
        padding-top: .3rem;
        padding-bottom: .3rem;

        @media (max-height: 1300px){
            padding: 0px;
        }
    }

    [data-amt]{
        color : ${props => props.theme.tradePalette.contrastText};
        font-size : 1rem;
        @media (max-height: 1250px){
            font-size: .5rem;
        }
    }

    [data-coin]{
        color: ${props => props.theme.tradePalette.coinText};
        text-align: center;
        padding: .7rem;
    }

    [data-inputsection]{
        border-right: 1px solid ${props => props.theme.tradePalette.orderBorder};
        overflow: auto;
    }
`;

const styles = {
    input: {
        textAlign: 'right',
        paddingRight: '10px',
    },
  };

const InputOrderCell = ({className, classes, amount, coin, /* for error related styles */ userInputMistake, onChange, /* Strictly for debugging purposes */ who}) => {
    return(
        <div className={className}>
            <Input data-section data-inputsection classes={{input: classes.input}} data-testid='buysellorderinput' placeholder='0' type='number' disableUnderline data-amt value={amount} onChange={onChange}>
                {amount}
            </Input>
            <div data-section data-coin>{coin}</div>
        </div>
    )
};

const StyledInputOrderCell = styled(InputOrderCell)`${OrderStyles}`;

export default withStyles(styles)(StyledInputOrderCell);