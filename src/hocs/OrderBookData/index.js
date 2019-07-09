import {AggregatedSummaryBooks} from 'bct-ui-satori';
import SatoriDataContainer from '../SatoriData/index';
import {normalizeOrderData, getSpreadData} from './orderBookDataMapper'

// TEMPORARILY HARDCODE UNTIL DATA CHANNELS ARE SETUP
import {Symbols} from '../../config/constants';


const identity=x=>x;
const throttleMs = 45;

export const ASKS_KEY = Symbol();
const BIDS_KEY = Symbol();
const SPREAD_KEY = Symbol();

const nextStateReducer = (
    prevState=[], 
    {
        body: {
            messages: [
                {
                    Asks=[], 
                    Bids=[],
                }={}
            ]=[],
        }={},
    }={}
) => {
    return {
        [ASKS_KEY]: normalizeOrderData(Asks),
        [BIDS_KEY]: normalizeOrderData(Bids),
        [SPREAD_KEY]: getSpreadData({Asks, Bids}),
    }
};

const MapToProps = ({
    sellBookPropName,
    buyBookPropName,
    spreadPropName,
    sellBookMap,
    buyBookMap,
    spreadMap,
}) => ({[ASKS_KEY]:asks, [BIDS_KEY]:bids, [SPREAD_KEY]:spread}) => {
    return {
        [sellBookPropName]: sellBookMap(asks),
        [buyBookPropName]: buyBookMap(bids),
        [spreadPropName]: spreadMap(spread),   
    }
};

export const withOrderBookData = ({
    sellBookPropName='',
    buyBookPropName='',
    spreadPropName='',
    sellBookMap=identity,
    buyBookMap=identity,
    spreadMap=identity, 
}) => {
    const initial = [];
    const observable = AggregatedSummaryBooks({
        Symbols,
        throttleMs,
    });

    const mapToProps = MapToProps({
        sellBookPropName, buyBookPropName, spreadPropName, 
        sellBookMap, buyBookMap, spreadMap,
    });

    return SatoriDataContainer({
        initial,
        observable,
        nextStateReducer,
        mapToProps,
    });
};