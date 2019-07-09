const createKeysEnum = keys => keys.reduce(
    (acc, key) => {
        acc[key]=key;
        return acc;
    }, {}
);

//Keys used in both dark & light theme
const rootKeys = createKeysEnum([
    'palette',
    'tradePalette',
    'test',
    'muiTheme'
]);


//Shared styles between dark & light theme
const primary = '#3E6A97'; //stormy blue
const primaryBright = '#0089cb'; //brighter stormy blue
const primaryBrightGradiant = 'linear-gradient(to bottom, #0000cc 0%, #0070e0 100%)';
const primaryHeader = '#879EC1';
const light = '#fff';

const defaultPalette = {
    primary,
    primaryBright,
    primaryBrightGradiant,
    primaryHeader,
    light,
};


//themes
export const darkTheme = {
    [rootKeys.muiTheme] : 'dark',

    [rootKeys.test]: {
        test: 'red',
    },

    [rootKeys.tradePalette]: {
        primaryBuy: '#0089cb',
        primarySell: '#e05475',
        contrastText: '#BBBBBB', //light gray
        orderBackground: "#213040", //acts as inactiver background as well
        coinText: "#838383",
        orderBorder: "#2d4d6d",
        inactiveText: "#4E5C6E",
    },

    [rootKeys.palette]: {
        ...defaultPalette,
        backgroundApp: '#131a23',
        backgroundHighContrast: '#18202D',
        backgroundMedContrast: '#131A23',
        contrastText: '#fff',
        portfolioComps: '#1F2F3F',
        portfolioCompsHover: 'rgba(0,0,0,0.5)',
        containerBorder: '#203347',

        // NEW DESIGN COLORS - DARK
        clrtext:'#9ba6b2;',/*text color basic*/
        clrtextLL:'#c6c8c8',/*text color lighter*/
        clrtextL:'#9ba6b2',/*text color light*/
        clrtextD:'#9ba6b2',/*text color dark*/
        clrtextA:'#286bb4',/*text color accented*/
        clrtextAA:'#e15c79',/*text color accented alternative*/
        
        clricon:'#4f6c82',/*icon color basic*/
        clriconD:'#9ba6b2',/*icon color dark*/
        clraccent:'#4a9cd5',/*icon color accented*/
        clraccentL:'#0c1017',/*icon color accented light*/
        clraccentD:'#286bb4',/*icon color accented dark*/
        
        clrseparator:'#24425b',/*separators and borders color basic*/
        clrseparatorD:'#24425b',/*separators and borders color dark*/
        clrbackL:'#141925',/*background color light*/
        clrback:'#131a23',/*background color basic*/
        clrbackA:'#213040',/*background color accented*/
        clrblock:'#18202d',/*basic block color basic*/

        // NEW DESIGN COLORS - CHARTS - DARK
        gridColor: '#24425b',
        fontColor: '#9BA6B2',
        labelColor: '#9BA6B2',
        lineColor: '#4F6C82',
    },
};

export const lightTheme = {
    [rootKeys.muiTheme] : 'light',

    [rootKeys.test]: {
        test: 'blue',
    },

    [rootKeys.tradePalette]: {
        primaryBuy: '#0089cb',
        primarySell: '#e05475',
        contrastText: '#606060', //dark gray
        orderBackground: "whitesmoke",
        coinText: "#3B464E",
        orderBorder: "#CED2D5",
        inactiveText: "#ddd",
    },

    [rootKeys.palette]: {
        ...defaultPalette,
        backgroundApp: '#f9f9fa',
        backgroundHighContrast: '#FFF',
        backgroundMedContrast: '#F4F7FA',
        contrastText: '#000',
        portfolioComps: 'whitesmoke',
        portfolioCompsHover: 'rgba(0,0,0,0.02)',
        containerBorder: '#ccc',

        // NEW DESIGN COLORS - LIGHT
        clrtext: '#585b5c;',/*text color basic*/
        clrtextLL:'#c6c8c8',/*text color lighter*/
        clrtextL:'#737474',/*text color light*/
        clrtextD:'#010101',/*text color dark*/
        clrtextA:'#286bb4',/*text color accented*/
        clrtextAA:'#e15c79',/*text color accented alternative*/
        
        clricon:'#c6c8c8',/*icon color basic*/
        clriconD:'#9ba6b2',/*icon color dark*/
        clraccent:'#4a9cd5',/*icon color accented*/
        clraccentL:'#edf2f5',/*icon color accented light*/
        clraccentD:'#286bb4',/*icon color accented dark*/
        
        clrseparator:'#e8e8e8',/*separators and borders color basic*/
        clrseparatorD:'#bfc0c0',/*separators and borders color dark*/
        clrbackL:'#e5e6e5',/*background color light*/
        clrback:'#f9f9fa',/*background color basic*/
        clrbackA:'#e6f1f8',/*background color accented*/
        clrblock:'#ffffff',/*basic block color basic*/

        // NEW DESIGN COLORS - CHARTS - LIGHT
        gridColor: '#ccd6eb',
        fontColor: '#000000',
        labelColor: '#666666',
        lineColor: '#BFC0C0',
    },
};