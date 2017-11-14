import { CREATE_PAIR, PAIRS_RETRIEVED } from 'app/redux/actions/pairs';

export function pairsReducer(state=[], { type, pair, pairs }) {
    switch(type) {
        case CREATE_PAIR:
            return [pair, ...state];
        case PAIRS_RETRIEVED:
            return [...pairs, ...state];
        default:
            return state;
    }
}
