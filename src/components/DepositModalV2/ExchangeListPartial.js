import React from 'react';
import styled from 'styled-components';
import { AutoSizer, Column, Table } from 'react-virtualized';
import { compose, withProps } from 'recompose';
import { inject, observer } from 'mobx-react';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { marginExchanges } from '../SideBar/ExchangePop/margin-de-exchanges';

import { mockData } from '../SideBar/ExchangePop/mock';
import x from '../../components-generic/Modal/x.svg';
import { STORE_KEYS } from '../../stores';

const Wrapper = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: ${props => props.opened ? 'flex' : 'none'};
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.8);
    z-index: 999;
`;

const InnerWrapper = styled.div`
    position: relative;
    margin-bottom: 10px;
    width: 340px;
    height: 260px;
    background: ${props => props.theme.palette.clrBackground};
    border: 1px solid ${props => props.theme.palette.clrPurple};
    border-radius: ${props => props.theme.palette.borderRadius};
`;

const Close = styled.button`
    border-radius: 50%;
    border: 0;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(50%, -50%);
    background-color: ${props => props.theme.palette.modalCloseBackground};
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 21px;
    height: 21px;
    z-index: 999;
    box-shadow: -1px 1px 5px 0px rgba(0,0,0,0.75);

    &:hover {
        cursor: pointer;
    }

    &:focus {
        outline: none;
    }
`;

const Icon = styled.img`
    width: 11px;
    height: 11px;
`;

export const List = styled.div`
    border-radius: ${props => `0 0 ${props.theme.palette.borderRadius} ${props.theme.palette.borderRadius}`};
    width: 100%;
    height: 100%;
    overflow: hidden;
`;

const CheckWrapper = styled.button`
    position: relative;
    width: 20px;
    height: 20px;
    margin-left: auto;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: 0;
    outline: none;
    cursor: pointer;
`;

const CheckBox = styled.svg`
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    width: 20px;
    height: 20px;
    fill: ${props => props.theme.palette.settingsCheckBackground};
    stroke: ${props => props.theme.palette.settingsCheckBorder};
`;

const Checked = styled.svg`
    width: 14px;
    height: 14px;
    fill: ${props => props.theme.palette.settingsItemActive};
`;

export const Check = props => (
    <CheckWrapper {...props}>
        <CheckBox viewBox="0 0 20 20">
            <rect x="0.5" y="0.5" width="19" height="19"/>
        </CheckBox>

        {props.checked && (
            <Checked viewBox="0 0 13.01 9.97">
                <path d="M12.78,1.38,11.64.23a.83.83,0,0,0-1.15,0L5,5.75,2.52,3.27A.81.81,0,0,0,2,3a.78.78,0,0,0-.57.23L.23,4.42A.78.78,0,0,0,0,5a.81.81,0,0,0,.23.57l3,3L4.42,9.74A.74.74,0,0,0,5,10a.77.77,0,0,0,.57-.23L6.7,8.6l6.08-6.08A.81.81,0,0,0,13,2a.78.78,0,0,0-.23-.57Z"/>
            </Checked>
        )}
    </CheckWrapper>
);

export const Item = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
`;

export const Logo = styled.img`
    width: 24px;
    height: 24px;
    margin: 4px;
    border-radius: 50%;
`;

export const Name = styled.a`
    margin-left: 8px;
    max-width: 210px;
    overflow: hidden;
    text-overflow: ellipsis;
    text-decoration: none;
    font-size: 14px;
    font-weight: bold;

    color: ${props => props.status === 'active'
        ? props.theme.palette.settingsItemActive
        : props.status === 'disabled' ? props.theme.palette.settingsItemDisabled : props.theme.palette.settingsText};
    
    span {
        font-weight: normal;
    }
`;

export const LabelAPI = styled.a`
    font-size: 14px;
    color: ${props => props.included ? props.theme.palette.clrBlue : props.theme.palette.clrHighContrast};
    margin-left: ${props => props.isVerified ? '10px' : 'auto'};
    cursor: ${props => props.included ? 'pointer' : 'initial'};
    text-decoration: underline;
    
    &:hover {
        text-decoration: ${props => props.included ? 'underline' : 'none'};
    }
`;

