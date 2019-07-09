import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
// import MattriotSwitch from '../../MattriotSwitch';
import TopSwitch from '../../TopSwitch';

const WrapperContainer = styled.div`
    display: flex;
`;

const Wrapper = styled.div`
    position: relative;
    padding: 19px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    overflow: hidden;
`;

const TopHeading = styled.span`
    // position: fixed;
    // top: 8px;
    // left: 146px;
    // padding: 2px;
    // background: ${props => props.theme.palette.clrBackground};
    margin-bottom: 4px;
    color: ${props => props.theme.palette.clrHighContrast};
    font-size: 12px;
    font-weight: normal;
    line-height: 1em;
`;

const Title = styled.span`
    color: ${props => props.theme.palette.clrHighContrast};
    font-size: 20px;
    line-height: 1em;
    font-weight: bold;
`;

const ucFirst = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const DomainTitle = ({
    toggleDrawer, sidebar,
}) => (
    <WrapperContainer>
        {sidebar && (
            <TopSwitch/>
        )}
        <Wrapper>
            <TopHeading>
                <FormattedMessage
                    id="telegram.header.label_welcome"
                    defaultMessage="Welcome to"
                />
            </TopHeading>
            <Title>
                {ucFirst(window.location.hostname)}
            </Title>
        </Wrapper>
    </WrapperContainer>
);

export default DomainTitle;
