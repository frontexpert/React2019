import React from 'react';
import PropTypes from 'prop-types';
import inputFormatPhoneInit from './core';
import StyleWrapper from './style';
import imgChevronDown from './chevron-down.png';

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

    handleChange = (code, number, countryCode, countryName) => {
        this.props.onChange(code + number, countryCode, countryName, code, number);

        this.setState({
            hidePlaceHolder: String(number).length > 12,
        });
    };

    render() {
        const { children, disabled } = this.props;
        const { hidePlaceHolder } = this.state;

        return (
            <StyleWrapper>
                <div className="phone-input-telegram">
                    <div className="phone-input-group">
                        <div className={'login_country_field_wrap' + (disabled ? ' disabled' : '')} id="login-country-wrap">
                            <div
                                className="login_country_selected"
                                id="login-country-selected"
                                data-placeholder="Unknown country"
                            />
                            <div className="login_country_search_wrap">
                                <div className="textfield-item" id="login-country-search-textfield">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="login-country-search"
                                        autoComplete="off"
                                        placeholder="Search"
                                        readOnly={disabled}
                                    />
                                </div>
                                <div
                                    className="login_country_search_results"
                                    id="login-country-search-results"
                                    data-noresult="Country not found"
                                />
                            </div>
                            <img className="login_country_chevron_down" src={imgChevronDown} alt=""/>
                        </div>

                        <div className="login_phone_field_wrap">
                            <div className="login_code_field_wrap">
                                <div className="textfield-item" id="login-phone-code-textfield">
                                    <input
                                        type="tel"
                                        className="form-control"
                                        id="login-phone-code"
                                        autoComplete="off"
                                        readOnly={disabled}
                                    />
                                </div>
                            </div>
                            <div className={'login_number_field_wrap' + (!!children ? ' with-button' : '')}>
                                <div className="textfield-item" id="login-phone-textfield">
                                    <input
                                        type="tel"
                                        className="form-control"
                                        id="login-phone"
                                        autoComplete="off"
                                        readOnly={disabled}
                                    />
                                    <span
                                        className={'textfield-item__placeholder' + (hidePlaceHolder ? ' hide' : '')}
                                        id="login-phone-placeholder"
                                        data-placeholder="Phone number"
                                    />
                                </div>
                                {children &&
                                <div className="number_action">
                                    {children}
                                </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
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
