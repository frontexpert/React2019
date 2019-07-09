import React, {Component} from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { STORE_KEYS } from '../../../stores';
import {viewModeKeys} from '../../../stores/ViewModeStore';

import Header from '../../Telegram/Header';
import PerfectScrollWrapper from '../../../components-generic/PerfectScrollWrapper';
import {
    InnerWrapper,
    InfoCard,
    H1,
    H2,
    H3,
    Span,
    BalanceDisplay,
    Group,
    Item,
    ItemLeftIcon,
    ItemRightIcon,
    ItemLabel,
    ItemInput,
    ItemButton,
    BackButton
} from './Components';
import setting1Icon from "../Settings/icons/setting-1.svg";
import Switch from "@material-ui/core/Switch";
import {withStyles} from "@material-ui/core/styles";

const StyleWrapper = styled.div.attrs({className: 'settings-style-wrapper'})`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    min-width: 342px;
    width: min-content;
    height: 100%;
    
    overflow: hidden;
    background: ${props => props.theme.palette.settingsBackground};
    color: ${props => props.theme.palette.settingsText};
    
    .error {
        &, & span {
            color: ${props => props.theme.palette.settingsErrorColor} !important;
        }
    }
    
    .styled-component-hack {
        position: fixed;
        left: -100px;
        top: -100px;
        width: 0;
        height: 0;
    }
`;

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

export const RightCheckIcon = () => (
    <ItemRightIcon width="14" height="13" fill="#2aab68">
        <svg role="img" viewBox="0 0 512 512">
            <path
                d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"/>
        </svg>
    </ItemRightIcon>
);

export const LeftCheckIcon = () => (
    <ItemLeftIcon width="14" height="13" fill="#2aab68">
        <svg role="img" viewBox="0 0 512 512">
            <path
                d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"/>
        </svg>
    </ItemLeftIcon>
);

export const RightCameraIcon = () => (
    <ItemRightIcon width="20" height="16">
        <svg role="img" viewBox="0 0 512 512">
            <path
                d="M512 144v288c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48h88l12.3-32.9c7-18.7 24.9-31.1 44.9-31.1h125.5c20 0 37.9 12.4 44.9 31.1L376 96h88c26.5 0 48 21.5 48 48zM376 288c0-66.2-53.8-120-120-120s-120 53.8-120 120 53.8 120 120 120 120-53.8 120-120zm-32 0c0 48.5-39.5 88-88 88s-88-39.5-88-88 39.5-88 88-88 88 39.5 88 88z"/>
        </svg>
    </ItemRightIcon>
);

class Settings extends Component {
    state = {
        step: 1,

        amountValue: '',
        amountValues: [
            '299.99',
            '599.99',
            '999.99',
            '10,000.00',
            '50,000.00'
        ],

        paymentOption: '',
        paymentOptions: [
            {
                value: 'card',
                title: 'Credit/Debig Card',
                description: 'Visa, MasterCard, Discover, American Express',
            },
            {
                value: 'paypal',
                title: 'PayPal',
                description: '',
            }
        ],
        cardNumber: '',
        cardExpire: '',
        cardCVV: '',

        billingFirstName: '',
        billingLastName: '',

        billingAddrStreet: '',
        billingAddrCity: '',
        billingAddrState: '',
        billingAddrZip: '',
        billingAddrPhone: '',

        isFormValid: true,
        errorMsg: '',
        errors: {},

        checked1: true,
        checked2: true,
        checked3: true,
    };

    componentDidMount() {
        this.isMountedFlag = true;
    }

    componentWillUnmount() {
        this.isMountedFlag = false;
    }

    handleMouseLeave = () => {
        this.hideTimer = setTimeout(() => {
            if (this.isMountedFlag) {
                this.props.onClick();
            }
        }, 300);
    };

    handleMouseEnter = () => {
        clearTimeout(this.hideTimer);
    };

