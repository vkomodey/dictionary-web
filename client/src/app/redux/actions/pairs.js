export const ADD_PAIR = 'ADD_PAIR';
export const REMOVE_PAIRS = 'REMOVE_PAIRS';

export function addPair(pair) {
    return {
        type: ADD_PAIR,
        addedPair: pair,
    };
}

export function removePairs( pairs = []) {
    return {
        type: REMOVE_PAIRS,
        removedPairs: pairs,
    };
}
