import React, { Fragment } from 'react';
import { AutoSizer } from 'react-virtualized';
import { inject, observer } from 'mobx-react';

import { STORE_KEYS } from '../../../stores';
import BillChip from './BillChip';
import {
    BalanceOutline,
    BillLine,
    InnerWrapper,
    BillsWrapper,
    BalanceCol,
    Close,
    Icon,
    BillDetail
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
        selected: null,
    };

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside = (event) => {
        if (this.state.selected && this.billDetailRef && this.billDetailRef.contains && !this.billDetailRef.contains(event.target)) {
            this.setState({
                selected: null,
            });
        }
    };

    render() {
        const { selected } = this.state;
        const {
            [STORE_KEYS.BILLCHIPSTORE]: {
                symbol, position, denominations, withdrawAmount,
            },
            [STORE_KEYS.MODALSTORE]: {
                Modal, onClose,
            },
            isOpen,
            isFromModal,
            centerPos,
            newPosition,
        } = this.props;

        let deno = 6;
        for (let i = 0; i < denominations.length; i++) {
            if (denominations[i] && (denominations[i].symbol === symbol)) {
                deno = denominations[i].deno;
                break;
            }
        }

        const balance = withdrawAmount || newPosition || position;
        const newDeno = centerPos ? (centerPos - 1) : deno;
        return (
            <AutoSizer>
                {({ width, height }) => {
                    let bills = [];
                    const row = 10;
                    const col = 9;
                    const h = 852;
                    const chipHeight = Math.floor((h - 20 - 112 - 10 * col) / col);
                    const chipWidth = Math.floor(chipHeight * 3192 / 1801);
                    const newHeight = 48 + chipHeight * col + 10 * col;

                    for (let i = 0; i < row; i++) {
                        const curColBalance = Math.floor((balance / Math.pow(10, newDeno - i)) % 10);
                        const outLineHeight = chipHeight * curColBalance + 10 * (curColBalance - 1) + 8;

                        let singleBill = [];
                        singleBill.push(
                            <BalanceCol key={`balance-${i}`} active={newDeno === i}>{curColBalance}</BalanceCol>
                        );
                        for (let j = 0; j < col; j++) {
                            singleBill.push(
                                <BillChip
                                    key={`balance-col-${i}-row-${j}`}
                                    index={j}
                                    isV2
                                    height={chipHeight}
                                    level={i + 1}
                                    symbol={symbol}
                                    deno={newDeno - i}
                                    disabled={j >= curColBalance}
                                    onClick={() => {
                                        if (j < curColBalance && isOpen) {
                                            this.setState({
                                                selected: {
                                                    index: j,
                                                    level: i + 1,
                                                    symbol,
                                                    deno: newDeno - i,
                                                },
                                            });
                                        }
                                    }}
                                />
                            );
                        }

                        bills.push(
                            <BillLine
                                key={`balance-col-${i}`}
                                isV2
                                width={chipWidth}
                                height={newHeight}
                            >
                                {singleBill}

                                {/*
                                {outLineHeight > 0 && (
                                    <BalanceOutline size={outLineHeight} />
                                )}
                                */}
                            </BillLine>
                        );
                    }

                    return (
                        <Fragment>
                            <InnerWrapper isV2 realHeight={height}>
                                <BillsWrapper>
                                    {bills}
                                </BillsWrapper>

                                <span className="bill-description">{`${symbol} IN COLD STORAGE`}</span>

                                {isOpen && isFromModal && (
                                    <Close onClick={this.props.onClose}>
                                        <Icon src={imgX}/>
                                    </Close>
                                )}
                            </InnerWrapper>

                            {selected && (
                                <BillDetail>
                                    <div ref={ref => this.billDetailRef = ref}>
                                        <BillChip
                                            index={selected.index}
                                            isV2
                                            hoverable={false}
                                            height={window.innerHeight / 2}
                                            level={selected.level}
                                            symbol={selected.symbol}
                                            deno={selected.deno}
                                        />
                                    </div>
                                </BillDetail>
                            )}
                        </Fragment>
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
