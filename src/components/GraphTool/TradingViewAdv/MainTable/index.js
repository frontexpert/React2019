import React, { Component } from 'react';
import {
    ContentWrapper, LeftAccount, Main, MainTable, TableName, MainTableCon, CreateAccount
} from './Components';
import ActiveTable from './ActiveTable';
import { TableData } from './data';

class MainContent extends Component {
    state = {};

    render() {

        return (

            <ContentWrapper>
                <TableName>
                    <ActiveTable/>
                </TableName>
                <Main>
                    <LeftAccount>Account</LeftAccount>
                    <MainTable>
                        {
                            TableData.map((item, index) => (
                                <MainTableCon key={index}>
                                    <div className="TableViewItems">
                                        <div className="currency">{item.currency}</div>
                                        <div className="PayinImage"> </div>
                                        <div className="PayoutImage"> </div>
                                        <div className="RowNumber">{item.Available}</div>
                                        <div className="RowNumber">{item.Reserved}</div>
                                        <div className="RowNumber">{item.Total}</div>
                                        <div className="RowNumber">{item.TotalinEUR}</div>
                                    </div>
                                </MainTableCon>

                            ))
                        }
                    </MainTable>
                </Main>
                <CreateAccount>
                    <p className="CreateAccountCon">Create new account</p>
                </CreateAccount>
            </ContentWrapper>

        );
    }
}

export default MainContent;
