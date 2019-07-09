import React from 'react';
import styled from 'styled-components';

import imgAudioIcon from './icons/audio.svg';
import imgFileIcon from './icons/file.svg';
import imgPlayIcon from './icons/play.svg';
import imgPauseIcon from './icons/pause.svg';
import imgVideoIcon from './icons/video.svg';

export const StyleWrapper = styled.div`
    margin-bottom: 10px;
    display: flex;
    align-items: flex-end;
    justify-content: ${props => props.isLoggedInUser ? 'flex-end' : 'flex-start'};
    font-size: 13px;
    font-weight: normal;
    color: ${props => props.theme.palette.telegramText};

    p {
        white-space: initial !important;
    }

    &:last-child {
        margin-bottom: 0;
    }
`;

export const Content = styled.div`
    position: relative;
    padding: 10px 14px;
    background-color: ${props => props.isLoggedInUser ? props.theme.palette.telegramAppSelfMessageBackground : props.theme.palette.telegramAppMessageBackground};
    border-radius: ${props => props.theme.palette.borderRadius};
    word-break: break-all;
    
    &:after {
        content: '';
        position: absolute;
        bottom: 0%;
        width: 0;
        height: 0;
        margin-top: -6px;
        border: 12px solid transparent;
        border-bottom: 0;
        ${props => props.isLoggedInUser ? `
            right: 4px;
            margin-right: -12px;
            border-left-color: ${props.theme.palette.telegramAppSelfMessageBackground};
            border-right: 0;
        ` : `
            left: 4px;
            margin-left: -12px;
            border-right-color: ${props.theme.palette.telegramAppMessageBackground};
            border-left: 0;
        `}
    }
`;

export const ReplyButton = styled.button`
    margin-left: auto;
    border: 0;
    background: transparent;
    color: ${props => props.theme.palette.telegramReplyButton};
    font-size: 12px;
    padding: 3px;

    &:hover {
        text-decoration: underline;
        cursor: pointer;
    }

    &:focus, &:active {
        outline: none;
    }
`;

export const StyledNameWrapper = styled.div`
    display: flex;
    align-items: center;
`;

export const Name = styled.p`
    margin: 0;
    font-weight: bold;
    // color: ${props => props.theme.palette.telegramNameText};
    color: ${props => props.color};
`;

export const Date = styled.span`
    overflow: hidden;
    font-size: 12px;
    font-weight: normal;
    // min-width: 30px;
    color: ${props => props.theme.palette.telegramDateText};
    white-space: nowrap;
    float: right;
`;

export const ExtraAdd = styled.p`
    margin: 10px auto;
    font-size: 13px;
    font-weight: 600;
    line-height: 24px;
    color: ${props => props.theme.palette.telegramAppMessageJoin};
    text-align: center;

    span {
        padding: 0 12px;
        margin: 0;
        display: inline-block;
        background-color: ${props => props.theme.palette.telegramBackgroundExtra};
        border-radius: 50px;
    }
`;

export const GlobalDate = styled(ExtraAdd)`
    margin: 20px 0 10px;
`;

export const ReplyWrapper = styled.div`
    padding-left: 5px;
    margin-top: 5px;
    /*
        adding color to match html/css, but in the future there should be a function
        to use user color I guess as it's already implements
    */
    border-left: 2px solid ${props => props.theme.palette.telegramReplyName};
    color: ${props => props.theme.palette.telegramReplyText};
    // opacity: 0.7;
`;

export const ReplyName = styled.p`
    margin: 0;
    font-weight: 600;
    line-height: 1.2;
    color: ${props => props.theme.palette.telegramReplyName};
`;

export const ReplyText = styled.p`
    margin: 0;
`;

export const MessagesWrapper = styled.div`
    display: block;
`;

export const Messages = styled.div`
    p {
        margin-bottom: 6px;
        line-height: 1.5;

        &:last-child {
            margin-bottom: 0;
            word-break: break-word;
        }
    }
`;

