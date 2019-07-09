import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    flex: 1;
    align-items: flex-end;
    justify-content: space-between;
    font-weight: 400;
    height: 100%;
`;

export const ArrowIcon = styled.img`
    position: absolute;
    top: 6px;
    right: -10px;
    opacity: 0.39;
`;

export const CoinNameWrapper = styled.span`
    opacity: 0.39;
    height: 100%;

    img {
        height: 100%;
    }
`;
