import React from 'react';

import {
    WalletGroupButtonWrapper,
    WalletButtonWrapper,
    WalletButton
} from './ChildComponents';

export const WalletGroupButton = props => {
    let sellWidth = 0;
    let buyWidth = 0;
    let whiteWidth = 0;
    let isBuyAnimated = false;
    let isSellAnimated = false;
    let isWhiteAnimated = false;
    let whiteDirection = 'Left';
    let start = 0;
    if (props.progress) {
        if (props.inProgress && !props.isLeft && props.isBuy) {
            isSellAnimated = true;
            sellWidth = 100;
        }

        if (props.inProgress && props.isLeft && !props.isBuy) {
            isBuyAnimated = true;
            buyWidth = 100;
        }

        if (!props.isWhite) {
            isWhiteAnimated = true;
            whiteWidth = 100;
            whiteDirection = props.isBuy ? 'Left' : 'Right';

            if (props.isLeft && props.isBuy) {
                start = props.position ? 50 : 70;
            }

            if (!props.isLeft && props.isBuy) {
                start = props.position ? 60 : 80;
            }

            if (props.isLeft && !props.isBuy) {
                start = props.position ? 80 : 60;
            }

            if (!props.isLeft && !props.isBuy) {
                start = props.position ? 70 : 50;
            }
        }
    }

    if (props.isBuy && !props.inProgress) {
        sellWidth = 100;
    }

    if (!props.isBuy && !props.inProgress) {
        buyWidth = 100;
    }

    if (props.isWhite) {
        whiteWidth = 100;
    }

    return (
        <WalletGroupButtonWrapper className="orderhistory__wallet-btn">
            <WalletButtonWrapper direction="Left" width="100">
                <WalletButton type="inactive" direction="Left" {...props}>
                    {props.children}
                </WalletButton>
            </WalletButtonWrapper>
            <WalletButtonWrapper direction="Left" width={sellWidth} className={isSellAnimated && 'progress'}>
                <WalletButton type="sell" direction="Left" {...props}>
                    {props.children}
                </WalletButton>
            </WalletButtonWrapper>
            <WalletButtonWrapper direction="Right" width={buyWidth} className={isBuyAnimated && 'progress'}>
                <WalletButton type="buy" direction="Right" {...props}>
                    {props.children}
                </WalletButton>
            </WalletButtonWrapper>
            {!props.isShouldOneAnim &&
                <WalletButtonWrapper direction={whiteDirection} width={whiteWidth} className={isWhiteAnimated && 'fill'} start={start}>
                    <WalletButton type="active" direction={whiteDirection} {...props}>
                        {props.children}
                    </WalletButton>
                </WalletButtonWrapper>
            }
        </WalletGroupButtonWrapper>
    );
};
