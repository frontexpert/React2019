import styled from 'styled-components';
import React from 'react';

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: stretch;
    width: 100%;
`;

export const Label = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 60%;
    height: 23px;
    background: transparent;
    border: 2px solid ${props => props.theme.palette.orderFormBorder} !important;
    border-radius: 0;
    font-size: 11px;
    line-height: 1em;
    color: ${props => props.theme.palette.orderFormText};
    text-align: center;
`;

const LabelAddon = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 23px;
    background: transparent;
    border: none;
    font-size: 11px;
    line-height: 1em;
    color: ${props => props.theme.palette.orderFormText};
    text-align: center;
    margin: 0 4px 0 auto;
`;

const LabelContent = styled.div`
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 23px;
    background: transparent;
    border: none;
    font-size: 11px;
    line-height: 1em;
    color: ${props => props.theme.palette.orderFormText};
    text-align: center;
`;

const Header = styled.p`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin: 0;
    padding: 0 4px 0 0;
    width: 40%;
    font-size : 11px;
    font-weight: 500;
    color : ${props => props.theme.palette.contrastText};
`;

export const RowLabel = ({ header, label, coin }) => {
    return (
        <Wrapper>
            <Header>{header}</Header>
            <Label>
                <LabelContent>{label}</LabelContent>
                <LabelAddon>{coin}</LabelAddon>
            </Label>
        </Wrapper>
    );
};

export default RowLabel;
