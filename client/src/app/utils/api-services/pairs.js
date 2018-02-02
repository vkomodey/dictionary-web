import httpService from './../http.service';
import endpoints from 'app/constants/endpoints';

let endpoint = endpoints.pairs;

export default { 
    create: pair => httpService.post(endpoint, null, pair),

    findAll: query => httpService.get(endpoint, query),
    
    findById: id => httpService.get(`${endpoint}/${id}`),
    
    removeById: id => httpService.delete(`${endpoint}/${id}`),

    removeMultiple(ids=[]) {
        let query = {
            ids: ids.join(','),
        };
        let endpoint = `${endpoint}/multiple`;

        return httpService.delete(endpoint, query);
    }
}
