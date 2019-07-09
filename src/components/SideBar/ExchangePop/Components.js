import React from 'react';
import styled from 'styled-components';

export const Wrapper = styled.div`
    position: absolute;
    left: 0;
    top: 15px;
    right: 0;
    bottom: 15px;
    z-index: 999999;
    background: transparent;
    // background: rgba(0, 0, 0, 0.5);
`;

export const Modal = styled.div`
    position: fixed;
    top: 15px;
    bottom: 15px;
    left: 67px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    width: calc(23% - 3px);
    min-width: 353px;
    // height: 100%;
    background-color: ${props => props.theme.palette.settingsBackground};
    border: 1px solid ${props => props.theme.palette.settingsBorder};
    border-radius: ${props => props.theme.palette.borderRadius};
    font-size: 18px;
    font-weight: 600;
    color: ${props => props.theme.palette.settingsText};
    z-index: 999999;
    
    // &:before {
    //     content: '';
    //     position: absolute;
    //     left: -17px;
    //     bottom: 75px;
    //     width: 0;
    //     border-style: solid;
    //     border-width: 8px;
    //     border-color: transparent ${props => props.theme.palette.settingsBorder} transparent transparent;
    //     z-index: 10000001;
    // }
`;

export const Header = styled.div`
    flex-shrink: 0;
    display: flex;
    align-items: center;
    padding: 4px 15px;
    width: 100%;
    height: 60px;
    background: transparent;
    // background-color: ${props => props.theme.palette.settingsHeaderBackground};
    border-bottom: 1px solid ${props => props.theme.palette.settingsBorder};
    border-radius: ${props => `${props.theme.palette.borderRadius} ${props.theme.palette.borderRadius} 0 0`};
    color: ${props => props.theme.palette.settingsHeaderText};
    fill: ${props => props.theme.palette.settingsHeaderText};

    span {
        // margin-left: 10px;
        white-space: nowrap;
        overflow: hidden;
    }
`;

const CloseWrapper = styled.div`
    // position: absolute;
    // top: -12px;
    // right: -12px;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.theme.palette.modalCloseBackground};
    border-radius: 50%;
    fill: ${props => props.theme.palette.settingsHeaderText};
    cursor: pointer;
`;

const CloseSvg = styled.svg`
    width: 12px;
    height: 12px;
`;

export const Close = props => (
    <CloseWrapper {...props}>
        <CloseSvg viewBox="0 0 9.38 9.38">
            <path transform="rotate(135 4.694 4.692)" d="M-1.38 4.13h12.14v1.13H-1.38z"/>
            <path transform="rotate(45 4.687 4.691)" d="M-1.38 4.13h12.14v1.13H-1.38z"/>
        </CloseSvg>
    </CloseWrapper>
);

export const List = styled.div`
    border-radius: ${props => `0 0 ${props.theme.palette.borderRadius} ${props.theme.palette.borderRadius}`};
    width: 100%;
    height: 100%;
    overflow: hidden;
`;

export const StyleWrapper = styled.div`
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    
    .ps__rail-y {
        background-color: ${props => props.theme.palette.settingsBackground} !important;
        border-left: 1px solid ${props => props.theme.palette.settingsBorder};
        opacity: 1 !important;
        
        .ps__thumb-y {
            z-index: 9999;
            cursor: pointer;
            
            &:before {
                background-color: ${props => props.theme.palette.settingsBorder};
            }
        }
    }
    
    .ReactVirtualized__Table__rowColumn {
        height: 100%;
        padding: 10px 30px 10px 15px;
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
    color: ${props => props.status === 'active'
        ? props.theme.palette.settingsItemActive
        : props.status === 'disabled' ? props.theme.palette.settingsItemDisabled : props.theme.palette.settingsText};
    
    span {
        font-weight: normal;
    }
`;

const LinkWrapper = styled.a`
    height: 24px;
    flex: 1;
`;

const LinkSvg = styled.svg`
    width: 24px;
    height: 24px;
    margin-left: 8px;
    fill: ${props => props.theme.palette.settingsItemLink};
`;

