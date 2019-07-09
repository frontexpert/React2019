import {getSellDepthData, getBuyDepthData, partitionBuysSells, getInnerQuartileRangeOrders} from '../../../../stores/utils/storeUtils';
import {getDepthData} from '../../../../stores/OrderBook';

const Asks =  new Map([
    [0, ["0.055980", "38.535300", "COINHUB"]],
    [1, ["0.056020", "38.289900", "COINHUB"]],
    [2, ["0.056070", "31.610700", "COINHUB"]],
    [3, ["0.056130", "4.580000", "BITFINEX"]],
    [4, ["0.056160", "5.348332", "BITFINEX"]],
    [5, ["0.056180", "48.983591", "BITFINEX"]],
    [6, ["0.056190", "0.375525", "BITFINEX"]],
    [7, ["0.056210", "0.509501", "TIDEX"]],
    [8, ["0.056220", "0.450000", "BITFINEX"]],
    [9, ["0.056230", "33.108700", "BITFINEX"]],
    [10, ["0.056250", "15.000000", "BITFINEX"]],
    [11, ["0.056400", "0.725636", "BITTREX,CRYPTOPIA"]],
    [12, ["0.056410", "2.080000", "COINBENE"]],
    [13, ["0.056440", "0.527551", "CRYPTOPIA,OOOBTC"]],
    [14, ["0.056450", "3.301883", "COINBENE,OOOBTC"]],
    [15, ["0.056460", "1.075877", "LIVECOIN,OOOBTC"]],
    [16, ["0.056470", "5.355121", "CEXIO,LIQUI,LIVECOIN"]],
    [17, ["0.056480", "16.564850", "BITFINEX,CEXIO,LIVECOIN"]],
    [18, ["0.056490", "137.467738", "BITFINEX,ETHFINEX,HITBTC,KRAKEN,OOOBTC"]],
    [19, ["0.056500", "267.503401", "BINANCE,BITFINEX,CRYPTOPIA,ETHFINEX,GDAX,HITBTC,KRAKEN,LIQUI,YOBIT"]],
    [20, ["0.056510", "12.183912", "CRYPTOPIA,HUOBI"]],
    [21, ["0.056520", "131.170038", "BINANCE,BITFINEX,COINBENE,ETHFINEX,GDAX,GEMINI,KRAKEN,POLONIEX,QRYPTOS"]],
    [22, ["0.056530", "27.440091", "BIBOX,BINANCE,ETHFINEX,GDAX,HUOBI"]],
    [23, ["0.056540", "11.658855", "BIBOX,ETHFINEX,GDAX,HUOBI,KRAKEN,KUCOIN,POLONIEX"]],
    [24, ["0.056550", "198.709572", "BINANCE,BITFINEX,BITSTAMP,COINUT,ETHFINEX,GDAX,HUOBI,KRAKEN,KUCOIN,OOOBTC,POLONIEX"]],
    [25, ["0.056560", "48.414833", "BINANCE,BITTREX,GDAX,HUOBI,KRAKEN,KUCOIN,OKEX"]],
    [26, ["0.056570", "337.265529", "BITFINEX,ETHFINEX,GDAX,GEMINI,HUOBI,KRAKEN,KUCOIN"]],
    [27, ["0.056580", "117.590932", "BINANCE,BITFINEX,BITSTAMP,COINUT,ETHFINEX,GDAX,HUOBI,KRAKEN,LBANK,LIQUI,OKEX"]],
    [28, ["0.056590", "111.579327", "BINANCE,BITFINEX,BITSTAMP,BITTREX,ETHFINEX,GDAX,KRAKEN,LBANK,LIVECOIN,OKEX,POLONIEX"]],
    [29, ["0.056600", "144.119634", "BINANCE,BITFINEX,CEXIO,CRYPTOPIA,ETHFINEX,GDAX,HITBTC,HUOBI,KRAKEN,LBANK,OKEX,QRYPTOS"]],
    [30, ["0.056610", "166.945563", "BINANCE,BITSTAMP,EXMO,GDAX,KRAKEN,LIQUI,OOOBTC,POLONIEX"]],
    [31, ["0.056620", "60.917347", "BIBOX,BITFINEX,POLONIEX"]]
]);

