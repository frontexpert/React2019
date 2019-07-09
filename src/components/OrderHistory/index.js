import React from 'react';
import styled from 'styled-components';

import OrderHistoryTable from './OrderHistoryTable';

const Wrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: translate(0, ${props => !props.visible ? '100%' : '0'});
    transition: transform 0.25s ease-in-out, border 0.25s ease-in-out;
    z-index: 101;
`;

const ToggleBtn = styled.div`
    width: 100%;
    height: 15px;
    padding: 0 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid ${props => props.theme.palette.clrBorder};
    border-radius: ${props => props.theme.palette.borderRadius} ${props => props.theme.palette.borderRadius} 0 0;
    background-color: ${props => props.theme.palette.walletToggle};
    z-index: 100;
    
    svg {
        &, & * {
            fill: ${props => props.theme.palette.clrBorder};
        }
    }
    
    &:hover {
        cursor: pointer;
        
        svg {
            &, & * {
                fill: ${props => props.theme.palette.clrHighContrast} !important;
            }
        }
    }
`;

const Svg = styled.svg`
    fill: ${props => props.theme.palette.clricon};
    width: 10px;
    height: 14px;
`;

class OrderHistory extends React.Component {
    componentDidMount() {
    }

    render() {
        const {
            orderHistoryMode,
        } = this.props;

        return (
            <Wrapper visible={orderHistoryMode}>
                <OrderHistoryTable />
            </Wrapper>
        );
    }
}

export default OrderHistory;
