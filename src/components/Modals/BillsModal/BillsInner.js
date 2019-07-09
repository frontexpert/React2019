import React from 'react';
import { AutoSizer } from 'react-virtualized';
import { inject, observer } from 'mobx-react';

import { STORE_KEYS } from '../../../stores';
import BillChip from './BillChip';
import {
    BalanceOutline, BillLine, Close, Icon,
    InnerWrapper, StyledReactPanZoom, StyledSlider
} from './Components';
import SMSVerification from '../../../components-generic/SMSVerification3';

import imgX from '../../../components-generic/Modal/x.svg';

const showSMSModal = (Modal, onClose, portal, additionalVerticalSpace) => {
    return Modal({
        portal,
        additionalVerticalSpace,
        showClose: false,
        ModalComponentFn: () => <SMSVerification portal={portal} onClose={onClose} isMobile />,
    });
};

class BillsInner extends React.Component {
    state = {
        zoom: 1,
    };

    changeZoom = (zoom) => {
        this.setState({
            zoom,
        });
    };

    render() {
        const { zoom } = this.state;
        const {
            [STORE_KEYS.BILLCHIPSTORE]: {
                symbol, balance, position, denominations,
            },
            [STORE_KEYS.MODALSTORE]: {
                Modal, onClose,
            },
            isOpen,
        } = this.props;

        let deno = 6;
        for (let i = 0; i < denominations.length; i++) {
            if (denominations[i] && (denominations[i].symbol === symbol)) {
                deno = denominations[i].deno;
                break;
            }
        }

        return (
            <AutoSizer>
                {({ width, height }) => {
                    let bills = [];
                    const row = 8;
                    const col = 9;
                    const h = 852;
                    const chipHeight = Math.floor((h - 50 - 70) / row);
                    const chipWidth = Math.floor(chipHeight * 3192 / 1801);
                    const newWidth = chipWidth * col + 10 * (col - 1); // (chipWidth * 2389 / 3192) * (col - 1) + chipWidth + 16;

                    for (let i = 0; i < row; i++) {
                        const curRowBalance = Math.floor((position / Math.pow(10, deno - i)) % 10);
                        const outLineWidth = chipWidth * curRowBalance + 10 * (curRowBalance - 1) + 8; // (chipWidth * 2389 / 3192) * (curRowBalance - 1) + chipWidth + 8;

                        let singleBill = [];
                        for (let j = 0; j < col; j++) {
                            singleBill.push(
                                <BillChip
                                    key={j}
                                    index={j}
                                    width={chipWidth}
                                    height={chipHeight}
                                    level={i + 1}
                                    symbol={symbol}
                                    deno={deno - i}
                                    disabled={j < col - curRowBalance}
                                    onClick={() => {
                                        if (j >= col - curRowBalance) {
                                            showSMSModal(Modal, onClose, 'root', true);
                                        }
                                    }}
                                />
                            );
                        }

                        bills.push(
                            <BillLine
                                key={i}
                                width={newWidth}
                                height={chipHeight}
                            >
                                {singleBill}

                                {/*
                                {curRowBalance > 0 && (
                                    <BalanceOutline size={outLineWidth} />
                                )}
                                */}
                            </BillLine>
                        );
                    }

                    return (
                        <InnerWrapper realHeight={Math.min(height, h)}>
                            <StyledReactPanZoom
                                width={newWidth}
                                height={h - 50}
                                zoom={zoom}
                            >
                                {bills}
                            </StyledReactPanZoom>

                            <StyledSlider
                                axis="x"
                                x={zoom}
                                xstep={0.02}
                                xmin={1}
                                xmax={3}
                                onChange={({ x }) => this.changeZoom(x)}
                                styles={{
                                    thumb: {
                                        backgroundColor: '#2780ff',
                                    },
                                }}
                            />

                            {isOpen && (
                                <Close onClick={this.props.onClose}>
                                    <Icon src={imgX}/>
                                </Close>
                            )}
                        </InnerWrapper>
                    );
                }}
            </AutoSizer>
        );
    }
}

export default inject(
    STORE_KEYS.BILLCHIPSTORE,
    STORE_KEYS.MODALSTORE
)(observer(BillsInner));
