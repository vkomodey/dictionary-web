import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from 'app/app';
import store from 'app/store';
import 'assets/styles/import.scss';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'),
);

if (module.hot) {
    module.hot.accept();
}
