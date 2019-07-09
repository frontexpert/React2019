import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import styled, { css } from 'styled-components';
import partial from 'lodash.partial';

const BuySellButtonsStyles = css`
    padding: 1.7rem 1rem 1rem 1rem;

    [data-buttonone]{
        padding: 0rem .2rem 0rem .4rem;
    }

    [data-buttontwo]{
        padding: 0rem .4rem 0rem .2rem;
    }

    [data-sell]{
        background: ${props => props.theme.tradePalette.primarySell};
        color: ${props => props.theme.palette.light};
        font-size: 1.2rem;
        font-weight: bold;
        height : 3rem;
    }

    [data-buy]{
        background: ${props => props.theme.tradePalette.primaryBuy};
        color: ${props => props.theme.palette.light};
        font-size: 1.2rem;
        font-weight: bold;
        height : 3rem;
    }

    [data-inactive]{
        background: ${props => props.theme.tradePalette.orderBackground};
        color: ${props => props.theme.tradePalette.inactiveText};
        font-size: 1.2rem;
        font-weight: bold;
        height : 3rem;
    }
`;

const inactiveProps = { 'data-inactive':true };

const isInactiveProps = (isActive) => {
    if (!isActive) return inactiveProps;
};


const BuySellButtons = ({
    className, buyText, sellText, buyActive, sellActive, toggleActive,
}) => {
    return (
        <Grid container className={className}>
            <Grid item xs={6} data-buttonone >
                <Button fullWidth variant="contained" data-buy {...isInactiveProps(buyActive)} onClick={partial(toggleActive, true)}>
                    {buyText}
                </Button>
            </Grid>
            <Grid item xs={6} data-buttontwo >
                <Button fullWidth variant="contained" data-sell {...isInactiveProps(sellActive)} onClick={partial(toggleActive, false)}>
                    {sellText}
                </Button>
            </Grid>
        </Grid>
    );
};

export default styled(BuySellButtons)`${BuySellButtonsStyles}`;
