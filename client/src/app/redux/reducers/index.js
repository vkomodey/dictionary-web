import { combineReducers } from 'redux';
import { pairsReducer } from './pairs';
import { categoriesReducer, checkActiveCategory } from './categories';
import { loadingReducer } from './app';

export default combineReducers({
    isLoading: loadingReducer,
    pairs: pairsReducer,
    categories: categoriesReducer,
    activeCategoryId: checkActiveCategory,
});
