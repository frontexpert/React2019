import React from 'react';
import { withStateHandlers, withHandlers, compose } from 'recompose';
import { Radio, RadioGroup, FormControlLabel, ListItem } from '@material-ui/core';

const noop = () => {}

const handleSelectChange = () => (value) => {
    return {selectVal: value}
};


const withSelectedState = compose(
    withStateHandlers(
        ({defaultOptionIndex, options}) => {
            return {selectVal: options[defaultOptionIndex] || options[0]}
        },
        { handleSelectChange }
    ),
    withHandlers({
        onChange: ({onChange=noop, handleSelectChange}) => ({target:{value}}) => {
            onChange(value);
            handleSelectChange(value);
        },
    })
);

const RadioButtonList = ({options, selectVal, onChange}) => {
    return(
        <ListItem>
            <RadioGroup
            value={selectVal}
            onChange={onChange}
            >
            {
                options && options.map((option, idx) => {
                    return(
                        <FormControlLabel key={idx} value={option} control={<Radio />} label={option} />
                    )
                })
            }
            </RadioGroup>
        </ListItem>
    )
};

export default withSelectedState(RadioButtonList);