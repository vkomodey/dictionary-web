import { combineReducers } from 'redux';
import { pairsReducer } from './pairs';

export default combineReducers({
    pairs: pairsReducer,
});
