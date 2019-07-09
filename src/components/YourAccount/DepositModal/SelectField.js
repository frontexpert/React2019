import React from 'react';
import styled from 'styled-components';

import AddFundsModal from '../AddFundsModal';

const Wrapper = styled.div`
    margin-top: 10px;
    display: flex;
    justify-content: 'flex-start';
    font-size: 0.6rem;
    
    @media only screen and (min-width : 1920px) {
        font-size: 0.7rem;
    }
`;

const BottomItem = styled.p`
    margin: 0;
    margin-left: ${props => props.isFirst ? '30px' : 0};
    border-bottom: 1px solid ${props => props.theme.palette.depositLink};
    text-decoration: none;
    color: ${props => props.theme.palette.depositLink};
    font-size: 12px;
    line-height: 1.2;

    &:hover {
        border-color: ${props => props.theme.palette.contrastText};
        color: ${props => props.theme.palette.contrastText};
        cursor: pointer;
    }
`;

const addFundsModal = (Modal, portal, additionalVerticalSpace, coin, isBuy) => Modal({
    portal,
    additionalVerticalSpace,
    ModalComponentFn: () => <AddFundsModal coin={coin} isBuy={isBuy}/>,
});

const SelectField = ({ coin, Modal, handleOpen }) => {
    const isFiat = (coin || '').includes('F:');
    return (
        <Wrapper isBCT={coin === 'BCT'}>
            <BottomItem onClick={() => handleOpen('history')}>
                <span>History</span>
            </BottomItem>

            {coin === 'BCT'
                ? (
                    <BottomItem isFirst={true} onClick={() => addFundsModal(Modal, 'graph-chart-parent', true, coin, false)}>
                        <span>Add Funds</span>
                    </BottomItem>
                )
                : (isFiat
                    ? [
                        <BottomItem isFirst={true} key={2} onClick={() => handleOpen('stablecoin')}>
                            <span>Stablecoin</span>
                        </BottomItem>,
                        <BottomItem isFirst={true} key={3} onClick={() => addFundsModal(Modal, 'graph-chart-parent', true, (coin || '').replace('F:', ''), true)}>
                            <span>Buy Crypto</span>
                        </BottomItem>
                    ] : (
                        <BottomItem isFirst={true} key={3} onClick={() => addFundsModal(Modal, 'graph-chart-parent', true, (coin || '').replace('F:', ''), true)}>
                            <span>Buy Crypto</span>
                        </BottomItem>
                    ))
            }
        </Wrapper>
    );
};

export default SelectField;
