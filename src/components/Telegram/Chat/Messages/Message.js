import React, { Component, Fragment } from 'react';

import { inject, observer } from 'mobx-react';
import { compose, withProps } from 'recompose';
import { getItemColor, splitStringToP } from '../../../../utils';
import ChatAvatar from './ChatAvatar';
import { STORE_KEYS } from '../../../../stores';
import DataLoaderTimer from '../../../../components-generic/DataLoaderTimer';
import {
    StyleWrapper,
    Content,
    Date,
    GlobalDate,
    ExtraAdd,
    ReplyWrapper,
    ReplyName,
    ReplyText,
    MessagesWrapper,
    Messages,
    WebPageWrapper,
    SiteName,
    Title,
    Description,
    ImageWrapper,
    DocumentWrapper,
    ThumbWrapper,
    Thumb,
    DocumentThumbWrapper,
    DocumentThumb,
    DocumentThumbIcon,
    DocumentIcon,
    DocumentInformation,
    DocumentAudioGraph,
    DocumentFileName,
    DocumentMetaInfo,
    Loader
} from './MessageComponents';
import Name from './Name';

const generateText = text => splitStringToP(text);

function humanReadableFileSize(bytes, si = false) {
    if (!bytes || !Number.parseInt(bytes)) {
        return '0 B';
    }

    let thresh = si ? 1000 : 1024;

    if (Math.abs(bytes) < thresh) {
        return bytes + ' B';
    }

    let units = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let u = -1;

    do {
        bytes /= thresh;
        ++u;
    } while (Math.abs(bytes) >= thresh && u < units.length - 1);

    return bytes.toFixed(2) + ' ' + units[u];
}

function humanReadableDuration(input = 0) {
    let str = '';
    let duration = Number.parseInt(input) || 0;
    let zeroPlaces = 3;

    do {
        let under = '0' + String(duration % 60);
        duration = Math.floor(duration / 60);
        str = under.substr(under.length - 2) + ':' + str;
        zeroPlaces--;
    } while (duration > 0);

    for (let i = 0; i < zeroPlaces; i++) {
        str = '00:' + str;
    }

    return str.substr(0, str.length - 1);
}

class Message extends Component {
    constructor(props) {
        super(props);

        const { media } = this.props.item;

        let webThumb = null;
        let webThumbLocation = null;
        let webThumbW = 0;
        let webThumbH = 0;
        let webThumbBlob = null;
        let photoThumb = null;
        let photoThumbLocation = null;
        let photoThumbW = 0;
        let photoThumbH = 0;
        let photoThumbBlob = null;
        let documentThumb = null;
        let documentThumbLocation = null;
        let documentThumbW = 0;
        let documentThumbH = 0;
        let documentThumbBlob = null;
        let documentCaption = null;
        let documentMimeType = null;
        let documentType = null;
        let documentFileName = null;
        let documentFileSize = null;
        let documentDuration = null;
        let documentAudioWaves = [];
        let documentLocation = null;
        let documentBlob = null;

        if (media) {
            // `messageMediaWebPage`
            if (media._ === 'messageMediaWebPage') {
                if (media.webpage && media.webpage._ === 'webPage') {
                    if (
                        media.webpage.photo &&
                        media.webpage.photo.sizes &&
                        media.webpage.photo.sizes.length > 0
                    ) {
                        if (media.webpage.description) {
                            webThumb =
                                media.webpage.photo.sizes[
                                    media.webpage.photo.sizes.length - 1
                                ];
                        } else {
                            webThumb = media.webpage.photo.sizes[0];
                        }

                        webThumbLocation = webThumb.location;
                        webThumbW = webThumb.w;
                        webThumbH = webThumb.h;
                    }
                }
            }

            // `messageMediaPhoto`
            if (media._ === 'messageMediaPhoto') {
                if (media.photo && media.photo._ === 'photo') {
                    if (
                        media.photo &&
                        media.photo.sizes &&
                        media.photo.sizes.length > 0
                    ) {
                        photoThumb =
                            media.photo.sizes[media.photo.sizes.length - 1];
                    } else {
                        photoThumb = media.photo.sizes[0];
                    }

                    photoThumbLocation = photoThumb.location;
                    photoThumbW = photoThumb.w;
                    photoThumbH = photoThumb.h;
                }
            }

            // `messageMediaDocument`
            if (media._ === 'messageMediaDocument') {
                documentCaption = media.caption;

                if (media.document && media.document._ === 'document') {
                    // Get document properties
                    documentMimeType = media.document.mime_type;
                    documentFileSize = humanReadableFileSize(
                        media.document.size || 0,
                    );
                    documentLocation = {
                        dc_id: media.document.dc_id,
                        id: media.document.id,
                        access_hash: media.document.access_hash,
                        size: media.document.size,
                    };

                    if (documentMimeType.includes('image')) {
                        documentType = 'image';
                    } else if (documentMimeType.includes('video')) {
                        documentType = 'video';
                    } else if (documentMimeType.includes('audio')) {
                        documentType = 'audio';
                    } else {
                        documentType = documentMimeType;
                    }

                    // Get document attribute
                    if (
                        media.document.attributes &&
                        media.document.attributes.length
                    ) {
                        media.document.attributes.map((attribute, key) => {
                            switch (attribute._) {
                            case 'documentAttributeFilename':
                                documentFileName = attribute.file_name;
                                break;
                            case 'documentAttributeVideo':
                                documentDuration = humanReadableDuration(
                                    attribute.duration,
                                );
                                break;
                            case 'documentAttributeAudio':
                                documentDuration = humanReadableDuration(
                                    attribute.duration,
                                );
                                documentAudioWaves = Array.from(
                                    attribute.waveform,
                                );
                                break;
                            default:
                            }
                        });
                    }

                    // Get document thumb
                    if (
                        media.document.thumb &&
                        (media.document.thumb._ === 'photoSize' ||
                            media.document.thumb._ === 'photoCachedSize')
                    ) {
                        documentThumb = media.document.thumb;
                        documentThumbLocation = documentThumb.location;
                        documentThumbW = documentThumb.w;
                        documentThumbH = documentThumb.h;
                    }
                }
            }
        }

        this.state = {
            webThumb,
            webThumbLocation,
            webThumbW,
            webThumbH,
            webThumbBlob,
            photoThumb,
            photoThumbLocation,
            photoThumbW,
            photoThumbH,
            photoThumbBlob,
            documentThumb,
            documentThumbLocation,
            documentThumbW,
            documentThumbH,
            documentThumbBlob,
            documentCaption,
            documentMimeType,
            documentType,
            documentFileName,
            documentFileSize,
            documentDuration,
            documentAudioWaves,
            documentLocation,
            documentBlob,
            replyShown: false,
        };

        this.isComponentMounted = true;
    }

