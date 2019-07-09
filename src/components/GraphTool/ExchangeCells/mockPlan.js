export default {
    length: 3,
    data:  [
        {
            Bid: 'USD',
            Ask: 'BTC',
            Exchange: 'Binance',
            Price: '0.1234',
            Amount: '1234.5678',
            progress: '100',
            details: [
                {
                    type: 'buy',
                    amount: '0.001',
                    amountReceived: '0.00028',
                },
                {
                    type: 'buy',
                    amount: '0.001',
                    amountReceived: '0.00028',
                },
                {
                    type: 'buy',
                    amount: '0.001',
                    amountReceived: '0.00028',
                },
                {
                    type: 'buy',
                    amount: '0.001',
                    amountReceived: '0.00028',
                },
                {
                    type: 'buy',
                    amount: '0.001',
                    amountReceived: '0.00028',
                },
                {
                    type: 'buy',
                    amount: '0.001',
                    amountReceived: '0.00028',
                },
                {
                    type: 'buy',
                    amount: '0.001',
                    amountReceived: '0.00028',
                }
            ],
        },
        {
            Bid: 'USD',
            Ask: 'BTC',
            Exchange: 'Bitstrap',
            Price: '0.1234',
            Amount: '1234.5678',
            progress: '99',
            details: [
                {
                    type: 'buy',
                    amount: '0.001',
                    amountReceived: '0.00028',
                },
                {
                    type: 'buy',
                    amount: '0.001',
                    amountReceived: '0.00028',
                },
                {
                    type: 'buy',
                    amount: '0.001',
                    amountReceived: '0.00028',
                },
                {
                    type: 'buy',
                    amount: '0.001',
                    amountReceived: '0.00028',
                },
                {
                    type: 'buy',
                    amount: '0.001',
                    amountReceived: '0.00028',
                },
                {
                    type: 'buy',
                    amount: '0.001',
                    amountReceived: '0.00028',
                },
                {
                    type: 'buy',
                    amount: '0.001',
                    amountReceived: '0.00028',
                }
            ],
        },
        {
            Bid: 'USD',
            Ask: 'BTC',
            Exchange: 'Bitfinex',
            Price: '0.1234',
            Amount: '1234.5678',
            progress: '80',
            details: [
                {
                    type: 'buy',
                    amount: '0.001',
                    amountReceived: '0.00028',
                },
                {
                    type: 'buy',
                    amount: '0.001',
                    amountReceived: '0.00028',
                },
                {
                    type: 'buy',
                    amount: '0.001',
                    amountReceived: '0.00028',
                },
                {
                    type: 'buy',
                    amount: '0.001',
                    amountReceived: '0.00028',
                },
                {
                    type: 'sell',
                    amount: '0.001',
                    amountReceived: '0.00028',
                },
                {
                    type: 'sell',
                    amount: '0.001',
                    amountReceived: '0.00028',
                },
                {
                    type: 'sell',
                    amount: '0.001',
                    amountReceived: '0.00028',
                }
            ],
        }
    ],

    get(i) {
        return this.data[i]
    },
}