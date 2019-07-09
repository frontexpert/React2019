import React, { Component } from 'react';
import styled from 'styled-components';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';

import Header from '../../Telegram/Header';

import setting1Icon from './icons/setting-1.svg';
import setting2Icon from './icons/setting-2.svg';
import setting3Icon from './icons/setting-3.svg';
import setting4Icon from './icons/setting-4.svg';
import setting5Icon from './icons/setting-5.svg';

// somehow theming below colors (using theme.palette.clrtext, for example)
// doesn't always work as expected. needs revisiting

const styles = theme => ({
    iOSSwitchBase: {
        height: 'auto',
        color: '#fff',
        transform: 'translateX(2px)',
        '&$iOSChecked': {
            color: '#17212c',
            '& + $iOSBar': {
                backgroundColor: '#6c7884',
            },
        },
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
            easing: theme.transitions.easing.sharp,
        }),
    },
    iOSChecked: {
        transform: 'translateX(13px)',
        '& + $iOSBar': {
            opacity: 1,
            border: 'none',
        },
    },
    iOSBar: {
        borderRadius: 13,
        width: 28,
        height: 14,
        marginTop: -7,
        marginLeft: -14,
        border: 'solid 1px',
        borderColor: 'transparent',
        backgroundColor: '#6c7884',
        opacity: 1,
        transition: theme.transitions.create(['background-color', 'border']),
    },
    iOSIcon: {
        width: 10,
        height: 10,
    },
});

const Wrapper = styled.div`
    height: 100%;
    background: ${props => props.theme.palette.settingsBackground};
    color: ${props => props.theme.palette.settingsText};
    min-width: 334px;
`;

const InnerWrapper = styled.div`
    padding: 25px 8px 18px 20px;
    flex-direction: column;
    display: flex;
    align-items: center;
    border-top: 1px solid ${props => props.theme.palette.clrseparator};
`;

const Field = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 10px;
`;

const Label = styled.p`
    margin: 0;
    flex: 1;
    font-size: 16px;
    font-weight: 400;
    &:hover {
        cursor: pointer;
    }
`;

const Icon = styled.img`
    width: 16px;
    height: 16px;
    margin-right: 13px;
