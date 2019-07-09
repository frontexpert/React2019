import React from 'react';
import styled from 'styled-components';

import PerfectSrollWrapper from '../../../components-generic/PerfectScrollWrapper';
import iconCheck from './mock/check.png';

const mock = [
    'Altairian Prime1',
    'BitGo',
    'Mar 1',
    'Volt',
    'BitGO4',
    'Jaxx',
    'itBit',
    'IRA Financial Trust',
    'SILO',
    'Altairian Prime2',
    'BitGo2',
    'Mar 2',
    'Volt2',
    'BitGO3',
    'Jaxx3',
    'itBit2',
    'IRA Financial Trust2',
    'SILO2'
];

const Custodian = styled.div`
    position: relative;
    margin: 0;
    padding: 10px 30px 10px 15px;
    font-size: 14px;
    line-height: 1.2;
    cursor: pointer;
    
    &:not(:first-child) {
        border-top: 1px solid ${props => props.theme.palette.depositToggleBorder};
    }
    
    &:hover {
        background-color: ${props => props.theme.palette.depositToggleHover};
        border-color: ${props => props.theme.palette.depositToggleHover};
        color: ${props => props.theme.palette.contrastText};
    }
    
    &:active {
        background-color: ${props => props.theme.palette.depositActive};
        border-color: ${props => props.theme.palette.depositActive};
        color: ${props => props.theme.palette.contrastText};
    }
    
    ${props => props.isActive ? `
        background-color: ${props.theme.palette.depositActive} !important;
        border-color: ${props => props.theme.palette.depositActive} !important;
        font-weight: 600;
        color: ${props.theme.palette.contrastText};
    ` : ''}
`;

const CheckMark = styled.img`
    position: absolute;
    right: 26px;
    top: 9px;
    width: 18px;
    height: 18px;
    display: ${props => props.isActive ? 'block' : 'none'};
    display: none;
    filter: brightness(1000%);
`;

const CustodianList = ({ value, onChange }) => (
    <PerfectSrollWrapper>
        {mock.map((item, index) => (
            <Custodian
                key={item + index}
                onClick={() => onChange(item)}
                isActive={value === item}
            >
                {item}
                <CheckMark
                    src={iconCheck}
                    isActive={value === item}
                />
            </Custodian>
        ))}
    </PerfectSrollWrapper>
);

export default CustodianList;