export const StyleWrapper = styled.div`
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    
    .ps__rail-y {
        background-color: ${props => props.theme.palette.settingsBackground} !important;
        border-left: 1px solid ${props => props.theme.palette.clrPurple};
        opacity: 1 !important;
        
        .ps__thumb-y {
            z-index: 9999;
            cursor: pointer;
            
            &:before {
                background-color: ${props => props.theme.palette.clrPurple};
            }
        }
    }
    
    .ReactVirtualized__Table__rowColumn {
        height: 100%;
        padding: 5px 30px 5px 10px;
        margin: 0;
    }
    
    .ReactVirtualized__Table__row {
        border-bottom: 1px solid ${props => props.theme.palette.walletGrid};

        &:last-child {
            border-bottom: none;
        }
    }
    
    .ReactVirtualized__Table__Grid {
        outline: none !important;
    }
`;

class ExchangeListPartial extends React.PureComponent {
    state = {
        scrollTop: 0,
    };

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside = event => {
        if (this.wrapperRef && this.props.opened && !this.wrapperRef.contains(event.target)) {
            this.props.toggle();
        }
    };

    handleScroll = ({ scrollTop }) => {
        this.setState({ scrollTop });
    };

    cellRenderer = ({ rowData }) => {
        let isApiConnected = false;
        let isActive = true;

        if (this.props.exchanges && this.props.exchanges[rowData.name]) {
            const exchangeValue = this.props.exchanges[rowData.name];
            isApiConnected = exchangeValue && !!exchangeValue.enabled;
            isActive = exchangeValue && (typeof exchangeValue.active === 'undefined' ? true : exchangeValue.active);
        }

        const included = marginExchanges.includes(rowData.name);

        return (
            <Item>
                <Logo src={`/img/exchange/${rowData.icon}`} alt=""/>
                <Name
                    href={rowData.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    status={isApiConnected ? 'active' : ''}
                >
                    {rowData.name}
                </Name>

                {isApiConnected && (
                    <Check
                        checked={isActive}
                        onClick={() => this.props.setExchangeActive(rowData.name, !isActive)}
                    />
                )}

                {!isApiConnected &&
                <LabelAPI
                    included={included}
                    onClick={() => this.props.onOpenApi({ included, exchange: rowData.name })}
                    isVerified={isApiConnected}
                >
                    API
                </LabelAPI>
                }
            </Item>
        );
    };

    render() {
        const {
            scrollTop,
        } = this.state;
        let data = mockData;

        return (
            <Wrapper opened={this.props.opened}>
                <InnerWrapper
                    innerRef={ref => { this.wrapperRef = ref; }}
                >
                    <Close onClick={this.props.toggle}>
                        <Icon src={x}/>
                    </Close>

                    <List>
                        <AutoSizer>
                            {({ width, height }) => {
                                return (
                                    <StyleWrapper width={width} height={height} length={data.length}>
                                        <PerfectScrollbar
                                            option={{
                                                suppressScrollX: true,
                                                minScrollbarLength: 50,
                                            }}
                                            onScrollY={this.handleScroll}
                                        >
                                            <Table
                                                autoHeight={true}
                                                width={width}
                                                height={height}
                                                headerHeight={20}
                                                disableHeader={true}
                                                rowCount={data.length}
                                                rowGetter={({ index }) => data[index]}
                                                rowHeight={40}
                                                overscanRowCount={0}
                                                scrollTop={scrollTop}
                                            >
                                                <Column
                                                    width={width}
                                                    dataKey="Exchange"
                                                    cellRenderer={this.cellRenderer}
                                                />
                                            </Table>
                                        </PerfectScrollbar>
                                    </StyleWrapper>
                                );
                            }}
                        </AutoSizer>
                    </List>
                </InnerWrapper>
            </Wrapper>
        );
    }
}

const withStores = compose(
    inject(STORE_KEYS.EXCHANGESSTORE),
    observer,
    withProps(
        ({
            [STORE_KEYS.EXCHANGESSTORE]: {
                exchanges,
                setExchangeActive,
            },
        }) => ({
            exchanges,
            setExchangeActive,
        })
    )
);

export default withStores(ExchangeListPartial);