const Bids = new Map([
    [0, ["0.058010", "3.200578", "CCEX"]],
    [1, ["0.058000", "0.519333", "CCEX"]],
    [2, ["0.057930", "0.010132", "CCEX"]],
    [3, ["0.057910", "0.141181", "CCEX"]],
    [4, ["0.057830", "0.011197", "CCEX"]],
    [5, ["0.057200", "0.004032", "CCEX"]],
    [6, ["0.057000", "2.316119", "CCEX"]],
    [7, ["0.056890", "0.006344", "CCEX"]],
    [8, ["0.056690", "0.230000", "ALLCOIN"]],
    [9, ["0.056680", "0.018000", "ALLCOIN"]],
    [10, ["0.056650", "0.012000", "ALLCOIN"]],
    [11, ["0.056630", "0.100000", "ALLCOIN"]],
    [12, ["0.056620", "0.067000", "ALLCOIN"]],
    [13, ["0.056590", "0.003600", "COINEGG"]],
    [14, ["0.056580", "30.000000", "BITSBLOCKCHAIN"]],
    [15, ["0.056560", "14.213778", "ALLCOIN,CCEX"]],
    [16, ["0.056510", "6.000000", "WEX"]],
    [17, ["0.056500", "6.505100", "BCEX,COINBENE,LUNO,THEROCKTRADING"]],
    [18, ["0.056490", "3.577169", "COINBENE,QRYPTOS"]],
    [19, ["0.056460", "2.645000", "OKEX,RIGHTBTC"]],
    [20, ["0.056450", "0.575161", "OKEX,RIGHTBTC"]],
    [21, ["0.056440", "5.544292", "GDAX,KRAKEN,OKEX,RIGHTBTC,WEX"]],
    [22, ["0.056430", "12.690000", "BITBANK,GDAX,KRAKEN"]],
    [23, ["0.056420", "0.106895", "WEX"]],
    [24, ["0.056410", "4.590461", "GDAX,HUOBI,KRAKEN,OKEX,RIGHTBTC"]],
    [25, ["0.056400", "52.604524", "BITBANK,BITFINEX,BITSTAMP,CCEX,CRYPTOPIA,ETHFINEX,HUOBI,KRAKEN,LUNO"]],
    [26, ["0.056390", "87.890628", "BITFINEX,BITTREX,ETHFINEX,EXMO,GDAX,HUOBI,KRAKEN,QRYPTOS,RIGHTBTC,WEX"]],
    [27, ["0.056380", "42.867022", "BITFINEX,COINBENE,ETHFINEX,GDAX,HUOBI,LBANK,LIQUI,OKEX,RIGHTBTC"]],
    [28, ["0.056370", "196.489507", "BINANCE,BITBANK,BITFINEX,BITZ,ETHFINEX,GDAX,HUOBI,KUCOIN,OKEX"]],
    [29, ["0.056360", "116.937606", "BINANCE,GDAX,HUOBI,KRAKEN,OOOBTC,YOBIT,ZBCOM"]],
    [30, ["0.056350", "243.824950", "BINANCE,BITFINEX,COINBENE,COINEX,ETHFINEX,GDAX,HUO…,KRAKEN,LIQUI,OKEX,OOOBTC,POLONIEX,RIGHTBTC,ZBCOM"]],
    [31, ["0.056340", "57.615363", "BIBOX,BINANCE,BITFINEX,BITTREX,ETHFINEX,GEMINI,HUOBI,KRAKEN,LIQUI,OKEX,POLONIEX,RIGHTBTC"]],
    [32, ["0.056330", "134.618913", "BITBANK,BITFINEX,BITLISH,BITTREX,ETHFINEX,GDAX,HITBTC,HUOBI,INDODAX,KRAKEN,LIQUI,OKEX,RIGHTBTC"]],
    [33, ["0.056320", "571.805039", "BINANCE,BITFINEX,BITLISH,BITSTAMP,COINUT,ETHFINEX,ODAX,KRAKEN,LBANK,LIQUI,OKEX,RIGHTBTC,YOBIT,ZBCOM"]],
    [34, ["0.056310", "162.867853", "BINANCE,ETHFINEX,GDAX,GEMINI,HUOBI,KRAKEN,LBANK,OKEX,OOOBTC,POLONIEX,THEROCKTRADING,WEX,YOBIT"]],
    [35, ["0.056300", "2.692719", "OOOBTC,QRYPTOS"]],
    [36, ["0.056250", "0.088887", "CRYPTOPIA"]]
]);

