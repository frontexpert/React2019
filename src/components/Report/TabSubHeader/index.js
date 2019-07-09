import React from 'react';
import styled from 'styled-components';

import DropMenu from '../DropMenu';

import {
    instrumentList, accountList, orderTypeList, timeInForceList, sideList, sourceList, hasTradesList, orderStateList, makerTakerList, directionList, statusList, typeList, reportTypeList, outputTypeList, currencyList
} from '../constants';

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    border-bottom: 1px solid #dedede;
    position: relative;
    padding: 5px 0;
    justify-content: space-between;
`;

const Button = styled.button`
    min-width: 67px;
    height: 25px;
    margin-right: 10px;
    font-size: 12px;
`;

const DefaultButton = styled(Button)`
    color: #0057a3;
    border: 2px solid #0057a3;
    border-radius: 2px;
    
    &:hover {
        background-color: #0057a3;
        color: #fff; 
    } 
`;

const DropdownGroup = styled.div`
    display: flex;
`;

const Input = styled.input`
    border: 1px solid #92b1cc;
    height: 25px;
    font-size: 12px;
    color: #333;
    margin-right: 10px;
    max-width: 100px;
    padding: 0 5px;
`;

const ResetButton = styled(Button)`
    background-color: #dedede;
    color: #333;
`;

const SearchInput = styled(Input)`
    max-width: 140px;
`;

const SearchWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-left: 15px;
`;

const Separator = styled.div`
    display: inline-block;
    position: relative;
    width: 10px;
    height: 1px;
    margin-right: 10px;
    
    &:after {
        content: "";
        display: block;
        width: 9px;
        height: 1px;
        border-bottom: 1px solid black;
        position: absolute;
        margin: auto;
        top: 0;
        left: 0;
        right: 0;
    }
`;

const dropdownMenus = {
    instrument: <DropMenu
        label="Instrument"
        data={instrumentList}
    />,
    account: <DropMenu
        label="Account"
        data={accountList}
    />,
    orderType: <DropMenu
        label="Order type"
        data={orderTypeList}
    />,
    timeInForce: <DropMenu
        label="Time in force"
        data={timeInForceList}
    />,
    side: <DropMenu
        label="Side"
        data={sideList}
    />,
    source: <DropMenu
        label="Source"
        data={sourceList}
    />,
    hasTrades: <DropMenu
        label="Has trades"
        data={hasTradesList}
    />,
    orderState: <DropMenu
        label="Order state"
        data={orderStateList}
    />,
    makerTaker: <DropMenu
        label="Maker/Taker"
        data={makerTakerList}
    />,
    direction: <DropMenu
        label="Direction"
        data={directionList}
    />,
    status: <DropMenu
        label="Status"
        data={directionList}
    />,
    type: <DropMenu
        label="Type"
        data={typeList}
    />,
    reportType: <DropMenu
        label="Report type"
        data={reportTypeList}
    />,
    outputType: <DropMenu
        label="Output type"
        data={outputTypeList}
    />,
};

class TabSubHeader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isExchBarOpen: false,
        };
    }

    render() {
        const { dropdowns, tab } = this.props;

        return (
            <Wrapper>
                <DropdownGroup>
                    {
                        dropdowns.map((dropdown) => dropdownMenus[dropdown])
                    }
                </DropdownGroup>
                <SearchWrapper>
                    {
                        (tab === 'orderHistory' || tab === 'tradeHistory') && (
                            <React.Fragment>
                                {
                                    tab === 'tradeHistory' && (
                                        <Input placeholder="Client ID"/>
                                    )
                                }
                                <Input placeholder="Order ID"/>
                                <Input placeholder="Client Order ID"/>
                            </React.Fragment>
                        )
                    }
                    {
                        (tab === 'gbxUtilizationHistory' || tab === 'paymentHistory') && (
                            <React.Fragment>
                                <DropMenu
                                    label="Currency"
                                    data={currencyList}
                                />
                                <Input placeholder="Amount from"/>
                                <Separator/>
                                <Input placeholder="Amount to"/>
                                <SearchInput placeholder="Search"/>
                            </React.Fragment>
                        )
                    }
                    {
                        tab === 'navReport' ? (
                            <DefaultButton>Generate</DefaultButton>
                        ) : (
                            <DefaultButton>Search</DefaultButton>
                        )
                    }
                    <ResetButton>Reset</ResetButton>
                </SearchWrapper>
            </Wrapper>
        );
    }
}

export default TabSubHeader;
