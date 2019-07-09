import React from 'react';
import { withStateHandlers } from 'recompose';
import {ListItem, ListItemText, ListItemSecondaryAction, Switch} from '@material-ui/core';

//MUST BE USED INSIDE A LIST
const withSwitchState = withStateHandlers(
    {
        checked: true,
    },
    {
        handleSwitch: ({checked}) => () => {
            return{
                checked: !checked,
            }
        }, 
    }
);

const SwitchListItem = ({labelText, checked, handleSwitch}) => {
    return(
        <ListItem>
            <ListItemText primary={labelText} />
            <ListItemSecondaryAction>
                <Switch checked={checked} onChange={handleSwitch} />
            </ListItemSecondaryAction>
        </ListItem>
    )
};

export default withSwitchState(SwitchListItem);