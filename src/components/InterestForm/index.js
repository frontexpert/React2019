import React from 'react';
import SkinnyButton from 'ComponentsGeneric/SkinnyButton';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
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
    padding-top: 1.5rem;
`;

const StyledTextField = styled(TextField)`
    margin-top: 1rem;
`;

const InterestFormModal = ({
    open,
    modalTitle, modalConfirmText,
    toggleShow,
    ...props 
}) => {
    return (
        <Dialog
            {...props}
            open={open}
            onClose={partial(toggleShow, false)}
        >
            <StyledDialogTitle>
                {modalTitle}
            </StyledDialogTitle>
            <StyledDialogContent>
                <DialogContentText>
                Interested in receiving your own Blockchain Terminal ? 
                Fill in your Email and we will reach out directly. 
                </DialogContentText>
                <StyledTextField
                    required
                    id="required"
                    label="E-mail"
                    placeholder={'Enter Your Email'}
                    autoFocus
                />
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
    );
};

export default withAlertDialogState(InterestFormModal);