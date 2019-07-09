import {inject, observer} from "mobx-react";
import {STORE_KEYS} from '../../stores';
import {compose} from "recompose";
const {YOURACCOUNTSTORE} = STORE_KEYS;

export const withYourAccountData = compose(
    inject(stores => ({
        portfolioData: stores[YOURACCOUNTSTORE].portfolioData,
        portfolioPieChartTitle: stores[YOURACCOUNTSTORE].portfolioPieChartTitle,
        portfolioPieChartData: stores[YOURACCOUNTSTORE].portfolioPieChartData,
    })),
    observer,
);