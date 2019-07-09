import {observable, action, computed} from "mobx";
import {darkTheme, lightTheme} from '../theme/core';

const darkThemeKey = 'Dark';
const lightThemeKey = 'Light';

const themes = {
    [darkThemeKey] : darkTheme,
    [lightThemeKey]: lightTheme,
};

class Theme {
    @observable theme = themes[darkThemeKey];
    selectedThemeType = darkThemeKey;

    themeTypes = [darkThemeKey, lightThemeKey]

    @action.bound
    setThemeType(themeType){
        this.theme = themes[themeType];
        this.selectedThemeType = themeType;
    }

    @computed get selectedThemeIdx(){
        return this.themeTypes.indexOf(this.selectedThemeType)
    }
}

export default () => {
    const store = new Theme();
    return store;
};