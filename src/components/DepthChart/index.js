import React from 'react'
import styled from 'styled-components'
import DepthChartEnhanced from './DepthChartEnhanced'
import { AutoSizer } from 'react-virtualized'

const ChartContainer = styled.div`
  background: ${props => props.theme.palette.backgroundHighContrast};
  rect{ fill: ${props => props.theme.palette.backgroundHighContrast};}
  text {fill: ${props => props.theme.tradePalette.contrastText} !important;}
  .highcharts-tooltip-box{
      fill: ${props => props.theme.palette.backgroundHighContrast};
  }
  cursor: pointer;
  height: ${props => props.height};
`

export const DepthChart = () => {
  return (
    <AutoSizer>
      {({ width, height }) => {
        return (
          <ChartContainer height={height} width={width}>
            <DepthChartEnhanced height={height} width={width} />
          </ChartContainer>
        )
      }}
    </AutoSizer>
  )
}
