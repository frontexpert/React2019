import styled from 'styled-components';
import { WalletButton } from './Components';

// All children styles for CoinPairSearch are in this component.
// We know it is better to separate, but merged to this one because of styled-component issue with flickering and
// bad performance impact.
// exception: react-virtualized table
const StyledWrapper = styled.div.attrs({ className: 'coin-pair-form-v2' })`
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: stretch;
    margin: 0;
    padding: 0;
    width: 100%;
    min-height: calc(${props => props.theme.palette.exchHeadHeight} + 2px);

    * {
        outline: none !important;
    }

    .coin-pair-form-inner-wrapper {
        flex: 1;
        position: relative;
        z-index: ${props => props.modalOpened ? 0 : 100000};
        height: calc(${props => props.theme.palette.exchHeadHeight} + 2px);
        background-color: transparent;

        &.open {
            .exch-head {
                visibility: hidden;
                opacity: 0;
                display: none;
            }

            .exch-form {
                transform: translateY(0);
                display: flex !important;
                visibility: visible;
                opacity: 1;
            }
        }
    }

    // Step 1 ===================================================================================================
    .exch-head {
        position: relative;
        display: flex;
        margin: 0;
        flex: 0 0 ${props => props.theme.palette.exchHeadHeight};
        transition: all .5s;

        .exch-head__get,
        .exch-head__send {
            position: relative;
            display: flex;
            flex: 1 1;
            padding: 0;
            height: calc(${props => props.theme.palette.exchHeadHeight} + 2px);
        }

        .exch-head__switch {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            margin: 0;
            border: none;
            border-radius: ${props => props.theme.palette.borderRadius};
            // padding-bottom: 14px;
            padding: 0px 12px;
            cursor: pointer;
            background: transparent;

            &:hover {
                .exch-head__switch-arrows,
                .exch-form__switch-arrows {
                    stroke: ${props => props.theme.palette.coinPairSwitchBtnHoverFill};
                }
            }

            &.switched {
                .exch-head__switch-arrows {
                    transform: rotate(180deg);
                }
            }

            &.shortsell {
                cursor: initial;

                &:hover {
                    .exch-head__switch-arrows,
                    .exch-form__switch-arrows {
                        stroke: ${props => props.theme.palette.coinPairSwitchBtnFill};
                    }
                }
            }

            .exch-head__switch-arrows {
                margin: 0 0 2px 0;
                width: 38px;
                height: 28px;
                transition: all .3s;
                transform: rotate(0deg);
                stroke: ${props => props.theme.palette.coinPairSwitchBtnFill};
                fill: none;
            }

            .exch-form__switch-arrows {
                // margin:  0 0 4px 0;
                // width: 53px;
                // height: 20px;
                width: 32px;
                height: 24px;
                transition: all .3s;
                transform: rotate(0deg);
                stroke: ${props => props.theme.palette.coinPairSwitchBtnFill};
                fill: none;
            }
        }

        .exch-head__btnv2 {
            width: 9%;
            width: 100px;
            cursor: pointer;
            margin: 0 0 0 ${props => props.theme.palette.gapSize};

            &.progress {
                border: 1px solid ${props => props.theme.palette.clrBorder};
            }

            .exch-head__btnv2__content {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;

                .btn-text-ratio {
                    margin-top: 2px;
                    color: #fff;
                    text-decoration: none;
                    font-size: 13px;
                    font-weight: 300;
                    white-space: nowrap;
                    justify-content: center;
                    line-height: 1;
                }
            }

            .btn-text {
                color: #fff;
                text-decoration: none;
                font-size: 22px;
                font-weight: 600;
                white-space: nowrap;
                justify-content: center;
                line-height: 1;
            }
        }
    }

    // Dropdown component =======================================================================================
    .exch-dropdown {
        position: relative;
        z-index: 8;
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 100%;
        cursor: pointer;
        transition: all 0.1s;

        &.open {
            .exch-dropdown__border {
                &:before {
                    background: ${props => props.theme.palette.coinPairSelectHoverBg};
                    border-radius: ${props => `${props.theme.palette.borderRadius} ${props.theme.palette.borderRadius} 0 0`};
                }

                .exch-dropdown__current {
                    .ratio-input {
                        color: ${props => props.theme.palette.coinPairSelectHoverText2} !important;
                    }
                }
            }

            .exch-dropdown__list {
                opacity: 1;
                visibility: visible;
                margin-top: 12px;
                border-top: 1px solid ${props => props.theme.palette.clrBorder};
            }

            .exch-dropdown__handle {
                .sprite-icon {
                    &.arrow {
                        display: none;
                    }

                    &.close {
                        display: block;
                    }
                }
            }
        }

        .exch-dropdown__border {
            position: relative;
            // overflow: hidden;
            width: 100%;
            height: 100%;

            &:before {
                content: '';
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                right: 0;
                z-index: -1;
                border-radius: ${props => props.theme.palette.borderRadius};
                background: ${props => props.theme.palette.coinPairSelectBg};
                border: 1px solid ${props => props.theme.palette.coinPairSelectBorder};
            }

            &:hover {
                &:before {
                    background: ${props => props.theme.palette.coinPairSelectHoverBg};
                    border: 1px solid ${props => props.theme.palette.coinPairSelectHoverBorder};
                }

                .exch-dropdown__current {
                    color: ${props => props.theme.palette.coinPairSelectHoverText2} !important;

                    .exch-dropdown__title {
                        color: ${props => props.theme.palette.coinPairSelectHoverText2} !important;

                        span {
                            color: ${props => props.theme.palette.coinPairSelectHoverText2} !important;
                        }
                    }

                    .ratio-input {
                        color: ${props => props.theme.palette.coinPairSelectHoverText2} !important;
                    }
                }
            }
        }

        .exch-dropdown__current {
            width: 100%;
            height: 100%;
            padding: 0 10px;
            display: flex;
            align-items: center;
            transition: all .1s;
            font-size: 13px;
            color: ${props => props.theme.palette.coinPairSelectText2};

            .exch-dropdown__title {
                font-size: 13px;
                color: ${props => props.theme.palette.coinPairSelectText2};

                span {
                    font-size: 40px;
                    font-weight: 600;
                    color: ${props => props.theme.palette.coinPairSelectHoverText2};
                }
            }

            .flex-1 {
                flex: 1;
                display: flex;
                align-items: center;

                // &:first-child {
                //     width: 45%;
                // }
                //
                // &:last-child {
                //     width: 85%;
                //     justify-content: flex-end;
                // }

                .ratio-input {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    background: transparent;
                    border: none;
                    border-radius: ${props => props.theme.palette.borderRadius};
                    font-size: 38px;
                    font-weight: 600;
                    color: ${props => props.theme.palette.coinPairSelectHoverText};
                    text-align: right;
                    outline: none;
                    cursor: pointer;

                    @media (max-width: 1390px) {
                        font-size: 32px;
                    }
                }
            }
        }

        .exch-dropdown__handle {
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;
            right: 22px;
            width: 10px;
            display: flex;
            align-items: center;
            justify-content: center;

            &:hover {
                .sprite-icon {
                    fill: ${props => props.theme.palette.coinPairSelectHoverAddon};
                }
            }

            .sprite-icon {
                position: relative;
                width: 15px;
                height: 9px;
                fill: ${props => props.theme.palette.clrHighContrast};
                transition: all 0.2s;

                &.arrow {
                    display: block;
                }

                &.close {
                    height: 10px;
                    display: none;
                }
            }
        }

        .exch-dropdown__list-title {
            position: relative;
            display: flex;
            padding: 0 15px;
            align-items: center;
            // height: 39px;
            height: 0;
            font-size: 16px;
            font-weight: 600;
            background: ${props => props.theme.palette.coinPairDropDownTitleBg};
            border-bottom: 1px solid ${props => props.theme.palette.coinPairDropDownItemBorder};
            color: ${props => props.theme.palette.coinPairDropDownTitleText};
            margin: 0 0 -1px;
        }

        .exch-dropdown__list {
            position: absolute;
            // height: max-content;
            z-index: 5;
            left: 0;
            right: 0;
            top: 100%;
            padding: 0;
            margin: 0;
            list-style: none;
            opacity: 0;
            visibility: hidden;
            transition: all 0.2s;
            background: transparent;
            border-radius: 0 0 ${props => props.theme.palette.borderRadius} ${props => props.theme.palette.borderRadius};

            // &:before {
            //     content: '';
            //     position: absolute;
            //     right: 14px;
            //     top: -5px;
            //     width: 0;
            //     border-style: solid;
            //     border-width: 0 8px 8px 8px;
            //     border-color: transparent transparent ${props => props.theme.palette.coinPairDropDownTitleBg} transparent;
            //     z-index: 1;
            // }
            //
            // &:after {
            //     content: '';
            //     position: absolute;
            //     right: 14px;
            //     top: -7px;
            //     width: 0;
            //     border-style: solid;
            //     border-width: 0 8px 8px 8px;
            //     border-color: transparent transparent ${props => props.theme.palette.coinPairDropDownBorder} transparent;
            //     z-index: 0;
            // }

            .scrollbar-container {
                height: auto;
                max-height: 100%;
                box-shadow: 0 2px 10px rgba(0,0,0,.35);
                border: 1px solid ${props => props.theme.palette.coinPairDropDownBorder};
                border-top: 0;
                border-radius: 0 0 ${props => props.theme.palette.borderRadius} ${props => props.theme.palette.borderRadius};
                background: ${props => props.theme.palette.coinPairDropDownItemBg};
                overflow: hidden;

                .ps__rail-y {
                    opacity: 0 !important;
                    border-left: 1px solid ${props => props.theme.palette.clrInnerBorder};
                    background: ${props => props.theme.palette.coinPairDropDownScrollBg};

                    .ps__thumb-y {
                        &:before {
                            background: ${props => props.theme.palette.coinPairDropDownScrollThumb};
                        }
                        cursor: pointer;
                    }
                }
            }
        }

        .exch-dropdown__item {
            position: relative;
            display: flex;
            align-items: center;
            padding: 0 30px 0 15px;
            border: none;
            border-bottom: 1px solid ${props => props.theme.palette.clrInnerBorder};
            width: 100%;
            height: 110px;
            font-size: 18px;
            color: ${props => props.theme.palette.coinPairDropDownItemText};
            background: ${props => props.theme.palette.coinPairDropDownItemBg};
            transition: all .1s;
            cursor: pointer;

            span {
                // font-weight: 600;
                // color: ${props => props.theme.palette.coinPairDropDownItemActiveText} !important;
                // text-decoration: underline;
            }

            .exch-dropdown__icon {
                width: 50px;
                height: 50px;
                margin: 0 0 0 0;
            }

            &:focus,
            &.select {
                .exch-dropdown__title {
                    color: ${props => props.theme.palette.coinPairDropDownItemActiveText} !important;

                    span {
                        color: ${props => props.theme.palette.coinPairDropDownItemActiveText} !important;
                    }
                }
            }

            &:hover {
                background: ${props => props.theme.palette.coinPairDropDownItemHoverBg} !important;

                .exch-dropdown__title {
                    color: ${props => props.theme.palette.coinPairDropDownItemHoverText} !important;

                    span {
                        color: ${props => props.theme.palette.coinPairDropDownItemHoverText} !important;
                    }
                }
            }

            &.current {
                background: ${props => props.theme.palette.coinPairDropDownItemActiveBg};

                .exch-dropdown__title {
                    color: ${props => props.theme.palette.coinPairDropDownItemActiveText} !important;

                    span {
                        color: ${props => props.theme.palette.coinPairDropDownItemActiveText} !important;
                    }
                }

                & ~ .exch-deposit-wrapper {
                    .exch-deposit-input {
                        border-color: ${props => props.theme.palette.clrPurple} !important;

                        div {
                            background-color: ${props => props.theme.palette.clrPurple} !important;
                        }
                    }
                }
            }

            &.disabled,
            &:disabled {
                // cursor: initial;

                .overlay {
                    display: block;
                }
            }

            .overlay {
                position: absolute;
                display: none;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                background: rgba(0, 0, 0, .3);
                pointer-events: none;
            }
        }

        .exch-dropdown__list__rvtable-wrapper {
            width: 100%;
            // height: ${props => props.gridHeight ? props.gridHeight - 90 : 440}px;

            .ReactVirtualized__Table__row:last-child {
                .exch-dropdown__item {
                    border-bottom: 0;
                }
            }
        }

        .exch-search {
            display: flex;
            position: absolute;
            z-index: 5;
            left: 0;
            right: 0;
            top: 0;
            height: 60px;
            background: ${props => props.theme.palette.coinPairDropDownItemBg};
            border: 1px solid ${props => props.theme.palette.coinPairDropDownBorder};
            border-radius: ${props => `${props.theme.palette.borderRadius} ${props.theme.palette.borderRadius} 0 0`};

            .exch-search__icon {
                background-color: #454c73;
                position: absolute;
                right: 0px;
                top: 50%;
                transform: translateY(-50%);
                width: 60px;
                height: 60px;
                padding: 15px;
                fill: ${props => props.theme.palette.clrHighContrast};
                z-index: 1;
            }

            .exch-search__input {
                font-size: 30px;
                position: absolute;
                width: 100%;
                left: 0;
                top: 0;
                right: 0;
                bottom: 0;
                color: ${props => props.theme.palette.coinPairSelectText};
                padding: 0 120px 0 20px;
                border: none;
                background: transparent;
                margin: auto 0;
                caret-color: white;
                caret-width: 2px;

                &::placeholder {
                    color: ${props => props.theme.palette.coinPairSelectText};
                }
            }
        }
    }

    // Came out since used in other components, needs refactoring in future
    .exch-dropdown__icon {
        width: 38px;
        height: 38px;
        margin: 0 0 0 0;
        cursor: pointer;
    }

    .exch-dropdown__title {
        padding: 0 0 0 10px;
        margin: 0;
        line-height: 1;
        font-weight: 500;
        font-size: 30px;
        // font-family: sans-serif;
        // letter-spacing: -0.1em;
        white-space: nowrap;
        color: ${props => props.theme.palette.coinPairDropDownItemText};
        cursor: pointer;

        span {
            position: relative;
            text-transform: uppercase;
            color: ${props => props.theme.palette.coinPairDropDownItemText};
        }
    }

    // Step 2 ===================================================================================================
    .exch-form {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        z-index: 10;
        transform: translateY(-60px);
        height: calc(${props => props.theme.palette.exchHeadHeight} + 2px);
        visibility: hidden;
        opacity: 0;

        .exch-form__get,
        .exch-form__send {
            position: relative;
            flex: 1 1;
            display: flex;
            align-items: center;
            padding: 1px 1px 1px 10px;
            height: 100%;
            // overflow: hidden;

            &:hover {
                &:before {
                    background: ${props => props.theme.palette.coinPairSelectHoverBg};
                    border: 1px solid ${props => props.theme.palette.coinPairSelectHoverBorder};
                }
            }

            &:before {
                content: '';
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                right: 0;
                z-index: -1;
                border-radius: ${props => props.theme.palette.borderRadius};
                border: 1px solid ${props => props.theme.palette.coinPairSelectBorder};
                background: ${props => props.theme.palette.coinPairSelectBg};
            }

            .exch-dropdown__title {
                font-size: 13px;
                color: ${props => props.theme.palette.coinPairSelectText};

                span {
                    font-size: 40px;
                    font-weight: 600;
                    color: ${props => props.theme.palette.coinPairSelectText};
                }
            }
        }

        .exch-form__input {
            position: relative;
            font-size: 38px;
            font-weight: 600;
            height: 100%;
            width: 100%;
            text-align: right;
            padding: 4px 10px;
            border: none;
            border-radius: ${props => props.theme.palette.borderRadius};
            color: ${props => props.theme.palette.coinPairSelectText2};
            outline: none;
            background: transparent;
            z-index: 1;
            margin-top: 0;
            caret-color: white;
            caret-width: 2px;

            @media (max-width: 1390px) {
                font-size: 32px;
            }
        }

        .exch-form__send {
            .exch-form__input {
                color: ${props => props.theme.palette.coinPairSelectText};
            }
        }

        .exch-form__get {
            .exch-form__input {
                cursor: pointer;
            }
        }

        .exch-form__sep {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            margin: 0;
            border: none;
            border-radius: ${props => props.theme.palette.borderRadius};
            // padding-bottom: 6px;
            padding: 0 12px;
            height: calc(${props => props.theme.palette.exchHeadHeight} + 2px);
            cursor: pointer;
            background: transparent;

            &:hover {
                .exch-form__switch-arrows {
                    stroke: ${props => props.theme.palette.coinPairSwitchBtnHoverFill};
                }
            }

            &.shortsell {
                cursor: initial;

                &:hover {
                    .exch-form__switch-arrows {
                        stroke: ${props => props.theme.palette.coinPairSwitchBtnFill};
                    }
                }
            }

            &.switched {
                .exch-form__switch-arrows {
                    transform: rotate(180deg);
                }
            }

            .exch-form__switch-arrows {
                // width: 53px;
                // height: 20px;
                width: 32px;
                height: 24px;
                transition: all .3s;
                transform: rotate(0deg);
                stroke: ${props => props.theme.palette.coinPairSwitchBtnFill};
                fill: none;
            }
        }

        &.progress:not(.completed) {
            .exch-form__submitv2 {
                .exch-form__progress {
                    display: block;

                    span {
                        display: inline-block;
                    }

                    &__label {
                        font-size: 10px;
                    }

                    &__value {
                        font-size: 37px;
                        font-weight: 600;
                        padding-right: 5px;
                    }

                    &__percent {
                        font-weight: 400;
                        font-size: 22px;
                        line-height: 10px;
                        font-family: Arial, Helvetica, sans-serif;
                        margin-left: -4px;

                        small {
                            font-size: 10px;
                        }
                    }
                }

                & > span, .btn-text {
                    display: none;
                }
            }
        }

        &.progress,
        &.completed {
            .exch-form__input {
                fill: ${props => props.theme.palette.coinPairSelectText};
                color: ${props => props.theme.palette.coinPairSelectText2};
                pointer-events: none;
            }

            .exch-form__send,
            .exch-form__get {
                &:before {
                    background: ${props => props.theme.palette.coinPairDropDownItemBg};
                    border: 1px solid ${props => props.theme.palette.coinPairDropDownItemBorder};
                }
            }

            .exch-dropdown__title {
                color: ${props => props.theme.palette.coinPairSelectText2};

                span {
                    color: ${props => props.theme.palette.coinPairSelectText2};
                }
            }

            .exch-dropdown__icon {
                opacity: .25;
                filter: grayscale(1);
            }

            .exch-form__sep {
                pointer-events: none;
            }
        }

        &.amountInput {
            // .exch-form__send,
            // .exch-form__get {
            //     &:before {
            //         background: ${props => props.theme.palette.coinPairDropDownItemBg};
            //         border: 1px solid ${props => props.theme.palette.coinPairDropDownItemBorder};
            //     }
            // }

            // .exch-dropdown__title {
            //     color: ${props => props.theme.palette.coinPairSelectText2};
            //
            //     span {
            //         color: ${props => props.theme.palette.coinPairSelectText2};
            //     }
            // }

            // .exch-dropdown__icon {
            //     opacity: .25;
            //     filter: grayscale(1);
            // }

            .exch-form__sep {
                pointer-events: none;
            }
        }

        &.completed {
            .exch-form__submitv2 {
                .exch-form__progress {
                    display: none;
                }
            }
        }

        .range-slider {
            position: absolute;
            left: 0; // 58px;
            right: 0; // 10px;
            bottom: -6px;
            z-index: 1;
        }
    }

    // Came out since exch-head is also using these
    .exch-form__btns {
        width: 9%;
        height: calc(${props => props.theme.palette.exchHeadHeight} + 2px);
        margin: 0 0 0 ${props => props.theme.palette.gapSize};
        display: flex;
        // flex: 0 0 235px;
        flex-grow: 0;
        flex-shrink: 0;
        min-width: 100px;
    }

    .exch-form__close {
        flex: 0 0 85px;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 0 0 ${props => props.theme.palette.gapSize};
        border: none;
        padding: 0;
        height: calc(${props => props.theme.palette.exchHeadHeight} + 2px);
        color: #fff;
        cursor: pointer;
        text-decoration: none;
        font-size: 16px;
        font-weight: 700;
        white-space: nowrap;
        transition: all 0.1s;
        line-height: 1;
        background: ${props => props.theme.palette.coinPairCloseBtnBg};
        border-radius: ${props => props.theme.palette.borderRadius};

        .sprite-icon {
            width: 35px;
            height: 35px;
            fill: ${props => props.theme.palette.coinPairCloseBtnText};
        }

        &:hover, &:focus {
            background: ${props => props.theme.palette.coinPairCloseBtnHoverBg};

            .sprite-icon {
                fill: ${props => props.theme.palette.coinPairCloseBtnHoverText};
            }
        }

        &:active, &.active {
            background: ${props => props.theme.palette.coinPairCloseBtnActiveBg};

            .sprite-icon {
                fill: ${props => props.theme.palette.coinPairCloseBtnActiveText};
            }
        }
    }

    .exch-form__submitv2 {
         cursor: pointer;
         &.progress {
            border: 1px solid ${props => props.theme.palette.clrBorder};
         }

        .btn-text, .btn-text-done {
            color: #fff;
            text-decoration: none;
            font-size: 22px;
            letter-spacing: 1.1px;
            font-weight: 600;
            white-space: nowrap;
            justify-content: center;
            line-height: 1;
        }

        .exch-form__progress {
            display: none;
            color: ${props => props.theme.palette.coinPairNextBtnText};
            z-index: 1;
            margin-top: 2px;

            > img {
                width: 20%;
            }
        }
    }

    // Others ===================================================================================================
    .hidden {
        display: none !important;
    }

    .coin-icon {
        flex-shrink: 0;
        background-size: cover !important;
    }

    .no-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        font-weight: bold;
        background: ${props => props.theme.tradePalette.primaryBuy};
        color: ${props => props.theme.palette.contrastText};
    }

`;

export default StyledWrapper;
