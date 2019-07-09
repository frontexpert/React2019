import math from '../lib/mathjs/math'

export const splitAmtOnDecimal = (amt) => {
    // whole number case; returns empty string as digitsAfterDecimal
    if(amt.toString() === parseFloat(amt).toFixed(0)){
        return [amt.toString(), '']
    }
    else{
        const [ digitsBeforeDecimal, digitsAfterDecimal ] = amt.toString().split('.');
        return [digitsBeforeDecimal, digitsAfterDecimal]
    }
};

export const roundToFixedNum = (amt, decimals) => {
    const roundedNum = math.round(amt, decimals);
    return roundedNum.toFixed(decimals)
};

export const fillUntil = (limit=0, mapFn) => {
    let i = -1;
    let items = [];
    while(++i < limit) items.push(mapFn(i));
    return items;
};

export const pageIsVisible = (() => {
    let hidden; 
    if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support 
        hidden = "hidden";
    } 
    else if (typeof document.msHidden !== "undefined") {
        hidden = "msHidden";
    } else if (typeof document.webkitHidden !== "undefined") {
        hidden = "webkitHidden";
    }

    return () => !document[hidden];
})();