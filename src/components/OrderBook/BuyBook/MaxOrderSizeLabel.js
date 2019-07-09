import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { Tooltip } from 'react-tippy';
import { STORE_KEYS } from '../../../stores';

const Wrapper = styled.div`
    display: flex;
    padding-right: 10px;
    .arrow {
        flex: 1;
        text-align: center;
        svg {
            width: 20px;
            fill: ${props => props.theme.palette.clrPurple};
        }
    }
`;

class MaxOrderSizeLabel extends Component {
    state = {};
    render() {
        const { maxOrderSize, maxOrderAmount } = this.props[STORE_KEYS.ORDERBOOKBREAKDOWN];
        return (
            <Tooltip
                arrow={true}
                animation="fade"
                position="right"
                placement="right"
                distance={10}
                theme="bct"
                className="full-width"
                html={(
                    <div>
                        MAX ORDER SIZE
                    </div>
                )}
                popperOptions={
                    {
                        modifiers: {
                            preventOverflow: {
                                enabled: false,
                            },
                            flip: {
                                enabled: false,
                            },
                            hide: {
                                enabled: false,
                            },
                        },
                    }
                }
            >
                <Wrapper className="max-order-size-wrapper">
                    {/*
                    <FormattedMessage
                        id="order_book.buy_book.label_max_order_size"
                        defaultMessage="MAX ORDER SIZE: "
                    />
                    */}
                    <span>{maxOrderAmount}</span>
                    <span className="arrow">
                        <svg className="exch-form__switch-arrows" viewBox="0 0 8.8106 6.7733">
                            <g transform="translate(0 -290.23)" strokeMiterlimit="10" strokeWidth=".26327">
                                <path d="m2.1205 292.68h4.6888v0.93039c0 0.0419 0.015007 0.0782 0.045808 0.10899 0.030802 0.0305 0.067133 0.0461 0.10899 0.0461 0.045019 0 0.082403-0.0145 0.11136-0.0434l1.5506-1.5509c0.028959-0.0287 0.043439-0.0661 0.043439-0.11136 0-0.045-0.014481-0.0821-0.043702-0.1111l-1.5454-1.5459c-0.038963-0.0321-0.077664-0.0484-0.11663-0.0484-0.045282 0-0.082403 0.0145-0.1111 0.0437-0.028959 0.0287-0.043439 0.0661-0.043439 0.11136v0.93038h-4.6888c-0.042123 0-0.078454 0.015-0.10899 0.0458-0.030539 0.0311-0.046072 0.0671-0.046072 0.10926v0.93012c0 0.0421 0.015533 0.0784 0.046072 0.10926 0.030539 0.0303 0.06687 0.0458 0.10899 0.0458z"/>
                                <path d="m6.6807 294.54h-4.6888v-0.93038c0-0.0421-0.015269-0.0785-0.045545-0.10873-0.031065-0.0308-0.067133-0.0463-0.10926-0.0463-0.045282 0-0.082139 0.0145-0.11163 0.0437l-1.5504 1.5504c-0.028959 0.0292-0.043439 0.0661-0.043439 0.11137 0 0.0421 0.01448 0.0774 0.043439 0.10662l1.5459 1.5506c0.038437 0.0321 0.0774 0.0482 0.1161 0.0482 0.042123 0 0.07819-0.015 0.10926-0.0458 0.030539-0.0308 0.045545-0.0671 0.045545-0.10925v-0.93013h4.6888c0.041859 0 0.07819-0.0153 0.10899-0.0458 0.030802-0.0308 0.046072-0.0671 0.046072-0.10926v-0.93039c0-0.0419-0.015269-0.0779-0.046072-0.10899-0.030802-0.0303-0.06687-0.0458-0.10899-0.0458z"/>
                            </g>
                        </svg>
                    </span>
                    <span>{maxOrderSize}</span>
                </Wrapper>
            </Tooltip>
        );
    }
}

export default inject(
    STORE_KEYS.ORDERBOOKBREAKDOWN,
)(observer(MaxOrderSizeLabel));