const AllOrders = [ 
    [ 0.05598, 38.5353, 'Sell' ],
    [ 0.05602, 38.2899, 'Sell' ],
    [ 0.05607, 31.6107, 'Sell' ],
    [ 0.05613, 4.58, 'Sell' ],
    [ 0.05616, 5.348332, 'Sell' ],
    [ 0.05618, 48.983591, 'Sell' ],
    [ 0.05619, 0.375525, 'Sell' ],
    [ 0.05621, 0.509501, 'Sell' ],
    [ 0.05622, 0.45, 'Sell' ],
    [ 0.05623, 33.1087, 'Sell' ],
    [ 0.05625, 15, 'Sell' ],
    [ 0.0564, 0.725636, 'Sell' ],
    [ 0.05641, 2.08, 'Sell' ],
    [ 0.05644, 0.527551, 'Sell' ],
    [ 0.05645, 3.301883, 'Sell' ],
    [ 0.05646, 1.075877, 'Sell' ],
    [ 0.05647, 5.355121, 'Sell' ],
    [ 0.05648, 16.56485, 'Sell' ],
    [ 0.05649, 137.467738, 'Sell' ],
    [ 0.0565, 267.503401, 'Sell' ],
    [ 0.05651, 12.183912, 'Sell' ],
    [ 0.05652, 131.170038, 'Sell' ],
    [ 0.05653, 27.440091, 'Sell' ],
    [ 0.05654, 11.658855, 'Sell' ],
    [ 0.05655, 198.709572, 'Sell' ],
    [ 0.05656, 48.414833, 'Sell' ],
    [ 0.05657, 337.265529, 'Sell' ],
    [ 0.05658, 117.590932, 'Sell' ],
    [ 0.05659, 111.579327, 'Sell' ],
    [ 0.0566, 144.119634, 'Sell' ],
    [ 0.05661, 166.945563, 'Sell' ],
    [ 0.05662, 60.917347, 'Sell' ],
    [ 0.05801, 3.200578, 'Buy' ],
    [ 0.058, 0.519333, 'Buy' ],
    [ 0.05793, 0.010132, 'Buy' ],
    [ 0.05791, 0.141181, 'Buy' ],
    [ 0.05783, 0.011197, 'Buy' ],
    [ 0.0572, 0.004032, 'Buy' ],
    [ 0.057, 2.316119, 'Buy' ],
    [ 0.05689, 0.006344, 'Buy' ],
    [ 0.05669, 0.23, 'Buy' ],
    [ 0.05668, 0.018, 'Buy' ],
    [ 0.05665, 0.012, 'Buy' ],
    [ 0.05663, 0.1, 'Buy' ],
    [ 0.05662, 0.067, 'Buy' ],
    [ 0.05659, 0.0036, 'Buy' ],
    [ 0.05658, 30, 'Buy' ],
    [ 0.05656, 14.213778, 'Buy' ],
    [ 0.05651, 6, 'Buy' ],
    [ 0.0565, 6.5051, 'Buy' ],
    [ 0.05649, 3.577169, 'Buy' ],
    [ 0.05646, 2.645, 'Buy' ],
    [ 0.05645, 0.575161, 'Buy' ],
    [ 0.05644, 5.544292, 'Buy' ],
    [ 0.05643, 12.69, 'Buy' ],
    [ 0.05642, 0.106895, 'Buy' ],
    [ 0.05641, 4.590461, 'Buy' ],
    [ 0.0564, 52.604524, 'Buy' ],
    [ 0.05639, 87.890628, 'Buy' ],
    [ 0.05638, 42.867022, 'Buy' ],
    [ 0.05637, 196.489507, 'Buy' ],
    [ 0.05636, 116.937606, 'Buy' ],
    [ 0.05635, 243.82495, 'Buy' ],
    [ 0.05634, 57.615363, 'Buy' ],
    [ 0.05633, 134.618913, 'Buy' ],
    [ 0.05632, 571.805039, 'Buy' ],
    [ 0.05631, 162.867853, 'Buy' ],
    [ 0.0563, 2.692719, 'Buy' ],
    [ 0.05625, 0.088887, 'Buy' ] 
];

