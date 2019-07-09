import React, { memo } from 'react';

import { formatString, getSplittedNumber } from '@/utils';

import { Container } from './styles';
import { ZerosWrapper } from '../PriceCell/styles';

const OrderCellFormatter = memo(({
    children, type, intLength, fractionDigits,
}) => {
    const stringifiedNumber = formatString(children, fractionDigits, true);
    const result = getSplittedNumber(stringifiedNumber, intLength + fractionDigits);

    return (
        <Container type={type}>
            {!!result.leadingExtraHiddenZeroes && (
                <ZerosWrapper position="leading-hidden">{result.leadingExtraHiddenZeroes}</ZerosWrapper>
            )}
            {!!result.leadingExtraZeroes && (
                <ZerosWrapper position="leading">{result.leadingExtraZeroes}</ZerosWrapper>
            )}
            {!!result.integerPart && result.integerPart}
            {result.showDecimalSeparator && result.decimalSeparator}
            {!!result.fractionalPart && result.fractionalPart}
            {!!result.trailingZeros && (
                <ZerosWrapper position="trailing">{result.trailingZeros}</ZerosWrapper>
            )}
        </Container>
    );
});

export default OrderCellFormatter;
