import 'whatwg-fetch';
import urlLib from 'url';
import _ from 'lodash';
import store from 'app/store';
import { loading } from 'app/redux/actions/app';
import toastr from './toastr';

let defaultHeaders = {
    'Content-Type': 'application/json',
};

let apiService = {
    get: (url, query, headers) => makeRequest('GET', url, query, null, headers),
    post: (url, query, body, headers) => makeRequest('POST', url, query, body, headers),
    delete: (url, query, headers) => makeRequest('DELETE', url, query, null, headers),
};

async function makeRequest(method, url, query, body, headers) {
    let response;

    store.dispatch(loading(true));

    try {
        response = await fetch(getUrl(url, query), {
            method,
            headers: Object.assign(defaultHeaders, headers),
            body: body ? JSON.stringify(body) : null,
        });

        let { status } = response;

        response = await response.json();

        if ( status === 500 ) {
            throw response;
        }
    } catch (err) {
        let message = getMessageFromError(err);

        toastr.error(message);

        store.dispatch(loading(false));

        // eslint-disable-next-line
        console.error(err);

        // propagate the error to give an ability to catch and handle it properly
        throw err;
    }

    store.dispatch(loading(false));

    return response;
}

function getUrl(url, query) {
    let urlToSend = url;

    if ( _.isObject(query) ) {
        urlToSend = `${urlToSend}${urlLib.format({ query })}`;
    } else if ( _.isString(query) ) {
        urlToSend = `${urlToSend}${query}`;
    }

    return urlToSend;
}

function getMessageFromError(err) {
    return _.get(err, 'message', 'Something went wrong');
}

export default apiService;
