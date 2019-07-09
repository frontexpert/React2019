import React from 'react';
import styled from 'styled-components';

// import PieChart from './PieChart';
import WalletTable from './WalletTable';
// import OrderHistory from '../OrderHistory';

const StyledPortfolioGrid = styled.div`
    min-height: calc(100% - 1px);
    margin-top: 0;
    
    .scroll__scrollup {
        right: 21px;
        bottom: ${props => props.isAdvanceMode ? '20px' : '6px'};
        
        &.upper {
            bottom: ${props => props.showDepthChart ? '55px !important' : ''};
        }
    }
`;

const ToggleBtn = styled.div`
    position: absolute;
    bottom: 0px;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid ${props => props.theme.palette.clrBorder};
    border-radius: 0 0 ${props => props.theme.palette.borderRadius} ${props => props.theme.palette.borderRadius};
    padding: 0 5px;
    width: 100%;
    height: 15px;
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

// const ChartGridArea = styled.div`
//     grid-area: chart;
//     padding-top: 45px;
// `;
//
// const DataGridArea = styled.div`
//     grid-area: data;
//     border-left: ${props => `1px solid ${props.theme.palette.clrseparator}`};
//     overflow: hidden;
// `;

const YourAccount = ({
    toggleViewMode, isAdvanceMode, showYourAccountToggleBtn, showDepthChart,
}) => {
    return(
        <StyledPortfolioGrid isAdvanceMode={isAdvanceMode} showDepthChart={showDepthChart}>
            {showYourAccountToggleBtn && (
                <ToggleBtn onClick={() => { toggleViewMode(true); }}>
                    <Svg viewBox="0 0 284.929 284.929">
                        <path
                            d="M282.082 195.285L149.028 62.24c-1.901-1.903-4.088-2.856-6.562-2.856s-4.665.953-6.567 2.856L2.856 195.285C.95 197.191 0 199.378 0 201.853c0 2.474.953 4.664 2.856 6.566l14.272 14.271c1.903 1.903 4.093 2.854 6.567 2.854s4.664-.951 6.567-2.854l112.204-112.202 112.208 112.209c1.902 1.903 4.093 2.848 6.563 2.848 2.478 0 4.668-.951 6.57-2.848l14.274-14.277c1.902-1.902 2.847-4.093 2.847-6.566.001-2.476-.944-4.666-2.846-6.569z"
                        />
                    </Svg>
                </ToggleBtn>
            )}

            <WalletTable/>
        </StyledPortfolioGrid>
    );
};

export default YourAccount;
