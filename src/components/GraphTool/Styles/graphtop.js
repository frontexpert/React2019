import styled from 'styled-components';

const GraphTop = {};

const wideScreen = 'only screen and (min-width : 1920px)';

GraphTop.Graphtop = styled.div`
    position: absolute;
    left: 0;
    top: 10px;
    right: 5px;
    background: transparent;
    display: flex;
    padding: 0 0 0 0;
    max-width: 100%;
    border-radius: 0;
    transition: all .1s;
    height: 32px;
            
    @media ${wideScreen}{
        margin-left: 10px;
        height: 42px;
    }
`;

GraphTop.Left = styled.div`
    margin: 0 auto 0 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
`;

GraphTop.Right = styled.div`
    margin: 0 5px 0 0;
    display: flex;
    justify-content: flex-start;
`;

export default GraphTop;
