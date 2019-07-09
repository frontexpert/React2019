import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import PerfectScrollWrapper from '../../components-generic/PerfectScrollWrapper';
import { format7DigitString } from '../../utils';

const ExchangePlansTableStyleWrapper = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: stretch;
    
    background: ${props => props.theme.palette.exchTableBg}; 
`;

const ExchangeTable = styled.table`
    width: 100%;
    border-spacing: 0;
    border-collapse: collapse;
    
    th, td {
        border: 2px solid ${props => props.theme.palette.exchTableBorder};
    }
    
    thead {
        tr {
            height: 56px;

            th {
                padding: 0 15px;
                text-align: left;
                color: ${props => props.theme.palette.contrastText};
                font-size: 13px;
                font-weight: 500;
                letter-spacing: 0.1em;
            }
        }
    }
    
    .exchange-item {
        height: 52px;
  
        .exchange-item__color {
            flex-shrink: 0;
            flex-grow: 0;
            margin: 0 auto;
            width: 34px;
            height: 34px;
            border: 2px solid ${props => props.theme.palette.exchTableExchIconBorder};
        }
        
        td {
            padding: 0 15px;
            color: ${props => props.theme.palette.exchTableColor};
            font-weight: 400;
            font-size: 12px;
            white-space: nowrap;
        }
    }
`;

class ExchangePlansTable extends React.Component {
    constructor (props) {
        super(props);

        this.state = {};
    }

    render () {
        return (
            <ExchangePlansTableStyleWrapper className="exchange-plans-table">
                <PerfectScrollWrapper>
                    <ExchangeTable>
                        <thead>
                        <tr>
                            <th>
                                <FormattedMessage
                                    id="execution_plan_view.label_row"
                                    defaultMessage="Row"
                                />
                            </th>
                            <th>
                                <FormattedMessage
                                    id="execution_plan_view.exchange"
                                    defaultMessage="Exchange"
                                />
                            </th>
                            <th>
                                <FormattedMessage
                                    id="execution_plan_view.split_abs"
                                    defaultMessage="Split (abs.)"
                                />
                            </th>
                            <th>
                                <FormattedMessage
                                    id="execution_plan_view.split_rel"
                                    defaultMessage="Split (rel.)"
                                />
                            </th>
                            <th>
                                <FormattedMessage
                                    id="execution_plan_view.avg_price"
                                    defaultMessage="Avg. Price"
                                />
                            </th>
                            <th>
                                <FormattedMessage
                                    id="execution_plan_view.rel_more"
                                    defaultMessage="Rel. More"
                                />
                            </th>
                            <th>
                                <FormattedMessage
                                    id="execution_plan_view.abs_more"
                                    defaultMessage="Abs. More"
                                />
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.props.data && this.props.data.map((val, key) => (
                            <tr className="exchange-item" key={key}>
                                <td>
                                    <div className="exchange-item__color"
                                         style={{
                                             background: val.exchangeColor,
                                         }}
                                    />
                                </td>
                                <td>
                                    {val.exchange}
                                </td>
                                <td>
                                    {val.splitAbs === '-'
                                        ? '-'
                                        : format7DigitString(Number.parseFloat(val.splitAbs) || 0) + ' ' + val.quote
                                    }
                                </td>
                                <td>
                                    {val.splitRel === '-'
                                        ? '-'
                                        : val.splitRel + ' %'
                                    }
                                </td>
                                <td>
                                    {val.avgPrice === '-'
                                        ? '-'
                                        : format7DigitString(Number.parseFloat(val.avgPrice) || 0) + ' ' + val.base
                                    }
                                </td>
                                <td>
                                    {val.relMore === '-'
                                        ? '-'
                                        : val.relMore + ' %'
                                    }
                                </td>
                                <td>
                                    {val.absMore === '-'
                                        ? '-'
                                        : format7DigitString(Number.parseFloat(val.absMore) || 0) + ' ' + val.base
                                    }
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </ExchangeTable>
                </PerfectScrollWrapper>
            </ExchangePlansTableStyleWrapper>
        );
    }
}

export default ExchangePlansTable;