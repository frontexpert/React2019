import React from 'react';
import styled from 'styled-components';

const Close = styled.svg`
    width: 12px;
    height: 12px;
    fill: ${props => props.theme.palette.clrHighContrast};
    margin: 0 13px;

    &:hover {
        cursor: pointer;
        filter: brightness(80%);
    }
`;

const Reply = styled.svg`
    width: 24px;
    height: 24px;
    fill: ${props => props.theme.palette.clrHighContrast};
    margin: 0 13px;
`;

export const CloseIcon = props => (
    <Close viewBox="0 0 9.38 9.38" {...props}>
        <g
            id="prefix__\u0421\u043B\u043E\u0439_2"
            data-name="\u0421\u043B\u043E\u0439 2"
        >
            <g
                id="prefix__\u0421\u043B\u043E\u0439_1-2"
                data-name="\u0421\u043B\u043E\u0439 1"
            >
                <path
                    className="prefix__cls-1"
                    transform="rotate(135 4.694 4.692)"
                    d="M-1.38 4.13h12.14v1.13H-1.38z"
                />
                <path
                    className="prefix__cls-1"
                    transform="rotate(45 4.687 4.691)"
                    d="M-1.38 4.13h12.14v1.13H-1.38z"
                />
            </g>
        </g>
    </Close>
);

export const ReplyIcon = props => (
    <Reply viewBox="0 0 22.02 16.39" {...props}>
        <g data-name="\u0421\u043B\u043E\u0439 2">
            <path
                d="M8.23 0L0 8.23l8.16 8.16v-4.83s8.5-.88 13.86 3.91c0 0-1.42-10.3-13.79-10.3z"
                data-name="\u0421\u043B\u043E\u0439 1"
            />
        </g>
    </Reply>
);
