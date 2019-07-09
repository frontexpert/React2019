import React from 'react';
import { withStyles } from '@material-ui/core';
import styled from 'styled-components';

import {
    darkTheme
} from '../../theme/core';
import Switch from '@material-ui/core/Switch';

const SwitchMui = withStyles(theme => ({
    iOSSwitch: {
        width: 68,
        height: 32,
    },
    iOSSwitchBase: {
        width: 32,
        height: 32,
        color: darkTheme.palette.btnPositiveText,
        transform: 'none',
        '&$iOSChecked': {
            color: darkTheme.palette.btnPositiveText,
            '& + $iOSBar': {
                backgroundColor: darkTheme.palette.btnPositiveBg,
            },
        },
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
            easing: theme.transitions.easing.sharp,
        }),
    },
    iOSChecked: {
        transform: 'translateX(36px)',
        '& + $iOSBar': {
            opacity: 1,
            border: 'none',
        },
    },
    iOSBar: {
        top: 0,
        left: 0,
        marginTop: 0,
        marginLeft: 0,
        border: 'solid 0px',
        borderColor: 'transparent',
        borderRadius: 15,
        width: 68,
        height: 32,
        backgroundColor: darkTheme.palette.btnPositiveBg,
        opacity: 1,
        transition: theme.transitions.create(['background-color', 'border']),
    },
    iOSIcon: {
        width: 23,
        height: 23,
    },
}))(({ classes, ...props }) => <Switch
    classes={{
        switchBase: classes.iOSSwitchBase,
        bar: classes.iOSBar,
        icon: classes.iOSIcon,
        iconChecked: classes.iOSIconChecked,
        checked: classes.iOSChecked,
    }}
    disableRipple
    {...props}
/>);

const SwitchStyled = styled.div.attrs({ className: 'switch-custom' })`
    width: 68px;
    height: 32px;
`;

const SwitchMuiCustom = ({ ...props }) => <SwitchStyled>
    <SwitchMui {...props}/>
</SwitchStyled>;

export default SwitchMuiCustom;