import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    /* KEEP FOR VIRTUALIZED ...this is 100% less the material select*/
    height: calc(100% - 34px);
    border: 1px solid ${props => props.theme.palette.clrseparatorD};
`

const Content = styled.iframe`
    width: 100%;
    height: 100%;
`

export default () => (
    <Wrapper>
        <Content
            title='Telegram'
            src='http://telegram-bot.2mundos.net/'
            frameBorder='0'
        />
    </Wrapper>
);