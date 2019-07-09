import React from 'react';
import styled from 'styled-components';

import DatePicker from 'react-datepicker';

import DropMenu from '../DropMenu';
import DownloadIcon from './download.svg';

import 'react-datepicker/dist/react-datepicker.css';

import { timePeriodList, fileFormatList } from '../constants';

const Wrapper = styled.div`
    display: flex;
    border-bottom: 1px solid #dedede;
    position: relative;
    padding: 10px 0;
    justify-content: space-between;
    z-index: 1000;
`;

const RightWrapper = styled.div`
    display: flex;
    margin-right: 10px;
`;

const LeftWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const Separator = styled.div`
    display: inline-block;
    position: relative;
    width: 10px;
    height: 1px;
    margin: 0 10px;
    
    &:after {
        content: "";
        display: block;
        width: 9px;
        height: 1px;
        border-bottom: 1px solid black;
        position: absolute;
        margin: auto;
        top: 0;
        left: 0;
        right: 0;
    }
`;

class TabHeader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isExchBarOpen: false,
            startDate: null,
            endDate: null,
        };
    }

    handleChangeStartDate = (date) => {
        this.setState({
            startDate: date,
        });
    };

    handleChangeEndDate = (date) => {
        this.setState({
            endDate: date,
        });
    };

    render() {
        return (
            <Wrapper>
                <LeftWrapper>
                    <DropMenu
                        label="Time period"
                        data={timePeriodList}
                    />
                    <DatePicker
                        selected={this.state.startDate}
                        timeInputLabel="Time:"
                        onChange={this.handleChangeStartDate}
                        dateFormat="MM/dd/yyyy h:mm aa"
                        showTimeInput
                    />
                    <Separator/>
                    <DatePicker
                        selected={this.state.endDate}
                        timeInputLabel="Time:"
                        onChange={this.handleChangeEndDate}
                        dateFormat="MM/dd/yyyy h:mm aa"
                        showTimeInput
                    />
                </LeftWrapper>
                <RightWrapper>
                    <DropMenu
                        data={fileFormatList}
                    />
                    <img src={DownloadIcon} alt="Download"/>
                </RightWrapper>
            </Wrapper>
        );
    }
}

export default TabHeader;
