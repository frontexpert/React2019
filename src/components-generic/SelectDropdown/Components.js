import React from 'react';
import styled from 'styled-components';

export const DropdownWrapper = styled.div.attrs({ className: 'dropdown-wrapper' })`
    ${props => props.isFullScreen ? '' : `
        position: relative;
    `}
    width: ${props => props.width ? props.width + 'px' : '100%'};
    height: ${props => props.height ? props.height + 'px' : '40px'};
    margin: 0;
    padding: 0;
    display: flex;
    align-items: stretch;
    justify-content: stretch;
    background: ${props => props.theme.palette.clrBackground};
    border: 1px solid ${props => props.theme.palette.clrInnerBorder};
    border-radius: ${props => props.isOpen
        ? (props.alignTop
            ? `0 0 ${props.theme.palette.borderRadius} ${props.theme.palette.borderRadius}`
            : `${props.theme.palette.borderRadius} ${props.theme.palette.borderRadius} 0 0`)
        : props.theme.palette.borderRadius};
    
    &.close:hover {
        opacity: .8;
    }
`;

export const SelectedItemLabel = styled.span`
    position: relative;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 5px 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: none;
    font-size: 14px;
    font-weight: 700;
    line-height: 1em;
    text-align: left;
    cursor: pointer;

    span {
        display: -webkit-box;
        line-height: 1;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;

export const Dropdown = styled.div`
    position: absolute;
    top: ${props => props.alignTop ? `-${props.height + 1}px` : '100%'};
    left: -1px;
    right: -1px;
    z-index: 100;
    width: calc(100% + 2px);
    height: ${props => props.height}px;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    background: ${props => props.theme.palette.clrBackground};
    border: 1px solid ${props => props.theme.palette.clrBorder};
    ${props => props.alignTop ? `
        border-bottom: 0;
        border-radius: ${props.theme.palette.borderRadius} ${props.theme.palette.borderRadius} 0 0;
    ` : `
        border-radius: 0 0 ${props.theme.palette.borderRadius} ${props.theme.palette.borderRadius};
    `};
    box-shadow: 2px 0 0 2px rgba(0, 0, 0, .2);
`;

export const SearchInputWrapper = styled.div`
    position: relative;
    width: 100%;
    height: ${props => props.isMobile ? '80px' : (props.isBigger ? '60px' : '40px')};
    margin: 0;
    padding: 0;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border: 1px solid ${props => props.theme.palette.clrBorder};
    border-radius: ${props => props.theme.palette.borderRadius};
    text-align: left;

    &.exchange-search {
        height: 60px;
        padding-left: 15px;
        padding-right: 40px;

        input {
            font-size: 18px !important;
            padding-left: 20px;
        }

        svg {
            fill: ${props => props.theme.palette.clrHighContrast};
            height: 30px !important;
        }
    }
`;

export const SearchInput = styled.input`
    position: relative;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 5px 10px;
    flex-grow: 1;
    flex-shrink: 1;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background: transparent;
    border: none;
    font-size: ${props => props.isMobile ? '24px' : (props.isBigger ? '18px' : '14px')};
    // font-weight: 700;
    line-height: 1em;
    color: ${props => props.theme.palette.clrHighContrast};
    text-align: left;
    outline: none !important;
    
    &::placeholder {
        color: ${props => props.theme.palette.clrHighContrast}; 
    } 
`;

export const SearchClose = styled.div`
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 38px;
    margin-right: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover {
        .sprite-icon {
            fill: ${props => props.theme.palette.coinPairSelectHoverAddon};
        }
    }

    .sprite-icon {
        position: relative;
        width: 15px;
        height: 9px;
        fill: ${props => props.theme.palette.coinPairSelectAddon};
        transition: all 0.2s;

        &.arrow {
            display: block;
        }
        
        &.close {
            height: 10px;
            display: none;
        }
    }
`;

export const ItemList = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    margin-top: ${props => props.isMarginTop ? '12px' : ''};
    flex-grow: 1;
    flex-shrink: 1;
    display: flex;
    background: transparent;
    border: 1px solid ${props => props.theme.palette.clrBorder};
    border-radius: ${props => props.theme.palette.borderRadius};
`;

