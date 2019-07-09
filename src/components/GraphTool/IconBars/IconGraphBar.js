/* eslint react/no-danger: 0 */
import React from 'react';

import GraphTop from '../Styles/graphtop';
import GraphInfo from '../Styles/graphinfo';
import PeriodSelect from './PeriodSelect';
import { formatCoinString } from '../../../utils';

const IconGraphBar = ({ baseSymbol, quoteSymbol, themeType, ratioBaseQuote }) => {
    return (
        <GraphTop.Graphtop themeType={themeType}>
            <GraphTop.Left>
                <GraphInfo.Graphinfo>
                    <GraphInfo.Item>
                        <GraphInfo.Title>
                            1&nbsp;<span>{baseSymbol}</span>{` ≈ ${formatCoinString(ratioBaseQuote, 4)} `}<span>{quoteSymbol}</span>
                        </GraphInfo.Title>
                    </GraphInfo.Item>
                    <GraphInfo.Item>
                        <GraphInfo.Perf up={false}>
                            -2.92%
                        </GraphInfo.Perf>
                    </GraphInfo.Item>

                    <GraphInfo.Item>
                        <GraphInfo.Label>
                            VOL:
                        </GraphInfo.Label>
                        <GraphInfo.Title>
                            $1,258,570
                        </GraphInfo.Title>
                    </GraphInfo.Item>

                    <GraphInfo.Item>
                        <PeriodSelect/>
                    </GraphInfo.Item>
                </GraphInfo.Graphinfo>
            </GraphTop.Left>
        </GraphTop.Graphtop>
    )
};

export default IconGraphBar;
