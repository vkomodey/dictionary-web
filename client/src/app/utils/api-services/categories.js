import endpoints from 'app/constants/endpoints';
import httpService from './../http.service';

let endpoint = endpoints.categories;

export default {
    create: category => httpService.post(endpoint, null, category),

    findAll: query => httpService.get(endpoint, query),

    findById: id => httpService.get(`${endpoint}/${id}`),

    removeById: id => httpService.delete(`${endpoint}/${id}`),
};
