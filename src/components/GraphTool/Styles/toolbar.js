import styled from 'styled-components';

const wideScreen = 'only screen and (min-width : 1920px)';

const ToolBar = {};

/**
 *  Toolbar styles
 */
ToolBar.Icon = styled.svg`
    height: 100%;
    width: 28px;
    transition: all 0.1s;
`;

ToolBar.SvgGraph = styled(ToolBar.Icon)`
    width: calc(23px * ${props => props.theme.palette.iconScale});
    height: calc(23px * ${props => props.theme.palette.iconScale});
    
    @media ${wideScreen} {
        width: 23px;
        height: 23px;
    }
`;

ToolBar.SvgExpand = styled(ToolBar.Icon)`
    width: calc(25px * ${props => props.theme.palette.iconScale});
    height: calc(25px * ${props => props.theme.palette.iconScale});
    
    @media ${wideScreen} {
        width: 25px;
        height: 25px;
    }
`;

ToolBar.SvgUndo = styled(ToolBar.Icon)`
    width: calc(23px * ${props => props.theme.palette.iconScale});
    height: calc(23px * ${props => props.theme.palette.iconScale});
    
    @media ${wideScreen} {
        width: 23px;
        height: 23px;
    }
`;

ToolBar.SvgRedo = styled(ToolBar.Icon)`
    width: calc(23px * ${props => props.theme.palette.iconScale});
    height: calc(23px * ${props => props.theme.palette.iconScale});
    
    @media ${wideScreen} {
        width: 23px;
        height: 23px;
    }
`;

ToolBar.SvgCamera = styled(ToolBar.Icon)`
    width: calc(25px * ${props => props.theme.palette.iconScale});
    height: calc(25px * ${props => props.theme.palette.iconScale});
    
    @media ${wideScreen} {
        width: 25px;
        height: 25px;
    }
`;

ToolBar.SvgGear = styled(ToolBar.Icon)`
    width: calc(25px * ${props => props.theme.palette.iconScale});
    height: calc(25px * ${props => props.theme.palette.iconScale});
    
    @media ${wideScreen} {
        width: 25px;
        height: 25px;
    }
`;

ToolBar.SvgGraph2 = styled(ToolBar.Icon)`
    width: calc(23px * ${props => props.theme.palette.iconScale});
    height: calc(23px * ${props => props.theme.palette.iconScale});
    
    @media ${wideScreen} {
        width: 23px;
        height: 23px;
    }
`;

ToolBar.SvgReload = styled(ToolBar.Icon)`
    width: calc(27px * ${props => props.theme.palette.iconScale});
    height: calc(27px * ${props => props.theme.palette.iconScale});
    
    @media ${wideScreen} {
        width: 27px;
        height: 27px;
    }
`;

ToolBar.SvgMode = styled(ToolBar.Icon)`
    width: calc(27px * ${props => props.theme.palette.iconScale});
    height: calc(27px * ${props => props.theme.palette.iconScale});
    
    @media ${wideScreen} {
        width: 27px;
        height: 27px;
    }
`;

ToolBar.SvgCross = styled(ToolBar.Icon)`
    width: calc(24px * ${props => props.theme.palette.iconScale});
    height: calc(24px * ${props => props.theme.palette.iconScale});
    
    @media ${wideScreen} {
        width: 24px;
        height: 24px;
    }
`;

ToolBar.SvgTrend = styled(ToolBar.Icon)`
    width: calc(22px * ${props => props.theme.palette.iconScale});
    height: calc(20px * ${props => props.theme.palette.iconScale});
    
    @media ${wideScreen} {
        width: 22px;
        height: 20px;
    }
`;

ToolBar.SvgPitchfork = styled(ToolBar.Icon)`
    width: calc(25px * ${props => props.theme.palette.iconScale});
    height: calc(23px * ${props => props.theme.palette.iconScale});
    
    @media ${wideScreen} {
        width: 25px;
        height: 23px;
    }
`;

ToolBar.SvgBrush = styled(ToolBar.Icon)`
    width: calc(28px * ${props => props.theme.palette.iconScale});
    height: calc(28px * ${props => props.theme.palette.iconScale});
    
    @media ${wideScreen} {
        width: 28px;
        height: 28px;
    }
`;

ToolBar.SvgText = styled(ToolBar.Icon)`
    width: calc(15px * ${props => props.theme.palette.iconScale});
    height: calc(19px * ${props => props.theme.palette.iconScale});
    
    @media ${wideScreen} {
        width: 15px;
        height: 19px;
    }
`;

ToolBar.SvgPattern = styled(ToolBar.Icon)`
    width: calc(27px * ${props => props.theme.palette.iconScale});
    height: calc(24px * ${props => props.theme.palette.iconScale});
    
    @media ${wideScreen} {
        width: 27px;
        height: 24px;
    }
`;

ToolBar.SvgLongPos = styled(ToolBar.Icon)`
    width: calc(23px * ${props => props.theme.palette.iconScale});
    height: calc(21px * ${props => props.theme.palette.iconScale});
    
    @media ${wideScreen} {
        width: 23px;
        height: 21px;
    }
`;

ToolBar.SvgIcon = styled(ToolBar.Icon)`
    width: calc(21px * ${props => props.theme.palette.iconScale});
    height: calc(15px * ${props => props.theme.palette.iconScale});
    
    @media ${wideScreen} {
        width: 21px;
        height: 15px;
    }
`;

