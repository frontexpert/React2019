import React from 'react';
import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100%;
    display: block;
    .TableViewItems{
    justify-content: center;
    display: flex;
    align-items: center;
    }
`;

export const HeaderWrapper = styled.div`
    border-collapse: collapse;
    box-sizing: border-box;
    font-size: 13px;
    font-weight: 700;
    font-family: 'open_sans',sans-serif;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 36px;
    color: ${props => props.theme.palette.clrPurple};
    z-index: 3;
    -webkit-border-horizontal-spacing: 2px;
    -webkit-border-vertical-spacing: 2px;
    white-space: nowrap;
`;
export const ContentWrapper = styled.div`
    border: 1px solid #454c73;
    border-radius: 2px;
    display: block;
    position: relative;
    background: ${props => props.theme.palette.clrMainWindow};
    text-align: center;
    padding-bottom: 100px;
    margin: 0;
`;
export const StyleWrapper = styled.div`
    width: ${props => props.width}px;
    height: 40px;
    font-family: 'open_sans',sans-serif;
    .up, .down{
    background-image: url(https://exchange.globitec.com/resources/assets/images/sort.svg);
    width: 12px;
    height: 6px;
    opacity: .6;
    cursor: pointer;
    }
    .controls{
    display: inline-block;
    margin: 0 5px -4px 0;
    }
`;

export const Main = styled.div`
    padding-top: 5px;
    display: flex;
    width: 100%;
`;
export const TableName = styled.div`
    width: 100%;
    padding: 26px 0;
    height: 70px;
    border-bottom: 1px solid #454c737f;
`;
export const LeftAccount = styled.div`
    width: 20%;
    vertical-align: top;
    display: flex;
    flex-align: center;
    justify-content: center;
    align-items: center;
    border-right: 1px solid #454c737f;
    border-bottom: 1px solid #454c737f;
    color: ${props => props.theme.palette.clrPurple};
    font-size: 13px;
    font-weight: 700;
    font-family: 'open_sans',sans-serif;
    
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
`;
export const MainTable = styled.div`
    width: 80%;
`;
export const CreateAccount = styled.div`
  
    display: table;
    margin: 15px auto;
.CreateAccountCon:hover{
    color: #2680ff;
    cursor: pointer;
    font-weight: 700;
    font-family: 'open_sans',sans-serif;
}
.CreateAccountCon{
    background-position: 0 5px;
    background-size: 15.1px;
    padding: 3px 0 0 20px;
    float: none;
    width: auto;
    height: 20px;
    font-size: 16px;
    color: ${props => props.theme.palette.clrPurple};font-weight: 700;
    font-family: 'open_sans',sans-serif;
    margin: 0;
    background-image: url(https://exchange.globitex.com/resources/assets/images/add.svg);
    background-position-x: 0px;
    background-position-y: 5px;
    background-repeat: no-repeat;
    }
`;

export const MainTableCon = styled.div.attrs({ className: 'dropmenu-wrapper' })`
    font-size: 13px;
    font-weight: 600;
    font-family: 'open_sans',sans-serif;
    display: block;
    height: 35px;
    color: ${props => props.theme.palette.clrPurple};
    border-bottom: 1px solid #454c737f;
    padding: 0;
    align-items: center;
    
   .currency{
    width: 8%;
    margin: 0 -4px 0 0;
    padding: 9px 0;
    }
   
    .RowNumber{
    width: 19%;
    padding: 0 15px 0 0;
    padding: 3px 0;
    margin: 0 -4px 0 0;
    }
    
    .TableViewItems{
    justify-content: center;
    display: flex;
    align-items: center;
    }
    
    .PayinImage{
    background-image: url(https://exchange.globitex.com/resources/assets/images/components/accounts/fund.svg);
    background-position-x: 50%;
    background-position-y: -22px;
    background-repeat-x: ;
    background-repeat-y: ;
    background-size: 17px;
    width: 23px;
    height: 23px;
    background-repeat: no-repeat;
    margin: auto;
    bottom: -6px;
    left: 0;
    right: 0;
    cursor: pointer;
    }
    
    .TableViewItems{
    justify-content: center;
    display: flex;
    align-items: center;
    }
    
    .PayoutImage{
    background-image: url(https://exchange.globitex.com/resources/assets/images/components/accounts/withdraw.svg);
    background-position-x: 50%;
    background-position-y: -22px;
    background-repeat-x: ;
    background-repeat-y: ;
    background-size: 17px;
    width: 23px;
    height: 23px;
    background-repeat: no-repeat;
    margin: auto;
    bottom: -6px;
    left: 0;
    right: 0;
    cursor: pointer;
    }
`;