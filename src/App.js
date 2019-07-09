import React from 'react';
import styled from 'styled-components';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import JssProvider from 'react-jss/lib/JssProvider';
import {create} from 'jss';

import {createGenerateClassName, jssPreset} from '@material-ui/core/styles';
import {ThemeProvider} from 'styled-components';

import MainGrid from './grid/MainGrid';
import PersistentDrawer from 'ComponentsGeneric/Drawer';
import MenuItems from 'Components/Menu';
import SimulationMessage from 'Components/SimulationMessage';

import {Provider} from 'mobx-react';
import {ClientId, Route, ProgramId, Symbols} from './config/constants';
import Stores from './stores';
import {observer, inject} from 'mobx-react';
import {STORE_KEYS} from './stores';
import SnackbarPortal from './components/SnackbarPortal';
import ModalPortal from './components/ModalPortal';

const generateClassName = createGenerateClassName();
const jss = create(jssPreset());

// We define a custom insertion point that JSS will look for injecting the styles in the DOM.
jss.options.insertionPoint = document.getElementById('jss-insertion-point');

const muiTheme = ({muiTheme}) => createMuiTheme({
    palette: {
        type: muiTheme,
    },
});

const ThemedApp = inject(STORE_KEYS.THEME, STORE_KEYS.TRADINGTYPE)(observer(
    ({[STORE_KEYS.THEME]:{theme}, [STORE_KEYS.TRADINGTYPE]:{tradingType}}) => {
        return(
            <ThemeProvider theme={theme}>
                <MuiThemeProvider theme={muiTheme(theme)}>
                    <CssBaseline />
                    {/* <PersistentDrawer>
                        <MenuItems />
                    </PersistentDrawer> */}
                    {tradingType === 'Paper' && <SimulationMessage />}
                    <MainGrid themeType={theme} ProgramId={ProgramId} Symbols={Symbols} ClientId={ClientId} Route={Route}>
                    </MainGrid>
                    <ModalPortal />
                    <SnackbarPortal />
                </MuiThemeProvider>
            </ThemeProvider>
        )
    }
));


const App = () => {
    return (
        <Provider {...Stores()}>
            <JssProvider jss={jss} generateClassName={generateClassName}>
                <React.Fragment>
                    <ThemedApp />
                </React.Fragment>
            </JssProvider>
        </Provider>
    )
};

export default App;