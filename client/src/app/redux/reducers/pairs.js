import { 
    CREATE_PAIR,
    PAIRS_RETRIEVED,
    REMOVE_PAIR
} from 'app/redux/actions/pairs';

export function pairsReducer(state=[], { type, pair, pairs, id }) {
    switch(type) {
        case CREATE_PAIR:
            return [pair, ...state];
        case PAIRS_RETRIEVED:
            return [...pairs, ...state];
        case REMOVE_PAIR:
            return state.filter(p => p._id !== id);
        default:
            return state;
    }
}
