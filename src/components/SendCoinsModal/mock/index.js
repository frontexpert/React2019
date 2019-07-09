import usdt from './coin-usdt.svg'
import btc from './coin-btc.svg'
import eth from './coin-eth.svg'

const mockData = [
    {
        shortName: 'USDT',
        fullName: 'USD Tether',
        value: 'USDT - USD Tether',
        icon: usdt,
        defaultAmount: 1.2882755,
    },
    {
        shortName: 'BTC',
        fullName: 'Bitcoin',
        value: 'BTC - Bitcoin',
        icon: btc,
        defaultAmount: 2.1375223,
    },
    {
        shortName: 'ETH',
        fullName: 'Ethereum',
        value: 'ETH - Ethereum',
        icon: eth,
        defaultAmount: 0.1698265,
    }
]

export default mockData
