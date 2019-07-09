import React from 'react';
import styled from 'styled-components';

import { darkTheme } from '../../../theme/core';
import avatarImg from '../../SideBar/icons/avatar.svg';

const { palette } = darkTheme;

export const Wrapper = styled.div.attrs({ className: 'history-view-v2' })`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: 0;
    border: none;
    padding: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    background: ${palette.mobile2Bg};
    // Set higher than glow
    z-index: 99999;
`;

export const HeaderWrapper = styled.div.attrs({ className: 'history-view-v2__header-wrapper' })`
    flex: 0 0 50px;
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    margin: 0;
    border: none;
    padding: 25px;
    width: 100%;
    height: 50px;
    // background: ${palette.mobile2HeaderBgNormal};
    background: transparent;
    // transition: .3s;
    
    &.highlighted {
        background: ${palette.mobile2HeaderBgHighlight} !important;
    }
`;

const HeaderRightBtnSvgWrapper = styled.svg`
    width: 20px;
    height: 40px;
    
    path {
        stroke: ${palette.mobile2HeaderBtnFill};
        stroke-miterlimit: 10;
        stroke-width: 13px;
        fill: none;
    }
`;

export const HeaderRightBtnSvg = props => (
    <HeaderRightBtnSvgWrapper {...props} viewBox="0 0 57.57 104.57">
        <g id="Layer_2" data-name="Layer 2">
            <g id="Layer_1-2" data-name="Layer 1">
                <path className="cls-1" d="M4.6,4.6,50.27,50.26a3,3,0,0,1,0,4.05L4.6,100" />
            </g>
        </g>
    </HeaderRightBtnSvgWrapper>
);

export const ContentWrapper = styled.div.attrs({ className: 'history-view-v2__content-wrapper' })`
    flex: 1 1 auto;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: stretch;
    margin: 0;
    border: none;
    padding: 0;
    width: 100%;
    height: 100%;
    background: ${palette.mobile2ContentBg};
`;

export const AmountWrapper = styled.div`
    flex-shrink: 0;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    margin: 0;
    border: none;
    padding: 40px 25px 25px;
    width: 100%;
    height: min-content;
    // background: ${palette.mobile2HeaderBgNormal};
    background: transparent;

    font-size: 61px;
    font-weight: bold;
    line-height: 1em;
    // transition: .3s;

    .inner-wrapper {
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin: 0;
        border: 2px solid ${palette.mobile2HistoryHeaderBorder};
        border-radius: 10px;
        width: 100%;
        height: 211px;
    }
    
    .label {
        position: absolute;
        top: 25px;
        left: 25px;
        color: ${palette.mobile2HeaderBtnFill};
        font-size: 17px;
        font-weight: bold;
        line-height: 1em;
    }

    .amount {
        // transition: .3s;
        word-break: break-all;
        text-align: center;
        color: ${palette.mobile2HeaderAmountColor};
    }
    
    .unit, .selected-item {
        // transition: .3s;
        margin-left: .2em;
        color: ${palette.mobile2HeaderUnitColor};
        font-weight: lighter;
    }
    
    &.highlighted {
        // background: ${palette.mobile2HeaderBgHighlight} !important;
        
        .amount {
            color: ${palette.mobile2HeaderAmountHighlightColor} !important;
        }
    }
`;

export const InviteBtn = styled.button`
    flex: 0 0 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 0 0;
    border: none;
    padding: 0;
    width: 100%;
    height: 80px;
    color: ${palette.mobile2InviteBtnColor};
    background: ${palette.mobile2InviteBtnBg};
    font-size: 17px;
    font-family: 'Exo 2', sans-serif;
    font-weight: bold;
    line-height: 1.1em;
    outline: none !important;
`;

export const HeaderText = styled.span`
    color: ${palette.mobile2HeaderBtnFill};
    font-size: 17px;
    font-weight: bold;
    line-height: 1em;
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
    width: 33px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-right: 1px solid ${palette.clrBorder};
`;

export const AvatarWrapper = styled.div.attrs({ className: 'history-view__avatar-wrapper' })`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 33px;
    height: 33px;
    border-radius: 50%;
    background-image: url("/img/default-avatar.png");
    background-size: contain;
    overflow: hidden;
    z-index: 2;
    
    .user-pic {
        z-index: 2;
        width: 33px;
        height: 33px;
    }
`;

export const DefaultAvatar = styled.div.attrs({ className: 'history-view__default-avatar' })`
    position: absolute;
    width: 33px;
    height: 33px;
    background: ${props => props.color};
    color: #fff;
    font-size: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    min-width: 33px;
    min-height: 33px;
    margin: 0 0 5px;
    z-index: 1;
`;

export const AvatarImage = props => (
    <ImageWrapper
        {...props}
    >
        <img src={avatarImg} width={50} height={50} alt="" />
    </ImageWrapper>
);

