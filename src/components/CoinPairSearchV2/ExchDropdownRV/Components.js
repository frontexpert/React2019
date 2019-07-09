import React from 'react';
import styled from 'styled-components';

export const ExchDropdownList = styled.div`
    height: ${props => props.itemCount > 5 ? 550 : (props.itemCount - 1) * 110}px;

    .exch-dropdown__list__rvtable-wrapper {
        height: ${props => props.itemCount > 5 ? 550 : (props.itemCount - 1) * 110 + 5}px;
    }
`;

export const StyleWrapper = styled.div`
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    
    .ps__thumb-y {
        opacity: 0 !important;
        z-index: 9999;
        cursor: pointer;
    }
    
    .ReactVirtualized__Table__rowColumn {
        margin-left: 0;
        text-overflow: inherit;
        overflow: initial !important;
    }
    
    .ReactVirtualized__Table__row {
        overflow: visible !important;        
    
        .ReactVirtualized__Table__rowColumn {
            &:last-child {
                margin-right: 0;
            }
        }
    }
    
    .ReactVirtualized__Table__Grid {
        outline: none !important;
        box-shadow: 7px 6px 11px rgba(0, 0, 0, .05);
    }
    
    .addon {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: stretch;
        padding: 0 15px;
        height: 60px;
        width: 100%;
    }
`;

export const AddonWrapper = styled.div`
    position: absolute;
    top: 0;
    right: 30px;
    // border-bottom: 1px solid ${props => props.theme.palette.coinPairDropDownItemBorder};
    height: 100%;
    display: flex;
    align-items: center;
    pointer-events: none;
    
    .DemoLabel{
        font-size: 11px;
        position: absolute;
        top: 0;
        padding: 2px;
        left: 0;
        height: 13px;
        z-index: 100;
        font-weight: 700;
        color: white;
        background: red;
    }
`;

export const ItemButtonWrapper = styled.div`
    position: relative;
    border-bottom: 1px solid ${props => props.theme.palette.clrInnerBorder};
    min-height: 110px;
    display: flex;
    align-items: center;
    
    .phone-number-input svg, .code-input svg{
        min-height: 36px;   
    }
`;

export const ItemButton = styled.button`
    padding-right: ${props => props.isActive ? '20px !important' : '30px'};
    flex: 1;
`;
