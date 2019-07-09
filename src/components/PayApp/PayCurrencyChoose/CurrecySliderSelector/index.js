import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { compose, withProps } from 'recompose';
import { AutoSizer } from 'react-virtualized';
import uuidv4 from 'uuid/v4';

import { STORE_KEYS } from '../../../../stores/index';
import FIAT_CURRENCIES from './fiat_currencies';

const Wrapper = styled.div`
    position: relative;
    width: ${props => props.width}px;
    height: ${props => props.height}px;
`;

const CurrencyList = styled.div.attrs({ className: 'pay-app-currencylist' })`
    text-align: center;
    width: 100%;
    height: 100%;
    padding: 0;
    overflow-y: auto;
`;

const CurrencyImage = styled.div`
    position: relative;
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    background: ${props => `url(/img/fiat/${props.coin}/${props.src})`} no-repeat;
    background-size: 100% 100%;
    margin-bottom: ${props => !props.last ? '20px' : '0px'};
    cursor: pointer;
`;

const Toggle = styled.div`
    position: absolute;
    right: 8px;
    top: 8px;
    width: ${props => props.size}px;
    height: ${props => props.size}px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.theme.palette.clrRed};
    border-radius: 50%;
    font-size: ${props => props.fontSize}px;
    color: ${props => props.theme.palette.clrHighContrast};
    cursor: pointer;
`;

const ListOverlay = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 2;
    background: rgb(0,0,0);
    background: linear-gradient(0deg, rgba(0,0,0,0.7) 0%, rgba(255,255,255,0) 50%, rgba(0,0,0,0.7) 100%);
    pointer-events: none !important;
`;

class CurrecySliderSelector extends Component {
    state = {};

    handleDeselectCurrency = price => (e) => {
        e.preventDefault();
        e.stopPropagation();

        this.props.deselectCurrency(price);
    };

    render() {
        const { defaultFiat, selected } = this.props;

        return (
            <AutoSizer>
                {({ width, height }) => {
                    const listHeight = height * 0.8;
                    const imgHeight = (listHeight - 40) / 3;

                    let currencyImages = []; // ZWD, SCR
                    if (FIAT_CURRENCIES[defaultFiat]) {
                        const length = FIAT_CURRENCIES[defaultFiat].length;
                        for (let i = 0; i < length; i++) {
                            const { price } = FIAT_CURRENCIES[defaultFiat][i];
                            const selectedCount = selected.filter(value => value === price).length;
                            currencyImages.push(
                                <CurrencyImage
                                    coin={defaultFiat}
                                    src={FIAT_CURRENCIES[defaultFiat][i].file}
                                    width={width}
                                    height={imgHeight}
                                    key={`f${i}`}
                                    last={i === length - 1}
                                    onClick={() => this.props.selectCurrency(price)}
                                >
                                    {selectedCount > 0 && (
                                        <Toggle
                                            size={40}
                                            fontSize={20}
                                            onClick={this.handleDeselectCurrency(price)}
                                        >
                                            {selectedCount}
                                        </Toggle>
                                    )}
                                </CurrencyImage>
                            );
                        }
                    }

                    return (
                        <Wrapper height={listHeight} width={width}>
                            <CurrencyList>
                                {currencyImages}
                            </CurrencyList>
                            <ListOverlay/>
                        </Wrapper>
                    );
                }}
            </AutoSizer>
        );
    }
}

const withStore = compose(
    inject(
        STORE_KEYS.SETTINGSSTORE,
    ),
    observer,
    withProps(
        ({
            [STORE_KEYS.SETTINGSSTORE]: {
                setDefaultCurrency,
                defaultFiat,
                defaultCryptoSymbol,
            },
        }) => ({
            setDefaultCurrency,
            defaultFiat,
            defaultCryptoSymbol,
        })
    )
);

export default withStore(CurrecySliderSelector);
