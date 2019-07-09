import React from 'react';
import styled from 'styled-components';

import { darkTheme } from '../../theme/core';

const { palette } = darkTheme;

export const DropdownWrapper = styled.div.attrs({ className: 'user-avatar-dropdown-wrapper' })`
    top: ${props => props.isArbCondition ? 'calc(100% + 12px)' : ''};
    left: -1px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    margin: 0;
    border: 1px solid ${palette.userMenuPopupBorder};
    border-top: 0;
    border-radius: ${palette.borderRadius};
    padding: 0;
    width: ${props => props.leftSidebarWidth ? ((props.leftSidebarWidth) + 'px') : '200px'};
    height: ${props => props.gridHeight ? (props.isArbCondition ? ((props.gridHeight - 101) + 'px') : ((props.gridHeight - 29) + 'px')) : '100vh'};
    background: transparent;
    // Higher than order table
    z-index: 999;
    box-shadow: 2px 0 0 2px rgba(0, 0, 0, .2);
    
    .btn_reset {
        border-radius: ${props => props.theme.palette.borderRadius};
        border: 0;
        background: ${props => props.theme.palette.clrLightRed};
        color: ${props => props.theme.palette.clrHighContrast};
        outline: none;
        margin-right: 15px;
        height: 31px;
        max-width: 110px;
        width: auto;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        
        &:hover {
            opacity: 0.8;
        }
    }
`;

export const DropdownArrow = styled.div`
    position: absolute;
    margin-top: 50px;
    margin-left: 25px;
    border: none;
    border-bottom: 6px solid ${palette.userMenuPopupArrowBg};
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    padding: 0;
    width: 6px;
    background: transparent;
`;

export const DropdownAvatar = styled.div`
    flex: 0 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: 25px 5px;
    border: 1px solid ${palette.userMenuPopupItemBorder};
    border-radius: ${palette.borderRadius} ${palette.borderRadius} 0 0;
    background: ${palette.userMenuPopupBg};
    
    .user-avatar-component {
        border: none !important;
        height: 135px !important;
        width: 135px !important;
        pointer-events: none !important;
        
        svg {
            height: 135px !important;
            width: 135px !important;
        }
    }
    
    .settings-pop-avatar-wrapper, .settings-pop-default-avatar, .user-pic {
        border: none !important;
        margin: 0 !important;
        width: 135px !important;
        height: 135px !important;
    }
`;

export const AvatarButtons = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px 0 0;
    border: none;
    padding: 0;
    font-size: 17px;
    font-weight: bold;
    cursor: pointer;

    color: ${palette.clrHighContrast};
    
    &:hover {
        span {
            color: ${palette.userMenuPopupAvatarLinkHover};
        }        
    }
`;

export const AuthLink = styled.span`
    margin: 0 .5rem;
    color: ${palette.userMenuPopupAvatarLink};
    cursor: pointer;

    &:hover {
        color: ${palette.userMenuPopupAvatarLinkHover};
    }
`;

export const DropdownMenu = styled.div`
    flex: 1;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    margin: 0;
    border: none;
    border-top: ${props => props.isArbCondition ? 0 : 1}px solid ${palette.userMenuPopupBorder};
    padding: 0;
    width: 100%;
    height: min-content;
    overflow: auto;

    .scrollbar-container {
        // Gets bigger with items
        // height: auto;
        // max-height: 100%;
        
        // 100%
        height: 100%;
        display: flex;
        flex-direction: column;
        box-shadow: 0 2px 10px rgba(0,0,0,.35);
        // border: 1px solid ${palette.userMenuPopupBorder};
        // border-top: none;
        border-radius: ${palette.borderRadius}; // 0 0 ${palette.borderRadius} ${palette.borderRadius};
        background: ${palette.userMenuPopupBg};
        overflow: hidden;
        
        .ps__rail-y {
            opacity: 0 !important;
            border-left: 1px solid ${palette.userMenuPopupBorder};
            background: ${palette.userMenuPopupBg};

            .ps__thumb-y {
                &:before {
                    background: ${palette.userMenuPopupBorder};
                }
                cursor: pointer;
            }
        }
    }
