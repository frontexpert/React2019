import React from 'react';
import styled from 'styled-components';
import IconCopy from './icon_copy.png';

const Wrapper = styled.div`
    width: ${props => props.width ? props.width + 'px' : '100%'};
    height: 40px;
    border: 1px solid ${props => props.theme.palette.clrInnerBorder};
    border-radius: ${props => props.theme.palette.borderRadius};
    background: ${props => props.theme.palette.clrBackground};
    padding: 9px 0 9px 15px;
    display: flex;
    align-items: center;
    
    > span {
        flex: 1;
        font-size: 14px;
        font-weight: 400;
        overflow: hidden;
        
        text-align: left;
        direction: rtl;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    
    > .imgWrapper {
        border-left: 1px solid ${props => props.theme.palette.clrInnerBorder};
        width: 35px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        
        &:hover {
            opacity: 0.7;
        }
    }
`;

const AffiliateInput = styled.input`
    border:none;
    background:none;
    font-size: 14px;
    font-weight: 700;
    line-height: 1em;
    color: #7f8bc2;
    width: ${props => props.width ? props.width + 'px' : '100%'};
    overflow:hidden;
    outline:none;
`;

class InputCustom extends React.Component {
    componentDidMount() {

    }

    copyToClipboard = () => {
        this.affiliateRef.select();
        document.execCommand('copy');
    }

    setAffiliateRef = (node) => {
        this.affiliateRef = node;
    };

    render() {
        const { ...props } = this.props;
        return (
            <Wrapper {...props}>
                <AffiliateInput readOnly={true} innerRef={this.setAffiliateRef} value="demo.bct.trade/shaunmacdonald" />
                <div className="imgWrapper" onClick={() => this.copyToClipboard()}>
                    <img src={IconCopy} alt=""/>
                </div>
            </Wrapper>
        );
    }
}

export default InputCustom;
