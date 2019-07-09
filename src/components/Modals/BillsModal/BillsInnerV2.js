import React, { Fragment } from 'react';
import { AutoSizer } from 'react-virtualized';
import { inject, observer } from 'mobx-react';

import { STORE_KEYS } from '../../../stores';
// import BillChip from './BillChip';
import BillChip from './BillChipV2';
import {
    BillLine,
    InnerWrapper,
    BillsWrapper,
    BalanceCol,
    Close,
    Icon,
    BillDetail,
    ChangeDeposit
} from './Components';

import imgX from '../../../components-generic/Modal/x.svg';

class BillsInner extends React.Component {
    state = {
        selected: this.props.isDeposit && this.props.selected
            ? this.props.selected
            : null,
    };

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside = (event) => {
        if (
            this.state.selected &&
            this.billDetailRef &&
            this.billDetailRef.contains &&
            !this.billDetailRef.contains(event.target)
        ) {
            this.closeDetail();
        }
    };

    getInnerRef = ref => this.billDetailRef = ref;

    closeDetail = () => {
        if (this.props.isDeposit) {
            this.props.onChangeDeposit();
            return;
        }
        this.setState({
            selected: null,
        });
    };

    // Update chip width to fit table into container
    // Used approximate coefficient to update width to fit into container
    updateChipWidth = (width) => Math.floor(width * 0.57);

    // Update height
    // Used approximate coefficient to update height to fit into container
    getBillDetailChipHeight = (height) => this.props.isDeposit
        ? height * 0.83
        : height * 0.75;

    render() {
        const { selected } = this.state;
        const {
            [STORE_KEYS.BILLCHIPSTORE]: {
                symbol,
                position,
                denominations,
                listUserBillsResponse,
            },
            isOpen,
            isFromModal,
            centerPos,
            newPosition,
            handleColdStorageLoad,
            isDeposit,
            onChangeDeposit,
        } = this.props;

        // Get default denomination
        let deno = 8;
        for (let i = 0; i < denominations.length; i++) {
            if (denominations[i] && (denominations[i].symbol === symbol)) {
                deno = denominations[i].deno;
                break;
            }
        }

        const balance = newPosition || position;
        const newDeno = centerPos ? (centerPos - 1) : deno;

        return (
            <AutoSizer>
                {({ width, height }) => {
                    if (width !== 0 && height !== 0 && handleColdStorageLoad) {
                        handleColdStorageLoad();
                    }
                    let bills = [];
                    const row = 16;
                    const col = 9;
                    const w = 1670;
                    const h = 850;
                    const chipHeight = Math.floor((h - 70 - 10 * (col - 1)) / (col + 1));
                    const chipWidth = this.updateChipWidth(chipHeight * 3192 / 1800);
                    const newHeight = chipHeight * (col + 1) + 10 * (col - 1);

                    const balanceStr = balance.toString().split('.');
                    let backPos = newDeno;
                    if (balanceStr.length > 1 && balanceStr[1].length) {
                        backPos += balanceStr[1].length;
                    } else if (balanceStr.length > 0 && balanceStr[0].length) {
                        backPos += balanceStr[0].length;
                    }

                    for (let i = 0; i < row; i++) {
                        const nominal = (newDeno - i > -4)
                            ? Math.pow(10, newDeno - i)
                            : (1 / Math.pow(10, -(newDeno - i)));

                        let curColBalance = Math.floor((balance / nominal) % 10);
                        if (typeof curColBalance === 'undefined' || Number.isNaN(curColBalance)) {
                            curColBalance = 0;
                        }

                        let startPos = 0;
                        for (let k = 0; k < listUserBillsResponse.length; k++) {
                            if (listUserBillsResponse[k].Nominal === nominal) {
                                startPos = k;
                                break;
                            }
                        }

                        let singleBill = [];
                        for (let j = 0; j < col; j++) {
                            const disabled = j >= curColBalance;

                            let publicAddress;
                            let serial;

                            if (!disabled) {
                                if (listUserBillsResponse.length > (startPos + j) && listUserBillsResponse[startPos + j].Nominal === nominal) {
                                    publicAddress = listUserBillsResponse[startPos + j].Address;
                                    serial = listUserBillsResponse[startPos + j].Serial;
                                }
                            }

                            singleBill.push(
                                <BillChip
                                    key={`balance-col-${i}-row-${j}`}
                                    index={j}
                                    isV2
                                    wrapperHeight={height}
                                    height={chipHeight}
                                    level={i}
                                    symbol={symbol}
                                    deno={newDeno - i}
                                    publicAddress={publicAddress}
                                    serial={serial}
                                    disabled={disabled || !publicAddress}
                                    onClick={() => {
                                        this.setState({
                                            selected: {
                                                index: j,
                                                level: i,
                                                symbol,
                                                deno: newDeno - i,
                                                publicAddress,
                                                serial,
                                                disabled: disabled || !publicAddress,
                                            },
                                        });
                                    }}
                                />
                            );
                        }

                        singleBill.push(
                            <BalanceCol
                                key={`balance-line-${i}`}
                                active={newDeno === i}
                                isShowComma={(newDeno > i) && (balance >= Math.pow(10, newDeno - i)) && ((newDeno - i) % 3 === 0)}
                                isTransparent={balance < Math.pow(10, newDeno - i) || (i > backPos)}
                                height={chipHeight}
                            >
                                {curColBalance}
                            </BalanceCol>
                        );

                        bills.push(
                            <BillLine
                                key={`balance-col-${i}`}
                                isV2
                                width={chipWidth}
                                height={newHeight}
                            >
                                {singleBill}
                            </BillLine>
                        );
                    }

                    return (
                        <Fragment>
                            {!isDeposit && (
                                <InnerWrapper isV2 height={h} realHeight={height}>
                                    <div className="bill-description">{`MY ${symbol} IN COLD STORAGE`}</div>

                                    <BillsWrapper chipHeight={chipHeight}>
                                        {bills}
                                    </BillsWrapper>

                                    {isOpen && isFromModal && (
                                        <Close onClick={this.props.onClose}>
                                            <Icon src={imgX}/>
                                        </Close>
                                    )}
                                </InnerWrapper>
                            )}

                            <ChangeDeposit isDeposit={isDeposit} onClick={onChangeDeposit}/>

                            {selected && (
                                <BillDetail isDeposit={isDeposit} onClick={this.closeDetail}>
                                    <BillChip
                                        isV2
                                        isOpened
                                        wrapperHeight={852}
                                        index={selected.index}
                                        hoverable={false}
                                        height={this.getBillDetailChipHeight(height)}
                                        level={selected.level}
                                        symbol={selected.symbol}
                                        deno={selected.deno}
                                        disabled={selected.disabled}
                                        getInnerRef={this.getInnerRef}
                                        isDeposit={isDeposit}
                                        publicAddress={selected.publicAddress}
                                        serial={selected.serial}
                                        depositBalance={balance}
                                    />
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
)(observer(BillsInner));