    componentDidMount() {
        const { [STORE_KEYS.TELEGRAMSTORE]: telegramStore } = this.props;

        const {
            webThumbLocation,
            photoThumbLocation,
            documentThumbLocation,
        } = this.state;

        if (webThumbLocation) {
            telegramStore.getImageFromTelegram(webThumbLocation).then(value => {
                if (this.isComponentMounted) {
                    this.setState({
                        webThumbBlob: value,
                    });
                }
            });
        }

        if (photoThumbLocation) {
            telegramStore
                .getImageFromTelegram(photoThumbLocation)
                .then(value => {
                    if (this.isComponentMounted) {
                        this.setState({
                            photoThumbBlob: value,
                        });
                    }
                });
        }

        if (documentThumbLocation) {
            telegramStore
                .getImageFromTelegram(documentThumbLocation)
                .then(value => {
                    if (this.isComponentMounted) {
                        this.setState({
                            documentThumbBlob: value,
                        });
                    }
                });
        }
    }

    componentWillUnmount() {
        this.isComponentMounted = false;
    }

    handleReplyMouseEnter = () => {
        this.setState({ replyShown: true });
    };

    handleReplyMouseLeave = () => {
        this.setState({ replyShown: false });
    };

    render() {
        const {
            type, user, text, media, date, to,
        } = this.props.item;
        const {
            parentWidth, Modal, isLoggedIn, onReplyClick,
        } = this.props;
        const { loggedInUser } = this.props[STORE_KEYS.TELEGRAMSTORE];
        const {
            webThumb,
            webThumbLocation,
            webThumbW,
            webThumbH,
            webThumbBlob,
            photoThumb,
            photoThumbLocation,
            photoThumbW,
            photoThumbH,
            photoThumbBlob,
            documentThumb,
            documentThumbLocation,
            documentThumbW,
            documentThumbH,
            documentThumbBlob,
            documentCaption,
            documentMimeType,
            documentType,
            documentFileName,
            documentFileSize,
            documentDuration,
            documentAudioWaves,
            documentLocation,
            documentBlob,
            replyShown,
        } = this.state;

        if (type === 'date') {
            return (
                <GlobalDate>
                    <span>{date}</span>
                </GlobalDate>
            );
        }
        if (type === 'extra') {
            return (
                <Fragment>
                    <ExtraAdd>
                        <span>{date}</span>
                    </ExtraAdd>
                </Fragment>
            );
        }

        // checks should provide more than first and last name
        // as there can be 2nd John Smit

        const isLoggedInUser =
            `${loggedInUser.firstname} ${loggedInUser.lastname}` === user.name;

        return (
            <StyleWrapper
                isLoggedInUser={isLoggedInUser}
                onMouseEnter={this.handleReplyMouseEnter}
                onMouseLeave={this.handleReplyMouseLeave}
            >
                {!isLoggedInUser && (
                    <ChatAvatar
                        photo={user.avatar}
                        name={user.name}
                        background={getItemColor(user.name)}
                    />
                )}

                <Content isLoggedInUser={isLoggedInUser}>
                    {!isLoggedInUser && user && user.name && (
                        <Name
                            color={user.color}
                            name={user.name}
                            avatar={user.avatar}
                            modal={Modal}
                            onMouseEnter={this.handleReplyMouseEnter}
                            onMouseLeave={this.handleReplyMouseLeave}
                            replyShown={replyShown}
                            isLoggedIn={isLoggedIn}
                            onReplyClick={onReplyClick}
                        />
                    )}

                    {type === 'reply' && (
                        <ReplyWrapper color={to.user ? to.user.color : '#f00'}>
                            <ReplyName>{to.user ? to.user.name : ''}</ReplyName>
                            <ReplyText>{to.text}</ReplyText>
                        </ReplyWrapper>
                    )}

                    <MessagesWrapper>
                        {text && (
                            <Messages>
                                {generateText(text)}
                                {/* {text} */}
                            </Messages>
                        )}

                        {!!media && (
                            <React.Fragment>
                                {media._ === 'messageMediaWebPage' &&
                                    media.webpage._ === 'webPage' && (
                                    <WebPageWrapper>
                                        <SiteName>
                                            {media.webpage.site_name}
                                        </SiteName>
                                        <Title>{media.webpage.title}</Title>
                                        <Description>
                                            {media.webpage.description}
                                        </Description>

                                        {webThumbLocation && (
                                            <React.Fragment>
                                                <ImageWrapper>
                                                    <ThumbWrapper>
                                                        <Thumb
                                                            width={
                                                                webThumbW
                                                            }
                                                            height={
                                                                webThumbH
                                                            }
                                                            src={
                                                                webThumbBlob
                                                            }
                                                            // we need to get rid of magic numbers
                                                            // or describe why 149 and not 175 or 595
                                                            parentWidth={
                                                                parentWidth -
                                                                    149
                                                            }
                                                        />

                                                        {!webThumbBlob && (
                                                            <React.Fragment>
                                                                <DataLoaderTimer />
                                                            </React.Fragment>
                                                        )}
                                                    </ThumbWrapper>
                                                </ImageWrapper>
                                            </React.Fragment>
                                        )}
                                    </WebPageWrapper>
                                )}

                                {media._ === 'messageMediaPhoto' &&
                                    media.photo._ === 'photo' && (
                                    <ThumbWrapper>
                                        {photoThumbLocation && (
                                            <React.Fragment>
                                                <Thumb
                                                    width={photoThumbW}
                                                    height={photoThumbH}
                                                    src={photoThumbBlob}
                                                    parentWidth={
                                                        parentWidth - 149
                                                    }
                                                />

                                                {!photoThumbBlob && (
                                                    <React.Fragment>
                                                        <DataLoaderTimer />
                                                    </React.Fragment>
                                                )}
                                            </React.Fragment>
                                        )}

                                        <Description>
                                            {media.caption}
                                        </Description>
                                    </ThumbWrapper>
                                )}

                                {media._ === 'messageMediaDocument' &&
                                    media.document._ === 'document' && (
                                    <DocumentWrapper>
                                        <DocumentThumbWrapper>
                                            {documentThumbLocation ? (
                                                <Fragment>
                                                    <DocumentThumb
                                                        width={
                                                            documentThumbW
                                                        }
                                                        height={
                                                            documentThumbH
                                                        }
                                                        src={
                                                            documentThumbBlob
                                                        }
                                                        parentWidth={
                                                            parentWidth -
                                                                149
                                                        }
                                                    />

                                                    {!documentThumbBlob && (
                                                        <React.Fragment>
                                                            <DataLoaderTimer />
                                                        </React.Fragment>
                                                    )}
                                                </Fragment>
                                            ) : (
                                                <DocumentThumbIcon>
                                                    <DocumentIcon
                                                        type={documentType}
                                                    />
                                                </DocumentThumbIcon>
                                            )}
                                        </DocumentThumbWrapper>

                                        <DocumentInformation>
                                            {documentType === 'audio' &&
                                                documentAudioWaves &&
                                                documentAudioWaves.length ? (
                                                    <DocumentAudioGraph
                                                        waves={
                                                            documentAudioWaves
                                                        }
                                                    />
                                                ) : (
                                                    <DocumentFileName>
                                                        {documentFileName}
                                                    </DocumentFileName>
                                                )}

                                            <DocumentMetaInfo>
                                                {((documentType ===
                                                        'audio' ||
                                                        documentType ===
                                                            'video') &&
                                                        documentDuration) ||
                                                        documentFileSize}
                                            </DocumentMetaInfo>
                                        </DocumentInformation>
                                    </DocumentWrapper>
                                )}
                            </React.Fragment>
                        )}

                        {documentCaption && (
                            <Messages>{generateText(documentCaption)}</Messages>
                        )}

                        <Date>{date}</Date>
                    </MessagesWrapper>
                </Content>

                {/* if logged in - use user avatar */}

                {isLoggedInUser && (
                    <ChatAvatar
                        photo={user.avatar}
                        name={user.name}
                        background={getItemColor(user.name)}
                        self
                    />
                )}
            </StyleWrapper>
        );
    }
}

export default compose(
    inject(STORE_KEYS.TELEGRAMSTORE, STORE_KEYS.MODALSTORE),
    observer,
    withProps(({ [STORE_KEYS.MODALSTORE]: { Modal } }) => ({
        Modal,
    })),
)(Message);
