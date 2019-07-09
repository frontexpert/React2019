import React from 'react';
import styled from 'styled-components';
// import { Textfit } from 'react-textfit';

import { WhitelableTitle } from '../../config/constants';
import UserAvatarComponent from './UserAvatarComponent';
import WorldBookIconComponent from './WorldBookIconComponent';

const Wrapper = styled.div`
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${props => props.theme.palette.clrBackground};
    border: ${props => props.isTelegram ? '0' : `1px solid ${props.theme.palette.clrBorder}`};
    border-bottom: 0;
    border-radius: ${props => `${props.theme.palette.borderRadius} ${props.theme.palette.borderRadius} 0 0`};

    @media (max-width: 768px) {
        height: 80px;
    }
`;

const TextWrapper = styled.div`
    // height: 100%;
    padding: 0 15px;
    flex: 1;
    font-size: 30px;
    color: ${props => props.theme.palette.clrPurple};
    text-align: center;

    > div {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

class SideHeader extends React.Component {
    componentDidMount() {

    }

    render() {
        const { isWorldBook } = this.props;
        return (
            <Wrapper isTelegram={false}>
                { !isWorldBook ? <UserAvatarComponent/> : <WorldBookIconComponent hide={false}/> }
                <TextWrapper>
                    {/* CROWS NEST PRO */}
                    {/* <Textfit mode="multi">CROWS NEST PRO</Textfit> */}
                    { WhitelableTitle }
                </TextWrapper>
            </Wrapper>
        );
    }
}

export default SideHeader;
