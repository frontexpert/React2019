import styled from 'styled-components'

export const MenuDropdown = styled.div`
    .menu-dropdown{
        font-size: 12px;
        padding: 0;
        margin: 0;
        list-style: none;
        position: absolute;
        left: 70%;
        top: 0;
        background: ${props => props.theme.palette.clrblock};
        transition: all 0.2s;
        transform: translate(-50%, 30px);
        opacity: ${props => props.open ? 1 : 0};
        visibility: ${props => props.open ? 'visible' : 'hidden'};
        border-radius: 5px;
        min-width: 80px;
        z-index: 10;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.45);
        
        &.open{
            opacity: 1;
            visibility: visible;
            transform: translate(-50%, 0);
    
            &.to-right{
                transform: translate(0, 0);
            }
    
            &.to-top{
                transform: translate(-50%, 0);
            }
    
            &.to-top-right{
                transform: translate(-85%, 0);
            }
        }
    
        &.to-right{
            left: auto;
            right: 0;
            transform: translate(0, 30px);
    
            &:before{
                left: auto;
                right: 30px;
                transform: translateX(0);
            }
    
            &:after{
                left: auto;
                right: 31px;
                transform: translateX(0);
            }
        }
    
        &.to-top{
            top: auto;
            bottom: calc(100% + 10px);
            transform: translate(-50%, -30px);
    
            &:before{
                top: auto;
                bottom: -11px;
                border-width: 11px 8px 0 8px;
                border-color: ${props => props.theme.palette.clrseparatorD} transparent transparent transparent;
            }
    
            &:after{
                top: auto;
                bottom: -10px;
                border-width: 11px 7px 0 7px;
                border-color: ${props => props.theme.palette.clrblock} transparent transparent transparent;
            }
        }
    
        &.to-top-right{
            top: auto;
            bottom: calc(100% + 10px);
            transform: translate(-85%, -30px);
    
            &:before{
                top: auto;
                left: auto;
                right: 13px;
                bottom: -11px;
                border-width: 11px 8px 0 8px;
                border-color: ${props => props.theme.palette.clrseparatorD} transparent transparent transparent;
                transform: translate(0);
            }
    
            &:after{
                top: auto;
                left: auto;
                right: 12px;
                bottom: -10px;
                border-width: 11px 7px 0 7px;
                border-color: ${props => props.theme.palette.clrblock} transparent transparent transparent;
                transform: translate(0);
            }
        }
    
        .menu-dropdown__item{
            position: relative;
            display: block;
            width: 100%;
            height: 30px;
            border-top: 1px solid ${props => props.theme.palette.clrseparator};
            background: #141824;
            overflow: hidden;
    
            &.active{
    
                .menu-dropdown__btn{
                    color: ${props => props.theme.palette.clraccent};
                    background: ${props => props.theme.palette.clrback};
                }
            }
    
            &.first{
                border: none;
                border-radius: 3px 3px 0 0;
            }

            &.last{
                border-radius: 0 0 3px 3px;
            }

            &.separated{
                border-top: 2px solid ${props => props.theme.palette.clraccent};
            }
        }
    
        .menu-dropdown__btn{
            position: relative;
            display: flex;
            width: 100%;
            height: 100%;
            border: none;
            background: transparent;
            cursor: pointer;
            color: ${props => props.theme.palette.clrtextL};
            font-size: 15px;
            width: 100%;
            line-height: 1.18;
            cursor: pointer;
            transition: all .1s ;
            padding: 5px 15px 5px 15px;
            align-items: center;
            white-space: nowrap;
            font-weight: 700;
    
            &:hover{
                color: ${props => props.theme.palette.clraccent};
            }
        }
    }
`;

export const MenuDropdownItem = styled.span`
`;

export const MenuDropdownLabel = styled.h2`
`;
