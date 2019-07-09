import React from 'react'
import styled from 'styled-components'

// TODO - this button can be reused in Wallet at least
// maybe in other places also

const Wrapper = styled.button`
    font-size: .9rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid ${props => props.theme.palette.gridColor};
    border-radius: ${props => props.theme.palette.borderRadius};
    background-color: transparent;
    color: ${props => props.theme.palette.clrtext};
    margin: 0;
    padding: 0.5rem 0;
    width: 100%;
    &:hover {
        cursor: pointer;
        /* Same as SwapButton - which hover state are we using? what colors, bg colors? */
        border: 1px solid ${props => props.theme.palette.clrbackA};
    }
    &:focus {
        outline: none;
    }
`

const Button = ({ onClick, children }) => (
    <Wrapper onClick={onClick}>
        {children}
    </Wrapper>
)

export default Button
