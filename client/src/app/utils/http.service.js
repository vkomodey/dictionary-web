import 'whatwg-fetch';
import url from 'url';
import _ from 'lodash';

let defaultHeaders = {
    'Content-Type': 'application/json'
};

let apiService = {
    get: (url, query, headers) => makeRequest('GET', url, query, null, headers),
    post: (url, query, body, headers) => makeRequest('POST', url, query, body, headers),
};

function makeRequest(method, url, query, body, headers) {
    return fetch(getUrl(url, query), {
        method,
        headers: Object.assign(defaultHeaders, headers),
        body: body ? JSON.stringify(body) : null,
    })
        .then(response => response.json());
};

function getUrl(url, query) {
    let urlToSend = url;

    if ( _.isObject(query) ){ 
        urlToSend = `${urlToSend}${url.format({query})}`;
    } else if ( _.isString(query) ) {
        urlToSend = `${urlToSend}${query}`;
    }
    
    return urlToSend;
};

export default apiService;
