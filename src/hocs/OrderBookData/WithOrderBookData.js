import {inject, observer} from "mobx-react";
import {STORE_KEYS} from '../../stores';
import {compose} from "recompose";

const {ORDERBOOK} = STORE_KEYS;

export const withOrderBookData = compose(
    inject(stores => ({
        orderBookStore: stores[ORDERBOOK],
    })),
    observer,
);