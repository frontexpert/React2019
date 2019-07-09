import React from 'react'
import Highcharts from 'highcharts'
import styled from 'styled-components'
import minus from './icons/minus.svg'
import plus from './icons/plus.svg'

import { initConfiguration, updateConfig } from './ChartConfig'

const Wrapper = styled.section`
`

const MidMarketWrapper = styled.div`
  position: absolute;
  z-index: 1;
  left: 50%;
  top: 25%;
  transform: translate(-50%, 0);
  color: ${props => props.theme.palette.clrtextD};
`

const Price = styled.p`
  font-size: 1.2rem;
  margin: 0;
  font-weight: bold;
  text-align: center;
`

const LabelWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Label = styled.p`
  font-size: 0.9rem;
  margin: 0;
`
// we can wire up some zoom in / zomm out methods later on
const ZoomButton = styled.img`
  width: 22px;
  height: 22px;
  margin-right: 10px;
  &:hover {
    cursor: pointer;
    filter: brightness(150%);
  }
  &:last-of-type {
    margin-right: 0;
    margin-left: 10px;
  }
`

const BuyExchangeWrapper = styled.div`
  position: absolute;
  bottom: 16%;
  left: 3%;
  color: ${props => props.theme.palette.clrtextD};
  text-align: center;
`

const SellExchangeWrapper = BuyExchangeWrapper.extend`
  left: auto;
  right: 3%;
`

const ExchangeNumber = styled.p`
  font-size: 2.5rem;
  margin: 0;
`

const ExchangeLabel = styled.p`
  font-size: 0.9rem;
  margin: 0;
`

// const Separator = styled.div`
//   position: absolute;
//   bottom: 37px;
//   z-index: 1;
//   left: 50%;
//   transform: translate(-50%, 0);
//   border-left: 1px solid ${props => props.theme.palette.clrtextD};
//   width: 1px;
//   height: 100px;
// `

let chart
class _Chart extends React.PureComponent {
  componentDidMount () {
    // default values set as can be undefined on mount initially; will need quote and base for tooltips (next feature)
    const { sell, buy, theme, height } = this.props
    chart = Highcharts.chart('depth_chart_container', initConfiguration(buy, sell, theme, height))
  }

  componentWillReceiveProps (nextProps) {
    // theme comes through here to react to dark/light toggle
    const { buy, sell, theme, height, width } = nextProps
    chart.update(updateConfig(buy, sell, theme, height, width))
  }

  render () {
    const { midMarket, buy, sell } = this.props

    return (
      <Wrapper>
        {midMarket && <MidMarketWrapper>
          <Price>{midMarket}</Price>
          <LabelWrapper>
            <ZoomButton
              src={minus}
              alt='Zoom out'
            />
            <Label>Mid market price</Label>
            <ZoomButton
              src={plus}
              alt='Zoom in'
            />
          </LabelWrapper>
        </MidMarketWrapper>}
        <div id='depth_chart_container' />
        {buy && <BuyExchangeWrapper>
          <ExchangeNumber>{buy.length}</ExchangeNumber>
          <ExchangeLabel>Exchanges</ExchangeLabel>
        </BuyExchangeWrapper>}
        {sell && <SellExchangeWrapper>
          <ExchangeNumber>{sell.length}</ExchangeNumber>
          <ExchangeLabel>Exchanges</ExchangeLabel>
        </SellExchangeWrapper>}
        {/* <Separator /> */}
      </Wrapper>
    )
  }
}
export default _Chart
