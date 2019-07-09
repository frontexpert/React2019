/* eslint-disable react/no-danger */
import React, { Component } from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { FormattedMessage } from 'react-intl';
import { compose, withProps } from 'recompose';

import { RANGE_OPTIONS } from '../../../../config/constants';
import { STORE_KEYS } from '../../../../stores';
import { renderSvg } from '../../../../utils';

const SelectContainer = styled.div`
    display: inline-block;
    z-index: 1;
    width: 65px;
    font-size: 11px;
    border-radius: 5px;
    background: transparent;
    font-weight: 600;
    margin-top: -4px;

    .graph-info-range__current {
        pointer-events: all;	
        width: 100%;
        padding: 2px 0 2px 5px;
        border: 1px solid;
        border-radius: 5px;
        cursor: pointer;
        background: ${props => props.theme.palette.clrblock};
        border: 1px solid ${props => props.theme.palette.clrtextD};
        color: ${props => props.theme.palette.clrtextD};
        
        &:hover {
            background: rgba(0, 0, 0, 0.05);
            background: ${props => props.theme.palette.clrback};
        }
        
        svg {
            width: 8px;
            height: 8px;
            fill: ${props => props.theme.palette.clrtext};
            position: absolute;
            right: 13px;
            top: 3px;
        }
    }
    
    .graph-info-range__list {
        width: 100%;
        display: block;
        margin: 0;
        padding: 0;
        visibility: hidden;
        background: ${props => props.theme.palette.clrblock};
        border-radius: 0 0 ${props => props.theme.palette.borderRadius} ${props => props.theme.palette.borderRadius};
        border: 1px solid ${props => props.theme.palette.clrtextD};
        border-top: 0;
        color: ${props => props.theme.palette.clrtextD};
    
        &.open {
            visibility: visible;
        }
    }
    
    .graph-info-range__item {
        pointer-events: all;	
        width: 100%;
        display: block !important;
        padding: 3px 0 3px 5px;
        cursor: pointer;
        
        &:hover {
            background: ${props => props.theme.palette.clrback};
        }
    
        &.active {
            background: ${props => props.theme.palette.clrback};
        }
    
        &:first-child {
            border-radius: 5px 5px 0 0;
        }
    }
`;

const Li = styled.li``;

// TODO shift to recompose
class PeriodSelect extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            idx: 4,
        }
    }

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    setWrapperRef = (node) => {
        this.wrapperRef = node;
    };

    handleClickOutside = (event) => {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.setState({
                open: false,
            });
        }
    };

    toggleMenu = (open) => {
        this.setState({
            open: !open,
        });
    };

    handleSelect = (idx) => {
        this.setState({
            open: false,
            idx,
        });

        this.props.selectPeriod(RANGE_OPTIONS[idx].value);
    };

    render() {
        const { open, idx } = this.state;

        return (
            <SelectContainer>
                <div onClick={() => this.toggleMenu()} ref={this.setWrapperRef}>
                    <div className={`graph-info-range__current`}>
                        <span>{RANGE_OPTIONS[idx].value}</span>
                        <svg className="sprite-icon arrow-drop-2" role="img" aria-hidden="true"
                             dangerouslySetInnerHTML={{ __html: renderSvg("arrow-drop-2") }}/>
                    </div>

                    <ul className={`graph-info-range__list ${open ? " open" : ""}`}>
                        <Li className={idx === 4 ? "graph-info-range__item active" : "graph-info-range__item"}
                            onClick={() => this.handleSelect(4)}>
                            <FormattedMessage
                                id="graph_tool.icon_bars.label_year"
                                defaultMessage="Year"
                            />
                        </Li>
                        <Li className={idx === 3 ? "graph-info-range__item active" : "graph-info-range__item"}
                            onClick={() => this.handleSelect(3)}>
                            <FormattedMessage
                                id="graph_tool.icon_bars.label_month"
                                defaultMessage="Month"
                            />
                        </Li>
                        <Li className={idx === 2 ? "graph-info-range__item active" : "graph-info-range__item"}
                            onClick={() => this.handleSelect(2)}>
                            <FormattedMessage
                                id="graph_tool.icon_bars.label_week"
                                defaultMessage="Week"
                            />
                        </Li>
                        <Li className={idx === 1 ? "graph-info-range__item active" : "graph-info-range__item"}
                            onClick={() => this.handleSelect(1)}>
                            <FormattedMessage
                                id="graph_tool.icon_bars.label_day"
                                defaultMessage="Day"
                            />
                        </Li>
                        <Li className={idx === 0 ? "graph-info-range__item active" : "graph-info-range__item"}
                            onClick={() => this.handleSelect(0)}>
                            <FormattedMessage
                                id="graph_tool.icon_bars.label_hour"
                                defaultMessage="Hour"
                            />
                        </Li>
                    </ul>
                </div>
            </SelectContainer>
        );
    }
}

export default compose(
    inject(STORE_KEYS.PERIODSTORE),
    observer,
    withProps(
        ({
             [STORE_KEYS.PERIODSTORE]: {
                 selectedPeriod,
                 selectPeriod,
             },
         }) => {
            return ({
                selectedPeriod,
                selectPeriod,
            })
        }
    )
)(PeriodSelect);
