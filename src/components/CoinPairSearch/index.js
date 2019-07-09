import React from 'react';
import styled from 'styled-components';
import partial from 'lodash.partial';
import Grid from '@material-ui/core/Grid';
import OrderNowButton from './OrderNowButton';
import {compose, withProps} from 'recompose';
import InstrumentSearchWrapper from './InstrumentSearchWrapper';
import {inject, observer} from 'mobx-react';
import {STORE_KEYS} from '../../stores';
import DialogContentText from '@material-ui/core/DialogContentText';

const withInstrumentStore = compose(
    inject(STORE_KEYS.INSTRUMENTS, STORE_KEYS.MODALSTORE),
    observer,
    withProps(
        ({
            [STORE_KEYS.INSTRUMENTS]: {
                getBaseSuggestions,
                getQuoteSuggestions,
                setQuote,
                setBase,
                selectedBase,
                selectedQuote,
            },
            [STORE_KEYS.MODALSTORE]: {
                Modal,
            },
        }) => ({
            selectedBase,
            selectedQuote,
            getBaseSuggestions,
            getQuoteSuggestions,
            setQuote,
            setBase,
            Modal,
        })
    )
);

//Modal Content is temporary until supplied by design team
const ModalContent = () => (
    <React.Fragment>
        <DialogContentText>
            Some Text about Buy / Sell Market Order
        </DialogContentText>
    </React.Fragment>
);

const StyledOuterContainer = styled(Grid)`
    background: ${props => props.theme.palette.backgroundApp};
    padding-top: .85rem;
    padding-left: .5rem;
    padding-right: .5rem;
    & div:last-child{
        padding-right: .5rem;
    }
`;


const ButtonGrid = styled(Grid)`
    padding: 0rem 0rem 0rem 0rem;
`;

const Arrows = styled.span`
    color: ${props => props.theme.tradePalette.primaryBuy};
    font-size: 2rem;
    padding: 1rem;
    line-height: 0.4;
`;

const CoinPairSearchContainer = ({
    selectedBase,
    selectedQuote,
    getBaseSuggestions,
    getQuoteSuggestions,
    setQuote,
    setBase,
    Modal,
}) => {
    return (
        <StyledOuterContainer container wrap='nowrap'>
            <Grid item xs={5} sm={4}>
                <InstrumentSearchWrapper 
                    getSuggestions={getBaseSuggestions}
                    onSelect={setBase}
                    selectedItem={selectedBase}
                />
            </Grid>
            <Arrows>&#8596;</Arrows>
            <Grid item xs={5} sm={4}>
                <InstrumentSearchWrapper 
                    getSuggestions={getQuoteSuggestions}
                    onSelect={setQuote}
                    selectedItem={selectedQuote}
                />
            </Grid>
            <ButtonGrid item xs={2} sm={4}>
                <OrderNowButton
                    onClick={
                        partial(Modal, { modalTitle: 'Submit Market Order', modalConfirmText: 'Order', modalBody: <ModalContent /> })
                    }
                />
            </ButtonGrid>
        </StyledOuterContainer>
    )
};

export default withInstrumentStore(CoinPairSearchContainer);