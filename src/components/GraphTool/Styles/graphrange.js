import styled from 'styled-components';

const wideScreen = 'only screen and (min-width : 1920px)';

export const Graphrange = styled.div`
    position: relative;
    font-size: 12px;
    height: 100%;
    background: ${props => props.theme.palette.clrblock};
    cursor: pointer;
    min-width: 44px;
    text-align: center;
    color: ${props => props.theme.palette.clrimportant};
    border-bottom-right-radius: ${props => props.theme.palette.borderRadius};
    border-top-right-radius: ${props => props.theme.palette.borderRadius};
            
    @media ${wideScreen}{
        height: 42px;
    }
`;

export const GraphrangeCurrent = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0 ${props => props.theme.palette.borderRadius} ${props => props.theme.palette.borderRadius} 0;
    background: ${props => props.theme.palette.clrback};
    border-bottom-right-radius: ${props => props.theme.palette.borderRadius};
    border-top-right-radius: ${props => props.theme.palette.borderRadius};
`;

