import React from 'react';
import ReactDOM from 'react-dom';
import Modal from '../../components-generic/Modal';
import { inject, observer } from 'mobx-react';
import { STORE_KEYS } from '../../stores';

const ModalPortal = inject(STORE_KEYS.MODALSTORE)(observer(
    ({ [STORE_KEYS.MODALSTORE]: { ModalProps, open, onClose, onConfirm } }) => {
        return (
            <React.Fragment>
            {   Object.keys(ModalProps).length > 0 &&
                ReactDOM.createPortal(
                    <Modal
                        {...ModalProps}
                        open={open}
                        onClose={onClose}
                        onConfirm={onConfirm}
                    />,
                    document.getElementById('modal'),
                )
            }
            </React.Fragment>
        )
    }
));

export default ModalPortal;