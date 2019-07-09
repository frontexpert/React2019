import styled from 'styled-components/macro';

export const Wrapper = styled.div.attrs(props => ({
	style: {
        color: props.isBuy ? props.theme.palette.orderBookTableCellTextBuy : props.theme.palette.orderBookTableCellTextSell,
    }
}))`
    text-align: left;
    display: block !important;
    width: 100% !important;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: no-wrap;
`;

export const DotSpan = styled.span`
    &:not(:first-child)::before {
        padding: 0 4px;
        content: '\u00B7';
        font-size: 20px;
        font-weight: 900;
    }
`;