`;

class Settings extends Component {
    state = {
        checked1: true,
        checked2: false,
        checked3: true,
        checked4: false,
        checked5: false,
        checked6: false,
        checked7: false,
        checked8: false,
        checked9: false,
        checked10: false,
        checked11: false,
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    handleLabelClick = name => () => {
        this.setState(prevState => ({ [name]: !prevState[name] }));
    };

    render() {
        const { classes, onClick } = this.props;
        return (
            <Wrapper onMouseLeave={() => {
                onClick();
            }}
            >
                <Header
                    type="settingsMenu"
                />
                <InnerWrapper>
                    <Field>
                        <Icon src={setting1Icon} alt="Setting 1" onClick={this.handleLabelClick('checked1')}/>
                        <Label onClick={this.handleLabelClick('checked1')}>Setting</Label>
                        <Switch
                            classes={{
                                switchBase: classes.iOSSwitchBase,
                                bar: classes.iOSBar,
                                icon: classes.iOSIcon,
                                iconChecked: classes.iOSIconChecked,
                                checked: classes.iOSChecked,
                            }}
                            disableRipple
                            checked={this.state.checked1}
                            onChange={this.handleChange('checked1')}
                            value="checked1"
                        />
                    </Field>
                    <Field>
                        <Icon src={setting2Icon} alt="Setting 2" onClick={this.handleLabelClick('checked2')}/>
                        <Label onClick={this.handleLabelClick('checked2')}>Setting</Label>
                        <Switch
                            classes={{
                                switchBase: classes.iOSSwitchBase,
                                bar: classes.iOSBar,
                                icon: classes.iOSIcon,
                                iconChecked: classes.iOSIconChecked,
                                checked: classes.iOSChecked,
                            }}
                            disableRipple
                            checked={this.state.checked2}
                            onChange={this.handleChange('checked2')}
                            value="checked2"
                        />
                    </Field>
                    <Field>
                        <Icon src={setting3Icon} alt="Setting 3" onClick={this.handleLabelClick('checked3')}/>
                        <Label onClick={this.handleLabelClick('checked3')}>Setting</Label>
                        <Switch
                            classes={{
                                switchBase: classes.iOSSwitchBase,
                                bar: classes.iOSBar,
                                icon: classes.iOSIcon,
                                iconChecked: classes.iOSIconChecked,
                                checked: classes.iOSChecked,
                            }}
                            disableRipple
                            checked={this.state.checked3}
                            onChange={this.handleChange('checked3')}
                            value="checked3"
                        />
                    </Field>
                    <Field>
                        <Icon src={setting4Icon} alt="Setting 4" onClick={this.handleLabelClick('checked4')}/>
                        <Label onClick={this.handleLabelClick('checked4')}>Setting</Label>
                        <Switch
                            classes={{
                                switchBase: classes.iOSSwitchBase,
                                bar: classes.iOSBar,
                                icon: classes.iOSIcon,
                                iconChecked: classes.iOSIconChecked,
                                checked: classes.iOSChecked,
                            }}
                            disableRipple
                            checked={this.state.checked4}
                            onChange={this.handleChange('checked4')}
                            value="checked4"
                        />
                    </Field>
                    <Field>
                        <Icon src={setting5Icon} alt="Setting 5" onClick={this.handleLabelClick('checked5')}/>
                        <Label onClick={this.handleLabelClick('checked5')}>Setting</Label>
                        <Switch
                            classes={{
                                switchBase: classes.iOSSwitchBase,
                                bar: classes.iOSBar,
                                icon: classes.iOSIcon,
                                iconChecked: classes.iOSIconChecked,
                                checked: classes.iOSChecked,
                            }}
                            disableRipple
                            checked={this.state.checked5}
                            onChange={this.handleChange('checked5')}
                            value="checked5"
                        />
                    </Field>
                </InnerWrapper>

                <InnerWrapper>
                    <Field>
                        <Icon src={setting1Icon} alt="Setting 1" onClick={this.handleLabelClick('checked6')}/>
                        <Label onClick={this.handleLabelClick('checked6')}>Setting</Label>
                        <Switch
                            classes={{
                                switchBase: classes.iOSSwitchBase,
                                bar: classes.iOSBar,
                                icon: classes.iOSIcon,
                                iconChecked: classes.iOSIconChecked,
                                checked: classes.iOSChecked,
                            }}
                            disableRipple
                            checked={this.state.checked6}
                            onChange={this.handleChange('checked6')}
                            value="checked1"
                        />
                    </Field>
                    <Field>
                        <Icon src={setting2Icon} alt="Setting 2" onClick={this.handleLabelClick('checked7')}/>
                        <Label onClick={this.handleLabelClick('checked7')}>Setting</Label>
                        <Switch
                            classes={{
                                switchBase: classes.iOSSwitchBase,
                                bar: classes.iOSBar,
                                icon: classes.iOSIcon,
                                iconChecked: classes.iOSIconChecked,
                                checked: classes.iOSChecked,
                            }}
                            disableRipple
                            checked={this.state.checked7}
                            onChange={this.handleChange('checked7')}
                            value="checked2"
                        />
                    </Field>
                    <Field>
                        <Icon src={setting3Icon} alt="Setting 3" onClick={this.handleLabelClick('checked8')}/>
                        <Label onClick={this.handleLabelClick('checked8')}>Setting</Label>
                        <Switch
                            classes={{
                                switchBase: classes.iOSSwitchBase,
                                bar: classes.iOSBar,
                                icon: classes.iOSIcon,
                                iconChecked: classes.iOSIconChecked,
                                checked: classes.iOSChecked,
                            }}
                            disableRipple
                            checked={this.state.checked8}
                            onChange={this.handleChange('checked8')}
                            value="checked3"
                        />
                    </Field>
                </InnerWrapper>

                <InnerWrapper>
                    <Field>
                        <Icon src={setting1Icon} alt="Setting 1" onClick={this.handleLabelClick('checked9')}/>
                        <Label onClick={this.handleLabelClick('checked9')}>Setting</Label>
                        <Switch
                            classes={{
                                switchBase: classes.iOSSwitchBase,
                                bar: classes.iOSBar,
                                icon: classes.iOSIcon,
                                iconChecked: classes.iOSIconChecked,
                                checked: classes.iOSChecked,
                            }}
                            disableRipple
                            checked={this.state.checked9}
                            onChange={this.handleChange('checked9')}
                            value="checked1"
                        />
                    </Field>
                    <Field>
                        <Icon src={setting2Icon} alt="Setting 2" onClick={this.handleLabelClick('checked10')}/>
                        <Label onClick={this.handleLabelClick('checked10')}>Setting</Label>
                        <Switch
                            classes={{
                                switchBase: classes.iOSSwitchBase,
                                bar: classes.iOSBar,
                                icon: classes.iOSIcon,
                                iconChecked: classes.iOSIconChecked,
                                checked: classes.iOSChecked,
                            }}
                            disableRipple
                            checked={this.state.checked10}
                            onChange={this.handleChange('checked10')}
                            value="checked2"
                        />
                    </Field>
                    <Field>
                        <Icon src={setting3Icon} alt="Setting 3" onClick={this.handleLabelClick('checked11')}/>
                        <Label onClick={this.handleLabelClick('checked11')}>Setting</Label>
                        <Switch
                            classes={{
                                switchBase: classes.iOSSwitchBase,
                                bar: classes.iOSBar,
                                icon: classes.iOSIcon,
                                iconChecked: classes.iOSIconChecked,
                                checked: classes.iOSChecked,
                            }}
                            disableRipple
                            checked={this.state.checked11}
                            onChange={this.handleChange('checked11')}
                            value="checked3"
                        />
                    </Field>
                </InnerWrapper>
            </Wrapper>
        );
    }
}

export default withStyles(styles)(Settings);
