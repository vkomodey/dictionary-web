import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from 'app/app';
import 'assets/styles/import.scss';

ReactDOM.render((<App />), document.getElementById('root'))

if (module.hot) {
    module.hot.accept();
}
