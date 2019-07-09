import styled from 'styled-components';

const GraphPrices = {};

GraphPrices.ToggleIcon = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 11px;
    height: 21px;
    fill: ${props => props.theme.palette.clriconD};
    transition: fill .1s;
`;

GraphPrices.Toggle = styled.div`
    transition: background .1s, border-color .1s;
        
    &:hover{
        border-color: ${props => props.theme.palette.clrseparatorD};

        ${GraphPrices.ToggleIcon}{
            fill: ${props => props.theme.palette.clrtext};
        }
    }
`;

GraphPrices.ToggleOpen = styled(GraphPrices.Toggle)`
`;

GraphPrices.Graphprices = styled.div`
    position: absolute;
    display: flex;
    min-height: 0;
    top: 0;
    right: 0;
    bottom: 0;
    padding: 0;
    background: ${props => props.theme.palette.clrBackground};
    will-change: transform;
    border-radius: ${props => props.theme.palette.borderRadius};
    // overflow: hidden;
    flex-direction: column;
    width: 100%;
    transition: width .25s linear;
`;

GraphPrices.Wrapper = styled.div`
    width: 100%;//${props => props.width}px;
    height: ${props => props.height}px;
    max-width: ${props => props.width}px;
    overflow: auto;
    z-index: 1;
    
    .scroll__scrollup {
        right: 14px;
        bottom: 4px;
    }
`;

GraphPrices.GraphBarItem = styled(GraphPrices.Graphprices)`
    width: 100%;
    margin: 0 0 20px 0;
`;

GraphPrices.LabeledDropdown = styled(GraphPrices.Graphprices)`
    width: auto;
    margin: 0;
`;


GraphPrices.TierIcon = styled.div`
    fill: #fff;
    width: 8px;
    height: 11px;
    margin: 0 0 0 4px;
`;

GraphPrices.Item = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: stretch;
    margin: 0;
    border-top: 1px solid ${props => props.theme.palette.exchBarItemBorder};
    width: 100%;
    min-height: 82px;
    cursor: pointer;
    // overflow: hidden;
    color: ${(props) => props.active ? props.theme.palette.clraccentD : props.theme.palette.clrtextD};
    background: ${(props) => props.active ? props.theme.palette.exchBarActiveItem : props.theme.palette.exchBarItemBg};

    &:first-child{
         border: none;
    }

    &:last-child{
         border-bottom: 1px solid ${props => props.theme.palette.exchBarItemBorder};
    }

    &:hover{
        background: ${(props) => !props.isPlan ? (props.active ? '' : props.theme.palette.exchBarHoverItem) : ''};    
    }
    
    > * {
        opacity: ${props => !props.disabled ? '1' : '0.5 !important'};
    }
`;

GraphPrices.ItemWrapper = styled.div`
    flex: 1 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: stretch;
    padding-right: 5px;
`;

GraphPrices.IconTrader = styled.div`
    flex: 0 0 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    position: relative;
`;

GraphPrices.Icon = styled.div`
    width: 20px;
    height: 20px;
    padding: 0;
    background: #1B293F;
    background-image: url('img/svg/trader-${props => props.background}.svg');
    background-size: 100% 100%;
`;

GraphPrices.ItemInner = styled.div`
    flex: 1 0 auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin-top: -5px;
    width: calc(100% - 50px);
`;

GraphPrices.Trader = styled.div`
    font-size: 18.7px;
    font-weight: 600;
    line-height: 1;
    margin: 0 0 4px;
    padding: 0;
    width: 100%;
    text-align: left;
    text-overflow: ellipsis !important;
    display: block;
    // overflow: hidden;
    text-transform: lowercase;
    
    ::first-letter {
        text-transform: uppercase;
    }
    
    color: ${props => props.theme.palette.contrastText};
`;

GraphPrices.Amount = styled.div`
    margin: 3px 0 0;
    padding: 0;
    width: 100%;
    font-size: 12px;
    line-height: 1.2;
    text-align: left;
    font-weight: 600;
    color: ${props => props.theme.palette.exchBarItemLabel};
    
    span {
        font-size: 11px;
        font-weight: 400;
    }
`;

GraphPrices.Price = styled.div`
    margin: 2px 0 0;
    padding: 0;
    width: 100%;
    font-size: 12px;
    font-weight: 600;
    line-height: 1em;
    text-align: left;
    color: ${props => props.theme.palette.exchBarItemLabel};
    
    .bold {
        font-size: 12px;
        font-weight: 600;    
    }
    
    .unit {
        font-size: 11px;
        font-weight: 400;
    }
`;

