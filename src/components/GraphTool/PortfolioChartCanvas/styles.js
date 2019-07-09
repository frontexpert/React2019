import styled from 'styled-components';

export const ChartWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${props => props.theme.palette.clrBackground};
    padding-bottom: ${props => (props.isLowerSectionOpened ? '15px' : '0')};
    border-top-left-radius: ${props => props.theme.palette.borderRadius};
    border-style: solid;
    border-color: ${props => props.theme.palette.clrBorder};
    border-width: 1px 0 ${props => (props.isLowerSectionOpened ? '0' : '1px')} 1px;
    cursor: crosshair;
`;

export const PortfolioLabels = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 33px;
    font-weight: 400;
    bottom: 40px;
    left: 15px;
`;

export const TotalPrice = styled.div`
    display: flex;
    font-weight: 600;
    text-align: left;
`;

export const PriceLabel = styled.div`
    text-align: left;
    color: ${props => props.theme.palette.clrPurple};
    margin-right: 10px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
`;

export const BackTesting = styled.div`
    margin-left: 10px;
    text-align: left;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${props => props.theme.palette.clrPurple};

    .dropdown-wrapper {
        margin-left: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

export const OneDayProfitStyled = styled.span`
    margin-right: 3px;
    color: ${props => props.theme.palette.clrPurple};
`;