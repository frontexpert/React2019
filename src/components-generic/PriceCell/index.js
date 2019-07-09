import React from 'react';
import styled from 'styled-components';

const PrimaryColorSell = styled.span`
    color: ${props => props.theme.tradePalette.primarySell};
    font-weight: 400;
    font-size: .75rem;
`;

const PrimaryColorBuy = styled.span`
    color: ${props => props.theme.tradePalette.primaryBuy};
    font-weight: 400;
    font-size: .75rem;
`;

const PriceCell = ({price, isBuy}) => {
    return (isBuy ?
        <PrimaryColorBuy>{price}</PrimaryColorBuy>
        :
        <PrimaryColorSell>{price}</PrimaryColorSell>
    )      
};

export default PriceCell;