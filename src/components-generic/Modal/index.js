import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
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

const Modal = ({
    open,
    onClose,
    onConfirm,
    modalTitle, modalConfirmText, modalBody,
    toggleShow,
    ...props
}) => {
    return (
        <Dialog
            {...props}
            open={open}
            onClose={onClose}
        >
            <StyledDialogTitle id="alert-dialog-title">
                {modalTitle}
            </StyledDialogTitle>
            <StyledDialogContent>
                {modalBody}
            </StyledDialogContent>
            <DialogActions>
                <Button onClick={onConfirm} color="default">
                    Cancel
                </Button>
                <Button onClick={onClose} color="default" autoFocus>
                    {modalConfirmText}
                </Button>
            </DialogActions>
        </Dialog>
    )
};

export default Modal;