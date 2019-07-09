import OrderBookStore from './OrderBook';
import RecentTradesStore from './RecentTrades';
import ThemeStore from './Theme';
import TradingType from './TradingType';
import SnackbarStore from './SnackbarStore';
import YourAccountStore from './YourAccountStore';
import ModalStore from './ModalStore';
import OrderHistory from './OrderHistory';
import InstrumentsStore from './InstrumentStore'
import SessionStore from './SessionStore';
import WindowSize from './WindowSize';
import GridStore from './GridStore';
import once from 'lodash.once';


const ORDERBOOK = 'OrderBook'; 
const RECENTTRADES = 'RECENTTRADES'; 
const THEME = 'Theme';
const TRADINGTYPE = 'TradingType';
const SNACKBARSTORE = 'SnackbarStore';
const YOURACCOUNTSTORE = 'YourAccountStore';
const MODALSTORE = 'ModalStore';
const ORDERHISTORY = 'OrderHistory';
const INSTRUMENTS = 'Instruments';
const WINDOWSIZE = 'WindowSize';
const GRIDSTORE = 'GridStore';


export const STORE_KEYS = {
    ORDERBOOK,
    YOURACCOUNTSTORE,
    RECENTTRADES,
    THEME,
    TRADINGTYPE,
    SNACKBARSTORE,
    ORDERHISTORY,
    INSTRUMENTS,
    MODALSTORE,
    WINDOWSIZE,
    GRIDSTORE,
}

export default once(() => {
    const instrumentStore = InstrumentsStore();
    const orderBookStore =  OrderBookStore(instrumentStore);
    const recentTradesStore = RecentTradesStore(instrumentStore);
    
    // not exposed.
    SessionStore(instrumentStore);

    return ({
        [STORE_KEYS.ORDERHISTORY]: OrderHistory(),
        [STORE_KEYS.YOURACCOUNTSTORE]: YourAccountStore(),
        [STORE_KEYS.INSTRUMENTS]: instrumentStore,
        [STORE_KEYS.ORDERBOOK]: orderBookStore,
        [STORE_KEYS.RECENTTRADES]: recentTradesStore,
        [STORE_KEYS.THEME]: ThemeStore(),
        [STORE_KEYS.TRADINGTYPE]: TradingType(),
        [STORE_KEYS.SNACKBARSTORE]: SnackbarStore(),
        [STORE_KEYS.MODALSTORE]: ModalStore(),
        [STORE_KEYS.WINDOWSIZE]: WindowSize(),
        [STORE_KEYS.GRIDSTORE]: GridStore(),
    }) 
});
