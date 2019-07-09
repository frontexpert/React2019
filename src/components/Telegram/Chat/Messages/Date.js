import React from 'react'
import styled from 'styled-components'

const Text = styled.p`
    text-align: center;
    color: #bbbbbc;
    margin: 0 0 2rem 0;
`

const Date = ({ date }) => <Text>{date}</Text>

export default Date