export const TotalPrice = styled.div.attrs({ className: 'history-view__total-price' })`
    flex-grow: 0;
    flex-shrink: 0;
    position: relative;
    display: flex;
    margin: 0;
    border: none;
    border-bottom: 1px solid ${palette.clrBorder};
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
        color: ${palette.clrPurple};
        line-height: 1em;
        text-align: center;
    }
    
    span.total-price-value {
        margin: 0;
        border: none;
        padding: 0;
        font-size: 25px;
        font-weight: bold;
        color: ${palette.clrHighContrast};
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
    color: ${palette.clrDarkBlue};
    text-decoration: underline;
    outline: none !important;
    cursor: pointer;
    
    &:hover {
        color: ${palette.clrHighContrast};
    }
`;

export const List = styled.div.attrs({ className: 'history-view__list' })`
    flex: 1;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
    border-radius: ${`0 0 ${palette.borderRadius} ${palette.borderRadius}`};
    overflow: hidden;
`;

export const TableWrapper = styled.div.attrs({ className: 'history-view__table-wrapper' })`
    width: ${props => props.width}px;
    height: ${props => props.height}px;

    .ps__rail-y {
        background-color: ${palette.clrBackground} !important;
        border-left: 1px solid ${palette.mobile2HistoryItemBorder};
        opacity: 1 !important;
        
        .ps__thumb-y {
            z-index: 9999;
            cursor: pointer;

            &:before {
                background-color: ${palette.mobile2HistoryItemBorder};
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
        border-bottom: 1px solid ${palette.mobile2HistoryItemBorder};
        overflow: visible !important;

        &:last-child {
            // border-bottom: none;
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
    padding: 15px 25px;
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
    margin: auto;
    border: none;
    padding: 0;
    width: 100%;
    font-size: 17px;
    font-weight: normal;
    color: ${palette.clrGray};
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
    padding: 15px 0 15px 10px;
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
    font-size: 14px;
    font-family: 'Exo 2', sans-serif;
    font-weight: normal;
    color: ${palette.clrHighContrast};
    line-height: 1em;
    text-align: left;
`;

export const TransactionDate = styled.div.attrs({ className: 'history-transaction-date' })`
    display: flex;
    border: none;
    padding: 0;
    font-size: 10px;
    font-family: 'Exo 2', sans-serif;
    font-weight: normal;
    color: ${palette.clrLightGray};
    line-height: 1em;
    text-align: left;

    svg {
        fill: ${palette.clrGray};
        transform: translate(0px, 1px);
    }
    
    > span {
        flex: 1;
    }
    
    > button {
        display: ${props => !props.isPending ? 'none' : 'block'};
        background: transparent;
        border: 0;
        color: ${palette.clrLightGray};
        font-size: 10px;
        cursor: pointer;
        outline: none;
        padding: 0 0 1px 0;
        // border-bottom: 1px solid ${palette.clrBlue};
    }
    
    > .status {
        flex: 0 0 auto;
        margin-left: auto;
        color: ${props => props.isCanceled ? palette.clrGray : palette.clrHighContrast};
        display: ${props => props.isPending ? 'none' : 'block'};
    }
`;

export const TransactionAmount = styled.div.attrs({ className: 'history-transaction-amount' })`
    align-items: center;
    justify-content: flex-end;
    margin: 0 0 0 auto;
    border: none;
    padding: 0 0 0 5px;
    font-size: 14px;
    font-weight: normal;
    font-family: 'Exo 2', sans-serif;
    color: ${palette.clrHighContrast};
    line-height: 1em;
    text-align: right;
    display: inline;
    text-decoration: ${props => props.isCanceled ? 'line-through' : ''};
    
    &.clr-green {
        color: ${palette.clrHighContrast} !important;
    }
    
    &.clr-red {
        color: ${palette.clrGray} !important;
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

export const SettingsWrapper = styled.div`
    flex: 0 0 80px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    margin: 0 0 0;
    border: none;
    padding: 0;
`;

export const SettingsItem = styled.div`
    flex: 0 0 80px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin: 0;
    border: none;
    padding: 10px 30px;
    font-family: 'Exo 2', sans-serif;
    font-size: 17px;
    font-weight: bold;
    color: ${palette.mobile2HistoryItemColor};
`;

const CloseSvg = styled.svg`
    width: 20px;
    height: 20px;

    & * {
        fill: white;
    }
`;

export const CloseIcon = props => (
    <CloseSvg {...props} viewBox="0 0 9.38 9.38">
        <path transform="rotate(135 4.694 4.692)" d="M-1.38 4.13h12.14v1.13H-1.38z" />
        <path transform="rotate(45 4.687 4.691)" d="M-1.38 4.13h12.14v1.13H-1.38z" />
    </CloseSvg>
);