`;

export const DropdownMenuItem = styled.div`
    flex-shrink: 0;
    position: relative;
    display: flex;
    flex-direction: ${props => props.isColumn ? 'column' : 'row'};
    align-items: center;
    justify-content: stretch;
    margin: 0;
    border: none;
    border-top: 1px solid ${palette.userMenuPopupMenuItemBorder};
    border-bottom: ${props => props.last ? '1px solid ' + palette.userMenuPopupMenuItemBorder : ''};
    padding: ${props => props.isColumn ? 0 : '10px 0'};
    width: 100%;
    min-height: 60px;
    background: ${palette.userMenuPopupMenuItemBg};
    cursor: auto;
    // z-index: 100;
    
    ${props => (props.opened && props.isFullHeight) ? 'flex: 1;' : ''};
    ${props => (!props.opened && props.isFullHeight) ? `border-bottom: 1px solid ${palette.userMenuPopupMenuItemBorder};` : ''};
    ${props => props.opened ? `
        height: min-content !important;
    ` : ''};

    // &:last-child {
    //     border-bottom: none;
    // }
    //
    // &:nth-child(2n + 1) {
    //     border-bottom: 1px solid ${palette.clrBorderLight};
    // }
    
    .d-flex {
        flex-shrink: 0;
        width: 100%;
        height: 60px;
        padding: 10px 0;
        align-items: center;
        justify-content: stretch;
        cursor: pointer;
        ${props => props.opened ? `
            background: ${palette.userMenuPopupMenuItemHoverBg} !important;
            border-bottom: 0.25px solid ${props => props.theme.palette.clrBorder};
        ` : ''};
    }
    
    .icon-wrapper {
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0;
        border: none;
        padding: 0;
        width: 55px;
        height: 100%;
        
        svg, svg * {
            fill: ${palette.userMenuPopupMenuItem} !important;
        }
    }
    
    .label-wrapper {
        flex: 1;
        color: ${palette.userMenuPopupMenuItem};
        font-size: 17px;
        font-weight: bold;
    }
    
    &:hover {
        .d-flex {
            background: ${palette.userMenuPopupMenuItemHoverBg};
        }

        .icon-wrapper {
            svg, svg * {
                fill: ${palette.userMenuPopupMenuItemHover} !important;
            }
        }
        
        .label-wrapper {
            color: ${palette.userMenuPopupMenuItemHover};
        }
    }

    > .btn_reset {
        border-radius: ${palette.borderRadius};
        border: 0;
        background: ${palette.clrLightRed};
        color: ${palette.clrHighContrast};
        outline: none;
        height: 31px;
        width: 78px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        overflow: hidden;
        white-space: nowrap;
        margin-right: 25px;
        
        &:hover {
            opacity: 0.8;
        }
    }
    
    > .btn_normal {
        border-radius: ${palette.borderRadius};
        border: 1px solid ${palette.clrBorder};
        background: ${palette.clrBackground};
        color: ${palette.clrHighContrast};
        outline: none;
        height: 31px;
        width: 78px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        overflow: hidden;
        white-space: nowrap;
        
        &:hover {
            opacity: 0.8;
        }
    }
`;

export const OrderHistoryWrapper = styled.div`
    width: 100%;
    flex: 1;
    min-height: 300px;
    > div > div {
        border: 0;
        border-top: 1px solid ${palette.clrBorder};
    }
    
    .scrollbar-container {
        display: block;
        border: 0;
    }
`;

export const Spacer = styled.div`
    flex: 1 0 10px;
    width: 100%;
    border-bottom: 1px solid ${palette.clrBorder};
`;

const DownArrowSvg = styled.svg`
    margin-right: 25px;
    width: 15px;
    height: 9px;
    
    ${props => props.isOpen ? 'transform: rotateZ(180deg);' : ''};
    
    &, & * {
        fill: ${palette.userMenuPopupMenuItem} !important;
    }
`;

export const DownArrow = props => (
    <DownArrowSvg
        viewBox="0 0 15 8.9"
        {...props}
    >
        <path
            className="st0"
            d="M7.5,8.9L0.3,1.7c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l5.8,5.8l5.8-5.8c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4L7.5,8.9z"
        />
    </DownArrowSvg>
);

const OpenArrowSvg = styled.svg`
    margin-right: 25px;
    width: 15px;
    height: 9px;
    transform: rotateZ(-90deg);
    &, & * {
        fill: ${palette.userMenuPopupMenuItem} !important;
    }
`;

export const OpenArrow = props => (
    <OpenArrowSvg
        viewBox="0 0 15 8.9"
        {...props}
    >
        <path
            className="st0"
            d="M7.5,8.9L0.3,1.7c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l5.8,5.8l5.8-5.8c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4L7.5,8.9z"
        />
    </OpenArrowSvg>
);

const CloseSvg = styled.svg`
    margin-right: 25px;
    width: 15px;
    height: 15px;

    &, & * {
        fill: ${palette.userMenuPopupMenuItem} !important;
    }
`;

export const CloseIcon = props => (
    <CloseSvg {...props} viewBox="0 0 9.38 9.38">
        <path transform="rotate(135 4.694 4.692)" d="M-1.38 4.13h12.14v1.13H-1.38z" />
        <path transform="rotate(45 4.687 4.691)" d="M-1.38 4.13h12.14v1.13H-1.38z" />
    </CloseSvg>
);

export const Tab = styled.div`
    padding: 8px;
    z-index: 100;
    font-weight: 400;
    color: ${props => props.active ? props.theme.palette.orderHistoryHeaderTabActive : props.theme.palette.orderHistoryHeaderTab};
    cursor: pointer;
    margin-right: ${props => props.marginRight ? 10 :  0}px;
`;
