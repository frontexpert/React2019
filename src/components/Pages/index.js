import React from 'react';
import styled from 'styled-components';
import { compose, lifecycle, withProps } from 'recompose';
import { inject, observer } from 'mobx-react';
import { FormattedMessage } from 'react-intl';
import GoldenLayout from 'golden-layout';
import uuidv4 from 'uuid/v4';

import Page from '../../components-generic/Page';
import SideBarGrid from '../../grid/SideBarGrid';
import * as settings from '../../config/page-settings';
import { STORE_KEYS } from '../../stores';

const { APPLICATIONS, SETTINGSSTORE } = STORE_KEYS;

const StyledIframe = styled.iframe`
    height: 100%;
    width: 100%;
`;

const getApplicationInstanceId = appId => {
    const instanceIdsFromStorage = JSON.parse(localStorage.getItem('appsInstanceIds') || '{}');

    let instanceId;
    if (instanceIdsFromStorage[appId]) {
        instanceId = instanceIdsFromStorage[appId];
    } else {
        instanceId = uuidv4();

        const newStorageState = {
            ...instanceIdsFromStorage,
            [appId]: instanceId,
        };

        localStorage.setItem('appsInstanceIds', JSON.stringify(newStorageState));
    }

    return instanceId;
};

const Iframe = lifecycle({})(({
    appsStore, appId, name, url,
}) => {
    const instanceId = appsStore.applications[appId];

    if (!instanceId) {
        appsStore.setInstanceId(appId, getApplicationInstanceId(appId));
    }

    const appUrl = new URL(url);
    appUrl.searchParams.set('instanceId', instanceId);

    return <StyledIframe title={name} src={appUrl}/>;
});

let layoutInstance;

const refReceived = (ref, settings) => {
    if (layoutInstance) {
        layoutInstance.destroy();
    }

    window.setTimeout(() => {
        try {
            if (!ref) {
                return;
            }

            layoutInstance = new GoldenLayout(settings, ref);
            layoutInstance.registerComponent('Iframe', Iframe);
            layoutInstance.init();

            window.addEventListener('resize', () => {
                layoutInstance.updateSize();
            });
        } catch (e) {
            console.log('Error loading template', e);
        }
    });
};

export const ICO = inject(APPLICATIONS, SETTINGSSTORE)(
    ({
        [APPLICATIONS]: appsStore,
        [SETTINGSSTORE]: { defaultCrypto, defaultCryptoAmount },
        themeType,
    }) => (
        <Page themeType={themeType} refReceived={ref => refReceived(ref, settings.ico(appsStore, defaultCrypto, defaultCryptoAmount))}/>
    )
);

export const Charts = inject(APPLICATIONS, SETTINGSSTORE)(
    ({
        [APPLICATIONS]: appsStore,
        [SETTINGSSTORE]: { defaultCrypto, defaultCryptoAmount },
        themeType,
    }) => (
        <Page themeType={themeType} refReceived={ref => refReceived(ref, settings.charts(appsStore, defaultCrypto, defaultCryptoAmount))}/>
    )
);

export const News = inject(APPLICATIONS, SETTINGSSTORE)(
    ({
        [APPLICATIONS]: appsStore,
        [SETTINGSSTORE]: { defaultCrypto, defaultCryptoAmount },
        themeType,
    }) => (
        <Page themeType={themeType} refReceived={ref => refReceived(ref, settings.news(appsStore, defaultCrypto, defaultCryptoAmount))}/>
    )
);

export const Stats = inject(APPLICATIONS, SETTINGSSTORE)(
    ({
        [APPLICATIONS]: appsStore,
        [SETTINGSSTORE]: { defaultCrypto, defaultCryptoAmount },
        themeType,
    }) => (
        <Page themeType={themeType} refReceived={ref => refReceived(ref, settings.stats(appsStore, defaultCrypto, defaultCryptoAmount))}/>
    )
);

const PageWrapper = styled.div`
    display: grid;
    grid-template-columns: 15px auto;
    grid-template-areas:
        "sidebar page";
    grid-gap: 10px;
    max-height: 100vh;
    min-height: 100vh;
    background: ${props => props.theme.palette.clrBackground};
    padding: ${({ theme: { palette: { contentGap } } }) => `${contentGap} ${contentGap} ${contentGap}`} 0;
`;

const OtherPage = styled.div`
    grid: "page";
    color: #ffffff;
`;

export const Other = ({ themeType }) => (
    <PageWrapper>
        <SideBarGrid themeType={themeType}/>
        <OtherPage>
            <FormattedMessage
                id="pages.label_other_content"
                defaultMessage="Other content goes here."
            />
        </OtherPage>
    </PageWrapper>
);

export const NotFound = ({ themeType }) => (
    <PageWrapper>
        <SideBarGrid themeType={themeType}/>
        <OtherPage>
            <FormattedMessage
                id="pages.label_404_page"
                defaultMessage="404 Page Not Found."
            />
        </OtherPage>
    </PageWrapper>
);

export const NotFoundNew = ({ themeType }) => (
    <OtherPage/>
);