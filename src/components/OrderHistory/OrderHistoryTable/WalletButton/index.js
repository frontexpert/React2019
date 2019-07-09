import React from 'react';
import {
    Wrapper, WalletSideIcon, Wallet, CircleSpinner
} from './Components';

export const CONVERT_STATE = {
    plan: 1,
    execute: 2,
    settle: 3,
};

class WalletButton extends React.Component {
    state={};
    render() {
        const {
            isLeft, isBuy, convertState, progress,
        } = this.props;

        const actualProgress  = ((isBuy && isLeft) || (!isBuy && !isLeft)) ? progress : 100;
        const backColor = (convertState === CONVERT_STATE.settle) ? (isBuy ? 'btnPositiveBg' : 'btnNegativeBg') : 'clrBorder';
        const frontColor = (convertState === CONVERT_STATE.settle) ? 'clrHighContrast' : (isBuy ? 'btnPositiveBg' : 'btnNegativeBg');
        const isCircleSpinner = true;

        return (
            <Wrapper isBuy={isBuy}>
                <Wallet color={backColor} isLeft={isLeft}>
                    {isCircleSpinner && <CircleSpinner isLeft={isLeft}/>}
                    <span className="currency-symbol">$</span>
                    <span className="price-label">1234567</span>
                    <WalletSideIcon />
                </Wallet>
                <Wallet isLeft={isLeft} isFront={true} progress={actualProgress} isBuy={isBuy} color={frontColor}>
                    <span className="currency-symbol">$</span>
                    <span className="price-label">1234567</span>
                    <WalletSideIcon />
                </Wallet>
            </Wrapper>
        );
    }
}

export default WalletButton;