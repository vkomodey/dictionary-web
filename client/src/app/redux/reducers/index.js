import { combineReducers } from 'redux';
import { categoriesReducer, checkActiveCategory } from './categories';
import { loadingReducer } from './app';

export default combineReducers({
    isLoading: loadingReducer,
    categories: categoriesReducer,
    activeCategoryId: checkActiveCategory,
});
