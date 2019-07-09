import once from 'lodash.once';
import OrderBookBreakDownStore from './OrderBookBreakDown';
import OrderBookStore from './OrderBook';
import RecentTradesStore from './RecentTrades';
import SnackbarStore from './SnackbarStore';
import YourAccountStore from './YourAccountStore';
import ModalStore from './ModalStore';
import OrderHistory from './OrderHistory';
import InstrumentsStore from './InstrumentStore';
import SessionStore from './SessionStore';
import WindowSize from './WindowSize';
import ViewModeStore from './ViewModeStore';
import PeriodStore from './PeriodStore';
import ConvertStore from './ConvertStore';
import RightLowerSectionGridStore from './RightLowerSectionGridStore';
import OrderEntryStore from './OrderEntryStore';
import MarketDataGraphStore from './MarketDataGraph';
import CoinPriceStore from './CoinPriceStore';
import RouterStore from './Router';
import OrderFormToggle from './OrderFormToggle';
import ApplicationStore from './Applications';
import LowestExchangeStore from './LowestExchangeStore';
import OrderEventsStore from './OrderEvents';
import CoinAddressStore from './CoinAddressStore';
import TelegramStore from './TelegramStore';
import TelegramPublicStore from './TelegramPublicStore';
import CoinHistoryStore from './CoinHistoryStore';
import ArbitrageStore from './ArbitrageStore';
import PortfolioDataStore from './PortfolioDataStore';
import SettingsStore from './SettingsStore';
import TradingViewStore from './TradingViewStore';
import ExchangesStore from './ExchangesStore';
import PaymentStore from './PaymentStore';
import PriceChartStore from './PriceChartStore';
import CoinTransferStore from './CoinTransferStore';
import SendCoinStore from './SendCoinStore';
import PayWindowStore from './PayWindowStore';
import PayAppStore from './PayAppStore';
import SMSAuthStore from './SMSAuthStore';
import MarketsStore from './MarketsStore';
import BillChipStore from './BillChipStore';
import NetworkStore from './NetworkStore';

const ORDERBOOK = 'OrderBook';
const ORDERBOOKBREAKDOWN = 'OrderBookBreakDown';
const RECENTTRADES = 'RECENTTRADES';
const SNACKBARSTORE = 'SnackbarStore';
const YOURACCOUNTSTORE = 'YourAccountStore';
const MODALSTORE = 'ModalStore';
const ORDERHISTORY = 'OrderHistory';
const INSTRUMENTS = 'Instruments';
const WINDOWSIZE = 'WindowSize';
const VIEWMODESTORE = 'ViewModeStore';
const PERIODSTORE = 'PeriodStore';
const RIGHTLOWERSECTIONGRIDSTORE = 'RightLowerSectionGridStore';
const ORDERENTRY = 'OrderEntry';
const CONVERTSTORE = 'ConvertStore';
const MARKETDATAGRAPH = 'MarketDataGraphStore';
const COINPRICESTORE = 'CoinPriceStore';
const COINHISTORYSTORE = 'CoinHistoryStore';
const ROUTER = 'RouterStore';
const ORDERFORMTOGGLE = 'OrderFormToggle';
const APPLICATIONS = 'ApplicationStore';
const LOWESTEXCHANGESTORE = 'LowestExchangeStore';
const ORDEREVENTS = 'OrderEventsStore';
const COINADDRESSSTORE = 'CoinAddressStore';
const TELEGRAMSTORE = 'TelegramStore';
const TELEGRAMPUBLICSTORE = 'TelegramPublicStore';
const ARBITRAGESTORE = 'ArbitrageStore';
const PORTFOLIODATASTORE = 'PortfolioDataStore';
const SETTINGSSTORE = 'SettingsStore';
const SESSIONSTORE = 'SessionStore';
const TRADINGVIEWSTORE = 'TradingViewStore';
const EXCHANGESSTORE = 'ExchangesStore';
const PAYMENTSTORE = 'PaymentStore';
const PRICECHARTSTORE = 'PriceChartStore';
const COINTRANSFERSTORE = 'CoinTransferStore';
const SENDCOINSTORE = 'SendCoinStore';
const PAYWINDOWSTORE = 'PayWindowStore';
const PAYAPPSTORE = 'PayAppStore';
const SMSAUTHSTORE = 'SMSAuthStore';
const MARKETSSTORE = 'MarketsStore';
const BILLCHIPSTORE = 'BillChipStore';
const NETWORKSTORE = 'NetworkStore';

