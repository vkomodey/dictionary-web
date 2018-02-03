import categoryApi from 'app/utils/api-services/categories';

export const CREATE_CATEGORY = 'CREATE_CATEGORY';
export const CATEGORIES_RETRIEVED = 'CATEGORIES_RETRIEVED';
export const REMOVE_CATEGORY = 'REMOVE_CATEGORY';
export const CHECK_ACTIVE_CATEGORY = 'CHECK_ACTIVE_CATEGORY';

export function createCategory(category) {
    return function create(dispatch) {
        return categoryApi.create(category)
            .then(response =>
                dispatch({
                    type: CREATE_CATEGORY,
                    category: response,
                }));
    };
}

export function fetchCategories() {
    return function fetch(dispatch) {
        return categoryApi.findAll()
            .then(categories =>
                dispatch({
                    type: CATEGORIES_RETRIEVED,
                    categories,
                }));
    };
}

export function removeCategory(id) {
    return function remove(dispatch) {
        return categoryApi.removeById(id)
            .then(() => dispatch({
                type: REMOVE_CATEGORY,
                id,
            }));
    };
}

export function checkActiveCategory(id) {
    return {
        type: CHECK_ACTIVE_CATEGORY,
        activeCategoryId: id,
    };
}
