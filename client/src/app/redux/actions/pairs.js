import pairApi from 'app/utils/api-services/pairs';

export const CREATE_PAIR = 'CREATE_PAIR';
export const PAIRS_RETRIEVED = 'PAIRS_RETRIEVED';
export const REMOVE_PAIR = 'REMOVE_PAIR';

export function createPair(pair) {
    return function(dispatch) {
        return pairApi.create(pair)
            .then(response =>
                dispatch({ type: CREATE_PAIR, pair: response}));
    }
}

export function fetchPairs(categoryId) {
    return function(dispatch) {
        return pairApi.findAll({ categoryId })
            .then(pairs =>
                dispatch({ type: PAIRS_RETRIEVED, pairs}));
    };
}

export function removePair(id) {
    return function(dispatch) {
        return pairApi.removeById(id)
            .then(pairs => dispatch({ type: REMOVE_PAIR, id }));
    }
}
