import React from 'react';
import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100%;
    background-color: ${props => props.theme.palette.clrBackground};
    display: block;
    height: 100%;
    font-weight: 700;
    font-family: 'open_sans',sans-serif;
    border: 1px solid #454c73;
    border-radius: 3px;
`;

export const Menu = styled.div`
    background-color: ${props => props.theme.palette.clrMainWindow};
    display: grid;
    justify-content: center;
    position: relative;
    color: ${props => props.theme.palette.clrHighContrast};
    font-weight: 700;
    font-size: 22px;
    border-bottom: 1px solid #454c73;
    font-family: 'open_sans',sans-serif;
`;

export const HeaderTitle = styled.div`
    text-align: center;
    padding: 10px 0 0;
    width: 100%;
`;
export const ViewWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    position: relative;
    background: ${props => props.theme.palette.clrMainWindow};
    max-width: 1000px;
    margin: 18px auto 0 auto;
    text-align: center;
    padding: 11px 20px;
    font-size: 14px;
    font-weight: 700;
    font-family: 'open_sans',sans-serif;
    color: ${props => props.theme.palette.clrHighContrast};
    border: 1px solid #454c73;
    border-radius: 3px;
    & > div{
    margin-left: 5px
    color: #2680ff;
    font-size: 13px;
    outline: 0;
    }
    
    & > span{
    font-size: 13px;
    }
`;
export const ContentWrapper = styled.div`
    display: block;
    position: relative;
    background: ${props => props.theme.palette.clrMainWindow};
    max-width: 1000px;
    text-align: center;
    padding: 0 0 400px 0 !important;
    margin: 15px auto 400px auto;
    border: 1px solid #454c737f;
    border-radius: 3px;
    color: ${props => props.theme.palette.clrPurple};
    font-weight: 700;
    font-family: 'open_sans',sans-serif;
`;
export const StyleWrapper = styled.div`
    width: ${props => props.width}px;
    height: ${props => props.height}px;
`;

export const HeaderWrapper = styled.div`
    border-collapse: collapse;
    box-sizing: border-box;
    color: ${props => props.theme.palette.clrBackground};
    font-size: 13px;
    font-weight: 700;
    font-family: 'open_sans',sans-serif;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 11px;
    height: 36px;
    z-index: 3;
    -webkit-border-horizontal-spacing: 2px;
    -webkit-border-vertical-spacing: 2px;
    white-space: nowrap;
`;
export const DropMenuWrapper = styled.div`
    width: 100%;  
`;
export const Main = styled.div`
    display: flex;
    width: 100%;
    height: 250px;
`;