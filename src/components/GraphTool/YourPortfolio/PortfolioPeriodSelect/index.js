/* eslint-disable react/no-danger */
import React, { Component } from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import { renderSvg } from '../../../../utils/index';
import { RANGE_OPTIONS } from '../../../../config/constants';

const SelectContainer = styled.div`
    display: inline-block;
    z-index: 1;
    width: 70px;
    font-size: 11px;
    border-radius: 5px;
    background: transparent;
    font-weight: 600;
    margin-left: 15px;
    margin-bottom: 4px;

    .portfolio-graph-range__current {
        pointer-events: all;
        width: 100%;
        height: 18px;
        padding-left: 5px;
        border-radius: 3px;
        cursor: pointer;
        background: ${props => props.theme.palette.clrBackground};
        border: 1px solid ${props => props.theme.palette.clrBorderHover};
        color: ${props => props.theme.palette.clrHighContrast};
        
        &:hover {
            background: rgba(0, 0, 0, 0.05);
            background: ${props => props.theme.palette.clrback};
        }
        
        svg {
            width: 8px;
            height: 8px;
            fill: ${props => props.theme.palette.clrtext};
            position: absolute;
            right: 5px;
            bottom: 9px;
        }
    }
    
    .portfolio-graph-range__list {
        width: 100%;
        display: block;
        margin: 0;
        padding: 0;
        visibility: hidden;
        background: ${props => props.theme.palette.clrBackground};
        border-radius: 3px;
        border: 1px solid ${props => props.theme.palette.clrBorderHover};
        border-bottom: 0;
        color: ${props => props.theme.palette.clrHighContrast};
    }
    
    .portfolio-graph-range__list.open {
        visibility: visible;
    }
    
    .portfolio-graph-range__item:first-child {
        border-radius: 5px 5px 0 0;
    }
    
    .portfolio-graph-range__item:last-child {
        border-bottom: 0px;
    }
    
    .portfolio-graph-range__item {
        pointer-events: all;
        width: 100%;
        display: block !important;
        padding: 3px 0 3px 5px;
        cursor: pointer;
        border-bottom: 1px solid ${props => props.theme.palette.clrBorder};
        
        &:hover {
            background: ${props => props.theme.palette.clrMouseHover};
            color: ${props => props.theme.palette.clrHighContrast};
        }
    }
    
    .portfolio-graph-range__item.active {
        background: ${props => props.theme.palette.clrMouseClick};
    }
`;

const Li = styled.li``;

class PortfolioPeriodSelect extends Component {
    state = {
        open: false,
    };

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    setWrapperRef = (node) => {
        this.wrapperRef = node;
    };

    handleClickOutside = (event) => {
        if (this.wrapperRef && this.wrapperRef.contains && !this.wrapperRef.contains(event.target)) {
            this.setState({
                open: false,
            });
        }
    };

    toggleMenu = () => {
        const { open } = this.state;

        this.setState({
            open: !open,
        });
    };

    handlePeriodSelect = (idx) => {
        this.setState({
            open: false,
        });

        this.props.onChange(idx);
    };

    render() {
        const { open } = this.state;
        const { value } = this.props;
        // const periods = ['1 Minute', 'Hour', 'Day', 'Week', 'Month', 'Year'];
        const periods = [
            <FormattedMessage
                id="graph_tool.your_portfolio.label_1minute"
                defaultMessage="1 Minute"
            />,
            <FormattedMessage
                id="graph_tool.your_portfolio.label_hour"
                defaultMessage="Hour"
            />,
            <FormattedMessage
                id="graph_tool.your_portfolio.label_day"
                defaultMessage="Day"
            />,
            <FormattedMessage
                id="graph_tool.your_portfolio.label_week"
                defaultMessage="Week"
            />,
            <FormattedMessage
                id="graph_tool.your_portfolio.label_month"
                defaultMessage="Month"
            />,
            <FormattedMessage
                id="graph_tool.your_portfolio.label_year"
                defaultMessage="Year"
            />,
        ]

        return (
            <SelectContainer>
                <div onClick={() => this.toggleMenu()} ref={this.setWrapperRef}>
                    <ul className={`portfolio-graph-range__list ${open ? ' open' : ''}`}>
                        <Li
                            className={value === 5 ? 'portfolio-graph-range__item active' : 'portfolio-graph-range__item'}
                            onClick={() => this.handlePeriodSelect(5)}
                        >
                            <FormattedMessage
                                id="graph_tool.your_portfolio.label_year"
                                defaultMessage="Year"
                            />
                        </Li>
                        <Li
                            className={value === 4 ? 'portfolio-graph-range__item active' : 'portfolio-graph-range__item'}
                            onClick={() => this.handlePeriodSelect(4)}
                        >
                            <FormattedMessage
                                id="graph_tool.your_portfolio.label_month"
                                defaultMessage="Month"
                            />
                        </Li>
                        <Li
                            className={value === 3 ? 'portfolio-graph-range__item active' : 'portfolio-graph-range__item'}
                            onClick={() => this.handlePeriodSelect(3)}
                        >
                            <FormattedMessage
                                id="graph_tool.your_portfolio.label_week"
                                defaultMessage="Week"
                            />
                        </Li>
                        <Li
                            className={value === 2 ? 'portfolio-graph-range__item active' : 'portfolio-graph-range__item'}
                            onClick={() => this.handlePeriodSelect(2)}
                        >
                            <FormattedMessage
                                id="graph_tool.your_portfolio.label_day"
                                defaultMessage="Day"
                            />
                        </Li>
                        <Li
                            className={value === 1 ? 'portfolio-graph-range__item active' : 'portfolio-graph-range__item'}
                            onClick={() => this.handlePeriodSelect(1)}
                        >
                            <FormattedMessage
                                id="graph_tool.your_portfolio.label_hour"
                                defaultMessage="Hour"
                            />
                        </Li>
                        <Li
                            className={value === 0 ? 'portfolio-graph-range__item active' : 'portfolio-graph-range__item'}
                            onClick={() => this.handlePeriodSelect(0)}
                        >
                            <FormattedMessage
                                id="graph_tool.your_portfolio.label_1minute"
                                defaultMessage="1 Minute"
                            />
                        </Li>
                    </ul>
                    <div className="portfolio-graph-range__current">
                        <span>{periods[value]}</span>
                        <svg
                            className="sprite-icon arrow-drop-2"
                            role="img"
                            aria-hidden="true"
                            dangerouslySetInnerHTML={{ __html: renderSvg('arrow-drop-2') }}
                        />
                    </div>
                </div>
            </SelectContainer>
        );
    }
}

export default PortfolioPeriodSelect;