export const STORE_KEYS = {
    ORDERBOOK,
    ORDERBOOKBREAKDOWN,
    YOURACCOUNTSTORE,
    RECENTTRADES,
    SNACKBARSTORE,
    ORDERHISTORY,
    INSTRUMENTS,
    MODALSTORE,
    WINDOWSIZE,
    VIEWMODESTORE,
    PERIODSTORE,
    RIGHTLOWERSECTIONGRIDSTORE,
    ORDERENTRY,
    CONVERTSTORE,
    MARKETDATAGRAPH,
    COINPRICESTORE,
    ROUTER,
    ORDERFORMTOGGLE,
    APPLICATIONS,
    LOWESTEXCHANGESTORE,
    ORDEREVENTS,
    COINADDRESSSTORE,
    COINHISTORYSTORE,
    TELEGRAMSTORE,
    TELEGRAMPUBLICSTORE,
    ARBITRAGESTORE,
    PORTFOLIODATASTORE,
    SETTINGSSTORE,
    SESSIONSTORE,
    TRADINGVIEWSTORE,
    EXCHANGESSTORE,
    PAYMENTSTORE,
    PRICECHARTSTORE,
    COINTRANSFERSTORE,
    SENDCOINSTORE,
    PAYWINDOWSTORE,
    PAYAPPSTORE,
    SMSAUTHSTORE,
    MARKETSSTORE,
    BILLCHIPSTORE,
    NETWORKSTORE,
};

