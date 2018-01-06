import { combineReducers } from 'redux';
import { pairsReducer } from './pairs';
import { categoriesReducer, checkActiveCategory } from './categories';

export default combineReducers({
    pairs: pairsReducer,
    categories: categoriesReducer,
    activeCategoryId: checkActiveCategory,
});
