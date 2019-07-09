import React from 'react';
import styled from 'styled-components';
import {Tooltip} from "react-tippy";

const PercentBarStyleWrapper = styled.div`
    flex-shrink: 0;
    display: flex;
    box-sizing: border-box;
    flex-direction: row;
    align-items: stretch;
    justify-content: flex-start;
    margin: 0;
    border: 1px solid ${props => props.theme.palette.exchTablePercentBorder};
    background-color: transparent;
    padding: 0;
    width: 100%;
    height: 82px;
    
    .percent-bar__item {
        box-sizing: border-box;
        height: 100%;
        margin: 0;
        border: 1px solid ${props => props.theme.palette.exchTablePercentBorder};
        padding: 0;
        position: relative;
        cursor: pointer;
    }
`;

const BarContent = styled.div`
    width: 100%;
    height: 100%;
`;

class PercentBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const {data} = this.props;

        // calculate total amount
        let widthTotal = 0;
        if (data && data.length) {
            for (let i = 0; i < data.length; i++) {
                widthTotal += Number.parseFloat(data[i].splitRel || 0);
            }
        }
        const widthUnit = widthTotal / 100;

        return (
            <PercentBarStyleWrapper className="percent-bar">
                {(data && data.length) &&
                data.map((item, key) => {
                    const width = (Number.parseFloat(item.splitRel || 0) / widthUnit) || 0;
                    return (
                        <div className="percent-bar__item"
                             key={key}
                             style={{
                                 width: `${width}%`,
                                 flexGrow: width,
                                 background: item.exchangeColor,
                             }}
                        >
                            <Tooltip
                                arrow={true}
                                animation={'shift'}
                                position={'bottom'}
                                placement={'right'}
                                distance={13}
                                theme={'bct'}
                                title={`${item.exchange}, ${item.splitRel} %`}
                            >
                                <BarContent/>
                            </Tooltip>
                        </div>
                    )
                })
                }
            </PercentBarStyleWrapper>
        );
    }
}

export default PercentBar;