import httpService from './../http.service';
import endpoints from 'app/constants/endpoints';

let endpoint = endpoints.pairs;

export default { 
    create(pair) {
        return httpService.post(endpoint, null, pair);
    },

    findAll(query) {
        return httpService.get(endpoint, query);
    },
    
    findById(id) {
        let url = `${endpoint}/${id}`;
        return httpService.get(url);
    },
}
