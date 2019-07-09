import styled from 'styled-components';

export const BackgroundProgress = styled.div.attrs({ className: 'background-progressbar' })`
    width: 100%;
    position: absolute;
    height: 100%;
    border-radius: 5px;
    display: flex;
    .progress {
        position: relative;
        display: flex;
        justify-content: ${props => props.isCoinPairInversed ?  'flex-end' : 'flex-start'};
        background: ${props => props.isCoinPairInversed ? props.theme.palette.btnPositiveBg : props.theme.palette.dodgerBlue};
        margin: 0;
        padding: 0;
        top: 0;
        left: 0;
        bottom: 0;
        width: calc(${props => props.isProgressing ? props.currentProgress : 0}%);
        transition: ${props => props.isProgressing ? '.5s linear' : 'none'};
        
    }
`;