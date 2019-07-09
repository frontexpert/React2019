import distanceInWords from 'date-fns/distance_in_words';
import parse from 'date-fns/parse';
import format from 'date-fns/format';
import moment from 'moment';
import findIndex from 'lodash/findIndex';
import { format7DigitString, roundToFixedNum, formatOrderBookDigitString } from '../../utils';

export const isDiffArr = (a = [], b = []) => {
    let i = -1;
    let alen = a.length;

    while (++i < alen) {
        if (a[i] !== b[i]) {
            return true;
        }
    }
    return false;
};

export const updateMapStoreFromArrayForOrderBookAggregated = (mapStore, updateArr, maxRows = 0, isShift = false) => {
    // Aggregate list
    let updateArrAggregated = [];

    for (let k = 0; k < updateArr.length; k++) {
        const price = formatOrderBookDigitString(updateArr[k][0]);
        const amount = Number.parseFloat(updateArr[k][1]);
        const exchangeName = updateArr[k][2];

        const indexFound = findIndex(updateArrAggregated, { 0: price, 2: exchangeName });

        if (indexFound !== -1) {
            updateArrAggregated[indexFound][1] += amount;
        } else {
            updateArrAggregated.push([
                price,
                amount,
                exchangeName
            ]);
        }
    }

    const aggrSize = updateArr.length;
    for (let i = 0; i < aggrSize - 1; i++) {
        updateArr[i][3] = updateArr[i + 1][0];
    }
    if (updateArr[aggrSize - 1]) updateArr[aggrSize - 1][3] = updateArr[aggrSize - 1][0];

    updateMapStoreFromArrayForOrderBook(mapStore, updateArr, maxRows, isShift);
};

export const updateMapStoreFromArrayForOrderBook = (mapStore, updateArr, maxRows = 0, isShift = false) => {
    const aggrSize = updateArr.length;
    for (let i = 0; i < aggrSize - 1; i++) {
        updateArr[i][2] = updateArr[i][2] ? updateArr[i][2].toUpperCase() : '';
        updateArr[i][3] = updateArr[i + 1][0] || 0;
    }
    if (updateArr[aggrSize - 1]) updateArr[aggrSize - 1][3] = updateArr[aggrSize - 1][0];

    let i = isShift ? (updateArr.length - maxRows - 1) : -1;
    let j = 0;
    if (i < -1) i = -1;

    while (updateArr[++i] && i < updateArr.length && j < maxRows) {

        let item = updateArr[i];

        if (mapStore.has(j)) {
            if (isDiffArr(mapStore.get(j), item)) {
                mapStore.set(j, item);
            }
        } else {
            mapStore.set(j, item);
        }

        j++;
    }

    // clear out extraneous items in mapStore (previous items at indices not found in updateArr).
    while (mapStore.has(j)) {
        mapStore.delete(j);
        j++;
    }
};

export const updateMapStoreFromArray = (mapStore, updateArr) => {
    let i = -1;
    while (updateArr[++i] && i < updateArr.length) {

        let item = updateArr[i];

        if (mapStore.has(i)) {
            if (isDiffArr(mapStore.get(i), item)) {
                mapStore.set(i, item);
            }
        } else {
            mapStore.set(i, item);
        }
    }

    // clear out extraneous items in mapStore (previous items at indices not found in updateArr).
    while (mapStore.has(i)) {
        mapStore.delete(i);
        i++;
    }
};

export const shiftMapStoreFromArray = (mapStore = new Map(), updateArr = [], maxRows = 0) => {
    const updateArrLen = updateArr.length;

    if (updateArrLen >= maxRows) {
        let i = -1;
        while (updateArr[++i] && i < maxRows) {
            mapStore.set(i, updateArr[i]);
        }
    } else {
        let tmp = new Map();
        let carryLimit = maxRows - updateArrLen;
        let i = -1;
        let j = updateArrLen - 1;

        // cache old indices
        while (++i < carryLimit && mapStore.has(i) && ++j < maxRows) {
            tmp.set(j, mapStore.get(i));
        }

        // then prepend incoming updateArr to mapStore
        i = -1;
        while (++i < updateArrLen) {
            mapStore.set(i, updateArr[i]);
        }


        for (let [k, v] of tmp) {
            mapStore.set(k, v);
        }
    }
};

export const convertArrToMapWithFilter = (mapStore, updateArr) => {
    let j = 0;

    for (let i = 0; i < updateArr.length; i++) {
        if (updateArr[i] && updateArr[i].Coin !== 'BCT') {
            mapStore.set(j, updateArr[i]);
            j++;
        }
    }
};
// // old get Sell/Buy depth data functions
// export const getSellDepthData = (sells) => {
//     // come in low -> high
//     let totalVol = 0;
//     if (sells[0][0] > sells[sells.length - 1][0]) sells.reverse();

//     return sells.map(([price, size, type]) => {
//         totalVol += size;
//         return {
//             x: price,
//             y: totalVol,
//             type,
//         };
//     });
// };

// export const getBuyDepthData = (buys) => {
//     // come in high -> low
//     let totalVol = 0;
//     // 1st, calc volume - (must cumulate sizes high -> low for buy)
//     if (buys[0][0] < buys[buys.length - 1][0]) buys.reverse();

//     return (
//         buys.map(([price, size, type]) => {
//             totalVol += size;
//             return {
//                 x: price,
//                 y: totalVol,
//                 type,
//             };
//         }).reverse() // resort back to low -> high as highcharts requires this and will not render correctly
//     );
// };

