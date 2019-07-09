import { Table } from 'react-virtualized';
import styled from 'styled-components/macro';

export const StyledTable = styled(Table)`
    width: ${props => props.width}px;
    font-size: 16px;
    font-weight: 400;
    color: ${props => props.theme.palette.orderBookTableCellText};

    .ReactVirtualized__Grid {
        overflow: hidden !important;

        :focus {
            outline: none !important;
        }

        ::-webkit-scrollbar {
            display: none;
        }
    }

    .ReactVirtualized__Table__row {
        border-bottom: 1px solid ${props => props.theme.palette.orderBookHistoryCellInnerborder};
        padding: 0 ${props => props.theme.palette.gapSize} !important;

        :last-child {
            border-bottom: none;
        }

        :hover {
            background: ${props => props.theme.palette.orderBookTableCellHoverBg};
            cursor: pointer !important;
        }

        :focus {
            background: ${props => props.theme.palette.orderBookTableCellHoverBg};
            outline: none !important;
        }
    }

    .ReactVirtualized__Table__rowColumn {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin: 0;
        height: 100%;
        text-overflow: inherit;
        color: ${props => props.theme.palette.orderBookTableCellText};
        overflow: visible !important;

        &:not(:last-child) {
            border-right: 1px solid ${props => props.theme.palette.orderBookHistoryCellInnerborder};
        }
    }

    .ReactVirtualized__Table__headerRow {
        background: ${props => props.theme.palette.orderBookTableHeaderBg};
        border-color: ${props => props.theme.palette.orderBookHeaderBorder};
        border-style: solid;
        border-width: 1px 0;
        border-top: 1px solid ${props => props.theme.palette.orderBookHeaderBorder};
        color: ${props => props.theme.palette.orderBookHeaderText2};
        text-transform: none;
        font-size: 16px;
        padding: 0 ${props => props.theme.palette.gapSize} !important;

        .line-break {
            text-align: center;

            span {
                display: block;
            }
        }

        &:hover {
            .arrow-icon {
                display: initial;
            }
        }

        .header {
            display: none;
        }

        &:hover {
            .header {
                display: initial;
            }
        }

        .exchanges-label {
            font-size: 16px;
        }
    }

    .ReactVirtualized__Table__headerColumn {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: stretch;
        margin: 0;
        height: 100%;

        &:not(:last-child) {
            border-right: 1px solid ${props => props.theme.palette.orderBookHistoryCellInnerborder};
        }
        &:first-child {
            white-space: nowrap;
            justify-content: center;
        }
        &:first-child > .full-width {
            display: flex !important;
            justify-content: center;
        }
        &:last-child>div, &:first-child .max-order-size-wrapper{
            width: auto;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
`;