    handleChange = (val, key) => {
        let error = null;
        if (!val) {
            error = 'empty';
        }

        this.setState({
            [key]: val,
            errors: {
                ...this.state.errors,
                [key]: error,
            },
        });

        return error;
    };

    handleAmountChange = (val, key) => {
        this.handleChange(val, key);

        clearTimeout(this.step1Timer);
        this.step1Timer = setTimeout(() => {
            if (this.isMountedFlag) {
                this.gotoStep(2);
            }
        }, 500);
    };

    handleViewModeChange = (viewModeStore) => {
        this.handleLabelClick('checked2');

        clearTimeout(this.viewModeTimer);
        this.viewModeTimer = setTimeout(() => {
            viewModeStore.toggleViewMode();
        }, 300);
    };

    handleSubmit = () => {
        const inputFields = [
            'paymentOption',
            'cardNumber',
            'cardExpire',
            'cardCVV',
            'billingFirstName',
            'billingLastName',
            'billingAddrStreet',
            'billingAddrCity',
            'billingAddrState',
            'billingAddrZip',
            'billingAddrPhone'
        ];

        let isFormValid = true;
        let errors = {};

        inputFields.map((key) => {
            if (!this.state[key]) {
                errors[key] = 'empty';
                isFormValid = false;
            }
        });

        this.setState({
            errors: {
                ...this.state.errors,
                ...errors,
            },
            isFormValid,
            errorMsg: isFormValid ? '' : 'You must complete the entire form',
        });
    };

    gotoStep = (step) => {
        this.setState({
            step,
        });
    };

    errorClass = (field) => !!this.state.errors[field] ? 'error' : '';

    handleLabelClick = (name) => {
        this.setState(prevState => ({[name]: !prevState[name]}))
    };

    handleResetBalance = () => {
        const {
            [STORE_KEYS.YOURACCOUNTSTORE]: yourAccountStore,
            [STORE_KEYS.PORTFOLIODATASTORE]: portfolioDataStore,
        } = this.props;
        yourAccountStore.resetDemoBalances();
        portfolioDataStore.resetPortfolioData();
        this.handleMouseLeave();
    }

