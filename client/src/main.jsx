import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import App from 'app/app';
import rootReducer from 'app/redux/reducers';
import 'assets/styles/import.scss';

let store = createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware),
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'))

if (module.hot) {
    module.hot.accept();
}
