import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.svg`
    width: 1rem;
    height: 1rem;
    fill: ${props => props.selected ? props.theme.palette.tabIconHover : props.theme.palette.tabIcon};

    &:not(:last-of-type) {
        margin-right: 10px;
    }

    &:hover {
        fill: ${props => props.theme.palette.tabIconHover};
        cursor: pointer;
    }

    @media only screen and (max-width: 1300px) {
        width: 0.9rem;
        height: 0.9rem;
    }
`

export const History = props => (
    <Wrapper viewBox="0 0 9.55 7.04" {...props}>
        <g data-name="Layer 2">
            <path
                d="M.74 2.77A.73.73 0 0 0 .22 3a.75.75 0 0 0 0 1.06.74.74 0 0 0 1.05 0 .75.75 0 0 0 0-1.06.73.73 0 0 0-.53-.23zM.74 0a.69.69 0 0 0-.52.22.69.69 0 0 0-.22.52.69.69 0 0 0 .22.53.72.72 0 0 0 1.05 0 .69.69 0 0 0 .22-.53.67.67 0 0 0-.22-.52A.69.69 0 0 0 .74 0zm0 5.55a.72.72 0 0 0-.52.21.75.75 0 0 0 0 1.06.74.74 0 0 0 1.05 0 .75.75 0 0 0 0-1.06.72.72 0 0 0-.53-.21zM2.18.35h7.37v.8H2.18zm0 2.77h7.37v.8H2.18zm0 2.77h7.37v.8H2.18z"
                data-name="Layer 1"
            />
        </g>
    </Wrapper>
)

export const Liquidity = props => (
    <Wrapper viewBox="0 0 10.21 6.82" {...props}>
        <g data-name="Layer 2">
            <path
                d="M1 2.76C2 4 2.88 5.06 3.48 5.82H1V2.76m8.21.08v3H6.83c.62-.79 1.5-1.89 2.38-3m1-2.84s-4.86 6-5.1 6.41C5.07 6 0 0 0 0v6.82h10.21V0z"
                data-name="Layer 1"
            />
        </g>
    </Wrapper>
)

export const Portfolio = props => (
    <Wrapper viewBox="0 0 10.65 7.3" {...props}>
        <g data-name="Layer 2">
            <path
                d="M9.52 0a1.13 1.13 0 0 0-1.13 1.13 1.16 1.16 0 0 0 .34.87L7.46 4a1.1 1.1 0 0 0-.37-.06 1.18 1.18 0 0 0-.67.21l-1.5-1a.62.62 0 0 0 0-.13 1.14 1.14 0 1 0-2.27 0 1.11 1.11 0 0 0 .23.67L1.59 5.13A1.19 1.19 0 0 0 1.13 5a1.14 1.14 0 1 0 1.14 1.17 1.16 1.16 0 0 0-.2-.64L3.38 4a1.16 1.16 0 0 0 .42.08 1.13 1.13 0 0 0 .88-.42L6 4.55A1.07 1.07 0 0 0 6 5a1.14 1.14 0 1 0 2.22 0A1.12 1.12 0 0 0 8 4.27l1.31-2h.24A1.14 1.14 0 0 0 9.52 0z"
                data-name="Layer 1"
            />
        </g>
    </Wrapper>
)

export const Wallet = props => (
    <Wrapper viewBox="0 0 10.75 7.51" {...props}>
        <g data-name="Layer 2">
            <g data-name="Layer 1">
                <path
                    className="cls-1"
                    d="M6.82 3.3a.46.46 0 1 0 .46.46.46.46 0 0 0-.46-.46z"
                />
                <path
                    className="cls-1"
                    d="M9.62 1.92h-.07V.35A.35.35 0 0 0 9.2 0H.35A.35.35 0 0 0 0 .35v6.81a.35.35 0 0 0 .35.35H9.2a.35.35 0 0 0 .35-.35V5.6h.07a1.21 1.21 0 0 0 1.13-1.2V3.12a1.21 1.21 0 0 0-1.13-1.2zm-.77 4.89H.7V.7h8.15v1.21h-2a1.86 1.86 0 0 0-1.31.55A1.83 1.83 0 0 0 5 3.78 1.86 1.86 0 0 0 6.86 5.6h2zM10 4.39a.5.5 0 0 1-.5.5H6.88a1.14 1.14 0 0 1-1.15-1.1 1.13 1.13 0 0 1 1.13-1.17h2.68a.5.5 0 0 1 .5.5z"
                />
            </g>
        </g>
    </Wrapper>
)
