import {inject, observer} from "mobx-react";
import {STORE_KEYS} from '../stores';
import {compose} from "recompose";

const {SNACKBARSTORE:SNACKBAR_STORE_KEY} = STORE_KEYS;
export const withSnackBar = compose(
    inject(stores => ({
        snackbar: stores[SNACKBAR_STORE_KEY],
    })),
    observer
);

