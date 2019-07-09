import React from 'react'
import Chart from './AreaChart'
import { inject, observer } from 'mobx-react'
import { STORE_KEYS } from '../../../stores'
const { THEME: STORE_KEY_THEME, ORDERBOOK: STORE_KEY_ORDERBOOK } = STORE_KEYS

const DepthChartContainer = inject(STORE_KEY_ORDERBOOK, STORE_KEY_THEME)((observer((
  {
    [STORE_KEY_ORDERBOOK]: { depthChartData = new Map() },
    [STORE_KEY_THEME]: theme,
    height,
    width,
  } = {}) => {
  return (
    <Chart
      buy={depthChartData.get('buys')}
      sell={depthChartData.get('sells')}
      // baseCur={depthChartData.get('baseCur')}
      // quoteCur={depthChartData.get('quoteCur')}
      midMarket={depthChartData.get('midMarket')}
      theme={theme.theme}
      height={height}
      width={width}
    />
  )
})))

export default DepthChartContainer
