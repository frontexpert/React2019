import React, { memo } from 'react';

import { formatString, getSplittedNumber } from '@/utils';
import { ResultNumber, ZerosWrapper, IntegerWrapper } from './styles';

const PriceCell = memo(({
    children, type, intLength, fractionDigits,
}) => {
    // format price
    const priceString = formatString(children, fractionDigits, true);
    const result = getSplittedNumber(priceString, intLength + fractionDigits);

    return (
        <ResultNumber type={type}>
            {!!result.leadingExtraHiddenZeroes && (
                <ZerosWrapper position="leading-hidden">{result.leadingExtraHiddenZeroes}</ZerosWrapper>
            )}
            {!!result.leadingExtraZeroes && (
                <ZerosWrapper position="leading">{result.leadingExtraZeroes}</ZerosWrapper>
            )}
            {!!result.integerPart && (
                <IntegerWrapper type={type}>
                    {result.integerPart}
                    {result.showDecimalSeparator && result.decimalSeparator}
                </IntegerWrapper>
            )}
            {!!result.fractionalPart && result.fractionalPart}
            {!!result.trailingZeros && (
                <ZerosWrapper position="trailing">{result.trailingZeros}</ZerosWrapper>
            )}
        </ResultNumber>
    );
});

export default PriceCell;
