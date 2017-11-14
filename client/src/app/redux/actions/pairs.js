import pairApi from 'app/utils/api-services/pairs';

export const CREATE_PAIR = 'CREATE_PAIR';
export const PAIRS_RETRIEVED = 'PAIRS_RETRIEVED';

export function createPair(pair) {
    return function(dispatch) {
        return pairApi.create(pair)
            .then(pair =>
                dispatch({ type: CREATE_PAIR, pair}));
    }
}

export function fetchPairs() {
    return function(dispatch) {
        return pairApi.findAll()
            .then(pairs =>
                dispatch({ type: PAIRS_RETRIEVED, pairs}));
    };
}
