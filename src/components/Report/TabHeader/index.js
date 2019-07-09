import React from 'react';
import styled from 'styled-components';

import DatePicker from 'react-datepicker';

import DropMenu from '../DropMenu';
import DownloadIcon from './download.svg';

import 'react-datepicker/dist/react-datepicker.css';

import { timePeriodList, fileFormatList } from '../constants';

const Wrapper = styled.div`
    display: flex;
    position: relative;
    padding: 10px 0;
    justify-content: space-between;
    border-bottom: 1px solid #454c73;
    background-color: ${props => props.theme.palette.clrMainWindow};
    .react-datepicker__header{
        background-color: ${props => props.theme.palette.clrBackground};
        border-bottom: 1px solid #454c73;
    }
    .react-datepicker__input-container input{
        background-color: ${props => props.theme.palette.clrDarkPurple};
        border: 1px solid #454c73;
        outline-color: white;
        color: ${props => props.theme.palette.clrPurple};
        padding: 5px;
    }
    .day--keyboard-selected{
        color: white;
    }
    .react-datepicker{
        background: ${props => props.theme.palette.clrBackground};
        border: 1px solid #454c73;
    }
    .react-datepicker__day-name, .react-datepicker-time__caption{
        color:${props => props.theme.palette.clrPurple};
    }
    .react-datepicker__current-month{
        color:${props => props.theme.palette.clrPurple};
    }
    .react-datepicker__day{
        color:${props => props.theme.palette.clrPurple};
    }
    .react-datepicker__month-container{
        background-color: ${props => props.theme.palette.clrMainWindow};
        padding: 0.4em;
        margin: 0;
        border-bottom: 1px solid #454c73;
    }
    .react-datepicker-time__input{
        background-color: ${props => props.theme.palette.clrMainWindow};
        border: 1px solid #454c73;
        margin-left: 0;
        text-align: center;
        color: ${props => props.theme.palette.clrPurple};
    }
`;

const RightWrapper = styled.div`
    display: flex;
    margin-right: 10px;
    
    .file-upload {
        display: flex;
        cursor: pointer;
        width: 35px;
        justify-content: center;
        
        &:hover {
            background: #747ba6;
            border-radius: 100%;
        }
        
        input[type="file"] {
            display: none;
        }
    }
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
        border-bottom: 1px solid #454c73;
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
        this.props.changeStartDate(date);
    };

    handleChangeEndDate = (date) => {
        this.setState({
            endDate: date,
        });
        this.props.changeEndDate(date);
    };

    openImageUpload = () => {
        return this.uploadRef.click();
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
                    <div className="file-upload" onClick={this.openImageUpload}>
                        <img src={DownloadIcon} alt="Download" />
                        <input type="file" ref={ref => this.uploadRef = ref} />
                    </div>
                </RightWrapper>
            </Wrapper>
        );
    }
}

export default TabHeader;
