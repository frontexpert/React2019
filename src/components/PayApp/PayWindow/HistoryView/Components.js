import React from 'react';
import styled from 'styled-components';
import avatarImg from '../../../SideBar/icons/avatar.svg';

export const Wrapper = styled.div.attrs({ className: 'history-view__wrapper' })`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
    border-top: 1px solid ${props => props.theme.palette.clrBorder};
    border-radius: ${props => props.theme.palette.borderRadius};
    background-color: ${props => props.theme.palette.clrBackground};
    font-size: 18px;
    font-weight: 600;
    color: ${props => props.theme.palette.clrPurple};
    z-index: 999999;
    
    .ps__rail-y {
        background-color: ${props => props.theme.palette.clrBackground} !important;
        border-left: 1px solid ${props => props.theme.palette.clrBorder};
        opacity: 1 !important;
        
        .ps__thumb-y {
            z-index: 9999;
            cursor: pointer;
            
            &:before {
                background-color: ${props => props.theme.palette.clrBorder};
            }
        }
    }
    
    .coin-icon, .no-icon {
        width: 20px !important;
        height: 20px !important;
        background-size: contain !important;
        display: inline-block;
    }
`;

export const Header = styled.div.attrs({ className: 'history-view__header' })`
    flex-shrink: 0;
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 15px 0 0;
    width: 100%;
    height: 60px;
    background: transparent;
    border-bottom: 1px solid ${props => props.theme.palette.clrBorder};
    border-radius: ${props => `${props.theme.palette.borderRadius} ${props.theme.palette.borderRadius} 0 0`};
    color: ${props => props.theme.palette.clrHighContrast};
    fill: ${props => props.theme.palette.clrHighContrast};
    overflow: hidden;

    span {
        margin-left: 10px;
    }
`;

export const Content = styled.div.attrs({ className: 'history-view__content' })`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
    border-radius: ${props => `0 0 ${props.theme.palette.borderRadius} ${props.theme.palette.borderRadius}`};
    overflow: hidden;
`;

export const UserInfoWrapper = styled.div.attrs({ className: 'history-view__user-info-wrapper' })`
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    height: 100%;
`;

export const ImageWrapper = styled.div.attrs({ className: 'avatar-image-wrapper' })`
    width: 60px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-right: 1px solid ${props => props.theme.palette.clrBorder};
`;

export const AvatarWrapper = styled.div.attrs({ className: 'history-view__avatar-wrapper' })`
    display: flex;
    align-items: center;
    justify-content: center;
    // width: 40px;
    // height: 40px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-image: url("/img/default-avatar.png");
    background-size: contain;
    overflow: hidden;
    z-index: 2;
    
    .user-pic {
        z-index: 2;
        width: 50px;
        height: 50px;
    }
`;

export const DefaultAvatar = styled.div.attrs({ className: 'history-view__default-avatar' })`
    position: absolute;
    width: 50px;
    height: 50px;
    background: ${props => props.color};
    color: #fff;
    font-size: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    min-width: 40px;
    min-height: 40px;
    margin: 0 0 5px;
    z-index: 1;
`;

export const AvatarImage = props => (
    <ImageWrapper
        {...props}
    >
        <img src={avatarImg} width={50} height={50} alt=""/>
    </ImageWrapper>
);

export const TotalPrice = styled.div.attrs({ className: 'history-view__total-price' })`
    flex-grow: 0;
    flex-shrink: 0;
    position: relative;
    display: flex;
    margin: 0;
    border: none;
    border-bottom: 1px solid ${props => props.theme.palette.clrBorder};
    padding: 10px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: min-content;
    
    span.total-price-label {
        margin: 0 0 5px;
        border: none;
        padding: 0;
        font-size: 22px;
        font-weight: normal;
        color: ${props => props.theme.palette.clrPurple};
        line-height: 1em;
        text-align: center;
    }
    
    span.total-price-value {
        margin: 0;
        border: none;
        padding: 0;
        font-size: 25px;
        font-weight: bold;
        color: ${props => props.theme.palette.clrHighContrast};
        line-height: 1em;
        text-align: center;
    }
`;

