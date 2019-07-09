import React from 'react';
import styled from 'styled-components';
import QRCode from 'qrcode.react';

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 13px;
    margin-bottom: 13px;
    
    svg {
        width: 300px;
        height: 300px;
        fill: ${props => props.theme.palette.depositText};
    }
`;

const Code = styled(QRCode)`
    & path:nth-child(1) {
        /* background */
        fill: ${props => props.theme.palette.depositBackground};
    }
    
    & path:nth-child(2) {
        /* foreground */
        fill: ${props => props.theme.palette.contrastText};
    }
`;

const QR = ({ value }) => {
    return (
        <Wrapper>
            <Code
                value={value}
                level="L"
                renderAs="svg"
            />
        </Wrapper>
    );
};

export default QR;