export const ListStyleWrapper = styled.div`
    width: ${props => props.width - 2}px;
    height: ${props => props.isMarginTop ? props.height - 12 : props.height}px;
    box-shadow: ${props => !props.isMarginTop ? '5px 5px 38px 11px rgba(0,0,0,1)' : ''};

    .scrollbar-container {
        height: min-content;
        max-height: 100%;
        overflow: hidden;
        
        &.d-flex {
            flex-wrap: wrap;
        }
    }

    .ps__rail-y {
        right: 0 !important;
        background-color: ${props => props.theme.palette.clrBackground} !important;
        border-left: 1px solid ${props => props.theme.palette.clrInnerBorder};
        border-bottom-right-radius: ${props => props.theme.palette.borderRadius};
        opacity: 0 !important;
        // opacity: 0 !important;

        .ps__thumb-y {
            z-index: 9999;
            cursor: pointer;
            
            &:before {
                background-color: ${props => props.theme.palette.clrBorder};
            }
        }
    }
    
    .ReactVirtualized__Table__rowColumn {
        height: 100%;
        margin: 0;
        // padding: 0 ${props => props.height < props.contentHeight ? '17px' : '0'} 0 0;
        // span {
        //     height: unset !important;
        //     padding: 0 !important;
        //     font-size: ${props => props.isMobile ? '24px !important' : '18px !important'};
        //     line-height: ${props => props.isMobile ? '24px !important' : '18px !important'};
        // }
    }
    
    .ReactVirtualized__Table__row {
        background: ${props => props.theme.palette.clrBackground};
        border-bottom: 1px solid ${props => props.theme.palette.clrInnerBorder};

        &:last-child {
            border-bottom: none;
        }

        &:hover {
            background: ${props => props.theme.palette.clrMouseHover};
        }
        
        &:active {
            background: ${props => props.theme.palette.clrMouseClick};
        }
        
        &:hover,
        &:active {
            .deposit-dropdown-name {
                color: ${props => props.theme.palette.clrHighContrast} !important;
            }
        }
    }
    
    .ReactVirtualized__Table__Grid {
        outline: none !important;
    }
`;

export const ListItem = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    margin: 0;
    padding-left: 15px;
    padding-right: 15px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background: transparent;
    border: none;
    font-size: ${props => props.isMobile ? '24px' : '14px'};
    font-weight: normal;
    line-height: 1em;
    color: ${props => props.theme.palette.clrPurple};
    cursor: pointer;
    white-space: normal;

    &.active {
        background: ${props => props.theme.palette.clrMouseClick};
        color: ${props => props.theme.palette.clrHighContrast};
    }
    
    .bigger {
        display: inline;
        width: 100%;
        align-items: center;
        font-size: ${props => props.isMobile ? '24px' : '18px'} !important;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        min-height: 17px;
    }
    
    span {
        font-weight: 600 !important;
        color: ${props => props.theme.palette.clrHighContrast};
    }

    &.exchange-item {
        font-size: 38px;
        font-weight: 600;
        color: ${props => props.theme.palette.clrPurple};
        
        &.disabled {
            cursor: initial;
        }

        span {
            font-size: 24px !important;
            line-height: 33px !important;
        }

        .api-link {
            margin-left: auto;
            margin-right: 0;
            // margin-right: 5px;          
            cursor: pointer;

            &:hover {
                a {
                    filter: brightness(1.5);
                }
            }
        }
    }
    
    &.exchange-transaction-item {
        padding-left: 70px;
        
        .settings-pop-default-avatar {
            left: 15px;
            margin-bottom: 0;
            font-family: 'Exo 2';
            font-size: 20px;
            font-weight: 500;
        }
    }
    
    .info {
        width: 16px;
        height: 16px;
        background-color: ${props => props.theme.palette.clrPurple};
        border-radius: 50%;
    }
    
    img {
        width: 35px;
        height: 35px;
        margin-right: 8px;
        flex-shrink: 0;
    }
`;

export const ListItem2 = styled(ListItem)`
    // width: 50%;
    // height: 40px;
    border-top: 1px solid ${props => props.theme.palette.clrBorder};
    font-size: 18px;
    font-weight: 600;
    
    // &:nth-child(2n) {
    //     border-left: 1px solid ${props => props.theme.palette.clrBorder};
    // }
    
    // &:nth-child(2),
    &:first-child {
        border-top: 0;
    }
    
    img {
        width: 35px;
        height: 35px;
        margin-right: 8px;
        flex-shrink: 0;
    }
`;

const SearchIconSvg = styled.svg`
    margin: 0 2px 0 10px;
    width: ${props => props.isMobile ? '30px' : '22.5px'};
    height: ${props => props.isMobile ? '25px' : '18.75px'};
    
    &, & * {
        fill: ${props => props.theme.palette.clrPurple} !important;
    }
