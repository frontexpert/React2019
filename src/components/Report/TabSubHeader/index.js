import React from 'react';
import styled from 'styled-components';

import DropMenu from '../DropMenu';

import {
    instrumentList, accountList, orderTypeList, timeInForceList, sideList, sourceList, hasTradesList, orderStateList, makerTakerList, directionList, statusList, typeList, reportTypeList, outputTypeList, currencyList
} from '../constants';

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    padding-top: 5px;
    padding-bottom: 13px;
    background-color: ${props => props.theme.palette.clrMainWindow};
    justify-content: space-between;
`;

const Button = styled.button`
    background-color: #2680ff;
    min-width: 67px;
    height: 25px;
    margin-right: 10px;
    font-size: 12px;
    border: none;
`;

const DefaultButton = styled(Button)`
    color: #fff;
    border: none;
    border-radius: 2px;
    outline-color: white;
    &:hover {
        cursor: pointer;
        color: #fff; 
    } 
`;

const DropdownGroup = styled.div`
    display: flex;
`;

const Input = styled.input`
    border: 1px solid #454c73;
    border-radius: 2px;
    height: 25px;
    font-size: 12px;
    background-color: ${props => props.theme.palette.clrDarkPurple};
    color: #fff;
    margin-right: 10px;
    max-width: 100px;
    padding: 0 5px;
    outline-color: white;
    &::placeholder {
        color: ${props => props.theme.palette.clrPurple};
    }
    
`;

const ResetButton = styled(Button)`
    background-color: #2680ff;
    outline-color: white;
    color: #fff;
    border: none;
    &:hover {
        cursor: pointer;
        color: #fff; 
    }
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
                <div>
                    <DropdownGroup>
                        {
                            dropdowns.map((dropdown) => dropdownMenus[dropdown])
                        }
                    </DropdownGroup>
                </div>
                <div>
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
                </div>
            </Wrapper>
        );
    }
}

export default TabSubHeader;
