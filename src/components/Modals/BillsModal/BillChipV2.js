import React, { Fragment } from 'react';
import ClipboardJS from 'clipboard';

import {
    unifyDigitString,
    getDenoSymbol,
    getUpperLowerValue,
    customDigitFormat
} from '../../../utils';
import {
    BillWrapper,
    ChipWrapper,
    PriceSection,
    PriceValue,
    PriceInfo,
    SignSection,
    WaterMark,
    CoinIconWrapper,
    QRWrapperLeft,
    QRWrapperRight,
    QRCodeLabel,
    Code,
    DetailsWrapper,
    PrivateAddress,
    PublicAddress,
    Issue,
    Balance,
    QRLabelLeft,
    QRLabelRight,
    PriceLabel,
    PublicAddressWrapper,
    InputWrapper,
    InputAddon,
    CheckIcon,
    CopyIcon,
    InputTextarea,
    convertLevel,
    DepositLabel
} from './ChipComponents';
import CoinIcon from '../../CoinPairSearchV2/ExchDropdownRV/CoinIcon';

const colors = [
    '#206D7E',
    '#206D7E',
    '#206D7E',
    '#50477C',
    '#314E82',
    '#2A5D84',
    '#206D7E',
    '#1F867F',
    '#3C8E73',
    '#799979',
    '#C3AB6F',
    '#C2AC6F',
    '#AD4F36',
    '#206D7E',
    '#206D7E',
    '#206D7E'
];

class BillChip extends React.Component {
    state = {
        depositAddressCopied: false,
    };

    componentDidMount() {
        if (this.props.isDeposit) {
            this.clipboard = new ClipboardJS('#chip_deposit_address');
            this.clipboard.on('success', () => {
                // self.props.copy();
            });
        }
    }

    handleClickCopy = () => {
        if (this.depositAddressRef) {
            this.depositAddressRef.focus();
            this.depositAddressRef.select();
        }
        this.setState({
            depositAddressCopied: true,
        });
    };

