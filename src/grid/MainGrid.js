import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Fullscreen from 'react-full-screen';

// Child Components
import LeftTopSectionGrid from './LeftTopSectionGrid';
import RightTopSectionGrid from './RightTopSectionGrid';
import SideBarGrid from './SideBarGrid';
import {
    ICO, Charts, News, Stats, Other, NotFound, NotFoundNew
} from '../components/Pages';
import { Router, Route } from '../components/Router';
import InitialLoaderContainer from '../components/InitialLoaderContainer';
import LoginOrderModalV2 from '../components/LoginOrderModalV2';
import MobileControl from '../components/MobileControl';
import { getScreenInfo } from '../utils';
import BillsModal from '../components/Modals/BillsModal';
import ConnectionLost from '../components-generic/ConnectionLost';

// Set ReactDom
window.React = React;
window.ReactDOM = ReactDOM;

const GridWrapper = styled.div`
    position: relative;
    display: grid;
    grid-template-rows: 100%;
    grid-gap: 12px;
    height: 100%;
    background: ${props => props.theme.palette.clrBackground};
    padding: ${({ theme: { palette: { contentGap } } }) => `${contentGap} ${contentGap} ${contentGap}`} 0;
    grid-template-areas: 'sidebar lefttopsection righttopsection';
    grid-template-columns: ${props => (props.isMobileDevice || props.isSmallWidth) ? '0 calc(100% - 8px) 0' : '0 minmax(390px, 33%) auto'};
    // grid-template-columns: 55px minmax(353px, 23%) auto;
    
    @media(max-width: 1500px) {
        transform:scale(0.75);
        transform-origin:0 0;
        width: 133.33%;
        height: 133.33%;
    }

    @media(max-width: 1080px) { 
        transform:scale(0.65);
        transform-origin:0 0;
        width: 153.84%;
        height: 153.84%;
    }

    @media(max-width: 940px) {
        transform:scale(0.55);
        transform-origin:0 0;
        width: 181.81%;
        height: 181.81%;
    }

    @media(max-width: 790px) {
        transform:scale(0.45);
        transform-origin:0 0;
        width: 222.22%;
        height: 222.22%;
    }
    
    @media(max-width: 700px) {
        transform:scale(0.35);
        transform-origin:0 0;
        width: 285.71%;
        height: 285.71%;
    }

    // ${props => props.isMobileDevice ? `
    //     @media(orientation: landscape) {
    //         transform: rotate(-90deg) !important;
    //         transform-origin: left top;
    //         width: 100vh !important;
    //         height: ${props.heightRatio}% !important;
    //         overflow-x: hidden;
    //         position: absolute;
    //         top: 100%;
    //         left: 0;
    //     }
    // ` : ''};
    
    // transform:${props => props.isMobileDevice ? 'scale(0.75) !important' : (props.isSmallWidth ? 'scale(1) !important' : '')};
    // width:${props => props.isMobileDevice ? '133.33% !important' : (props.isSmallWidth ? '100% !important' : '')};
    // height:${props => props.isMobileDevice ? '133.33% !important' : (props.isSmallWidth ? '100% !important' : '')};
    transform:${props => props.isMobileDevice ? 'scale(1) !important' : (props.isSmallWidth ? 'scale(1) !important' : '')};
    width:${props => props.isMobileDevice ? '100% !important' : (props.isSmallWidth ? '100% !important' : '')};
    height:${props => props.isMobileDevice ? '100% !important' : (props.isSmallWidth ? '100% !important' : '')};
`;

class Trading extends React.Component {
    state = {
        isFull: false,
    };

    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
        // window.screen.orientation.lock('portrait');
    }

    updateDimensions = () => {
        this.state.isFull = false;
        this.forceUpdate();
    };

    goFull = () => {
        this.setState({ isFull: !this.state.isFull });
    };

    refresh = () => {
        window.location.reload();
    };

    render() {
        const {
            screenWidth,
            screenHeight,
            isMobileDevice,
        } = getScreenInfo();

        const isSmallWidth = screenWidth < 850 && !isMobileDevice;
        const sizeRatio = screenWidth / screenHeight * 100;

        return (
            <Fullscreen enabled={this.state.isFull}>
                <GridWrapper id="grid" isMobileDevice={isMobileDevice} isSmallWidth={isSmallWidth} heightRatio={sizeRatio}>
                    {!isMobileDevice && (
                        <SideBarGrid />
                    )}
                    <LeftTopSectionGrid isMobileDevice={isMobileDevice}/>
                    <RightTopSectionGrid/>
                    <InitialLoaderContainer isMobileDevice={isMobileDevice}/>
                    <LoginOrderModalV2/>
                    <BillsModal/>
                    <ConnectionLost/>
                    {/*
                    <MobileControl
                        isMobileDevice={isMobileDevice}
                        isMobileBrowser={isMobilePortrait}
                        goFull={this.goFull}
                        refresh={this.refresh}
                    />
                    */}
                </GridWrapper>
            </Fullscreen>
        );
    }
}

const MainGrid = props => {
    return (
        <Router defaultComponent={NotFound}>
            <Route path="/index.html" component={() => <Trading {...props} />} />
            <Route path="/" component={() => <Trading {...props} />} />
            {/*
            <Route path="/ico" component={() => <ICO themeType={props.themeType}/>}/>
            <Route path="/charts" component={() => <Charts themeType={props.themeType}/>}/>
            <Route path="/stats" component={() => <Stats themeType={props.themeType}/>}/>
            <Route path="/news" component={() => <News themeType={props.themeType}/>}/>
            <Route path="/other" component={() => <Other themeType={props.themeType}/>}/>
            <Route path="/trading" component={() => <Trading {...props} />}/>
            */}
        </Router>
    );
};

export default MainGrid;
