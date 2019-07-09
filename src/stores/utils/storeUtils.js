import {roundToFixedNum} from "../../utils";
import distanceInWords from "date-fns/distance_in_words";
import parse from "date-fns/parse";

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

export const updateMapStoreFromArray = (mapStore, updateArr, maxRows = 0) => {
    let i = -1;
    while (updateArr[++i] && i < maxRows) {

        let item = updateArr[i];

        if (mapStore.has(i)) {
            if (isDiffArr(mapStore.get(i), item)) {
                mapStore.set(i, item)
            }
        }
        else {
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
    }
    else {
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

export const getSellDepthData = (sells) => {
    //come in low -> high
    let totalVol = 0;
    return sells.reverse().map(([price, size, type]) => {
        totalVol += size;
        return {
            x: price,
            y: totalVol,
            type,
        };
    });
};

export const getBuyDepthData = (buys) => {
    //come in high -> low
    let totalVol = 0;
    // 1st, calc volume - (must cumulate sizes high -> low for buy)
    return (
        buys.map(([price, size, type]) => {
            totalVol += size;
            return {
                x: price,
                y: totalVol,
                type,
            };
        }).reverse() //resort back to low -> high as highcharts requires this and will not render correctly
    )
};


export const partitionBuysSells = (orders, buyKey, sellKey) => {
    const buys = [];
    const sells = [];

    orders.forEach(
        (order) => {
            const [, , orderType] = order;
            if (orderType === buyKey) {
                buys.push(order)
            }

            if (orderType === sellKey) {
                sells.push(order)
            }
        }
    );

    return [buys, sells]
};

export const getInnerQuartileRangeOrders = (list) => {
    const priceKey = 0;

    if (list.length < 4) return list;

    let values = list.slice();

    let q1, q3, iqr, maxValue, minValue;

    //mutates data; copy made already
    values.sort(function (a, b) {
        return a[priceKey] - b[priceKey]
    });

    if ((values.length / 4) % 1 === 0) {//find quartiles
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
    return RequestInit({throttleMs}).then(makeRequest);
};

export const formatNumForDisplay = (num) => roundToFixedNum(num, 6);

export const calculateFee = (size, price, precision) => formatNumForDisplay(size * price * 0.001, precision);

export const getTimeFormatted = (time) => distanceInWords(
    parse(time),
    new Date(),
    {includeSeconds: true}
);