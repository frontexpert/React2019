import React from 'react'
import styled from 'styled-components'
import MaterialSlider from '@material-ui/lab/Slider'
import { withStateHandlers } from 'recompose'

/*
    Using this as a drop in replacement for current slider in Order Form
    This is to be used everywhere in the app as per design
    But I am not integrating it right now as this requires testing
    Named it SliderSlick just to differentiate with the current version we have
*/

const Wrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: stretch;
    margin: 10px 0;
    width: 100%;
    height: 10px;
`;

const Splitter = styled.div`
    width: 1px;
    height: 5px;
    background-color: ${props => props.theme.palette.gridColor};
    position: absolute;
    left: ${props => props.pos}%;
    top: 50%;
    transform: translate(0, -50%);
`;

const Slider = styled(MaterialSlider)`
    margin: 0;
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;

    .container {
        &:before {
            content: '';
            background-color: ${props => props.theme.palette.gridColor};
            width: 1px;
            height: 5px;
            position: absolute;
            left: 0;
            top: 50%;
            transform: translate(0, -50%);
        }
        &:after {
            content: '';
            background-color: ${props => props.theme.palette.gridColor};
            width: 1px;
            height: 5px;
            position: absolute;
            right: 0;
            top: 50%;
            transform: translate(0, -50%);
        }
    }

    .trackBefore {
        /*
            this is not as per design, can be switched back to grid color
            but it does a little bit more sense to have this gradation with main color we use
        */
        background-color: ${props => props.theme.tradePalette.primaryBuy};
    }

    .thumb {
        /* 
            if we just use transparent here
            we will have this look: https://i.imgur.com/wDGV4ie.png
            so we need to fill out with the color of background currently using
        */
        width: 9px !important;
        height: 9px !important;
        background-color: ${props => props.theme.palette.backgroundHighContrast};
        border: 1px solid ${props => props.theme.palette.gridColor};
    }

    .track {
        height: 1px;
        opacity: 1 !important;
        width: 100% !important;
        background-color: ${props => props.theme.palette.gridColor};
    }

    .trackAfter {
        opacity: 0.5;
    }
`;

// material UI slider returns event AND value as a 2nd argument
const handleSlider = () => (event, value) => {
    return { value }
};

const withSlider = withStateHandlers(
    { value: 0 },
    { handleSlider }
);

const SliderSlick = ({ handleSlider, value }) => (
    <Wrapper>
        <Splitter pos={25} />
        <Splitter pos={50} />
        <Splitter pos={75} />
        <Slider
            onChange={handleSlider}
            value={value}
            classes={{
                trackBefore: 'trackBefore',
                container: 'container',
                thumb: 'thumb',
                track: 'track',
                trackAfter: 'trackAfter',
            }}
        />
    </Wrapper>
);

export default withSlider(SliderSlick)