GraphPrices.ItemProgress = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: flex-start;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 10px;
`;

GraphPrices.ItemProgressBar = styled.div`
    margin: 0;
    padding: 0;
    width: ${props => `${props.percent}%`}
    transition: 1s linear !important;
    height: 100%;
    // background: linear-gradient(90deg,${props => props.theme.palette.clrblock},${props => props.theme.palette.clraccent});
    background: ${props => props.theme.palette.exchBarProgressBg};
    z-index: 1;
`;

GraphPrices.ItemProgressBarCheck = styled.img`
    width: 8px;
    height: 6px;
    position: absolute;
    right: 10px;
    bottom: 2px;
    z-index: 2;
`;

GraphPrices.ItemDetails = styled.div`
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    height: min-content;
    padding: 7px 20px;
    background-color: ${props => props.theme.palette.exchBarActiveItem};
    border-top: 1px solid ${props => props.theme.palette.exchBarItemBorder};
    font-size: 14px;
    font-weight: 600;
    color: ${props => props.theme.palette.clrtext};
    
    > div {
        width: 100%;
        // overflow: hidden;
        // white-space: nowrap;
        // text-overflow: ellipsis;
        margin-top: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        
        &:last-child {
            margin-bottom: 4px;
        }
    }
    
    .exch-bar-coin-icon {
        width: 16px;
        height: 16px;
        
        &:first-child {
            margin: 0;
        }
        
        &:last-child {
            margin: 0 0 0 4px;
        }
    }
    
    span {
        margin-left: 4px;
    }
    
    span.unit {
        font-weight: 400;
    }
`;

GraphPrices.SortCtrl = styled.div`
    .graph-prices__sort{
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        top: 10px;
        right: 10px;
        border: 1px solid;
        border-radius: 3px;
        height: 19px;
        background: transparent;
        
        font-size: 11px !important;
        color: ${props => props.theme.palette.exchBarItemLabel};
        z-index: 10000;
    }

    .graph-prices__sort__btn{
        padding: 0 4px;
        border: none;
        height: 100%;
        justify-content: center;
        text-align: center;
        background: transparent;
        color: ${props => props.theme.palette.exchBarItemLabel};
        font-size: 11px !important;
        line-height: 11px;
          font-weight: 600;
        cursor: pointer;

        &.asc{
            .sprite-icon.sort-none{
                display: none;
            }

            .sprite-icon.sort-asc{
                display: block;
            }
        }

        &.desc{
            .sprite-icon.sort-none{
                display: none;
            }
            
            .sprite-icon.sort-desc{
                display: block;
            }
        }
        
        .sprite-icon{
            width: 17px;
            height: 16px;
            display: none;

            &.sort-none{
                display: block;
            }
        }

        &:hover{
            .sprite-icon{
                fill: ${props => props.theme.palette.clrtextL};
            }    
        }
        
        &, &:hover, &:active, &:focus {
            outline: none;
        }
    }
`;

GraphPrices.ToggleBar = styled.div`
    position: absolute;
    right: 0;
    top: 0;
    bottom: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 13px;
    background: ${props => props.theme.palette.clrBackground};
    border: 1px solid ${props => props.theme.palette.clrBorder};
    border-left: 0;
    border-right: 0;
    border-radius: ${props => '0 ' + props.theme.palette.borderRadius + ' ' + props.theme.palette.borderRadius + ' 0'};
    cursor: pointer;
    transition: right 2s linear;
    z-index: 11;
    
    svg {
        width: 10px;
        height: 6px;
        transform: rotate(${props => !props.open ? 90 : 270}deg);

        &, & * {
            fill: ${props => props.theme.palette.clrBorder};
        }
    }
    
    &:hover {        
        svg {
            &, & * {
                fill: ${props => props.theme.palette.clrHighContrast} !important;
            }
        }
    }
`;

GraphPrices.BottomToggleBar = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid ${props => props.theme.palette.orderBookAddonBorder};
    border-radius: 0 0 ${props => props.theme.palette.borderRadius} ${props => props.theme.palette.borderRadius};
    // padding: 0 5px;
    width: calc(100% + 1px);
    height: 15px;
    background-color: ${props => props.theme.palette.orderBookAddonBg};
    z-index: 10;
    
    svg {
        transform: rotate(${props => props.isOpened ? 180 : 0}deg);
        &, & * {
            fill: ${props => props.theme.palette.orderBookAddonFill};
        }
    }
    
    &:hover {
        cursor: pointer;
        
        svg {
            &, & * {
                fill: ${props => props.theme.palette.orderBookAddonHoverFill} !important;
            }
        }
    }
`;

export default GraphPrices;
