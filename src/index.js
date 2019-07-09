import 'react-table/react-table.css';
import 'react-virtualized/styles.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import globalStyles from './globalStyles';

globalStyles();

ReactDOM.render(<App />, document.getElementById('root'));
