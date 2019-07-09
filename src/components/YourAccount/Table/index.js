import React from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import 'crypto-icons/font.css';
import 'crypto-icons/styles.css';
import styled from 'styled-components';
import Select from '../../../components-generic/Select';
import {randSelectionFrList} from 'Mock/dataGeneratingUtils';
import {custodians, coinIcons} from 'Mock/marketData';

const StyledSelect = styled(Select)`
    background: ${props => props.theme.palette.backgroundHighContrast} !important;
    border : none;
    color : ${props => props.theme.tradePalette.contrastText};
    text-align: left;
    &:hover{
        background : rgba(0,0,0,0.0) !important;
    }
    &:before { 
        content: none; 
    }
    > div *{
        padding: 0;
    }
`;

const StyledTable = styled(ReactTable)`
    background: ${props => props.theme.palette.backgroundHighContrast} !important;
    color: ${props => props.theme.tradePalette.contrastText} !important;
    height: ${props => props.height}px;
`;
// ie, {"Exchange":"YoBit","Coin":"TRX","Position":0.0123456, "Amount": 100.78}
const createColumns = () => {
    return (
        [
            {
                Header: 'Coin',
                id: 'coin',
                Cell: ({original:{Coin}}) => {
                    return (
                        <div>
                            <span className={`icon ${randSelectionFrList(coinIcons)}`}></span>
                            {`\u00A0 ${Coin}`}
                        </div>
                    )
                },
            },
            {
                Header: 'Size',
                id: 'size',
                Cell: ({original:{Position, Coin}}) => {
                    return (
                        <div>
                            {`${Position} \u00A0 ${Coin}`}
                        </div>
                    )
                },
            },
            {
                Header: 'Amount',
                id: 'amount',
                Cell: ({original:{Amount}}) => {
                    return (
                        <div>
                            {`$\u00A0 ${Amount}`}
                        </div>
                    )
                },
            },
            {
                Header: 'Custodian',
                id: 'custodian',
                Cell: () => {
                    return (
                        <StyledSelect options={custodians} />
                    )
                },
            }
        ]
    )
};

const getTrProps=() => ({className: "tableRows"});

export default ({portfolioData, height}) => {
    return(
        <StyledTable 
            columns={createColumns()} data={portfolioData}
            showPaginationBottom={false}
            getTrProps={getTrProps}
            getTheadTrProps={
                () => ({style: {
                    "textAlign" : "left",
                }})
            }
            className="-highlight"
            defaultPageSize={portfolioData.length}
            height={height}
        />

    )
};