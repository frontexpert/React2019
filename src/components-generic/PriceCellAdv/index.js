import React from 'react';
import styled from 'styled-components';
import {splitAmtOnDecimal} from 'Utils';

const SecondaryColorSell = styled.span`
    color: ${props => props.theme.tradePalette.secondarySell};
    font-weight: 300;
`;

const PrimaryColorSell = styled.span`
    color: ${props => props.theme.tradePalette.primarySell};
    font-weight: 400;
`;

const SecondaryColorBuy = styled.span`
    color: ${props => props.theme.tradePalette.secondaryBuy};
    font-weight: 300;
`;

const PrimaryColorBuy = styled.span`
    color: ${props => props.theme.tradePalette.primaryBuy};
    font-weight: 400;
`;

const PriceCellAdv = ({price, isBuy}) => {
    const [digitsBeforeDecimal, digitsAfterDecimal] = splitAmtOnDecimal(price)
    return (isBuy ?
        <React.Fragment>
            <SecondaryColorBuy>{digitsBeforeDecimal}.{`\u00A0`}</SecondaryColorBuy>
            <PrimaryColorBuy>{digitsAfterDecimal}</PrimaryColorBuy>
        </React.Fragment> :
        <React.Fragment>
            <SecondaryColorSell>{digitsBeforeDecimal}.{`\u00A0`}</SecondaryColorSell>
            <PrimaryColorSell>{digitsAfterDecimal}</PrimaryColorSell>
        </React.Fragment>
    )      
};

export default PriceCellAdv;