export default once(() => {
    const instrumentStore = InstrumentsStore();
    const modalStore = ModalStore();
    const snackbarStore = SnackbarStore();
    const periodStore = PeriodStore();
    const viewModeStore = ViewModeStore();

    const convertStore = ConvertStore(snackbarStore.Snackbar);
    const yourAccountStore = YourAccountStore(instrumentStore);
    const billChipStore = BillChipStore(yourAccountStore);
    const orderHistoryStore = OrderHistory(instrumentStore);
    const exchangesStore = ExchangesStore(instrumentStore);
    const marketsStore = MarketsStore();
    const orderBookStore = OrderBookStore(instrumentStore, viewModeStore, exchangesStore, convertStore, marketsStore);
    const orderBookBreakDownStore = OrderBookBreakDownStore(instrumentStore, exchangesStore, convertStore, yourAccountStore, marketsStore);
    const recentTradesStore = RecentTradesStore(instrumentStore);
    const rightRightLowerSectionGridStore = RightLowerSectionGridStore(
        orderHistoryStore.setTargetTradeHistoryTicket,
        modalStore.Modal,
    );
    const marketDataGraphStore = MarketDataGraphStore(instrumentStore, periodStore);
    const coinPriceStore = CoinPriceStore(instrumentStore);
    const arbitrageStore = ArbitrageStore(instrumentStore);
    const orderEntryStore = OrderEntryStore(
        orderBookBreakDownStore.AsksForOrderBook,
        orderBookBreakDownStore.BidsForOrderBook,
        () => orderBookStore.highestBidPrice,
        () => orderBookStore.lowestAskPrice,
        instrumentStore.instrumentsReaction,
        snackbarStore.Snackbar,
        orderHistoryStore.setTargetTradeHistoryTicket,
        coinPriceStore,
        yourAccountStore,
    );
    const telegramStore = TelegramStore(yourAccountStore, snackbarStore.Snackbar);
    const settingsStore = SettingsStore(telegramStore, yourAccountStore);
    const portfolioDataStore = PortfolioDataStore(settingsStore);
    const lowestExchangeStore = LowestExchangeStore(orderEntryStore.CoinsPairSearchMarketOrderBuyForm, orderBookStore, snackbarStore.Snackbar, telegramStore);
    const telegramPublicStore = TelegramPublicStore(instrumentStore, telegramStore, viewModeStore);
    const sessionStore = SessionStore(instrumentStore, yourAccountStore);
    const priceChartStore = PriceChartStore(instrumentStore, settingsStore, marketsStore);
    const smsAuthStore = SMSAuthStore(snackbarStore.Snackbar);
    const networkStore = NetworkStore(settingsStore);

    return ({
        [STORE_KEYS.ORDERHISTORY]: orderHistoryStore,
        [STORE_KEYS.YOURACCOUNTSTORE]: yourAccountStore,
        [STORE_KEYS.INSTRUMENTS]: instrumentStore,
        [STORE_KEYS.ORDERBOOK]: orderBookStore,
        [STORE_KEYS.ORDERBOOKBREAKDOWN]: orderBookBreakDownStore,
        [STORE_KEYS.RECENTTRADES]: recentTradesStore,
        [STORE_KEYS.SNACKBARSTORE]: snackbarStore,
        [STORE_KEYS.MODALSTORE]: modalStore,
        [STORE_KEYS.WINDOWSIZE]: WindowSize(),
        [STORE_KEYS.VIEWMODESTORE]: viewModeStore,
        [STORE_KEYS.PERIODSTORE]: periodStore,
        [STORE_KEYS.RIGHTLOWERSECTIONGRIDSTORE]: rightRightLowerSectionGridStore,
        [STORE_KEYS.ORDERENTRY]: orderEntryStore,
        [STORE_KEYS.CONVERTSTORE]: convertStore,
        [STORE_KEYS.MARKETDATAGRAPH]: marketDataGraphStore,
        [STORE_KEYS.COINPRICESTORE]: coinPriceStore,
        [STORE_KEYS.ROUTER]: RouterStore(),
        [STORE_KEYS.ORDERFORMTOGGLE]: OrderFormToggle(),
        [STORE_KEYS.APPLICATIONS]: ApplicationStore(),
        [STORE_KEYS.LOWESTEXCHANGESTORE]: lowestExchangeStore,
        [STORE_KEYS.ORDEREVENTS]: OrderEventsStore(),
        [STORE_KEYS.COINADDRESSSTORE]: CoinAddressStore(),
        [STORE_KEYS.TELEGRAMSTORE]: telegramStore,
        [STORE_KEYS.TELEGRAMPUBLICSTORE]: telegramPublicStore,
        [STORE_KEYS.COINHISTORYSTORE]: CoinHistoryStore(),
        [STORE_KEYS.ARBITRAGESTORE]: arbitrageStore,
        [STORE_KEYS.PORTFOLIODATASTORE]: portfolioDataStore,
        [STORE_KEYS.SETTINGSSTORE]: settingsStore,
        [STORE_KEYS.SESSIONSTORE]: sessionStore,
        [STORE_KEYS.TRADINGVIEWSTORE]: TradingViewStore(),
        [STORE_KEYS.EXCHANGESSTORE]: exchangesStore,
        [STORE_KEYS.PAYMENTSTORE]: PaymentStore(),
        [STORE_KEYS.PRICECHARTSTORE]: priceChartStore,
        [STORE_KEYS.COINTRANSFERSTORE]: CoinTransferStore(),
        [STORE_KEYS.SENDCOINSTORE]: SendCoinStore(snackbarStore.Snackbar),
        [STORE_KEYS.PAYWINDOWSTORE]: PayWindowStore(),
        [STORE_KEYS.PAYAPPSTORE]: PayAppStore(),
        [STORE_KEYS.SMSAUTHSTORE]: smsAuthStore,
        [STORE_KEYS.MARKETSSTORE]: marketsStore,
        [STORE_KEYS.BILLCHIPSTORE]: billChipStore,
        [STORE_KEYS.NETWORKSTORE]: networkStore,
    });
});