const getSellDepthData = (asks, midPrice, spread, levels) => {
    let sells = [];
    let totalVol = 0;
    let price = asks[0][0];
    let abort = false;
    const step = spread / levels;
    // asks item -> [price, amount, exchangesStr]
    for (let i = 0; i < asks.length && !abort; i++) {
        let askPrice = asks[i][0];
        let askAmount = asks[i][1];
        if (askPrice > midPrice + spread) {
            askPrice = midPrice + spread;
            askAmount = 0;
            abort = true;
        }

        if (askPrice > price) {

            if (askPrice - price > step) {

                while (price < askPrice) {
                    sells.push({
                        x: price,
                        y: totalVol,
                        type: 'Sell',
                    });
                    price += step;
                }
            } else {
                sells.push({
                    x: price,
                    y: totalVol,
                    type: 'Sell',
                });
                price += step;
            }
        }
        totalVol += askAmount;
    }
    return sells;
};

const getBuyDepthData = (bids, midPrice, spread, levels) => {
    let buys = [];
    let totalVol = 0;
    let price = bids[0][0];
    let abort = false;
    const step = spread / levels;
    // bids item -> [price, amount, exchangesStr]
    for (let i = 0; i < bids.length && !abort; i++) {
        let bidPrice = bids[i][0];
        let bidAmount = bids[i][1];
        if (bidPrice < midPrice - spread) {
            bidPrice = midPrice - spread;
            bidAmount = 0;
            abort = true;
        }

        if (bidPrice < price) {

            if (price - bidPrice > step) {

                while (price > bidPrice) {
                    buys.push({
                        x: price,
                        y: totalVol,
                        type: 'Buy',
                    });
                    price -= step;
                }
            } else {
                buys.push({
                    x: price,
                    y: totalVol,
                    type: 'Buy',
                });
                price -= step;
            }
        }
        totalVol += bidAmount;
    }
    return buys.reverse();
};

export const getDepthChartData = (Asks, Bids, spread, levels) => {
    try {
        if (!Asks || !Bids || Asks.length < 1 || Bids.length < 1) {
            return [[], []];
        }

        const midPrice = (Asks[0][0] + Bids[0][0]) / 2;
        if (!spread || spread <= 0) {
            spread = Math.min(Asks[Asks.length - 1][0] - midPrice, midPrice - Bids[Bids.length - 1][0]);
            if (spread < 0) spread = -spread;
        }

        let sells = getSellDepthData(Asks, midPrice, spread, levels);
        let buys = getBuyDepthData(Bids, midPrice, spread, levels);
        let offsetValue = 0;

        if (sells && buys && sells.length > 0 && buys.length > 0) {
            const max = Math.max(buys[0].y, sells[sells.length - 1].y);
            offsetValue = max * 20 / 239;
            /*
             *** apply offset to all depth graph points. ** */
            buys = buys.map((item) => {
                return {
                    x: item.x,
                    y: item.y + offsetValue,
                    type: 'Buy',
                };
            });
            sells = sells.map((item) => {
                return {
                    x: item.x,
                    y: item.y + offsetValue,
                    type: 'Sell',
                };
            });
            /*
             *** push zero items. ** */
            const buy = {
                x: buys[buys.length - 1].x,
                y: 0,
                type: 'Buy',
            };
            const sell = {
                x: sells[0].x,
                y: 0,
                type: 'Sell',
            };

            if (buys[buys.length - 1].y !== 0) buys.push(buy);
            if (sells[0].y !== 0) sells.unshift(sell);
        }

        return [
            sells,
            buys
        ];
    } catch (e) {
        console.log('get DepthData error!', e);
        return [[], []];
    }
};

export const partitionBuysSells = (orders, buyKey, sellKey) => {
    const buys = [];
    const sells = [];

    orders.forEach(
        (order) => {
            const [, , orderType] = order;
            if (orderType === buyKey) {
                buys.push(order);
            }

            if (orderType === sellKey) {
                sells.push(order);
            }
        }
    );

    return [buys, sells];
};

export const getInnerQuartileRangeOrders = (list) => {
    const priceKey = 0;

    if (list.length < 4) return list;

    let values = list.slice();

    let q1; let q3; let iqr; let maxValue; let
        minValue;

    // mutates data; copy made already
    values.sort(function (a, b) {
        return a[priceKey] - b[priceKey];
    });

    if ((values.length / 4) % 1 === 0) { // find quartiles
        q1 = 1 / 2 * (values[(values.length / 4)][priceKey] + values[(values.length / 4) + 1][priceKey]);
        q3 = 1 / 2 * (values[(values.length * (3 / 4))][priceKey] + values[(values.length * (3 / 4)) + 1][priceKey]);
    } else {
        q1 = values[Math.floor(values.length / 4 + 1)][priceKey];
        q3 = values[Math.ceil(values.length * (3 / 4) + 1)][priceKey];
    }

    iqr = q3 - q1;
    maxValue = q3 + iqr * 1.5;
    minValue = q1 - iqr * 1.5;

    return list.filter((x) => (x[priceKey] >= minValue) && (x[priceKey] <= maxValue));
};

export const initRequest = (RequestInit, throttleMs, makeRequest) => {
    return RequestInit({ throttleMs }).then(makeRequest);
};

export const formatNumForDisplay = (num) => roundToFixedNum(num, 2);

export const calculateFee = (size, price, precision) => formatNumForDisplay(size * price * 0.001, precision);

export const getTimeFormatted = (time) => distanceInWords(
    parse(time),
    new Date(),
    { includeSeconds: true }
);

export const scheduleVisualDOMUpdate = fn => {
    requestAnimationFrame(() => {
        requestAnimationFrame(fn);
    });
};

export const getDateFormatted = (time) => format(new Date(time), 'MM.DD.YYYY');

export const getNewDateFormatted = (time) => {
    return moment(time).format('MMM D');
};