    render() {
        const balance = '0.00';
        const email = 'smacdonald@esteyhoover.com';
        const {
            classes,
            [STORE_KEYS.VIEWMODESTORE]: viewModeStore,
        } = this.props;
        const isBasicMode = viewModeStore.viewMode === viewModeKeys.basicModeKey;

        const {
            step,
            amountValue,
            amountValues,
            paymentOption,
            paymentOptions,
            cardNumber,
            cardExpire,
            cardCVV,
            billingFirstName,
            billingLastName,
            billingAddrStreet,
            billingAddrCity,
            billingAddrState,
            billingAddrZip,
            billingAddrPhone,

            isFormValid,
            errorMsg,
            checked2,
        } = this.state;

        return (
            <StyleWrapper
                onMouseLeave={this.handleMouseLeave}
                onMouseEnter={this.handleMouseEnter}
            >
                <div className="styled-component-hack">
                    <InnerWrapper/>
                    <InfoCard/>
                    <H1/>
                    <H2/>
                    <H3/>
                    <Span/>
                    <BalanceDisplay/>
                    <Group/>
                    <Item/>
                    <ItemLeftIcon/>
                    <ItemRightIcon/>
                    <ItemLabel/>
                    <ItemInput/>
                    <ItemButton/>
                    <RightCheckIcon/>
                    <LeftCheckIcon/>
                    <RightCameraIcon/>
                </div>
                <Header
                    type="settingsMenu"
                    className="settings-header"
                />

                <InnerWrapper>
                    <PerfectScrollWrapper scrollTop={false}>
                        {step === 1 &&
                        <div>
                            <InfoCard>
                                <Field onClick={() => {
                                    this.handleViewModeChange(viewModeStore);
                                }}>
                                    <Icon src={setting1Icon} alt='Setting 2' />
                                    <Label>Advanced/Basic Mode</Label>
                                    <Switch
                                        classes={{
                                            switchBase: classes.iOSSwitchBase,
                                            bar: classes.iOSBar,
                                            icon: classes.iOSIcon,
                                            iconChecked: classes.iOSIconChecked,
                                            checked: classes.iOSChecked,
                                        }}
                                        disableRipple
                                        checked={checked2}
                                        value='checked2'
                                    />
                                </Field>
                                <Field onClick={() => {
                                    this.handleResetBalance();
                                }}>
                                    <Icon src={setting1Icon} alt='Setting 1'
                                          onClick={() => this.handleLabelClick('checked3')}/>
                                    <Label onClick={() => this.handleLabelClick('checked3')}>Reset Demo Balances</Label>
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
                                        onChange={() => this.handleLabelClick('checked3')}
                                        value='checked3'
                                    />
                                </Field>
                                <Field>
                                    <Icon src={setting1Icon} alt='Setting 1'
                                          onClick={() => this.handleLabelClick('checked1')}/>
                                    <Label onClick={() => this.handleLabelClick('checked1')}>Real Trading</Label>
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
                                        onChange={() => this.handleLabelClick('checked1')}
                                        value='checked1'
                                    />
                                </Field><br/>
                                <H1>Add funds to your BCT. Instantly.</H1>
                                <Span>Enjoy any application on the Blockchain Terminal.</Span>
                                <BalanceDisplay>
                                    <H2>BCT Balance: ${balance}</H2>
                                    <Span>{email}</Span>
                                </BalanceDisplay>
                                <Span center={true}>Select an amount to add to your account</Span>
                            </InfoCard>
                            {!!(amountValues && amountValues.length) &&
                            <Group>
                                {amountValues.map((item, key) => (
                                    <Item key={key}
                                          onClick={() => this.handleAmountChange(item, 'amountValue')}
                                    >
                                        {amountValue === item
                                            ? <LeftCheckIcon/>
                                            : <ItemLeftIcon/>
                                        }
                                        <ItemLabel> <span className="title">${item}</span> </ItemLabel>
                                    </Item>
                                ))}
                            </Group>
                            }
                            <InfoCard>
                                <Span>Gift Card Terms and Conditions ></Span>
                            </InfoCard>
                        </div>
                        }
                        {step === 2 &&
                        <div>
                            <InfoCard>
                                <BackButton onClick={() => this.gotoStep(1)}>
                                    <img alt="Back" src="/img/arrows.png"/>
                                </BackButton>
                                <H3>Payment Method</H3>
                                <Span>You won't be charged until you make a purchase.</Span>
                                {!isFormValid &&
                                <Span className="error">{errorMsg}</Span>
                                }
                            </InfoCard>
                            {!!(paymentOptions && paymentOptions.length) &&
                            <Group>
                                {paymentOptions.map((item, key) => (
                                    <Item
                                        key={key}
                                        onClick={() => this.handleChange(item.value, 'paymentOption')}
                                    >
                                        <ItemLabel>
                                            <span className="title">{item.title}</span>
                                            {item.description &&
                                            <span className="description">{item.description}</span>
                                            }
                                        </ItemLabel>
                                        {paymentOption === item.value
                                            ? <RightCheckIcon/>
                                            : <ItemRightIcon/>
                                        }
                                    </Item>
                                ))}
                            </Group>
                            }

                            <Group>
                                <Item className={this.errorClass('cardNumber')}>
                                    <ItemLabel>
                                        <span className="title">Number</span>
                                    </ItemLabel>
                                    <ItemInput
                                        placeholder="Required"
                                        value={cardNumber}
                                        onChange={e => this.handleChange(e.target.value, 'cardNumber')}/>
                                    <RightCameraIcon/>
                                </Item>
                                <Item className={this.errorClass('cardExpire')}>
                                    <ItemLabel>
                                        <span className="title">Expires</span>
                                    </ItemLabel>
                                    <ItemInput placeholder="MM/YYYY"
                                               value={cardExpire}
                                               onChange={e => this.handleChange(e.target.value, 'cardExpire')}/>
                                </Item>
                                <Item className={this.errorClass('cardCVV')}>
                                    <ItemLabel>
                                        <span className="title">CVV</span>
                                    </ItemLabel>
                                    <ItemInput placeholder="Security Code"
                                               value={cardCVV}
                                               onChange={e => this.handleChange(e.target.value, 'cardCVV')}/>
                                </Item>
                            </Group>

                            <InfoCard>
                                <H3>Billing Name</H3>
                            </InfoCard>
                            <Group>
                                <Item className={this.errorClass('billingFirstName')}>
                                    <ItemLabel>
                                        <span className="title">First Name</span>
                                    </ItemLabel>
                                    <ItemInput placeholder="Required"
                                               value={billingFirstName}
                                               onChange={e => this.handleChange(e.target.value, 'billingFirstName')}/>
                                </Item>
                                <Item className={this.errorClass('billingLastName')}>
                                    <ItemLabel>
                                        <span className="title">Last Name</span>
                                    </ItemLabel>
                                    <ItemInput placeholder="Required"
                                               value={billingLastName}
                                               onChange={e => this.handleChange(e.target.value, 'billingLastName')}/>
                                </Item>
                            </Group>

                            <InfoCard>
                                <H3>Billing Address</H3>
                            </InfoCard>
                            <Group>
                                <Item className={this.errorClass('billingAddrStreet')}>
                                    <ItemLabel>
                                        <span className="title">Street</span>
                                    </ItemLabel>
                                    <ItemInput placeholder="Required"
                                               value={billingAddrStreet}
                                               onChange={e => this.handleChange(e.target.value, 'billingAddrStreet')}/>
                                </Item>
                                <Item className={this.errorClass('billingAddrCity')}>
                                    <ItemLabel>
                                        <span className="title">City</span>
                                    </ItemLabel>
                                    <ItemInput placeholder="Required"
                                               value={billingAddrCity}
                                               onChange={e => this.handleChange(e.target.value, 'billingAddrCity')}/>
                                </Item>
                                <Item className={this.errorClass('billingAddrState')}>
                                    <ItemLabel>
                                        <span className="title">State</span>
                                    </ItemLabel>
                                    <ItemInput placeholder="Required"
                                               value={billingAddrState}
                                               onChange={e => this.handleChange(e.target.value, 'billingAddrState')}/>
                                </Item>
                                <Item className={this.errorClass('billingAddrZip')}>
                                    <ItemLabel>
                                        <span className="title">Zip</span>
                                    </ItemLabel>
                                    <ItemInput placeholder="Required"
                                               value={billingAddrZip}
                                               onChange={e => this.handleChange(e.target.value, 'billingAddrZip')}/>
                                </Item>
                                <Item className={this.errorClass('billingAddrPhone')}>
                                    <ItemLabel>
                                        <span className="title">Phone</span>
                                    </ItemLabel>
                                    <ItemInput placeholder="123 | 456-789"
                                               value={billingAddrPhone}
                                               onChange={e => this.handleChange(e.target.value, 'billingAddrPhone')}/>
                                </Item>
                            </Group>

                            <InfoCard>
                                <H3>Country/Region: United States</H3>
                            </InfoCard>

                            <InfoCard>
                                <Span center={true}>
                                    <ItemButton
                                        onClick={this.handleSubmit}
                                    >
                                        Confirm >
                                    </ItemButton>
                                </Span>
                            </InfoCard>
                        </div>
                        }
                    </PerfectScrollWrapper>
                </InnerWrapper>
            </StyleWrapper>
        );
    }
}

export default withStyles(styles)(inject(
    STORE_KEYS.VIEWMODESTORE,
    STORE_KEYS.YOURACCOUNTSTORE,
    STORE_KEYS.PORTFOLIODATASTORE,
)(observer(Settings)));
