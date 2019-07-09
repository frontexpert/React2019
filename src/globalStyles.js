import {injectGlobal} from 'styled-components';

export default () => injectGlobal`

    html, body {
        margin: 0;
        padding: 0;
        font-family: "Roboto", sans-serif;
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        /* overflow: hidden; */
    }

    .ReactTable.-highlight .rt-tbody .rt-tr:not(.-padRow):hover{
        background:rgba(0,0,0,0.3) !important;
    }

    .ReactTable .rt-td {
        padding: 0px !important;
        align-self: center;
    }

    .ReactTable {
        font-family: Roboto, sans-serif;
        font-size: .8rem;
        letter-spacing: .025rem;
    }

     /* turns off no-data message if table is empty */
    .rt-noData{
        display: none !important;
    }

    .tableRows{
        font-size: 1rem;
        padding-top : .8rem;
        padding-bottom : .8rem;
        & div {
            font-size: 1rem;
        }

        @media (max-width: 1850px) {
            font-size: .8rem;
            padding-top: .7rem;
            padding-bottom: .7rem;
            & div {
                font-size: .8rem;
            }
        }
    }

    /* being used to target currently */
    .tableRowsStreaming{
        padding-top: 5px;
        padding-bottom: 5px;
    }

    /* hide arorrws on all inputs of type number */
    input[type='number'] {
        -moz-appearance:textfield;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }

    /* chrome hide scrollbar */
    ::-webkit-scrollbar {
        width: 0px;  /* remove scrollbar space */
        background: transparent;  /* optional: just make scrollbar invisible */
    }
`;
