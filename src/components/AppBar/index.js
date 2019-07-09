import React from 'react';
import styled, {css} from 'styled-components';

import Alarm from '@material-ui/icons/AccessAlarm';
import AddAlert from '@material-ui/icons/AddAlert';
import Assessment from '@material-ui/icons/Assessment';
import AddBox from '@material-ui/icons/AddBox';
import CreditCard from '@material-ui/icons/CreditCard';
import Person from '@material-ui/icons/Person';
import NetworkWifi from '@material-ui/icons/NetworkWifi';
import Settings from '@material-ui/icons/Settings';


const IconBarCSS = css`
    background: #151515;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border : "3px solid tomato";
    min-width : 30px;
    max-width : 30px;
    padding-left: 5px;
    padding-right: 5px;

    [data-icon]{
        color: #7E7E7E;
        font-size: 2rem;
        padding-bottom: 15px;
        &:hover{
            color: #FFF;
        }
    }

    [data-topicons]{
        display: flex;
        flex-direction: column;
    }

    [data-bottomicons]{
        display: flex;
        flex-direction: column;
    }
`;

const IconBar = ({className, onClick}) => {
    return (
        <div className={className} onClick={onClick}>
            <div data-topicons> 
                <Assessment data-icon />
                <AddBox data-icon />
                <CreditCard data-icon />
                <AddAlert data-icon />
            </div>

            <div data-bottomicons>
                <NetworkWifi data-icon></NetworkWifi>
                <Alarm data-icon></Alarm>
                <Person data-icon></Person>
                <Settings data-icon></Settings>
            </div>
        </div>
    )
}

export default styled(IconBar)`${IconBarCSS}`