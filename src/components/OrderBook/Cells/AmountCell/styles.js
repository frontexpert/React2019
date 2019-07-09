import styled from 'styled-components/macro';

export const Container = styled.span`
    font-weight: ${({ type }) => (type === 'header' ? 700 : 400)};
    padding-right: 12px;
    color: ${({ type, theme }) => {
        switch (type) {
            case 'header':
                return theme.palette.orderBookHeaderText2;
            default:
                return theme.palette.orderBookTableCellTextAmount;
        }
    }};
`;
