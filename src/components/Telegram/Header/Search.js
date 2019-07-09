import React from 'react';
import styled from 'styled-components';

// import MattriotSwitch from '../../MattriotSwitch';
// import TopSwitch from '../../TopSwitch';
import UserAvatarComponent from '../../SideHeader/UserAvatarComponent';

const WrapperContainer = styled.div`
    display: flex;
`;

const Wrapper = styled.div`
    position: relative;
    padding: 19px;
    display: flex;
    align-items: center;
    flex: 1;
    
    input:focus::-webkit-input-placeholder {
        color: transparent;
    }
`;

const Input = styled.input`    
    width: 100%;
    height: 30px;
    padding: 0 15px 0 38px;
    background: ${props => props.theme.palette.telegramSearchInputBg};
    border: 1px solid ${props => props.theme.palette.telegramBorder};
    border-radius: ${props => props.theme.palette.borderRadius};
    outline: none;
    font-family: sans-serif;
    font-size: 13px;
    line-height: 22px;
    color: ${props => props.theme.palette.telegramSearchText};

    &::placeholder {
        color: ${props => props.theme.palette.telegramSearchText};
    }
`;

const Chats = styled.div`
    height: 100%;
    margin-right: 20px;
    display: flex;
    align-items: center;
    
    &:hover {
        cursor: pointer;
        
        .arrow {
            fill: ${props => props.theme.palette.contrastText};
        }
    }
    
    .arrow {
        width: 10px;
        fill: ${props => props.theme.palette.telegramRoomArrow};
    }
`;

const SearchSvg = styled.svg`
    position: absolute;
    left: 30px;
    top: 30px;
    z-index: 1;
    width: 15px;
    height: 15px;
    fill: ${props => props.theme.palette.telegramSearchText};
    transform: translateY(-50%);
`;

const Search = ({
    toggleDrawer, onSearch, value, sidebar, isSearchOff,
}) => (
    <WrapperContainer>
        {/* {sidebar && ( */}
        {/* <TopSwitch /> */}
        {/* )} */}
        {sidebar && (
            <UserAvatarComponent />
        )}
        {!isSearchOff && (
            <Wrapper>
                <Input type="text" placeholder="Search" id="header-search-input" onChange={onSearch} value={value}/>

                <SearchSvg sidebar={sidebar} width="18.938" height="18.938" viewBox="0 0 18.938 18.938">
                    <path d="M18.685,17.573l-4.546-4.546a7.965,7.965,0,1,0-1.115,1.115l4.546,4.543a0.787,0.787,0,1,0,1.115-1.111h0ZM7.975,14.359a6.385,6.385,0,1,1,6.387-6.384,6.392,6.392,0,0,1-6.387,6.384h0Zm0,0"/>
                </SearchSvg>
            </Wrapper>
        )}
    </WrapperContainer>
);

export default Search;
