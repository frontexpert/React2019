import React from 'react';
import SkinnyButton from 'ComponentsGeneric/SkinnyButton';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {withStateHandlers} from 'recompose';
import partial from 'lodash.partial';
import styled from 'styled-components';

const StyledDialogTitle = styled(DialogTitle)`
    background: ${props => props.theme.palette.primary};
    padding: 18px 24px 18px 24px;
    color: ${props => props.theme.palette.contrastText} !important;
    > h2 {
        color: white;
    }
`;

const StyledDialogContent = styled(DialogContent)`
    
`;

const withAlertDialogState = withStateHandlers(
    () => ({open:false}),
    {
        toggleShow: () => (open) => ({ open }),
    }
);

const Modal = ({ buttonText, modalTitle, modalConfirmText, toggleShow, open}) => {
    return (
        <div>
            <SkinnyButton buttonText={buttonText} onClick={partial(toggleShow, true)}>Deposit</SkinnyButton>
            <Dialog
                open={open}
                onClose={partial(toggleShow, false)}
            >
                <StyledDialogTitle>
                    {modalTitle}
                </StyledDialogTitle>
                <StyledDialogContent>
                    <DialogContentText>
                        Deposit/Withdraw Component Here
                    </DialogContentText>
                </StyledDialogContent>
                <DialogActions>
                    <Button onClick={partial(toggleShow, false)} color="default">
                        Cancel
                    </Button>
                    <Button onClick={partial(toggleShow, false)} color="default" autoFocus>
                        {modalConfirmText}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default withAlertDialogState(Modal);