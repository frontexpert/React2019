import React, { Component, Fragment } from 'react';
import styled, { keyframes } from 'styled-components';

const PaymentDataWrapper = styled.div.attrs({ className: 'payment-data-wrapper' })`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 50;

    .font-amount {
        font-family: 'Bernard MT Condensed', sans-serif;
        color: #ebebe1;
        text-shadow: 0px 0px 5px rgb(4,22,57);

        &.vertical {
            transform: rotateZ(90deg);
        }
    }
`;

const AmountTopRight = styled.div.attrs({ className: 'payment-data-amount--top-right font-amount' })`
    position: absolute;
    top: 10.8%;
    right: 21.5%;
    font-size: 34px;
    min-width: 17%;
    min-height: 40px;
    text-align: center;

    &.vertical {
        font-size: 68px;
        top: 8%;
    }
`;

const AmountBottomRight = styled.div.attrs({ className: 'payment-data-amount--bottom-right font-amount' })`
    position: absolute;
    bottom: 7%;
    right: 20.5%;
    font-size: 34px;
    min-width: 17%;
    min-height: 40px;
    text-align: center;

    &.vertical {
        font-size: 68px;
        bottom: 4.5%;
    }
`;

const AmountTopLeft = styled.div.attrs({ className: 'payment-data-amount--top-left font-amount' })`
    position: absolute;
    top: 11%;
    left: 17.5%;
    font-size: 20px;
    min-width: 10%;
    min-height: 23px;
    text-align: center;

    &.vertical {
        font-size: 40px;
        top: 9.5%;
        left: 17%;
    }
`;
const AmountBottomLeft = styled.div.attrs({ className: 'payment-data-amount--bottom-left font-amount' })`
    position: absolute;
    bottom: 8%;
    left: 16.5%;
    font-size: 20px;
    min-width: 10%;
    min-height: 23px;
    text-align: center;

    &.vertical {
        font-size: 40px;
        bottom: 6.5%;
        left: 17%;
    }
`;

const PaymentData = (({ amount }) => {
    const verticalClassName = `${amount}`.length === 1 ? 'vertical' : '';
    return (
        <PaymentDataWrapper>
            <AmountTopLeft className={verticalClassName}>{amount}</AmountTopLeft>
            <AmountTopRight className={verticalClassName}>{amount}</AmountTopRight>
            <AmountBottomRight className={verticalClassName}>{amount}</AmountBottomRight>
            <AmountBottomLeft className={verticalClassName}>{amount}</AmountBottomLeft>
        </PaymentDataWrapper>
    );
});

export default PaymentData;
