import React from 'react';
import { inject, observer } from 'mobx-react';
import { STORE_KEYS } from '../../stores'
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';

const { MODALSTORE: MODAL_STORE_KEY } = STORE_KEYS;

const StyledTextField = styled(TextField)`
    margin-top: 1rem;
`;

const ModalContent = () => (
    <React.Fragment>
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
    </React.Fragment>
)

const TempButton = inject(MODAL_STORE_KEY)(observer(
    ({ [MODAL_STORE_KEY]: modal, onClick }) => {
        return (
            <button onClick={(event) => {
                onClick(event);
                modal.Modal({ modalTitle: 'Hello Lions!', modalConfirmText: 'Go Lions!', modalBody: <ModalContent /> })
            }}>
                Modal Test
            </button>
        )
    }
));

export default TempButton;