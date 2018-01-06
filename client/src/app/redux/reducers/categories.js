import { 
    CREATE_CATEGORY,
    CATEGORIES_RETRIEVED,
    REMOVE_CATEGORY,
    CHECK_ACTIVE_CATEGORY,
} from 'app/redux/actions/categories';

export function categoriesReducer(state=[], action) {
    switch(action.type) {
        case CREATE_CATEGORY:
            return [action.category, ...state];
        case CATEGORIES_RETRIEVED:
            return [...action.categories];
        case REMOVE_CATEGORY:
            return state.filter(c => c._id !== action.id);
        default:
            return state;
    }
}

export function checkActiveCategory(state='', action) {
    switch(action.type) {
        case CHECK_ACTIVE_CATEGORY:
            return action.activeCategoryId;
        default:
            return state;
    }
}
