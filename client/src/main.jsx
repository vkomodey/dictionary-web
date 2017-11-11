import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from 'app/app';

ReactDOM.render((<App />), document.getElementById('root'))

if (module.hot) {
    module.hot.accept();
}