ToolBar.SvgMeasure = styled(ToolBar.Icon)`
    width: calc(26px * ${props => props.theme.palette.iconScale});
    height: calc(22px * ${props => props.theme.palette.iconScale});
    
    @media ${wideScreen} {
        width: 26px;
        height: 22px;
    }
`;

ToolBar.SvgZoom = styled(ToolBar.Icon)`
    width: calc(22px * ${props => props.theme.palette.iconScale});
    height: calc(22px * ${props => props.theme.palette.iconScale});
    
    @media ${wideScreen} {
        width: 22px;
        height: 22px;
    }
`;

ToolBar.SvgMagnet = styled(ToolBar.Icon)`
    width: calc(22px * ${props => props.theme.palette.iconScale});
    height: calc(25px * ${props => props.theme.palette.iconScale});
    
    @media ${wideScreen} {
        width: 22px;
        height: 25px;
    }
`;

ToolBar.SvgDrawing = styled(ToolBar.Icon)`
    width: calc(25px * ${props => props.theme.palette.iconScale});
    height: calc(27px * ${props => props.theme.palette.iconScale});
    
    @media ${wideScreen} {
        width: 25px;
        height: 27px;
    }
`;

ToolBar.SvgLock = styled(ToolBar.Icon)`
    width: calc(17px * ${props => props.theme.palette.iconScale});
    height: calc(22px * ${props => props.theme.palette.iconScale});
    
    @media ${wideScreen} {
        width: 17px;
        height: 22px;
    }
`;

ToolBar.SvgHide = styled(ToolBar.Icon)`
    width: calc(30px * ${props => props.theme.palette.iconScale});
    height: calc(17px * ${props => props.theme.palette.iconScale});
    
    @media ${wideScreen} {
        width: 30px;
        height: 17px;
    }
`;

ToolBar.SvgShow = styled(ToolBar.Icon)`
    width: calc(28px * ${props => props.theme.palette.iconScale});
    height: calc(22px * ${props => props.theme.palette.iconScale});
    
    @media ${wideScreen} {
        width: 28px;
        height: 22px;
    }
`;

ToolBar.SvgRemove = styled(ToolBar.Icon)`
    width: calc(21px * ${props => props.theme.palette.iconScale});
    height: calc(23px * ${props => props.theme.palette.iconScale});
    
    @media ${wideScreen} {
        width: 21px;
        height: 23px;
    }
`;


ToolBar.Toolbar = styled.div`
    position: absolute;
    left: 10px;
    top: 10px;
    bottom: 10px;
    display: block;
    padding: 0;
    width: 32px;
    max-width: 100%;
    max-height: calc(100% - 62px);
    z-index: 7;
    // padding-bottom: 34px;
    
    &:after{
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        border-radius: ${props => props.theme.palette.borderRadius};
        background: ${props => props.theme.palette.clrback};
        transition: all .2s;
        opacity: 0.75;
        z-index: -1;
    }

    &:hover{
        &:after{
            opacity: 1;
        }
    }
    
    @media ${wideScreen}{
        width: 42px;    
        max-height: calc(100% - 72px);    
    }
`;

ToolBar.Wrapper = styled.div`
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    max-width: ${props => props.width}px;
    overflow: auto;
    z-index: 1;
`;

ToolBar.Item = styled.div`
    position: relative;
    overflow: hidden;

    & ${ToolBar.Icon} {
        fill: ${props => props.disabled ? props.theme.palette.clrbackA : props.theme.palette.clrimportant};
    }

    &:hover {
        background: ${props => props.disabled ? 'transparent' : props.theme.palette.clrbackL};
        border-radius: ${props => props.theme.palette.borderRadius};

        .toolbar__drop-arrow{
            transform: translate(0, -50%) rotate(0);
        }

        & ${ToolBar.Icon} {
            fill: ${props => props.disabled ? props.theme.palette.clrbackA : props.theme.palette.clrtextD};
        }
    }

    &.active{
        background: ${props => props.theme.palette.clrbackA};

        .toolbar__drop-arrow{
            transform: translate(0, -50%) rotate(180deg);
        }
    }

    &.bottom{
        margin: auto 0 0;
    }
`;

ToolBar.Btn = styled.button`
    height: 32px;
    width: 32px;
    margin: 0 -1px 0 -1px;
    display: flex;
    align-items: center;
    flex: 0 auto;
    background: transparent;
    justify-content: center;
    padding: 0;
    border: 1px solid transparent;
    cursor: pointer;
    transition: all .1s;
    outline:none;

    @media ${wideScreen}{
        width: 42px;
        height: 42px;        
    }
`;

ToolBar.Separator = styled.div`
    width: 100%;
    height: 1px;
    background: ${props => props.theme.palette.clrseparator};
    margin: 0;
`;

ToolBar.SysStatus = styled.div`
    position: absolute;
    left: 0;
    bottom: 0;
    display: flex;
    width: 100%;
    height: 32px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    
    @media ${wideScreen} {
        height: 42px;
    }
`;

ToolBar.SysStatusDot = styled.div`
    width: 5px;
    height: 5px;
    background: #2EAA89;
    border-radius: 50%;
    padding: 0;
    margin: 0;
    
    @media ${wideScreen} {
        width: 8px;
        height: 8px;
    }
`;

ToolBar.SysStatusTitle = styled.div`
    font-size: 5px;
    padding: 0;
    margin: 2px 0 0;
    line-height: 1.28;
    color: ${props => props.theme.palette.clrtext};
    
    @media ${wideScreen} {
        font-size: 7px;
    }
`;

export default ToolBar;
