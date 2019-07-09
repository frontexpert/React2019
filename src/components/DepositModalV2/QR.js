import React from 'react';
import styled from 'styled-components';
import QRCode from 'qrcode.react';

const QRWrapper = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: ${props => props.opened ? 'flex' : 'none'};
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.8);
    z-index: 999;
`;

const InnerWrapper = styled.div`
    width: 309px;
    height: 309px;
    padding: 20px;
    background: ${props => props.theme.palette.clrBackground};
    border: 2px solid ${props => props.theme.palette.clrMouseHover};
    box-shadow: 0px 0px 25px 4px rgba(39, 128, 255, 1);
    
    svg {
        width: 265px;
        height: 265px;
        fill: ${props => props.theme.palette.depositText};
        filter: drop-shadow(0px 0px 10px rgba(39, 128, 255, 1));
    }
`;

const Code = styled(QRCode)`
    & path:nth-child(1) {
        /* background */
        fill: ${props => props.theme.palette.clrBackground};
        display: none;
    }
    
    & path:nth-child(2) {
        /* foreground */
        fill: ${props => props.theme.palette.clrHighContrast};
    }
`;

class QR extends React.Component {
    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside = event => {
        if (this.qrRef && this.props.opened && !this.qrRef.contains(event.target)) {
            this.props.toggleQR();
        }
    };

    render() {
        return (
            <QRWrapper opened={this.props.opened}>
                <InnerWrapper innerRef={ref => this.qrRef = ref}>
                    <Code
                        value={this.props.value}
                        level="L"
                        renderAs="svg"
                    />
                </InnerWrapper>
            </QRWrapper>
        );
    }
}

export default QR;