    render() {
        const {
            height,
            index,
            symbol,
            hoverable = true,
            disabled = false,
            deno,
            isV2,
            isOpened,
            isDeposit,
            publicAddress = '1F1tAaz5x1HUXrCNLbtMDqcw6o5GNn4xqX',
            serial = '',
            depositBalance,
            level,
        } = this.props;

        const { unit, unitSymbol } = getDenoSymbol(deno);

        const privateAddress = '1Usd9f29fjsAVs2si4d3f553e121aa5uu55saf';
        const issue = '1393261126';

        let black = false;
        if (level === 9 || level === 10 || level === 11 || isDeposit) {
            black = true;
        }

        let fontStyle = 'normal';
        if (deno < 0) {
            fontStyle = 'stroke';
        }

        const color = isDeposit ? '#c9c9c9' : colors[level];
        const detailBalance = (deno > 3)
            ? unifyDigitString(Math.pow(10, deno))
            : (deno > -4)
                ? Math.pow(10, deno).toFixed(3)
                : (1 / Math.pow(10, -deno)).toFixed(-deno);

        const { upper, lower } = getUpperLowerValue(depositBalance || 0);
        const priceUnit = isDeposit ? upper : unifyDigitString(unit);
        const digit = lower.toString().substr(0, 4);
        const length = lower.length === 3 || priceUnit === '0';

        return (
            <BillWrapper
                isV2={isV2}
                width={Math.floor(height * 3192 / 1800)}
                height={height}
                disabled={disabled}
                isOpened={isOpened}
                hoverable={hoverable}
                onClick={this.props.onClick}
            >
                <ChipWrapper
                    height={height}
                    level={level}
                    isDeposit={isDeposit}
                >
                    {isDeposit && (
                        <DepositLabel>{`Deposit ${symbol}`}</DepositLabel>
                    )}

                    <Fragment>
                        <QRWrapperLeft disabled={disabled}>
                            <Code
                                value={publicAddress}
                                size={700}
                                level="L"
                                includemargin="true"
                                renderAs="svg"
                                logo="/img/qr_logo.png"
                                color={color}
                            />
                            {!disabled && (
                                <QRLabelLeft isDeposit={isDeposit}>
                                    {isDeposit ? (
                                        <Fragment>
                                            {/*
                                            <PublicAddressWrapper>
                                                <InputWrapper
                                                    onClick={this.handleClickCopy}
                                                    color={this.state.depositAddressCopied ? 'green' : ''}
                                                >
                                                    <InputTextarea
                                                        value={publicAddress}
                                                        id="chip_deposit_address"
                                                        readOnly
                                                        onClick={this.handleClickCopy}
                                                        innerRef={ref => this.depositAddressRef = ref}
                                                    />
                                                    <InputAddon>
                                                        {this.state.depositAddressCopied
                                                            ? <CheckIcon fill="green" />
                                                            : <CopyIcon />
                                                        }
                                                    </InputAddon>
                                                </InputWrapper>
                                            </PublicAddressWrapper>
                                            */}
                                            This is your Public Key. It is the only recipient from cold storage.
                                        </Fragment>
                                    ) : publicAddress}
                                </QRLabelLeft>
                            )}
                            {isDeposit && (
                                <QRCodeLabel>Whitelisted Recipient</QRCodeLabel>
                            )}
                        </QRWrapperLeft>

                        <QRWrapperRight>
                            {isDeposit ? (
                                <QRLabelRight>Whitelisted wallet private key</QRLabelRight>
                            ) : (
                                <QRLabelRight>Cold wallet private key</QRLabelRight>
                            )}
                            <Code
                                value={privateAddress}
                                size={600}
                                level="L"
                                includemargin="true"
                                renderAs="svg"
                                logo="/img/qr_logo.png"
                            />
                        </QRWrapperRight>
                    </Fragment>

                    <WaterMark>
                        <CoinIconWrapper color={color}>
                            <CoinIcon
                                showTether
                                value={symbol}
                            />
                        </CoinIconWrapper>
                        <CoinIconWrapper color={color}>
                            <CoinIcon
                                showTether
                                value={symbol}
                            />
                        </CoinIconWrapper>
                    </WaterMark>

                    <PriceSection black={black}>
                        {isDeposit ? (
                            <PriceLabel>
                                {/* <p>This is your whitelisted wallet.</p> */}
                                {/* <p>It is the only recipient from cold storage.</p> */}
                            </PriceLabel>
                        ) : (
                            <PriceLabel>Whitelisted recipient</PriceLabel>
                        )}
                        <PriceValue fontStyle={fontStyle} black={black}>{priceUnit}</PriceValue>
                        <PriceInfo fontStyle={fontStyle} black={black} length={length}>
                            <div className="symbol">{symbol}</div>
                            <div className="unit">{isDeposit ? (lower === '.0' || lower === '' ? (priceUnit === '0' ? '.00' : '') : digit) : unitSymbol}</div>
                            {/* <div className="address">{publicAddress}</div> */}
                        </PriceInfo>
                    </PriceSection>

                    <SignSection level={convertLevel(level)} isDeposit={isDeposit} black={black}>
                        <img src={`/img/bills/signature/${isDeposit ? 10 : convertLevel(level)}.png`} alt="" />
                        <div>VIRES IN NUMERIS</div>
                    </SignSection>

                    {!disabled && (
                        <DetailsWrapper>
                            <CoinIcon
                                showTether
                                value={symbol}
                            />

                            <div>
                                <Balance>{`${symbol} ${isDeposit ? (unifyDigitString(depositBalance) === '0' ? '0.00' : customDigitFormat(depositBalance, 6)) : (detailBalance === '0' ? '0.00' : customDigitFormat(detailBalance, 6))}`}</Balance>
                                {!disabled && <PrivateAddress>{privateAddress}</PrivateAddress>}
                                <Issue>{`ISSUE: ${isDeposit ? issue : serial}`}</Issue>
                                {isDeposit && (
                                    <PublicAddress>{publicAddress}</PublicAddress>
                                )}
                                {disabled && <span className="specimen-label">Specimen</span>}
                            </div>
                        </DetailsWrapper>
                    )}
                </ChipWrapper>
            </BillWrapper>
        );
    }
}

export default BillChip;
