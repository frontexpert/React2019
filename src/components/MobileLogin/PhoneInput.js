import React from 'react';
import PropTypes from 'prop-types';

import { inputFormatPhoneInit } from './PhoneCore';
import { Label, ErrorLabel } from './Components';
import StyleWrapper from './style';
import imgChevronDown from '../../components-generic/PhoneInputCustom/chevron-down.png';

class PhoneInput extends React.Component {
    state = {
        hidePlaceHolder: false,
    };

    componentDidMount() {
        inputFormatPhoneInit(
            this.props.initialCountry,
            this.props.initialNumber,
            this.handleChange
        );
    }

    handleChange = (code, number, countryCode, countryName, countryFormat) => {
        this.props.onChange(code, number, countryCode, countryName, countryFormat);

        this.setState({
            hidePlaceHolder: String(number).length > 12,
        });
    };

    render() {
        const {
            children, disabled, errorMsg, hide,
        } = this.props;
        const { hidePlaceHolder } = this.state;

        return (
            <StyleWrapper hide={hide}>
                <div className="phone-input-telegram">
                    <div className="phone-input-group">
                        <div className="login_phone_field_wrap">
                            <div
                                className={'login_country_field_wrap' + (disabled ? ' disabled' : '')}
                                id="login-country-wrap"
                            >
                                <div
                                    className="login_country_selected"
                                    id="login-country-selected"
                                    data-placeholder="Unknown country"
                                />
                                <img className="login_country_chevron_down" src={imgChevronDown} alt="" />

                                <div className="login_country_search_wrap">
                                    <div className="textfield-item" id="login-country-search-textfield">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="login-country-search"
                                            autoComplete="off"
                                            placeholder="Search"
                                            readOnly={true}
                                        />
                                    </div>
                                    <div
                                        className="login_country_search_results"
                                        id="login-country-search-results"
                                        data-noresult="Country not found"
                                    />
                                </div>
                            </div>

                            <div className={'login_number_field_wrap' + (!!children ? ' with-button' : '')}>
                                <div className="textfield-item d-flex" id="login-phone-textfield">
                                    <input
                                        type="tel"
                                        className="form-control"
                                        id="login-phone-code"
                                        autoComplete="off"
                                        readOnly
                                    />
                                    <input
                                        type="tel"
                                        className="form-control"
                                        id="login-phone"
                                        autoComplete="off"
                                        readOnly={true}
                                    />
                                    <span
                                        className={'textfield-item__placeholder' + (hidePlaceHolder ? ' hide' : '')}
                                        id="login-phone-placeholder"
                                        data-placeholder="Phone number"
                                    />
                                </div>

                                {/*
                                {children && (
                                    <div className="number_action">
                                        {children}
                                    </div>
                                )}
                                */}
                            </div>
                        </div>
                    </div>
                </div>

                <ErrorLabel>{errorMsg}</ErrorLabel>

                <Label onClick={this.props.requestCode}>
                    Send Code
                </Label>
            </StyleWrapper>
        );
    }
}

PhoneInput.propTypes = {
    onChange: PropTypes.func.isRequired,
    initialCountry: PropTypes.string,
    initialNumber: PropTypes.string,
    disabled: PropTypes.bool,
};

PhoneInput.defaultProps = {
    initialCountry: '',
    initialNumber: '',
    disabled: false,
};

export default PhoneInput;