export const DepositBtn = styled.button`
    position: absolute;
    bottom: 5px;
    right: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    border: none;
    padding: 3px;
    background: transparent;
    color: ${props => props.theme.palette.clrDarkBlue};
    text-decoration: underline;
    outline: none !important;
    cursor: pointer;
    
    &:hover {
        color: ${props => props.theme.palette.clrHighContrast};
    }
`;

export const List = styled.div.attrs({ className: 'history-view__list' })`
    flex: 1;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
    border-radius: ${props => `0 0 ${props.theme.palette.borderRadius} ${props.theme.palette.borderRadius}`};
    overflow: hidden;
`;

export const TableWrapper = styled.div.attrs({ className: 'history-view__table-wrapper' })`
    width: ${props => props.width}px;
    height: ${props => props.height}px;

    .ps__rail-y {
        background-color: ${props => props.theme.palette.clrBackground} !important;
        border-left: 1px solid ${props => props.theme.palette.clrBorder};
        opacity: 1 !important;
        
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
        padding: 0;
        display: flex;
        text-overflow: inherit;
        overflow: visible !important;
        
        &:last-child {
            border-right: 0;
            padding-right: 15px;
        }
    }
    
    .ReactVirtualized__Table__row {
        border-bottom: 1px solid ${props => props.theme.palette.clrBorderLight};
        overflow: visible !important;

        &:last-child {
            border-bottom: none;
        }
    }
    
    .ReactVirtualized__Table__Grid {
        outline: none !important;
    }
`;

export const HistoryCell = styled.div`
    position: relative;
    display: flex;
    margin: 0;
    padding: 15px;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: flex-start;
    
    .avatar-image-wrapper {
        border: none !important;
    }
`;

export const NoDataText = styled.span.attrs({ className: 'history-no-data-text' })`
    align-self: center;
    margin: auto auto auto;
    border: none;
    padding: 0;
    width: 100%;
    font-size: 25px;
    font-weight: bold;
    color: ${props => props.theme.palette.clrBorderLight};
    line-height: 1em;
    text-align: center;
`;

export const TransactionInfo = styled.div.attrs({ className: 'history-transaction-info' })`
    flex: 1;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-weight: normal;
    margin: 0;
    border: none;
    padding: 15px 0 15px 15px;
    overflow: hidden;
`;

export const TransactionTitle = styled.div.attrs({ className: 'history-transaction-title' })`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 0 0 6px;
    border: none;
    padding: 0;
    font-size: 24px;
    color: ${props => props.theme.palette.clrBorderHover};
    line-height: 1em;
    text-align: left;

    @media (max-width: 768px) {
        font-size: 26px;
    }
`;

export const TransactionDate = styled.div.attrs({ className: 'history-transaction-date' })`
    display: flex;
    border: none;
    padding: 0;
    font-size: 18px;
    color: ${props => props.theme.palette.clrBorder};
    line-height: 1em;
    text-align: left;

    svg {
        fill: ${props => props.theme.palette.clrBorder};
        transform: translate(0px, 1px);
    }
    
    > span {
        flex: 1;
    }
    
    > button {
        display: ${props => !props.isPending ? 'none' : 'block'};
        background: transparent;
        border: 0;
        color: ${props => props.theme.palette.clrBlue};
        font-size: 20px;
        cursor: pointer;
        outline: none;
        padding: 0 0 1px 0;
        border-bottom: 1px solid ${props => props.theme.palette.clrBlue};
    }

    @media (max-width: 768px) {
        font-size: 20px;
    }
`;

export const TransactionAmount = styled.div.attrs({ className: 'history-transaction-amount' })`
    align-items: center;
    justify-content: flex-end;
    margin: 0 0 0 auto;
    border: none;
    padding: 0 5px;
    font-size: 24px;
    color: ${props => props.theme.palette.clrBorder};
    line-height: 1em;
    text-align: right;
    display: inline;
    text-decoration: ${props => props.isCanceled ? 'line-through' : ''};
    
    &.clr-green {
        color: ${props => props.theme.palette.clrBorderHover} !important;
    }
    
    &.clr-red {
        color: ${props => props.theme.palette.clrBorder} !important;
    }

    @media (max-width: 768px) {
        font-size: 26px;
    }
`;

export const LoadingWrapper = styled.div`
    flex: 1 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
`;
