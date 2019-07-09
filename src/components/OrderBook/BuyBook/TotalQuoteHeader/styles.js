import styled from 'styled-components/macro';

export const Wrapper = styled.div`
    position: relative;
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: flex-end;
    font-weight: 400;
    height: 100%;

    .arrow-icon {
        display: none;
        position: absolute;
        left: -10px;
    }
`;

export const CoinNameWrapper = styled.span`
    font-weight: bold;
    font-size: 16px;

    img {
        height: 100%;
    }
`;
