import React from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';

import { STORE_KEYS } from '../../stores';
import { formatCoinString, getItemColor } from '../../utils';
import PercentBar from './PercentBar';
import ExchangePlansTable from './ExchangePlansTableRV';

const ExecutionPlanViewStyleWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    width: ${props => props.width}px;
    height: 100%;
    overflow: hidden;
`;

const ExecutionPlanView = ({
    width,
    [STORE_KEYS.LOWESTEXCHANGESTORE]: lowestExchangeStore,
}) => {
    const { Plan } = lowestExchangeStore;

    let data = [];

    if (Plan && Plan.length) {
        for (let i = 0; i < Plan.length; i++) {
            data.push({
                exchange: Plan[i].Exchange || '',
                exchangeColor: getItemColor(Plan[i].Exchange || '').hexColor,
                splitAbs: formatCoinString((Plan[i].Amount) || '0', 2),
                splitRel: Plan[i].Percentage || 0,
                avgPrice: Plan[i].Price || 0,
                relMore: '-',
                absMore: '-',
                base: (Plan[i].Bid || '').toUpperCase(),
                quote: (Plan[i].Ask || '').toUpperCase(),
            });
        }
    }

    return (
        <ExecutionPlanViewStyleWrapper className="execution-plan-view" id="graph-chart" width={width}>
            <PercentBar data={data}/>
            <ExchangePlansTable data={data}/>
        </ExecutionPlanViewStyleWrapper>
    );
};
export default inject(
    STORE_KEYS.LOWESTEXCHANGESTORE
)(observer(ExecutionPlanView));
