import React from 'react';
import * as am4core from '@amcharts/amcharts4/core';
/*
export const HexColors = [
    '#000000',
    '#00031a',
    '#06062c',
    '#03083d',
    '#040b50',
    '#060d63',
    '#071176',
    '#091289',
    '#09159c',
    '#0a18b0',
    '#0c1ac4',
    '#0c1dd8',
    '#0d20ec',
    '#0e22fa',
    '#132afb',
    '#1b36fb',
    '#2344fb',
    '#2d55fc',
    '#3867fc',
    '#4379fb',
    '#508cfc',
    '#5ca0fc',
    '#68b3fd',
    '#75c6fc',
    '#82dbfd',
    '#8feffd',
    '#9afefe',
    '#a7fefe',
    '#bdfefe',
    '#d0ffff',
    '#e5ffff'
];
*/
export const HexColors = [
    '#000e4f',
    '#001463',
    '#001a76',
    '#00208b',
    '#00269d',
    '#002db3',
    '#0032c6',
    '#0038da',
    '#003eee',
    '#0041f6',
    '#0041f6',
    '#0041f6',
    '#0048f7',
    '#005af7',
    '#006cf7',
    '#007ef8',
    '#0191f8',
    '#00a5f9',
    '#00b8fa',
    '#02cbfb',
    '#09dffc',
    '#21f3fd',
    '#f50219',
    '#ee0019',
    '#e70017',
    '#df0016',
    '#d80115',
    '#d20014',
    '#ca0013',
    '#c60013',
    '#c00012',
    '#c10112',
    '#c30112',
    '#c20112',
    '#be0011',
    '#b60110',
    '#a8000e',
    '#99000b',
    '#890109',
    '#790107',
    '#6b0006',
    '#5c0004',
    '#4d0003',
    '#3d0002'
];
export const getChartColors = (count) => {
    // const spacer = 31.0 / (1 + count);
    let colors = [];
    for (let i = 0; i < count; i++) {
        // colors.push(am4core.color(HexColors[Math.round((i + 1) * spacer) - 1]));
        colors.push(am4core.color(HexColors[i >= HexColors.length ? HexColors.length - 1 : i]));
    }
    return colors;
};