describe('test', () => {
    //sort order is tested in each new function as the wrong sort in any function can break the chart
    
    test('IQR function returns the same Snapshot', () => {
        const iqr = getInnerQuartileRangeOrders(AllOrders)
        expect(iqr).toMatchSnapshot()
    });

    test('Data is partitioned back into orignal order buy and sells', () => {
        const iqr = getInnerQuartileRangeOrders(AllOrders)
        const [buys, sells] = partitionBuysSells(iqr, 'Buy', 'Sell')

        expect(
            buys.every((buyTriplet)=> buyTriplet[2] === 'Buy')
        ).toBe(true)

        buys.forEach((buyTriplet, idx) => {
            if(idx > 0){
                expect(buyTriplet[0]).toBeLessThanOrEqual(buys[idx-1][0])
            } 
        })

        expect(
            sells.every((sellTriplet)=> sellTriplet[2] === 'Sell')
        ).toBe(true)

        sells.forEach((sellTriplet, idx) => {
            if(idx > 0){
                expect(sellTriplet[0]).toBeGreaterThanOrEqual(sells[idx-1][0])
            } 
        })
    })

    test('Sell data comes in Low to High and cumulative size is done on that same order', () => {
        const iqr = getInnerQuartileRangeOrders(AllOrders)
        const [, sells] = partitionBuysSells(iqr, 'Buy', 'Sell');
        const sellDepthData = getSellDepthData(sells);

        sellDepthData.forEach(
            ({x}, i) => {
                if (i > 0) {
                    expect(x).toBeGreaterThanOrEqual(sellDepthData[i-1].x)
                }
            }
        )

        expect(sells[0][1]).toEqual(sellDepthData[0].y)

        let _size = 0;
        sells.forEach(
            ([, size], i) => {
                _size += size;
                expect(_size).toEqual(sellDepthData[i].y)
            }
        )        
    })

    test('Buy data comes in High to Low and cumulative size is done on that same order', () => {
        const iqr = getInnerQuartileRangeOrders(AllOrders)
        const [buys, ] = partitionBuysSells(iqr, 'Buy', 'Sell');
        const buyDepthData = getBuyDepthData(buys);
        buyDepthData.forEach(
            ({x}, i) => {
                if (i > 0) {
                    expect(x).toBeGreaterThanOrEqual(buyDepthData[i-1].x)
                }
            }
        )
        //buys first size is equal to buyDepthData last size
        expect(buys[0][1]).toEqual(buyDepthData[buyDepthData.length - 1].y)

        //computes size in reverse
        buyDepthData.reverse()
        let _size = 0;
        buys.forEach(
            ([, size], i) => {
                _size += size;
                expect(_size).toEqual(buyDepthData[i].y)
            }
        )        
    })

    test('Snapshot of market depth output is consistent based on inputs', () => {
        const result = getDepthData(Asks, Bids, 100)
        expect(result).toMatchSnapshot()
    })

    // buys and sells both low to high as highcharts requires it. Highcharts will reverse the buys.
    test('Market Depth returns buys ordered low to high; size is biggest to smallest', () => {
        const [sellDepthData] = getDepthData(Asks, Bids, 100)
        sellDepthData.forEach(
            ({x}, i) => {
                if (i > 0) {
                    expect(x).toBeGreaterThanOrEqual(sellDepthData[i-1].x)
                }
            }
        )
    })

    test('Market Depth returns sells ordered low to high; size is smallest to biggest', () => {
        const [, buyDepthData] = getDepthData(Asks, Bids, 100)
        buyDepthData.forEach(
            ({x}, i) => {
                if (i > 0) {
                    expect(x).toBeGreaterThanOrEqual(buyDepthData[i-1].x)
                }
            }
        )
    })

    test('Midmarket is avg of top buy and top sell', () => {
        const [sellDepthData, buyDepthData, midmarket] = getDepthData(Asks, Bids, 100)
        expect(midmarket).toBe(((buyDepthData[0].x + sellDepthData[0].x)/2).toFixed(8))
    })
});