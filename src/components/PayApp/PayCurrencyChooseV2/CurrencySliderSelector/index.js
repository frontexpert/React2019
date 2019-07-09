import React from 'react';
import PropTypes from 'prop-types';
import { compose, withProps } from 'recompose';
import { inject, observer } from 'mobx-react';
import { AutoSizer } from 'react-virtualized';
import Slider from 'react-slick';

import {
    Wrapper,
    SliderWrapper,
    CurrencyItem,
    CurrencyImage,
    SliderPrevArrowWrapper,
    SliderNextArrowWrapper
} from './Components';

import TouchBlocker from '../../../../components-generic/TouchBlocker';
import { STORE_KEYS } from '../../../../stores';
import FIAT_CURRENCIES from '../../PayCurrencyChoose/CurrecySliderSelector/fiat_currencies';
import imgArrowNext from './imgArrowBottom.svg';
import imgArrowPrev from './imgArrowTop.svg';

class CurrencySliderSelector extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.sliderRef = null;
        this.autoQRTimerId = null;

        if (this.props.innerRef) {
            this.props.innerRef(this);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.showAutoQR();
    }

    resetAutoQRTimer = () => {
        clearTimeout(this.autoQRTimerId);
        this.autoQRTimerId = null;
    };

    showAutoQR = () => {
        // start show QR timer if section is visible, qr is not visible, timer is not started yet.
        if (
            !this.props.isQRVisible
            && !this.autoQRTimerId
            && this.props.isVisible
        ) {
            this.autoQRTimerId = setTimeout(() => {
                if (
                    !this.props.isQRVisible
                    && this.props.isVisible
                    && FIAT_CURRENCIES[this.props.defaultFiat]
                    && this.sliderRef
                    && this.sliderRef.innerSlider
                ) {
                    this.handleClickCurrency(FIAT_CURRENCIES[this.props.defaultFiat][this.sliderRef.innerSlider.state.currentSlide].price);
                }
                this.autoQRTimerId = null;
            }, 1000);
        }
    };

    handleSwipe = direction => {
        if (this.sliderRef) {
            switch (direction) {
            case 'up':
                if (this.sliderRef.innerSlider.state.currentSlide > 0) {
                    this.resetAutoQRTimer();
                    this.sliderRef.slickPrev();
                    this.showAutoQR();
                } else if (this.props.onSwipeUpAtLastCurrency) {
                    this.resetAutoQRTimer();
                    this.props.onSwipeUpAtLastCurrency();
                }
                break;
            case 'down':
                this.resetAutoQRTimer();
                this.sliderRef.slickNext();
                this.showAutoQR();
                break;
            default:
            }
        }
    };

    handleClickCurrency = (price) => {
        if (this.props.onSelect && !this.props.isQRVisible) {
            this.props.onSelect(price);
        } else {
            console.error('No onSelect event provided for Currency Selector! or QR already open');
        }
    };

    render() {
        const {
            defaultFiat,
            defaultFiatSymbol,
        } = this.props;

        const SliderPrevArrow = ({ className, style, onClick }) => (
            <SliderPrevArrowWrapper
                className={className}
                style={style}
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('up');
                    this.props.onSwipe('up');
                }}
            >
                <img src={imgArrowPrev} alt="Prev"/>
            </SliderPrevArrowWrapper>
        );

        const SliderNextArrow = ({ className, style, onClick }) => (
            <SliderNextArrowWrapper
                className={className}
                style={style}
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('down');
                    this.props.onSwipe('down');
                }}
            >
                <img src={imgArrowNext} alt="down"/>
            </SliderNextArrowWrapper>
        );

        return (
            <Wrapper>
                <TouchBlocker isBlock={false} onSwipe={this.handleSwipe} threshold={5}>
                    <AutoSizer>
                        {({ width, height }) => {
                            let currencyImages = [];

                            if (FIAT_CURRENCIES[defaultFiat]) {
                                const length = FIAT_CURRENCIES[defaultFiat].length;

                                for (let i = 0; i < length; i++) {
                                    const { price } = FIAT_CURRENCIES[defaultFiat][i];

                                    currencyImages.push(
                                        <CurrencyItem
                                            key={`f${i}`}
                                        >
                                            <CurrencyImage
                                                coin={defaultFiat}
                                                src={FIAT_CURRENCIES[defaultFiat][i].file}
                                                onClick={() => this.handleClickCurrency(price)}
                                            />
                                            {/*
                                            <span className="corner-amount top-left"> {`${defaultFiatSymbol}${price}`} </span>
                                            <span className="corner-amount top-right"> {`${defaultFiatSymbol}${price}`} </span>
                                            <span className="corner-amount bottom-left"> {`${defaultFiatSymbol}${price}`} </span>
                                            <span className="corner-amount bottom-right"> {`${defaultFiatSymbol}${price}`} </span>
                                            */}
                                        </CurrencyItem>
                                    );
                                }
                            }

                            return (
                                <SliderWrapper width={width} height={height}>
                                    <Slider
                                        dots={false}
                                        // arrows={false}
                                        infinite={false}
                                        accessibility={false}
                                        adaptiveHeight={false}
                                        centerMode={true}
                                        vertical={true}
                                        verticalSwiping={true}
                                        nextArrow={<SliderNextArrow />}
                                        prevArrow={<SliderPrevArrow />}
                                        ref={ref => {
                                            this.sliderRef = ref;
                                        }}
                                    >
                                        {currencyImages}
                                    </Slider>
                                </SliderWrapper>
                            );
                        }}
                    </AutoSizer>
                </TouchBlocker>
            </Wrapper>
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
                defaultFiat,
                defaultFiatSymbol,
            },
        }) => ({
            defaultFiat,
            defaultFiatSymbol,
        })
    )
);

CurrencySliderSelector.propTypes = {
    onSelect: PropTypes.func.isRequired,
};

export default withStore(CurrencySliderSelector);
