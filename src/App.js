/* eslint-disable */
import React from 'react';
import {
    MuiThemeProvider, createMuiTheme, createGenerateClassName, jssPreset
} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import { ThemeProvider } from 'styled-components';
import { Provider, inject, observer } from 'mobx-react';
import { IntlProvider } from 'react-intl';

import MainGrid from './grid/MainGrid';
import Stores, { STORE_KEYS } from './stores';
import SnackbarPortal from './components/SnackbarPortal';
import ModalPortal from './components/ModalPortal';
import { darkTheme } from './theme/core';
import { languages } from './lib/translations/languages';
import { messages } from "./lib/translations";

const generateClassName = createGenerateClassName();
const jss = create(jssPreset());

// We define a custom insertion point that JSS will look for injecting the styles in the DOM.
jss.options.insertionPoint = document.getElementById('jss-insertion-point');

const muiTheme = (theme) => createMuiTheme({
    palette: {
        type: theme.muiTheme,
    },
    appTheme: theme,
});

class ThemedAppComponent extends React.Component {
    lastTouchEnd = 0;

    componentDidMount() {
        document.addEventListener('touchmove', this.handleTouchMove, true);
        document.addEventListener('touchend', this.handleTouchEnd, true);
    }

    componentWillUnmount() {
        document.removeEventListener('touchmove', this.handleTouchMove);
        document.removeEventListener('touchend', this.handleTouchEnd);
    }

    handleTouchMove = e => {
        if (e.scale != null && e.scale !== 1) {
            e.preventDefault();
            e.stopPropagation();
        }
    };

    handleTouchEnd = e => {
        let now = (new Date()).getTime();
        if (now - this.lastTouchEnd <= 300) {
            e.preventDefault();
            e.stopPropagation();
        }

        this.lastTouchEnd = now;
    };

    render() {
        const { language } = this.props[STORE_KEYS.SETTINGSSTORE];
        const activeLanguage = languages.find(x => !!language && language.toLowerCase() === x.value.toLowerCase());
        const activeLocale = activeLanguage ? activeLanguage.key : 'en';
        const activeMessages = messages[activeLocale];
        return (
            <IntlProvider locale={activeLocale} key={activeLocale} messages={activeMessages}>
                <ThemeProvider theme={darkTheme}>
                    <MuiThemeProvider theme={muiTheme(darkTheme)}>
                        <CssBaseline/>
                            <MainGrid/>
                        <ModalPortal/>
                        <SnackbarPortal/>
                    </MuiThemeProvider>
                </ThemeProvider>
            </IntlProvider>
        );
    }
}

const ThemedApp = inject(
    STORE_KEYS.SETTINGSSTORE,
)(observer(ThemedAppComponent));

const App = () => (
    <Provider {...Stores()}>
        <JssProvider jss={jss} generateClassName={generateClassName}>
            <ThemedApp/>
        </JssProvider>
    </Provider>
);

export default App;
