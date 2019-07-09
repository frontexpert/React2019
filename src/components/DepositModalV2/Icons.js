import React from 'react';
import styled from 'styled-components';

const CopyIconWrapper = styled.svg`
    width: 32px;
    height: 37px;
`;

export const CopyIcon = () => (
    <CopyIconWrapper>
        <path
            d="M14.7,0a4,4,0,0,0-3.76,2.67H4a4,4,0,0,0-4,4V30.73a4,4,0,0,0,4,4h9.35A2.66,2.66,0,0,0,16,37.41H29.41a2.66,2.66,0,0,0,2.66-2.65V18.69A2.66,2.66,0,0,0,29.41,16h0V6.68a4,4,0,0,0-4-4H18.46A4,4,0,0,0,14.7,0Zm0,2.67A1.32,1.32,0,0,1,16,4V5.34h2.68V8h-8V5.34h2.67V4A1.33,1.33,0,0,1,14.7,2.67ZM4,5.34H8v5.35H21.38V5.34h4a1.32,1.32,0,0,1,1.33,1.34V16H16a2.66,2.66,0,0,0-2.66,2.66V32.07H4a1.32,1.32,0,0,1-1.34-1.34v-24A1.33,1.33,0,0,1,4,5.34ZM16,18.71H29.4v16L16,34.76Z"
        />
    </CopyIconWrapper>
);

const CopySmallIconWrapper = styled.svg`
    width: 21px;
    height: 24px;
`;

export const CopySmallIcon = () => (
    <CopySmallIconWrapper>
        <path
            d="M15.55,0H2.22A2.23,2.23,0,0,0,0,2.22V17.78H2.22V2.22H15.55Zm3.34,4.44H6.67A2.25,2.25,0,0,0,4.44,6.67V22.22a2.25,2.25,0,0,0,2.23,2.23H18.89a2.24,2.24,0,0,0,2.22-2.23V6.67a2.24,2.24,0,0,0-2.22-2.23Zm0,17.78H6.67V6.67H18.89Z"
        />
    </CopySmallIconWrapper>
);

const QrIconWrapper = styled.svg`
    width: 31px;
    height: 31px;
`;

export const QrIcon = () => (
    <QrIconWrapper>
        <path d="M0,31.25H14.21V17.05H0ZM2.84,19.89h8.52v8.5H2.84Z"/>
        <rect x="5.68" y="22.73" width="2.84" height="2.84"/>
        <rect x="22.73" y="28.41" width="2.84" height="2.84"/>
        <rect x="28.41" y="28.41" width="2.84" height="2.84"/>
        <path d="M28.41,19.89H25.57V17.05H17.05v14.2h2.84V22.73h2.84v2.84h8.52V17.05H28.41Z"/>
        <path d="M0,14.21H14.21V0H0ZM2.84,2.84h8.52v8.52H2.84Z"/>
        <rect x="5.68" y="5.68" width="2.84" height="2.84"/>
        <path d="M17.05,0V14.21h14.2V0ZM28.41,11.36H19.89V2.84h8.52Z"/>
        <rect x="22.73" y="5.68" width="2.84" height="2.84"/>
    </QrIconWrapper>
);

const SendIconWrapper = styled.svg`
    width: 18px;
    height: 17px;
`;

export const SendIcon = () => (
    <SendIconWrapper>
        <polygon points="8.45 5.09 8.45 0 18.4 8.76 8.45 17.52 8.45 12.54 0 12.55 0 5.09 8.45 5.09"/>
    </SendIconWrapper>
);

const Wrapper = styled.div`
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 1px;
`;

const CheckSvg = styled.svg`
    width: 20px;
    height: 20px;
    
    & path {
        fill: ${props => props.theme.palette.clrHighContrast};
    }
`;

const Check = props => (
    <CheckSvg {...props} viewBox="0 0 100 100">
        <path
            d="M91 12.2c-4.2-3-10-1.9-13 2.3L42.1 65.8 20.9 44.6c-3.6-3.6-9.6-3.6-13.2 0-3.6 3.6-3.6 9.6 0 13.2l29 29c1.8 1.8 4.2 2.7 6.6 2.7h1c2.6-.2 5.1-1.6 6.8-3.9l42.3-60.4c2.9-4.3 1.8-10.1-2.4-13z"
        />
    </CheckSvg>
);

export const CheckIcon = () => (
    <Wrapper>
        <Check/>
    </Wrapper>
);