export const Link = props => (
    props.href !== '' ? (
        <LinkWrapper href={props.href} target="_blank" rel="noopener noreferrer">
            <LinkSvg {...props} viewBox="0 0 17.87 17.88">
                <path d="M4.17,17.88a4.17,4.17,0,0,1-2.95-7.12L5,7A4.09,4.09,0,0,1,8,5.75a4.2,4.2,0,0,1,2.25.65,4.72,4.72,0,0,1,.7.57,1.19,1.19,0,0,1,0,1.67,1.23,1.23,0,0,1-1.68,0,1.77,1.77,0,0,0-2.52,0L2.9,12.44A1.79,1.79,0,0,0,5.43,15h0l2.25-2.25A.29.29,0,0,1,8,12.65,4.85,4.85,0,0,0,9.91,13H10a.31.31,0,0,1,.3.3.27.27,0,0,1-.09.21L7.11,16.66A4.16,4.16,0,0,1,4.17,17.88Z"/>
                <path d="M9.93,12.13H9.7l-.44,0L8.9,12l-.18,0-.19-.07-.19-.07-.19-.08A4.25,4.25,0,0,1,7,10.92,1.17,1.17,0,0,1,6.62,10,1.19,1.19,0,0,1,7,9.24a1.21,1.21,0,0,1,1.68,0,1.79,1.79,0,0,0,2.52,0l1-1,0,0L15,5.45a1.79,1.79,0,0,0-2.53-2.53L10.18,5.16a.29.29,0,0,1-.32.07A5,5,0,0,0,8,4.85H7.85a.27.27,0,0,1-.28-.18.29.29,0,0,1,.06-.33l3.12-3.12a4.17,4.17,0,0,1,5.9,5.9l-3.79,3.79A4.16,4.16,0,0,1,10.93,12h0l-.17,0-.09,0-.21,0h-.1l-.21,0Z"/>
            </LinkSvg>
        </LinkWrapper>
    ) : (
        <LinkSvg {...props} viewBox="0 0 17.87 17.88">
            <path d="M4.17,17.88a4.17,4.17,0,0,1-2.95-7.12L5,7A4.09,4.09,0,0,1,8,5.75a4.2,4.2,0,0,1,2.25.65,4.72,4.72,0,0,1,.7.57,1.19,1.19,0,0,1,0,1.67,1.23,1.23,0,0,1-1.68,0,1.77,1.77,0,0,0-2.52,0L2.9,12.44A1.79,1.79,0,0,0,5.43,15h0l2.25-2.25A.29.29,0,0,1,8,12.65,4.85,4.85,0,0,0,9.91,13H10a.31.31,0,0,1,.3.3.27.27,0,0,1-.09.21L7.11,16.66A4.16,4.16,0,0,1,4.17,17.88Z"/>
            <path d="M9.93,12.13H9.7l-.44,0L8.9,12l-.18,0-.19-.07-.19-.07-.19-.08A4.25,4.25,0,0,1,7,10.92,1.17,1.17,0,0,1,6.62,10,1.19,1.19,0,0,1,7,9.24a1.21,1.21,0,0,1,1.68,0,1.79,1.79,0,0,0,2.52,0l1-1,0,0L15,5.45a1.79,1.79,0,0,0-2.53-2.53L10.18,5.16a.29.29,0,0,1-.32.07A5,5,0,0,0,8,4.85H7.85a.27.27,0,0,1-.28-.18.29.29,0,0,1,.06-.33l3.12-3.12a4.17,4.17,0,0,1,5.9,5.9l-3.79,3.79A4.16,4.16,0,0,1,10.93,12h0l-.17,0-.09,0-.21,0h-.1l-.21,0Z"/>
        </LinkSvg>
    )
);

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

export const LabelAPI = styled.a`
    font-size: 16px;
    color: ${props => props.included ? props.theme.palette.clrPurple : props.theme.palette.clrHighContrast};
    margin-left: ${props => props.isVerified ? '10px' : 'auto'};
    cursor: ${props => props.included ? 'pointer' : 'initial'};
    
    &:hover {
        text-decoration: ${props => props.included ? 'underline' : 'none'};
    }
`;

export const BackIcon = () => (
    <svg className="sprite-icon arrow" role="img" aria-hidden="true">
        <use
            xmlnsXlink="http://www.w3.org/1999/xlink"
            xlinkHref="img/sprite-basic.svg#arrow-back-2"
        />
    </svg>
);

export const BackButton = styled.button`
    flex-grow: 0;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 10px 0 0;
    padding: 0;
    border: none;
    width: 40px;
    height: 100%;
    min-height: 40px;
    background: transparent;
    cursor: pointer;
    outline: none !important;
    
    &:hover {    
        .arrow {
            fill: ${props => props.theme.palette.contrastText};
        }
    }
    
    .arrow {
        width: 10px;
        height: 100%;
        fill: ${props => props.theme.palette.telegramRoomArrow};
    }
`;
