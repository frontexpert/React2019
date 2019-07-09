import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import styled from 'styled-components';

const StyledSnackbar = styled(Snackbar)`
    color: ${props => props.theme.palette.contrastText};
    background: ${props => props.theme.palette.backgroundHighContrast};
`;

const SimpleSnackbar = ({
    open,
    message,
    onClose,
    ...props
}) => {

    return (
        <StyledSnackbar
            {...props}
            key={new Date().toString()}
            open={open}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            autoHideDuration={4000}
            onClose={onClose}
            message={<span>{message}</span>}
            action={[
                <IconButton key={new Date().toString()} color="inherit" onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ]}
        />
    )
};

export default SimpleSnackbar;