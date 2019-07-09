import 'react-table/react-table.css';
import 'react-virtualized/styles.css';
import 'golden-layout/src/css/goldenlayout-base.css';
import 'golden-layout/src/css/goldenlayout-dark-theme.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import globalStyles from './globalStyles';
import { getClientLive, getClientTrade } from './lib/bct-ws';
import telegramLogin from './lib/tg-auth';

// Configure Storage for MTProto
// import './utils/CofigStorage';

// Import wallet graph css file from s3 bucket
// let fileRef = document.createElement('link');
// fileRef.setAttribute('rel', 'stylesheet');
// fileRef.setAttribute('type', 'text/css');
// fileRef.setAttribute('href', 'charts/mini-charts.css');
// document.getElementsByTagName('head')[0].appendChild(fileRef);

globalStyles();
getClientLive();
getClientTrade()
    .catch(e => console.log(e.message || 'can not getClientTrade'));
telegramLogin();

ReactDOM.render(<App/>, document.getElementById('root'));
