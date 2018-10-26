import qs from 'query-string';
import _ from 'lodash';

export function getQueryObject(location) {
    let query = _.get(location, 'search', null);

    return qs.parse(query);
}