`;

export const SearchIcon = ({ isMobile }) => {
    return (
        <SearchIconSvg isMobile={isMobile}>
            <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="img/sprite-basic.svg#search"/>
        </SearchIconSvg>
    );
};

export const IconWrapper = styled.div`
    // position: relative;
    width: 60px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-left: 1px solid ${props => props.theme.palette.clrBorder};
    
    &.close:hover {
        opacity: .8;
    }

    &.exchange-wrapper {
        width: fit-content;
        padding: 10px;

        & > div:first-child {
            width: fit-content;

            span {
                width: auto;
                font-size: 20px;
            }
        }

        & > div:nth-child(2) {
            width: 165px;
        }
    }
`;

const Svg = styled.svg`
`;

export const LanguageIcon = (props) => (
    <Svg {...props} x="0px" y="0px" viewBox="0 0 100 75.446">
        <path d="M19.198,44.002v-8.201h-8.575c-3.319,0-6.021-2.874-6.021-6.406V10.903c0-3.533,2.701-6.408,6.021-6.408h38.345   c3.319,0,6.019,2.875,6.019,6.408v18.492c0,3.532-2.7,6.406-6.019,6.406v4.496c5.797,0,10.514-4.891,10.514-10.902V10.903   C59.482,4.892,54.766,0,48.968,0H10.623C4.824,0,0.107,4.892,0.107,10.903v18.492c0,6.011,4.717,10.902,10.516,10.902h4.08v7.968   c0,1.223,0.789,2.332,1.963,2.764c0.334,0.123,0.677,0.184,1.014,0.184c0.821,0,1.609-0.354,2.165-1.01l8.369-9.905h8.353v-4.496   H26.128L19.198,44.002z" />
        <path d="M89.377,24.233h-25.96v4.496h25.96c3.319,0,6.021,2.875,6.021,6.408v18.489c0,3.533-2.701,6.408-6.021,6.408h-8.574v8.205   l-6.931-8.203H51.031c-3.318,0-6.019-2.875-6.019-6.408V35.137c0-3.533,2.701-6.408,6.019-6.408v-4.496   c-5.797,0-10.515,4.892-10.515,10.903v18.491c0,6.014,4.717,10.904,10.515,10.904h20.754l8.372,9.91   c0.555,0.652,1.342,1.004,2.161,1.004c0.337,0,0.68-0.059,1.014-0.182c1.176-0.432,1.967-1.543,1.967-2.768V64.53h4.078   c5.799,0,10.516-4.891,10.516-10.904V35.137C99.893,29.125,95.176,24.233,89.377,24.233z" />
        <path d="M26.532,7.437l-7.952,20.951h4.665l1.644-4.665h7.834l1.584,4.665h4.782L31.255,7.437H26.532z M26.093,20.29l2.729-7.688   h0.058l2.641,7.688H26.093z" />
        <path d="M60.12,49.114c0,2.297,1.468,3.787,3.862,3.787c2.876-0.061,5.721-1.887,6.647-2.711c0.926-0.826,3.42-3.693,4.521-5.963   c1.393,0.658,2.053,1.76,2.053,2.98c0,2.639-2.542,4.17-6.599,4.635l1.968,2.725c6.354-0.832,8.516-3.5,8.516-7.408   c0-3.301-2.077-5.305-4.74-6.183c0.049-0.242,0.138-0.495,0.188-0.74l-3.611-0.643c-0.024,0.365-0.097,0.432-0.168,0.798   c-1.297-0.074-2.738,0.121-3.202,0.219c0-0.66,0.024-2.421,0.049-3.055c3.006-0.122,5.962-0.365,8.699-0.781l-0.318-3.566   c-2.81,0.562-5.523,0.856-8.186,1.003c0.072-0.71,0.172-2.717,0.172-2.717l-3.813-0.291c-0.05,0.978-0.072,2.127-0.121,3.128   c-1.688,0.024-3.689,0.024-4.742,0l0.171,3.446h0.414c1.003,0,2.641-0.051,4.109-0.099c0,0.952,0.023,3.005,0.048,3.934   C62.589,43.051,60.12,45.717,60.12,49.114z M71.606,43.59c-0.514,1.025-1.124,1.957-1.808,2.736   c-0.1-0.807-0.148-1.637-0.196-2.516C69.87,43.762,70.945,43.59,71.606,43.59z M66.229,45.008c0.123,1.369,0.27,2.688,0.489,3.885   c-0.634,0.318-1.244,0.514-1.809,0.539c-1.223,0.049-1.223-0.732-1.223-1.076C63.687,47.059,64.689,45.864,66.229,45.008z" />
    </Svg>
);
