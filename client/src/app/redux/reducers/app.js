import { 
    LOADING
} from 'app/redux/actions/app';

export function loadingReducer(state=false, action) {
    switch(action.type) {
        case LOADING:
            return Boolean(action.isLoading);
        default:
            return state;
    }
}
