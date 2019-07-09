export const InstanceId = process.env.REACT_APP_InstanceId || Math.random().toString(36).replace('0.', '').substring(0, 5);
export const CurrentUser = process.env.REACT_APP_CurrentUser || "devinstance";
export const ProgramId = process.env.REACT_APP_ProgramId || `bctui.${CurrentUser}.${InstanceId}`;
export const Symbols = process.env.REACT_APP_Symbols || ['ETH-BTC']; // We are splitting on the "-" here, if that changes the UI will break
export const ClientId = process.env.REACT_APP_ClientId || "dyatel1";
export const Route = process.env.REACT_APP_Route || "Aggregated";

// Order Side
export const BUY_SIDE = "Buy";
export const SELL_SIDE = "Sell";

// Order Type
export const STOP_ORDER_TYPE = "STOP";
export const LIMIT_ORDER_TYPE = "LIMIT";
export const MARKET_ORDER_TYPE = "MARKET";

// OrderCreated Message Attributes
export const ORDER_CREATED_ORDER_ID = "OrderId";
export const ORDER_CREATED_TICKET_ID = "TicketId";
export const ORDER_CREATED_AMOUNT = "Amount";
export const ORDER_CREATED_PRICE = "Price";
export const ORDER_CREATED_SENT_TIME = "SentTime";
export const ORDER_CREATED_EXCHANGE = "Exchange";
export const ORDER_CREATED_SYMBOL = "Symbol";
export const ORDER_CREATED_SIDE = "Side";

// OrderCreated Message Attributes mapped to corresponding react component attributes

export const ORDER_CREATED_TICKET_ID_MAPPED = "ticketId";
export const ORDER_CREATED_AMOUNT_MAPPED = "size";
export const ORDER_CREATED_SYMBOL_MAPPED = "product";
export const ORDER_CREATED_PRICE_MAPPED = "price";
export const ORDER_CREATED_FEE_MAPPED = "fee";
export const ORDER_CREATED_EXCHANGE_MAPPED = "exchange";
export const ORDER_CREATED_SENT_TIME_MAPPED = "time";
export const ORDER_CREATED_SIDE_MAPPED = "side";

// OrderEvent Message Attributes
export const ORDER_EVENT_ORDER_ID = "OrderId";
export const ORDER_EVENT_ORDER_ID_MAPPED = "orderId";
export const ORDER_EVENT_RESULT = "Result";
export const ORDER_EVENT_EXCHANGE = "Exchange";
export const ORDER_EVENT_MESSAGE = "Message";
export const ORDER_EVENT_SENT_TIME = "SentTime";
export const ORDER_EVENT_FILL_PRICE = "FillPrice";
export const ORDER_EVENT_FILL_SIZE = "FilledSize";

// OrderEvent Message Attributes mapped to corresponding react component attributes
export const ORDER_EVENT_SIZE_MAPPED = "size";
export const ORDER_EVENT_PRICE_MAPPED = "price";
export const ORDER_EVENT_RESULT_MAPPED = "result";
export const ORDER_EVENT_FILL_PRICE_MAPPED = "fillPrice";

// Order Statuses
export const FILLED_ORDER_STATUS = 1;
export const FILLED_ORDER_STATUS_LABEL = "FILLED";
export const PARTIALLY_FILLED_ORDER_STATUS = 2;
export const PARTIALLY_FILLED_ORDER_STATUS_LABEL = "PARTIAL FILL";
export const PENDING_ORDER_STATUS = 3;
export const PENDING_ORDER_STATUS_LABEL = "PENDING";
export const ERROR_ORDER_STATUS = 4;
export const ERROR_ORDER_STATUS_LABEL = "ERROR";
export const CANCELED_ORDER_STATUS = 5;
export const CANCELED_ORDER_STATUS_LABEL = "CANCELED";
export const PENDINGCANCEL_ORDER_STATUS = 6;
export const PENDINGCANCEL_ORDER_STATUS_LABEL = "PENDINGCANCEL";
export const UNKNOWN_ORDER_STATUS_LABEL = "UNKNOWN";
export const CREATED_ORDER_STATUS_LABEL = "CREATED";
export const ORDER_EVENT_COMPLETED_RESULT = FILLED_ORDER_STATUS;
export const ORDER_EVENT_PARTIAL_FILL_RESULT = PARTIALLY_FILLED_ORDER_STATUS;

export const ORDER_STATUS = {
    [FILLED_ORDER_STATUS]: FILLED_ORDER_STATUS_LABEL,
    [PARTIALLY_FILLED_ORDER_STATUS]: PARTIALLY_FILLED_ORDER_STATUS_LABEL,
    [PENDING_ORDER_STATUS]: PENDING_ORDER_STATUS_LABEL,
    [ERROR_ORDER_STATUS]: ERROR_ORDER_STATUS_LABEL,
    [CANCELED_ORDER_STATUS]: CANCELED_ORDER_STATUS_LABEL,
    [PENDINGCANCEL_ORDER_STATUS]: PENDINGCANCEL_ORDER_STATUS_LABEL,
};

export const PORTFOLIO_LABEL_POSITIONS = "Positions";
export const PORTFOLIO_LABEL_AMOUNT = "Amount";
export const PORTFOLIO_LABEL_POSITION = "Position";
export const PORTFOLIO_LABEL_EXCHANGE = "Exchange";
export const PORTFOLIO_LABEL_COIN = "Coin";
export const PORTFOLIO_LABEL_CLIENTID = "ClientId";
export const PORTFOLIO_LABEL_PROGRAMID = "ProgramId";
export const PORTFOLIO_LABEL_SENTTIME = "SentTime";
