import React from 'react';
import ReactDOM from 'react-dom';

import Promise from 'promise-polyfill'; //IE8

import App from './App';

// To add to window
if (!window.Promise) {
    window.Promise = Promise;
}

ReactDOM.render(<App />, document.getElementById('root'));
