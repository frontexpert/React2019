import React from 'react';
import partial from 'lodash.partial';
import { inject, observer } from 'mobx-react';
import { FormattedMessage } from 'react-intl';
import { compose } from 'recompose';

import { STORE_KEYS } from '../../../stores';
import { withValueFromEvent } from '../../../utils';
import { MarketOrderContainer } from './MarketOrderContainer';

const MarketOrderSideBySideContainer = ({
    // [STORE_KEYS.INSTRUMENTS]: {
    //     selectedInstrumentPair: [baseSymbol, quoteSymbol],
    // },
    [STORE_KEYS.ORDERBOOK]: {
        base: baseSymbol, quote: quoteSymbol,
    },
    [STORE_KEYS.ORDERENTRY]: {
        MarketOrderBuyForm: {
            amount: buyAmount,
            price: buyPrice,
            setAmount: setMarketBuyAmount,
            enabled: marketOrderFormBuyEnabled,
            submitOrder: marketOrderFormBuySubmit,
            marketOrderPrice: buyEstimatedAmount,
            sliderMax: buySliderMax,
        },
        MarketOrderSellForm: {
            amount: sellAmount,
            price: sellPrice,
            setAmount: setMarketSellAmount,
            enabled: marketOrderFormSellEnabled,
            submitOrder: marketOrderFormSellSubmit,
            marketOrderPrice: sellEstimatedAmount,
            sliderMax: sellSliderMax,
        },
    },
    showModal,
}) => {
    return (
        <React.Fragment>
            <FormattedMessage
                id="order_entry.label_buy"
                defaultMessage="BUY"
            >
                {value1 =>
                    <FormattedMessage
                        id="order_entry.label_lowest_price"
                        defaultMessage="Lowest Price"
                    >
                        {value2 =>
                            <MarketOrderContainer
                                amount={buyAmount}
                                price={buyPrice}
                                sliderMax={buySliderMax}
                                handleAmountChange={partial(withValueFromEvent, setMarketBuyAmount)}
                                orderButtonDisabled={!marketOrderFormBuyEnabled}
                                handleOrder={showModal}
                                // handleOrder={marketOrderFormBuySubmit}
                                orderButtonText={`${value1} ${baseSymbol}`}
                                amountCoin={baseSymbol}
                                baseSymbol={baseSymbol}
                                quoteSymbol={quoteSymbol}
                                isBuy={true}
                                priceLabel={value2}
                                estimatedAmountReceived={buyAmount * buyEstimatedAmount}
                            />
                        }
                    </FormattedMessage>
                }
            </FormattedMessage>
            <FormattedMessage
                id="order_entry.label_sell"
                defaultMessage="SELL"
            >
                {value1 =>
                    <FormattedMessage
                        id="order_entry.label_highest_price"
                        defaultMessage="Highest Price"
                    >
                        {value2 =>
                            <MarketOrderContainer
                                amount={sellAmount}
                                price={sellPrice}
                                sliderMax={sellSliderMax}
                                handleAmountChange={partial(withValueFromEvent, setMarketSellAmount)}
                                orderButtonText={`${value1} ${baseSymbol}`}
                                orderButtonDisabled={!marketOrderFormSellEnabled}
                                amountCoin={baseSymbol}
                                baseSymbol={baseSymbol}
                                quoteSymbol={quoteSymbol}
                                handleOrder={showModal}
                                // handleOrder={marketOrderFormSellSubmit}
                                isBuy={false}
                                priceLabel={value2}
                                estimatedAmountReceived={sellAmount * sellEstimatedAmount}
                            />
                        }
                    </FormattedMessage>
                }
            </FormattedMessage>
        </React.Fragment>
    );
};

export default compose(
    inject(
        STORE_KEYS.ORDERENTRY,
        STORE_KEYS.INSTRUMENTS,
        STORE_KEYS.ORDERBOOK,
    ),
    observer,
)(MarketOrderSideBySideContainer);