export const WebPageWrapper = styled.div`
    padding-left: 4px;
    margin-top: 8px;
    border-left: 2px solid ${props => props.theme.palette.telegramReplyText};
    color: ${props => props.theme.palette.telegramReplyText};
`;

export const SiteName = styled.div`
    font-weight: 600;
    line-height: 1.2;
    color: ${props => props.theme.palette.telegramSiteName};
`;

export const Title = styled.div`
    font-weight: 600;
    text-overflow: ellipsis;
`;

export const Description = styled.div`
    display: -webkit-box;
    -webkit-line-clamp: 3; // line number to show
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
`;

export const ImageWrapper = styled.a`
    width: 100%;

    img {
        max-width: 100%;
    }
`;

export const DocumentWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: stretch;

    img {
        max-width: 100%;
    }
`;

export const ThumbWrapper = styled.div`
    position: relative;
`;

export const Thumb = styled.div`
    width: ${props =>
        props.width > props.parentWidth
            ? props.parentWidth
            : props.width}px !important;
    height: ${props =>
        props.width > props.parentWidth
            ? (props.height * props.parentWidth) / props.width
            : props.height}px !important;
    background: url("${props => props.src ? props.src : ''}") no-repeat;
    background-size: 100% 100%;
    background-position: center;
    filter: ${props => (!props.src ? 'blur(4px)' : 'none')};
`;

export const DocumentThumbWrapper = styled.div`
    flex-shrink: 0;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 10px 5px 0;
`;

export const DocumentThumb = styled.div`
    width: 70px;
    height: 70px;
    border-radius: 3px;
    overflow: hidden;
    background: url("${props => props.src ? props.src : ''}") no-repeat;
    background-size: ${props => (props.src ? 'cover' : 'initial')};
    background-position: center;
    filter: ${props => (!props.src ? 'blur(4px)' : 'none')};
`;

export const DocumentThumbIcon = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    background: ${props => props.theme.palette.telegramSeparator};

    img {
        max-width: 18px;
        max-height: 18px;
    }
`;

export const DocumentIcon = ({ type }) => {
    switch (type) {
    case 'audio':
        return <img src={imgAudioIcon} alt="audio" />;
    case 'video':
        return <img src={imgVideoIcon} alt="video" />;
    case 'play':
        return <img src={imgPlayIcon} alt="play" />;
    case 'pause':
        return <img src={imgPauseIcon} alt="pause" />;
    default:
        return <img src={imgFileIcon} alt="File" />;
    }
};

export const DocumentInformation = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 8px 0 0;
`;

export const AudioGraphStyles = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: flex-start;
    margin: 0 0 5px;
    width: 100%;
    height: 15px;
    background: transparent;

    .bar {
        flex-shrink: 0;
        margin: 0 1px 0 0;
        border: none;
        width: 2px;
        height: 100%;
        min-height: 1px;
        background: ${props => props.theme.palette.telegramText};
    }
`;

export const DocumentAudioGraph = ({ waves }) => {
    return (
        <AudioGraphStyles>
            {waves.map((item, key) => {
                let height = Number.parseInt(
                    (Number.parseInt(item) / 255) * 100,
                );
                return (
                    <div
                        key={key}
                        className="bar"
                        style={{
                            height: height > 5 ? height + '%' : '1px',
                        }}
                    />
                );
            })}
        </AudioGraphStyles>
    );
};

export const DocumentFileName = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    margin: 0 0 5px;
    font-size: 14px;
    font-weight: normal;
    color: ${props => props.theme.palette.telegramText};
    line-height: 1.1em;
`;

export const DocumentMetaInfo = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    font-size: 13px;
    font-weight: normal;
    color: ${props => props.theme.palette.telegramText};
    line-height: 1.1em;
`;

export const Loader = styled.img`
    width: 40px;
    height: 40px;
    position: absolute;
    left: calc(50% - 20px);
    top: calc(50% - 20px);
    z-index: 10;
    filter: blur(0.8px);
`;
