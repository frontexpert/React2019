import React from 'react';
import styled from 'styled-components';
import {List, ListItem, Divider} from '../../../node_modules/@material-ui/core';
import RadioButtonItems from 'ComponentsGeneric/RadioButtons';
import SwapHoriz from '@material-ui/icons/SwapHoriz';
import Flare from '@material-ui/icons/Flare';
import Dashboard from '@material-ui/icons/Dashboard';
import ViewWeek from '@material-ui/icons/ViewWeek';
import {inject, observer} from 'mobx-react';
import {STORE_KEYS} from '../../stores';
import Done from '@material-ui/icons/Done';
// NEED FOR DISCUSSION 
// import SwitchListItem from 'ComponentsGeneric/SwitchListItem';
// import Settings from '@material-ui/icons/Settings';

const {THEME:STORE_THEME_KEY, TRADINGTYPE:STORE_KEY_TRADING} = STORE_KEYS;

const ThemeToggle = inject(STORE_THEME_KEY)(observer(
    ({[STORE_THEME_KEY]:theme}) => {
        return <RadioButtonItems options={theme.themeTypes} onChange={theme.setThemeType}  defaultOptionIndex={theme.selectedThemeIdx} />
    }
));

const TradingToggle = inject(STORE_KEY_TRADING)(observer(
    ({[STORE_KEY_TRADING]:tradingType}) => {
        return <RadioButtonItems options={tradingType.tradingTypes} onChange={tradingType.setTradingType} defaultOptionIndex={tradingType.selectedTradingTypeIdx} />
    }
));

const StyledList = styled.div`
    width: 250px;
    > ul li {
        color: ${props => props.theme.palette.contrastText};
    }
`;

//Example for discussion
const MenuListInDrawer = () => {
    return(
        <StyledList>
            <List>
                <ListItem>
                    <ViewWeek style={{"paddingRight" : "8px", "fontSize" : "2rem"}}/>
                    Views
                </ListItem>
                <Divider />
                <div style={{"display" : "flex", "alignItems": "center"}}><ListItem>Recent Trades</ListItem><Done style={{"color" : "#478CCA", "paddingRight" : '5px'}}/></div>
                <div style={{"display" : "flex", "alignItems": "center"}}><ListItem>Order Book</ListItem><Done style={{"color" : "#478CCA", "paddingRight" : '5px'}}/></div>
                <ListItem>Telegram</ListItem>
                <ListItem>Alerts</ListItem>
            </List>
            <List>
                <Divider />
                {/* KEEP COMMENTED OUT PORTION FOR DISCUSSION PURPOSES - latests designs use switches */}
                {/* <ListItem>
                    <Settings style={{"paddingRight" : "8px", "fontSize" : "2rem"}}/>
                    Settings
                </ListItem> */}
                {/* <Divider /> */}
                {/* <SwitchListItem labelText={'Dark Theme'} />
                <SwitchListItem labelText={'Paper Trading'} />
                <SwitchListItem labelText={'Basic'} />
                <Divider /> */}
                <ListItem>
                    <Flare style={{"paddingRight" : "8px", "fontSize" : "2rem"}}/>
                    Theme
                </ListItem>
                <Divider />
                <ThemeToggle />
                <Divider />
                <ListItem>
                    <SwapHoriz style={{"paddingRight" : "8px", "fontSize" : "2rem"}}/>
                    Trading
                </ListItem>
                <Divider />
                <TradingToggle />
                <Divider />
                <ListItem>
                    <Dashboard style={{"paddingRight" : "8px", "fontSize" : "2rem"}}/>
                    Dashboard
                </ListItem>
                <Divider />
                <RadioButtonItems options={['Basic', 'Advanced']} defaultOptionIndex={0} />
            </List>
        </StyledList>
    )
};

export default MenuListInDrawer;