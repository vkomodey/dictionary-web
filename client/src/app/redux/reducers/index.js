import { combineReducers } from 'redux';
import { loadingReducer } from './app';

export default combineReducers({
    isLoading: loadingReducer,
});
