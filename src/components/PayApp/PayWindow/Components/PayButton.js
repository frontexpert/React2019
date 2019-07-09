import React, { Component } from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

const SendButtonDefault = styled.div`
    flex: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid ${props => props.theme.palette.clrBlue};
    height: 100%;
    background: ${props => props.theme.palette.clrBlue};
    border-radius: ${props => props.theme.palette.borderRadius};
    cursor: pointer;
    font-size: 30px;
    font-weight: 700;
    
    &.is-sending {
        background: ${props => props.theme.palette.clrBackground};
        border: 1px solid ${props => props.theme.palette.clrBorderHover};
    }
    
    &.is-submitted {
        background: ${props => props.theme.palette.clrGreen};
        border: 1px solid ${props => props.theme.palette.clrGreen};
    }
    
    .price {
        padding-left: 10px;
        display: flex;
        align-items: flex-start;
        
        .symbol {
            font-size: 18px;
            line-height: 18px;
        }
        
        .integer {
            font-size: 28px;
            line-height: 28px;
        }
        
        .decimal {
            font-size: 18px;
            line-height: 18px;
        }
    }
`;

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 75px;
    padding: 0 20px 20px;
    
    &.hidden {
        display: flex !important;
        visibility: hidden !important;
    }
`;

class PayButton extends Component {
    state = {};

    render() {
        const {
            balanceValue, defaultFiatSymbol, convertToQRSection, usdIntegerVal, usdDecimalVal, isDefaultCrypto, defaultCryptoSymbol, className,
        } = this.props;

        return (
            <Wrapper className={className}>
                <SendButtonDefault onClick={convertToQRSection}>
                    <FormattedMessage
                        id="pay_app.pay_window.btn_pay"
                        defaultMessage="Pay"
                    />
                    {
                        balanceValue > 0 &&
                        <span className="price">
                            <span className="symbol">
                                { isDefaultCrypto ? '' : defaultFiatSymbol }
                            </span>
                            <span className="integer">
                                { usdIntegerVal }
                            </span>
                            <span className="decimal">
                                { usdDecimalVal }
                            </span>
                            <span className="integer">
                                { isDefaultCrypto ? ' ' + defaultCryptoSymbol : '' }
                            </span>
                        </span>
                    }
                </SendButtonDefault>
            </Wrapper>
        );
    }
}

export default PayButton;
