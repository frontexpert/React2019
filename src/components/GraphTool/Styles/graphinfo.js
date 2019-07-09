import styled from 'styled-components';

const GraphInfo = {};

GraphInfo.Graphinfo = styled.div`
    position: relative;
    display: flex;
    padding: 0;
    margin: 0 0 0 10px;
    white-space: nowrap;
    flex: 0 0 auto;
    z-index: 5;
    transition: all .1s;
    border-radius: ${props => props.theme.palette.borderRadius};
    height: 16px;
    
    background: transparent;
`;

GraphInfo.Item = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
    position: relative;
    padding: 0 8px;
    margin: 0 0 0 1px;
    border-left: 1px solid ${props => props.theme.palette.clrseparator};

    &:first-child {
        border: none;
        padding-left: 0;
    }
    
    &:last-child {
        align-items: start;
    }
    
    span {
        color: ${props => props.theme.palette.clriconD};
    }
`;

GraphInfo.ItemInline = styled(GraphInfo.Item)`
    display: flex;
`;

GraphInfo.ItemNoPadding = styled(GraphInfo.Item)`
    padding: 0;
`;

GraphInfo.GbarInfoNums = styled(GraphInfo.ItemInline)`
    margin: 2px 0 0 3px;
`;

GraphInfo.Title = styled.p`
    color: ${props => props.theme.palette.clrtext};
    font-size: 12px;
    font-weight: 600;
    line-height: 1.2;
    min-width: 46px;
    padding: 0px;
    margin: 0px;    
`;

GraphInfo.Nums = styled.p`
    font-size: 12px;
    line-height: 1;
    color: ${props => props.theme.palette.clrimportant};
    padding: 0;
    margin: 0;
`;

GraphInfo.Perf = styled.p`
    color: ${props => props.up ? props.theme.tradePalette.primaryBuy : props.theme.tradePalette.primarySell};
    font-size: 12px;
    font-weight: 600;
    line-height: 1.2;
    min-width: 46px;
    padding: 0px;
    margin: 0px;    
`;

GraphInfo.Label = styled.span`
    color: ${props => props.theme.palette.clrbackCI};
    font-size: 12px;
    font-weight: 600;
    line-height: 1.2;
    padding: 0;
    margin: 0 .5em 0 0;    
`;

export default GraphInfo;
