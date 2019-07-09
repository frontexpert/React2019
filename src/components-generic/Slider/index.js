import React from 'react';
import styled, {css} from 'styled-components';
import {withStateHandlers} from 'recompose';

const SliderStyles = css`
    width: 100%;

    [data-slider]{
        -webkit-appearance: none;
        appearance: none;
        width: 100%;
        height: 1px;
        background: ${props => props.theme.tradePalette.contrastText};;
        outline: none; 
        opacity: 0.7;
        -webkit-transition: .2s;
        transition: opacity .2s;
        &:hover{
            opacity: 1;
        }

        &::-webkit-slider-thumb{
            -webkit-appearance: none;
            appearance: none;
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background: ${props => props.theme.tradePalette.contrastText};;
            cursor: pointer;
        }

        &::-moz-range-thumb {
            width: 15px;
            height: 15px;
            background: ${props => props.theme.tradePalette.contrastText};;
            border-radius: 50%;
            cursor: pointer;
        }
    }
`;

const handleSlide = () => (event) => {
    return {val: event.target.value}
};

const withStateSimpleSelect = withStateHandlers(
    { val: 0 },
    { handleSlide }
);

const Slider = ({className, handleSlide, val}) => {
    return(
        <div className={className}>
            <input type="range" min="1" max="100" onChange={handleSlide} value={val} data-slider />
        </div>
    )
};

export default withStateSimpleSelect(styled(Slider)`${SliderStyles}`)

