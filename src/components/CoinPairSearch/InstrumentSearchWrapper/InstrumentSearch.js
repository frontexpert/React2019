import React from 'react';
import styled from 'styled-components';
import Downshift from 'downshift';
import {defaultProps} from 'recompose';

// MUI Primitives
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

const RootContainer = styled.div`
    position: relative;
`;

//before removes the underline; comes back when touched
const SearchInput = styled(defaultProps({fullWidth:true})(TextField))`
    background: ${props => props.theme.palette.backgroundHighContrast};
    display: block;
    & > div {
        &:before
        { content: none; }
    }
    & > div > input {
        color: ${props => props.theme.palette.clrtextD};
        text-align: start;
        padding-left: .8rem;
        font-size: 1.5rem;

        @media (max-width: 1200px) {
            padding-left: .1rem;
        } 
    }
`;

const PaperWithDefaults = defaultProps({
    square:true,
})(Paper)

const SearchResultsContainer = styled(PaperWithDefaults)`
    position: absolute;
    z-index: 1;
    margin-top: 2px;
    left: 0;
    right: 0;
`;


const CoinIcon = styled.div `
    padding-right: .5rem;
    padding-left: 1rem;
    font-size: 1.4rem;
`;

const CoinName = styled.span `
    font-size: 1.4rem;
    color: ${props => props.theme.palette.clrtextD};
`;

const SearchResultItem = styled(MenuItem)`
    color: ${props => props.theme.palette.clrtextD};
    background: ${props => (
        props.isactive === 'true' ?
        props.theme.palette.backgroundMedContrast:
        props.theme.palette.backgroundHighContrast
    )};
    font-size: 1.2rem !important;
    height: 12px;
`;

const SearchResult = ({value, isHighlighted, isActive, ...rest}) => (
    <SearchResultItem value={value} isactive={isActive.toString()} {...rest}>
        <CoinIcon className={`icon icon-${value.toLowerCase()}`} />
        <CoinName>{value}</CoinName>
    </SearchResultItem>  
);

const SearchResults = ({
    inputValue, 
    highlightedIndex,
    getItemProps, 
    getSuggestions,
    maxResults,
}) => {
    return (
        getSuggestions(inputValue, maxResults)
        .map((value, i)=>(
            <SearchResult
                {...getItemProps({item:value})}
                value={value}
                key={value}
                isActive={highlightedIndex===i}
            />
        ))
    );
};

export default ({
    maxResults=50,
    onSelect,
    selectedItem,
    getSuggestions,
}) => (
    <Downshift onSelect={onSelect} selectedItem={selectedItem}>
        {
            ({
                getInputProps,
                getItemProps,
                isOpen,
                inputValue,
                highlightedIndex,
                getRootProps, 
            }) => (
                <RootContainer {...getRootProps({refKey:'innerRef'})}>
                    <SearchInput InputProps={{...getInputProps()}} />
                    {
                        isOpen &&
                        <SearchResultsContainer>
                            {
                                SearchResults({
                                    highlightedIndex,
                                    inputValue,
                                    getItemProps,
                                    getSuggestions,
                                    maxResults,
                                })
                            }
                        </SearchResultsContainer>
                    }
                </RootContainer>
            )
        }
    </Downshift>
);