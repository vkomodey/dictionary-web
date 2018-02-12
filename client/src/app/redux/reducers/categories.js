import _ from 'lodash';

import {
    CREATE_CATEGORY,
    CATEGORIES_RETRIEVED,
    REMOVE_CATEGORY,
    CHECK_ACTIVE_CATEGORY,
} from 'app/redux/actions/categories';

import {
    ADD_PAIR,
    REMOVE_PAIRS,
} from 'app/redux/actions/pairs';

export function categoriesReducer(state = [], action) {
    switch (action.type) {
        case CREATE_CATEGORY:
            return [action.category, ...state];
        case CATEGORIES_RETRIEVED:
            return [...action.categories];
        case REMOVE_CATEGORY:
            return state.filter(c => c._id !== action.id);
        // eslint-disable-next-line
        case ADD_PAIR:
            let categoryId = _.get(action, 'addedPair.categoryId');

            return state.map((category) => {
                if ( category._id !== categoryId ) {
                    return category;
                }

                return Object.assign({}, category, {
                    pairAmount: category.pairAmount + 1,
                });
            });
        // eslint-disable-next-line
        case REMOVE_PAIRS:
            let removedPairs = action.removedPairs || [];
            let grouppedPairs = _.groupBy(removedPairs, p => p.categoryId);

            return state.map((category) => {
                let pairsFromCategory = grouppedPairs[category._id] || [];
                let pairAmount = pairsFromCategory.length;

                if ( pairAmount === 0 ) {
                    return category;
                }

                return Object.assign({}, category, {
                    pairAmount: category.pairAmount - pairAmount,
                });
            });
        default:
            return state;
    }
}

export function checkActiveCategory(state = '', action) {
    switch (action.type) {
        case CHECK_ACTIVE_CATEGORY:
            return action.activeCategoryId;
        default:
            return state;
    }
}
