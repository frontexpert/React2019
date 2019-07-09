import React from 'react';

import ForexChartLive from './ForexChartLive';

import { ChartWrapper } from './styles';

const ForexChartCanvas = ({
    isLowerSectionOpened,
    isBorderHidden,
}) => {
    return (
        <ChartWrapper isLowerSectionOpened={isLowerSectionOpened} isBorderHidden={isBorderHidden}>
            <ForexChartLive />
        </ChartWrapper>
    );
};

export default ForexChartCanvas;
