import {inject, observer} from "mobx-react";
import {STORE_KEYS} from '../../stores';
import {compose} from "recompose";
const {ORDERHISTORY} = STORE_KEYS;

export const withOrderHistoryData = compose(
    inject(stores => ({
        orderHistoryData: stores[ORDERHISTORY].orderHistoryData,
    })),
    observer,
);